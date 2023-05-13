import { HStack, Image, Link } from '@chakra-ui/react';
import Connection from './buttons/Connection';

const Navbar = () => {
    return (
        <>
            <HStack w="100%" justify="space-between" px="4%" py="0.5%" borderBottom="1px" borderBottomColor="#E8E8E8">
                <Image h="40px" src="/assets/logo.png" />
                <HStack spacing="40px">
                    <Link href="/projects">Projects</Link>
                    <Link href="/about">About</Link>
                </HStack>
                <HStack spacing="40px">
                    <Link href="/create">Create</Link>
                    <Connection />
                </HStack>
            </HStack>
        </>
    );
};

export default Navbar;
