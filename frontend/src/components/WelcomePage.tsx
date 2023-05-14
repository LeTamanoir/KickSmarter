import { Box, Flex, VStack, Text } from '@chakra-ui/react';
import Project from './Project';
import Connection from './buttons/Connection';
import Footer from './Footer';

const BoxDescription = () => {
	return (
		<Box bg='#E8D5B5' height='435px' width='full' style={{ marginTop: 0 }}>
			<Flex direction='column' justify='center' align='center' height='100%'>
				<Text fontSize='6xl' color='#03045E' fontWeight='bold' textAlign='center' marginBottom='-4'>
					KickSmarter
				</Text>

				<Text fontSize='3xl' color='#03045E' textAlign='center' marginBottom='8'>
					The Future of crowdfunding
				</Text>

				<Connection />
			</Flex>
		</Box>
	);
};

const WelcomePage = () => {
	return (
		<>
			<BoxDescription />

			<VStack pb='14'>
				<Text fontSize='4xl' mb='4' color='#03045E' marginTop={5}>
					Popular Projects
				</Text>

				<Flex direction={{ base: 'column', md: 'row' }} gap='10'>
					<Project title='Project 1' id={0} description='description of the project.' author='author 1' />
					<Project title='Project 2' id={1} description='description of the project.' author='author 2' />
					<Project title='Project 3' id={2} description='description of the project.' author='author 3' />
				</Flex>
			</VStack>

			<Footer />
		</>
	);
};

export default WelcomePage;
