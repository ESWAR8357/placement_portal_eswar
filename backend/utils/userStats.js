import TestResult from "../models/TestResult.js";

export const refreshUserTestStats = async (user) => {
  const [stats] = await TestResult.aggregate([
    { $match: { userId: user._id } },
    {
      $group: {
        _id: null,
        testsTaken: { $sum: 1 },
        averageScore: { $avg: "$percentage" },
        highestScore: { $max: "$percentage" }
      }
    }
  ]);

  user.testsTaken = stats?.testsTaken || 0;
  user.averageScore = Math.round(stats?.averageScore || 0);
  user.highestScore = Math.round(stats?.highestScore || 0);

  await user.save();

  return user;
};

export default refreshUserTestStats;
