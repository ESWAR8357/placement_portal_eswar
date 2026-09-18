import CodingQuestion from "../models/CodingQuestion.js";
import TestResult from "../models/TestResult.js";
import codingQuestionsData from "../utils/codingQuestions.js";
import { refreshUserTestStats } from "../utils/userStats.js";

const QUESTION_FIELDS =
  "_id title difficulty problemStatement inputFormat outputFormat constraints sampleInput sampleOutput topic";

const normalizeStatus = (s) => {
  if (!s) return "not-attempted";
  const v = String(s).toLowerCase().trim();
  if (v === "solved" || v === "correct") return "solved";
  if (v === "attempted" || v === "partial") return "attempted";
  return "not-attempted";
};

const statusToCounts = (items) => {
  let solvedCount = 0;
  let attemptedCount = 0;
  let notAttemptedCount = 0;

  for (const it of items) {
    const st = normalizeStatus(it.status);
    if (st === "solved") solvedCount++;
    else if (st === "attempted") attemptedCount++;
    else notAttemptedCount++;
  }

  return { solvedCount, attemptedCount, notAttemptedCount };
};

export const getCodingAssessmentQuestions = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);

    const fetchQuestions = async () =>
      CodingQuestion.find({ title: { $exists: true, $ne: "" } })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select(QUESTION_FIELDS);

    let questions = await fetchQuestions();

    if (!questions.length) {
      await CodingQuestion.insertMany(codingQuestionsData);
      questions = await fetchQuestions();
    }

    res.status(200).json({ questions, total: questions.length, limit });
  } catch (error) {
    next(error);
  }
};

export const getCodingAssessmentQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await CodingQuestion.findById(id).select(QUESTION_FIELDS);

    if (!question) {
      res.status(404);
      throw new Error("Coding question not found");
    }

    res.status(200).json({ question });
  } catch (error) {
    next(error);
  }
};

export const submitCodingAssessment = async (req, res, next) => {
  try {
    const { testName = "Coding Assessment", answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      res.status(400);
      throw new Error("answers must be a non-empty array");
    }

    const submittedStatuses = new Map(
      answers.filter((a) => a?.questionId).map((a) => [String(a.questionId), a.status])
    );

    const codingQuestions = await CodingQuestion.find({
      _id: { $in: [...submittedStatuses.keys()] }
    });

    const questionsMap = new Map(codingQuestions.map((q) => [q._id.toString(), q]));

    if (!questionsMap.size) {
      res.status(400);
      throw new Error("Submitted answers do not match any coding questions");
    }

    // Build review data in the same order the client submitted
    const reviewData = [...submittedStatuses.entries()]
      .filter(([questionId]) => questionsMap.has(questionId))
      .map(([questionId, rawStatus]) => {
        const q = questionsMap.get(questionId);

        return {
          questionId,
          status: normalizeStatus(rawStatus),
          title: q.title || "",
          difficulty: q.difficulty || "medium",
          problemStatement: q.problemStatement || q.description || "",
          inputFormat: q.inputFormat || "",
          outputFormat: q.outputFormat || "",
          constraints: q.constraints || "",
          sampleInput: q.sampleInput || "",
          sampleOutput: q.sampleOutput || "",
          explanation: q.explanation || "",
          officialSolution: q.solution || q.answer || "",
          timeComplexity: q.timeComplexity || "",
          spaceComplexity: q.spaceComplexity || "",
          topic: q.topic || ""
        };
      });

    const { solvedCount, attemptedCount, notAttemptedCount } = statusToCounts(reviewData);
    const totalQuestions = reviewData.length;

    // Scoring model (no execution)
    // solved = 1 point, attempted = 0.5 point, not-attempted = 0
    const score = Math.round((solvedCount * 1 + attemptedCount * 0.5) * 100) / 100;
    const percentage = totalQuestions > 0 ? Math.round(((solvedCount + attemptedCount * 0.5) / totalQuestions) * 100) : 0;

    // Store result for dashboard/readiness
    const resultRecord = await TestResult.create({
      userId: req.user._id,
      testName,
      category: "coding",
      score,
      totalQuestions,
      percentage,
      date: new Date()
    });

    await refreshUserTestStats(req.user);

    res.status(201).json({
      result: {
        id: resultRecord._id,
        testName: resultRecord.testName,
        category: resultRecord.category,
        score: resultRecord.score,
        totalQuestions: resultRecord.totalQuestions,
        percentage: resultRecord.percentage,
        date: resultRecord.date,
        solvedCount,
        attemptedCount,
        notAttemptedCount,
        reviewData
      }
    });
  } catch (error) {
    next(error);
  }
};

