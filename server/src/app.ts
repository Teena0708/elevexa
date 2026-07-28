import express from "express";
import authRoutes from "./features/auth/auth.routes";
//import resumeRoutes from "./features/resume/resume.routes";

const app = express();

// Middlewares
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("Elevexa Backend Running 🚀");
});

// Routes
app.use("/api/v1/auth", authRoutes);
//app.use("/api/v1/resume", resumeRoutes);

export default app;