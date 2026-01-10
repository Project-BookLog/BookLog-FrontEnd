import { Reset } from "../../assets/icons";

type RecommendedSearchesProps = {
  title?: string;
  items: string[];
  onClickItem?: (keyword: string) => void;
  onRefresh?: () => void;
};

function RecommendedSearches({
  title = "추천 검색어",
  items,
  onClickItem,
}: RecommendedSearchesProps) {

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <span className="text-subtitle-02-m text-black">
          {title}
        </span>

        <button
          type="button"
        >
          <Reset className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((keyword) => (
          <button
            key={keyword}
            type="button"
            onClick={() => onClickItem?.(keyword)}
            className="h-9 inline-flex items-center rounded-full bg-lightblue-3 px-3 py-1 text-caption-01 text-primary"
          >
            {keyword}
          </button>
        ))}
      </div>
    </section>
  );
}

export default RecommendedSearches;
