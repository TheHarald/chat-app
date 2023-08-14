import { NextApiRequest, NextApiResponse } from "next";
import { protectedRoute } from "./routes";

export default protectedRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.send("Passed");
  }
);
