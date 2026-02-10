import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FilterBar from "../../components/booklog/FilterBar";
import NavbarBottom from "../../components/common/navbar/NavBarBottom";
import { Reset } from "../../assets/icons";
import { useFilter } from "../../hooks/useFilter";
import PostCard from "../../components/booklog/PostCard";

import { getBooklogsFeed } from "../../api/booklog/booklogFeed";
import type { BooklogFeedItem } from "../../types/booklog/feed.types";

import { LoadingPage } from "../onboarding/LoadingPage";
import { ErrorPage } from "../onboarding/ErrorPage";
import { useToast } from "../../context/ToastContext";

export default function BooklogPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const { filter, resetFilter } = useFilter("booklog");

  const [items, setItems] = useState<BooklogFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  /** -----------------------------
   * BookWritePage → navigate state toast 처리
   * ----------------------------- */
  useEffect(() => {
    const toast = (location.state as { toast?: string } | null)?.toast;
    if (!toast) return;

    showToast(toast);

    // 뒤로가기 / 새로고침 시 토스트 재노출 방지
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate, showToast]);

  const filterKey = useMemo(() => JSON.stringify(filter), [filter]);

  /** -----------------------------
   * 피드 조회
   * ----------------------------- */
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // main 기준 API 시그니처
        const data = await getBooklogsFeed(0, 20);

        if (alive) {
          setItems(data.items ?? []);
        }
      } catch (e) {
        console.error("북로그 피드 조회 실패:", e);
        if (alive) {
          setItems([]);
          setIsError(true);
        }
      } finally {
        if (alive) setIsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [filterKey]);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

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
          {items.map((item) => (
            <PostCard key={item.postId} item={item} />
          ))}
        </main>

        <div className="h-10" />
      </div>

      <NavbarBottom />
    </div>
  );
}