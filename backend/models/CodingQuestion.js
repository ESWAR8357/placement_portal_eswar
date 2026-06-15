import mongoose from "mongoose";

const CodingQuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // Full problem statement
    problemStatement: { type: String, required: true },

    // Keep `description` for backward compatibility with existing UI/admin forms.
    description: { type: String },

    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },

    // Formatting requirements
    inputFormat: { type: String, default: "" },
    outputFormat: { type: String, default: "" },

    constraints: { type: String, default: "" },

    sampleInput: { type: String, default: "" },
    sampleOutput: { type: String, default: "" },

    // Explanation / official solution (NO execution)
    explanation: { type: String, default: "" },
    solution: { type: String, default: "" },

    // Legacy field: admin + earlier seeds used `answer`.
    // We map it to official solution text.
    answer: { type: String, default: "" },

    timeComplexity: { type: String, default: "" },
    spaceComplexity: { type: String, default: "" },

    topic: {
      type: String,
      enum: ["arrays", "strings", "linked-lists", "trees", "dynamic-programming"],
      required: true
    }
  },
  { timestamps: true }
);


CodingQuestionSchema.index({ topic: 1 });
CodingQuestionSchema.index({ difficulty: 1 });


const CodingQuestion = mongoose.model("CodingQuestion", CodingQuestionSchema);

export default CodingQuestion;
