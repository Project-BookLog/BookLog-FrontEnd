import type { BookStatus } from "../types/book.types";
import type { LibraryTab } from "../types/library";

export const TAB_TO_STATUSES: Record<LibraryTab, BookStatus[]> = {
  ALL: ["TO_READ", "READING", "COMPLETED"],
  TO_READ: ["TO_READ"],
  READING: ["READING"],
  DONE: ["COMPLETED"],
};
