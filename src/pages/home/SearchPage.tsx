import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import NavBarSearchInput from "../../components/common/navbar/NavBarSerachInput";
import RecentSearches from "../../components/home/search/RecentSearches";
import RecommendedSearches from "../../components/home/search/RecommendedSearches";
import Tab from "../../components/common/Tab";
import AuthorResults from "../../components/home/search/AuthorResults";
import BookResults from "../../components/home/search/BookResults";

import { BOOKS } from "../../data/book.mock";
import { AUTHORS } from "../../data/author.mock";
import { useFilter } from "../../hooks/useFilter";
import type { Mood, Style, Immersion } from "../../context/FilterContext"

const TABS = ["전체", "작가", "도서"] as const;
type TabType = (typeof TABS)[number];

type BookWithFilter = (typeof BOOKS)[number] & {
  mood?: Mood;
  style?: Style;
  immersion?: Immersion;
};

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const qFromUrl = searchParams.get("q") ?? "";
  const tabFromUrl = searchParams.get("tab");

  const [keyword, setKeyword] = useState(qFromUrl);
  const { filter, resetFilter } = useFilter();

  const [activeTab, setActiveTab] = useState<TabType>(
    tabFromUrl === "book" ? "도서" : "전체"
  );

  // URL q가 바뀔 때 keyword 동기화
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
    resetFilter();
    setActiveTab("전체");
  };

  const handleResetFilters = useCallback(() => {
    resetFilter();
  }, [resetFilter]);

  const handleChangeTab = (tab: TabType) => {
    setActiveTab(tab);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (tab === "도서") next.set("tab", "book");
      else next.delete("tab");
      return next;
    });
  };


  const filteredBooks: BookWithFilter[] = useMemo(() => {
    return (BOOKS as BookWithFilter[]).filter((book) => {
      // 다중 선택 필터링
      if (filter.mood.length > 0 && !filter.mood.some(m => book.mood === m)) return false;
      if (filter.style.length > 0 && !filter.style.some(s => book.style === s)) return false;
      if (filter.immersion.length > 0 && !filter.immersion.some(i => book.immersion === i)) return false;
      
      if (keyword.trim().length > 0) {
        const k = keyword.trim();
        const inTitle = book.title.includes(k);
        const inAuthor = book.author.includes(k);
        if (!inTitle && !inAuthor) return false;
      }
      return true;
    });
  }, [filter.mood, filter.style, filter.immersion, keyword]);

  // 넘겨줄 선택값
  const selectedFilters = {
    mood: filter.mood.length > 0 ? filter.mood.join(", ") : "",
    style: filter.style.length > 0 ? filter.style.join(", ") : "",
    immersion: filter.immersion.length > 0 ? filter.immersion.join(", ") : "",
  };


  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop
        back
        onBack={() => navigate("/")}
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
          <Tab
            tabs={TABS}
            active={activeTab}
            onChange={handleChangeTab}
            align="start"
          />
        </div>
      )}

      <main className="mt-6">
        {!hasKeyword && (
          <>
            <section className="mb-12 px-5">
              <RecentSearches items={["궤도", "소년이 온다", "한강"]} />
            </section>

            <section className="px-5">
              <RecommendedSearches
                items={["검색어1", "검색어2", "검색어3", "검색어4", "검색어5"]}
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
                  selectedFilters={selectedFilters}
                  onResetFilters={handleResetFilters}
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
                selectedFilters={selectedFilters}
                onResetFilters={handleResetFilters}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
