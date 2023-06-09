import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_BASE_DATEBASE_URL,
  projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_BASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

//언젠가는 파이어베이스의 문서이름들을 id와 통일시켜서 id만으로 데이터를
//바로 가져올 수 있도록 리팩토링을 해야할 필요성을 느꼈다.
//만약에 데이터가 많아진다면 나중에 최적화를 고려해보자.

/**
 * 컬렉션명과 이름이 일치하는 데이터의 값을 수정할 수 있음
 * 일치하는 컬렉션명이 없다면 셋팅과 동시에 데이터를 추가할 수 있음
 */
export const updateDbData = async <T extends object>(
  collectionName: string,
  id: string,
  data: T
) => {
  const docRef = doc(db, collectionName, id);

  await setDoc(docRef, data);
};

/**
 * 컬렉션명과 ID가 일치하는 데이터를 삭제하는 함수
 */
export const deleteDbData = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);

  await deleteDoc(docRef);
};

/**
 * 컬렉션에 데이터를 추가
 * 셋팅과 동시에 데이터를 추가할 수 있음
 */
export const addDbData = async <T extends object>(
  collectionName: string,
  data: T
) => {
  await addDoc(collection(db, collectionName), data);
};

/**
 * 단일 데이터 조회
 */
export const getDbDataByDocName = async <T>(
  collectionName: string,
  docName: string
): Promise<T> => {
  const docRef = doc(db, collectionName, docName);

  const docSnapshot = await getDoc(docRef);

  return docSnapshot.data() as T;
};

/**
 * 한 컬렉션에 대한 전체 데이터 조회
 */
export const getDbAllData = async <T>(collectionName: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  const dataArray = querySnapshot.docs.map((doc) => doc.data() as T);

  return dataArray;
};

/**
 * 한 컬렉션에 대한 전체 데이터와 아이디를 한 번에 조회
 */
export const getDbAllDataAndId = async <T>(
  collectionName: string
): Promise<{ docId: string; docData: T }[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  const dataArray = querySnapshot.docs.map((doc) => {
    const data = { docId: doc.id, docData: doc.data() as T };
    return data;
  });

  return dataArray;
};
