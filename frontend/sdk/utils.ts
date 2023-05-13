import { TezosToolkit } from "@taquito/taquito";
import { TProjectExternal, TStorageExternal } from "./types/TExternal";
import TProject from "./types/TProject";

const _getProject = async (
  storage: TStorageExternal,
  project_id: number
): Promise<TProject> => {
  let tmp = (await storage.projects.get(
    project_id.toString()
  )) as TProjectExternal;

  if (tmp === undefined) {
    throw new Error("Project not found");
  }

  let project: TProject = {
    cid_metadata: tmp.cid_metadata,
    funding_due_date: new Date(tmp.funding_due_date),
    funding_start_date: new Date(tmp.funding_start_date),
    milestones: [],
    id: tmp.id.toNumber(),
    investors: [],
    current_amount: tmp.current_amount.toNumber(),
    target_amount: tmp.target_amount.toNumber(),
    owner: tmp.owner,
    votes: [],
  };

  for (let [address, amount] of tmp.investors.entries()) {
    project.investors.push({
      address,
      invested_amount: amount.toNumber(),
    });
  }

  for (let [_, milestone] of tmp.milestones.entries()) {
    project.milestones.push({
      cid_metadata: milestone.cid_metadata,
      required_amount: milestone.required_amount.toNumber(),
      due_date: new Date(milestone.due_date),
      start_date: new Date(milestone.start_date),
    });
  }

  for (let [milestone_id, { total_weight, voters }] of tmp.votes.entries()) {
    project.votes.push({
      voters: new Set(voters),
      milestone_id: milestone_id.toNumber(),
      total_weight: total_weight.toNumber(),
    });
  }

  return project;
};

const _getStorage = async (
  tezos: TezosToolkit,
  contractAddress: string
): Promise<TStorageExternal> => {
  let contract = await tezos.contract.at(contractAddress);
  let storage = (await contract.storage()) as TStorageExternal;

  return storage;
};

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

export { _getProject, _getStorage, pushImageToIPFS, pushMetadataToIPFS };
