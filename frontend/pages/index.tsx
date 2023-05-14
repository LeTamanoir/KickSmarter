import { VStack, Text } from "@chakra-ui/react";

import Navbar from "@/src/components/Navbar";
import WelcomePage from "@/src/components/WelcomePage";

const Home = () => (
  <>
    <VStack w="100%">
      <Navbar />
      <WelcomePage />
    </VStack>
  </>
);

export default Home;
