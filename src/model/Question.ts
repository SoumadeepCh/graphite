import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  description: string;
  type: "subjective" | "coding";
  createdBy: Types.ObjectId; // userId
}

const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["subjective", "coding"], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Question = models?.Question || model<IQuestion>("Question", questionSchema);

export default Question;
