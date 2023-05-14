import { PINATA_PUBLIC_GATEWAY_URL } from "@/src/constants";

const pushImageToIPFS = async (image: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(new Blob([image]));

  const imageB64: string = await new Promise((res, rej) => {
    reader.onload = () => res(reader.result?.toString() as string);
    reader.onerror = () => rej(reader.error);
  });

  let payload = JSON.stringify({
    pinataOptions: { cidVersion: 1 },
    pinataContent: { image: imageB64 },
  });

  const res = await fetch("/api/ipfs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });

  const data = await res.json();

  return data.ipfsHash;
};

const pushMetadataToIPFS = async ({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: string[];
}): Promise<string> => {
  let payload = JSON.stringify({
    pinataOptions: { cidVersion: 1 },
    pinataContent: { title, description, images },
  });

  const res = await fetch("/api/ipfs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });

  const data = await res.json();

  return data.ipfsHash;
};

const getImageFromIPFS = async (cid: string): Promise<string> => {
  const res = await fetch(PINATA_PUBLIC_GATEWAY_URL(cid));
  const data = (await res.json()) as { image: string };

  return data.image;
};

const getMetadataFromIPFS = async (
  cid: string
): Promise<{
  title: string;
  description: string;
  images: string[];
}> => {
  const res = await fetch(PINATA_PUBLIC_GATEWAY_URL(cid));
  const data = (await res.json()) as {
    title: string;
    description: string;
    images: string[];
  };

  return data;
};

export {
  pushImageToIPFS,
  pushMetadataToIPFS,
  getImageFromIPFS,
  getMetadataFromIPFS,
};
