import CodingQuestion from "../models/CodingQuestion.js";

const codingTopics = ["arrays", "strings", "linked-lists", "trees", "dynamic-programming"];
const difficulties = ["easy", "medium", "hard"];

const buildSearchFilter = (query, topic, difficulty) => {
  const filter = {};

  if (query) {
    const regex = new RegExp(query, "i");
    filter.title = regex;
  }

  if (topic) {
    filter.topic = topic;
  }

  if (difficulty) {
    filter.difficulty = difficulty;
  }

  return filter;
};

export const getAdminCodingQuestions = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, query, topic, difficulty } = req.query;
    const filter = buildSearchFilter(query, topic, difficulty);

    if (topic && !codingTopics.includes(topic)) {
      res.status(400);
      throw new Error("Invalid topic filter.");
    }

    if (difficulty && !difficulties.includes(difficulty)) {
      res.status(400);
      throw new Error("Invalid difficulty filter.");
    }

    const total = await CodingQuestion.countDocuments(filter);
    const questions = await CodingQuestion.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({ total, page: Number(page), limit: Number(limit), questions });
  } catch (error) {
    next(error);
  }
};

export const createAdminCodingQuestion = async (req, res, next) => {
  try {
    const {
      title,
      description,
      topic,
      difficulty = "medium",
      sampleInput = "",
      sampleOutput = "",
      constraints = "",
      answer
    } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      res.status(400);
      throw new Error("Title is required.");
    }

    if (!description || typeof description !== "string" || !description.trim()) {
      res.status(400);
      throw new Error("Description is required.");
    }

    if (!topic || !codingTopics.includes(topic)) {
      res.status(400);
      throw new Error("Topic is required and must be valid.");
    }

    if (!difficulties.includes(difficulty)) {
      res.status(400);
      throw new Error("Difficulty must be easy, medium, or hard.");
    }

    if (!answer || typeof answer !== "string" || !answer.trim()) {
      res.status(400);
      throw new Error("Answer is required.");
    }

    const questionRecord = await CodingQuestion.create({
      title: title.trim(),
      description: description.trim(),
      topic,
      difficulty,
      sampleInput: sampleInput.trim(),
      sampleOutput: sampleOutput.trim(),
      constraints: constraints.trim(),
      answer: answer.trim()
    });

    res.status(201).json({ question: questionRecord });
  } catch (error) {
    next(error);
  }
};

export const updateAdminCodingQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      topic,
      difficulty = "medium",
      sampleInput = "",
      sampleOutput = "",
      constraints = "",
      answer
    } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      res.status(400);
      throw new Error("Title is required.");
    }

    if (!description || typeof description !== "string" || !description.trim()) {
      res.status(400);
      throw new Error("Description is required.");
    }

    if (!topic || !codingTopics.includes(topic)) {
      res.status(400);
      throw new Error("Topic is required and must be valid.");
    }

    if (!difficulties.includes(difficulty)) {
      res.status(400);
      throw new Error("Difficulty must be easy, medium, or hard.");
    }

    if (!answer || typeof answer !== "string" || !answer.trim()) {
      res.status(400);
      throw new Error("Answer is required.");
    }

    const existingQuestion = await CodingQuestion.findById(id);

    if (!existingQuestion) {
      res.status(404);
      throw new Error("Coding question not found.");
    }

    existingQuestion.title = title.trim();
    existingQuestion.description = description.trim();
    existingQuestion.topic = topic;
    existingQuestion.difficulty = difficulty;
    existingQuestion.sampleInput = sampleInput.trim();
    existingQuestion.sampleOutput = sampleOutput.trim();
    existingQuestion.constraints = constraints.trim();
    existingQuestion.answer = answer.trim();

    await existingQuestion.save();

    res.status(200).json({ question: existingQuestion });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminCodingQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingQuestion = await CodingQuestion.findById(id);

    if (!existingQuestion) {
      res.status(404);
      throw new Error("Coding question not found.");
    }

    await existingQuestion.deleteOne();

    res.status(200).json({ message: "Coding question deleted successfully." });
  } catch (error) {
    next(error);
  }
};
