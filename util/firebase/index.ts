import { db } from "@/pages/_app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

/**
 * 컬렉션명과 이름이 일치하는 데이터의 값을 수정할 수 있음
 * 일치하는 컬렉션명이 없다면 셋팅과 동시에 데이터를 추가할 수 있음
 */
export const updateDbData = async <T extends {}>(
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
export const addDbData = async <T extends {}>(
  collectionName: string,
  data: T
) => {
  await addDoc(collection(db, collectionName), data);
};

/**
 * 컬렉션 데이터 단일 조회
 */
export const getDbData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.forEach((doc) => {
    doc.data();
  });
};

/**
 * 한 컬렉션에 대한 전체 데이터 조회
 */
export const getDbAllData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const dataArray = querySnapshot.docs.map((doc) => doc.data());
  return dataArray;
};
