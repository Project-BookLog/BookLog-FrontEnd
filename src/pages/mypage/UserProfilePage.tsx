import { useMemo, useState } from "react";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { Share, Bookmark } from "../../assets/icons";

type Tab = "library" | "blog";

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
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
  // 이미지 3칸: 1) 북 이미지 2) 이미지 3) +n
  moreCount?: number; // +2 같은 것
};

export default function UserProfilePage() {
  const [tab, setTab] = useState<Tab>("library");
  const [isFollowing, setIsFollowing] = useState(false);

  // ✅ 서재 예시 데이터
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

  // ✅ 북로그 예시 데이터 (스샷처럼 카드 리스트)
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
      <NavBarTop title="유저 프로필" />

      {/* ✅ 상단 카드 */}
      <div className="bg-bg px-5 py-5">
        {/* 상단 프로필 라인 */}
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

        {/* ✅ 팔로우/팔로잉 + 이미지 버튼 */}
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

      {/* ✅ 팔로우 버튼과 탭 사이 회색 구분선 */}
      <div className="h-[8px] bg-[#EFEDEB]" />

      {/* ✅ 탭 */}
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

        {/* ✅ 컨텐츠 */}
        <div className="px-5 pt-6 pb-10">
          {tab === "library" ? (
            hasLibrary ? (
              <div className="space-y-10">
                {librarySections.map((section) => (
                  <ShelfRow
                    key={section.id}
                    title={section.title}
                    onViewAll={() => {}}
                    items={section.books}
                  />
                ))}
              </div>
            ) : (
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
            )
          ) : hasBlog ? (
            <div className="space-y-4">
              {blogPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== 서재 섹션(그대로) ===== */
function ShelfRow<T extends { id: string; title: string; author: string; publisher: string }>({
  title,
  onViewAll,
  items,
}: {
  title: string;
  onViewAll: () => void;
  items: T[];
}) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="text-title-02 text-[#262626]">{title}</h3>

        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 text-body-03 text-[#9B9A97]"
        >
          전체보기
          <ChevronRight />
        </button>
      </div>

      <div className="mt-4 -mx-5 pb-2">
        <div className="flex gap-1 px-6">
          {items.map((b) => (
            <div key={b.id} className="shrink-0 w-[112px]">
              <div className="relative h-[156px] w-[104px] rounded-[4px] bg-[#CDCCCB] grid place-items-center">
                <span className="text-body-03 text-[#0A0A0A]">img</span>
              </div>

              <div className="mt-3 text-subtitle-02-sb text-[#0A0A0A] truncate">
                {b.title}
              </div>
              <div className="mt-1 text-caption-02 text-[#9B9A97] truncate">
                {b.author}, {b.publisher}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== ✅ 북로그 카드(스샷처럼) ===== */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="rounded-[12px] bg-[#EFEDEB] px-[20px] py-[14px]">
      {/* 상단 이미지 3칸 */}
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

      {/* 본문 미리보기 */}
      <p className="mt-4 line-clamp-2 text-caption-01 text-[#4D4D4C]">
        {post.excerpt}
      </p>

      {/* 태그 + 북마크 */}
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
function EmptyState({
  title,
  desc,
}: {
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="text-title-02 text-[#262626]">{title}</div>
      <div className="mt-3 text-body-03 text-[#81807F]">{desc}</div>
    </div>
  );
}

/* ===== 전체보기 화살표 ===== */
function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="#81807F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
