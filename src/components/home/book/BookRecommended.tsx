import { useState } from "react";
import type { BookDetailResponse } from "../../../types/home/detail.types";

function BookRecommended({ book }: { book: BookDetailResponse }) {
  type TasteKey = "mood" | "style" | "immersion";
  const [active, setActive] = useState<TasteKey>("mood");

  const TASTE_LABEL: Record<TasteKey, string> = {
    mood: "분위기",
    style: "문체",
    immersion: "몰입도",
  };

  const analysis = book.tasteAnalysis?.[active];

  return (
    <section className="px-6 mt-6">
      {/* AI 취향 코멘트 */}
      {book.aiTasteComment && (
        <div>
          <p className="text-title-02 font-semibold mb-3">AI 취향 코멘트</p>
          <div className="bg-gray-100 rounded-lg px-4 py-5">
            <p className="text-subtitle-01-sb mb-2">
              {book.aiTasteComment.title}
            </p>
            <p className="text-caption-01 text-gray-600">
              {book.aiTasteComment.description}
            </p>
          </div>
        </div>
      )}

      {/* 상세 취향 분석 */}
      <div className="mt-10">
        <p className="text-title-02 font-semibold">상세 취향 분석</p>
      </div>

      <div className="my-2 gap-2 flex flex-wrap">
        {(Object.keys(TASTE_LABEL) as TasteKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`h-9 px-3 py-1 rounded-full text-body-03
              ${
                active === key
                  ? "text-primary bg-lightblue-1 border border-primary"
                  : "text-gray-700 bg-gray-100"
              }
            `}
          >
            {TASTE_LABEL[key]}
          </button>
        ))}
      </div>

      {analysis && (
        <div className="bg-gray-100 rounded-lg px-4 py-5">
          <p className="text-subtitle-01-sb mb-2">
            {analysis.title}
          </p>
          <p className="text-caption-01 text-gray-600">
            {analysis.description}
          </p>
        </div>
      )}
    </section>
  );
}


export default BookRecommended;
