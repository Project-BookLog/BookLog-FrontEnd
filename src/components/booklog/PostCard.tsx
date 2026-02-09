import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Bookmark } from "../../assets/icons";
import BookTag from "./BookTag";

import type { BooklogFeedItem } from "../../types/booklog/feed.types";
import { useToggleBooklogBookmark } from "../../hooks/mutations/useToggleBooklogBookmark";

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded bg-[#E9EBF4] px-2 py-1 text-caption-02 font-medium text-[#3049C0]">
      {children}
    </span>
  );
}

function PostCard({ item }: { item: BooklogFeedItem }) {
  const navigate = useNavigate();
  const { mutateAsync: toggleBooklogBookmark } = useToggleBooklogBookmark();

  const [bookmarked, setBookmarked] = useState(item.bookmarkedByMe);
  const [bookmarkCount, setBookmarkCount] = useState(item.bookmarkCount);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setBookmarked(item.bookmarkedByMe);
    setBookmarkCount(item.bookmarkCount);
  }, [item.postId, item.bookmarkedByMe, item.bookmarkCount]);

  const username = item.author?.nickname ?? "User";
  const timeAgo = item.createdAt;
  const views = item.viewCount ?? 0;

  const tags = useMemo(() => (item.tags ?? []).map((t) => t.name), [item.tags]);

  return (
    <article
      className="w-full cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/booklog/${item.postId}`, { state: { item } })}
      onKeyDown={(e) => {
        if (e.key === "Enter")
          navigate(`/booklog/${item.postId}`, { state: { item } });
      }}
    >
      {/* 상단 */}
      <div className="flex items-start justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="grid h-[35px] w-[35px] place-items-center rounded-full bg-[#CDCCCB] text-caption-02 text-[#4B4B4B]">
            이미지
          </div>

          <div>
            <div className="text-body-01-sb">{username}</div>
            <div className="text-caption-02 text-[#81807F]">
              {timeAgo.split("T")[0]} · 조회 {views}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={async (e) => {
            e.stopPropagation();
            if (isToggling) return;

            try {
              setIsToggling(true);

              const data = await toggleBooklogBookmark({
                postId: item.postId,
              });

              setBookmarked(Boolean(data.bookmarkedByMe));
              setBookmarkCount(Number(data.bookmarkCount) || 0);
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
          <span className="text-caption-01 text-[#9B9A97]">
            {bookmarkCount}
          </span>
        </button>
      </div>

      {/* 이미지 */}
      <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar px-4">
        {/* 책 표지 */}
        <div className="pl-[45px] shrink-0 relative">
          <div className="relative h-[140px] w-[140px] overflow-hidden rounded-[8px] bg-[#CDCCCB]">
            {item.book?.coverImageUrl ? (
              <img
                src={item.book.coverImageUrl}
                alt={item.book?.title ?? "책 표지 이미지"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-caption-01 text-[#4B4B4B]">
                책 표지 정보가 없습니다. 
              </div>
            )}
          </div>

            <div className="absolute left-[8px] bottom-[8px] translate-x-12 z-20 overflow-visible">
              <BookTag
                title={item.book?.title ?? "-"}
                author={item.book?.authorName ?? "-"}
              />
            </div>

          </div>

        {/* 북로그 이미지들 */}
        {(item.images ?? [])
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((img) => (
            <div
              key={img.imageId}
              className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-[8px] bg-[#CDCCCB]"
            >
              {img.imageUrl && img.imageUrl !== "string" && (
                <img
                  src={img.imageUrl}
                  alt="booklog img"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}

            </div>
          ))}
      </div>

      {/* 본문 */}
      <div className="px-4 pl-[60px]">
        <p className="mt-3 line-clamp-2 text-caption-01 text-[#4D4D4C]">
          {item.excerpt ?? ""}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-5 h-px bg-[#E7E5E4]" />
    </article>
  );
}

export default PostCard;
