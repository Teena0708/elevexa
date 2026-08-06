// Interview routes placeholder
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { generateInterview } from "./interview.controller";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  generateInterview
);

export default router;