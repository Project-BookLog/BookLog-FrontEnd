// src/pages/booklog/BookWritePage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import BookContent from "../../components/booklog/BookContent";
import FilterBar from "../../components/booklog/FilterBar";
import { useFilter } from "../../hooks/useFilter";

import { ConfirmModal } from "../../components/common/ConfirmModal";
import { useToast } from "../../context/ToastContext";

import { Camera, Reset } from "../../assets/icons";

import type { Book } from "../../types/book.types";
import { createBooklog, uploadBooklogImages } from "../../api/booklogs"; 

type LocationState = {
  book?: Book;
  fresh?: boolean;
};

const MAX_IMAGE_COUNT = 8;

type PickedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

export default function BookWritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const book = state.book;

  const { filter, resetFilter } = useFilter("booklogWrite");
  const { showToast } = useToast();

  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  /** ---------------- 이미지 ---------------- */
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<PickedImage[]>([]);
  const imageCount = images.length;

  /** ---------------- 뒤로가기 모달 ---------------- */
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  /** ---------------- 필터 초기화 로직 ---------------- */
  useEffect(() => {
    if (state.fresh) {
      resetFilter();
    }
  }, []);

  /** ---------------- 발행 가능 여부 ---------------- */
  const hasTag = useMemo(() => {
    return (
      filter.mood.length > 0 ||
      filter.style.length > 0 ||
      filter.immersion.length > 0
    );
  }, [filter]);

  const canPublish = content.trim().length > 0 && hasTag && !isPublishing;

  /** ---------------- 발행 ---------------- */
  const onPublish = async () => {
    if (!canPublish) return;

    const bookId = book?.bookId;

    if (!bookId || bookId <= 0) {
      showToast("책 정보(bookId)가 올바르지 않아요. 다시 선택해 주세요.");
      return;
    }

    const tagIds = Array.from(
      new Set(
        [...filter.mood, ...filter.style, ...filter.immersion]
          // @ts-expect-error - useFilter 타입이 실제 값과 다르면 여기서 에러가 날 수 있음
          .map((t) => t.tagId)
          .filter((v: unknown): v is number => typeof v === "number")
      )
    );

    if (tagIds.length === 0) {
      showToast("태그를 최소 1개 이상 선택해 주세요.");
      return;
    }

    setIsPublishing(true);
    try {
      // 1) 이미지 업로드 (있을 때만)
      let imageUrls: string[] = [];
      if (images.length > 0) {
        const files = images.map((img) => img.file);
        imageUrls = await uploadBooklogImages(files); // POST /booklogs/images
      }

      // 2) 북로그 발행
      const res = await createBooklog({
        bookId,
        title: book?.title ?? "",
        content: content.trim(),
        tagIds,
        imageUrls,
      });

      showToast("북로그가 발행되었어요.");
      resetFilter();
      navigate("/booklog", { replace: true });

      console.log("created postId:", res.postId);
    } catch (err) {
      console.error(err);
      showToast("발행에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsPublishing(false);
    }
  };

  /** ---------------- 이미지 ---------------- */
  const openFilePicker = () => {
    if (imageCount >= MAX_IMAGE_COUNT) return;
    fileInputRef.current?.click();
  };

  const onPickImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setImages((prev) => {
      const remain = MAX_IMAGE_COUNT - prev.length;
      const picked = files.slice(0, remain);

      const next = picked.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      return [...prev, ...next];
    });

    e.target.value = "";
  };

  // blob 정리
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, [images]);

  /** ---------------- 뒤로가기 ---------------- */
  const onClickBack = () => {
    setIsConfirmOpen(true);
  };

  const deleteDraftAndGoBack = () => {
    setIsConfirmOpen(false);
    resetFilter();
    navigate("/booklog/pick");
  };

  const authorText =
    book?.authors?.length ? `${book.authors.join(", ")} 저` : "한강 저";
  const publisherText = book?.publisherName ?? "출판사";

  return (
    <div className="relative min-h-dvh bg-bg pb-28">
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="작성 중인 내용을 삭제할까요?"
        description="삭제한 작업은 복구할 수 없어요."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={deleteDraftAndGoBack}
        onClose={() => setIsConfirmOpen(false)}
      />

      <header className="sticky top-0 z-10 bg-bg">
        <NavBarTop title="글쓰기" onBack={onClickBack} />
        <div className="h-[1px] w-full bg-divider" />
      </header>

      <main className="px-4">
        {/* 책 카드 */}
        <section className="mt-4 flex justify-center">
          <div className="h-[220px] w-[240px] rounded-[12px] bg-[#EFEDEB]">
            <BookContent
              title={book?.title ?? "소년이 온다"}
              author={authorText}
              publisher={publisherText}
              tags={[]}
            />
          </div>
        </section>

        {/* 내용 */}
        <section className="mt-6">
          <h2 className="text-subtitle-02-sb text-black">내용 작성</h2>
          <div className="mt-3 rounded border border-[#E7E5E4] bg-bg px-4 py-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="책을 읽으면서 좋았던 부분을 공유해 보세요."
              className="h-[60px] w-full resize-none outline-none"
            />
          </div>
        </section>

        {/* 태그 */}
        <section className="mt-5">
          <h2 className="text-subtitle-02-sb text-black">태그 고르기</h2>
          <div className="mt-2 -ml-3.5">
            <FilterBar
              scope="booklogWrite"
              ResetIcon={Reset}
              onReset={resetFilter}
              onClickMood={() =>
                navigate("/booklog/write/filter", {
                  state: { from: "/booklog/write", book },
                })
              }
              onClickStyle={() =>
                navigate("/booklog/write/filter", {
                  state: { from: "/booklog/write", book },
                })
              }
              onClickImmersion={() =>
                navigate("/booklog/write/filter", {
                  state: { from: "/booklog/write", book },
                })
              }
            />
          </div>
        </section>

        {/* 이미지 */}
        <section className="mt-5">
          <h2 className="text-subtitle-02-sb text-black">이미지 추가</h2>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onPickImages}
            className="hidden"
          />

          <button
            type="button"
            onClick={openFilePicker}
            className="mt-3 flex h-[60px] w-[64px] flex-col items-center justify-center rounded border border-[#CDCCCB]"
          >
            {/* 카메라 아이콘 */}
            <Camera className="h-6 w-6 text-[#676665] -translate-y-[3px]" />

            {/* 숫자 */}
            <span className="text-text-en-body-01 leading-none">
              <span className="text-[#676665]">{imageCount}</span>
              <span className="text-[#9B9A97]"> / {MAX_IMAGE_COUNT}</span>
            </span>
          </button>

          {images.length > 0 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="h-[140px] w-[140px] shrink-0 rounded bg-[#CDCCCB] overflow-hidden"
                >
                  <div
                    className="h-full w-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${img.previewUrl})` }}
                    role="img"
                    aria-label="선택한 이미지"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 발행 버튼 */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-sm -translate-x-1/2 px-4 pb-6">
        <button
          onClick={onPublish}
          disabled={!canPublish}
          className={`h-[53px] w-full rounded ${
            canPublish ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {isPublishing ? "발행 중..." : canPublish ? "발행" : "발행하기"}
        </button>
      </div>
    </div>
  );
}
