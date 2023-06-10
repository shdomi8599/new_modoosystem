import TableInstallButtonItem from "@/components/table/TableInstallButtonItem";
import TableInstallTagItem from "@/components/table/TableInstallTagItem";
import TableInstallTitleItem from "@/components/table/TableInstallTitleItem";
import TableRequestStatusItem from "@/components/table/TableRequestStatusItem";
import TableRequestTitleItem from "@/components/table/TableRequestTitleItem";
import TableTitleItem from "@/components/table/TableTitleItem";
import { HeaderItem, RequestForm } from "@/types";
import { Announcement } from "@/types/pageData";
import { TabsProps } from "antd";

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
    content: [{ name: "설치현황", href: "/status/installStatuses" }],
  },
  {
    name: "고객서비스",
    content: [
      { name: "자료실", href: "/service/references" },
      { name: "공지사항", href: "/service/announcements" },
      { name: "게시판", href: "/service/boards" },
    ],
  },
  {
    name: "온라인견적",
    content: [
      { name: "견적의뢰", href: "/request" },
      { name: "견적신청조회", href: "/request/check" },
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

export const COLUMNS_DATA = [
  {
    title: "번호",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
    render: <T extends Announcement>(text: string, data: T) => (
      <TableTitleItem text={text} data={data} />
    ),
  },
  {
    title: "작성일",
    dataIndex: "createAt",
    key: "createAt",
  },
  {
    title: "작성자",
    dataIndex: "author",
    key: "author",
  },
];

export const REQUEST_COLUMNS_DATA = [
  {
    title: "의뢰번호",
    dataIndex: "id",
    key: "id",
    render: (text: string, data: RequestForm) => (
      <TableRequestTitleItem text={text} data={data} />
    ),
  },
  {
    title: "처리상태",
    dataIndex: "status",
    key: "status",
    render: (text: string) => <TableRequestStatusItem text={text} />,
  },
  {
    title: "전화번호",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "신청자",
    dataIndex: "name",
    key: "name",
  },
];

export const INSTALL_STATUSES_COLUMNS_DATA = [
  {
    title: "번호",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
    render: (_: unknown, { id, title }: { id: number; title: string }) => (
      <TableInstallTitleItem id={id} title={title} />
    ),
  },
  {
    title: "카테고리",
    dataIndex: "categori",
    key: "categori",
    render: (_: unknown, { categori }: { categori: string[] }) => (
      <TableInstallTagItem items={categori} />
    ),
  },
  {
    title: "관리",
    dataIndex: "button",
    key: "button",
    render: (_: unknown, { id }: { id: number }) => (
      <TableInstallButtonItem id={id} />
    ),
  },
];

export const STATUS_ITEMS = [
  { name: "처리 전", color: "red" },
  { name: "처리 중", color: "#e3ee44" },
  { name: "처리완료", color: "#00ff00" },
];

export const FORM_ITEMS = [
  { name: "회사명/성함", id: "name" },
  { name: "연락처", id: "phone" },
  { name: "주소", id: "address" },
  { name: "상세주소", id: "detailAddress" },
  { name: "방문 희망일", id: "date" },
  { name: "요구사항", id: "requirement" },
  { name: "처리상태", id: "status" },
];

export const DEPARTMENTS = [
  {
    name: "관리부",
    key: "관리부",
    subDepartments: [
      { name: "총무팀", content: "cc" },
      { name: "회계팀", content: "dd" },
    ],
  },
  {
    name: "영업부",
    key: "영업부",
    subDepartments: [
      { name: "영업1팀", content: "ff" },
      { name: "영업2팀", content: "ee" },
    ],
  },
  {
    name: "기술부",
    key: "기술부",
    subDepartments: [
      { name: "시공팀", content: "qq" },
      { name: "연구개발팀", content: "ee" },
    ],
  },
];

export const SELECT_SEARCH_ITEMS = [
  { value: "title", label: "제목" },
  { value: "content", label: "내용" },
  { value: "author", label: "작성자" },
];

export const TAB_ITEMS: TabsProps["items"] = [
  {
    key: "installStatuses",
    label: `설치현황`,
  },
  {
    key: "references",
    label: `자료실`,
  },
  {
    key: "announcements",
    label: `공지사항`,
  },
  {
    key: "boards",
    label: `게시판`,
  },
  {
    key: "request",
    label: `견적의뢰`,
  },
];

export const INSTALL_CATEGORY = [
  "차량차단기",
  "리모콘방식",
  "RF카드방식",
  "주차권발행방식",
  "차량번호인식방식",
  "요금계산기",
  "주차부스",
  "신호관제",
  "기타제품",
];