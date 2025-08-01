import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IMCQ extends Document {
  question: string;
  options: string[];
  correctOption: number;
  createdBy: Types.ObjectId; // userId
}

const mcqSchema = new Schema<IMCQ>(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const MCQ = models?.MCQ || model<IMCQ>("MCQ", mcqSchema);

export default MCQ;
