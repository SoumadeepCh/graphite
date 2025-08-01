import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IWhiteboardSession extends Document {
  interviewRoundId: Types.ObjectId;
  data: string; // JSON string of whiteboard data
}

const whiteboardSessionSchema = new Schema<IWhiteboardSession>(
  {
    interviewRoundId: {
      type: Schema.Types.ObjectId,
      ref: "InterviewRound",
      required: true,
    },
    data: { type: String, required: true },
  },
  { timestamps: true }
);

const WhiteboardSession =
  models?.WhiteboardSession ||
  model<IWhiteboardSession>("WhiteboardSession", whiteboardSessionSchema);

export default WhiteboardSession;
