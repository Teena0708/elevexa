import Resume from "./resume.model";
import cloudinary from "../../config/cloudinary";
import streamifier from "streamifier";

export const uploadResume = async (
  file: Express.Multer.File,
  userId: string
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "elevexa/resumes",
      },
      async (error, result) => {
        if (error) return reject(error);

        const resume = await Resume.create({
          user: userId,
          resumeUrl: result?.secure_url,
          publicId: result?.public_id,
        });

        resolve(resume);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};