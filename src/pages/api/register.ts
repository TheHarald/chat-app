import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/auth-utils/auth-utils";
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

  const hashedPassword = await hashPassword(password);

  try {
    const existeduser = await prisma.users.findFirst({
      where: {
        name,
      },
    });
    if (existeduser) {
      res.send({ message: "A user with the same name already exists " });
    }
    const user = await prisma.users.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
