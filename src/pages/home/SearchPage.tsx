import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import NavBarSearchInput from "../../components/common/navbar/NavBarSerachInput";
import Tab from "../../components/common/Tab";

import RecentSearches from "../../components/home/search/RecentSearches";
import RecommendedSearches from "../../components/home/search/RecommendedSearches";
import BothResults from "../../components/home/search/BothResults";
import BookResults from "../../components/home/search/BookResults";
import AuthorResults from "../../components/home/search/AuthorResults";

import { useSearchBothStore } from "../../store/home/search/searchBoth.store";
import { useSearchBooksStore } from "../../store/home/search/searchBooks.store";
import { useSearchAuthorsStore } from "../../store/home/search/searchAuthors.store";

import { LoadingPage } from "../onboarding/LoadingPage";
import { ErrorPage } from "../onboarding/ErrorPage";

const TABS = ["전체", "작가", "도서"] as const;
type TabType = (typeof TABS)[number];

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  const q = searchParams.get("q") ?? "";
  const tabParam = searchParams.get("tab");

  const activeTab: TabType =
    tabParam === "book"
      ? "도서"
      : tabParam === "author"
      ? "작가"
      : "전체";


  const both = useSearchBothStore();
  const books = useSearchBooksStore();
  const authors = useSearchAuthorsStore();


  const inputKeyword = both.keyword;
  const [searchKeyword, setSearchKeyword] = useState("");

  const hasSearched = Boolean(searchKeyword);


  useEffect(() => {
    if (!q) return;

    // input 값 동기화
    if (q !== inputKeyword) {
      both.setKeyword(q);
    }

    // 검색 기준 값 동기화
    if (q !== searchKeyword) {
      setSearchKeyword(q);
    }
  }, [q]);


  
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!searchKeyword.trim()) return;

    startTransition(() => {
      if (activeTab === "전체") {
        both.searchBoth();
      } else if (activeTab === "도서") {
        books.searchBooks(searchKeyword);
      } else if (activeTab === "작가") {
        authors.searchAuthors(searchKeyword);
      }
    });
  }, [activeTab, searchKeyword]);


  const showLoadingRef = useRef(false);
  const [, forceRender] = useState(0);

  useEffect(() => {
    if (!isPending) {
      showLoadingRef.current = false;
      forceRender((v) => v + 1);
      return;
    }

    const timer = setTimeout(() => {
      showLoadingRef.current = true;
      forceRender((v) => v + 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [isPending]);


  const handleSearch = useCallback(() => {
    if (!inputKeyword.trim()) return;

    const keyword = inputKeyword.trim();

    // 검색 확정
    setSearchKeyword(keyword);

    // URL 반영
    const params = new URLSearchParams(searchParams);
    params.set("q", keyword);

    navigate(`/search?${params.toString()}`, { replace: true });
  }, [inputKeyword, searchParams, navigate]);

  const handleChangeTab = (tab: TabType) => {
    if (!hasSearched) return;

    const params = new URLSearchParams(searchParams);
    if (tab === "도서") params.set("tab", "book");
    else if (tab === "작가") params.set("tab", "author");
    else params.delete("tab");

    navigate(`/search?${params.toString()}`, { replace: true });
  };


  const error = both.error || books.error || authors.error;

  // eslint-disable-next-line react-hooks/refs
  if (showLoadingRef.current) return <LoadingPage />;
  if (error) return <ErrorPage />;


  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop
        back
        onBack={() => navigate("/")}
        centerSlot={
          <NavBarSearchInput
            value={inputKeyword}
            onChange={both.setKeyword}
            onSearch={handleSearch}
            placeholder="도서 검색하기"
          />
        }
      />

      {hasSearched && (
        <div className="mt-2 px-4">
          <Tab
            tabs={TABS}
            active={activeTab}
            onChange={handleChangeTab}
            align="start"
          />
        </div>
      )}

      <main className="mt-6">
        {!hasSearched ? (
          <>
            <section className="mb-12 px-5">
              <RecentSearches items={["궤도", "소년이 온다", "한강"]} />
            </section>
            <section className="px-5">
              <RecommendedSearches items={["검색어1", "검색어2"]} />
            </section>
          </>
        ) : (
          <>
            {activeTab === "전체" && (
              <BothResults
                keyword={searchKeyword}
                bookTotal={both.bookTotal}
                bookItems={both.bookItems}
                authorTotal={both.authorTotal}
                authorItems={both.authorItems}
                onBookMoreClick={() => handleChangeTab("도서")}
                onAuthorMoreClick={() => handleChangeTab("작가")}
              />
            )}

            {activeTab === "도서" && (
              <BookResults total={books.total} items={books.items} />
            )}

            {activeTab === "작가" && (
              <AuthorResults total={authors.total} items={authors.items} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
