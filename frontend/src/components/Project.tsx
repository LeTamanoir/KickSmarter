import { Image, Text, Heading } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react'
import { Card, CardBody, Link } from '@chakra-ui/react'
// import Connection from './buttons/Connection';

type ProjectProps = {
  id: number;
  description: string;
  author: string;
};

const Project = ({ id, description, author }: ProjectProps) => {
  return (
    <Card maxW='md'>
      <CardBody>
        <Link href={`/project/${id}`}>
          <Image
            src='https://www.pexels.com/photo/2662116/download/'
            alt='Project Preview'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{id}</Heading>
            <Text>{description}</Text>
            <Text as='i'>by {author}</Text>
          </Stack>
        </Link>
      </CardBody>
    </Card>
  );
};

export default Project;
