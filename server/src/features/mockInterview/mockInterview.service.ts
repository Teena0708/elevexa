import Groq from "groq-sdk";
import Interview from "../interview/interview.model";
import MockInterview from "./mockInterview.model";
import mockInterviewPrompt, {
  finalInterviewReportPrompt,
} from "./mockInterview.prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// ================= START MOCK INTERVIEW =================

export const startMockInterviewService = async (
  interviewId: string,
  userId: string
) => {
  const interview = await Interview.findById(interviewId);

  if (!interview) {
    throw new Error("Interview not found.");
  }

  const mockInterview = await MockInterview.create({
    user: userId,
    interview: interviewId,
    currentQuestion: 0,
    answers: interview.questions.map((q) => ({
      question: q.question,
      answer: "",
      feedback: "",
      score: 0,
    })),
    overallScore: 0,
    report: {
      strengths: [],
      weaknesses: [],
      recommendations: [],
    },
    status: "IN_PROGRESS",
  });

  return {
    sessionId: mockInterview._id,
    currentQuestion: 1,
    totalQuestions: interview.questions.length,
    question: {
      question: interview.questions[0].question,
      category: interview.questions[0].category,
      difficulty: interview.questions[0].difficulty,
    },
  };
};

// ================= EVALUATE ANSWER =================

export const evaluateAnswerService = async (
  sessionId: string,
  answer: string
) => {
  const session = await MockInterview.findById(sessionId);

  if (!session) {
    throw new Error("Mock Interview session not found.");
  }

  const index = session.currentQuestion;

  if (index >= session.answers.length) {
    throw new Error("Interview already completed.");
  }

  const currentQuestion = session.answers[index].question;

  // ---------------- AI evaluates answer ----------------

  const evaluation = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: mockInterviewPrompt(currentQuestion, answer),
      },
    ],
    temperature: 0.5,
  });

  const evaluationText =
    evaluation.choices[0]?.message?.content ?? "";

  let parsedEvaluation;

  try {
    parsedEvaluation = JSON.parse(evaluationText);
  } catch {
    throw new Error("AI returned invalid JSON.");
  }

  // Save current answer

  session.answers[index].answer = answer;
  session.answers[index].feedback = parsedEvaluation.feedback;
  session.answers[index].score = parsedEvaluation.score;

  session.currentQuestion++;

  // ================= LAST QUESTION =================

  // ================= LAST QUESTION =================

const interviewCompleted =
  session.currentQuestion === session.answers.length;

if (interviewCompleted) {
  session.status = "COMPLETED";

  const total = session.answers.reduce(
    (sum, item) => sum + item.score,
    0
  );

  session.overallScore = Math.round(
    total / session.answers.length
  );

  // Generate Final Report

  const reportCompletion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: finalInterviewReportPrompt(
            session.answers.map((a) => a.question),
            session.answers.map((a) => a.answer)
          ),
        },
      ],
      temperature: 0.4,
    });

  const reportText =
    reportCompletion.choices[0]?.message?.content ?? "";

  console.log("========== FINAL REPORT ==========");
  console.log(reportText);
  console.log("==================================");

 const cleanedReport = reportText
  .replace(/```json\s*/gi, "")
  .replace(/```/g, "")
  .trim();

try {
  let parsedReport: any;

try {
  parsedReport = JSON.parse(cleanedReport);

  console.log("Parsed Report:");
  console.dir(parsedReport, { depth: null });

  session.report = {
    strengths: parsedReport.strengths ?? [],
    weaknesses: parsedReport.weaknesses ?? [],
    recommendations: parsedReport.recommendations ?? [],
  };

  console.log("Saved Report:");
  console.dir(session.report, { depth: null });

} catch (err) {
  console.error(err);
}

  session.report = {
    strengths: parsedReport.strengths || [],
    weaknesses: parsedReport.weaknesses || [],
    recommendations: parsedReport.recommendations || [],
  };

  console.log("Saved Report:", session.report);

} catch (error) {
  console.error("Report Parsing Error:", error);
  console.error("Raw Report:", reportText);

  session.report = {
    strengths: [],
    weaknesses: [],
    recommendations: [],
  };
}
}

await session.save();

return {
  score: parsedEvaluation.score,
  feedback: parsedEvaluation.feedback,

  completed: interviewCompleted,

  overallScore: interviewCompleted
    ? session.overallScore
    : null,

  report: interviewCompleted
    ? session.report
    : null,

  nextQuestion: !interviewCompleted
    ? {
        questionNumber: session.currentQuestion + 1,
        totalQuestions: session.answers.length,
        question:
          session.answers[session.currentQuestion].question,
      }
    : null,
};
}




// ================= MOCK INTERVIEW HISTORY =================

export const getMockInterviewHistoryService = async (
  userId: string
) => {
  const history = await MockInterview.find({
    user: userId,
  })
    .populate("interview", "role difficulty")
    .sort({ createdAt: -1 });

  return history;
};
