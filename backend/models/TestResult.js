import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    testName: {
      type: String,
      default: "Practice Test",
      trim: true
    },
    category: {
      type: String,
      enum: ["aptitude", "technical", "coding", "interview", "general"],
      default: "general"
    },
    score: {
      type: Number,
      required: true,
      min: 0
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const TestResult = mongoose.model("TestResult", testResultSchema);

export default TestResult;
