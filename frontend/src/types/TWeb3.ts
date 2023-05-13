import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";

type TWeb3 = {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  wallet: BeaconWallet | undefined;
  tezos: TezosToolkit | undefined;
  connected: boolean;
};

export default TWeb3;
