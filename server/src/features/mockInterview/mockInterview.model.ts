import mongoose, { Schema, Document } from "mongoose";

interface IAnswer {
  question: string;
  answer: string;
  feedback: string;
  score: number;
}

export interface IMockInterview extends Document {
  user: mongoose.Types.ObjectId;

  interview: mongoose.Types.ObjectId;

  currentQuestion: number;

  answers: IAnswer[];

  overallScore: number;

  report: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };

  status: "IN_PROGRESS" | "COMPLETED";

  createdAt: Date;
  updatedAt: Date;
}

const MockInterviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    interview: {
      type: Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },

    currentQuestion: {
      type: Number,
      default: 0,
    },

    answers: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },

        feedback: {
          type: String,
          default: "",
        },

        score: {
          type: Number,
          default: 0,
        },
      },
    ],

    overallScore: {
      type: Number,
      default: 0,
    },

    report: {
      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      recommendations: {
        type: [String],
        default: [],
      },
    },

    status: {
      type: String,
      enum: ["IN_PROGRESS", "COMPLETED"],
      default: "IN_PROGRESS",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMockInterview>(
  "MockInterview",
  MockInterviewSchema
);