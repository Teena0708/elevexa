const mockInterviewPrompt = (
  question: string,
  answer: string
) => {
  return `
You are an expert technical interviewer.

Evaluate the candidate's answer for the following interview question.

Question:
${question}

Candidate Answer:
${answer}

Rules:
- Return ONLY valid JSON.
- Do not write markdown.
- Do not use \`\`\`.
- Give an honest evaluation.

Response Format:

{
  "score":8,
  "feedback":"Detailed constructive feedback in 3-5 sentences."
}
`;
};

export const finalInterviewReportPrompt = (
  questions: string[],
  answers: string[]
) => {
  return `
You are a Senior Software Engineering Interviewer.

Analyze the candidate's complete interview.

Questions:

${questions.join("\n")}

Answers:

${answers.join("\n")}

Return ONLY valid JSON.

{
  "strengths":[
    "...",
    "...",
    "..."
  ],
  "weaknesses":[
    "...",
    "...",
    "..."
  ],
  "recommendations":[
    "...",
    "...",
    "..."
  ]
}
`;
};

export default mockInterviewPrompt;