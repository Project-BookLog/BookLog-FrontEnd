import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import Tab from "../../components/common/Tab";
import AuthorProfile from "../../components/home/author/AuthorProfile";
import AuthorAwards from "../../components/home/author/AuthorAwards";
import AuthorBooks from "../../components/home/author/AuthorBooks";
import AuthorBookBrief from "../../components/home/author/AuthorBookBrief";
import { Default_ProfileImg } from "../../assets/icons";

import { getAuthorDetail } from "../../api/home/detail";
import type { AuthorDetail } from "../../types/home/detail.types";

import { LoadingPage } from "../onboarding/LoadingPage";
import { ErrorPage } from "../onboarding/ErrorPage";


const TABS = ["프로필", "수상경력", "도서"] as const;
type TabType = (typeof TABS)[number];

export const AuthorDetailPage = () => {
  const { authorid } = useParams<{ authorid: string }>();
  const [tab, setTab] = useState<TabType>("프로필");
  const [author, setAuthor] = useState<AuthorDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const ProfileRef = useRef<HTMLElement | null>(null);
  const AwardRef = useRef<HTMLElement | null>(null);
  const BookRef = useRef<HTMLElement | null>(null);


useEffect(() => {
  const handleScroll = () => { //상단기준 
    const OFFSET = 100; 

    const sections: { name: TabType; el: HTMLElement | null }[] = [
      { name: "프로필", el: ProfileRef.current },
      { name: "수상경력", el: AwardRef.current },
      { name: "도서", el: BookRef.current },
    ];

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (!section.el) continue;

      const rect = section.el.getBoundingClientRect();

      if (rect.top <= OFFSET) {
        if (tab !== section.name) {
          setTab(section.name);
        }
        break;
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, [tab]);

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
    if (!authorid) return;
    const id = Number(authorid);
    if (Number.isNaN(id)) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const fetchAuthor = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await getAuthorDetail(id);
        setAuthor(data);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthor();
  }, [authorid]);

  if (isLoading) return <LoadingPage />;
  if (isError || !author) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop
        back={true}
        onBack={() => history.back()}
        title="작가 정보"
      />
      
      <main className="pb-6 pt-4 space-y-5 mb-10 bg-bg">
        {/* 상단 프로필 */}
        <section className="px-5">
          <div className="flex justify-center">
            {author.profileImageUrl ? (
              <img
                src={author.profileImageUrl}
                alt={author.name}
                className="rounded-full w-[170px] h-[170px] object-cover"
              />
            ) : (
              <Default_ProfileImg className="rounded-full w-[170px] h-[170px]" />
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <span className="px-2 py-1 h-6 rounded-sm bg-lightblue-1 text-caption-02 text-primary mr-2">
                {author.profile.occupations?.length
                  ? author.profile.occupations.join(", ")
                  : "-"}
              </span>
            </div>

            <div>
              <p className="text-title-01 text-black">{author.name}</p>
              <p className="text-caption-01 text-gray-500 mt-2">
                {author.biography ?? "-"}
              </p>
            </div>

            <div className="text-caption-02 text-gray-500">
              <span>
                {author.profile.occupations?.length
                  ? author.profile.occupations.join(", ")
                  : "-"}
              </span>
              <span className="mx-2 text-gray-200">|</span>
              {/* <span>{author.profile.국적 ?? "-"}</span> */}
            </div>
          </div>

          <div className="mt-4">
            <AuthorBookBrief books={author.books.slice(0, 3)} />
          </div>
        </section>

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


        {/* 프로필 */}
        <section ref={ProfileRef}>
          <AuthorProfile profile={author.profile} />
          <hr className="mt-5 h-2 bg-gray-100 border-none" />
        </section>

        {/* 수상경력 */}
        <section ref={AwardRef}>
          <AuthorAwards awards={author.awards} />
          <hr className="mt-5 h-2 bg-gray-100 border-none" />
        </section>

        {/* 책 리스트 */}
        <section ref={BookRef}>
          <AuthorBooks books={author.books} />
        </section>
      </main>
    </div>
  );
};

export default AuthorDetailPage;
