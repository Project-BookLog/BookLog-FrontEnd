type TabsProps = {
  active: string;
  onChange: (tab: string) => void;
};

const TABS = ["책 추천", "책 정보", "북로그"];

function Tabs({ active, onChange }: TabsProps) {
  return (
    <nav className="flex justify-start gap-5 text-sm h-[50px] bg-bg">
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
