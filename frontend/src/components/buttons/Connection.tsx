import { Button, HStack, Image, Text } from '@chakra-ui/react';
import { useTezosContext } from '@/contexts/TezosContext';

const Connection = () => {
	const { connectWallet, disconnectWallet, connected } = useTezosContext();

	const buttonAction = () => {
		if (!connected) {
			connectWallet();
			return;
		}
		disconnectWallet();
	};

	return (
		<>
			<Button bg='#7CB4C4' onClick={buttonAction}>
				<HStack>
					<Image w='30px' src='/assets/tezos.png' alt='Tezos logo' />
					<Text>{!connected ? 'Connect wallet' : 'Disconnect wallet'}</Text>
				</HStack>
			</Button>
		</>
	);
};

export default Connection;
