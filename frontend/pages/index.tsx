import { VStack } from '@chakra-ui/react';

import Navbar from '@/components/Navbar';
import WelcomePage from '@/components/WelcomePage';

const Home = () => (
	<VStack w='100%'>
		<Navbar />
		<WelcomePage />
	</VStack>
);

export default Home;
