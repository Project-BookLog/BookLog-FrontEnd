import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import type { Library, LibraryTab } from "../../types/library"
import { useEffect, useMemo, useState } from "react"
import { BackIcon, CheckIcon } from "../../assets/icons"
import { ConfirmModal } from "../../components/common/ConfirmModal"
import { EditCheckBox } from "../../components/myLibrary/EditCheckBox"
import EditBookCard from "../../components/myLibrary/EditBookCard"
import { useToast } from "../../context/ToastContext"
import { LIBRARY_TABS } from "../../constants/libraryTabs"
import { getBookStatusByProgress } from "../../domain/BookStatus"
import { TAB_TO_STATUSES } from "../../domain/Library"

export const EditBooksPage = ({ libraries }: { libraries: Library[] }) => {

    const navigate = useNavigate();
    const { libraryName } = useParams<{libraryName: string}>();
    const [ searchParams ] = useSearchParams();
    const activeTab = searchParams.get("tab") as LibraryTab | null;
    const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [isMoveModalOpen, setIsMoveModalOpen] = useState<boolean>(false);
    const [targetLibraryName, setTargetLibraryName] = useState<string | null>(null);
    const { showToast } = useToast();

    const library = useMemo(
        () => libraries.find((lib) => lib.name === libraryName),
        [libraries, libraryName]
    );

    if (!library) return null;

    const moveTargetLibraries = libraries.filter(
        (lib) => lib.name !== library.name && lib.name !== "전체 도서"
    );

    const editableBooks = useMemo(() => {
        if (!library) return [];

        if (library.name === "전체 도서") return library.books;

        const statuses = TAB_TO_STATUSES[activeTab ?? "ALL"];

        return library.books.filter((book) =>
            statuses.includes(getBookStatusByProgress(book.progress))
        );
    }, [library, activeTab]);


    const activeTabLabel = useMemo(() => {
        if (!activeTab || activeTab === "ALL") return "전체";

        return LIBRARY_TABS.find(tab => tab.key === activeTab)?.label ?? "";
    }, [activeTab]);


    const toggleSelect = (bookId: number) => {
        setSelectedBooks((prev) =>
            prev.includes(bookId)
                ? prev.filter((id) => id !== bookId)
                : [...prev, bookId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedBooks.length === 0) {
            setSelectedBooks(editableBooks.map(book => book.id));
        } else {
            setSelectedBooks([]);
        }
    };

    const isSelected = (bookId: number) => selectedBooks.includes(bookId);
    const isDisabled = selectedBooks.length === 0;

    const handleBack = () => {
        if (editableBooks.length !== 0) setIsConfirmModalOpen(true);
        else navigate(`/my-library/${libraryName}`);
    }

    const handleCancel = () => {
        setSelectedBooks([]);
        navigate(`/my-library/${libraryName}`)
    };

    const handleDeleteFromAll = () => {
        console.log("삭제할 책 ID:", selectedBooks);
        showToast("도서 목록이 편집되었어요.");
        navigate(`/my-library/${libraryName}`)
    };

    const handleRemoveFromLibrary = () => {
        console.log("삭제할 책 ID:", selectedBooks);
        showToast("삭제가 완료되었어요.");
        navigate(`/my-library/${libraryName}`);
    }

    const handleMoveBooks = () => {
        console.log("이동할 책 ID:", selectedBooks);
        showToast("서재 이동이 완료되었어요.");
        navigate(`/my-library/${libraryName}`);
    }

    useEffect(() => {
        setSelectedBooks([]);
    }, [activeTab, libraryName]);

    useEffect(() => {
        if (isMoveModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    
        return () => {
            document.body.style.overflow = "";
        }
    }, [isMoveModalOpen]);
    
    useEffect(() => {
        if (!isMoveModalOpen) return;
    
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                setIsMoveModalOpen(false);
            }
        }
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isMoveModalOpen, setIsMoveModalOpen]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center bg-bg">
            <div className="flex h-[62px] px-5 pt-5 pb-2 justify-between items-center self-stretch">
                <BackIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleBack}
                />
                {library.name === "전체 도서" ? (
                    <p className="text-black text-title-01">도서 목록 편집하기</p>
                ) : selectedBooks.length === 0 ? (
                    <p className="text-black text-title-01">도서 선택</p>
                ) : (
                    <p className="text-black text-title-01">{selectedBooks.length}개의 도서 선택됨</p>
                )}
                <div className="w-6 h-6 pl-[7px] pr-[8px] py-[3px]"></div>
            </div>
            {isConfirmModalOpen && editableBooks.length !== 0 && 
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    title="도서 목록 편집하기를 중단할까요?"
                    description="중단한 내용은 복구할 수 없어요."
                    confirmText="중단"
                    cancelText="취소"
                    onConfirm={handleCancel}
                    onClose={() => setIsConfirmModalOpen(false)}
                />
            }
            {editableBooks.length === 0 ? (
                library.name === "전체 도서" ? (
                    <div className="flex flex-1 flex-col items-center gap-[10px] justify-center">
                        <p className="text-center text-gray-900 text-title-02">편집할 도서가 없습니다.</p>
                        <p className="text-center text-gray-600 text-body-03">먼저 읽고 있거나 읽고 싶은 책을 담아보세요.</p>
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col items-center gap-[10px] justify-center">
                        <p className="text-center text-gray-900 text-title-02">아직 서재가 비어있습니다.</p>
                        <p className="text-center text-gray-600 text-body-03">편집할 도서가 없네요.<br/>먼저 읽고 싶은 책들을 서재에 담아볼까요?</p>
                    </div>
                )
            ) : (
                <div className="flex w-[375px] px-5 flex-col items-start gap-4 mt-5">
                    {library.name === "전체 도서" ? (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleSelectAll}>
                            <EditCheckBox checked={selectedBooks.length > 0}/>
                            {selectedBooks.length === 0 ? (
                                <p className="text-black text-body-03">전체 선택</p>
                            ) : (
                                <p className="text-black text-body-03">선택 해제 ({selectedBooks.length})</p>
                            )}
                        </div>
                    ) : (
                        <div className="flex h-5 justify-between items-center self-stretch">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleSelectAll}>
                                <EditCheckBox checked={selectedBooks.length > 0}/>
                                {selectedBooks.length === 0 ? (
                                    <p className="text-black text-body-03">전체 선택</p>
                                ) : (
                                    <p className="text-black text-body-03">선택 해제 ({selectedBooks.length})</p>
                                )}
                            </div>
                            <p className="text-gray-600 text-body-03">{libraryName} &gt; {activeTabLabel}</p>
                        </div>
                    )}
                    <div className="flex items-start content-start gap-x-[11.5px] gap-y-5 self-stretch flex-wrap">
                        {editableBooks.map((book) => (
                            <EditBookCard
                                key={book.id}
                                book={book}
                                selected={isSelected(book.id)}
                                onToggle={() => toggleSelect(book.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
            {editableBooks.length !== 0 &&  (library.name === "전체 도서" ? (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 flex px-5 pt-5 items-end gap-[2px] self-stretch">
                    <button
                        className="flex w-[335px] px-[10px] py-4 justify-center items-center gap-[10px] rounded-[12px] bg-primary active:bg-[#263A99] disabled:bg-gray-200 text-white disabled:text-gray-600 cursor-pointer"
                        disabled={isDisabled}
                        onClick={handleDeleteFromAll}
                    >
                        <p className="text-center text-subtitle-01-sb">삭제</p>
                    </button>
                </div>
                ) : (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 flex px-5 pt-5 items-end gap-[2px] self-stretch">
                    <div className="flex items-start gap-[10px]">
                        <button
                            className="flex w-[162px] px-[10px] py-4 justify-center items-center gap-[10px] rounded-[12px] bg-gray-200 cursor-pointer"
                            disabled={isDisabled}
                            onClick={handleRemoveFromLibrary}
                        >
                            <p className="text-center text-warning text-subtitle-02-sb">삭제</p>
                        </button>
                        <button
                            className="flex w-[162px] px-[10px] py-4 justify-center items-center gap-[10px] rounded-[12px] bg-black cursor-pointer"
                            disabled={isDisabled}
                            onClick={() => setIsMoveModalOpen(true)}
                        >
                            <p className="text-center text-white text-subtitle-02-sb">서재 이동</p>
                        </button>
                    </div>
                </div>
            ))}
            {isMoveModalOpen && (
                <div
                    className="absolute inset-0 z-50 min-h-screen flex items-center justify-center bg-b-op15 backdrop-blur-[2px]"
                    onClick={() => {
                        setTargetLibraryName(null);
                        setIsMoveModalOpen(false);
                    }}
                >
                    <div
                        className="flex w-[267px] px-3 py-2 flex-col items-center rounded-[12px] bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex px-2 flex-col items-start self-stretch">
                            {moveTargetLibraries.map((lib, index) => (
                                <div className="w-full flex flex-col">
                                    <button
                                        key={lib.name}
                                        className="flex py-4 justify-between items-center self-stretch cursor-pointer"
                                        onClick={() => setTargetLibraryName(lib.name)}
                                    >
                                        <p className="text-gray-900 text-subtitle-02-m">{lib.name}</p>
                                        {targetLibraryName === lib.name && <CheckIcon className="w-5 h-5"/>}
                                    </button>
                                    {index !== moveTargetLibraries.length - 1 && (
                                        <div className="w-[227px] h-[1px] bg-gray-100"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-start gap-1 self-stretch">
                            <button
                                className="flex w-[120px] px-[10px] py-[14px] justify-center items-center gap-[10px] rounded-[8px] bg-gray-100 text-center text-gray-700 text-subtitle-02-sb cursor-pointer"
                                onClick={() => setIsMoveModalOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                className="flex w-[120px] px-[10px] py-[14px] justify-center items-center gap-[10px] rounded-[8px] bg-primary text-center text-white text-subtitle-02-sb cursor-pointer"
                                disabled={targetLibraryName === null}
                                onClick={handleMoveBooks}
                            >
                                적용
                            </button>
                        </div>
                    </div>
                </div>
                )}
        </div>
    )
}