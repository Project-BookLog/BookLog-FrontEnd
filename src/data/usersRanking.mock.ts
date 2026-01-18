export interface usersRanking {
  name: string;
  rank: number;
  books: number;
  days: number;
}

export const userRanking : usersRanking[] = [
  { name: "Yoon", rank: 1, books: 12, days: 28 },
  { name: "Maru", rank: 2, books: 10, days: 25 },
  { name: "Pado", rank: 3, books: 8, days: 22 },
  { name: "Somi", rank: 4, books: 7, days: 20 },
  { name: "Jina", rank: 5, books: 6, days: 18 },
  { name: "Tomo", rank: 6, books: 5, days: 16 },
  { name: "Rina", rank: 7, books: 4, days: 14 },
  { name: "Kiro", rank: 8, books: 3, days: 12 },
  { name: "Nami", rank: 9, books: 2, days: 10 },
  { name: "Hana", rank: 10, books: 1, days: 8 },
];
