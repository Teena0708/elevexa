import { Request, Response } from "express";
import { analyzeResume } from "./ai.service";

export const analyze = async (req: Request, res: Response) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "resumeText is required",
      });
    }

    const result = await analyzeResume(resumeText);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};