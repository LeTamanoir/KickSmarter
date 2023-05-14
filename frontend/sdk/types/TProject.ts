import Address from './TAddress';
import TInvestor from './TInvestor';
import TMilestone from './TMilestone';
import TVote from './TVote';

export type TProjectStatus = 'FUNDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ABORTED';

type TProject = {
	id: number;
	owner: Address;
	cid_metadata: string;
	milestones: TMilestone[];
	target_amount: number;
	current_amount: number;
	investors: TInvestor[];
	votes: TVote[];
	funding_start_date: Date;
	funding_due_date: Date;
	status: TProjectStatus;
};

export default TProject;
