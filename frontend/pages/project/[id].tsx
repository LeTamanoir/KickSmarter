import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
	VStack,
	HStack,
	Text,
	Image,
	Stepper,
	useSteps,
	Step,
	StepIndicator,
	StepSeparator,
	StepTitle,
	StepDescription,
	StepStatus,
	Progress,
	StepIcon,
	StepNumber,
	Box,
	Divider,
	Card,
	Stack,
	CardBody,
	Heading,
	CardFooter,
	Button,
	Input,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

import Navbar from '@/src/components/Navbar';
import { useKickSmarter } from '@/sdk';
import TProject from '@/sdk/types/TProject';
import TMilestone from '@/sdk/types/TMilestone';
import { useTezosContext } from '@/src/contexts/TezosContext';

type Metadata = {
	title: string;
	description: string;
	images: string[];
};

const ProjectDesc = (): JSX.Element => {
	const router = useRouter();

	const KickSmarter = useKickSmarter();
	const { wallet, tezos, connectWallet, disconnectWallet, connected } = useTezosContext();

	const [project, setProject] = useState<TProject>();
	const [metadata, setMetadata] = useState<Metadata>();
	const [image, setImage] = useState<string>('');
	const [fundValue, setFundValue] = useState<number>(0);
	const [address, setAddress] = useState<string>('');

	const { activeStep } = useSteps({
		index: 0,
		count: project?.milestones.length,
	});

	useEffect(() => {
		const projectId: number = parseInt(router.query.id as string);
		KickSmarter.getProject(projectId)
			.then(async (kickProject) => {
				setProject(kickProject);
				setAddress(await wallet?.getPKH());
				try {
					setMetadata(await KickSmarter.getMetadataFromIPFS(kickProject.cid_metadata));
					setImage(await KickSmarter.getImageFromIPFS(metadata?.images[0] as string));
				} catch (e) {
					console.error(e);
				}
			})
			.catch((e) => console.error(e));
	}, [router, project]);

	const supportProject = () => {
		if (!project || fundValue <= 0 || project.current_amount + fundValue > project.target_amount) return;

		KickSmarter.fundProject(project.id, fundValue)
			.then((response) => {})
			.catch((error) => console.error(error));
	};

	const disapproveMileston = (milestone_id: number) => {
		if (!project) return;

		KickSmarter.disapproveMilestone({
			project_id: project.id,
			milestone_id,
		})
			.then((response) => {})
			.catch((error) => console.error(error));
	};

	if (!project) {
		return (
			<>
				<VStack w='100%' mb='30px'>
					<Navbar />
					<Text>Project {router.query.id} not found</Text>
				</VStack>
			</>
		);
	}

	return (
		<>
			<VStack w='100%' mb='30px'>
				<Navbar />
				<Text pt='30px' fontSize='3xl' fontWeight='bold'>
					{metadata?.title}
				</Text>
				<Text fontSize='xl'>{metadata?.description}</Text>

				<HStack align='start' pt='50px'>
					<Image maxW='600px' src={image} />
					<VStack w='70%' align='start' pl='50px' pt='5px'>
						<Text fontSize='xl' color='blue.500' fontWeight='bold'>
							{project.status === 'FUNDING' ? 'Funding' : 'Project in progress'}
						</Text>
						{project?.status !== 'FUNDING' ? (
							<>
								<Stepper size='lg' index={activeStep} w='100%'>
									{project?.milestones.map((step: TMilestone, index: number) => (
										<Step key={index}>
											<StepIndicator>
												<StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
											</StepIndicator>

											<Box flexShrink='0'>
												<StepTitle>{step.required_amount} xtz</StepTitle>
												<StepDescription>{step.due_date.toDateString()}</StepDescription>
											</Box>

											<StepSeparator />
										</Step>
									))}
								</Stepper>
							</>
						) : (
							<>
								<Progress w='100%' value={(project.current_amount / project.target_amount) * 100} />
								<Text>
									{project.current_amount} / {project.target_amount} xtz
								</Text>
								<HStack>
									<Input
										w='40%'
										type='number'
										value={fundValue}
										onChange={(event) => setFundValue(event.target.value)}
									/>
									<Button bg='#7CB4C4' onClick={supportProject}>
										Support this project
									</Button>
								</HStack>
							</>
						)}
						<VStack align='start' spacing='20px' pt='5px'>
							<Text>
								<b style={{ fontSize: '25px' }}>{project.funding_due_date.toDateString()}</b>
								<br /> end of funding
							</Text>
							<Text>
								<b style={{ fontSize: '25px' }}>{project.milestones[0].start_date.toDateString()}</b>
								<br />
								next vote
							</Text>
							<Text>
								<b style={{ fontSize: '25px' }}>{project.votes.length}</b>
								<br /> backers
							</Text>
							{project.status === 'IN_PROGRESS' && (
								<>
									<Button bg='#7CB4C4' onClick={disapproveMileston}>
										Disaprove milestone
									</Button>
								</>
							)}
						</VStack>
					</VStack>
				</HStack>

				{/* Support the project */}
				{project?.investors.find((value) => value.address === address) && (
					<>
						<HStack spacing='10px' pt='20px' pb='20px'>
							<CheckCircleIcon boxSize='8' />
							<Text fontSize='xl'>You support this project</Text>
						</HStack>
					</>
				)}

				<Divider />

				<Text fontSize='2xl' pt='20px' fontWeight='bold' pb='20px'>
					News
				</Text>
				<Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
					<Image
						objectFit='cover'
						maxW={{ base: '100%', sm: '200px' }}
						src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
						alt='Caffe Latte'
					/>
					<Stack>
						<CardBody>
							<Heading size='md'>Le coiffeur de Gatien</Heading>
							<Text py='2' maxW='3xl'>
								Etiam faucibus, turpis id iaculis tincidunt, metus enim blandit lacus, a sodales velit ante eu ipsum.
								Proin maximus placerat lectus, nec sagittis nisl sollicitudin ut. Fusce hendrerit neque a felis
								consectetur, ut gravida felis vestibulum. Sed purus orci, tincidunt non ex id, dignissim vehicula ex.
								Phasellus nec arcu eget lacus facilisis tincidunt vitae id sapien. Suspendisse pulvinar nibh sit amet
								arcu molestie, vitae venenatis ex pretium. Mauris eget arcu massa. Aliquam condimentum dolor cursus
								vehicula ultricies. Pellentesque fringilla quam quis arcu porta, vitae finibus est sagittis. Integer
								pellentesque, est vitae interdum fermentum, mauris tortor auctor arcu, in hendrerit dolor velit at urna.
								Etiam faucibus, turpis id iaculis tincidunt, metus enim blandit lacus, a sodales velit ante eu ipsum.
								Proin maximus placerat lectus, nec sagittis nisl sollicitudin ut. Fusce hendrerit neque a felis
								consectetur, ut gravida felis vestibulum. Sed purus orci, tincidunt non ex id, dignissim vehicula ex.
								Phasellus nec arcu eget lacus facilisis tincidunt vitae id sapien. Suspendisse pulvinar nibh sit amet
								arcu molestie, vitae venenatis ex pretium. Mauris eget arcu massa. Aliquam condimentum dolor cursus
								vehicula ultricies. Pellentesque fringilla quam quis arcu porta, vitae finibus est sagittis. Integer
								pellentesque, est vitae interdum fermentum, mauris tortor auctor arcu, in hendrerit dolor velit at urna.
							</Text>
						</CardBody>
						<CardFooter>
							<Button variant='solid' colorScheme='blue'>
								View more
							</Button>
						</CardFooter>
					</Stack>
				</Card>
			</VStack>
		</>
	);
};

export default ProjectDesc;
