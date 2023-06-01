import "@/styles/App.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/firebase.config";
import Header from "@/components/Header";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />;
    </>
  );
}
