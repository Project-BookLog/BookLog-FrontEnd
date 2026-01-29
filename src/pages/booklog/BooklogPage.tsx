import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookTag from "../../components/booklog/BookTag";
import FilterBar from "../../components/booklog/FilterBar";
import NavbarBottom from "../../components/common/navbar/NavBarBottom";
import { Bookmark, Reset } from "../../assets/icons"; 
import { useFilter } from "../../hooks/useFilter";

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded bg-[#E9EBF4] px-2 py-1 text-caption-02 font-medium text-[#3049C0]">
      {children}
    </span>
  );
}

function BooklogContentImage({
  isBook = false,
  label = "img",
  bookTitle,
  bookAuthor,
}: {
  isBook?: boolean;
  label?: string;
  bookTitle?: string;
  bookAuthor?: string;
}) {
  return (
    <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-[8px] bg-[#CDCCCB]">
      <div className="absolute inset-0 grid place-items-center text-caption-01 text-[#4B4B4B]">
        {isBook ? "책 img" : label}
      </div>

      {isBook && (
        <div className="absolute left-[10px] bottom-[10px]">
          <BookTag
            title={bookTitle ?? "책 제목"}
            author={bookAuthor ?? "저자명 저"}
          />
        </div>
      )}
    </div>
  );
}

type Post = {
  id: string;
  username: string;
  timeAgo: string;
  views: number;
  bookmarkCount: number;
  body: string;
  tags: string[];
  bookTitle: string;
  bookAuthor: string;
  imageCount?: number;
};

function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);

  const goDetail = () => {
    navigate(`/booklog/${post.id}`, { state: { post } });
  };

  const extraImages = Array.from({ length: Math.max(1, post.imageCount ?? 1) });

  return (
    <article
      className="w-full cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={goDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter") goDetail();
      }}
    >
      {/* 상단 정보 */}
      <div className="flex items-start justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="grid h-[35px] w-[35px] place-items-center rounded-full bg-[#CDCCCB] text-caption-02 text-[#4B4B4B]">
            이미지
          </div>

          <div className="min-w-0">
            <div className="text-body-01-sb text-[#0A0A0A]">{post.username}</div>
            <div className="mt-0.5 text-caption-02 text-[#81807F]">
              {post.timeAgo} · 조회 {post.views}
            </div>
          </div>
        </div>

        {/* ✅ 북마크 */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setBookmarked((v) => !v);
          }}
          className="flex items-center gap-1 pt-1"
          aria-label="북마크"
        >
          <Bookmark
            className="h-5 w-5"
            style={{
              color: bookmarked ? "#3049C0" : "#9B9A97",
              fill: bookmarked ? "currentColor" : "none",
              stroke: bookmarked ? "#3049C0" : "#9B9A97",
            }}
          />

          <span className="text-caption-01 text-[#9B9A97]">
            {post.bookmarkCount + (bookmarked ? 1 : 0)}
          </span>
        </button>
      </div>

      {/* 이미지 영역 */}
      <div className="mt-4">
        <div className="flex gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="pl-[45px]">
            <BooklogContentImage
              isBook
              bookTitle={post.bookTitle}
              bookAuthor={post.bookAuthor}
            />
          </div>

          {extraImages.map((_, idx) => (
            <BooklogContentImage key={idx} label="img" />
          ))}

          <div className="w-4 shrink-0" />
        </div>
      </div>

      {/* 본문 */}
      <div className="px-4 pl-[60px]">
        <p className="mt-3 line-clamp-2 text-caption-01 text-[#4D4D4C]">
          {post.body}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-5 h-[1px] w-full bg-[#E7E5E4]" />
    </article>
  );
}

/* =============================
 * 페이지
 * ============================= */
export default function BooklogPage() {
  const navigate = useNavigate();
  const { resetFilter } = useFilter("booklog");

  const [posts, setPosts] = useState<Post[]>([]);

  const mockPosts = useMemo<Post[]>(
    () => [
      {
        id: "1",
        username: "User Name",
        timeAgo: "3분 전",
        views: 27,
        bookmarkCount: 20,
        body: "이 책은 어쩌구 다른 유저의 북로그 내용 ...",
        tags: ["잔잔한, 따뜻한", "사유적", "생각이 필요한"],
        bookTitle: "책 제목",
        bookAuthor: "저자명 저",
        imageCount: 1,
      },
      {
        id: "2",
        username: "User Name",
        timeAgo: "3분 전",
        views: 27,
        bookmarkCount: 20,
        body: "이 책은 어쩌구 다른 유저의 북로그 내용 …",
        tags: ["잔잔한, 따뜻한", "사유적", "생각이 필요한"],
        bookTitle: "책 제목",
        bookAuthor: "저자명 저",
        imageCount: 3,
      },
    ],
    []
  );

  useEffect(() => {
    setPosts(mockPosts);
  }, [mockPosts]);

  return (
    <div className="min-h-screen bg-bg pb-24">
      <div className="mx-auto w-full max-w-[420px]">
        <header className="px-4 pt-8">
          <h1 className="text-en-head text-[#0A0A0A]">북로그</h1>
        </header>

        <div className="mt-4">
          <FilterBar
            scope="booklog"
            ResetIcon={Reset}
            onReset={resetFilter}
            onClickMood={() =>
              navigate("/booklog/filter", { state: { from: "/booklog" } })
            }
            onClickStyle={() =>
              navigate("/booklog/filter", { state: { from: "/booklog" } })
            }
            onClickImmersion={() =>
              navigate("/booklog/filter", { state: { from: "/booklog" } })
            }
          />
        </div>

        <main className="mt-6">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </main>

        <div className="h-10" />
      </div>

      <NavbarBottom />
    </div>
  );
}
