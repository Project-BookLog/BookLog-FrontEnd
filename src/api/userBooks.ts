import { BOOK_ORDER } from "../enum/book"
import type { BookStatus, RequestPatchUserBookDto, UserBookDetail } from "../types/book.types";
import type { RequestDeleteUserBooksDto, ResponseUserBooksDto } from "../types/library"
import { privateApi } from "./axiosConfig"

export const getUserBookList = async(shelfId?: number, status?: BookStatus, sort: BOOK_ORDER = BOOK_ORDER.LATEST): Promise<ResponseUserBooksDto> => {
    const {data} = await privateApi.get("/user-books", {
        params: {shelfId, status, sort},
    });
    return data;
}

export const deleteUserBookList = async ( body: RequestDeleteUserBooksDto, shelfId?: number, status?: BookStatus) => {
    await privateApi.delete("/user-books", {
        params: {
            shelfId,
            status,
        },
        data: body,
    });
}

export const getUserBookDetail = async (userBookId: number): Promise<UserBookDetail> => {
    const { data } = await privateApi.get(`/user-books/${userBookId}`);
    return data;
}

export const patchUserBookDetail = async (userBookId: number, body: RequestPatchUserBookDto) => {
    await privateApi.patch(`/user-books/${userBookId}`, body)
}