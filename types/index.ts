export interface HeaderItemContent {
    name: string;
    href: string;
  }
  
  export interface HeaderItem {
    name: string;
    content: HeaderItemContent[];
  }
  
  export type FooterItem = HeaderItem;
  