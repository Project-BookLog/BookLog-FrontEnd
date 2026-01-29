import type { BookStatus } from "../types/book.types";

export function getBookStatusByProgress(progress: number): BookStatus {
    if (progress === 0) return "TO_READ";
    if (progress === 100) return "COMPLETED";
    return "READING";
}