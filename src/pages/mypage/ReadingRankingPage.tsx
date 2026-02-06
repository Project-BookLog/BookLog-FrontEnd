import NavBarTop from "../../components/common/navbar/NavBarTop";
import TopReadingRanking from "../../components/mypage/TopReadingRanking";
import ReadingRankingList from "../../components/mypage/ReadingRankingList";
import EmptyReadingRanking from "../../components/mypage/EmptyReadingRanking";
import { useEffect, useMemo, useState } from "react";
import { getCurrentMonthString } from "../../utils/date";
import { LoadingPage } from "../../pages/onboarding/LoadingPage";
import { getReadingRankingList } from "../../api/mypage/readingRanking";

type PageStatus = "loading" | "empty" | "content";

function ReadingRankingPage() {
  const month = useMemo(() => getCurrentMonthString(), []);
  const [status, setStatus] = useState<PageStatus>("loading");

  useEffect(() => {
    getReadingRankingList(month)
      .then((res) => {
        setStatus(res.items.length === 0 ? "empty" : "content");
      })
      .catch(() => {
        setStatus("empty");
      });
  }, [month]);

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <NavBarTop title="독서 랭킹" onBack={() => history.back()} />

      {status === "loading" && <LoadingPage />}

      {status === "empty" && (
        <main className="flex flex-1 items-center justify-center px-5">
          <EmptyReadingRanking />
        </main>
      )}

      {status === "content" && (
        <main className="px-5 pt-5 pb-8">
          <TopReadingRanking month={month} />
          <ReadingRankingList month={month} />
        </main>
      )}
    </div>
  );
}

export default ReadingRankingPage;
