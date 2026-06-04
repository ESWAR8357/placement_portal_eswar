import express from "express";

import { getTestHistory } from "../controllers/testController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/history", protect, getTestHistory);

export default router;
