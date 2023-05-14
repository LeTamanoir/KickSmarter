import { useState } from 'react';
import TMilestone from '@/sdk/types/TMilestone';
import { Modal, ModalOverlay, ModalContent, Input, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Spacer } from '@chakra-ui/react';
import { useKickSmarter } from '@/sdk';

type NewMilestoneProps = {
    isOpen: boolean;
    onClose: () => void;
    confirm: (milestone: TMilestone) => void;
}

const NewMilestone = ({ isOpen, onClose, confirm }: NewMilestoneProps) => {

    const KickSmarter = useKickSmarter();

    const [amount, setAmout] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date>(new Date(Date.now()));
    const [dueDate, setDueDate] = useState<Date>(new Date(Date.now()));
    const [description, setDesc] = useState<string>("");

    const createMilestone = () => {
        onClose();
        KickSmarter.pushMetadataToIPFS({ title: "", description, images: [] })
            .then((response: string) => {
                console.log("response", response);
                confirm({
                    cid_metadata: response,
                    required_amount: amount,
                    start_date: startDate,
                    due_date: dueDate,
                });
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Define a new milestone</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <FormControl>
                            <FormLabel>Description of the milestone</FormLabel>
                            <Input value={description} onChange={(event) => setDesc(event.target.value)} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Pledge of the milestone</FormLabel>
                            <Input type="number" value={amount} onChange={(event) => setAmout(event.target.value)} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Start date</FormLabel>
                            <Input type="date" value={startDate.getFullYear().toString() + "-" + (startDate.getMonth() + 1).toString().padStart(2, 0) + "-" + startDate.getDate().toString().padStart(2, 0)} onChange={(event) => setStartDate(new Date(event.target.value))} />
                        </FormControl>

                        <FormControl>
                            <FormLabel marginTop="5">End date of the funding</FormLabel>
                            <Input type="date" value={dueDate.getFullYear().toString() + "-" + (dueDate.getMonth() + 1).toString().padStart(2, 0) + "-" + dueDate.getDate().toString().padStart(2, 0)} onChange={(event) => setDueDate(new Date(event.target.value))}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button bg="#E8D5B5" onClick={onClose}>
                            Close
                        </Button>
                        <Button bg="#7CB4C4" onClick={createMilestone}>Confirm</Button>
                        </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewMilestone;
