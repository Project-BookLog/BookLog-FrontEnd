import { useEffect, useRef, useState } from "react";
import NavBarTop from "../../components/NavBarTop";
import { Dummy_book } from "../../assets/icons";
import Tabs from "../../components/detail/Tab";
import BookRecommeded from "../../components/detail/BookRecommended";
import BookInfo from "../../components/detail/BookInfo";
import BookLogCarousel from "../../components/detail/BookLogCarousel";

export const BookDetail = () => {
  const [tab, setTab] = useState("책 추천");

  const RecommendedRef = useRef<HTMLElement | null>(null);
  const InfoRef = useRef<HTMLElement | null>(null);
  const BookLogRef = useRef<HTMLElement | null>(null);

  const handleChangeTab = (nextTab: string) => {
    setTab(nextTab);

    const getTarget = () => {
      if (nextTab === "책 추천") return RecommendedRef.current;
      if (nextTab === "책 정보") return InfoRef.current;
      if (nextTab === "북로그") return BookLogRef.current;
      return null;
    };

    const el = getTarget();
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offsetTop = window.scrollY + rect.top; // 섹션 실제 Y 위치
    const OFFSET = 80; // 위로 이동 (px)

    window.scrollTo({
      top: offsetTop - OFFSET,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    const handleScroll = () => {
      const sections: { name: string; el: HTMLElement | null }[] = [
        { name: "책 추천", el: RecommendedRef.current },
        { name: "책 정보", el: InfoRef.current },
        { name: "북로그", el: BookLogRef.current },
      ];

      // 탭 높이만큼 살짝 위로 보정 (-40)
      const viewportMiddle = window.scrollY + window.innerHeight / 2 - 40;

      let closestName = tab;
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

      if (closestName !== tab) {
        setTab(closestName);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tab]);

  return (
    <div className="min-h-screen bg-bg">
      {/* navbar */}
      <NavBarTop 
        back={true}
        onBack={() => history.back()} 
        title="책 정보" 
      />

      <main className="pb-6 pt-4 space-y-5 mb-10">
        {/* 상단 책 썸네일 + 정보 */}
        <div className="px-6">
          <div className="flex justify-center">
            <Dummy_book className="w-37.5 h-57.5 flex-shrink-0 rounded-md" />
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <button className="px-2 py-1 h-6 rounded-sm bg-lightblue-1 text-caption-02 text-primary">
                도서
              </button>
            </div>
            <div>
              <p className="text-title-01">물고기는 존재하지 않는다</p>
              <p className="text-caption-01 text-gray-500 mb-2 mt-1">
                상실, 사랑 그리고 숨어있는 삶의 질서에 관한 이야기
              </p>
              <p className="text-caption-02 text-gray-500">
                룰루밀러 저<span> | </span>정지인 역
              </p>
            </div>
          </div>
        </div>

        {/* 탭 active -> 화면 중앙에 가장 가까운 섹션으로 설정 */} 
        <div className="sticky top-0 z-10 bg-bg">
          <div className="px-6 border-b border-gray-200 bg-white">
            <Tabs active={tab} onChange={handleChangeTab} />
          </div>
        </div>

        {/* 책 추천 섹션 */}
        <section ref={RecommendedRef}>
          <BookRecommeded />
          <hr className="mt-5 h-2 bg-gray-100 border-none" />
        </section>

        {/* 책 정보 섹션 */}
        <section ref={InfoRef}>
          <BookInfo />
          <hr className="mt-5 h-2 bg-gray-100 border-none" />
        </section>

        {/* 북로그 섹션 */}
        <section ref={BookLogRef}>
          <BookLogCarousel />
        </section>
      </main>

      <div className="px-6 mb-4">
        <button className="w-full h-13 rounded-lg bg-black text-white text-subtitle-02-sb">
          서재에 저장
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
