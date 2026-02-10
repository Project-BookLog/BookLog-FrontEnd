import { useState } from "react";
import { Default_BookImg } from "../../assets/icons";
import type { BestsellerSection } from "../../types/home/home.types";
import { useNavigate } from "react-router-dom";

const TAGS = {
  mood: ["따뜻한", "잔잔한", "유쾌한", "어두운", "서늘한"],
  writingStyle: ["간결한", "화려한", "담백한", "섬세한", "직설적"],
  immersion: ["기분 전환", "지적인 탐구", "압도적 몰입", "짙은 여운"],
};

type SectionType = "mood" | "writingStyle" | "immersion";
interface BestSellerProps {
  type: SectionType;
  title: string;
  subtitle: string;
  sections: BestsellerSection[];
}

const truncateText = (
  text: string | null,
  visibleLength: number,
  fallback = "-"
) => {
  if (!text) return fallback;

  if (text.length <= visibleLength) return text;

  return text.slice(0, visibleLength - 1) + "...";
};

const formatAuthor = (author: string | null) => {
  if (!author) return "-";

  const firstAuthor = author.split(",")[0].trim();
  return truncateText(firstAuthor, 5);
};


function BestSeller({ type, title, subtitle, sections }: BestSellerProps) {
  const navigate = useNavigate();
  
  const [active, setActive] = useState(0);
  const tags = TAGS[type];
  const activeTag = tags[active];
  const activeSection = sections.find(
    (section) => section.tagName === activeTag
  )

  const books = activeSection?.books ?? [];

  const handleClickBook = (bookId: number) => {
    navigate(`/book/${bookId}`);
  }
  
  return (
    <section className="space-y-3">
      <div className="px-5">
        <h2 className="text-title-02 text-[#000000]">{title}</h2>
        <p className="text-body-03 text-gray-700">{subtitle}</p>
      </div>


      {/* 태그*/}
      <div className="overflow-x-auto no-scrollbar pl-5">
        <div className="flex flex-nowrap gap-2 text-body-01-m">
          {tags.map((label, index) => (
            <button
              key={label}
              onClick={() => setActive(index)}
              className={`shrink-0 px-3 py-1 h-9 rounded-full ${
                index === active
                  ? "bg-black text-white border-black"
                  : "bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>



      <div className="overflow-x-auto no-scrollbar px-5">
        <div className="grid grid-rows-3 auto-cols-[220px] grid-flow-col gap-y-3 gap-x-1.5 py-2">
        {books.map((book) => (
          <div
            key={book.bookId} //ranking 값 생기면 교체예정
            onClick={() => handleClickBook(book.bookId)} 
            className="w-[220px] items-center flex gap-3"
          >
            {/* 책 표지 */}
            <div className="w-[80px] h-[104px] flex-shrink-0 overflow-hidden rounded flex items-center justify-center bg-gray-200">
              {book.coverImageUrl ? (
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="block w-full h-full object-cover"
                />
              ) : (
                <Default_BookImg className="w-full h-full object-cover" />
              )}
            </div>


            {/* 책 정보 */}
            <div className="mt-2 flex items-start space-x-2">
              <div className="w-3">
                <p className="text-subtitle-02-sb text-black truncate">
                  {book.ranking ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-subtitle-02-sb truncate">
                  {truncateText(book.title, 8)}
                </p>
                <p className="text-caption-02 text-gray-700 truncate">
                  {formatAuthor(book.author)}<span className="text-gray-500"> | </span>{truncateText(book.publisher, 5)}
                </p>
              </div>
            </div>
          </div>
        ))}


        </div>
      </div>


    </section>
  );
}

export default BestSeller;
