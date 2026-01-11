import XIcon from "../../assets/icons/XIcon.svg?react";

type RecentSearchesProps = {
  items: string[];
  onClickItem?: (keyword: string) => void;
  onRemoveItem?: (keyword: string) => void;
  onClearAll?: () => void;
};

function RecentSearches({
  items,
  onClickItem,
  onRemoveItem,
  onClearAll,
}: RecentSearchesProps) {
  const hasItems = items.length > 0;


  const handleRemove = (keyword: string) => {
    if (onRemoveItem) onRemoveItem(keyword);
    else console.log("remove mock:", keyword);
  };

  const handleClear = () => {
    if (onClearAll) onClearAll();
    else console.log("clear all mock");
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <span className="text-subtitle-02-m text-black">
          최근 검색어
        </span>

        <button
          type="button"
          onClick={handleClear}
          className="text-caption-02 text-gray-600"
        >
          전체 삭제
        </button>
      </div>

      {!hasItems ? (
        <p className="text-body-03 text-gray-500">
          최근 검색어가 없습니다.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => onClickItem?.(keyword)}
              className="h-9 inline-flex items-center pl-3 pr-2 py-1 rounded-full bg-gray-100 text-caption-01"
            >
              <span className="mr-1 text-black truncate">
                {keyword}
              </span>

              <span
                className="text-gray-400 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(keyword);
                }}
              >
                <XIcon className="w-5 h-5" />
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentSearches;
