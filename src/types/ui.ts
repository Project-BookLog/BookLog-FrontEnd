export interface UIBook {
  id: number;
  title: string;
  author: string;
  publisher?: string;
  coverUrl?: string;
  progress?: number;
  createdAt?: string;
}
