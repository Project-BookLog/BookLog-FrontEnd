import type { Author } from "../types/book.types";
import { Dummy_author } from "../assets/icons";
import type { Book } from "../types/book.types";
import { Dummy_book } from "../assets/icons";

const SAMPLE_BOOKS: Book[] = [
  {
    id: 1,
    title: "책 제목 1",
    author: "작가 A",
    publisher: "출판사 A",
    createdAt: "",
    progress: 0,
    CoverIcon: Dummy_book,
  },
  {
    id: 2,
    title: "책 제목 2",
    author: "작가 A",
    publisher: "출판사 B",
    createdAt: "",
    progress: 0,
    CoverIcon: Dummy_book,
  },
];

export const AUTHORS: Author[] = [
  {
    id: "1",
    name: "한강",
    role: "작가",
    country: "한국",
    imageUrl: Dummy_author,
    books: SAMPLE_BOOKS,   
  },
  {
    id: "2",
    name: "작가2",
    role: "작가",
    country: "한국",
    imageUrl: Dummy_author,
    books: SAMPLE_BOOKS,   
  },
  {
    id: "3",
    name: "작가3",
    role: "작가",
    country: "한국",
    imageUrl: Dummy_author,
    books: SAMPLE_BOOKS,   
  },
];
