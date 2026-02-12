import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import FilterBar from "../../components/booklog/FilterBar";
import NavbarBottom from "../../components/common/navbar/NavBarBottom";
import { Reset } from "../../assets/icons";
import { useFilter } from "../../hooks/useFilter";
import PostCard from "../../components/booklog/PostCard";

import { getBooklogsFeed } from "../../api/booklog/booklogFeed";
import type { BooklogFeedItem } from "../../types/booklog/feed.types";

import { LoadingPage } from "../onboarding/LoadingPage";
import { ErrorPage } from "../onboarding/ErrorPage";

export default function BooklogPage() {
  const navigate = useNavigate();
  const { filter, resetFilter } = useFilter("booklog");

  const filterKey = useMemo(() => JSON.stringify(filter), [filter]);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booklogsFeed", filterKey],
    queryFn: () => getBooklogsFeed(0, 20),
    placeholderData: (prev) => prev
  });

  if (isLoading && !data) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const items: BooklogFeedItem[] = data?.items ?? [];

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
