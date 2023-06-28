import "@/styles/App.css";
import styled from "styled-components";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { RecoilRoot } from "recoil";
import { useState } from "react";

import { REACT_QUERY_OPTIONS } from "@/datas/constants/constants";

import Header from "@/components/header/Header";
import Footer from "@/components/common/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(REACT_QUERY_OPTIONS));

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
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
