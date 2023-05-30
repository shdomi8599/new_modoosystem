import Head from "next/head";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./_app";

export default function Home() {
  const test = async () => {
    await setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    }).then((res) => console.log(res));
  };
  return (
    <>
      <Head>
        <title>모두시스템</title>
      </Head>
      <button onClick={test}>dsadsa</button>
    </>
  );
}
