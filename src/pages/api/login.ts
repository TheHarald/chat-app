import prisma from "@/lib/prisma";
import { TRootResponseData } from "@/types/root-types";
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
  res: NextApiResponse<TRootResponseData<string>>
) {
  if (req.method !== "POST") {
    return res.send({ message: "Метод не разрешён", success: false });
  }

  const { name, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        name,
      },
    });

    if (!user) {
      return res.send({ message: "Пользователь не найден", success: false });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.send({ message: "Пароль неверный", success: false });
    }

    const token = signToken({ userId: user.id });

    return res.send({
      data: token,
      message: "Авторизация прошла успешно",
      success: true,
    });
  } catch (error) {
    return res.send({
      message: "Непредвиденная ошибка сервера",
      success: false,
    });
  }
}
