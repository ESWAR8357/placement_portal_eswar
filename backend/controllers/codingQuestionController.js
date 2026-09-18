import CodingQuestion from "../models/CodingQuestion.js";
import codingQuestionsData from "../utils/codingQuestions.js";

export const getCodingQuestions = async (req, res, next) => {
  try {
    const { topic, difficulty } = req.query;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
    const query = {};

    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;

    const total = await CodingQuestion.countDocuments(query);

    if (total === 0) {
      // auto-seed
      await CodingQuestion.insertMany(codingQuestionsData);
    }

    const skip = (page - 1) * limit;
    const items = await CodingQuestion.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      total: await CodingQuestion.countDocuments(query),
      page,
      limit,
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
