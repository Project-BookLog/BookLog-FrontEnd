import { useEffect, useRef } from "react";
import { CheckIcon, Vector } from "../../assets/icons";
import { BOOK_ORDER, sortOptions } from "../../enum/book";

type SortDropDownProps = {
  currentSort: BOOK_ORDER;
  onSelectSort: (sort: BOOK_ORDER) => void;
  onClose: () => void;
};

export function SortDropDown({ currentSort, onSelectSort, onClose }: SortDropDownProps) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, [onClose]);

  return (
      <div
        ref={ref}
        className="absolute top-full right-4 mt-3 z-50 flex w-[154px] px-5 py-2 flex-col items-center gap-[2px] rounded-[12px] bg-white"
      >
        {sortOptions.map((option, index) => (
          <div className="w-full flex flex-col">
            <button
              key={option.value}
              className="flex py-2 justify-between items-center self-stretch cursor-pointer"
              onClick={() => {
                onSelectSort(option.value);
                onClose();
              }}
            >
              <p className="text-gray-900 text-subtitle-02-m">{option.label}</p>
              {currentSort === option.value && <CheckIcon className="w-4 h-4"/>}
            </button>
            {index !== sortOptions.length - 1 && (
              <div className="h-0 self-stretch stroke-[1px] stroke-gray-200">
                <Vector/>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

