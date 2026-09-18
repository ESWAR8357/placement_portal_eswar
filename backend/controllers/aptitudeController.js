import AptitudeQuestion from "../models/AptitudeQuestion.js";
import TestResult from "../models/TestResult.js";
import aptitudeQuestions from "../utils/aptitudeQuestions.js";
import { refreshUserTestStats } from "../utils/userStats.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  testsTaken: user.testsTaken,
  averageScore: user.averageScore,
  highestScore: user.highestScore,
  createdAt: user.createdAt
});

export const getAptitudeQuestions = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 5), 50);
    let questions = await AptitudeQuestion.find({ category: "aptitude" })
      .sort({ createdAt: 1 })
      .limit(limit)
      .select("question options");

    if (!questions.length) {
      await AptitudeQuestion.insertMany(aptitudeQuestions);
      questions = await AptitudeQuestion.find({ category: "aptitude" })
        .sort({ createdAt: 1 })
        .limit(limit)
        .select("question options");
    }

    res.status(200).json({ questions });
  } catch (error) {
    next(error);
  }
};

export const submitAptitudeTest = async (req, res, next) => {
  try {
    const { answers, testName } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      res.status(400);
      throw new Error("At least one answer must be submitted");
    }

    const submittedAnswers = new Map(
      answers
        .filter((answer) => answer?.questionId)
        .map((answer) => [String(answer.questionId), answer.selectedOption ?? ""])
    );
    const questions = await AptitudeQuestion.find({ _id: { $in: [...submittedAnswers.keys()] } });

    if (!questions.length) {
      res.status(400);
      throw new Error("Submitted answers do not match any test questions");
    }

    const questionsMap = new Map(questions.map((question) => [question._id.toString(), question]));
    let correctCount = 0;
    let answeredCount = 0;

    const reviewAnswers = [...submittedAnswers.entries()]
      .filter(([questionId]) => questionsMap.has(questionId))
      .map(([questionId, selectedOption]) => {
        const question = questionsMap.get(questionId);
        const selectedAnswer = String(selectedOption ?? "");
        const isCorrect = selectedAnswer === question.correctOption;

        if (selectedAnswer.trim() !== "") {
          answeredCount += 1;
        }

        if (isCorrect) {
          correctCount += 1;
        }

        return {
          id: question._id,
          questionText: question.question,
          selectedAnswer,
          correctAnswer: question.correctOption,
          status: isCorrect ? "correct" : "incorrect"
        };
      });

    const totalQuestions = reviewAnswers.length;
    const incorrectCount = totalQuestions - correctCount;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const result = await TestResult.create({
      userId: req.user._id,
      testName: testName?.trim() || "Aptitude Assessment",
      category: "aptitude",
      score: correctCount,
      totalQuestions,
      percentage,
      date: new Date()
    });

    await refreshUserTestStats(req.user);

    res.status(201).json({
      result: {
        id: result._id,
        testName: result.testName,
        category: result.category,
        score: result.score,
        totalQuestions: result.totalQuestions,
        percentage: result.percentage,
        date: result.date,
        correctCount,
        incorrectCount,
        answeredCount,
        reviewAnswers
      },
      user: sanitizeUser(req.user)
    });
  } catch (error) {
    next(error);
  }
};
