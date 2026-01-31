import { BOOK_ORDER } from "../enum/book"
import type { BookStatus } from "../types/book.types";
import type { RequestDeleteUserBooksDto, ResponseUserBooksDto } from "../types/library"
import { privateApi } from "./axiosConfig"

export const getBookList = async(shelfId?: number, status?: BookStatus, sort: BOOK_ORDER = BOOK_ORDER.LATEST): Promise<ResponseUserBooksDto> => {
    const {data} = await privateApi.get("/user-books", {
        params: {shelfId, status, sort},
    });
    return data;
}

export const deleteBookList = async ( body: RequestDeleteUserBooksDto, shelfId?: number, status?: BookStatus) => {
    await privateApi.delete("/user-books", {
        params: {
            shelfId,
            status,
        },
        data: body,
    });
}