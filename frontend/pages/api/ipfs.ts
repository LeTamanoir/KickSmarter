import { PINATA_UPLOAD_URL } from "@/src/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      {
        const data = req.body;

        if (!data) {
          return res.status(400).end();
        }

        fetch(PINATA_UPLOAD_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
          },
          body: JSON.stringify(data),
        })
          .then((r) => r.json())
          .then((r) => res.status(200).send({ ipfsHash: r.IpfsHash }))
          .catch(() => res.status(500).end());
      }
      break;
    default:
      res.status(405).end();
  }
}
