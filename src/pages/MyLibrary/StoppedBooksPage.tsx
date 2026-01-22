import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "../../assets/icons";
import { EditCheckBox } from "../../components/myLibrary/EditCheckBox";
import EditBookCard from "../../components/myLibrary/EditBookCard";
import { useToast } from "../../context/ToastContext";
import type { Library } from "../../types/library";

type Props = {
  stoppedBooks: Library["books"];
};

export default function StoppedBooksPage({ stoppedBooks }: Props) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const isEmpty = stoppedBooks.length === 0;
  const isDisabled = selectedBooks.length === 0;

  const isAllSelected = useMemo(() => {
    if (stoppedBooks.length === 0) return false;
    return selectedBooks.length === stoppedBooks.length;
  }, [selectedBooks.length, stoppedBooks.length]);

  const toggleSelect = (bookId: number) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const toggleSelectAll = () => {
    if (stoppedBooks.length === 0) return;

    setSelectedBooks((prev) =>
      prev.length === stoppedBooks.length
        ? []
        : stoppedBooks.map((book) => book.id)
    );
  };

  const isSelected = (bookId: number) => selectedBooks.includes(bookId);

  const handleDelete = () => {
    console.log("삭제할 중단 도서 ID:", selectedBooks);
    showToast("삭제가 완료되었어요.");
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-bg">
      {/* ✅ 상단 헤더 (EditBooksPage 방식 그대로) */}
      <div className="flex h-[62px] px-5 pt-5 pb-2 justify-between items-center self-stretch">
        <BackIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <p className="text-black text-title-01">중단한 책 목록</p>

        {/* 오른쪽 더미 (타이틀 중앙 정렬용) */}
        <div className="w-6 h-6" />
      </div>

      {/* ✅ 본문 */}
      {isEmpty ? (
        // ===== 빈 상태 =====
        <div className="flex flex-1 flex-col items-center justify-center gap-[10px] px-5">
          <p className="text-center text-[#262626] text-en-title-02 ">
            중단한 책이 없습니다.
          </p>
          <p className="text-center text-[#81807F] text-en-body-02">
            읽다가 멈춘 책이 있다면 기록해 보세요.
          </p>
        </div>
      ) : (
        // ===== 목록 상태 =====
        <div className="flex w-[375px] px-5 flex-col items-start gap-4 mt-5 pb-[96px]">
          {/* 전체 선택 */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleSelectAll}
          >
            <EditCheckBox checked={isAllSelected} />
            <p className="text-black text-body-03">전체 선택</p>
          </div>

          {/* 책 카드 목록 */}
          <div className="flex items-start content-start gap-x-[11.5px] gap-y-5 self-stretch flex-wrap">
            {stoppedBooks.map((book) => (
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

      {/* ✅ 하단 고정 삭제 버튼 */}
      {!isEmpty && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 flex px-5 pt-5 items-end self-stretch">
          <button
            className="flex w-[335px] px-[10px] py-4 justify-center items-center gap-[10px]
                       rounded-[12px]
                       bg-gray-200 text-gray-600
                       disabled:bg-gray-200 disabled:text-gray-600
                       enabled:bg-gray-100 enabled:text-gray-700
                       cursor-pointer"
            disabled={isDisabled}
            onClick={handleDelete}
          >
            <p className="text-center text-subtitle-01-sb">삭제</p>
          </button>
        </div>
      )}
    </div>
  );
}
