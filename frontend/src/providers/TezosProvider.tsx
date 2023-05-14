import { useEffect, useState } from 'react';
import TezosContext from '../contexts/TezosContext';
import { GHOSTNET_RPC_URL } from '../constants';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, DAppClientOptions } from '@airgap/beacon-dapp';

const walletOptions: DAppClientOptions = {
	name: 'KickSmarter DApp',
	preferredNetwork: NetworkType.GHOSTNET,
};

const TezosProvider = ({ children }: { children: React.ReactNode }) => {
	const [tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
	const [wallet, setWallet] = useState<{ wallet: BeaconWallet | undefined }>({
		wallet: undefined,
	});
	const [isConnected, setIsConnected] = useState<boolean>(false);

	const connectWallet = async () => {
		if (isConnected) return;

		try {
			let { wallet: wallet_ } = wallet;

			if (wallet_ === undefined) return;

			await wallet_.client.requestPermissions({
				network: {
					type: NetworkType.GHOSTNET,
					rpcUrl: GHOSTNET_RPC_URL,
				},
			});

			setWallet({ wallet: wallet_ });

			setIsConnected(true);
		} catch (e) {
			console.log(e);
		}
	};

	const disconnectWallet = async () => {
		try {
			let { wallet: wallet_ } = wallet;

			if (wallet_ === undefined) return;

			await wallet_.clearActiveAccount();

			setWallet({ wallet: wallet_ });

			setIsConnected(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (!isConnected || tezos === undefined || wallet.wallet === undefined) {
			return;
		}

		tezos.setWalletProvider(wallet.wallet);
	}, [isConnected]);

	useEffect(() => {
		let toolkit = new TezosToolkit(GHOSTNET_RPC_URL);
		let wallet_ = new BeaconWallet(walletOptions);

		setTezos(toolkit);
		setWallet({ wallet: wallet_ });

		(async () => {
			let activeAccount = await wallet_.client.getActiveAccount();

			setIsConnected(activeAccount !== undefined);
		})();
	}, []);

	return (
		<TezosContext.Provider
			value={{
				connectWallet,
				disconnectWallet,
				wallet: wallet.wallet,
				tezos: tezos,
				connected: isConnected,
			}}
		>
			{children}
		</TezosContext.Provider>
	);
};

export default TezosProvider;
