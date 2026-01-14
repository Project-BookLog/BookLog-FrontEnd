type Tab = "전체" | "작가" | "도서";

type TabsProps = {
  active: Tab;
  onChange: (tab: Tab) => void;
};


const TABS = ["전체", "작가", "도서"] as const;

function SearchTabs({ active, onChange }: TabsProps) {
  return (
    <nav className="flex justify-start px-2 gap-6 text-subtitle-01-sb h-10">
      {TABS.map((tab) => {
        const isActive = tab === active;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={[
              "border-b-2",
              isActive
                ? "font-semibold text-primary border-primary"
                : "border-transparent text-gray-400",
            ].join(" ")}
          >
            {tab}
          </button>
        );
      })}
    </nav>
  );
}


export default SearchTabs;
