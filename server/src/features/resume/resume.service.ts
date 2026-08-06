import pdf from "pdf-parse";
import cloudinary from "../../config/cloudinary";
import { analyzeResume } from "../ai/ai.service";
import Resume from "./resume.model";

export const uploadResumeService = async (
  file: Express.Multer.File,
  userId: string
) => {
  // Extract text from uploaded PDF
  const pdfData = await pdf(file.buffer);
  const extractedText = pdfData.text;

  // Upload PDF to Cloudinary
  const uploadResult: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "elevexa/resumes",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });

  // Analyze resume using AI
  const analysis = await analyzeResume(extractedText);

  // Save in MongoDB
  const resume = await Resume.create({
    user: userId,
    resumeUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    extractedText,
    analysis,
  });

  return resume;
};