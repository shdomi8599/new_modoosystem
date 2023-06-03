import "@/styles/App.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/config";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Header from "@/components/header/Header";
import { useRouter } from "next/router";
import Footer from "@/components/common/Footer";

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
  const router = useRouter();
  const { pathname } = router;
  const isBoxVisible = pathname === "/about";
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        {isBoxVisible ? (
          <Component {...pageProps} />
        ) : (
          <Box>
            <Component {...pageProps} />
          </Box>
        )}
        <Footer />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const Box = styled.main`
  padding: 0px calc((100% - 1280px) / 2);
  padding-top: 104px;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
