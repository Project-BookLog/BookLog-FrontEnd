import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import NavBarSearchInput from "../../components/common/navbar/NavBarSerachInput";
import RecentSearches from "../../components/home/search/RecentSearches";
import RecommendedSearches from "../../components/home/search/RecommendedSearches";
import Tab from "../../components/common/Tab";
import AuthorResults from "../../components/home/search/AuthorResults";
import BookResults from "../../components/home/search/BookResults";
import BothResults from "../../components/home/search/BothResults";

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
  const [searchParams] = useSearchParams(); 
  const qFromUrl = searchParams.get("q") ?? "";

  const [keyword, setKeyword] = useState(qFromUrl);
  const { filter, resetFilter } = useFilter("search");


  const [activeTab, setActiveTab] = useState<TabType>("전체");


  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl === "book") {
      setActiveTab("도서");
    } else if (tabFromUrl === "author") {
      setActiveTab("작가");
    } else {
      setActiveTab("전체");
    }
  }, [searchParams]);

  // URL q가 바뀔 때 keyword 동기화
  useEffect(() => {
    setKeyword(qFromUrl);
  }, [qFromUrl]);

  const hasKeyword = keyword.trim().length > 0;


  const handleChangeKeyword = (value: string) => {
    const trimmed = value.trim();
    setKeyword(value);
    
    const params = new URLSearchParams(searchParams);
    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
      params.delete("tab");
    }
    params.delete("mood");
    params.delete("style");
    params.delete("immersion");
    navigate(`/search?${params.toString()}`, { replace: true });
    resetFilter();
    setActiveTab("전체");
  };

  const handleResetFilters = useCallback(() => {
    resetFilter();
    // 필터 리셋 시 URL 필터도 제거
    const params = new URLSearchParams(searchParams);
    params.delete("mood");
    params.delete("style");
    params.delete("immersion");
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [resetFilter, searchParams, navigate]);

  const handleChangeTab = (tab: TabType) => {
    const params = new URLSearchParams(searchParams);
    if (tab === "도서") {
      params.set("tab", "book");
    } else if (tab === "작가") {
      params.set("tab", "author");
    } else {
      params.delete("tab");
    }
    navigate(`/search?${params.toString()}`, { replace: true });
  };

  const filteredBooks: BookWithFilter[] = useMemo(() => {
    return (BOOKS as BookWithFilter[]).filter((book) => {
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
              <BothResults
                keyword={keyword}
                bookTotal={filteredBooks.length}
                bookItems={filteredBooks.slice(0, 3)}
                authorTotal={AUTHORS.length}
                authorItems={AUTHORS.slice(0, 5)}
                onBookMoreClick={() => handleChangeTab("도서")}
                onAuthorMoreClick={() => handleChangeTab("작가")}
              />
            )}

            {activeTab === "작가" && (
              <AuthorResults
                total={AUTHORS.length}
                items={AUTHORS}
              />
            )}
            {activeTab === "도서" && (
              <BookResults
                keyword={keyword}
                total={filteredBooks.length}
                items={filteredBooks}
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
