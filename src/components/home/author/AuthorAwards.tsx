import { useState } from "react";
import { BackIcon } from "../../../assets/icons";
import type { AuthorAward } from "../../../types/home/detail.types";

type Props = {
  awards: AuthorAward[];
};  

function AuthorAwards({ awards }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!awards || awards.length === 0) {
    return (
      <div className="px-6 my-8">
        <p className="text-title-02 text-black mb-4">수상경력</p>
        <p className="text-gray-400 text-body-03">
          -
        </p>
      </div>
    );
  }

  const visibleAwards = isExpanded ? awards : awards.slice(0, 5);
  const hasMoreThanFive = awards.length > 5;

  return (
    <div className="px-6 my-8 space-y-10">
      <section>
        <div>
          <div className="mb-3 flex justify-between items-center">
            <p className="text-title-02 text-black">수상경력</p>

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
            {visibleAwards.map((award, idx) => (
              <div key={idx} className="flex">
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
