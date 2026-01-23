// src/pages/booklog/BookWritePage.tsx
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavBarTop from "../../components/common/navbar/NavBarTop";
import BookContent from "../../components/booklog/BookContent";
import FilterBar from "../../components/booklog/FilterBar";
import { useFilter } from "../../hooks/useFilter";

import resetImg from "../../assets/icons/reset.svg";
import CameraImg from "../../assets/icons/Camera.svg";

import type { Book } from "../../types/book.types";

type LocationState = {
  book?: Book;
};

const MAX_IMAGE_COUNT = 8;

export default function BookWritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const book = state.book;

  const { filter, resetFilter } = useFilter();
  const [content, setContent] = useState("");

  // ✅ 이미지 개수 state
  const [imageCount, setImageCount] = useState(0);

  // ✅ 태그 선택 여부
  const hasTag = useMemo(() => {
    return (
      (filter.mood?.length ?? 0) > 0 ||
      (filter.style?.length ?? 0) > 0 ||
      (filter.immersion?.length ?? 0) > 0
    );
  }, [filter]);

  // ✅ 내용 + 태그 선택 시 발행 활성화
  const canPublish = content.trim().length > 0 && hasTag;

  const onPublish = () => {
    if (!canPublish) return;
    console.log("publish", { book, content, filter, imageCount });
  };

  return (
    <div className="min-h-dvh bg-bg pb-28">
      <header className="sticky top-0 z-10 bg-bg">
        <NavBarTop title="글쓰기" onBack={() => navigate("/booklog/pick")} />
        <div className="h-[1px] w-full bg-divider" />
      </header>

      <main className="px-4">
        {/* ✅ 책 카드 영역 */}
        <section className="mt-4 flex justify-center">
          <div className="h-[220px] w-[240px] rounded-[12px] bg-[#EFEDEB]">
            <BookContent
              title={book?.title ?? "소년이 온다"}
              author={book?.author ?? "한강 저"}
              publisher={book?.publisher ?? "출판사"}
              tags={[]}
            />
          </div>
        </section>

        {/* ✅ 내용 작성 */}
        <section className="mt-6">
          <h2 className="px-0.5 text-subtitle-02-sb text-[#0A0A0A]">
            내용 작성
          </h2>

          <div className="mt-3 rounded-[4px] border border-[#E7E5E4] bg-bg px-4 py-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="책을 읽으면서 좋았던 부분을 공유해 보세요."
              className="h-[60px] w-full resize-none text-en-body-01 text-[#0A0A0A] outline-none placeholder:text-[#CDCCCB]"
            />
          </div>
        </section>

        {/* ✅ 태그 고르기 */}
        <section className="mt-5">
          <h2 className="px-0.5 text-subtitle-02-sb text-[#0A0A0A]">
            태그 고르기
          </h2>

          <div className="mt-2 -ml-3.5">
            <FilterBar
              resetSrc={resetImg}
              onReset={resetFilter}
              // ✅ 글쓰기에서 필터로 갈 때: from + book 같이 넘김
              onClickMood={() =>
                navigate("/booklog/filter", {
                  state: { from: "/booklog/write", book },
                })
              }
              onClickStyle={() =>
                navigate("/booklog/filter", {
                  state: { from: "/booklog/write", book },
                })
              }
              onClickImmersion={() =>
                navigate("/booklog/filter", {
                  state: { from: "/booklog/write", book },
                })
              }
            />
          </div>
        </section>

        {/* ✅ 이미지 추가 */}
        <section className="mt-5">
          <h2 className="text-subtitle-02-sb text-[#0A0A0A]">이미지 추가</h2>

          <div className="mt-3">
            <button
              type="button"
              className="flex h-[60px] w-[64px] flex-col items-center justify-center rounded-[4px] border border-[#CDCCCB] bg-bg"
              aria-label="이미지 추가"
              onClick={() => {
                setImageCount((prev) =>
                  prev < MAX_IMAGE_COUNT ? prev + 1 : prev
                );
              }}
            >
              <img
                src={CameraImg}
                alt=""
                className="h-6 w-6"
                draggable={false}
                style={{ color: "#676665", fill: "#676665" }}
              />

              <div className="mt-1 text-en-body-01">
                <span style={{ color: "#676665" }}>{imageCount}</span>
                <span style={{ color: "#9B9A97" }}>
                  {" "}
                  / {MAX_IMAGE_COUNT}
                </span>
              </div>
            </button>
          </div>
        </section>
      </main>

      {/* ✅ 하단 발행 버튼 */}
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4 pb-6">
        <button
          type="button"
          onClick={onPublish}
          disabled={!canPublish}
          className={`h-[53px] w-full rounded-[12px] ${
            canPublish ? "bg-[#3049C0]" : "bg-[#E7E5E4]"
          }`}
        >
          <span
            className={`text-body-01-sb ${
              canPublish ? "text-white" : "text-[#81807F]"
            }`}
          >
            {canPublish ? "발행" : "발행하기"}
          </span>
        </button>
      </div>
    </div>
  );
}
