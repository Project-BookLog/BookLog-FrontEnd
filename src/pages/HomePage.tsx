import { useEffect, useState, useRef } from "react"; // useEffect 추가
import { Alarm, Logo2, LogoBooklog } from "../assets/icons";
import NavBarTop from "../components/common/navbar/NavBarTop";
import Tab from "../components/common/Tab";
import LikeCarousel from "../components/home/LikeCarousel";
import CurrentReading from "../components/home/CurrentReading";
import Ranking from "../components/home/Ranking";
import BestSeller from "../components/home/BestSeller";
import NavbarBottom from "../components/common/navbar/NavBarBottom";

const TABS = ["홈", "실시간 랭킹", "분위기별", "문체별", "몰입도별"] as const;
type TapType = (typeof TABS)[number];

function HomePage() {
  const [activeTab, setActiveTab] = useState<TapType>("홈");

  const likeSectionRef = useRef<HTMLDivElement | null>(null);
  const rankingRef = useRef<HTMLDivElement | null>(null);
  const moodRef = useRef<HTMLDivElement | null>(null);
  const writingStyleRef = useRef<HTMLDivElement | null>(null);
  const immersionRef = useRef<HTMLDivElement | null>(null);

  const handleChangeTab = (nextTab: TapType) => {
    setActiveTab(nextTab);

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

  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
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

      {/* 내용 */}
      <main className="pb-6 pt-4 space-y-12 mb-10">
        <section ref={likeSectionRef} className="scroll-mt-15">
          <LikeCarousel />
        </section>

        <section className="mb-12">
          <CurrentReading />
        </section>

        <section ref={rankingRef} className="scroll-mt-15">
          <Ranking />
        </section>

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
