export interface InstallStatus {
  category: string[];
  src: string[];
  title: string;
}

export interface Announcement {
  author: string;
  content: string;
  createAt: string;
  id: number;
  title: string;
  key: string;
}

export interface Reference extends Announcement {
  link: string;
}

export interface Board extends Announcement {
  password?: string;
  answers: Answer[];
}

type Answer = {
  content: string;
  createAt: string;
};
