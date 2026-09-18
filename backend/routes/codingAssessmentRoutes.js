import express from "express";

import { getCodingAssessmentQuestions, getCodingAssessmentQuestionById, submitCodingAssessment } from "../controllers/codingAssessmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/questions", protect, getCodingAssessmentQuestions);
router.get("/questions/:id", protect, getCodingAssessmentQuestionById);
router.post("/submit", protect, submitCodingAssessment);

export default router;

