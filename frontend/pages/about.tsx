import React from 'react';
import { Heading, VStack, Avatar, Button, Flex } from '@chakra-ui/react';
import Navbar from '@/src/components/Navbar';

const Persons = [
	{
		picture: '/assets/isma.jpeg',
		link: 'https://www.linkedin.com/in/ismael-fall/',
		name: 'Ismaël',
	},
	{
		picture: '/assets/martin.jpg',
		link: 'https://www.linkedin.com/in/martin-saldinger/',
		name: 'Martin',
	},
	{
		picture: '/assets/leo.jpg',
		link: 'https://www.linkedin.com/in/leo-dubosclard/',
		name: 'Léo',
	},
	{
		picture: '/assets/mounia.jpg',
		link: 'https://www.linkedin.com/in/mounia-arjdal/',
		name: 'Mounia',
	},
	{
		picture: '/assets/gatien.jpg',
		link: 'https://www.linkedin.com/in/gatien-rittner/',
		name: 'Gatien',
	},
];

const CardProfile = (): JSX.Element => (
	<Flex alignSelf={'center'}>
		{Persons.map((person) => (
			<VStack mb='%10' mx='8' key={person.link}>
				<Avatar size='2xl' name={person.name} src={person.picture} />
				<Button as='a' href={person.link} bg='#7CB4C4'>
					{person.name}
				</Button>
			</VStack>
		))}
	</Flex>
);

const about = () => {
	return (
		<>
			<Navbar />

			<VStack mt='3%' spacing='3' mb='7%'>
				<Heading mb='5%' size='md'>
					About us
				</Heading>

				<CardProfile />
			</VStack>
		</>
	);
};

export default about;
