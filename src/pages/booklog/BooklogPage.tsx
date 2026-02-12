import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import FilterBar from "../../components/booklog/FilterBar";
import NavbarBottom from "../../components/common/navbar/NavBarBottom";
import { Reset } from "../../assets/icons";
import { useFilter } from "../../hooks/useFilter";
import PostCard from "../../components/booklog/PostCard";

import { getBooklogsFeed } from "../../api/booklog/booklogFeed";

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


  const filteredItems = useMemo(() => {
    const sourceItems = data?.items ?? [];

    const noFilter =
      filter.mood.length === 0 &&
      filter.style.length === 0 &&
      filter.immersion.length === 0;

    if (noFilter) return sourceItems;

    return sourceItems.filter((item) => {
      const moodTags =
        item.tags?.filter((t) => t.category === "MOOD").map((t) => t.name) ?? [];

      const styleTags =
        item.tags?.filter((t) => t.category === "STYLE").map((t) => t.name) ?? [];

      const immersionTags =
        item.tags?.filter((t) => t.category === "IMMERSION").map((t) => t.name) ?? [];

      const moodMatch =
        filter.mood.length > 0 &&
        filter.mood.some((m) => moodTags.includes(m));

      const styleMatch =
        filter.style.length > 0 &&
        filter.style.some((s) => styleTags.includes(s));

      const immersionMatch =
        filter.immersion.length > 0 &&
        filter.immersion.some((i) => immersionTags.includes(i));

      return moodMatch || styleMatch || immersionMatch;
    });
  }, [data?.items, filter]);



  if (isLoading && !data) return <LoadingPage />;
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
              navigate("/booklog/filter", {
                state: {
                  returnUrl: "/booklog",
                  preserveQuery: []
                }
              })
            }
            onClickStyle={() =>
              navigate("/booklog/filter", {
                state: {
                  returnUrl: "/booklog",
                  preserveQuery: []
                }
              })}
            onClickImmersion={() =>
              navigate("/booklog/filter", {
                state: {
                  returnUrl: "/booklog",
                  preserveQuery: []
                }
              })}
          />
        </div>

        <main className="mt-6">
          {filteredItems.map((item) => (
            <PostCard key={item.postId} item={item} />
          ))}
        </main>

        <div className="h-10" />
      </div>

      <NavbarBottom />
    </div>
  );
}
