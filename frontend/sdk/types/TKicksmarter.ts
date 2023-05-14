import TProject from './TProject';
import TMilestone from './TMilestone';

type Kicksmarter = {
	/**
	 * Get all projects
	 */
	getProjects: () => Promise<TProject[]>;

	/**
	 * Get a project by id
	 */
	getProject: (project_id: number) => Promise<TProject>;

	/**
	 * Disapprove a milestone for a project
	 */
	disapproveMilestone: ({ project_id, milestone_id }: { project_id: number; milestone_id: number }) => Promise<void>;

	/**
	 * Post a project
	 */
	postProject: ({
		cid_metadata,
		milestones,
		funding_due_date,
	}: {
		cid_metadata: string;
		milestones: TMilestone[];
		funding_due_date: Date;
	}) => Promise<void>;

	/**
	 * Fund a project
	 */
	fundProject: (project_id: number, amount: number) => Promise<void>;

	/**
	 * Claim a milestone
	 */
	claimMilestone: (project_id: number, milestone_id: number) => Promise<void>;

	/**
	 * Abort a project
	 */
	abortProject: (project_id: number, milestone_id: number) => Promise<void>;

	/**
	 * Abort a project while in funding stage
	 */
	abortProjectFunding: (project_id: number) => Promise<void>;

	/**
	 * Push a project metadata to IPFS
	 */
	pushMetadataToIPFS: ({
		title,
		description,
		images,
	}: {
		title: string;
		description: string;
		images: string[];
	}) => Promise<string>;

	/**
	 * Push an image to IPFS
	 */
	pushImageToIPFS: (image: File) => Promise<string>;

	/**
	 * Get an image from IPFS
	 */
	getImageFromIPFS: (cid: string) => Promise<string>;

	/**
	 * Get a metadata from IPFS
	 */
	getMetadataFromIPFS: (cid: string) => Promise<{
		title: string;
		description: string;
		images: string[];
	}>;
};

export default Kicksmarter;
