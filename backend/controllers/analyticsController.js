import TestResult from "../models/TestResult.js";
import User from "../models/User.js";

export const getAnalyticsOverview = async (req, res, next) => {
  try {
    const [totalUsers, totalStudents, totalAdmins, totalTests, scoreStats] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "admin" }),
      TestResult.countDocuments(),
      TestResult.aggregate([
        {
          $group: {
            _id: null,
            averageScore: { $avg: "$percentage" },
            highestScore: { $max: "$percentage" }
          }
        }
      ])
    ]);

    res.status(200).json({
      totalUsers,
      totalStudents,
      totalAdmins,
      totalTests,
      averageScore: scoreStats[0]?.averageScore ? Number(scoreStats[0].averageScore.toFixed(2)) : 0,
      highestScore: scoreStats[0]?.highestScore || 0
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalyticsTests = async (req, res, next) => {
  try {
    const [testsByCategory, scoreRanges] = await Promise.all([
      TestResult.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
            averagePercentage: { $avg: "$percentage" }
          }
        },
        { $sort: { count: -1 } }
      ]),
      TestResult.aggregate([
        {
          $bucket: {
            groupBy: "$percentage",
            boundaries: [0, 25, 50, 75, 101],
            output: { count: { $sum: 1 } }
          }
        }
      ])
    ]);

    const aptitudeCount = testsByCategory.find((t) => t._id === "aptitude")?.count || 0;
    const technicalCount = testsByCategory.find((t) => t._id === "technical")?.count || 0;

    const scoreDistribution = [
      { range: "0–24%", count: scoreRanges.find((b) => b._id === 0)?.count || 0 },
      { range: "25–49%", count: scoreRanges.find((b) => b._id === 25)?.count || 0 },
      { range: "50–74%", count: scoreRanges.find((b) => b._id === 50)?.count || 0 },
      { range: "75–100%", count: scoreRanges.find((b) => b._id === 75)?.count || 0 }
    ];

    res.status(200).json({
      aptitudeCount,
      technicalCount,
      testsByCategory: testsByCategory.map((t) => ({
        category: t._id,
        count: t.count,
        averagePercentage: Number(t.averagePercentage.toFixed(2))
      })),
      scoreDistribution
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalyticsUsers = async (req, res, next) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const [monthlyRegistrations, recentRegistrations, recentTests] = await Promise.all([
      User.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]),
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email role createdAt"),
      TestResult.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "name email")
        .select("testName category percentage createdAt userId")
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const userGrowth = monthlyRegistrations.map((entry) => ({
      month: `${monthNames[entry._id.month - 1]} ${entry._id.year}`,
      users: entry.count
    }));

    res.status(200).json({
      userGrowth,
      recentRegistrations,
      recentTests: recentTests.map((t) => ({
        _id: t._id,
        testName: t.testName,
        category: t.category,
        percentage: t.percentage,
        createdAt: t.createdAt,
        userName: t.userId?.name || "Unknown",
        userEmail: t.userId?.email || ""
      }))
    });
  } catch (error) {
    next(error);
  }
};
