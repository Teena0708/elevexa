import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import {
  startMockInterview,
  evaluateAnswer,
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

export default router;