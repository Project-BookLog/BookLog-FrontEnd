import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyBooklog } from "../../api/mypage/myBooklog";

export function useGetMyBooklog () {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.booklogs],
        queryFn: ({ pageParam}) => 
            getMyBooklog({ page: pageParam, size: 20}),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.data?.hasNext ? allPages.length : undefined;
        },
    });
}