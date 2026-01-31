import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BackIcon } from "../../assets/icons";
import { EditCheckBox } from "../../components/myLibrary/EditCheckBox";
import EditBookCard from "../../components/myLibrary/EditBookCard";
import { useToast } from "../../context/ToastContext";
import { useDeleteBookList } from "../../hooks/mutations/useDeleteBookList";
import { useGetBookList } from "../../hooks/queries/useGetBookList";
import { ConfirmModal } from "../../components/common/ConfirmModal";

export default function StoppedBooksPage() {

  const { shelfId } = useParams();
  const parsedShelfId = shelfId === "-1" ? undefined : Number(shelfId);

  const location  = useLocation();
  const shelfName = location.state?.shelfName;

  const navigate = useNavigate();

  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const { mutate: deleteBooks } = useDeleteBookList();
  const { data: books } = useGetBookList(parsedShelfId, "STOPPED");
  const { showToast } = useToast();

  const stoppedBooks = books?.items ?? [];

  const toggleSelect = (userBookId: number) => {
    setSelectedBooks((prev) =>
      prev.includes(userBookId)
        ? prev.filter((id) => id !== userBookId)
        : [...prev, userBookId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBooks.length === 0) {
      setSelectedBooks(stoppedBooks.map(book => book.userBookId));
    } else {
      setSelectedBooks([]);
    }
  };

  const isSelected = (userBookId: number) => selectedBooks.includes(userBookId);
  const isEmpty = stoppedBooks.length === 0;
  const isDisabled = selectedBooks.length === 0;

  const handleBack = () => {
    if (stoppedBooks.length !== 0) setIsConfirmModalOpen(true);
    else navigate(`/my-library/${shelfId}`, {
      state: { shelfName },
    });
  }

  const handleCancel = () => {
    navigate(`/my-library/${shelfId}`, {
      state: { shelfName },
    })
  };

  const handleDelete = () => {
    deleteBooks(
      {
        body: { ids: selectedBooks },
        shelfId: parsedShelfId,
        status: "STOPPED"
      },
      {
        onSuccess: () => {
          showToast("삭제가 완료되었어요.");
          navigate(`/my-library/${shelfId}`, {
            state: { shelfName },
          });
        },
      }
    );
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-bg">
      <div className="flex h-[62px] px-5 pt-5 pb-2 justify-between items-center self-stretch">
        <BackIcon
          className="w-6 h-6 cursor-pointer"
          onClick={handleBack}
        />
        {selectedBooks.length === 0 ? (
          <p className="text-black text-title-01">중단한 책 목록</p>
        ) : (
          <p className="text-black text-title-01">{selectedBooks.length}개의 도서 선택됨</p>
        )}
        <div className="w-6 h-6 pl-[7px] pr-[8px] py-[3px]"/>
      </div>
      {isConfirmModalOpen && stoppedBooks.length !== 0 && 
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
      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-[10px]">
          <p className="text-center text-gray-900 text-title-02 ">중단한 책이 없습니다.</p>
          <p className="text-center text-gray-600 text-body-03">읽다가 멈춘 책이 있다면 기록해 보세요.</p>
        </div>
      ) : (
        <div className="flex w-[375px] px-5 flex-col items-start gap-4 mt-5">
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleSelectAll}>
            <EditCheckBox checked={selectedBooks.length > 0} />
            {selectedBooks.length === 0 ? (
              <p className="text-black text-body-03">전체 선택</p>
            ) : (
              <p className="text-black text-body-03">선택 해제 ({selectedBooks.length})</p>
            )}
          </div>

          <div className="flex items-start content-start gap-x-[11.5px] gap-y-5 self-stretch flex-wrap">
            {stoppedBooks.map((book) => (
              <EditBookCard
                key={book.userBookId}
                book={book}
                selected={isSelected(book.userBookId)}
                onToggle={() => toggleSelect(book.userBookId)}
              />
            ))}
          </div>
        </div>
      )}

      {!isEmpty && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 flex px-5 pt-5 items-end gap-[2px] self-stretch">
          <button
            className="flex w-[335px] px-[10px] py-4 justify-center items-center gap-[10px]
                       rounded-[12px]
                       bg-primary active:bg-[#263A99] text-white
                       disabled:bg-gray-200 disabled:text-gray-600
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
