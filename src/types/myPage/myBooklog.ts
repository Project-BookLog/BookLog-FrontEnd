import type { CommonResponse } from "../auth";
import type { BooklogBook, BooklogImage, BooklogTag } from "../booklogDetail.types";

export type MyBooklogAuthor = {
    userId: number;
    nickname: string;
    profileImageUrl: string;
};

export type MyBooklogItem = {
    postId: number;
    author: MyBooklogAuthor;
    createdAt: string;
    viewCount: number;
    bookmarkCount: number;
    bookmarkedByMe: boolean;
    book: BooklogBook;
    images: BooklogImage[];
    excerpt: string;
    tags: BooklogTag[];
}

export type ResponseGetMyBooklogDto = CommonResponse<{
    items: MyBooklogItem[];
    hasNext: boolean;
}>