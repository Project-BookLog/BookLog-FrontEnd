// src/pages/booklog/BooklogPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookTag from "../../components/booklog/BookTag";
import FilterBar from "../../components/booklog/FilterBar";
import NavbarBottom from "../../components/common/navbar/NavBarBottom";
import { Bookmark, Reset } from "../../assets/icons";
import { useFilter } from "../../hooks/useFilter";

import { getBooklogsFeed } from "../../api/booklogFeed";

/** =========================
 *  ✅ 최소 응답 타입 (any 제거)
 *  ========================= */
type ItemUser = {
  nickname?: string;
  name?: string;
};

type Item = {
  id?: string | number;
  postId?: string | number;
  booklogId?: string | number;

  username?: string;
  userName?: string;
  user?: ItemUser;

  body?: string;
  content?: string;
  text?: string;

  tags?: unknown[] | string;
  tagList?: unknown[] | string;
  moods?: unknown[] | string;

  bookTitle?: string;
  bookAuthor?: string;
  book?: { title?: string; author?: string };
  book_name?: string;
  author?: string;

  views?: number | string;
  viewCount?: number | string;

  bookmarkCount?: number | string;
  scrapCount?: number | string;
  likeCount?: number | string;

  imageUrls?: unknown[];
  images?: unknown[];
  imageCount?: number;

  timeAgo?: string;
  createdAgo?: string;
  createdAt?: string;
};

type FeedResponse = { items: Item[] };
type FeedReturn = Item[] | FeedResponse;

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
            <div className="text-body-01-sb text-black">{post.username}</div>
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

  // ✅ mockPosts는 "응답 형식이 깨졌을 때만" fallback
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
    let alive = true;

    (async () => {
      try {
        // ✅ getBooklogsFeed가 타입을 제공하지 않으면 여기서 캐스팅
        const data = (await getBooklogsFeed()) as FeedReturn;

        // ✅ 응답 형식이 "유효한 피드"인지 판단
        const isValidFeed = Array.isArray(data) || Array.isArray((data as FeedResponse)?.items);

        // ✅ 응답이 { items: [...] } 이든, [...] 이든 둘 다 대응
        const list: Item[] = Array.isArray(data)
          ? data
          : Array.isArray((data as FeedResponse)?.items)
          ? (data as FeedResponse).items
          : [];

        // ✅ 디버깅용 로그 (UI 영향 없음)
        console.log("feed raw data:", data);
        console.log("feed list length:", list.length);
        console.log("isValidFeed:", isValidFeed);

        const mapped: Post[] = list.map((it: Item) => {
          const username =
            it.username ??
            it.userName ??
            it.user?.nickname ??
            it.user?.name ??
            "User Name";

          const body = it.body ?? it.content ?? it.text ?? "";

          const tagsRaw = it.tags ?? it.tagList ?? it.moods ?? [];
          const tags: string[] = Array.isArray(tagsRaw)
            ? tagsRaw.map((t) => String(t))
            : typeof tagsRaw === "string"
            ? tagsRaw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [];

          const bookTitle =
            it.bookTitle ?? it.book?.title ?? it.book_name ?? "책 제목";

          const bookAuthor =
            it.bookAuthor ?? it.book?.author ?? it.author ?? "저자명 저";

          const views = Number(it.views ?? it.viewCount ?? 0) || 0;

          const bookmarkCount =
            Number(it.bookmarkCount ?? it.scrapCount ?? it.likeCount ?? 0) || 0;

          const imageCount =
            (Array.isArray(it.imageUrls) && it.imageUrls.length) ||
            (Array.isArray(it.images) && it.images.length) ||
            it.imageCount ||
            1;

          const timeAgo = it.timeAgo ?? it.createdAgo ?? it.createdAt ?? "방금 전";

          return {
            id: String(it.id ?? it.postId ?? it.booklogId ?? crypto.randomUUID()),
            username,
            timeAgo,
            views,
            bookmarkCount,
            body,
            tags,
            bookTitle,
            bookAuthor,
            imageCount,
          };
        });

        // ✅ 핵심: 빈 배열이지만 유효한 응답이면 그대로 빈 배열 렌더링
        // ✅ mockPosts는 응답 형식이 깨졌을 때만 fallback
        if (alive) setPosts(isValidFeed ? mapped : mockPosts);
      } catch (e) {
        console.error("북로그 피드 조회 실패:", e);
        if (alive) setPosts(mockPosts);
      }
    })();

    return () => {
      alive = false;
    };
  }, [mockPosts]);

  return (
    <div className="min-h-screen bg-bg pb-24">
      <div className="mx-auto w-full max-w-[420px]">
        <header className="px-4 pt-8">
          <h1 className="text-en-head text-black">북로그</h1>
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
