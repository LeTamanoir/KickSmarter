import { Box, Flex, VStack, Text, Button } from '@chakra-ui/react';
import Project from './Project';
import Connection from './buttons/Connection';
const BoxDescription = () => {
  return (
    <Box bg="#E8D5B5" height="435px" style={{ marginTop: 0 }}>
      <Flex direction="column" justify="center" align="center" height="100%">
        <Text fontSize="6xl" color="#03045E" fontWeight="bold" textAlign="center" marginBottom="-4">
          KickSmarter
        </Text>
        <Text fontSize="3xl" color="#03045E" textAlign="center" marginBottom="8">
          The Future of crowdfunding
        </Text>
        <Connection />
      </Flex>
    </Box>
  );
};


const WelcomePage = () => {
  return (
    <div style={{ marginTop: 0, width:'100%'}}>
      <BoxDescription />
      <VStack>
        <Text fontSize="4xl" color="#03045E" marginTop={5}>
          Popular Projects
        </Text>
        <Flex direction={{ base: "column", md: "row" }}>
          <Project name="Project 1" description="description of the project." author="author 1"/>
          <Project name="Project 2" description="description of the project." author="author 2"/>
          <Project name="Project 3" description="description of the project." author="author 3"/>
        </Flex>
      </VStack>
    </div>
  );
};

export default WelcomePage;
