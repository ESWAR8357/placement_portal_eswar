import express from "express";

import { getReadinessScore } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/readiness", protect, getReadinessScore);

export default router;
