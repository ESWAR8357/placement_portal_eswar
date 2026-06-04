import dotenv from "dotenv";

import connectDB from "../config/db.js";
import AptitudeQuestion from "../models/AptitudeQuestion.js";
import TechnicalQuestion from "../models/TechnicalQuestion.js";
import aptitudeQuestions from "../utils/aptitudeQuestions.js";
import technicalQuestionsData from "../utils/technicalQuestions.js";
import CodingQuestion from "../models/CodingQuestion.js";
import codingQuestionsData from "../utils/codingQuestions.js";
import User from "../models/User.js";

dotenv.config();

const users = [
  {
    name: "Admin User",
    email: "admin@placementportal.com",
    password: "Admin@123",
    role: "admin"
  },
  {
    name: "Student User",
    email: "student@placementportal.com",
    password: "Student@123",
    role: "student"
  }
];

const seedData = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await AptitudeQuestion.deleteMany({});
    await TechnicalQuestion.deleteMany({});
    
    await User.create(users);
    await AptitudeQuestion.create(aptitudeQuestions);
    
    const technicalQuestionsToInsert = [];
    Object.entries(technicalQuestionsData).forEach(([subject, questions]) => {
      technicalQuestionsToInsert.push(
        ...questions.map((q) => ({
          ...q,
          subject
        }))
      );
    });
    await TechnicalQuestion.insertMany(technicalQuestionsToInsert);

    // seed coding questions
    await CodingQuestion.deleteMany({});
    await CodingQuestion.insertMany(codingQuestionsData);

    console.log("Seed data inserted successfully for users, aptitude, technical, and coding questions");
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
