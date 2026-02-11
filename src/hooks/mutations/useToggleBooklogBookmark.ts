import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBooklogBookmark } from "../../api/booklogBookmark";
import { QUERY_KEY } from "../../constants/key";

export function useToggleBooklogBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: number }) => toggleBooklogBookmark(postId),

    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.booklogs] });
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.bookmarkedBooklogs] });

      const previousData = queryClient.getQueryData<any>([QUERY_KEY.booklogs]);
      const previousBookmarked = queryClient.getQueryData<any>([QUERY_KEY.bookmarkedBooklogs]);

      queryClient.setQueryData([QUERY_KEY.booklogs], (oldData: any) => {
        
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((item: any) => {
                if (item.postId === postId) {
                  return {
                    ...item,
                    bookmarkedByMe: !item.bookmarkedByMe,
                    bookmarkCount: item.bookmarkedByMe
                      ? item.bookmarkCount - 1
                      : item.bookmarkCount + 1,
                  };
                }
                return item;
              }),
            },
          })),
        };
      });

      queryClient.setQueryData([QUERY_KEY.bookmarkedBooklogs], (oldData: any) => {

          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              data: {
                ...page.data,
                items: page.data.items.filter(
                  (item: any) => item.postId !== postId
                ),
              },
            })),
          };
        }
      );

      return { previousData, previousBookmarked };
    },

    onError: (_err, _variables, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEY.booklogs], context.previousData);
      }
      if (context?.previousBookmarked) {
        queryClient.setQueryData([QUERY_KEY.bookmarkedBooklogs], context.previousBookmarked);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.booklogs] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.bookmarkedBooklogs] });
    },
  });
}
