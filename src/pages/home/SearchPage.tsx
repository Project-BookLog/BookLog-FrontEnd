import { useCallback, useEffect, useRef, useState, useTransition} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import NavBarSearchInput from "../../components/common/navbar/NavBarSerachInput";
import Tab from "../../components/common/Tab";

import RecentSearches from "../../components/home/search/RecentSearches";
import RecommendedSearches from "../../components/home/search/RecommendedSearches";
import BothResults from "../../components/home/search/BothResults";
import BookResults from "../../components/home/search/BookResults";
import AuthorResults from "../../components/home/search/AuthorResults";

import { useSearch } from "../../context/SearchContext";
import { LoadingPage } from "../onboarding/LoadingPage";
import { ErrorPage } from "../onboarding/ErrorPage";

const TABS = ["전체", "작가", "도서"] as const;
type TabType = (typeof TABS)[number];

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = useSearch();

  const q = searchParams.get("q") ?? "";
  const tabParam = searchParams.get("tab");

  const activeTab: TabType =
    tabParam === "book" ? "도서" : tabParam === "author" ? "작가" : "전체";


  const inputKeyword = search.keyword;


  const [searchKeyword, setSearchKeyword] = useState("");

  const hasSearched = Boolean(searchKeyword);
  const [isPending, startTransition] = useTransition();


  const isInitRef = useRef(false);

  useEffect(() => {
    if (isInitRef.current) return;
    if (!q) return;

    search.setKeyword(q);
    setSearchKeyword(q);

    isInitRef.current = true;
  }, [q, search]);


  const handleSearch = useCallback(() => {
    const keyword = inputKeyword.trim();
    if (!keyword) return;


    search.setKeyword(keyword);
    setSearchKeyword(keyword);

    startTransition(() => {
      switch (activeTab) {
        case "전체":
          search.searchBoth(); 
          break;
        case "도서":
          search.searchBooks({ query: keyword });
          break;
        case "작가":
          search.searchAuthors({ query: keyword });
          break;
      }
    });

    const params = new URLSearchParams(searchParams);
    params.set("q", keyword);
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [inputKeyword, activeTab, search, navigate, searchParams]);


  const handleChangeTab = useCallback(
    (tab: TabType) => {
      if (!searchKeyword) return;

      const params = new URLSearchParams(searchParams);
      if (tab === "도서") params.set("tab", "book");
      else if (tab === "작가") params.set("tab", "author");
      else params.delete("tab");

      navigate(`/search?${params.toString()}`, { replace: true });
    },
    [searchKeyword, searchParams, navigate]
  );


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


  const error = search.bothError || search.bookError || search.authorError;

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
            onChange={search.setKeyword}
            onSearch={handleSearch}
            placeholder="도서 검색하기"
          />
        }
      />

      {hasSearched && (
        <div className="mt-2 px-4">
          <Tab tabs={TABS} active={activeTab} onChange={handleChangeTab} align="start" />
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
                bookTotal={search.bookTotal}
                bookItems={search.bookItems}
                authorTotal={search.authorTotal}
                authorItems={search.authorItems}
                onBookMoreClick={() => handleChangeTab("도서")}
                onAuthorMoreClick={() => handleChangeTab("작가")}
              />
            )}

            {activeTab === "도서" && (
              <BookResults total={search.bookTotal} items={search.bookItems} />
            )}

            {activeTab === "작가" && (
              <AuthorResults total={search.authorTotal} items={search.authorItems} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
