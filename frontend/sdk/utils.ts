import { TezosToolkit } from '@taquito/taquito';
import { TMethodsExternal, TProjectExternal, TStorageExternal } from './types/TExternal';
import TProject, { TProjectStatus } from './types/TProject';

const _getProject = async (storage: TStorageExternal, project_id: number): Promise<TProject> => {
	let tmp = (await storage.projects.get(project_id.toString())) as TProjectExternal;

	if (tmp === undefined) {
		throw new Error('Project not found');
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
		status: Object.keys(tmp.status)[0].toUpperCase() as TProjectStatus,
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

const _getStorage = async (tezos: TezosToolkit, contractAddress: string): Promise<TStorageExternal> => {
	let contract = await tezos?.contract.at(contractAddress);
	let storage = (await contract?.storage()) as TStorageExternal;

	return storage;
};

const _getMethods = async (tezos: TezosToolkit, contractAddress: string): Promise<TMethodsExternal> => {
	let contract = await tezos.wallet.at(contractAddress);
	let methods = contract.methods as TMethodsExternal;

	return methods;
};

const _assertWalletConnection = (connected: boolean) => {
	if (!connected) {
		throw new Error('Not connected');
	}
};

export { _getProject, _getMethods, _getStorage, _assertWalletConnection };
