// src/pages/booklog/BookPickPage.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import Tab from "../../components/common/Tab";
import { BookCard } from "../../components/myLibrary/BookCard";

import type { Book } from "../../types/book.types";
import type { UserBook } from "../../types/library"; 

type Shelf = {
  id: string;
  name: string; // "서재 1"
  books: UserBook[];
};

function userBookToBook(ub: UserBook): Book {
  return {
    bookId: ub.bookId,
    title: ub.title,
    thumbnailUrl: ub.thumbnailUrl ?? "",
    publisherName: ub.publisherName ?? "",
    authors: ub.authorName ? [ub.authorName] : [],
  };
}

export default function BookPickPage() {
  const navigate = useNavigate();

  /** ✅ BookCard(UserBook)용 더미데이터 */
  const shelves = useMemo<Shelf[]>(
    () => [
      {
        id: "s1",
        name: "서재 1",
        books: [
          {
            userBookId: 101,
            status: "READING",
            progressPercent: 20,
            currentPage: 60,
            bookId: 1,
            title: "소년이 온다",
            thumbnailUrl: "",
            publisherName: "창비",
            authorName: "한강",
          },
          {
            userBookId: 102,
            status: "TO_READ",
            progressPercent: 0,
            currentPage: 0, 
            bookId: 2,
            title: "채식주의자",
            thumbnailUrl: "",
            publisherName: "창비",
            authorName: "한강",
          },
        ],
      },
      {
        id: "s2",
        name: "서재 2",
        books: [
          {
            userBookId: 201,
            status: "COMPLETED",
            progressPercent: 100,
            currentPage: 0, // ✅ null 불가
            bookId: 3,
            title: "불편한 편의점",
            thumbnailUrl: "",
            publisherName: "나무옆의자",
            authorName: "김호연",
          },
        ],
      },
    ],
    []
  );

  const tabs = useMemo(() => {
    const shelfTabs = shelves.map((s) => s.name);
    return ["전체", ...shelfTabs] as const;
  }, [shelves]);

  type TabType = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<TabType>("전체");

  const booksByTab = useMemo(() => {
    if (activeTab === "전체") return shelves.flatMap((s) => s.books);
    const found = shelves.find((s) => s.name === activeTab);
    return found?.books ?? [];
  }, [activeTab, shelves]);

  const hasBooks = booksByTab.length > 0;

  const goWritePage = (userBook: UserBook) => {
    const book = userBookToBook(userBook);
    navigate("/booklog/write", { state: { book, fresh: true } });
  };

  return (
    <div className="min-h-dvh bg-bg">
      <header className="sticky top-0 z-10 bg-bg">
        <NavBarTop title="책 고르기" onBack={() => navigate("/booklog")} />

        <div className="px-4 pb-2">
          <Tab
            tabs={tabs as unknown as string[]}
            active={activeTab as unknown as string}
            onChange={(v: string) => setActiveTab(v as TabType)}
            align="start"
          />
        </div>

        <div className="h-[1px] w-full bg-divider" />
      </header>

      <main className="px-4 pb-10">
        {hasBooks && (
          <p className="pt-3 text-en-body-02 text-[#81807F]">
            북로그를 작성할 책을 선택해주세요.
          </p>
        )}

        {hasBooks ? (
          <section className="pt-4">
            <div className="grid grid-cols-3 justify-items-start gap-x-4 gap-y-6">
              {booksByTab.map((book) => (
                <BookCard
                  key={book.userBookId} 
                  book={book}
                  onClick={goWritePage}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
            <p className="text-en-title-02 text-[#262626]">
              저장된 책이 없습니다.
            </p>
            <p className="mt-2 text-en-body-02 text-[#81807F]">
              책을 추가하여 서재를 채워보세요.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
