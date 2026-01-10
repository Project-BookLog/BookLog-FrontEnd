import { useState } from "react";
import NavBarTop from "../components/NavBarTop";
import NavBarSearchInput from "../components/NavBarSerachInput";
import RecentSearches from "../components/search/RecentSearches";
import RecommendedSearches from "../components/search/RecommendedSearches";

function SearchPage() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <NavBarTop
        back
        centerSlot={
          <NavBarSearchInput
            value={keyword}
            onChange={setKeyword}
            placeholder="도서 검색하기"
          />
        }
      />

      <main className="px-6 mt-6">

        <section className="mb-12"> {/* 최근 검색어 */}
          <RecentSearches items={["궤도", "소년이 온다", "한강"]} />
        </section>

        <section> {/* 추천 검색어 */}
          <RecommendedSearches items={["검색어1", "검색어2", "검색어3", "검색어4", "검색어4"]}/>
        </section>
      </main>
    </div>
  );
}


export default SearchPage;
