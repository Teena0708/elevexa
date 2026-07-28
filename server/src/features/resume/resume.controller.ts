import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import { uploadResume } from "./resume.service";

export const upload = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadResume(
      req.file,
      req.user!.userId
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload Failed",
    });
  }
};