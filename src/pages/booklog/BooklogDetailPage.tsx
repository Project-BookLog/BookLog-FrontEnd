import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/common/navbar/NavBarTop";
import BookContent from "../../components/booklog/BookContent";
import BookmarkImg from "../../assets/icons/Bookmark.svg";
import BookmarkcImg from "../../assets/icons/Bookmarkc.svg";

type Post = {
  id: string;
  username: string;
  email?: string;
  timeAgo: string;
  views: number;
  bookmarkCount: number;
  body: string;
  tags: string[];
  bookTitle: string;
  bookAuthor: string;
  publisher?: string;
};

function MoreIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="currentColor" />
      <path d="M12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="currentColor" />
      <path d="M12 15.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="currentColor" />
    </svg>
  );
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[4px] bg-[#E4E5F0] px-[8px] py-[3px] text-caption-02 font-medium text-[#3049C0] whitespace-nowrap">
      {children}
    </span>
  );
}

export default function BooklogDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();

  const [bookmarked, setBookmarked] = useState(false);

  const statePost = (location.state as { post?: Post } | null)?.post;

  const fallbackPosts = useMemo<Post[]>(
    () => [
      {
        id: "1",
        username: "User Name",
        email: "ididididid@gmail.com",
        timeAgo: "3분 전",
        views: 27,
        bookmarkCount: 20,
        body:
          "유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글…",
        tags: ["잔잔한, 따뜻한", "사유적", "생각이 필요한"],
        bookTitle: "소년이 온다",
        bookAuthor: "한강 저",
        publisher: "출판사",
      },
      {
        id: "2",
        username: "User Name",
        email: "ididididid@gmail.com",
        timeAgo: "3분 전",
        views: 27,
        bookmarkCount: 20,
        body: "유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글…",
        tags: ["잔잔한, 따뜻한", "사유적", "생각이 필요한"],
        bookTitle: "책 제목",
        bookAuthor: "저자명 저",
        publisher: "출판사",
      },
    ],
    []
  );

  const post =
    statePost ?? fallbackPosts.find((p) => p.id === postId) ?? fallbackPosts[0];

  const similarBooks = useMemo(
    () => [
      {
        id: "s1",
        title: "소년이 온다",
        author: "한강 저",
        publisher: "출판사",
        tags: ["잔잔한", "사유적", "생각이 필요한"],
      },
      {
        id: "s2",
        title: "책 제목",
        author: "저자명 저",
        publisher: "출판사",
        tags: ["잔잔한", "사유적", "생각이 필요한"],
      },
      {
        id: "s3",
        title: "책 제목",
        author: "저자명 저",
        publisher: "출판사",
        tags: ["잔잔한", "사유적", "생각이 필요한"],
      },
      {
        id: "s4",
        title: "책 제목",
        author: "저자명 저",
        publisher: "출판사",
        tags: ["잔잔한", "사유적", "생각이 필요한"],
      },
    ],
    []
  );

  // 임시: 지금은 post.id를 userId처럼 사용
  const profileUserId = post.id;

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto w-full max-w-[420px] bg-bg">
        {/* 상단 네비 */}
        <NavBar
          title="책 정보"
          onBack={() => navigate("/booklog")}
          rightSlot={
            <button
              type="button"
              className="grid h-7 w-7 place-items-center"
              aria-label="더보기"
              onClick={() => {}}
            >
              <MoreIcon className="h-7 w-7 text-[#1F1F1F]" />
            </button>
          }
        />

        {/* 유저 영역 */}
        <section className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(`/users/${profileUserId}`)}
              className="flex items-center gap-3 min-w-0 text-left"
              aria-label="유저 프로필로 이동"
            >
              <div className="h-10 w-10 rounded-full bg-[#D9D9D9]" />
              <div className="min-w-0">
                <div className="text-body-01-sb text-[#1F1F1F] truncate">
                  {post.username}
                </div>
                <div className="text-en-caption-02 text-[#8A8A8A] truncate">
                  {post.email ?? "email@example.com"}
                </div>
              </div>
            </button>

            <button
              type="button"
              className="h-[27px] rounded-[6px] bg-[#E7E5E4] px-3 text-en-caption-01 font-medium text-[#4D4D4C]"
              onClick={(e) => e.stopPropagation()}
            >
              팔로우
            </button>
          </div>
        </section>

        {/* 책 카드 + 사진 카드 */}
        <section className="mt-6 px-5">
          <div
            className="
              flex gap-4
              overflow-x-auto
              pb-1
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <div className="shrink-0 h-[220px] w-[240px]">
              <BookContent
                title={post.bookTitle}
                author={post.bookAuthor}
                publisher={post.publisher}
              />
            </div>

            {/* 오른쪽: 사진 */}
            <div className="shrink-0 h-[220px] w-[240px] rounded-[12px] bg-[#6F6F6F] grid place-items-center text-caption-01 text-white/80">
              사진
            </div>
          </div>

          {/* ✅ 태그 줄 (스샷처럼 카드 아래) */}
          <div
            className="
              mt-2
              flex gap-1
              overflow-x-auto
              pb-1
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {post.tags.map((t) => (
              <TagPill key={t}>{t}</TagPill>
            ))}
          </div>

          {/* 본문 */}
          <p className="mt-3 text-body-03 leading-relaxed text-[#0A0A0A]">
            {post.body}
          </p>

          {/* 하단 메타 */}
          <div className="mt-4 flex items-center justify-between text-caption-01 text-[#81807F]">
            <div>
              {post.timeAgo} · 조회 {post.views}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setBookmarked((v) => !v);
              }}
              className="flex items-center gap-1"
              aria-label="북마크"
            >
              <img
                src={bookmarked ? BookmarkcImg : BookmarkImg}
                alt=""
                className="h-5 w-5"
                draggable={false}
              />
              <span className="text-caption-01 text-[#9B9A97]">
                {post.bookmarkCount + (bookmarked ? 1 : 0)}
              </span>
            </button>
          </div>
        </section>

        {/* 구분선 (스샷의 두꺼운 영역) */}
        <div className="mt-8 h-[8px] bg-[#EFEDEB]" />

        {/* Orbital과 비슷한 도서 */}
        <section className="px-5 pt-5">
          <h2 className="text-en-title-02 text-[#000000]">Orbital과 비슷한 도서</h2>
          <p className="mt-1 text-en-body-02 text-[#676665]">
            게시글에 언급된 도서와 비슷한 도서예요.
          </p>

          <div className="mt-4 -mx-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3 px-4">
              {similarBooks.map((b) => (
                <div key={b.id} className="shrink-0">
                  <BookContent
                    title={b.title}
                    author={b.author}
                    publisher={b.publisher}
                    tags={b.tags}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 비슷한 주제의 인기글 */}
<section className="px-5 pt-8 pb-10">
  <h2 className="text-en-title-02 text-[#000000]">비슷한 주제의 인기글</h2>
  <p className="mt-1 text-en-body-02 text-[#676665]">
    게시글과 비슷한 내용의 게시글을 모아봤어요
  </p>

  {/* ✅ 구분선 있는 리스트 */}
  <div className="mt-2">
    {[1, 2, 3].map((i) => (
      <div key={i}>
        <div className="flex items-center justify-between gap-4 py-5">
          <div className="min-w-0">
            <div className="text-body-01-sb text-[#000000]">책 제목</div>
            <p className="mt-1 line-clamp-2 text-caption-02 text-[#4D4D4C]">
              유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을 유저가작성한글을…
            </p>
            <div className="mt-2 text-en-caption-02 text-[#81807F]">
              1일 전 · 조회 65 · 저장 14
            </div>
          </div>
          <div className="h-[80px] w-[80px] shrink-0 rounded-[12px] bg-[#D9D9D9]" />
        </div>

        {/* ✅ 아이템 사이 구분선 (마지막은 제외) */}
        {i !== 3 && <div className="h-[1px] w-full bg-[#E7E5E4]" />}
      </div>
    ))}
  </div>
</section>

      </div>
    </div>
  );
}
