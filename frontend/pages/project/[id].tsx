import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { VStack, HStack, Text, Image, Stepper, useSteps, Step, StepIndicator, StepSeparator, StepTitle, StepDescription, StepStatus, StepIcon, StepNumber, Box, Divider, Card, Stack, CardBody, Heading, CardFooter, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

import Navbar from '@/components/Navbar';
import { useKickSmarter } from '@/../sdk';
import TProject from '@/../sdk/types/TProject';
import TMilestone from '@/../sdk/types/TMilestone';

const ProjectDesc = (): JSX.Element => {

    const router = useRouter();

    const KickSmarter = useKickSmarter();

    const [project, setProject] = useState<TProject>();

    const { activeStep } = useSteps({
        index: 0,
        count: project?.milestones.length,
    });

    useEffect(() => {
        const projectId: number = parseInt(router.query.id as string);
        KickSmarter.getProject(projectId)
            .then((kickProject) => setProject(kickProject))
            .catch((e) => console.error(e));
    }, [router, project]);

    if (!project) {
        return (
            <>
                <VStack w="100%" mb="30px">
                    <Navbar />
                    <Text>Project {router.query.id} not found</Text>
                </VStack>
            </>
        );
    }

    return (
        <>
            <VStack w="100%" mb="30px">
                <Navbar />
                <Text pt="30px" fontSize="3xl" fontWeight="bold">{project.id}</Text>
                <Text fontSize="xl">Project description</Text>

                <HStack align="start" pt="50px">
                    <Image w="800px" src="data:image/jpeg;base64,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" />
                    <VStack w="70%" align="start" pl="50px" pt="5px">
                        <Text fontSize="xl" color="blue.500" fontWeight="bold">Project in progress</Text>
                        <Stepper size='lg' index={activeStep} w="100%">
                            {project?.milestones.map((step: TMilestone, index: number) => (
                                <Step key={index}>
                                    <StepIndicator>
                                        <StepStatus
                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={<StepNumber />}
                                        />
                                    </StepIndicator>

                                    <Box flexShrink='0'>
                                        <StepTitle>{step.required_amount} xtz</StepTitle>
                                        <StepDescription>{step.due_date.toDateString()}</StepDescription>
                                    </Box>

                                    <StepSeparator />
                                </Step>
                            ))}
                        </Stepper>
                        <VStack align="start" spacing="20px" pt="5px">
                            <Text><b style={{ fontSize: '25px'}}>{project.funding_due_date.toDateString()}</b><br />days before next vote</Text>
                            <Text><b style={{ fontSize: '25px' }}></b><br />next vote</Text>
                            <Text><b style={{ fontSize: '25px' }}>{project.votes.length}</b><br /> backers</Text>
                        </VStack>
                    </VStack>
                </HStack>

                {/* Support the project */}
                <HStack spacing="10px" pt="20px" pb="20px">
                    <CheckCircleIcon boxSize="8" />
                    <Text fontSize="xl">You support this project</Text>
                </HStack>

                <Divider />

                <Text fontSize="2xl" pt="20px" fontWeight="bold" pb="20px">News</Text>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                        alt='Caffe Latte'
                    />
                    <Stack>
                        <CardBody>
                        <Heading size='md'>Le coiffeur de Gatien</Heading>
                        <Text py='2' maxW="3xl">
                        Etiam faucibus, turpis id iaculis tincidunt, metus enim blandit lacus, a sodales velit ante eu ipsum. Proin maximus placerat lectus, nec sagittis nisl sollicitudin ut. Fusce hendrerit neque a felis consectetur, ut gravida felis vestibulum. Sed purus orci, tincidunt non ex id, dignissim vehicula ex. Phasellus nec arcu eget lacus facilisis tincidunt vitae id sapien. Suspendisse pulvinar nibh sit amet arcu molestie, vitae venenatis ex pretium. Mauris eget arcu massa. Aliquam condimentum dolor cursus vehicula ultricies. Pellentesque fringilla quam quis arcu porta, vitae finibus est sagittis. Integer pellentesque, est vitae interdum fermentum, mauris tortor auctor arcu, in hendrerit dolor velit at urna.
                        Etiam faucibus, turpis id iaculis tincidunt, metus enim blandit lacus, a sodales velit ante eu ipsum. Proin maximus placerat lectus, nec sagittis nisl sollicitudin ut. Fusce hendrerit neque a felis consectetur, ut gravida felis vestibulum. Sed purus orci, tincidunt non ex id, dignissim vehicula ex. Phasellus nec arcu eget lacus facilisis tincidunt vitae id sapien. Suspendisse pulvinar nibh sit amet arcu molestie, vitae venenatis ex pretium. Mauris eget arcu massa. Aliquam condimentum dolor cursus vehicula ultricies. Pellentesque fringilla quam quis arcu porta, vitae finibus est sagittis. Integer pellentesque, est vitae interdum fermentum, mauris tortor auctor arcu, in hendrerit dolor velit at urna.
                        </Text>
                        </CardBody>
                        <CardFooter>
                        <Button variant='solid' colorScheme='blue'>View more</Button>
                        </CardFooter>
                    </Stack>
                    </Card>

            </VStack>
        </>
    );
};

export default ProjectDesc;
