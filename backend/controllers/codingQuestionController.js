import CodingQuestion from "../models/CodingQuestion.js";
import codingQuestionsData from "../utils/codingQuestions.js";

export const getCodingQuestions = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, topic, difficulty } = req.query;
    const query = {};

    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;

    const total = await CodingQuestion.countDocuments(query);

    if (total === 0) {
      // auto-seed
      await CodingQuestion.insertMany(codingQuestionsData);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const items = await CodingQuestion.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.status(200).json({
      total: await CodingQuestion.countDocuments(query),
      page: Number(page),
      limit: Number(limit),
      questions: items
    });
  } catch (error) {
    next(error);
  }
};

export const getCodingQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await CodingQuestion.findById(id);

    if (!question) {
      res.status(404);
      throw new Error("Coding question not found");
    }

    res.status(200).json({ question });
  } catch (error) {
    next(error);
  }
};
