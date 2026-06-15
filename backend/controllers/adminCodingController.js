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
      category,
      topic,
      difficulty = "medium",
      problemStatement,
      description,
      inputFormat = "",
      outputFormat = "",
      constraints = "",
      sampleInput = "",
      sampleOutput = "",
      explanation = "",
      solution,
      answer,
      timeComplexity = "",
      spaceComplexity = ""
    } = req.body;

    const effectiveTopic = category || topic;

    if (!title || typeof title !== "string" || !title.trim()) {
      res.status(400);
      throw new Error("Title is required.");
    }

    if (!effectiveTopic || !codingTopics.includes(effectiveTopic)) {
      res.status(400);
      throw new Error("Category/Topic is required and must be valid.");
    }

    if (!difficulties.includes(difficulty)) {
      res.status(400);
      throw new Error("Difficulty must be easy, medium, or hard.");
    }

    const effectiveProblemStatement = (problemStatement ?? description ?? "").toString();
    const effectiveSolution = (solution ?? answer ?? "").toString();

    if (!effectiveProblemStatement.trim()) {
      res.status(400);
      throw new Error("problemStatement is required.");
    }

    if (!effectiveSolution.trim()) {
      res.status(400);
      throw new Error("solution is required.");
    }

    // Backward-compat: keep legacy fields in sync.
    const normalizedDescription = effectiveProblemStatement.trim();
    const normalizedAnswer = effectiveSolution.trim();

    const questionRecord = await CodingQuestion.create({
      title: title.trim(),
      topic: effectiveTopic,
      difficulty,

      // new assessment fields
      problemStatement: effectiveProblemStatement.trim(),
      inputFormat: inputFormat.toString().trim(),
      outputFormat: outputFormat.toString().trim(),
      constraints: constraints.toString().trim(),
      sampleInput: sampleInput.toString().trim(),
      sampleOutput: sampleOutput.toString().trim(),
      explanation: explanation.toString().trim(),
      solution: effectiveSolution.trim(),
      timeComplexity: timeComplexity.toString().trim(),
      spaceComplexity: spaceComplexity.toString().trim(),

      // legacy fields (do NOT delete)
      description: normalizedDescription,
      answer: normalizedAnswer
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
      category,
      topic,
      difficulty = "medium",
      problemStatement,
      description,
      inputFormat = "",
      outputFormat = "",
      constraints = "",
      sampleInput = "",
      sampleOutput = "",
      explanation = "",
      solution,
      answer,
      timeComplexity = "",
      spaceComplexity = ""
    } = req.body;

    const effectiveTopic = category || topic;

    if (!title || typeof title !== "string" || !title.trim()) {
      res.status(400);
      throw new Error("Title is required.");
    }

    if (!effectiveTopic || !codingTopics.includes(effectiveTopic)) {
      res.status(400);
      throw new Error("Category/Topic is required and must be valid.");
    }

    if (!difficulties.includes(difficulty)) {
      res.status(400);
      throw new Error("Difficulty must be easy, medium, or hard.");
    }

    const effectiveProblemStatement = (problemStatement ?? description ?? "").toString();
    const effectiveSolution = (solution ?? answer ?? "").toString();

    if (!effectiveProblemStatement.trim()) {
      res.status(400);
      throw new Error("problemStatement is required.");
    }

    if (!effectiveSolution.trim()) {
      res.status(400);
      throw new Error("solution is required.");
    }

    const existingQuestion = await CodingQuestion.findById(id);

    if (!existingQuestion) {
      res.status(404);
      throw new Error("Coding question not found.");
    }

    existingQuestion.title = title.trim();
    existingQuestion.topic = effectiveTopic;
    existingQuestion.difficulty = difficulty;

    // new fields
    existingQuestion.problemStatement = effectiveProblemStatement.trim();
    existingQuestion.inputFormat = inputFormat.toString().trim();
    existingQuestion.outputFormat = outputFormat.toString().trim();
    existingQuestion.constraints = constraints.toString().trim();
    existingQuestion.sampleInput = sampleInput.toString().trim();
    existingQuestion.sampleOutput = sampleOutput.toString().trim();
    existingQuestion.explanation = explanation.toString().trim();
    existingQuestion.solution = effectiveSolution.trim();
    existingQuestion.timeComplexity = timeComplexity.toString().trim();
    existingQuestion.spaceComplexity = spaceComplexity.toString().trim();

    // legacy sync (migration safety)
    existingQuestion.description = effectiveProblemStatement.trim();
    existingQuestion.answer = effectiveSolution.trim();

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
