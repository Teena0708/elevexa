import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import { generateInterviewService } from "./interview.service";
import Interview from "./interview.model";

export const generateInterview = async (
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

    const { resumeId, role, difficulty } = req.body;

    if (!resumeId || !role || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "resumeId, role and difficulty are required.",
      });
    }

    const interview = await generateInterviewService(
      resumeId,
      req.user.userId,
      role,
      difficulty
    );

    return res.status(201).json({
      success: true,
      message: "Interview generated successfully.",
      data: {
        id: interview._id,
        role: interview.role,
        difficulty: interview.difficulty,
        questions: interview.questions.map((q) => ({
          question: q.question,
          category: q.category,
          difficulty: q.difficulty,
        })),
        createdAt: interview.createdAt,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInterviewHistory = async (
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

    const interviews = await Interview.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: interviews,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInterviewById = async (
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

    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};