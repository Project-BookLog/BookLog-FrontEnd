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

    </div>
  );
}

export default BookInfo;
