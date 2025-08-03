import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: string;
  isAdmin: boolean;
  roundsId?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "CANDIDATE" },
    isAdmin: { type: Boolean, default: false },
    roundsId: [{ type: Schema.Types.ObjectId, ref: "InterviewRound" }],
  },
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
