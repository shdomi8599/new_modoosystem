export interface InstallStatus {
  category: string[];
  src: string[];
  title: string;
}

export interface Announcement {
  author: string;
  content: string;
  createAt: string;
  id: string;
  title: string;
}

export interface Reference extends Announcement {
  key: string;
  link: string;
}

export interface Board extends Announcement {
  password: string;
}
