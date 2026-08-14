import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";

import {
  startMockInterview,
  evaluateAnswer,
  getMockInterviewHistory,
} from "./mockInterview.controller";

const router = Router();

router.post(
  "/start",
  authMiddleware,
  startMockInterview
);

router.post(
  "/answer",
  authMiddleware,
  evaluateAnswer
);

router.get(
  "/history",
  authMiddleware,
  getMockInterviewHistory
);

export default router;