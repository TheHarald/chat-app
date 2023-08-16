import prisma from "@/lib/prisma";
import { TRootResponseData } from "@/types/root-types";
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
  res: NextApiResponse<TRootResponseData>
) {
  if (req.method !== "POST") {
    return res.send({ message: "Метод не разрешён", success: false });
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
      res.send({
        message: "Пользователь с таким именем уже существует",
        success: false,
      });
    }
    const user = await prisma.users.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    return res.send({
      message: "Пользователь успешно зарегистрирован",
      success: true,
    });
  } catch (error) {
    return res.send({
      message: "Непредвиденная ошибка сервера",
      success: false,
    });
  }
}
