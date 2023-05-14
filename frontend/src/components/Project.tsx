import { Image, Box, Badge } from '@chakra-ui/react';
import Link from 'next/link';

type ProjectProps = {
	id: number;
	title: string;
	description: string;
	author: string;
};

const Project = ({ id, title, description, author }: ProjectProps) => {
	return (
		<Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
			<Image src='https://www.pexels.com/photo/2662116/download/' alt='Project preview' />

			<Box p='6'>
				<Box display='flex' alignItems='start'>
					<Badge borderRadius='full' px='2' colorScheme='teal'>
						New
					</Badge>
					<Box fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2'>
						{title}
					</Box>
				</Box>

				<Box as={Link} href={`/project/${id}`} mt='1' fontWeight='semibold' lineHeight='tight' noOfLines={1}>
					{description}
				</Box>

				<Box>{author}</Box>
			</Box>
		</Box>
	);
};

export default Project;
