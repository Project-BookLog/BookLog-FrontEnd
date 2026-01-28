import { useState } from "react";
import { BOOKS } from "../../data/book.mock";

const TABS = {
  mood: ["잔잔한", "묵직한", "따뜻한", "서늘한", "몽환적"],
  writingStyle: ["간결한", "묘사적인", "사유적인", "대화형", "실험적"],
  immersion: ["순한 몰입", "완전집중형", "몰입도 높은", "길이 짧은"],
};

type SectionType = "mood" | "writingStyle" | "immersion";
interface BestSellerSectionProps {
  type: SectionType;
  title: string;
  subtitle: string;
}

function BestSeller({ type, title, subtitle }: BestSellerSectionProps) {
  const [active, setActive] = useState(0);
  const categories = TABS[type];


  const books = BOOKS;
  
  return (
    <section className="space-y-3">
      <div className="px-5">
        <h2 className="text-title-02 text-[#000000]">{title}</h2>
        <p className="text-body-03 text-gray-700">{subtitle}</p>
      </div>


      {/* 태그*/}
      <div className="overflow-x-auto no-scrollbar pl-5">
        <div className="flex flex-nowrap gap-2 text-body-01-m">
          {categories.map((label, index) => (
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
            key={book.id}
            className="w-[220px] items-center flex gap-3"
          >
            {/* 책 표지 */}
            <div className="w-20 h-26 overflow-hidden rounded flex items-center justify-center">
              <book.CoverIcon className="w-full  object-cover" />
            </div>

            {/* 책 정보 */}
            <div className="mt-2 flex items-start space-x-2">
              <div className="w-3">
                <p className="text-subtitle-02-sb text-black truncate">
                  {book.id}
                </p>
              </div>
              <div>
                <p className="text-subtitle-02-sb truncate">
                  {book.title}
                </p>
                <p className="text-caption-02 text-gray-700 truncate">
                  {book.author}<span className="text-gray-500"> | </span>{book.publisher}
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
