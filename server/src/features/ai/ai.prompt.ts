const resumePrompt = (resume: string) => `
Analyze the following resume.

Return ONLY valid JSON.

Use this exact structure:

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resume}
`;

export default resumePrompt;