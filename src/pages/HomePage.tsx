import { useState, useRef } from "react";
import { Alarm, Logo2, Booklog } from "../assets/icons";
import NavBar from "../components/NavBar";
import Tabs from "../components/home/Tabs";
import LikeCarousel from "../components/home/LikeCarousel";
import CurrentReading from "../components/home/CurrentReading";

function HomePage() {
  const [tab, setTab] = useState("홈");

  // LikeCarousel 위치 ref
  const likeSectionRef = useRef<HTMLDivElement | null>(null);

  const handleChangeTab = (nextTab: string) => {
    setTab(nextTab);

    // 홈 -> LikeCarousel로
    if (nextTab === "홈" && likeSectionRef.current) {
      likeSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* navbar */}
      <NavBar
        back={false}
        leftContent={
          <div className="flex items-center gap-1">
            <Logo2 className="w-7 h-7" />
            <Booklog className="h-6 mt-1.5" />
          </div>
        }
        rightSlot={<Alarm className="w-5 h-5" />}
      />

      {/* tab*/}
      <div className="sticky top-0 z-10 bg-slate-100">
        <div className="px-6 border-b border-slate-200 bg-white">
          <Tabs active={tab} onChange={handleChangeTab} />
        </div>
      </div>

      {/* 내용 */}
      <main className="pb-6 pt-4 space-y-12">
        {/* 내가 좋아하는 ~~  */}
        <section ref={likeSectionRef}>
          <LikeCarousel />
        </section>

        {/* 지금 읽고 있는 책  */}
        <section>
          <CurrentReading />
        </section>

        {/* 랭킹 */}
        <section>
        </section>

        {/* 베스트셀러 */}
        <section>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
