import Head from "next/head";
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "./_app";

export default function Home() {
  /**
   * 컬렉션 세팅
   * 셋팅과 동시에 데이터를 추가할 수 있음
   */
  const setData = () => {
    setDoc(doc(db, "citiesddd", "LA"), {
      name: "Los Angeles",
      state: "CAdwdwqd",
      country: "USA",
    }).then((res) => console.log(res));
  };

  /**
   * 셋팅되있는 컬렉션에 데이터를 추가
   */
  const addData = async () => {
    const newDocRef = await addDoc(collection(db, "citiesddd"), {
      name: "New City",
      state: "New State",
      country: "New Country",
    });
    console.log("Added document with ID: ", newDocRef.id);
  };

  /**
   * 컬렉션 데이터 단일 조회
   */
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "citiesddd"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  /**
   * 한 컬렉션에 대한 전체 데이터 조회
   */
  const getAllData = async () => {
    const querySnapshot = await getDocs(collection(db, "citiesddd"));
    const dataArray = querySnapshot.docs.map((doc) => doc.data());
    console.log(dataArray);
  };

  return (
    <>
      <Head>
        <title>모두시스템</title>
      </Head>
      <button onClick={setData}>작성</button>
      <button onClick={addData}>추가</button>
      <button onClick={getData}>조회</button>
      <button onClick={getAllData}>전체조회</button>
    </>
  );
}
