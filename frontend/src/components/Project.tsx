import { Image, Text, Heading } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react'
import { Card, CardBody } from '@chakra-ui/react'
// import Connection from './buttons/Connection';


const Project = () => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src='https://www.pexels.com/photo/2662116/download/'
          alt='Project Preview'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>Project Name here !</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipi elit.
            Fusce eleifend nulla eget vulputate congue.
            Donec porta tellus nec tempus tempus. Duis id laoreet libero, non molestie tellus.
          </Text>
          <Text as='i'>
            Made with ♥ by ...
          </Text>
      </Stack>
    </CardBody>
  </Card>
  );
};

export default Project;
