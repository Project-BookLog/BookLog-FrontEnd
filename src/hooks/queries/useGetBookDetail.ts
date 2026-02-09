import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getBookDetail } from "../../api/home/detail";

export const useGetBookDetail = (bookId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.book, bookId],
    queryFn: () => getBookDetail(bookId),
    enabled: !!bookId,
  });
};
