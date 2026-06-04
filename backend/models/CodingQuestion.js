import mongoose from "mongoose";

const CodingQuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    sampleInput: { type: String },
    sampleOutput: { type: String },
    constraints: { type: String },
    topic: { type: String, enum: ["arrays", "strings", "linked-lists", "trees", "dynamic-programming"], required: true }
  },
  { timestamps: true }
);

CodingQuestionSchema.index({ topic: 1 });
CodingQuestionSchema.index({ difficulty: 1 });

const CodingQuestion = mongoose.model("CodingQuestion", CodingQuestionSchema);

export default CodingQuestion;
