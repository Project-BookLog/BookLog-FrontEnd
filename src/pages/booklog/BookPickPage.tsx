// src/pages/booklog/BookPickPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import Tab from "../../components/common/Tab";
import { BookCard } from "../../components/myLibrary/BookCard";

import type { Book } from "../../types/book.types";
import type { UserBook } from "../../types/library"; 
import { useGetShelves } from "../../hooks/queries/useGetShelves";
import { useGetUserBookList } from "../../hooks/queries/useGetUserBookList";

function userBookToBook(ub: UserBook): Book {
  return {
    bookId: ub.bookId,
    title: ub.title,
    thumbnailUrl: ub.thumbnailUrl ?? "",
    publisherName: ub.publisherName ?? "",
    authors: ub.authorName ? [ub.authorName] : [],
  };
}

const getDisplayName = (name: string) => name === "전체 도서" ? "전체" : name;

export default function BookPickPage() {
  const navigate = useNavigate();

  const { data: shelves = [] } = useGetShelves();

  const [activeTab, setActiveTab] = useState<string>("전체");
  const tabs = shelves.map((shelf) => getDisplayName(shelf.name));
  const activeShelfId = shelves.find(
    (s) => getDisplayName(s.name) === activeTab
  )?.shelfId;

  const { data: booksData } = useGetUserBookList(activeTab === "전체" ? undefined : activeShelfId);

  const books = booksData?.items ?? [];


  const hasBooks = books.length > 0;

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
            tabs={tabs}
            active={activeTab}
            onChange={setActiveTab}
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
              {books.map((book) => (
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
