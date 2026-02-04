import { privateApi } from "./axiosConfig";


export type BookmarkToggleResponse = {
  bookmarkedByMe: boolean;
  bookmarkCount: number;
};

export function toggleBooklogBookmark(postId: number) {
  return privateApi.post<BookmarkToggleResponse>(
    `/booklogs/${postId}/bookmark/toggle`
  );
}
