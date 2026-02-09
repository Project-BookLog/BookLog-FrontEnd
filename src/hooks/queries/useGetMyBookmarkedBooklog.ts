import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyBookmarkedBooklog } from "../../api/mypage/myBooklog";

export function useGetMyBookMarkedBooklog () {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.bookmarkedBooklogs],
        queryFn: ({ pageParam}) => 
            getMyBookmarkedBooklog({ page: pageParam, size: 20}),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.data?.hasNext ? allPages.length : undefined;
        },
    });
}