export interface InstallStatus {
  categori: string[];
  src: string[];
  title: string;
  key: number;
  id: number;
}

export interface Announcement {
  author: string;
  content: string;
  createAt: string;
  id: number;
  title: string;
  key: number;
}

export interface Reference extends Announcement {
  link: string;
}

export interface Board extends Announcement {
  password?: string;
  answers?: Answer[];
}

type Answer = {
  content: string;
  createAt: string;
};
