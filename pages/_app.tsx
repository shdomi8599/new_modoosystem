import "@/styles/App.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/config";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Header from "@/components/header/Header";
import Footer from "@/components/common/Footer";
import { useState } from "react";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const options = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(options));
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Header />
          <Box>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

const Box = styled.main`
  padding: 0px calc((100% - 1280px) / 2);
  min-height: 64vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
