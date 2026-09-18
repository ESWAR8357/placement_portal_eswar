import CodingQuestion from "../models/CodingQuestion.js";
import TestResult from "../models/TestResult.js";
import codingQuestionsData from "../utils/codingQuestions.js";

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

    const isStaleOrPlaceholder = (q) => {
      if (!q) return true;

      const hasProblemStatement = Boolean(String(q.problemStatement || "").trim());
      const hasSolution = Boolean(String(q.solution || q.answer || "").trim());
      const hasExplanation = Boolean(String(q.explanation || "").trim());
      const hasTimeComplexity = Boolean(String(q.timeComplexity || "").trim());
      const hasSpaceComplexity = Boolean(String(q.spaceComplexity || "").trim());

      // Placeholder heuristics (covers legacy placeholder texts)
      const title = String(q.title || "").toLowerCase();
      const problemText = String(q.problemStatement || q.description || "").toLowerCase();

      const looksLikeChallengeNumber =
        title.includes("challenge number") || problemText.includes("challenge number");

      const looksLikeGenericExample =
        problemText.includes("example input") || problemText.includes("example output");

      const missingRequired =
        !hasProblemStatement ||
        !hasSolution ||
        !hasExplanation ||
        !hasTimeComplexity ||
        !hasSpaceComplexity;

      return missingRequired || looksLikeChallengeNumber || looksLikeGenericExample;
    };

    const fetchQuestions = async () => {
      return await CodingQuestion.find({
        title: { $exists: true, $ne: "" }
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select(
          "_id title difficulty problemStatement inputFormat outputFormat constraints sampleInput sampleOutput explanation solution answer timeComplexity spaceComplexity topic"
        );
    };

    // Protected endpoint; return latest seeded questions
    let questions = await fetchQuestions();

    // Development-only self-repair for stale placeholder data
    if (process.env.NODE_ENV !== "production") {
      const staleDetected = questions.length > 0 && isStaleOrPlaceholder(questions[0]);

      console.log("Coding questions found:", questions.length);
      console.log("First coding question:", questions[0]);

      if (staleDetected) {
        console.warn(
          "[CodingAssessment] Stale/placeholder CodingQuestion detected in development. Repairing collection from utils/codingQuestions.js..."
        );

        await CodingQuestion.deleteMany({});
        await CodingQuestion.insertMany(codingQuestionsData);

        questions = await fetchQuestions();
        console.warn(
          `[CodingAssessment] Repair completed. Now returning ${questions.length} questions.`
        );
      }
    }

    res.status(200).json({ questions, total: questions.length, limit });
  } catch (error) {
    next(error);
  }
};

export const getCodingAssessmentQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await CodingQuestion.findById(id).select(
      "_id title difficulty problemStatement inputFormat outputFormat constraints sampleInput sampleOutput explanation solution answer timeComplexity spaceComplexity topic"
    );

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

    const questionIds = answers.map((a) => a.questionId).filter(Boolean);
    const uniqueIds = Array.from(new Set(questionIds));

    const codingQuestions = await CodingQuestion.find({ _id: { $in: uniqueIds } }).select(
      "_id title difficulty problemStatement inputFormat outputFormat constraints sampleInput sampleOutput explanation solution answer timeComplexity spaceComplexity topic"
    );

    const questionsMap = new Map(codingQuestions.map((q) => [q._id.toString(), q]));

    // Build review data in the same order the client submitted
    const reviewData = answers.map((a) => {
      const q = questionsMap.get(String(a.questionId));
      const status = normalizeStatus(a.status);

      return {
        questionId: a.questionId,
        status,
        title: q?.title || "",
        difficulty: q?.difficulty || "medium",
        problemStatement: q?.problemStatement || q?.description || "",
        inputFormat: q?.inputFormat || "",
        outputFormat: q?.outputFormat || "",
        constraints: q?.constraints || "",
        sampleInput: q?.sampleInput || "",
        sampleOutput: q?.sampleOutput || "",
        explanation: q?.explanation || "",
        officialSolution: q?.solution || q?.answer || "",
        timeComplexity: q?.timeComplexity || "",
        spaceComplexity: q?.spaceComplexity || "",
        topic: q?.topic || ""
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
      testName: "Coding Assessment",
      category: "coding",
      score,
      totalQuestions,
      percentage,
      date: new Date()
    });

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

