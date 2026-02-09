import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getUserBookDetail } from "../../api/userBooks";

export function useGetUserBookDetail (userBookId: number) {
    return useQuery({
        queryKey: [QUERY_KEY.book, userBookId],
        queryFn: () => getUserBookDetail(userBookId),
        enabled: !!userBookId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    });
};