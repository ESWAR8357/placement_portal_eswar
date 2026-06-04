import express from "express";
import { getCodingQuestions, getCodingQuestionById } from "../controllers/codingQuestionController.js";

const router = express.Router();

router.get("/", getCodingQuestions);
router.get("/:id", getCodingQuestionById);

export default router;
