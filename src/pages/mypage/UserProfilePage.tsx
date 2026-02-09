// src/pages/mypage/UserProfilePage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import { Share, Bookmark, BackIcon } from "../../assets/icons";

import { getPublicUserShelvesPreview } from "../../api/publicUserShelves";
import type { PublicUserShelf } from "../../types/publicShelves.types";

import { getUserProfile } from "../../api/userProfile";
import type { UserProfileResponse } from "../../types/userProfile.types";

import { followUser, unfollowUser } from "../../api/follow";

type Tab = "library" | "blog";

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  coverUrl?: string;
  CoverIcon?: React.ComponentType<{ className?: string }>;
};

type ShelfSection = {
  id: string; // shelfId
  title: string; // shelf name
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
  const { userId } = useParams<{ userId: string }>();

  const [tab, setTab] = useState<Tab>("library");

  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [isFollowing, setIsFollowing] = useState(false);

  const followLockRef = useRef(false);
  const [followSubmitting, setFollowSubmitting] = useState(false);

  const [librarySections, setLibrarySections] = useState<ShelfSection[]>([]);
  const [shelvesLoading, setShelvesLoading] = useState(true);

  // =========================
  // 1) 프로필 fetch
  // =========================
  useEffect(() => {
    let alive = true;

    async function fetchProfile() {
      const numericUserId = Number(userId);

      if (!userId || !Number.isFinite(numericUserId)) {
        if (alive) {
          setProfile(null);
          setIsFollowing(false);
          setProfileLoading(false);
        }
        return;
      }

      try {
        setProfileLoading(true);
        const res = await getUserProfile(numericUserId);

        if (!alive) return;

        setProfile(res.data);
        setIsFollowing(res.data.isFollowing);
      } catch (e) {
        console.error(e);
        if (alive) {
          setProfile(null);
          setIsFollowing(false);
        }
      } finally {
        if (alive) setProfileLoading(false);
      }
    }

    fetchProfile();

    return () => {
      alive = false;
    };
  }, [userId]);

  // =========================
  // 2) 공개 서재 미리보기 fetch
  // =========================
  useEffect(() => {
    let alive = true;

    async function fetchPublicShelvesPreview() {
      const numericUserId = Number(userId);
      if (!userId || !Number.isFinite(numericUserId)) {
        if (alive) {
          setLibrarySections([]);
          setShelvesLoading(false);
        }
        return;
      }

      try {
        setShelvesLoading(true);

        const res = await getPublicUserShelvesPreview(numericUserId, 3);

        const shelves: PublicUserShelf[] = res.data.items ?? [];

        const mapped: ShelfSection[] = shelves.map((shelf) => ({
          id: String(shelf.shelfId),
          title: shelf.name,
          books: (shelf.previewBooks ?? []).map((b) => ({
            id: String(b.bookId),
            title: b.title,
            author: b.authorName,
            publisher: b.publisherName,
            coverUrl: b.thumbnailUrl,
          })),
        }));

        if (alive) setLibrarySections(mapped);
      } catch (e) {
        console.error(e);
        if (alive) setLibrarySections([]);
      } finally {
        if (alive) setShelvesLoading(false);
      }
    }

    fetchPublicShelvesPreview();

    return () => {
      alive = false;
    };
  }, [userId]);

  // =========================
  // 3) 팔로우/언팔로우 핸들러
  // =========================
  const handleFollowToggle = async () => {
    const numericUserId = Number(userId);
    if (!userId || !Number.isFinite(numericUserId)) return;
    if (!profile) return;

    if (followLockRef.current) return;
    followLockRef.current = true;

    const prevIsFollowing = isFollowing;
    const prevFollowerCount = profile.followerCount;

    // 낙관적 업데이트
    const nextIsFollowing = !prevIsFollowing;
    setIsFollowing(nextIsFollowing);
    setProfile((p) =>
      p
        ? {
            ...p,
            followerCount: Math.max(
              0,
              prevFollowerCount + (nextIsFollowing ? 1 : -1)
            ),
          }
        : p
    );

    try {
      setFollowSubmitting(true);

      const res = nextIsFollowing
        ? await followUser(numericUserId)
        : await unfollowUser(numericUserId);

      if (res?.data) {
        setIsFollowing(res.data.isFollowing);
        setProfile((p) =>
          p
            ? {
                ...p,
                followerCount: res.data.followerCount ?? p.followerCount,
                followingCount: res.data.followingCount ?? p.followingCount,
              }
            : p
        );
      }
    } catch (e) {
      console.error(e);

      // 실패 시 롤백
      setIsFollowing(prevIsFollowing);
      setProfile((p) =>
        p ? { ...p, followerCount: prevFollowerCount } : p
      );
    } finally {
      setFollowSubmitting(false);
      followLockRef.current = false;
    }
  };

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

  const hasBlog = blogPosts.length > 0;

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const nickname = profile?.nickname ?? "User name";
  const email = profile?.email ?? "UserIDcode@naver.com";

  const followerCount = profile?.followerCount ?? 0;
  const followingCount = profile?.followingCount ?? 0;

  const completedBookCount = profile?.completedBookCount ?? 0; // 독서 완독
  const bookmarkCount = profile?.bookmarkCount ?? 0; // 저장된 책/북마크
  const booklogCount = profile?.booklogCount ?? 0; // 작성한 북로그

  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop title="유저 프로필" onBack={handleBack} />

      {/* ✅ 상단 카드 */}
      <div className="bg-bg px-5 py-5">
        <div className="flex items-center gap-[10px]">
          {/* 프로필 이미지 */}
          <div className="grid h-[73px] w-[73px] place-items-center overflow-hidden rounded-full bg-[#CDCCCB]">
            {profile?.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt={`${nickname} profile`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-caption-01 text-black">img</span>
            )}
          </div>

          <div className="flex-1">
            <div className="text-title-02 text-[#000000]">
              {profileLoading ? "불러오는 중..." : nickname}
            </div>
            <div className="mt-1 text-caption-01 text-[#81807F]">
              {profileLoading ? "불러오는 중..." : email}
            </div>

            <div className="mt-2 flex items-center gap-3">
              <span className="text-caption-02 text-[#262626]">
                팔로워 <span className="text-[#262626]">{followerCount}</span>
              </span>
              <span className="h-[4px] w-[4px] rounded-full bg-[#E7E5E4]" />
              <span className="text-caption-02 text-[#262626]">
                팔로잉 <span className="text-[#262626]">{followingCount}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 통계 3칸 */}
        <div className="mt-5 grid grid-cols-3 text-center">
          <div className="px-3">
            <div className="text-caption-02 text-[#676665]">독서 완독</div>
            <div className="mt-2 text-title-02 text-black">
              {completedBookCount}
            </div>
          </div>

          <div className="px-6 border-x border-gray-100">
            <div className="text-caption-02 text-[#676665]">저장된 책</div>
            <div className="mt-2 text-title-02 text-black">{bookmarkCount}</div>
          </div>

          <div className="px-3">
            <div className="text-caption-02 text-[#676665]">작성한 북로그</div>
            <div className="mt-2 text-title-02 text-black">{booklogCount}</div>
          </div>
        </div>

        {/* 팔로우/공유 */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={handleFollowToggle}
            className={[
              "h-[45px] flex-1 rounded-[12px] text-subtitle-02-sb transition-colors",
              isFollowing
                ? "bg-[#E7E5E4] text-black"
                : "bg-[#3049C0] text-[#FFFFFF]",
            ].join(" ")}
            disabled={profileLoading || !profile || followSubmitting}
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

      <div className="h-[8px] bg-gray-100" />

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
            shelvesLoading ? (
              <div className="px-5">
                <EmptyState
                  title="서재를 불러오는 중이에요."
                  desc={
                    <>
                      잠시만 기다려 주세요.
                      <br />
                      곧 공개 서재를 보여드릴게요.
                    </>
                  }
                />
              </div>
            ) : librarySections.some((s) => s.books.length > 0) ? (
              <div className="flex flex-col gap-7">
                {librarySections.map((section) => (
                  <ShelfRow
                    key={section.id}
                    title={section.title}
                    onViewAll={() => {
                      if (!userId) return;
                      navigate(`/users/${userId}/library/${section.id}`, {
                        state: { shelfName: section.title, isPublic: true },
                      });
                    }}
                    items={section.books}
                  />
                ))}
              </div>
            ) : (
              <div className="px-5">
                <EmptyState
                  title="공개된 서재가 없어요."
                  desc={
                    <>
                      유저가 서재를 공개하면
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

/* ===== 서재 섹션 ===== */
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
  const GradationFrame =
    "w-[347px] shrink-0 self-stretch rounded-b-[6px] border-[1.2px] border-[rgba(255,255,255,0.7)] bg-[linear-gradient(153deg,rgba(48,73,192,0.28)_18%,rgba(120,138,222,0.28)_44.99%,rgba(120,138,222,0.31)_58.48%,rgba(48,73,192,0.35)_85.47%)] shadow-[0_6px_16px_rgba(48,73,192,0.15)] backdrop-blur-[2px]";

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
                <div
                  className="h-full w-full bg-center bg-cover"
                  role="img"
                  aria-label={book.title}
                  style={{ backgroundImage: `url(${book.coverUrl})` }}
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
          <span className={`${GradationFrame}`} />
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
    <div className="rounded-[12px] bg-gray-100 px-[20px] py-[14px]">
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
