import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Setting, BackIcon } from "../../assets/icons";
import UserInfoCard from "../../components/mypage/UserInfoCard";
import ReadingStatus from "../../components/mypage/ReadingStatus";
import TopReadingRanking from "../../components/mypage/TopReadingRanking";
import ReadingCalendar from "../../components/mypage/ReadingCalendar";
import NavbarBottom from "../../components/common/navbar/NavBarBottom";
import { useNavigate } from "react-router-dom";
import { getCurrentMonthString, getCurrentYearMonth } from "../../utils/date";

import { getMyProfileCard } from "../../api/mypage/myProfileCard";
import { ErrorPage } from "../onboarding/ErrorPage";
import { LoadingPage } from "../onboarding/LoadingPage";

function MyPage() {
  const navigate = useNavigate();

  const monthString = useMemo(() => getCurrentMonthString(), []);
  const { year, month } = useMemo(() => getCurrentYearMonth(), []);


  const {
    data: profile,
    isError,
  } = useQuery({
    queryKey: ["myProfileCard"],
    queryFn: getMyProfileCard,
  });


  if (!profile) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col">
        <header className="mt-4 px-5 flex h-15 items-center justify-between">
          <p className="text-head">마이페이지</p>
          <button
            onClick={() => navigate("/setting")}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="설정"
          >
            <Setting className="h-6 w-6 text-black" />
          </button>
        </header>

        <section className="px-5">
          <UserInfoCard user={profile} />
        </section>

        <div className="mt-8 h-2 w-full bg-gray-100" />

        <section className="px-5 mt-8">
          <ReadingStatus />
        </section>

        <section className="px-5 mt-8">
          <div className="mb-3.5 flex justify-between">
            <p className="text-title-02">독서 랭킹</p>
            <button
              type="button"
              onClick={() => navigate("/mypage/readingranking")}
              className="flex items-center gap-0.5 text-gray-500 text-body-03"
            >
              <span>전체보기</span>
              <BackIcon className="rotate-180 w-[14px] h-[14px]" />
            </button>
          </div>

          <TopReadingRanking month={monthString} />
        </section>

        <section className="px-5 mt-8 mb-28">
          <div className="mb-3.5 flex justify-between">
            <p className="text-title-02">독서 캘린더</p>
            <button
              type="button"
              onClick={() => navigate("/mypage/readingcalendar")}
              className="flex items-center gap-0.5 text-gray-500 text-body-03"
            >
              <span>전체보기</span>
              <BackIcon className="rotate-180 w-[14px] h-[14px]" />
            </button>
          </div>

          <ReadingCalendar year={year} month={month} />
        </section>

        <NavbarBottom />
      </main>
    </div>
  );
}

export default MyPage;
