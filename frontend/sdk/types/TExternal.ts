import { MichelsonMap } from "@taquito/taquito";
import { BigNumber } from "bignumber.js";
import TMilestone from "./TMilestone";
import Address from "./TAddress";

type TProjectExternal = {
  id: BigNumber;
  cid_metadata: string;
  funding_due_date: Date;
  funding_start_date: Date;
  investors: MichelsonMap<string, BigNumber>;
  milestones: MichelsonMap<
    string,
    {
      cid_metadata: string;
      required_amount: BigNumber;
      start_date: Date;
      due_date: Date;
    }
  >;
  current_amount: BigNumber;
  target_amount: BigNumber;
  owner: string;
  votes: MichelsonMap<
    BigNumber,
    { total_weight: BigNumber; voters: Address[] }
  >;
};

type TStorageExternal = {
  projects: MichelsonMap<string, any>;
  addr_to_projects: MichelsonMap<string, any>;
  investors: MichelsonMap<string, any>;
  project_makers: MichelsonMap<string, any>;
  total_projects: BigNumber;
};

type TMethodsExternal = {
  desaprove_milestone: (project_id: number, milestone_id: number) => any;
  fund_project: (project_id: number) => any;
  post_project: (
    cid_metadata: string,
    funding_due_date: Date,
    milestones: TMilestone[]
  ) => any;
};

export type { TProjectExternal, TStorageExternal, TMethodsExternal };
