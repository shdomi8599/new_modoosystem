import "@/styles/App.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/firebase.config";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Header from "@/components/Header";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        <Box>
          <Component {...pageProps} />
        </Box>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const Box = styled.main`
  padding: 0px calc((100% - 1280px) / 2);
  padding-top: 104px;
`;
