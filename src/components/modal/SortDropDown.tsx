import { CheckIcon, Vector } from "../../assets/icons";
import { BOOK_ORDER, sortOptions } from "../../enum/book";

type SortModalProps = {
  currentSort: BOOK_ORDER;
  onSelectSort: (sort: BOOK_ORDER) => void;
  onClose: () => void;
};

export function SortDropDown({ currentSort, onSelectSort, onClose }: SortModalProps) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/10 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="absolute flex w-[154px] px-5 py-2 flex-col items-center gap-[2px] rounded-[12px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {sortOptions.map((option, index) => (
          <div key={option.value} className="w-full flex flex-col">
            <button
              key={option.value}
              className="flex py-2 justify-between items-center self-stretch"
              onClick={() => onSelectSort(option.value)}
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
    </div>
  );
}

