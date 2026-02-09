import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserBook } from "../../api/userBooks";
import { QUERY_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";

export function usePostUserBook() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: postUserBook,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.books]});
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.shelves]});
            navigate(`/my-library/book-detail/${data.userBookId}`, {replace: true,});
        },
    });
}