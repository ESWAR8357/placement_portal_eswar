import express from "express";
import {
  getAdminDashboard,
  getAdminUsers
} from "../controllers/adminController.js";
import {
  getAdminAptitudeQuestions,
  createAdminAptitudeQuestion,
  updateAdminAptitudeQuestion,
  deleteAdminAptitudeQuestion
} from "../controllers/adminAptitudeController.js";
import {
  getAdminTechnicalQuestions,
  createAdminTechnicalQuestion,
  updateAdminTechnicalQuestion,
  deleteAdminTechnicalQuestion
} from "../controllers/adminTechnicalController.js";
import {
  getAdminCodingQuestions,
  createAdminCodingQuestion,
  updateAdminCodingQuestion,
  deleteAdminCodingQuestion
} from "../controllers/adminCodingController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/dashboard", getAdminDashboard);
router.get("/users", getAdminUsers);

router.get("/aptitude-questions", getAdminAptitudeQuestions);
router.post("/aptitude-questions", createAdminAptitudeQuestion);
router.put("/aptitude-questions/:id", updateAdminAptitudeQuestion);
router.delete("/aptitude-questions/:id", deleteAdminAptitudeQuestion);

router.get("/technical-questions", getAdminTechnicalQuestions);
router.post("/technical-questions", createAdminTechnicalQuestion);
router.put("/technical-questions/:id", updateAdminTechnicalQuestion);
router.delete("/technical-questions/:id", deleteAdminTechnicalQuestion);

router.get("/coding-questions", getAdminCodingQuestions);
router.post("/coding-questions", createAdminCodingQuestion);
router.put("/coding-questions/:id", updateAdminCodingQuestion);
router.delete("/coding-questions/:id", deleteAdminCodingQuestion);

export default router;
