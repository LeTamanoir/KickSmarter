import { useState, useEffect } from "react";
import {
  VStack,
  Text,
  Box,
  SimpleGrid,
  Input,
  InputGroup,
  Button,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Navbar from "@/src/components/Navbar";
import Project from "@/src/components/Project";
import { useKickSmarter } from "../sdk";
import TProject from "../sdk/types/TProject";

const Projects = () => {
  const KickSmarter = useKickSmarter();

  const [projects, setProjects] = useState<TProject[]>([]);

  useEffect(() => {
    KickSmarter.getProjects()
      .then((kickProjects) => {
        console.log(kickProjects);
        setProjects(kickProjects);
      })
      .catch((e) => console.error(e));
  }, [projects]);

  const [search, setSearch] = useState<string>(""); // TODO
  const [nElem, setnElem] = useState<number>(9);

  return (
    <>
      <Navbar />
      <Box mx="300px" mb="30px">
        <VStack justify="center" spacing="40px" pt="30px" mb="20px">
          <Text fontSize="2xl">The future of crowdfunding!</Text>
          <InputGroup w="50%">
            <InputLeftElement>
              <Search2Icon />
            </InputLeftElement>
            <Input
              placeholder="Search a project"
              onChange={(event) => setSearch(event.target.value)}
            />
          </InputGroup>
        </VStack>

        {/* Explore projects */}
        <Text fontSize="xl" fontWeight="bold">
          Explore our {projects.length} projects
        </Text>
        <VStack mt="30px">
          <SimpleGrid columns={3} spacingX="8" spacingY="8" mb="20px">
            {projects.slice(0, nElem).map((project) => (
              <Box key={project.id}>
                <Project
                  id={project.id}
                  title={"Project " + project.id}
                  description={"Project " + project.id}
                  author={project.owner.slice(0, 10) + "..."}
                />
              </Box>
            ))}
          </SimpleGrid>
          {nElem < projects.length && (
            <Button
              size="md"
              mt=""
              bg="#7CB4C4"
              onClick={() => setnElem(nElem + 9)}
            >
              Load more
            </Button>
          )}
        </VStack>
      </Box>
    </>
  );
};

export default Projects;
