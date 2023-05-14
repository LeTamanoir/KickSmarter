export const GHOSTNET_RPC_URL = 'https://ghostnet.tezos.marigold.dev';

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS ?? '';

export const PINATA_UPLOAD_URL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

export const PINATA_PUBLIC_GATEWAY_URL = (cid: string) => `https://gateway.pinata.cloud/ipfs/${cid}`;
