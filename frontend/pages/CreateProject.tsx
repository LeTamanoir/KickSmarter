import {
  FormControl,
  Input,
  VStack,
  FormLabel,
  Textarea,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

const SubmitStateButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const HandleClick = () => {
    setIsLoading(true);
  };
  return (
    <Button
      isLoading={isLoading}
      onClick={HandleClick}
      colorScheme="teal"
      variant="solid"
    >
      Submitting Project
    </Button>
  );
};

const CreateProject = () => {
  return (
    <VStack>
      <Heading as="h2" size="lg" textAlign="center" marginTop="10">
        Create a new project
      </Heading>
      <FormControl>
        <FormLabel marginTop="5">Name of your project</FormLabel>
        <Input placeholder="Your project name here !" />
      </FormControl>
      <FormControl>
        <FormLabel marginTop="5">Description of your project</FormLabel>
        <Input placeholder="Describe your project here !" />
      </FormControl>
      <Textarea placeholder="Your promise for your investors" />
      <SubmitStateButton />
    </VStack>
  );
};

export default CreateProject;
