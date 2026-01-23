export enum BOOK_ORDER {
  LATEST = "desc",
  OLDEST = "asc",
  TITLE = "title",
  AUTHOR = "author",
}

export const sortOptions = [
  { label: "최신 순", value: BOOK_ORDER.LATEST },
  { label: "오래된 순", value: BOOK_ORDER.OLDEST },
  { label: "제목 순", value: BOOK_ORDER.TITLE },
  { label: "저자 순", value: BOOK_ORDER.AUTHOR },
];