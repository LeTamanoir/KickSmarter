import { MichelsonMap } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';
import TMilestone from './TMilestone';
import Address from './TAddress';
import { TProjectStatus } from './TProject';

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
	votes: MichelsonMap<BigNumber, { total_weight: BigNumber; voters: Address[] }>;
	status: { [K in TProjectStatus]: void };
};

type TStorageExternal = {
	projects: MichelsonMap<string, any>;
	addr_to_projects: MichelsonMap<string, any>;
	investors: MichelsonMap<string, any>;
	project_makers: MichelsonMap<string, any>;
	total_projects: BigNumber;
};

type TMethodsExternal = {
	disapprove_milestone: (project_id: number, milestone_id: number) => any;
	fund_project: (project_id: number) => any;
	post_project: (cid_metadata: string, funding_due_date: Date, milestones: TMilestone[]) => any;
	claim_milestone: (project_id: number, milestone_id: number) => any;
	abort_project: (project_id: number, milestone_id: number) => any;
	abort_project_funding: (project_id: number) => any;
};

export type { TProjectExternal, TStorageExternal, TMethodsExternal };
