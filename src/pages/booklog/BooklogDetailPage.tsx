// src/pages/booklog/BooklogDetailPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/common/navbar/NavBarTop";
import BookContent from "../../components/booklog/BookContent";
import { Bookmark, Kebab, Default_ProfileImg, Default_BookImg } from "../../assets/icons";
import {
  LibraryActionDropDown,
  type LibraryAction,
} from "../../components/common/dropdown/LibraryActionDropDown";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import { deleteBooklog, getBooklogDetail } from "../../api/booklogs";
import type { BooklogDetailResponse } from "../../types/booklogDetail.types";

import { getBooklogRecommendBooks } from "../../api/booklogRecommend";
import type { RecommendBook } from "../../types/booklogRecommend.types";

import { getBooklogRecommendPosts } from "../../api/booklogRecommendPosts";
import type { RecommendPost } from "../../types/booklogRecommendPosts.types";

import { useToggleBooklogBookmark } from "../../hooks/mutations/useToggleBooklogBookmark";
import { ConfirmModal } from "../../components/common/ConfirmModal";

import { LoadingPage } from "../onboarding/LoadingPage";

/** ---------- utils ---------- */
function timeAgo(iso: string) {
  const t = new Date(iso).getTime();

  // ❌ 날짜 파싱 실패
  if (isNaN(t)) return "알 수 없음";

  const now = Date.now();

  // ❌ 미래 시간 → 방금 전으로 처리 (diff 음수 방지)
  const diff = Math.max(0, now - t);

  const min = Math.floor(diff / 60000);
  if (min < 1) return "방금 전";
  if (min < 60) return `${min}분 전`;

  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}시간 전`;

  const day = Math.floor(hour / 24);
  return `${day}일 전`;
}

type Post = {
  id: string; // postId
  authorId: string; // userId
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
  profileImageUrl?: string;
  followedByMe?: boolean;
  images?: { imageId: number; imageUrl: string; order: number }[];
  bookmarkedByMe?: boolean;
  thumbnailUrl?: string;
};

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
  const { userId } = useAuth();
  const { showToast } = useToast();

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isToggling, setIsToggling] = useState(false);
  const [isActionDropDownOpen, setIsActionDropDownOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutateAsync: toggleBooklogBookmark } = useToggleBooklogBookmark();

  // ✅ API로 받아온 원본 데이터
  const [detail, setDetail] = useState<BooklogDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ 추천 도서 목록(API)
  const [recommendBooks, setRecommendBooks] = useState<RecommendBook[]>([]);

  // ✅ 추천 인기글 목록(API)
  const [recommendPosts, setRecommendPosts] = useState<RecommendPost[]>([]);

  // ✅ 기존 UI가 기대하는 Post 형태로 매핑해서 그대로 쓰기
  const post: Post | null = useMemo(() => {
    if (!detail) return null;

    // ✅ BooklogAuthor의 userId를 신뢰 (detail만 nullable)
    const authorId = String(detail?.author.userId ?? "0");

    return {
      id: String(detail.postId),
      authorId,
      username: detail.author.nickname ?? "-",
      email: detail.author.email ?? "-",
      timeAgo: timeAgo(detail.createdAt),
      views: Number(detail.viewCount ?? 0),
      bookmarkCount: Number(detail.bookmarkCount ?? 0),
      body: detail.content ?? "-",
      tags: (detail.tags ?? []).map((t) => t.name),
      bookTitle: detail.book.title ?? "-",
      bookAuthor: detail.book.authorName ?? "-",
      publisher: detail.book.publisher ?? "-",
      profileImageUrl: detail.author.profileImageUrl,
      followedByMe: detail.author.followedByMe,
      images: (detail.images ?? []).map((img) => ({
        imageId: Number(img.imageId),
        imageUrl: img.imageUrl,
        order: Number(img.order),
      })),
      bookmarkedByMe: detail.bookmarkedByMe,
      thumbnailUrl: detail.book.coverImageUrl,
    };
  }, [detail]);

  const isMyPost = !!detail && typeof userId === "number" && detail.author.userId === userId;

  const actions: LibraryAction[] = [
    {
      label: "수정하기",
      onClick: () => {
        if (!detail) return;
        navigate("/booklog/write", {
          state: {
            mode: "edit",
            postId: detail.postId,
            book: {
              bookId: detail.book.bookId,
              title: detail.book.title,
              thumbnailUrl: detail.book.coverImageUrl,
              publisherName: detail.book.publisher,
              authors: [detail.book.authorName],
            },
            content: detail.content,
            tags: detail.tags,
            imageUrls: (detail.images ?? []).map((img) => img.imageUrl),
          },
        });
      },
    },
    {
      label: "삭제하기",
      onClick: () => {
        setIsActionDropDownOpen(false);
        setIsDeleteConfirmOpen(true);
      },
    },
  ];

  const handleDelete = async () => {
    if (!detail || isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteBooklog(detail.postId);
      showToast("삭제가 완료되었어요.");
      navigate("/mypage/my-booklog", { replace: true });
    } catch (e) {
      console.error(e);
      showToast("삭제에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsDeleting(false);
      setIsDeleteConfirmOpen(false);
    }
  };

  const sortedImages = useMemo(() => {
    const imgs = post?.images ?? [];
    return [...imgs].sort((a, b) => a.order - b.order);
  }, [post]);

  useEffect(() => {
    if (!postId) return;

    let alive = true;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // ✅ 1) 상세 조회
        const data = await getBooklogDetail(Number(postId));
        if (!alive) return;
        setDetail(data);

        // ✅ 상세 응답 기반으로 북마크 상태/카운트 동기화
        setBookmarked(!!data.bookmarkedByMe);
        setBookmarkCount(Number(data.bookmarkCount ?? 0));

        // ✅ 2) 추천 도서 조회
        try {
          const recBooks = await getBooklogRecommendBooks(Number(postId));
          if (!alive) return;
          setRecommendBooks(recBooks);
        } catch (e) {
          console.error("추천 도서 조회 실패", e);
          if (!alive) return;
          setRecommendBooks([]);
        }

        // ✅ 3) 추천 인기글 조회
        try {
          const recPosts = await getBooklogRecommendPosts(Number(postId));
          if (!alive) return;
          setRecommendPosts(recPosts);
        } catch (e) {
          console.error("추천 인기글 조회 실패", e);
          if (!alive) return;
          setRecommendPosts([]);
        }
      } catch (e) {
        console.error("북로그 상세 조회 실패", e);
      } finally {
        // ✅ finally에서 return 금지: mounted일 때만 setLoading(false)
        if (alive) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      alive = false;
    };
  }, [postId]);

  const similarBooks = useMemo(
    () =>
      (recommendBooks ?? []).map((b) => ({
        id: String(b.bookId),
        title: b.title,
        author: `${b.authorName} 저`,
        publisher: b.publisher,
        tags: (b.tags ?? []).map((t) => t.name),
        coverImageUrl: b.coverImageUrl,
      })),
    [recommendBooks]
  );

  const profileUserId = post?.authorId ?? "0";

  if (loading) return <LoadingPage />;

  if (!post) {
    return (
      <div className="min-h-screen bg-bg">
        <div className="mx-auto w-full max-w-[420px] bg-bg">
          <NavBar title="책 정보" onBack={() => navigate(-1)} />
          <div className="p-4 text-caption-01 text-gray-600">데이터가 없어요.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="relative mx-auto w-full max-w-[420px] bg-bg">
        <ConfirmModal
          isOpen={isDeleteConfirmOpen}
          title="게시물을 삭제할까요?"
          description="삭제한 내용은 복구할 수 없어요."
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleDelete}
          onClose={() => setIsDeleteConfirmOpen(false)}
        />
        {isMyPost && isActionDropDownOpen && (
          <div
            className="absolute inset-0 z-40 bg-b-op15 backdrop-blur-[2px]"
            onClick={() => setIsActionDropDownOpen(false)}
          />
        )}

        {/* 상단 네비 */}
        <div className="relative">
          <NavBar
            title="책 정보"
            onBack={() => navigate(-1)}
            rightSlot={
              isMyPost ? (
                <button
                  type="button"
                  className="grid h-7 w-7 place-items-center"
                  aria-label="더보기"
                  onClick={() => setIsActionDropDownOpen((prev) => !prev)}
                >
                  <Kebab className="h-6 w-6 text-[#1F1F1F]" />
                </button>
              ) : null
            }
          />

          {isMyPost && isActionDropDownOpen && (
            <LibraryActionDropDown
              actions={actions}
              onClose={() => setIsActionDropDownOpen(false)}
            />
          )}
        </div>

        {/* 유저 영역 */}
        <section className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(`/users/${profileUserId}`)}
              className="flex items-center gap-3 min-w-0 text-left"
              aria-label="유저 프로필로 이동"
            >
              {post.profileImageUrl ? (
                <img
                  src={post.profileImageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover bg-[#D9D9D9]"
                />
              ) : (
                <Default_ProfileImg className="h-10 w-10 rounded-full" />
              )}

              <div className="min-w-0">
                <div className="text-body-01-sb text-[#1F1F1F] truncate">
                  {post.username ?? "-"}
                </div>
                <div className="text-en-caption-02 text-[#8A8A8A] truncate">
                  {post.email ?? "-"}
                </div>
              </div>
            </button>

            <button
              type="button"
              className="h-[27px] rounded-[6px] bg-gray-200 px-3 text-en-caption-01 font-medium text-[#4D4D4C]"
              onClick={(e) => e.stopPropagation()}
            >
              {post.followedByMe ? "팔로잉" : "팔로우"}
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
                thumbnailUrl={post.thumbnailUrl}
              />
            </div>

            {sortedImages.length > 0 &&
              sortedImages.map((img) => (
                <img
                  key={img.imageId}
                  src={img.imageUrl}
                  alt=""
                  className="shrink-0 h-[220px] w-[240px] rounded-[12px] object-cover bg-[#6F6F6F]"
                />
              ))}
          </div>

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

          <p className="mt-3 text-body-03 leading-relaxed text-black">{post.body}</p>

          <div className="mt-4 flex items-center justify-between text-caption-01 text-gray-600">
            <div>
              {post.timeAgo} · 조회 {post.views}
            </div>

            <button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                if (!postId) return;
                if (isToggling) return;

                try {
                  setIsToggling(true);
                  const data = await toggleBooklogBookmark({ postId: Number(postId) });
                  setBookmarked(data.bookmarkedByMe);
                  setBookmarkCount(data.bookmarkCount);

                  setDetail((prev) =>
                    prev
                      ? {
                          ...prev,
                          bookmarkedByMe: data.bookmarkedByMe,
                          bookmarkCount: data.bookmarkCount,
                        }
                      : prev
                  );
                } catch (err) {
                  console.error("북로그 북마크 토글 실패:", err);
                } finally {
                  setIsToggling(false);
                }
              }}
              className="flex items-center gap-1"
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

              <span className="text-caption-01 text-gray-500">{bookmarkCount}</span>
            </button>
          </div>
        </section>

        <div className="mt-8 h-[8px] bg-gray-100" />

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
                    thumbnailUrl={b.coverImageUrl}
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

          {/* ✅ 구분선 있는 리스트 (UI 그대로) */}
          <div className="mt-2">
            {(recommendPosts ?? []).slice(0, 3).map((rp, idx, arr) => (
              <div key={String(rp.postId)}>
                <div
                  className="flex items-center justify-between gap-4 py-5"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/booklog/${rp.postId}`)}
                  onKeyDown={(e) => {
                    // ✅ Enter + Space 모두 지원 (Space는 스크롤 방지)
                    if (e.key === "Enter") {
                      navigate(`/booklog/${rp.postId}`);
                      return;
                    }
                    if (e.key === " " || e.code === "Space") {
                      e.preventDefault();
                      navigate(`/booklog/${rp.postId}`);
                    }
                  }}
                >
                  <div className="min-w-0">
                    <div className="text-body-01-sb text-[#000000]">
                      {rp.bookTitle}
                    </div>
                    <p className="mt-1 line-clamp-2 text-caption-02 text-[#4D4D4C]">
                      {rp.excerpt}
                    </p>
                    <div className="mt-2 text-en-caption-02 text-gray-600">
                      {timeAgo(rp.createdAt)} · 조회 {Number(rp.viewCount ?? 0)} · 저장{" "}
                      {Number(rp.bookmarkCount ?? 0)}
                    </div>
                  </div>

                  {rp.thumbnailImageUrl ? (
                    <img
                      src={rp.thumbnailImageUrl}
                      alt=""
                      className="h-[80px] w-[80px] shrink-0 rounded-[12px] object-cover bg-[#D9D9D9]"
                    />
                  ) : (
                    <Default_BookImg className="h-[80px] w-[80px] shrink-0 rounded-[12px]" />
                  )}
                </div>

                {/* ✅ 아이템 사이 구분선 (마지막은 제외) */}
                {idx !== arr.length - 1 && idx !== 2 && (
                  <div className="h-[1px] w-full bg-gray-200" />
                )}
              </div>
            ))}

            {/* 데이터가 없을 때도 UI 깨지지 않게 (문구는 최소) */}
            {recommendPosts.length === 0 && (
              <div className="py-6 text-caption-02 text-[#676665]">
                추천 인기글이 없어요.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
