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

export interface FormItem {
  [key: string]: string;
}

export interface Reference {
  author: string;
  content: string;
  createAt: string;
  createdAt: string;
  id: string;
  key: string;
  link: string;
  title: string;
}

export type TableColumn = {
  title: string;
  dataIndex: string;
  key: string;
};
