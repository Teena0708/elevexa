import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import {
  startMockInterviewService,
  evaluateAnswerService,
} from "./mockInterview.service";

// ================= START MOCK INTERVIEW =================

export const startMockInterview = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { interviewId } = req.body;

    if (!interviewId) {
      return res.status(400).json({
        success: false,
        message: "Interview ID is required.",
      });
    }

    const session = await startMockInterviewService(
      interviewId,
      req.user.userId
    );

    return res.status(201).json({
      success: true,
      message: "Mock interview started successfully.",
      data: session,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EVALUATE ANSWER =================

export const evaluateAnswer = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { sessionId, answer } = req.body;

    if (!sessionId || !answer) {
      return res.status(400).json({
        success: false,
        message: "sessionId and answer are required.",
      });
    }

    const result = await evaluateAnswerService(
      sessionId,
      answer
    );

    return res.status(200).json({
      success: true,
      message: "Answer evaluated successfully.",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};