// Interview model placeholder
import mongoose, { Schema, Document } from "mongoose";

export interface IInterview extends Document {
  user: mongoose.Types.ObjectId;
  resume: mongoose.Types.ObjectId;
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";

  questions: {
    question: string;
    category: string;
    difficulty: string;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        category: {
          type: String,
          required: true,
        },

        difficulty: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInterview>(
  "Interview",
  InterviewSchema
);