import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import TezosProvider from "@/src/providers/TezosProvider";
import { KicksmarterProvider } from "@/sdk";
import { CONTRACT_ADDRESS } from "@/src/constants";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <TezosProvider>
        <KicksmarterProvider contractAddress={CONTRACT_ADDRESS}>
          <Component {...pageProps} />
        </KicksmarterProvider>
      </TezosProvider>
    </ChakraProvider>
  );
}
