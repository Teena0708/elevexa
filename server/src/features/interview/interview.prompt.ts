// Interview prompt placeholder
const interviewPrompt = (
  resumeText: string,
  role: string,
  difficulty: string
) => {
  return `
You are an expert technical interviewer.

Based on the resume and the target role, generate exactly 10 interview questions.

Role: ${role}

Difficulty: ${difficulty}

Resume:
${resumeText}

Rules:
- Return ONLY valid JSON.
- Do not write markdown.
- Do not use \`\`\`json.
- Do not explain anything.
- Generate exactly 10 questions.

Format:

{
  "questions":[
    {
      "question":"...",
      "category":"...",
      "difficulty":"..."
    }
  ]
}
`;
};

export default interviewPrompt;