import AptitudeQuestion from "../models/AptitudeQuestion.js";

const buildSearchFilter = (query) => {
  const filter = { category: "aptitude" };

  if (query) {
    const regex = new RegExp(query, "i");
    filter.$or = [{ question: regex }, { options: regex }];
  }

  return filter;
};

export const getAdminAptitudeQuestions = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, query } = req.query;
    const filter = buildSearchFilter(query);

    const total = await AptitudeQuestion.countDocuments(filter);
    const questions = await AptitudeQuestion.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({ total, page: Number(page), limit: Number(limit), questions });
  } catch (error) {
    next(error);
  }
};

export const createAdminAptitudeQuestion = async (req, res, next) => {
  try {
    const { question, options, correctOption, difficulty = "medium" } = req.body;

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

    if (!correctOption || !sanitizedOptions.includes(correctOption.trim())) {
      res.status(400);
      throw new Error("Correct option must match one of the provided options.");
    }

    const questionRecord = await AptitudeQuestion.create({
      question: question.trim(),
      options: sanitizedOptions,
      correctOption: correctOption.trim(),
      difficulty,
      category: "aptitude"
    });

    res.status(201).json({ question: questionRecord });
  } catch (error) {
    next(error);
  }
};

export const updateAdminAptitudeQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { question, options, correctOption, difficulty = "medium" } = req.body;

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

    if (!correctOption || !sanitizedOptions.includes(correctOption.trim())) {
      res.status(400);
      throw new Error("Correct option must match one of the provided options.");
    }

    const existingQuestion = await AptitudeQuestion.findById(id);

    if (!existingQuestion) {
      res.status(404);
      throw new Error("Aptitude question not found.");
    }

    existingQuestion.question = question.trim();
    existingQuestion.options = sanitizedOptions;
    existingQuestion.correctOption = correctOption.trim();
    existingQuestion.difficulty = difficulty;

    await existingQuestion.save();

    res.status(200).json({ question: existingQuestion });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminAptitudeQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingQuestion = await AptitudeQuestion.findById(id);

    if (!existingQuestion) {
      res.status(404);
      throw new Error("Aptitude question not found.");
    }

    await existingQuestion.deleteOne();

    res.status(200).json({ message: "Aptitude question deleted successfully." });
  } catch (error) {
    next(error);
  }
};
