import mongoose from "mongoose";

const aptitudeQuestionSchema = new mongoose.Schema(
  {
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
    correctOption: {
      type: String,
      required: [true, "Correct option is required"],
      trim: true
    },
    category: {
      type: String,
      enum: ["aptitude"],
      default: "aptitude"
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

const AptitudeQuestion = mongoose.model("AptitudeQuestion", aptitudeQuestionSchema);

export default AptitudeQuestion;
