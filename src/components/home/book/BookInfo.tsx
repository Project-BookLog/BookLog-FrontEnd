/* eslint-disable react-hooks/refs */
import { BackIcon } from "../../../assets/icons";
import type { BookDetailResponse } from "../../../types/home/detail.types";
import { useCollapsible } from "../../../hooks/useCollapsible";

interface BookInfoProps {
  book: BookDetailResponse;
}

function BookInfo({ book }: BookInfoProps) {
  const desc = useCollapsible(book.description);
  const toc = useCollapsible(book.tableOfContents);

  return (
    <div className="px-6 my-8 space-y-10">

      {/* 책 소개 */}
      <section>
        <div className="mb-3 flex justify-between items-center">
          <p className="text-title-02 font-semibold">책 소개</p>

          {desc.collapsible && (
            <button type="button" onClick={desc.toggle}>
              <BackIcon
                className={`w-5 h-5 transition-transform ${
                  desc.expanded ? "rotate-90" : "rotate-270"
                }`}
              />
            </button>
          )}
        </div>

        <div
          ref={desc.ref}
          className={`text-caption-01 text-gray-600 ${
            desc.expanded ? "" : "line-clamp-4"
          }`}
        >
          {book.description || "-"}
        </div>
      </section>

      {/* 목차 */}
      <section>
        <div className="mb-3 flex justify-between items-center">
          <p className="text-title-02 font-semibold">목차</p>

          {toc.collapsible && (
            <button type="button" onClick={toc.toggle}>
              <BackIcon
                className={`w-5 h-5 transition-transform ${
                  toc.expanded ? "rotate-90" : "rotate-270"
                }`}
              />
            </button>
          )}
        </div>

        <div
          ref={toc.ref}
          className={`text-caption-01 text-gray-600 ${
            toc.expanded ? "" : "line-clamp-4"
          }`}
        >
          {book.tableOfContents?.length ? (
            book.tableOfContents.map((item, index) => (
              <p key={index}>{item}</p>
            ))
          ) : (
            <p>-</p>
          )}
        </div>
      </section>

      {/* 기본 정보 */}
      <section>
        <p className="text-title-02 font-semibold mb-4">기본 정보</p>

        <div className="space-y-2 text-gray-500 text-body-03">
          <div className="flex">
            <span className="w-20">출판사</span>
            <span>{book.publisherName || "-"}</span>
          </div>

          <div className="flex">
            <span className="w-20">ISBN</span>
            <span>{book.isbn13 || book.isbn10 || "-"}</span>
          </div>

          <div className="flex">
            <span className="w-20">출판 연도</span>
            <span>{book.publishedDate?.slice(0, 4) || "-"}</span>
          </div>
        </div>
        </section>

    </div>
  );
}

export default BookInfo;
