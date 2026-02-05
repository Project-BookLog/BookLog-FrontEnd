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

export interface AuthorBookUi {
  id: number;
  title: string;
  author: string;
  publisher: string;
  coverUrl?: string;
}

export interface AuthorUi {
  id: number;
  name: string;
  role: string;
  country: string;
  imageUrl?: string;
  books: AuthorBookUi[];
}

                      