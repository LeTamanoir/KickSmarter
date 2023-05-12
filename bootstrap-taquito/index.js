import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';

const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev');

Tezos.setProvider({
  signer: new InMemorySigner('edsk3CGEDDW4E1fC5sMT8q8N4cnFtVshPzGy1JBtn4LYxKS6c725wQ'),
});

Tezos.contract
  .at('KT1HR1856k8rRdsCL4JA2vT8EFU5GZCXFwFJ')
  .then((myContract) => {
    return myContract
      .storage()
      .then((myStorage) => {
        //We want to see the value of the key "1"
        const value = myStorage.projects;
        console.log(`value is ${value}`);
       });
})
