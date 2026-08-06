// Interview service placeholder
import Groq from "groq-sdk";
import Resume from "../resume/resume.model";
import Interview from "./interview.model";
import interviewPrompt from "./interview.prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export const generateInterviewService = async (
  resumeId: string,
  userId: string,
  role: string,
  difficulty: "Easy" | "Medium" | "Hard"
) => {
  // Find Resume
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new Error("Resume not found.");
  }

  // Generate Interview Questions
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: interviewPrompt(
          resume.extractedText,
          role,
          difficulty
        ),
      },
    ],
    temperature: 0.7,
  });

  const response =
    completion.choices[0]?.message?.content ?? "";

  let parsed;

  try {
    parsed = JSON.parse(response);
  } catch {
    throw new Error("AI returned invalid JSON.");
  }

  // Save Interview
  const interview = await Interview.create({
    user: userId,
    resume: resumeId,
    role,
    difficulty,
    questions: parsed.questions,
  });

  return interview;
};