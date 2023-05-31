import "@/styles/App.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/firebase.config";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
