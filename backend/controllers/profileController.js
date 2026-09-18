import TestResult from "../models/TestResult.js";

const TECHNICAL_WEIGHT = 0.65;
const APTITUDE_WEIGHT = 0.35;
const MAX_CONFIDENCE_TESTS = 10;

const subjectDisplayNames = {
  java: "Java",
  react: "React",
  javascript: "JavaScript",
  dbms: "DBMS",
  "operating-systems": "Operating Systems",
  "computer-networks": "Computer Networks"
};

const extractSubject = (testName = "") => {
  const lower = testName.toLowerCase();
  for (const [key, display] of Object.entries(subjectDisplayNames)) {
    if (lower.includes(key.replace("-", " ")) || lower.includes(key)) {
      return display;
    }
  }
  return null;
};

export const getReadinessScore = async (req, res, next) => {
  try {
    const { testsTaken = 0, averageScore = 0, highestScore = 0 } = req.user;

    const results = await TestResult.find({ userId: req.user._id }).sort({ date: -1 });

    const aptitudeResults = results.filter((r) => r.category === "aptitude");
    const technicalResults = results.filter((r) => r.category === "technical");

    const avgAptitude =
      aptitudeResults.length
        ? aptitudeResults.reduce((s, r) => s + r.percentage, 0) / aptitudeResults.length
        : 0;

    const avgTechnical =
      technicalResults.length
        ? technicalResults.reduce((s, r) => s + r.percentage, 0) / technicalResults.length
        : 0;

    // Base score: weighted average of aptitude and technical
    const hasAny = aptitudeResults.length || technicalResults.length;
    let baseScore = 0;
    if (aptitudeResults.length && technicalResults.length) {
      baseScore = avgTechnical * TECHNICAL_WEIGHT + avgAptitude * APTITUDE_WEIGHT;
    } else if (technicalResults.length) {
      baseScore = avgTechnical;
    } else if (aptitudeResults.length) {
      baseScore = avgAptitude;
    }

    // Confidence multiplier: more tests → closer to 1.0
    const confidenceRatio = hasAny
      ? Math.min(testsTaken / MAX_CONFIDENCE_TESTS, 1)
      : 0;
    const confidenceBoost = confidenceRatio * 15; // up to +15 points for consistency

    // Highest score bonus (up to +5)
    const highestBonus = (highestScore / 100) * 5;

    const readinessScore = Math.min(
      Math.round(baseScore + confidenceBoost + highestBonus),
      100
    );

    // Per-subject averages for strengths/weaknesses
    const subjectMap = {};
    technicalResults.forEach((r) => {
      const subject = extractSubject(r.testName);
      if (!subject) return;
      if (!subjectMap[subject]) subjectMap[subject] = { total: 0, count: 0 };
      subjectMap[subject].total += r.percentage;
      subjectMap[subject].count += 1;
    });

    if (aptitudeResults.length) {
      const avgApt = Math.round(avgAptitude);
      subjectMap["Aptitude"] = { total: avgApt * aptitudeResults.length, count: aptitudeResults.length };
    }

    const subjectAverages = Object.entries(subjectMap).map(([name, data]) => ({
      name,
      avg: Math.round(data.total / data.count)
    }));

    subjectAverages.sort((a, b) => b.avg - a.avg);

    const strengths = subjectAverages.filter((s) => s.avg >= 70).map((s) => s.name);
    const weaknesses = subjectAverages.filter((s) => s.avg < 60).map((s) => s.name);

    // Recommendations
    const recommendations = [];
    weaknesses.forEach((subject) => {
      recommendations.push(`Practice more ${subject} tests to improve your score`);
    });
    if (testsTaken < 5) {
      recommendations.push("Attempt more tests to increase your confidence score");
    }
    if (technicalResults.length === 0) {
      recommendations.push("Start technical subject tests to boost your readiness");
    }
    if (aptitudeResults.length === 0) {
      recommendations.push("Attempt aptitude tests to build a well-rounded profile");
    }
    if (recommendations.length === 0) {
      recommendations.push("Keep practicing to maintain your high readiness score");
    }

    res.status(200).json({
      readinessScore,
      strengths,
      weaknesses,
      recommendations
    });
  } catch (error) {
    next(error);
  }
};
