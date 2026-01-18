import { useNavigate, useParams } from "react-router-dom"
import type { Library } from "../../types/library"
import { useMemo, useState } from "react"
import { BackIcon } from "../../assets/icons"
import { ConfirmModal } from "../../components/modal/ConfirmModal"
import { EditCheckBox } from "../../components/myLibrary/EditCheckBox"
import EditBookCard from "../../components/myLibrary/EditBookCard"
import { useToast } from "../../context/ToastContext"

export const EditBooksPage = ({ libraries }: { libraries: Library[] }) => {

    const navigate = useNavigate();
    const { libraryName } = useParams<{libraryName: string}>();
    const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { showToast } = useToast();

    const library = useMemo(
        () => libraries.find((lib) => lib.name === libraryName),
        [libraries, libraryName]
    );

    if (!library) return null;

    const toggleSelect = (bookId: number) => {
        setSelectedBooks((prev) =>
            prev.includes(bookId)
                ? prev.filter((id) => id !== bookId)
                : [...prev, bookId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedBooks.length === 0) {
            setSelectedBooks(library.books.map(book => book.id));
        } else {
            setSelectedBooks([]);
        }
    };

    const isSelected = (bookId: number) => selectedBooks.includes(bookId);
    const isDisabled = selectedBooks.length === 0;

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
        showToast("삭제가 완료되었어요.")
        navigate(`/my-library/${libraryName}`)
    }

    const handleMoveBboks = () => {
        console.log("이동할 책 ID:", selectedBooks)
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-bg">
            <div className="flex h-[62px] px-5 pt-5 pb-2 justify-between items-center self-stretch">
                <BackIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
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
            {isModalOpen && 
                <ConfirmModal
                    isOpen={isModalOpen}
                    title="도서 목록 편집하기를 중단할까요?"
                    description="중단한 내용은 복구할 수 없어요."
                    confirmText="중단"
                    cancelText="취소"
                    onConfirm={handleCancel}
                    onClose={() => setIsModalOpen(false)}
                />
            }
            {library.books.length === 0 ? (
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
                <div className="flex w-[375px] px-5 flex-col items-start gap-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={toggleSelectAll}>
                        <EditCheckBox checked={selectedBooks.length > 0}/>
                        {selectedBooks.length === 0 ? (
                            <p className="text-black text-body-03">전체 선택</p>
                        ) : (
                            <p className="text-black text-body-03">선택 해제 ({selectedBooks.length})</p>
                        )}
                        
                    </div>
                    <div className="flex items-start content-start gap-x-[11.5px] gap-y-5 self-stretch flex-wrap">
                        {library.books.map((book) => (
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
            {library.books.length !== 0 &&  (library.name === "전체 도서" ? (
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
                            className="flex w-[162px] px-[10px] py-4 justify-center items-center gap-[10px] rounded-[12px] bg-gray-200"
                            disabled={isDisabled}
                            onClick={handleRemoveFromLibrary}
                        >
                            <p className="text-center text-warning text-subtitle-02-sb">삭제</p>
                        </button>
                        <button
                            className="flex w-[162px] px-[10px] py-4 justify-center items-center gap-[10px] rounded-[12px] bg-black"
                            disabled={isDisabled}
                            onClick={handleMoveBboks}
                        >
                            <p className="text-center text-white text-subtitle-02-sb">서재 이동</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}