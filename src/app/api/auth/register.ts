import { NextApiRequest, NextApiResponse } from "next";
import {connectToDatabase} from "@/lib/db";
import User from "@/model/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToDatabase();

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).json({ message: "User already exists" });
  }

  const user = new User({ email, password, name });

  await user.save();

  res.status(201).json({ message: "User created" });
}
