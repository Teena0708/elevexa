import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import { uploadResumeService } from "./resume.service";

export const uploadResume = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const resume = await uploadResumeService(
      req.file,
      req.user.userId
    );

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      data: {
        id: resume._id,
        resumeUrl: resume.resumeUrl,
        analysis: resume.analysis,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};