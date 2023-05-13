import { Image, Text, Heading } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react'
import { Card, CardBody } from '@chakra-ui/react'
// import Connection from './buttons/Connection';

type ProjectProps = {
  name: string;
  description: string;
  author: string;
};

const Project = ({ name, description, author }: ProjectProps) => {
  return (
    <Card maxW='md'>
      <CardBody>
        <Image
          src='https://www.pexels.com/photo/2662116/download/'
          alt='Project Preview'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{name}</Heading>
          <Text>{description}</Text>
          <Text as='i'>{author}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Project;
