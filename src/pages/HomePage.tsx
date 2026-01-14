import { useState, useRef } from "react";
import { Alarm, Logo2, LogoBooklog } from "../assets/icons";
import NavBarTop from "../components/NavBarTop";
import Tabs from "../home/Tabs";
import LikeCarousel from "../home/LikeCarousel";
import CurrentReading from "../home/CurrentReading";
import Ranking from "../home/Ranking";
import BestSeller from "../home/BestSeller";
import NavbarBottom from "../components/NavBarBottom";

function HomePage() {
  const [tab, setTab] = useState("홈");

  // 탭 이동 위치 ref
  const likeSectionRef = useRef<HTMLDivElement | null>(null);
  const rankingRef = useRef<HTMLDivElement | null>(null);
  const moodRef = useRef<HTMLDivElement | null>(null);
  const writingStyleRef = useRef<HTMLDivElement | null>(null);
  const immersionRef = useRef<HTMLDivElement | null>(null);

  const handleChangeTab = (nextTab: string) => {
    setTab(nextTab);

    // 탭 이동
    if (nextTab === "홈" && likeSectionRef.current) {
      likeSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (nextTab === "실시간 랭킹" && rankingRef.current) {
      rankingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (nextTab === "분위기별" && moodRef.current) {
      moodRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (nextTab === "문체별" && writingStyleRef.current) {
      writingStyleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (nextTab === "몰입도별" && immersionRef.current) {
      immersionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* navbar */}
      <NavBarTop
        back={false}
        leftContent={
          <div className="flex items-center gap-1">
            <Logo2 className="w-7 h-7" />
            <LogoBooklog className="h-6 mt-1.5" />
          </div>
        }
        rightSlot={<Alarm className="w-5 h-5" />}
      />

      {/* tab*/}
      <div className="sticky top-0 z-10 bg-gray-500">
        <div className="px-6 border-b border-gray-200 bg-white">
          <Tabs active={tab} onChange={handleChangeTab} />
        </div>
      </div>

      {/* 내용 */}
      <main className="pb-6 pt-4 space-y-12 mb-10">

        {/* 내가 좋아하는 ~~  */}
        <section ref={likeSectionRef} className="scroll-mt-15">
          <LikeCarousel />
        </section>

        {/* 지금 읽고 있는 책  */}
        <section className="mb-12" >
          <CurrentReading />
        </section>

        {/* 랭킹 */}
        <section ref={rankingRef} className="scroll-mt-15">
          <Ranking />
        </section>

        {/* 베스트셀러 */}
        <section ref={moodRef} className="scroll-mt-15">
          <BestSeller
            type="mood"
            title="분위기별 베스트셀러"
            subtitle="내 취향에 맞는 분위기별 책을 골라 읽어보세요!"
          />
        </section>
        <section ref={writingStyleRef} className="scroll-mt-15">
          <BestSeller
            type="writingStyle"
            title="문체별 베스트셀러"
            subtitle="내 취향에 맞는 문체별 책을 골라 읽어보세요!"
          />
        </section>
        <section ref={immersionRef} className="scroll-mt-15">
          <BestSeller
            type="immersion"
            title="몰입도별 베스트셀러"
            subtitle="내 취향에 맞는 몰입도별 책을 골라 읽어보세요!"
          />
        </section>
      </main>
      <NavbarBottom />
    </div>
  );
}

export default HomePage;
