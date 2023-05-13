import TProject from "./TProject";
import TMilestone from "./TMilestone";

type KicksmarterCtx = {
  getProjects: () => Promise<TProject[]>;

  getProject: (project_id: number) => Promise<TProject>;

  vote: ({
    project_id,
    milestone_id,
  }: {
    project_id: number;
    milestone_id: number;
  }) => Promise<void>;

  postProject: ({
    cid_metadata,
    milestones,
    funding_due_date,
  }: {
    cid_metadata: string;
    milestones: TMilestone[];
    funding_due_date: Date;
  }) => Promise<void>;

  fundProject: (project_id: number, amount: number) => Promise<void>;

  pushMetadataToIPFS: ({
    title,
    description,
    images,
  }: {
    title: string;
    description: string;
    images: string[];
  }) => Promise<string>;

  pushImageToIPFS: (image: File) => Promise<string>;
};

export default KicksmarterCtx;
