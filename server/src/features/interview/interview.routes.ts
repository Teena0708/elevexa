import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import {
  generateInterview,
  getInterviewHistory,
  getInterviewById,
} from "./interview.controller";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  generateInterview
);

router.get(
  "/history",
  authMiddleware,
  getInterviewHistory
);

router.get(
  "/:id",
  authMiddleware,
  getInterviewById
);

export default router;