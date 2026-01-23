import { Dummy_book } from "../assets/icons";
import { BOOK_ORDER } from "../enum/book";
import type { Library } from "../types/library";

export const libraries: Library[] = [
  {
    name: "전체 도서",
    isPublic: true,
    books: [
      {
        id: 1,
        title: "1",
        author: "a",
        publisher: "ㄱ",
        createdAt: "2020-01-01",
        progress: 10,
        CoverIcon: Dummy_book,
      },
      {
        id: 2,
        title: "2",
        author: "b",
        publisher: "ㄴ",
        createdAt: "2021-01-01",
        progress: 30,
        CoverIcon: Dummy_book,
      },
      {
        id: 3,
        title: "3",
        author: "c",
        publisher: "ㄷ",
        createdAt: "2022-01-01",
        progress: 100,
        CoverIcon: Dummy_book,
      },
      {
        id: 4,
        title: "4",
        author: "d",
        publisher: "ㄹ",
        createdAt: "2023-01-01",
        progress: 100,
        CoverIcon: Dummy_book,
      },

    ],
    sort: BOOK_ORDER.LATEST,
  },
  {
    name: "서재1",
    isPublic: true,
    books: [{
        id: 1,
        title: "1",
        author: "a",
        publisher: "ㄱ",
        createdAt: "2020-01-01",
        progress: 1,
        CoverIcon: Dummy_book,
      },
      {
        id: 2,
        title: "2",
        author: "b",
        publisher: "ㄴ",
        createdAt: "2021-01-01",
        progress: 2,
        CoverIcon: Dummy_book,
      },],
    sort: BOOK_ORDER.LATEST,
  },
  {
    name: "서재2",
    isPublic: true,
    books: [],
    sort: BOOK_ORDER.LATEST,
  },
  
];