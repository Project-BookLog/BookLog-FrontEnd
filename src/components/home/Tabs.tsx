type TabsProps = {
  active: string;
  onChange: (tab: string) => void;
};

const TABS = ["홈", "실시간 랭킹", "분위기별", "문체별", "몰입도별"];

function Tabs({ active, onChange }: TabsProps) {
  return (
    <nav className="flex justify-between text-sm h-[50px]">
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

export default Tabs;
