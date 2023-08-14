import prisma from "@/lib/prisma";
import { comparePassword } from "@/utils/auth-utils/auth-utils";
import { signToken } from "@/utils/auth-utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";

type TRegisterBody = {
  name: string;
  password: string;
};

interface TRegisterApiRequest extends NextApiRequest {
  body: TRegisterBody;
}

export default async function handler(
  req: TRegisterApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        name,
      },
    });

    console.log(user);

    if (!user) {
      return res.send({ message: "User not found" });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = signToken({ userId: user.id });

    return res
      .status(200)
      .json({ data: token, message: "Authentication success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
