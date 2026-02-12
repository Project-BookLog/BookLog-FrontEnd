import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { Alarm, LogoBooklog } from "../assets/icons";
import NavBarTop from "../components/common/navbar/NavBarTop";
import Tab from "../components/common/Tab";
import RecommendedCarousel from "../components/home/RecommendedCarousel";
import CurrentReading from "../components/home/CurrentReading";
import Ranking from "../components/home/Ranking";
import BestSeller from "../components/home/BestSeller";
import NavbarBottom from "../components/common/navbar/NavBarBottom";

import { LoadingPage } from "./onboarding/LoadingPage";
import { ErrorPage } from "./onboarding/ErrorPage";

import { getMyProfile } from "../api/mypage/myProfile";
import { getHome } from "../api/home/home";

const TABS = ["홈", "실시간 랭킹", "분위기별", "문체별", "몰입도별"] as const;
type TapType = (typeof TABS)[number];

function HomePage() {
  const [activeTab, setActiveTab] = useState<TapType>("홈");

  const likeSectionRef = useRef<HTMLDivElement | null>(null);
  const rankingRef = useRef<HTMLDivElement | null>(null);
  const moodRef = useRef<HTMLDivElement | null>(null);
  const writingStyleRef = useRef<HTMLDivElement | null>(null);
  const immersionRef = useRef<HTMLDivElement | null>(null);

  const {
    data: profile,
    isError: profileError,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
  });

  const {
    data: homeData,
    isError: homeError,
  } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });


  const handleChangeTab = (nextTab: TapType) => {
    setActiveTab(nextTab);

    const map = {
      홈: likeSectionRef,
      "실시간 랭킹": rankingRef,
      분위기별: moodRef,
      문체별: writingStyleRef,
      몰입도별: immersionRef,
    };

    const target = map[nextTab]?.current;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections: { name: TapType; el: HTMLDivElement | null }[] = [
        { name: "홈", el: likeSectionRef.current },
        { name: "실시간 랭킹", el: rankingRef.current },
        { name: "분위기별", el: moodRef.current },
        { name: "문체별", el: writingStyleRef.current },
        { name: "몰입도별", el: immersionRef.current },
      ];

      const viewportMiddle = window.scrollY + window.innerHeight / 2 - 40;

      let closestName: TapType = activeTab;
      let closestDistance = Infinity;

      sections.forEach(({ name, el }) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const sectionMiddle = rect.top + window.scrollY + rect.height / 2;
        const distance = Math.abs(sectionMiddle - viewportMiddle);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestName = name;
        }
      });

      if (closestName !== activeTab) {
        setActiveTab(closestName);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);


  if (!profile || !homeData) return <LoadingPage />;
  if (profileError || homeError) return <ErrorPage />;


  return (
    <div className="min-h-screen bg-bg">

      <NavBarTop
        leftSlot={<LogoBooklog className="h-[30px]" />}
        rightSlot={<Alarm className="w-6 h-6 mt-1" />}
      />

      <div className="sticky top-0 z-10 bg-bg">
        <div className="px-5 border-b border-gray-200">
          <Tab
            tabs={TABS}
            active={activeTab}
            onChange={handleChangeTab}
            align="between"
          />
        </div>
      </div>

      <main className="pb-6 pt-4 mb-10 overflow-x-hidden">
        <section ref={likeSectionRef} className="scroll-mt-15 mb-10">
          <RecommendedCarousel />
        </section>

        <section className="mb-12">
          <CurrentReading username={profile.nickname} />
        </section>

        <section ref={rankingRef} className="scroll-mt-15 mb-12">
          <Ranking books={homeData.realTimeRanking.rankings} />
        </section>

        <section ref={moodRef} className="scroll-mt-15 mb-12">
          <BestSeller
            type="mood"
            title="분위기별 베스트셀러"
            subtitle="내 취향에 맞는 분위기별 책을 골라 읽어보세요!"
            sections={homeData.moodBestsellers}
          />
        </section>

        <section ref={writingStyleRef} className="scroll-mt-15 mb-12">
          <BestSeller
            type="writingStyle"
            title="문체별 베스트셀러"
            subtitle="내 취향에 맞는 문체별 책을 골라 읽어보세요!"
            sections={homeData.writingStyleBestsellers}
          />
        </section>

        <section ref={immersionRef} className="scroll-mt-15 mb-12">
          <BestSeller
            type="immersion"
            title="몰입도별 베스트셀러"
            subtitle="내 취향에 맞는 몰입도별 책을 골라 읽어보세요!"
            sections={homeData.immersionBestsellers}
          />
        </section>
      </main>

      <NavbarBottom />
    </div>
  );
}

export default HomePage;
