import { useCallback, useEffect, useRef, useState, useTransition } from "react";
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
import { saveSearchKeyword, getRecentSearchKeywords, getRecommendedSearchKeywords, deleteAllRecentSearchKeywords, deleteRecentSearchKeyword} from "../../api/home/search";
import type { RecentSearchKeyword, RecommendedKeyword } from "../../types/home/search.types";
import { LoadingPage } from "../onboarding/LoadingPage";
import { ErrorPage } from "../onboarding/ErrorPage";

const TABS = ["전체", "작가", "도서"] as const;
type TabType = (typeof TABS)[number];

export default function SearchPage() {
  const navigate = useNavigate();
  const search = useSearch();
  const [searchParams] = useSearchParams();
  const isInitRef = useRef(false);

  const [recentKeywords, setRecentKeywords] = useState<
    RecentSearchKeyword[]
  >([]);

  const handleRemoveRecent = async (keyword: string) => {
    try {
      await deleteRecentSearchKeyword(keyword);

      setRecentKeywords((prev) =>
        prev.filter((k) => k.keyword !== keyword)
      );
    } catch (e) {
      console.warn("최근 검색어 삭제 실패", e);
      alert("검색어 삭제에 실패했습니다.");
    }
  };
  const handleClearRecent = async () => {
    try {
      await deleteAllRecentSearchKeywords();
      setRecentKeywords([]);
    } catch (e) {
      console.warn("전체 삭제 실패", e);
      alert("검색어 전체 삭제에 실패했습니다.");
    }
  };


  const [recommendedKeywords, setRecommendedKeywords] = useState<
    RecommendedKeyword[]
  >([]);
  

  const [isPending, startTransition] = useTransition();

  const q = searchParams.get("q") ?? "";
  const tabParam = searchParams.get("tab");

  const submittedKeyword = q ?? "";
  const searchKeyword = search.keyword;
  const hasSearched = Boolean(submittedKeyword);

  const activeTab: TabType =
    tabParam === "book"
      ? "도서"
      : tabParam === "author"
      ? "작가"
      : "전체";


  useEffect(() => {
    if (isInitRef.current) return;
    if (!q) return;

    search.setKeyword(q);
      
    startTransition(() => {
      if (activeTab === "도서") {
        search.searchBooks({ query: q });
      } else if (activeTab === "작가") {
        search.searchAuthors({ query: q });
      } else {
        search.searchBoth(q);
      }
    });

      isInitRef.current = true;
    }, [q, search, activeTab]);



  useEffect(() => {
    (async () => {
      try {
        const data = await getRecentSearchKeywords();
        setRecentKeywords(data.keywords);
      } catch (e) {
        console.warn("최근 검색어 조회 실패", e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getRecommendedSearchKeywords();
        setRecommendedKeywords(data.keywords);
      } catch (e) {
        console.warn("추천 검색어 조회 실패", e);
      }
    })();
  }, []);



  const handleSearch = useCallback(() => {
    const keyword = search.keyword.trim();
    if (!keyword) return;

    saveSearchKeyword(keyword).catch(() => {});

    search.clearBooks();
    search.clearAuthors();
    search.setKeyword(keyword);

    startTransition(() => {
      if (activeTab === "도서") {
        search.searchBooks({ query: keyword });
      } else if (activeTab === "작가") {
        search.searchAuthors({ query: keyword });
      } else {
        search.searchBoth(keyword);
      }
    });

    const params = new URLSearchParams(searchParams);
    params.set("q", keyword);
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [search, activeTab, navigate, searchParams]);


  
  const handleChangeTab = useCallback(
    (tab: TabType) => {
      if (!searchKeyword) return;

      search.clearBooks();
      search.clearAuthors();

      const params = new URLSearchParams(searchParams);
      if (tab === "도서") params.set("tab", "book");
      else if (tab === "작가") params.set("tab", "author");
      else params.delete("tab");

      startTransition(() => {
        if (tab === "도서") {
          search.searchBooks({ query: searchKeyword });
        } else if (tab === "작가") {
          search.searchAuthors({ query: searchKeyword });
        } else {
          search.searchBoth(searchKeyword);
        }
      });

      navigate(`/search?${params.toString()}`, { replace: true });
    },
    [searchKeyword, search, navigate, searchParams]
  );


  
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const onLoadMore = useCallback(() => {
    if (activeTab === "도서") {
      if (search.bookLoading || search.bookIsEnd) return;
      search.searchBooks({
        query: searchKeyword,
        loadMore: true,
      });
    }

    if (activeTab === "작가") {
      if (search.authorLoading || search.authorIsEnd) return;
      search.searchAuthors({
        query: searchKeyword,
        loadMore: true,
      });
    }
  }, [activeTab, search, searchKeyword]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [onLoadMore]);


  const error =
    search.bothError || search.bookError || search.authorError;

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorPage />;


  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop
        back
        onBack={() => navigate("/")}
        centerSlot={
          <NavBarSearchInput
            value={search.keyword}
            onChange={search.setKeyword}
            onSearch={handleSearch}
            placeholder="도서 검색하기"
            hideIcon={hasSearched}
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
              <RecentSearches
                items={recentKeywords.map((k) => k.keyword)}
                onRemoveItem={handleRemoveRecent}
                onClearAll={handleClearRecent}
                onClickItem={(keyword) => {
                  search.setKeyword(keyword);

                  startTransition(() => {
                    search.searchBoth(keyword);
                  });

                  const params = new URLSearchParams(searchParams);
                  params.set("q", keyword);
                  navigate(`/search?${params.toString()}`, {
                    replace: true,
                  });
                }}
              />
            </section>

            <section className="px-5">
              <RecommendedSearches
                items={recommendedKeywords.map((k) => k.keyword)}
                onClickItem={(keyword) => {
                  search.setKeyword(keyword);

                  startTransition(() => {
                    search.searchBoth(keyword);
                  });

                  const params = new URLSearchParams(searchParams);
                  params.set("q", keyword);
                  navigate(`/search?${params.toString()}`, { replace: true });
                }}
              />

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
              <>
                <BookResults
                  // total={search.bookTotal}
                  items={search.bookItems}
                />
                <div ref={loadMoreRef} />
              </>
            )}

            {activeTab === "작가" && (
              <>
                <AuthorResults
                  // total={search.authorTotal}
                  items={search.authorItems}
                />
                <div ref={loadMoreRef} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
