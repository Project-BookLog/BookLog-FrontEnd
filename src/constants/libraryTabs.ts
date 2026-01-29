import type { LibraryTab } from "../types/library";

export const LIBRARY_TABS: { key: LibraryTab; label: string }[] = [
    { key: "ALL", label: "전체" },
    { key: "TO_READ", label: "읽을 예정" },
    { key: "READING", label: "읽는 중" },
    { key: "COMPLETED", label: "완독" },
];
