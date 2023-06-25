import { ParsedUrlQuery } from "querystring";

export interface HeaderItemContent {
  name: string;
  href: string;
}

export interface HeaderItem {
  name: string;
  content: HeaderItemContent[];
}

export type FooterItem = HeaderItem;

export interface KakaoAdress {
  address: string;
  zonecode: string;
}

export type TableColumn = {
  title: string;
  dataIndex: string;
  key: string;
};

export interface MyQuery extends ParsedUrlQuery {
  id: string;
  category: string;
}

export interface FormItem {
  detailAddress: string;
  name: string;
  phone: string;
}

export interface RequestForm extends FormItem {
  address?: string;
  date?: string;
  requirement?: string;
  zonecode?: string;
  id: string;
  status?: string;
}

export interface CheckForm extends RequestForm {
  id: string;
  [key: string]: string | undefined; //체크 페이지에서 인덱스 시그니처를 요구하는 바람에 일단 넣었는데, 맞는 방식일까??
}

export type SkeletonProos = {
  width: number | string;
  height: number | string;
};

export interface Product {
  name: string;
  outline: string;
  characteristic?: string[];
  specification: Specification[];
  src: string;
}

export interface Specification {
  name: string;
  content: string;
}
