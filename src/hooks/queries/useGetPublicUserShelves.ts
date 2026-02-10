import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getPublicUserShelves } from "../../api/publicUserShelves";

const PAGE_SIZE = 10;

export function useGetPublicUserShelves(userId?: number) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.shelves, "public", userId],
    queryFn: ({ pageParam }) =>
      getPublicUserShelves(userId as number, { page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 0,
    enabled: typeof userId === "number" && Number.isFinite(userId),
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = Number(lastPage.data?.totalCount ?? 0);
      const loadedCount = allPages.reduce(
        (acc, page) => acc + (page.data?.items?.length ?? 0),
        0
      );

      return loadedCount < totalCount ? allPages.length : undefined;
    },
  });
}
