import Navbar from "@/src/components/Navbar";
import {
  FormControl,
  Input,
  VStack,
  FormLabel,
  Textarea,
  Button,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import TMilestone from "@/sdk/types/TMilestone";
import { useKickSmarter } from "@/sdk";
import NewMilestone from "@/src/components/NewMilestone";

const Create = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<TMilestone[]>([]);
  const [dueDate, setDueDate] = useState<Date>(new Date(Date.now()));
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDesc] = useState<string>("");

  const KickSmarter = useKickSmarter();

  const submitProject = () => {
    KickSmarter.pushMetadataToIPFS({ title, description, images: [image]})
      .then((response) => {
        KickSmarter.postProject({
          cid_metadata: response,
          milestones,
          funding_due_date: dueDate,
        })
          .then((response) => {})
          .catch((e) => console.error(e));
      })
      .catch((error) => console.error(error));
  };

  const newMilestone = (milestone: TMilestone) => {
    setMilestones(prevState => [...prevState, milestone]);
  }

  return (
    <VStack w="100%">
      <Navbar />
      <VStack w="100%" px="550px" pt="30px" spacing="10px">
        <Text fontSize="2xl">Create a new project</Text>

        <FormControl>
          <FormLabel marginTop="5">Name of your project</FormLabel>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="placeholder"
          />
        </FormControl>

        <FormControl>
          <FormLabel marginTop="5">Description of your project</FormLabel>
          <Input
            value={description}
            onChange={(event) => setDesc(event.target.value)}
            placeholder="placeholder"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Select an image to illustrate the project</FormLabel>
        <input
        type="file"
        onChange={async (e) => {
          if (!e.target.files) return;

          let file = e.target.files[0];

          try {
            setImage(await KickSmarter.pushImageToIPFS(file));
          } catch (e) {
            console.error(e);
          }
        }}
      />
        </FormControl>

        <FormControl>
          <FormLabel marginTop="5">End date of the funding</FormLabel>
          <Input
            type="date"
            value={
              dueDate.getFullYear().toString() +
              "-" +
              (dueDate.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              dueDate.getDate().toString().padStart(2, "0")
            }
            onChange={(event) => setDueDate(new Date(event.target.value))}
          />
        </FormControl>

        <VStack w="100%">
          <FormLabel alignSelf="start" marginTop="5">
            Milestones
          </FormLabel>
          <TableContainer w="100%">
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Step</Th>
                  <Th>Pledge</Th>
                  <Th>Due date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {milestones.map((milestone: TMilestone, index: number) => (
                  <Tr key={index}>
                    <Td>{index}</Td>
                    <Td>{milestone.required_amount}</Td>
                    <Td>{milestone.due_date.toDateString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Button bg="#7cb4c4" onClick={onOpen}>
            Add new milestone
          </Button>
          <NewMilestone
            isOpen={isOpen}
            onClose={onClose}
            confirm={newMilestone}
          />
        </VStack>

        <FormControl>
          <FormLabel marginTop="5">
            Your promise for your investors at the end of the fundraising
          </FormLabel>
          <Textarea placeholder="placeholder" />
        </FormControl>
        <Button isLoading={isLoading} onClick={submitProject} bg="#7cb4c4">
          Submit project
        </Button>
      </VStack>
    </VStack>
  );
};

export default Create;
