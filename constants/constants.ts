import { FooterItem, HeaderItem } from "../types";

export const ROUTER = [
  { name: "인사말", href: "/information/greetings" },
  { name: "조직도", href: "/information/organization" },
  { name: "찾아오시는 길", href: "/information/directions" },
  { name: "차량차단기", href: "/products/차량차단기" },
  { name: "리모콘방식", href: "/products/리모콘방식" },
  { name: "RF카드방식", href: "/products/RF카드방식" },
  { name: "주차권발행방식", href: "/products/주차권발행방식" },
  { name: "차량번호인식방식", href: "/products/차량번호인식방식" },
  { name: "요금계산기", href: "/products/요금계산기" },
  { name: "주차부스", href: "/products/주차부스" },
  { name: "신호관제", href: "/products/신호관제" },
  { name: "기타제품", href: "/products/기타제품" },
  { name: "설치현황", href: "/status/installation" },
  { name: "사진자료", href: "/status/photo" },
  { name: "자료실", href: "/service/reference" },
  { name: "공지사항", href: "/service/announcement" },
  { name: "게시판", href: "/service/board" },
  { name: "견적의뢰", href: "/request" },
  { name: "견적신청확인", href: "/request/check" },
];

export const HEADER_ITEMS: HeaderItem[] = [
  {
    name: "회사소개",
    content: [
      { name: "인사말", href: "/information/greetings" },
      { name: "조직도", href: "/information/organization" },
      { name: "찾아오시는 길", href: "/information/directions" },
    ],
  },
  {
    name: "제품소개",
    content: [
      { name: "차량차단기", href: "/products/차량차단기" },
      { name: "리모콘방식", href: "/products/리모콘방식" },
      { name: "RF카드방식", href: "/products/RF카드방식" },
      { name: "주차권발행방식", href: "/products/주차권발행방식" },
      { name: "차량번호인식방식", href: "/products/차량번호인식방식" },
      { name: "요금계산기", href: "/products/요금계산기" },
      { name: "주차부스", href: "/products/주차부스" },
      { name: "신호관제", href: "/products/신호관제" },
      { name: "기타제품", href: "/products/기타제품" },
    ],
  },
  {
    name: "주요설치현황",
    content: [
      { name: "설치현황", href: "/status/installation" },
      { name: "사진자료", href: "/status/photo" },
    ],
  },
  {
    name: "고객서비스",
    content: [
      { name: "자료실", href: "/service/reference" },
      { name: "공지사항", href: "/service/announcement" },
      { name: "게시판", href: "/service/board" },
    ],
  },
  {
    name: "온라인견적",
    content: [
      { name: "견적의뢰", href: "/request" },
      { name: "견적신청확인", href: "/request/check" },
    ],
  },
];

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
  {
    name: "주요설치현황",
    content: [
      { name: "설치현황", href: "/status/installation" },
      { name: "사진자료", href: "/status/photo" },
    ],
  },
  {
    name: "고객서비스",
    content: [
      { name: "자료실", href: "/service/reference" },
      { name: "공지사항", href: "/service/announcement" },
      { name: "게시판", href: "/service/board" },
    ],
  },
  {
    name: "온라인견적",
    content: [
      { name: "견적의뢰", href: "/request" },
      { name: "견적신청확인", href: "/request/check" },
    ],
  },
];

export const DIRECTIONS_PUBLIC = [
  {
    name: "버스",
    content: [
      "[3315] 송파두산위브, 송파소방서 하차, 도보 200M",
      "[3316 / 3214 / 3317] 거여초등학교 하차, 도보 600M",
    ],
  },
  {
    name: "지하철",
    content: ["5호선 개롱역 1번출구에서 도보10분"],
  },
];
