
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import User from "@/model/User";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });

  if (!session || !session.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await connectToDatabase();

  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isAdmin = true;

  await user.save();

  res.status(200).json({ message: "User role updated to ADMIN" });
}
