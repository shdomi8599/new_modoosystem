import { FooterItem } from "@/types";
import { HEADER_ITEMS } from "../constants/constants";

const footerItemNames = ["주요설치현황", "고객서비스", "온라인견적"];

export const ROUTER = HEADER_ITEMS.flatMap((item) => item.content);

const footerItems = HEADER_ITEMS.filter((headerItem) =>
  footerItemNames.includes(headerItem.name)
);

export const FOOTER_ITEMS: FooterItem[] = [
  {
    name: "회사소개",
    content: [
      { name: "주소 : 서울특별시 송파구 오금동 133-8번지", href: "" },
      { name: "대표자 : 신정식", href: "" },
      { name: "사업자번호 : 206-19-78321", href: "" },
      { name: "대표전화 : 02-401-0050", href: "" },
      { name: "팩스번호 : 02-401-0046", href: "" },
      { name: "Copyright©2023 모두시스템 All rights reserved.", href: "" },
    ],
  },
  ...footerItems,
];
