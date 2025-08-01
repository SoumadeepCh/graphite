import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IInterviewRound extends Document {
  title: string;
  description?: string;
  createdBy: Types.ObjectId; // userId
  participants: Types.ObjectId[]; // userIds

  mcqs: Types.ObjectId[]; // MCQ references
  questions: Types.ObjectId[]; // subjective/coding questions

  videoSessionId?: string; // For WebRTC / Agora / Jitsi
  whiteboardSessionId?: string; // e.g., LiveBoard, Miro, etc.

  scheduledAt: Date;
  durationInMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}

const interviewRoundSchema = new Schema<IInterviewRound>(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    mcqs: [{ type: Schema.Types.ObjectId, ref: "MCQ" }],
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    videoSessionId: { type: String },
    whiteboardSessionId: { type: String },
    scheduledAt: { type: Date, required: true },
    durationInMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

const InterviewRound =
  models?.InterviewRound ||
  model<IInterviewRound>("InterviewRound", interviewRoundSchema);

export default InterviewRound;
