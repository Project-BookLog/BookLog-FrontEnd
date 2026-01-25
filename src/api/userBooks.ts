import { BOOK_ORDER } from "../enum/book"
import type { BookStatus } from "../types/book.types";
import type { ResponseUserBooksDto } from "../types/library"
import { publicApi } from "./axiosConfig"

export const getBookList = async(userId: number, shelfId?: number, status?: BookStatus, sort: BOOK_ORDER = BOOK_ORDER.LATEST): Promise<ResponseUserBooksDto> => {
    const {data} = await publicApi.get("/api/v1/user-books", {
        headers: {"X-USER-ID": userId},
        params: {shelfId, status, sort},
    });
    return data;
}