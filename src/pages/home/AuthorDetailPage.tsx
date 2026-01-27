import { useEffect, useRef, useState } from "react";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import Tab from "../../components/common/Tab";
import AuthorProfile from "../../components/home/author/AuthorProfile";
import AuthorAwards from "../../components/home/author/AuthorAwards";
import AuthorBooks from "../../components/home/author/AuthorBooks";

const TABS = ["프로필", "수상경력", "도서"] as const;
type TabType = (typeof TABS)[number];

export const AuthorDetailPage = () => {
  const [tab, setTab] = useState<TabType>("프로필");

  const ProfileRef = useRef<HTMLElement | null>(null);
  const AwardRef = useRef<HTMLElement | null>(null);
  const BookRef = useRef<HTMLElement | null>(null);


  const handleChangeTab = (nextTab: TabType) => {
    setTab(nextTab);

    const getTarget = () => {
      if (nextTab === "프로필") return ProfileRef.current;
      if (nextTab === "수상경력") return AwardRef.current;
      if (nextTab === "도서") return BookRef.current;
      return null;
    };

    const el = getTarget();
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offsetTop = window.scrollY + rect.top;
    const OFFSET = 80;

    window.scrollTo({
      top: offsetTop - OFFSET,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections: { name: TabType; el: HTMLElement | null }[] = [
        { name: "프로필", el: ProfileRef.current },
        { name: "수상경력", el: AwardRef.current },
        { name: "도서", el: BookRef.current },
      ];

      const viewportMiddle = window.scrollY + window.innerHeight / 2 - 40;

      let closestName: TabType = tab;
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
      <NavBarTop
        back={true}
        onBack={() => history.back()}
        title="작가 이름"
      />

      <main className="pb-6 pt-4 space-y-5 mb-10">
        {/* 상단 책 썸네일 + 정보 */}
        <div className="px-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-[#d9d9d9] w-[170px] h-[170px] flex items-center justify-center">작가 이미지</div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <button className="px-2 py-1 h-6 rounded-sm bg-lightblue-1 text-caption-02 text-primary">
                소설가
              </button>
            </div>
            <div>
              <p className="text-title-01">작가 이름</p>
              <p className="text-caption-01 text-gray-500 mb-2 mt-1">
                작가에 대한 한 줄 소개 내용
              </p>
              <p className="text-caption-02 text-gray-500">
                소설가<span> | </span>한국
              </p>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="sticky top-0 z-10 bg-bg">
          <div className="px-6 border-b border-gray-200 bg-white">
            <Tab
              tabs={TABS}
              active={tab}
              onChange={handleChangeTab}
              align="start"
            />
          </div>
        </div>

        {/* 기본정보 섹션 */}
        <section ref={ProfileRef}>
          <AuthorProfile />
          <hr className="mt-5 h-2 bg-gray-100 border-none" />
        </section>

        {/* 수상경력 섹션 */}
        <section ref={AwardRef}>
          <AuthorAwards />
          <hr className="mt-5 h-2 bg-gray-100 border-none" />
        </section>

        {/* 책 섹션 */}
        <section ref={BookRef}>
          <AuthorBooks />
        </section>
      </main>


    </div>
  );
};

export default AuthorDetailPage;
