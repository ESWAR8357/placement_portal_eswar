import TechnicalQuestion from "../models/TechnicalQuestion.js";
import TestResult from "../models/TestResult.js";
import technicalQuestionsData from "../utils/technicalQuestions.js";

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

const subjectDisplayNames = {
  java: "Java",
  react: "React",
  javascript: "JavaScript",
  dbms: "DBMS",
  "operating-systems": "Operating Systems",
  "computer-networks": "Computer Networks"
};

export const getTechnicalSubjects = async (req, res, next) => {
  try {
    let subjects = await TechnicalQuestion.aggregate([
      { $group: { _id: "$subject", count: { $sum: 1 } } }
    ]);

    if (!subjects.length) {
      const questionsToInsert = [];
      Object.entries(technicalQuestionsData).forEach(([subject, questions]) => {
        questionsToInsert.push(
          ...questions.map((q) => ({
            ...q,
            subject
          }))
        );
      });
      await TechnicalQuestion.insertMany(questionsToInsert);
      subjects = await TechnicalQuestion.aggregate([
        { $group: { _id: "$subject", count: { $sum: 1 } } }
      ]);
    }

    const formattedSubjects = subjects.map((sub) => ({
      id: sub._id,
      name: subjectDisplayNames[sub._id] || sub._id,
      count: sub.count
    }));

    res.status(200).json({ subjects: formattedSubjects });
  } catch (error) {
    next(error);
  }
};

export const getTechnicalQuestions = async (req, res, next) => {
  try {
    const { subject } = req.params;
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 5), 50);

    if (!subject || !technicalQuestionsData[subject]) {
      res.status(400);
      throw new Error("Invalid subject");
    }

    let questions = await TechnicalQuestion.find({ subject })
      .sort({ createdAt: 1 })
      .limit(limit)
      .select("question options answer");

    if (!questions.length) {
      const questionsToInsert = technicalQuestionsData[subject].map((q) => ({
        ...q,
        subject
      }));
      await TechnicalQuestion.insertMany(questionsToInsert);
      questions = await TechnicalQuestion.find({ subject })
        .sort({ createdAt: 1 })
        .limit(limit)
        .select("question options");
    }

    res.status(200).json({ questions });
  } catch (error) {
    next(error);
  }
};

export const submitTechnicalTest = async (req, res, next) => {
  try {
    const { answers, testName, subject } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      res.status(400);
      throw new Error("At least one answer must be submitted");
    }

    if (!subject || !technicalQuestionsData[subject]) {
      res.status(400);
      throw new Error("Invalid subject");
    }

    const questionIds = answers.map((answer) => answer.questionId);
    const questions = await TechnicalQuestion.find({ _id: { $in: questionIds } });

    if (!questions.length) {
      res.status(400);
      throw new Error("Submitted answers do not match any test questions");
    }

    const questionsMap = new Map(questions.map((question) => [question._id.toString(), question]));
    let correctCount = 0;
    let answeredCount = 0;

    answers.forEach((answer) => {
      const question = questionsMap.get(answer.questionId);
      if (!question) {
        return;
      }

      if (answer.selectedOption != null && String(answer.selectedOption).trim() !== "") {
        answeredCount += 1;
      }

      if (answer.selectedOption === question.answer) {
        correctCount += 1;
      }
    });

    const totalQuestions = questions.length;
    const incorrectCount = totalQuestions - correctCount;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const result = await TestResult.create({
      userId: req.user._id,
      testName: testName?.trim() || `${subjectDisplayNames[subject] || subject} Technical Test`,
      category: "technical",
      score: correctCount,
      totalQuestions,
      percentage,
      date: new Date()
    });

    const previousCount = req.user.testsTaken || 0;
    const nextCount = previousCount + 1;
    req.user.testsTaken = nextCount;
    req.user.averageScore = Math.round(
      ((req.user.averageScore || 0) * previousCount + percentage) / nextCount
    );
    req.user.highestScore = Math.max(req.user.highestScore || 0, percentage);
    await req.user.save();

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
        subject
      },
      user: sanitizeUser(req.user)
    });
  } catch (error) {
    next(error);
  }
};
