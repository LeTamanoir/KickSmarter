import Address from "./TAddress";

type TVote = {
  milestone_id: number;
  voters: Set<Address>;
  total_weight: number;
};

export default TVote;
