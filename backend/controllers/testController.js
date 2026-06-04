import TestResult from "../models/TestResult.js";

export const getTestHistory = async (req, res, next) => {
  try {
    const history = await TestResult.find({ userId: req.user._id })
      .sort({ date: -1, createdAt: -1 })
      .limit(10);

    res.status(200).json({
      history
    });
  } catch (error) {
    next(error);
  }
};
