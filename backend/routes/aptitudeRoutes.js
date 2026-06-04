import express from "express";

import { getAptitudeQuestions, submitAptitudeTest } from "../controllers/aptitudeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/questions", protect, getAptitudeQuestions);
router.post("/submit", protect, submitAptitudeTest);

export default router;
