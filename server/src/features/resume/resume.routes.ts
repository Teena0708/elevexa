import express from "express";
import authMiddleware from "../../middleware/auth.middleware";
import upload from "../../middleware/upload.middleware";
import { upload as uploadResume } from "./resume.controller";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

export default router;