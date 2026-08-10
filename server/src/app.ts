import express from "express";
import authRoutes from "./features/auth/auth.routes";
import aiRoutes from "./features/ai/ai.routes";
import resumeRoutes from "./features/resume/resume.routes";
import interviewRoutes from "./features/interview/interview.routes";
import mockInterviewRoutes from "./features/mockInterview/mockInterview.routes";
import dashboardRoutes from "./features/dashboard/dashboard.routes";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Elevexa Backend Running 🚀");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/interview", interviewRoutes);
app.use("/api/v1/mock", mockInterviewRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

export default app;