import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import NavBarTop from "../../components/NavBarTop";
import NavBarSearchInput from "../../components/NavBarSerachInput";
import RecentSearches from "../../components/search/RecentSearches";
import RecommendedSearches from "../../components/search/RecommendedSearches";
import SearchTabs from "../../components/search/SearchTabs";
import AuthorResults from "../../components/search/AuthorResults";
import BookResults from "../../components/search/BookResults";

import { BOOKS } from "../../data/book.mock";
import { AUTHORS } from "../../data/author.mock";
import { useFilter } from "../../hooks/useFilter";
import { initialFilterState } from "../../context/FilterContext"; 

type Tab = "전체" | "작가" | "도서";

type BookWithFilter = (typeof BOOKS)[number] & {
  mood?: string;
  style?: string;
  immersion?: string;
};

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qFromUrl = searchParams.get("q") ?? "";
  const tabFromUrl = searchParams.get("tab");

  const [keyword, setKeyword] = useState(qFromUrl);
  const { filter, setFilter } = useFilter();
  const [activeTab, setActiveTab] = useState<Tab>(
    tabFromUrl === "book" ? "도서" : "전체",
  );

  // URL q가 바뀔 때 keyword 동기화 (필터에서 돌아온 경우 대비)
  useEffect(() => {
    setKeyword(qFromUrl);
  }, [qFromUrl]);

  const hasKeyword = keyword.trim().length > 0;

  const handleChangeKeyword = (value: string) => {
    const trimmed = value.trim();
    setKeyword(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (trimmed) next.set("q", trimmed);
      else {
        next.delete("q");
        next.delete("tab");
      }
      return next;
    });
    setFilter(initialFilterState);
    setActiveTab("전체");  
  };

  const handleResetFilters = () => {
    setFilter(initialFilterState);
  };

  const handleChangeTab = (tab: Tab) => {
    setActiveTab(tab);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (tab === "도서") next.set("tab", "book");
      else next.delete("tab");
      return next;
    });
  };

  const filteredBooks: BookWithFilter[] = useMemo(
    () =>
      (BOOKS as BookWithFilter[]).filter((book) => {
        if (filter.mood && book.mood !== filter.mood) return false;
        if (filter.style && book.style !== filter.style) return false;
        if (filter.immersion && book.immersion !== filter.immersion)
          return false;
        // 검색어 필터까지 걸고 싶으면 title/author 포함 여부 체크
        if (keyword.trim().length > 0) {
          const k = keyword.trim();
          const inTitle = book.title.includes(k);
          const inAuthor = book.author.includes(k);
          if (!inTitle && !inAuthor) return false;
        }
        return true;
      }),
    [filter.mood, filter.style, filter.immersion, keyword],
  );

  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop
        back
        centerSlot={
          <div className="w-full flex-1">
            <NavBarSearchInput
              value={keyword}
              onChange={handleChangeKeyword}
              placeholder="도서 검색하기"
            />
          </div>
        }
      />

      {hasKeyword && (
        <div className="mt-2 px-4">
          <SearchTabs active={activeTab} onChange={handleChangeTab} />
        </div>
      )}

      <main className="mt-6">
        {!hasKeyword && (
          <>
            <section className="mb-12 px-6">
              <RecentSearches items={["궤도", "소년이 온다", "한강"]} />
            </section>

            <section className="px-6">
              <RecommendedSearches
                items={["검색어1", "검색어2", "검색어3", "검색어4", "검색어4"]}
              />
            </section>
          </>
        )}

        {hasKeyword && (
          <>
            {activeTab === "전체" && (
              <div className="no-scrollbar space-y-10">
                <AuthorResults
                  keyword={keyword}
                  total={AUTHORS.length}
                  items={AUTHORS.slice(0, 3)}
                  onMoreClick={() => setActiveTab("작가")}
                />
                <BookResults
                  keyword={keyword}
                  total={filteredBooks.length}
                  items={filteredBooks.slice(0, 3)}
                  onMoreClick={() => handleChangeTab("도서")}
                  mode="compact"
                  selectedFilters={{
                    mood: filter.mood ?? "",
                    style: filter.style ?? "",
                    immersion: filter.immersion ?? "",
                  }}
                />
              </div>
            )}

            {activeTab === "작가" && (
              <AuthorResults
                keyword={keyword}
                total={AUTHORS.length}
                items={AUTHORS}
                mode="full"
              />
            )}

            {activeTab === "도서" && (
              <BookResults
                keyword={keyword}
                total={filteredBooks.length}
                items={filteredBooks}
                mode="full"
                onResetFilters={handleResetFilters} 
                selectedFilters={{
                  mood: filter.mood ?? "",
                  style: filter.style ?? "",
                  immersion: filter.immersion ?? "",
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
