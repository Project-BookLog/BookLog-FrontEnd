export enum BOOK_ORDER {
    OLDEST = "asc",
    NEWEST = "desc",
    TITLE = "title",
    AUTHOR = "author",
}

export const sortOptions = [
  { label: "최신 순", value: BOOK_ORDER.NEWEST },
  { label: "오래된 순", value: BOOK_ORDER.OLDEST },
  { label: "제목 순", value: BOOK_ORDER.TITLE },
  { label: "저자 순", value: BOOK_ORDER.AUTHOR },
];