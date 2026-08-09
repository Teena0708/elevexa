import express from "express";
import authMiddleware from "../../middleware/auth.middleware";
import {
  register,
  login,
  getProfile,
} from "./auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

export default router;
