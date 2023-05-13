import { HStack, Image, Link } from '@chakra-ui/react';
import Connection from './buttons/Connection';

const Navbar = () => {
    return (
        <>
            <HStack w="100%" justify="space-between" px="4%" py="0.6%" borderBottom="1px" borderBottomColor="#E8E8E8">
                <Link href="/">
                    <Image h="40px" src="/assets/logo.png" />
                </Link>
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
