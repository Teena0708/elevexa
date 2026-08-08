import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import {
  getDashboardStats,
  getRecentInterviews,
  getRecentResumes,
} from "./dashboard.controller";

const router = Router();

router.get(
  "/stats",
  authMiddleware,
  getDashboardStats
);

router.get(
  "/recent-interviews",
  authMiddleware,
  getRecentInterviews
);

router.get(
  "/recent-resumes",
  authMiddleware,
  getRecentResumes
);

export default router;