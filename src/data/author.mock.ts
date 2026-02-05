import type { AuthorUi, AuthorBookUi } from "../types/ui";

const SAMPLE_BOOKS: AuthorBookUi[] = [
  {
    id: 1,
    title: "책 제목 1",
    author: "작가 A",
    publisher: "출판사 A",
    coverUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936434120.jpg",
  },
  {
    id: 2,
    title: "책 제목 2",
    author: "작가 A",
    publisher: "출판사 B",
    coverUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936434120.jpg",
  },
];


export const AUTHORS: AuthorUi[] = [
  {
    id: 1,
    name: "한강",
    role: "작가",
    country: "한국",
    imageUrl: "https://contents.kyobobook.co.kr/pmtn/2024/eBook/241015_nobel/bnJ_e01_04.png",
    books: SAMPLE_BOOKS,
  },
  {
    id: 2,
    name: "작가2",
    role: "작가",
    country: "한국",
    imageUrl: "https://contents.kyobobook.co.kr/pmtn/2024/eBook/241015_nobel/bnJ_e01_04.png",
    books: SAMPLE_BOOKS,
  },
  {
    id: 3,
    name: "작가3",
    role: "작가",
    country: "한국",
    imageUrl: "https://contents.kyobobook.co.kr/pmtn/2024/eBook/241015_nobel/bnJ_e01_04.png",
    books: SAMPLE_BOOKS,
  },
];
