import TechnicalQuestion from "../models/TechnicalQuestion.js";

const technicalSubjects = ["java", "react", "javascript", "dbms", "operating-systems", "computer-networks"];

const buildSearchFilter = (query, subject) => {
  const filter = {};

  if (subject) {
    filter.subject = subject;
  }

  if (query) {
    const regex = new RegExp(query, "i");
    filter.question = regex;
  }

  return filter;
};

export const getAdminTechnicalQuestions = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, query, subject } = req.query;
    const filter = buildSearchFilter(query, subject);

    if (subject && !technicalSubjects.includes(subject)) {
      res.status(400);
      throw new Error("Invalid technical subject filter.");
    }

    const total = await TechnicalQuestion.countDocuments(filter);
    const questions = await TechnicalQuestion.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({ total, page: Number(page), limit: Number(limit), questions });
  } catch (error) {
    next(error);
  }
};

export const createAdminTechnicalQuestion = async (req, res, next) => {
  try {
    const { subject, question, options, answer, difficulty = "medium" } = req.body;

    if (!subject || !technicalSubjects.includes(subject)) {
      res.status(400);
      throw new Error("Subject is required and must be valid.");
    }

    if (!question || typeof question !== "string" || !question.trim()) {
      res.status(400);
      throw new Error("Question text is required.");
    }

    if (!Array.isArray(options) || options.length < 2) {
      res.status(400);
      throw new Error("At least two answer options are required.");
    }

    const sanitizedOptions = options.map((option) => option?.trim()).filter(Boolean);
    if (sanitizedOptions.length < 2) {
      res.status(400);
      throw new Error("All answer options must be non-empty.");
    }

    if (!answer || !sanitizedOptions.includes(answer.trim())) {
      res.status(400);
      throw new Error("Correct answer must match one of the provided options.");
    }

    const questionRecord = await TechnicalQuestion.create({
      subject,
      question: question.trim(),
      options: sanitizedOptions,
      answer: answer.trim(),
      difficulty
    });

    res.status(201).json({ question: questionRecord });
  } catch (error) {
    next(error);
  }
};

export const updateAdminTechnicalQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, question, options, answer, difficulty = "medium" } = req.body;

    if (!subject || !technicalSubjects.includes(subject)) {
      res.status(400);
      throw new Error("Subject is required and must be valid.");
    }

    if (!question || typeof question !== "string" || !question.trim()) {
      res.status(400);
      throw new Error("Question text is required.");
    }

    if (!Array.isArray(options) || options.length < 2) {
      res.status(400);
      throw new Error("At least two answer options are required.");
    }

    const sanitizedOptions = options.map((option) => option?.trim()).filter(Boolean);
    if (sanitizedOptions.length < 2) {
      res.status(400);
      throw new Error("All answer options must be non-empty.");
    }

    if (!answer || !sanitizedOptions.includes(answer.trim())) {
      res.status(400);
      throw new Error("Correct answer must match one of the provided options.");
    }

    const existingQuestion = await TechnicalQuestion.findById(id);

    if (!existingQuestion) {
      res.status(404);
      throw new Error("Technical question not found.");
    }

    existingQuestion.subject = subject;
    existingQuestion.question = question.trim();
    existingQuestion.options = sanitizedOptions;
    existingQuestion.answer = answer.trim();
    existingQuestion.difficulty = difficulty;

    await existingQuestion.save();

    res.status(200).json({ question: existingQuestion });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminTechnicalQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingQuestion = await TechnicalQuestion.findById(id);

    if (!existingQuestion) {
      res.status(404);
      throw new Error("Technical question not found.");
    }

    await existingQuestion.deleteOne();

    res.status(200).json({ message: "Technical question deleted successfully." });
  } catch (error) {
    next(error);
  }
};
