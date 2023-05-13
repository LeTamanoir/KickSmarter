import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ hello: string }>
) {
  return res.status(200).json({ hello: "world" });
}
