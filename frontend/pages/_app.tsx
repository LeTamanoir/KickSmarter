import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import TezosProvider from "@/providers/TezosProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <TezosProvider>
        <Component {...pageProps} />
      </TezosProvider>
    </ChakraProvider>
  );
}
