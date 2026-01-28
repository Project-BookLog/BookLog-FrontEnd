type TabsAlign = "start" | "between";

type TabsProps<T extends string> = {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  align?: TabsAlign;
};

function Tab<T extends string>({
  tabs,
  active,
  onChange,
  align = "start",
}: TabsProps<T>) {
  const baseNav = "flex h-[50px]";

  const alignClass: Record<TabsAlign, string> = {
    start: "justify-start",
    between: "justify-between",
  };

  const variantClass = "bg-bg gap-5";
  const activeClass = "text-subtitle-01-sb text-primary";
  const inactiveClass = "text-subtitle-01-m border-transparent text-gray-500";

  return (
    <nav className={`${baseNav} ${alignClass[align]} ${variantClass}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`border-b-2 ${
            tab === active ? activeClass : inactiveClass
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}

export default Tab;
