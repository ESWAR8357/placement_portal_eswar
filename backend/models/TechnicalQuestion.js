import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      enum: ["java", "react", "javascript", "dbms", "operating-systems", "computer-networks"],
      required: [true, "Subject is required"],
      index: true
    },
    question: {
      type: String,
      required: [true, "Question text is required"],
      trim: true
    },
    options: [
      {
        type: String,
        required: [true, "Each option is required"],
        trim: true
      }
    ],
    answer: {
      type: String,
      required: [true, "Correct answer is required"],
      trim: true
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    }
  },
  {
    timestamps: true
  }
);

technicalQuestionSchema.index({ subject: 1, difficulty: 1 });

const TechnicalQuestion = mongoose.model("TechnicalQuestion", technicalQuestionSchema);

export default TechnicalQuestion;
