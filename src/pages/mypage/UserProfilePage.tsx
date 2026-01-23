// src/pages/user/UserProfilePage.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import { Share, Bookmark, BackIcon } from "../../assets/icons";
import { GradationFrame } from "../../components/myLibrary/GradationFrame";

type Tab = "library" | "blog";

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;

  // ✅ MyLibraryPage 스타일과 동일하게 쓸 수 있도록 확장 (없어도 됨)
  coverUrl?: string;
  CoverIcon?: React.ComponentType<{ className?: string }>;
};

type ShelfSection = {
  id: string;
  title: string;
  books: Book[];
};

type BlogPost = {
  id: string;
  excerpt: string;
  tags: string[];
  bookmarkCount: number;
  moreCount?: number;
};

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("library");
  const [isFollowing, setIsFollowing] = useState(false);

  const librarySections = useMemo<ShelfSection[]>(
    () => [
      {
        id: "shelf1",
        title: "서재 1",
        books: [
          { id: "b1", title: "책 제목", author: "저자명", publisher: "출판사" },
          { id: "b2", title: "책 제목", author: "저자명", publisher: "출판사" },
          { id: "b3", title: "책 제목", author: "저자명", publisher: "출판사" },
        ],
      },
      {
        id: "shelf2",
        title: "서재 2",
        books: [
          { id: "b5", title: "책 제목", author: "저자명", publisher: "출판사" },
          { id: "b6", title: "책 제목", author: "저자명", publisher: "출판사" },
          { id: "b7", title: "책 제목", author: "저자명", publisher: "출판사" },
        ],
      },
    ],
    []
  );

  const blogPosts = useMemo<BlogPost[]>(
    () => [
      {
        id: "p1",
        excerpt:
          "이 책은 어쩌구 다른 유저의 북로그 내용 다른 유저의 북로그 내용 다른 유저의 북로그 내용 다른 유저의 북로그 내용 다른 유저의 북로그 내용 유저의 북로그 내용 다른 유저의 북로그 내용 다른 유저의 북로그 내용 ",
        tags: ["잔잔한, 따뜻한", "사유적", "생각이 필요한"],
        bookmarkCount: 20,
        moreCount: 2,
      },
      {
        id: "p2",
        excerpt:
          "이 책은 어쩌구 다른 유저의 북로그 내용 다른 유저의 북로그 내용 다른 유저의 북로그 내용 다른 유저의 북로그 내용 다른 유저의 북로그 내용 유저의 북로그 내용 다른 유저의 북로그 내용 다른 유저의 북로그 내용 ",
        tags: ["잔잔한, 따뜻한", "사유적", "생각이 필요한"],
        bookmarkCount: 20,
        moreCount: 2,
      },
    ],
    []
  );

  const hasLibrary = librarySections.some((s) => s.books.length > 0);
  const hasBlog = blogPosts.length > 0;

  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop title="유저 프로필" onBack={() => navigate("/booklog/:booklogId")} />

      {/* ✅ 상단 카드 */}
      <div className="bg-bg px-5 py-5">
        <div className="flex items-center gap-[10px]">
          <div className="grid h-[73px] w-[73px] place-items-center rounded-full bg-[#CDCCCB]">
            <span className="text-caption-01 text-[#0A0A0A]">img</span>
          </div>

          <div className="flex-1">
            <div className="text-title-02 text-[#000000]">User name</div>
            <div className="mt-1 text-caption-01 text-[#81807F]">
              UserIDcode@naver.com
            </div>

            <div className="mt-2 flex items-center gap-3">
              <span className="text-caption-02 text-[#262626]">
                팔로워 <span className="text-[#262626]">31</span>
              </span>
              <span className="h-[4px] w-[4px] rounded-full bg-[#E7E5E4]" />
              <span className="text-caption-02 text-[#262626]">
                팔로잉 <span className="text-[#262626]">57</span>
              </span>
            </div>
          </div>
        </div>

        {/* 통계 3칸 */}
        <div className="mt-5 grid grid-cols-3 text-center">
          <div className="px-3">
            <div className="text-caption-02 text-[#676665]">독서 완독</div>
            <div className="mt-2 text-title-02 text-[#0A0A0A]">28</div>
          </div>

          <div className="px-6 border-x border-[#EFEDEB]">
            <div className="text-caption-02 text-[#676665]">저장된 책</div>
            <div className="mt-2 text-title-02 text-[#0A0A0A]">107</div>
          </div>

          <div className="px-3">
            <div className="text-caption-02 text-[#676665]">작성한 북로그</div>
            <div className="mt-2 text-title-02 text-[#0A0A0A]">15</div>
          </div>
        </div>

        {/* 팔로우/공유 */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsFollowing((prev) => !prev)}
            className={[
              "h-[45px] flex-1 rounded-[12px] text-subtitle-02-sb transition-colors",
              isFollowing
                ? "bg-[#E7E5E4] text-[#0A0A0A]"
                : "bg-[#3049C0] text-[#FFFFFF]",
            ].join(" ")}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </button>

          <button
            type="button"
            aria-label="share"
            className="grid h-[45px] w-[45px] place-items-center rounded-[12px] bg-[#E7E5E4]"
          >
            <Share className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="h-[8px] bg-[#EFEDEB]" />

      {/* 탭 */}
      <div className="bg-bg">
        <div className="px-1">
          <div className="flex h-[52px] items-end justify-between border-b border-[#E7E5E4]">
            <TabButton
              active={tab === "library"}
              onClick={() => setTab("library")}
              label="서재"
            />
            <TabButton
              active={tab === "blog"}
              onClick={() => setTab("blog")}
              label="북로그"
            />
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="pt-6 pb-10">
          {tab === "library" ? (
            hasLibrary ? (
              <div className="flex flex-col gap-7">
                {librarySections.map((section) => (
                  <ShelfRow
                    key={section.id}
                    title={section.title}
                    onViewAll={() => navigate(`/my-library/${section.title}`)}
                    items={section.books}
                  />
                ))}
              </div>
            ) : (
              <div className="px-5">
                <EmptyState
                  title="저장된 도서가 없어요."
                  desc={
                    <>
                      유저가 저장된 책들이 생기면
                      <br />
                      이곳에서 확인할 수 있어요.
                    </>
                  }
                />
              </div>
            )
          ) : hasBlog ? (
            <div className="space-y-4 px-5">
              {blogPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <div className="px-5">
              <EmptyState
                title="기록된 북로그가 없어요."
                desc={
                  <>
                    유저가 북로그를 작성하면
                    <br />
                    이곳에서 확인할 수 있어요.
                  </>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== 서재 섹션 (MyLibraryPage와 동일한 구조/모양) ===== */
function ShelfRow<
  T extends {
    id: string;
    title: string;
    author: string;
    publisher: string;
    coverUrl?: string;
    CoverIcon?: React.ComponentType<{ className?: string }>;
  }
>({
  title,
  onViewAll,
  items,
}: {
  title: string;
  onViewAll: () => void;
  items: T[];
}) {
  const top3 = items.slice(0, 3);

  return (
    <section className="flex flex-col items-center gap-8 self-stretch">
      <div className="flex px-5 justify-between items-center self-stretch">
        <p className="text-black text-title-02">{title}</p>

        <button
          className="flex items-center gap-[2px]"
          onClick={onViewAll}
          type="button"
        >
          <p className="text-body-03 text-gray-500 cursor-pointer">전체보기</p>
          <BackIcon className="w-[14px] h-[14px] rotate-180" />
        </button>
      </div>

      <div className="relative flex w-[375px] px-5 flex-col items-center gap-[10px]">
        <div className="inline-flex items-center gap-[10px]">
          {top3.map((book) => (
            <div
              key={book.id}
              className="flex w-[104px] h-[156px] items-center rounded-[4px] overflow-hidden bg-[#CDCCCB]"
            >
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              ) : book.CoverIcon ? (
                <book.CoverIcon className="h-full w-full" />
              ) : (
                <span className="text-xs">No Image</span>
              )}
            </div>
          ))}
        </div>

        <div className="absolute top-[116px] flex w-[347px] h-[52px] justify-center items-center">
          <GradationFrame />
        </div>

        <div className="flex items-center gap-[10px]">
          {top3.map((book) => (
            <div
              key={`${book.id}-meta`}
              className="flex w-[104px] flex-col justify-center items-start gap-[2px]"
            >
              <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-black text-subtitle-02-sb">
                {book.title}
              </p>
              <p className="w-[105px] line-clamp-1 overflow-hidden text-ellipsis text-gray-500 text-caption-02">
                {book.author}, {book.publisher}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== 북로그 카드 ===== */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="rounded-[12px] bg-[#EFEDEB] px-[20px] py-[14px]">
      <div className="flex gap-2">
        <div className="grid h-[94px] w-[94px] place-items-center rounded-[8px] bg-[#CDCCCB]">
          <span className="text-body-03 text-[#000000]">북 img</span>
        </div>

        <div className="grid h-[94px] w-[94px] place-items-center rounded-[8px] bg-[#CDCCCB]">
          <span className="text-body-03 text-[#000000]">img</span>
        </div>

        <div className="grid h-[94px] w-[94px] place-items-center rounded-[8px] bg-[#CDCCCB]">
          <span className="text-body-01-m text-[#000000]">
            +{post.moreCount ?? 0}
          </span>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-caption-01 text-[#4D4D4C]">
        {post.excerpt}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1 overflow-hidden">
          {post.tags.map((t) => (
            <span
              key={t}
              className="shrink-0 rounded-[4px] bg-[#788ADE26] px-[8px] py-[3px] text-caption-02 text-[#3049C0]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-caption-01 text-[#9B9A97]">
          <Bookmark className="h-5 w-5" />
          <span>{post.bookmarkCount}</span>
        </div>
      </div>
    </div>
  );
}

/* ===== 탭 버튼 ===== */
function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex-1 pb-3 text-center"
      type="button"
    >
      <span
        className={
          active
            ? "text-body-01-sb text-[#3049C0]"
            : "text-body-01-m text-[#9B9A97]"
        }
      >
        {label}
      </span>

      {active && (
        <span className="absolute left-0 right-0 bottom-0 mx-auto h-[2px] w-[80%] bg-[#3049C0]" />
      )}
    </button>
  );
}

/* ===== 빈 상태 ===== */
function EmptyState({ title, desc }: { title: string; desc: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="text-title-02 text-[#262626]">{title}</div>
      <div className="mt-3 text-body-03 text-[#81807F]">{desc}</div>
    </div>
  );
}
