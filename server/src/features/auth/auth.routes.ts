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




 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTY3OWYwYmYwZDU3Nzk4MmJiNTUzNGMiLCJpYXQiOjE3ODUxNzU4MjAsImV4cCI6MTc4NTc4MDYyMH0.Xh0Z6rXkWMDcNMnE_pc2GSCQEIaCi6xUmCY7HXFHS5w"