import { Button, HStack, Image, Text } from '@chakra-ui/react';
import { useTezosContext } from '@/contexts/TezosContext';
import { useEffect } from 'react';
import { CONTRACT_ADDRESS } from '@/constants';

const Connection = () => {
    const { wallet, tezos, connectWallet, disconnectWallet, connected } = useTezosContext();

    useEffect(() => {
        if (!connected) return;

        tezos!.contract
            .at(CONTRACT_ADDRESS)
            .then((contract) => contract.storage())
            .then((storage) => {
                console.log(storage);
            });
    }, [connected]);

    const buttonAction = () => {
        if (!connected) {
            connectWallet();
            return;
        }
        disconnectWallet();
    };

    return (
        <>
            <Button bg="#7CB4C4" onClick={buttonAction}>
                <HStack>
                    <Image w="30px" src="/assets/tezos.png" />
                    <Text>{!connected ? "Connect wallet" : "Disconnect wallet"}</Text>
                </HStack>
            </Button>
        </>
    );
};

export default Connection;
