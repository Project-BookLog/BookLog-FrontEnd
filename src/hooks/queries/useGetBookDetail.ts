import { useQuery } from "@tanstack/react-query";
import { getBookDetail } from "../../api/home/detail";

export const useGetBookDetail = (bookId: number) => {
  return useQuery({
    queryKey: ["bookDetail", bookId],
    queryFn: () => getBookDetail(bookId),
    enabled: !!bookId,
  });
};
