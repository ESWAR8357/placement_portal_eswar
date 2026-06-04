import dotenv from "dotenv";

import connectDB from "../config/db.js";
import AptitudeQuestion from "../models/AptitudeQuestion.js";
import aptitudeQuestions from "../utils/aptitudeQuestions.js";
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
    await User.create(users);
    await AptitudeQuestion.create(aptitudeQuestions);
    console.log("Seed data inserted successfully for users and aptitude questions");
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
