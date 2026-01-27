import { useState } from "react";
import { BackIcon } from "../../../assets/icons";

const AWARDS = [
  { year: "2022", text: "제30회 대산문학상 소설부문(작별하지 않는다)" },
  { year: "2019", text: "제24회 아르세비스포 후안 데 산 클레멘테 문학상" },
  { year: "2018", text: "제12회 김유정문학상" },
  { year: "2024", text: "노벨문학상(소년이 온다)" },
  { year: "2023", text: "메디치 외국문학상(작별하지 않는다)" },
  { year: "2017", text: "test" },
];

function AuthorAwards() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleAwards = isExpanded ? AWARDS : AWARDS.slice(0, 5);
  const hasMoreThanFive = AWARDS.length > 5;

  return (
    <div className="px-6 my-8 space-y-10">
      <section>
        <div>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-title-02 font-semibold">수상경력</p>

            {hasMoreThanFive && (
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                <BackIcon
                  className={`w-5 h-5 transition-transform ${
                    isExpanded ? "rotate-90" : "rotate-270"
                  }`}
                />
              </button>
            )}
          </div>

          <div className="space-y-2 text-gray-500 text-body-03">
            {visibleAwards.map((award) => (
              <div key={award.year + award.text} className="flex">
                <span className="w-20">{award.year}</span>
                <span>{award.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AuthorAwards;
