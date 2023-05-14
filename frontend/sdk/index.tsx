import { createContext, useContext } from "react";
import TKicksmarter from "./types/TKicksmarter";
import TProject from "./types/TProject";
import { useTezosContext } from "@/contexts/TezosContext";
import {
  _assertWalletConnection,
  _getMethods,
  _getProject,
  _getStorage,
} from "./utils";
import {
  pushImageToIPFS,
  getMetadataFromIPFS,
  getImageFromIPFS,
  pushMetadataToIPFS,
} from "./ipfs";
import TMilestone from "./types/TMilestone";

const Kicksmarter = createContext<TKicksmarter>({} as TKicksmarter);
const useKickSmarter = () => useContext(Kicksmarter);

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
    let total_projects = storage?.total_projects.toNumber();

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
    _assertWalletConnection(connected);

    let methods = await _getMethods(tezos!, contractAddress);

    await methods
      .post_project(cid_metadata, funding_due_date, milestones)
      .send();
  };

  const disapproveMilestone = async ({
    project_id,
    milestone_id,
  }: {
    project_id: number;
    milestone_id: number;
  }): Promise<void> => {
    _assertWalletConnection(connected);

    let methods = await _getMethods(tezos!, contractAddress);

    await methods.disapprove_milestone(project_id, milestone_id).send();
  };

  const fundProject = async (
    project_id: number,
    amount: number
  ): Promise<void> => {
    _assertWalletConnection(connected);

    let methods = await _getMethods(tezos!, contractAddress);

    await methods.fund_project(project_id).send({ amount });
  };

  const claimMilestone = async (
    project_id: number,
    milestone_id: number
  ): Promise<void> => {
    _assertWalletConnection(connected);

    let methods = await _getMethods(tezos!, contractAddress);

    await methods.claim_milestone(project_id, milestone_id).send();
  };

  const abortProject = async (
    project_id: number,
    milestone_id: number
  ): Promise<void> => {
    _assertWalletConnection(connected);

    let methods = await _getMethods(tezos!, contractAddress);

    await methods.abort_project(project_id, milestone_id).send();
  };

  const abortProjectFunding = async (project_id: number): Promise<void> => {
    _assertWalletConnection(connected);

    let methods = await _getMethods(tezos!, contractAddress);

    await methods.abort_project_funding(project_id).send();
  };

  return (
    <Kicksmarter.Provider
      value={{
        getMetadataFromIPFS,
        getImageFromIPFS,
        abortProjectFunding,
        claimMilestone,
        abortProject,
        pushMetadataToIPFS,
        pushImageToIPFS,
        getProjects,
        getProject,
        postProject,
        disapproveMilestone,
        fundProject,
      }}
    >
      {children}
    </Kicksmarter.Provider>
  );
};

export { KicksmarterProvider, useKickSmarter };
