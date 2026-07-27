import { Request, Response } from "express";
import { registerUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);

res.status(201).json({
  success: true,
  message: "User registered successfully",
  data: result,
});
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};