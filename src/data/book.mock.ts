// data/book.mock.ts
import { Dummy_book } from "../assets/icons";
import type { Book } from "../types/book.types";

export const BOOKS: (Book & {
  mood?: string;
  style?: string;
  immersion?: string;
})[] = [
  {
    id: 1,
    title: "소년이 온다",
    author: "한강 저",
    publisher: "출판사",
    createdAt: "2020-01-01",
    progress: 30,
    CoverIcon: Dummy_book,
    mood: "어두운",
    style: "섬세한",
    immersion: "짙은 여운",
  },
  {
    id: 2,
    title: "2번 책",
    author: "2작가",
    publisher: "2출판사",
    createdAt: "2021-01-01",
    progress: 40,
    CoverIcon: Dummy_book,
    mood: "따뜻한",
    style: "담백한",
    immersion: "기분 전환",
  },
  {
    id: 3,
    title: "3번 책",
    author: "3작가",
    publisher: "3출판사",
    createdAt: "2022-01-01",
    progress: 56,
    CoverIcon: Dummy_book,
    mood: "몽환적인",
    style: "화려한",
    immersion: "압도적 몰입",
  },
  {
    id: 4,
    title: "4번 책",
    author: "4작가",
    publisher: "4출판사",
    createdAt: "2023-01-01",
    progress: 38,
    CoverIcon: Dummy_book,
    mood: "서늘한",
    style: "직설적",
    immersion: "지적인 탐구",
  },
  {
    id: 5,
    title: "5번 책",
    author: "5작가",
    publisher: "5출판사",
    createdAt: "2024-01-01",
    progress: 38,
    CoverIcon: Dummy_book,
    mood: "잔잔한",
    style: "간결한",
    immersion: "기분 전환",
  },
  {
    id: 6,
    title: "6번 책",
    author: "6작가",
    publisher: "6출판사",
    createdAt: "2025-01-01",
    progress: 38,
    CoverIcon: Dummy_book,
    mood: "유쾌한",
    style: "은유적",
    immersion: "압도적 몰입",
  },
];
