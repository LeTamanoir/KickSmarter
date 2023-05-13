import { useKickSmarter } from "@/../sdk";
import { useTezosContext } from "@/contexts/TezosContext";
import { Button, VStack } from "@chakra-ui/react";

import Navbar from '@/components/Navbar';
import WelcomePage from "@/components/WelcomePage";

const Home = () => {

  const { wallet, tezos, connectWallet, disconnectWallet, connected } = useTezosContext();

  const KickSmarter = useKickSmarter();

  // return (
  //   <div>
  //     <h1>KickSmarter</h1>

  //     {connected ? <h2>Connected</h2> : <h2>Not connected</h2>}

  //     <Button onClick={() => connectWallet()}>Connect wallet</Button>
  //     <Button onClick={() => disconnectWallet()}>Disconnect wallet</Button>

  //     <Button
  //       onClick={() => {
  //         KickSmarter.getProjects().then(console.log);
  //       }}
  //     >
  //       Test getProjects
  //     </Button>
  //     <Button
  //       onClick={() => {
  //         KickSmarter.getProject(1).then(console.log);
  //       }}
  //     >
  //       Test getProject
  //     </Button>
  //     <Button
  //       onClick={() => {
  //         KickSmarter.postProject({
  //           cid_metadata: "cid_metadata",
  //           milestones: [
  //             {
  //               cid_metadata: "cid_metadata",
  //               due_date: new Date(Date.now() + 1000 * 60 * 60 * 20),
  //               start_date: new Date(Date.now() + 1000 * 60 * 60 * 10),
  //               required_amount: 200,
  //             },
  //           ],
  //           funding_due_date: new Date(Date.now() + 1000 * 60 * 60 * 8),
  //         });
  //       }}
  //     >
  //       Test postProject
  //     </Button>

  //     <Button
  //       onClick={() => {
  //         KickSmarter.vote({
  //           project_id: 1,
  //           milestone_id: 0,
  //         });
  //       }}
  //     >
  //       Test vote
  //     </Button>

  //     <Button
  //       onClick={() => {
  //         KickSmarter.fundProject(1, 0.00001);
  //       }}
  //     >
  //       Test fundProject
  //     </Button>

  //     <Button
  //       onClick={() => {
  //         KickSmarter.pushMetadataToIPFS({
  //           description: "Hello world 2",
  //           title: "Hello world 1",
  //         });
  //       }}
  //     >
  //       Test sendToIPFS
  //     </Button>
  //   </div>
  // );
  return (
    <div>
      <h1>KickSmarter</h1>

      {connected ? <h2>Connected</h2> : <h2>Not connected</h2>}

      <Button onClick={() => connectWallet()}>Connect wallet</Button>
      <Button onClick={() => disconnectWallet()}>Disconnect wallet</Button>

      <Button
        onClick={() => {
          KickSmarter.getProjects().then(console.log);
        }}
      >
        Test getProjects
      </Button>
      <Button
        onClick={() => {
          KickSmarter.getProject(1).then(console.log);
        }}
      >
        Test getProject
      </Button>
      <Button
        onClick={() => {
          KickSmarter.postProject({
            cid_metadata: "cid_metadata",
            milestones: [
              {
                cid_metadata: "cid_metadata",
                due_date: new Date(Date.now() + 1000 * 60 * 60 * 20),
                start_date: new Date(Date.now() + 1000 * 60 * 60 * 10),
                required_amount: 200,
              },
            ],
            funding_due_date: new Date(Date.now() + 1000 * 60 * 60 * 8),
          });
        }}
      >
        Test postProject
      </Button>

      <Button
        onClick={() => {
          KickSmarter.vote({
            project_id: 1,
            milestone_id: 0,
          });
        }}
      >
        Test vote
      </Button>

      <Button
        onClick={() => {
          KickSmarter.fundProject(1, 0.00001);
        }}
      >
        Test fundProject
      </Button>

      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files);

          if (!e.target.files) return;

          let file = e.target.files[0];

          console.log(file.type);

          KickSmarter.pushImageToIPFS(file);
        }}
      />
    </div>
  );
};

export default Home;
