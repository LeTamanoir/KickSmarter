import { useState } from 'react';
import { VStack, Text, Box, SimpleGrid, Input, InputGroup, Button, InputLeftElement } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import _ from 'lodash';

import Navbar from '@/components/Navbar';
import Project from '@/components/Project';

const Projects = () => {

    const [projects, setProjects] = useState<any[]>([
        {name: "Gatien la chauve2", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve3", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve4", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve5", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve6", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve7", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve8", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve9", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve0", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
        {name: "Gatien la chauve1", description: "Projet visant à démocratiser la chevelure de Gatienfjkdsjfksjdfkjdsjflksdjfksldjfksdjfklsdjqlfkjskdljfklsdqjfl", author: "FSDFJSKJF"},
    ]);

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
                        <Input placeholder="Search a project" onChange={(event) => setSearch(event.target.value)} />
                    </InputGroup>
                </VStack>

                {/* Explore projects */}
                <Text fontSize="xl" fontWeight="bold">Explore our {projects.length} projects</Text>
                <VStack mt="30px">
                    <SimpleGrid columns={3} spacingX="50px" spacingY="50px" mb="20px">
                        {projects.slice(0, nElem).map((project) => (
                            <Box key={project.name}>
                                <Project name={project.name} description={project.description} author={project.author} />
                            </Box>
                        ))}
                    </SimpleGrid>
                    {nElem < projects.length && <Button size="md" mt="" bg="#7CB4C4" onClick={() => setnElem(nElem + 9)}>Load more</Button>}
                </VStack>
            </Box>
        </>
    );
};

export default Projects;
