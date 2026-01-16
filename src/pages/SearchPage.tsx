import { useState } from "react";
import NavBarTop from "../components/NavBarTop";
import NavBarSearchInput from "../components/NavBarSerachInput";
import RecentSearches from "../components/search/RecentSearches";
import RecommendedSearches from "../components/search/RecommendedSearches";
import SearchTabs from "../components/search/SearchTabs";
import AuthorResults from "../components/search/AuthorResults";
import BookResults from "../components/search/BookResults";
import { BOOKS } from "../data/book.mock";
import { AUTHORS } from "../data/author.mock";

type Tab = "전체" | "작가" | "도서";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("전체");

  const hasKeyword = keyword.trim().length > 0;

  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop
        back
        centerSlot={
          <div className="flex-1 w-full">
            <NavBarSearchInput
              value={keyword}
              onChange={setKeyword}
              placeholder="도서 검색하기"
            />
          </div>
        }
      />

      {hasKeyword && (
        <div className="px-4 mt-2">
          <SearchTabs active={activeTab} onChange={setActiveTab} />
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
              <div className="space-y-10 no-scrollbar">
                <AuthorResults
                  keyword={keyword}
                  total={AUTHORS.length}
                  items={AUTHORS.slice(0, 3)}
                  onMoreClick={() => setActiveTab("작가")}
                />
                <BookResults
                  keyword={keyword}
                  total={BOOKS.length}
                  items={BOOKS.slice(0, 3)}
                  onMoreClick={() => setActiveTab("도서")}
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
                total={BOOKS.length}
                items={BOOKS}
                mode="full"
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
