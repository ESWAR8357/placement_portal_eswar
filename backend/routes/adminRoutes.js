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

export default router;
