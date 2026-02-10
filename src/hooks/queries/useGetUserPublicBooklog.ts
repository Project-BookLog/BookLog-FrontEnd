import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getUserPublicBooklog } from "../../api/mypage/myBooklog";

export function useGetUserPublicBooklog(userId?: number) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.booklogs, "user", userId, "PUBLIC"],
    queryFn: ({ pageParam }) =>
      getUserPublicBooklog(userId as number, { page: pageParam, size: 20 }),
    initialPageParam: 0,
    enabled: typeof userId === "number" && Number.isFinite(userId),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data?.hasNext ? allPages.length : undefined;
    },
  });
}
