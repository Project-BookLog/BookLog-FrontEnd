export interface BookUi {
  id: number;              
  title: string;
  author: string;          
  publisher?: string;
  coverUrl?: string;

  progress?: number;
  createdAt?: string;

  mood?: string;
  style?: string;
  immersion?: string;
}
