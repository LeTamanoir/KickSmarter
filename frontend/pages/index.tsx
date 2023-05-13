import { CONTRACT_ADDRESS } from "@/src/constants";
import { useTezosContext } from "@/src/contexts/TezosContext";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";

const Home = () => {
  const { wallet, tezos, connectWallet, disconnectWallet, connected } =
    useTezosContext();

  useEffect(() => {
    if (!connected) return;

    tezos!.contract
      .at(CONTRACT_ADDRESS)
      .then((contract) => contract.storage())
      .then((storage) => {
        console.log(storage);
      });
  }, [connected]);

  return (
    <div>
      <h1>KickSmarter</h1>

      {connected ? <h2>Connected</h2> : <h2>Not connected</h2>}

      <Button onClick={() => connectWallet()}>Connect wallet</Button>
      <Button onClick={() => disconnectWallet()}>Disconnect wallet</Button>
    </div>
  );
};

export default Home;
