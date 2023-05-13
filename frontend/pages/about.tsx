import React from "react";
import {
    Heading,
    VStack,
    Avatar, HStack, Button, Link, NextLink,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

const CardProfile = ():JSX.Elements => {
    return (
            <HStack spacing="150px" alignSelf={"center"}>
                <VStack mb="%10">
                <Avatar size='2xl' name='Ismaël' src='/assets/isma.jpeg'/>{' '}
                <Button as="a" href="https://www.linkedin.com/in/ismael-fall/" bg='#7CB4C4'>Ismaël</Button>
                </VStack >
                <VStack mb="%10">
                <Avatar size='2xl' name='Martin' src='/assets/martin.jpg'/>{' '}
                <Button as="a" href="https://www.linkedin.com/in/martin-saldinger/" bg='#7CB4C4'>Martin</Button>
                </VStack >
                <VStack mb="%10">
                <Avatar size='2xl' name='Léo' src='/assets/léo.jpg'/>{' '}
                <Button as="a" href="https://www.linkedin.com/in/leo-dubosclard/" bg='#7CB4C4'>Léo</Button>
                </VStack >
                <VStack mb="%10">
                <Avatar size='2xl' name='Gatien' src='/assets/gatien.jpg'/>{' '}
                <Button as="a" href="https://www.linkedin.com/in/gatien-rittner/" bg='#7CB4C4'>Gatien</Button>
                </VStack >
                <VStack mb="%10">
                <Avatar size='2xl' name='Mounia' src=''/>{' '}
                <Button as="a" href="https://www.linkedin.com/in/mounia-arjdal/" bg='#7CB4C4'>Mounia</Button>
                </VStack >
            </HStack>
    );
}

const about = () => {
    return (
        <>
            <Navbar />
            <VStack mt='3%' spacing='3' mb="7%">
                <Heading mb="5%" size='md'>About us...</Heading>
                <CardProfile/>
            </VStack>
        </>
    );
}

export default about;
