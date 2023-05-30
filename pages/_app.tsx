import "@/styles/App.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU9iaAP6DzVRP334iEKNjQY7HtzhU1jro",
  authDomain: "modoosystem-af119.firebaseapp.com",
  databaseURL:
    "https://modoosystem-af119-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "modoosystem-af119",
  storageBucket: "modoosystem-af119.appspot.com",
  messagingSenderId: "783188813845",
  appId: "1:783188813845:web:bd0b70965a5e505bbd861c",
  measurementId: "G-3718WK18B2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
