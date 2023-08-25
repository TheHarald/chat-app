import { NextApiRequest, NextApiResponse } from "next";
import { protectedRoute } from "./protected-route";
import { TRootResponseData } from "@/types/root-types";

export default protectedRoute(
  async (_: NextApiRequest, res: NextApiResponse<TRootResponseData>) => {
    res.send({
      message: "Проверка прошла успешно",
      success: true,
    });
  }
);
