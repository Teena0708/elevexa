import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import Interview from "../interview/interview.model";
import Resume from "../resume/resume.model";
import MockInterview from "../mockInterview/mockInterview.model";

export const getDashboardStats = async (
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

    const userId = req.user.userId;

    const totalResumes = await Resume.countDocuments({
      user: userId,
    });

    const totalInterviews = await Interview.countDocuments({
      user: userId,
    });

    const completedInterviews = await MockInterview.countDocuments({
      user: userId,
      status: "COMPLETED",
    });

    const mockInterviews = await MockInterview.find({
      user: userId,
      status: "COMPLETED",
    }).select("overallScore");

    const totalScore = mockInterviews.reduce(
      (sum, interview) => sum + (interview.overallScore || 0),
      0
    );

    const averageScore =
      mockInterviews.length > 0
        ? Math.round(totalScore / mockInterviews.length)
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalResumes,
        totalInterviews,
        completedInterviews,
        averageScore,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentInterviews = async (
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
    })
      .sort({ createdAt: -1 })
      .limit(5);

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

export const getRecentResumes = async (
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

    const resumes = await Resume.find({
      user: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: resumes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};