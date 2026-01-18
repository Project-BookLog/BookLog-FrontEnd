import { Setting, BackIcon } from "../../assets/icons";
import { mockUser } from "../../data/user.mock";
import UserInfoCard from "../../components/mypage/UserInfoCard";
import ReadingStatus from "../../components/mypage/ReadingStatus";
import TopReadingRanking from "../../components/mypage/TopReadingRanking";
import ReadingCalendar from "../../components/mypage/ReadingCalendar";
import NavbarBottom from "../../components/common/navbar/NavBarBottom";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

function MyPage() {
  const navigate = useNavigate();

  const currentDate = useMemo(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),    
      month: now.getMonth() + 1,   
    };
  }, []);

  const handleSettingClick = () => {
    navigate("/setting");
  };

  const handleCalendarClick = () => {
    navigate("/mypage/readingcalendar"); 
  };

  const handleRankingClick = () => {
    navigate("/mypage/readingranking"); 
  };
  

  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col">
        <header className="mt-4 px-5 flex h-15 items-center justify-between">
          <p className="text-head">마이페이지</p>
          <button
            onClick={handleSettingClick}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="설정"
          >
            <Setting className="h-6 w-6 text-black" />
          </button>
        </header>

        <section className=" px-5">
          <UserInfoCard user={mockUser} />
        </section>

        <div className="mt-8 h-2 w-full bg-gray-100" />

        <section className="px-5 mt-8">
          <ReadingStatus />
        </section>


        {/* 독서 랭킹 */}
        <section className="px-5 mt-8">
          <div className="mb-3.5 flex justify-between">
            <p className="text-title-02">독서 랭킹</p>
            <button
              type="button"
              onClick={handleRankingClick}
              className="flex items-center gap-0.5 text-gray-500 text-body-03"
            >
              <span>전체보기</span>
              <BackIcon className="rotate-180 w-[14px] h-[14px]" />
            </button>
          </div>

          <TopReadingRanking />
        </section>


        {/* 독서 캘린더 */}
        <section className="px-5 mt-8 mb-28">
          <div className="mb-3.5 flex justify-between">
            <p className="text-title-02">독서 캘린더</p>
            <button
              type="button"
              onClick={handleCalendarClick}
              className="flex items-center gap-0.5 text-gray-500 text-body-03"
            >
              <span>전체보기</span>
              <BackIcon className="rotate-180 w-[14px] h-[14px]" />
            </button>
          </div>

          <ReadingCalendar 
            year={currentDate.year} 
            month={currentDate.month} 
          />
        </section>

        <NavbarBottom />

      </main>
    </div>
  );
}

export default MyPage;