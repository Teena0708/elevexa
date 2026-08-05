import Groq from "groq-sdk";
import resumePrompt from "./ai.prompt";

export const analyzeResume = async (resumeText: string) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content:
          "You are an ATS Resume Analyzer. Always respond with valid JSON only. Never use markdown or extra text.",
      },
      {
        role: "user",
        content: resumePrompt(resumeText),
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content!);
};