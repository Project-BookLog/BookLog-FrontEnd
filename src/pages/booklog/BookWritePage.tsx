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
import {
  getBooklogTagOptions,
  type BooklogTagOptionsResponse,
} from "../../api/booklogTags";
import type { BooklogTag } from "../../types/booklogDetail.types";
import type { FilterState } from "../../context/FilterContext";

type LocationState = {
  book?: Book;
  fresh?: boolean;
  mode?: "edit";
  postId?: number;
  content?: string;
  tags?: BooklogTag[];
  imageUrls?: string[];
};

const MAX_IMAGE_COUNT = 8;
const DRAFT_STORAGE_KEY = "booklogWriteDraft:content";

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
  const isEditMode = state.mode === "edit";
  const editPostId = state.postId;

  const { filter, resetFilter, setFilter } = useFilter("booklogWrite");
  const { showToast } = useToast();

  /** ---------------- 드래프트 키 분리 ---------------- */
  const draftKey = useMemo(() => {
    // edit 모드는 새 글 드래프트를 덮어쓰지 않도록 분리 저장
    if (isEditMode && editPostId) return `${DRAFT_STORAGE_KEY}:edit:${editPostId}`;
    return `${DRAFT_STORAGE_KEY}:new`;
  }, [isEditMode, editPostId]);

  const [content, setContent] = useState(() => {
    const saved = sessionStorage.getItem(draftKey);
    return state.content ?? saved ?? "";
  });

  const [isPublishing, setIsPublishing] = useState(false);

  /** ---------------- 태그 옵션 ---------------- */
  const [tagOptions, setTagOptions] =
    useState<BooklogTagOptionsResponse | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const opts = await getBooklogTagOptions();
        if (alive) setTagOptions(opts);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  /** ---------------- 발행 재진입 방지(동기 락) ---------------- */
  const publishingRef = useRef(false);

  /** ---------------- 이미지 ---------------- */
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<PickedImage[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    state.imageUrls ?? []
  );
  const imageCount = images.length + existingImageUrls.length;

  /** ---------------- 뒤로가기 모달 ---------------- */
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  /** ---------------- 필터 초기화 로직 ---------------- */
  useEffect(() => {
    if (state.fresh) {
      resetFilter();
      sessionStorage.removeItem(draftKey);
    }

    if (isEditMode) {
      const tags = state.tags ?? [];
      const nextFilter: FilterState = { mood: [], style: [], immersion: [] };

      type Mood = FilterState["mood"][number];
      type Style = FilterState["style"][number];
      type Immersion = FilterState["immersion"][number];

      tags.forEach((tag) => {
        if (!tag?.name) return;

        if (tag.category === "MOOD") nextFilter.mood.push(tag.name as Mood);
        if (tag.category === "STYLE") nextFilter.style.push(tag.name as Style);
        if (tag.category === "IMMERSION")
          nextFilter.immersion.push(tag.name as Immersion);
      });

      // 최소 1개라도 들어있으면 적용
      if (
        nextFilter.mood.length > 0 ||
        nextFilter.style.length > 0 ||
        nextFilter.immersion.length > 0
      ) {
        setFilter(nextFilter);
      }

      if (state.content) setContent(state.content);
      if (state.imageUrls) setExistingImageUrls(state.imageUrls);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ---------------- 드래프트 저장 ---------------- */
  useEffect(() => {
    // edit / new 모드 모두 draftKey로 분리 저장 (새 글 덮어쓰기 방지)
    sessionStorage.setItem(draftKey, content);
  }, [content, draftKey]);

  /** ---------------- 발행 가능 여부 ---------------- */
  const hasTag = useMemo(() => {
    return (
      filter.mood.length > 0 &&
      filter.style.length > 0 &&
      filter.immersion.length > 0
    );
  }, [filter]);

  const bookId = book?.bookId;

  // edit 기능 미구현이면 제출 자체를 막아도 되지만,
  // 여기서는 onPublish에서 메시지 처리하고 조용히 막지 않도록 canPublish는 기존 유지.
  const canPublish =
    content.trim().length > 0 &&
    hasTag &&
    !isPublishing &&
    typeof bookId === "number" &&
    bookId > 0 &&
    !!tagOptions;

  /** ---------------- 발행/수정 ---------------- */
  const onPublish = async () => {
    if (publishingRef.current) return;
    if (!canPublish) return;

    publishingRef.current = true;

    // ✅ edit 모드: 성공처럼 보이게 하면 안 됨 (API 미구현)
    if (isEditMode) {
      showToast("수정 기능은 준비 중이에요.");
      publishingRef.current = false;
      return;
    }

    // 여기부터는 "발행(create)"만
    if (!tagOptions || !bookId) {
      publishingRef.current = false;
      return;
    }

    const nameToId = new Map<string, number>();
    for (const t of tagOptions.mood) nameToId.set(t.name, t.tagId);
    for (const t of tagOptions.style) nameToId.set(t.name, t.tagId);
    for (const t of tagOptions.immersion) nameToId.set(t.name, t.tagId);

    const selectedNames = [...filter.mood, ...filter.style, ...filter.immersion];
    const tagIds = Array.from(
      new Set(
        selectedNames
          .map((name) => nameToId.get(name))
          .filter((v): v is number => typeof v === "number")
      )
    );

    if (tagIds.length === 0) {
      publishingRef.current = false;
      return;
    }

    setIsPublishing(true);

    try {
      // 1) 이미지 업로드 (있을 때만)
      let imageUrls: string[] = [...existingImageUrls];

      if (images.length > 0) {
        const files = images.map((img) => img.file);
        const uploaded = await uploadBooklogImages(files);
        imageUrls = [...imageUrls, ...uploaded];
      }

      // 2) 북로그 발행
      await createBooklog({
        bookId,
        title: book?.title ?? "",
        content: content.trim(),
        tagIds,
        imageUrls,
      });

      resetFilter();
      sessionStorage.removeItem(draftKey);

      // ✅ 토스트는 /booklog 메인에서 띄우도록 state로 전달
      navigate("/booklog", {
        replace: true,
        state: { toast: "북로그가 발행되었어요." },
      });
    } catch (err) {
      console.error(err);
    } finally {
      publishingRef.current = false;
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
      const remain = MAX_IMAGE_COUNT - (prev.length + existingImageUrls.length);
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
    sessionStorage.removeItem(draftKey);

    if (isEditMode && editPostId) {
      navigate(`/booklog/${editPostId}`, { replace: true });
    } else {
      navigate("/booklog/pick");
    }
  };

  const authorText = book?.authors?.length
    ? `${book.authors.join(", ")} 저`
    : "저자 정보 없음";
  const publisherText = book?.publisherName ?? "출판사";

  return (
    <div className="relative min-h-dvh bg-bg pb-28">
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
              title={book?.title ?? "제목을 입력하세요"}
              author={authorText}
              publisher={publisherText}
              tags={[]}
              thumbnailUrl={book?.thumbnailUrl as string}
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
            <Camera className="h-6 w-6 text-[#676665] -translate-y-[3px]" />
            <span className="text-text-en-body-01 leading-none">
              <span className="text-[#676665]">{imageCount}</span>
              <span className="text-[#9B9A97]"> / {MAX_IMAGE_COUNT}</span>
            </span>
          </button>

          {(existingImageUrls.length > 0 || images.length > 0) && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {existingImageUrls.map((url) => (
                <div
                  key={url}
                  className="h-[140px] w-[140px] shrink-0 overflow-hidden rounded bg-[#CDCCCB]"
                >
                  {/* ✅ backgroundImage 제거: CSS 파싱/인젝션 리스크 방지 */}
                  <img
                    src={url}
                    alt="기존 이미지"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}

              {images.map((img) => (
                <div
                  key={img.id}
                  className="h-[140px] w-[140px] shrink-0 overflow-hidden rounded bg-[#CDCCCB]"
                >
                  {/* ✅ backgroundImage 제거 */}
                  <img
                    src={img.previewUrl}
                    alt="선택한 이미지"
                    className="h-full w-full object-cover"
                    loading="lazy"
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