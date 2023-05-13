import { createContext, useContext } from "react";
import TKicksmarterCtx from "./types/TKicksmarterCtx";
import TProject from "./types/TProject";
import { useTezosContext } from "@/src/contexts/TezosContext";
import { TMethodsExternal } from "./types/TExternal";
import {
  _getProject,
  _getStorage,
  pushImageToIPFS,
  pushMetadataToIPFS,
} from "./utils";
import TMilestone from "./types/TMilestone";

const KicksmarterCtx = createContext<TKicksmarterCtx>({} as TKicksmarterCtx);
const useKickSmarter = () => useContext(KicksmarterCtx);

const KicksmarterProvider = ({
  contractAddress,
  children,
}: {
  contractAddress: string;
  children: React.ReactNode;
}) => {
  const { tezos, connected } = useTezosContext();

  const getProject = async (project_id: number): Promise<TProject> => {
    let storage = await _getStorage(tezos!, contractAddress);

    return _getProject(storage, project_id);
  };

  const getProjects = async (): Promise<TProject[]> => {
    let storage = await _getStorage(tezos!, contractAddress);
    let total_projects = storage.total_projects.toNumber();

    const projects: TProject[] = [];

    for (let i = 0; i < total_projects; i++) {
      projects.push(await _getProject(storage, i));
    }

    return projects;
  };

  const postProject = async ({
    cid_metadata,
    milestones,
    funding_due_date,
  }: {
    cid_metadata: string;
    milestones: TMilestone[];
    funding_due_date: Date;
  }): Promise<void> => {
    if (!connected) {
      throw new Error("Not connected");
    }

    let contract = await tezos!.wallet.at(contractAddress);
    let methods = contract.methods as unknown as TMethodsExternal;

    methods.post_project(cid_metadata, funding_due_date, milestones).send();
  };

  const vote = async ({
    project_id,
    milestone_id,
  }: {
    project_id: number;
    milestone_id: number;
  }): Promise<void> => {
    if (!connected) {
      throw new Error("Not connected");
    }

    let contract = await tezos!.wallet.at(contractAddress);
    let methods = contract.methods as unknown as TMethodsExternal;

    await methods.desaprove_milestone(project_id, milestone_id).send();
  };

  const fundProject = async (
    project_id: number,
    amount: number
  ): Promise<void> => {
    if (!connected) {
      throw new Error("Not connected");
    }

    let contract = await tezos!.wallet.at(contractAddress);
    let methods = contract.methods as unknown as TMethodsExternal;

    await methods.fund_project(project_id).send({ amount });
  };

  return (
    <KicksmarterCtx.Provider
      value={{
        pushMetadataToIPFS,
        pushImageToIPFS,
        getProjects,
        getProject,
        postProject,
        vote,
        fundProject,
      }}
    >
      {children}
    </KicksmarterCtx.Provider>
  );
};

export { KicksmarterProvider, useKickSmarter };
