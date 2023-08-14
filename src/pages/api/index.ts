import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle different HTTP methods
  if (req.method === "GET") {
    // Handle GET request
    const data = {
      message: "This is an example API route in Next.js",
    };
    res.status(200).json(data);
  } else if (req.method === "POST") {
    // Handle POST request
    const { name } = req.body;
    const data = {
      message: `Hello, ${name}! This is an example API route in Next.js`,
    };
    res.status(200).json(data);
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
