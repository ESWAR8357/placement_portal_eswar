import TestResult from "../models/TestResult.js";
import User from "../models/User.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getAdminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalTests = await TestResult.countDocuments();

    const scoreStats = await TestResult.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$percentage" },
          highestScore: { $max: "$percentage" },
          totalScore: { $sum: "$percentage" }
        }
      }
    ]);

    const testsByCategory = await TestResult.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 }, averagePercentage: { $avg: "$percentage" } } },
      { $sort: { count: -1 } }
    ]);

    const recentRegistrations = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role createdAt");

    const topPerformers = await User.find({ role: "student" })
      .sort({ averageScore: -1, highestScore: -1, testsTaken: -1 })
      .limit(5)
      .select("name email testsTaken averageScore highestScore");

    res.status(200).json({
      metrics: {
        totalUsers,
        totalStudents,
        totalAdmins,
        totalTests,
        averageScore: scoreStats[0]?.averageScore ? Number(scoreStats[0].averageScore.toFixed(2)) : 0,
        highestScore: scoreStats[0]?.highestScore || 0
      },
      testsByCategory,
      recentRegistrations,
      topPerformers
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminUsers = async (req, res, next) => {
  try {
    const { role, query } = req.query;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (query) {
      const regex = new RegExp(escapeRegex(String(query)), "i");
      filter.$or = [{ name: regex }, { email: regex }];
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("name email role testsTaken averageScore highestScore createdAt");

    res.status(200).json({
      total,
      page,
      limit,
      users
    });
  } catch (error) {
    next(error);
  }
};
