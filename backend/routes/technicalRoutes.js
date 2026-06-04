import express from "express";

import { getTechnicalSubjects, getTechnicalQuestions, submitTechnicalTest } from "../controllers/technicalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/subjects", protect, getTechnicalSubjects);
router.get("/questions/:subject", protect, getTechnicalQuestions);
router.post("/submit", protect, submitTechnicalTest);

export default router;
