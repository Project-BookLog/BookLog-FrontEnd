import { BackIcon } from "../../assets/icons"; 

type FilterKey = "mood" | "style" | "immersion";

type FilterChip = {
  key: FilterKey;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

interface FilterChipsProps {
  chips: FilterChip[];
  className?: string;
}

export function FilterChips({ chips, className = "" }: FilterChipsProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {chips.map(({ key, label, isActive, onClick }) => (
        <FilterChip
          key={key}
          label={label}
          isActive={isActive}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

function FilterChip({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-full border px-4 py-1",
        "text-body-01-m",
        isActive
          ? "bg-black text-white"
          : "border-gray-200 bg-bg text-gray-700",
      ].join(" ")}
    >
      <span>{label}</span>
      <BackIcon 
        className={
          isActive 
            ? "h-3.5 w-3.5 rotate-270 text-white" 
            : "h-3.5 w-3.5 rotate-270 text-gray-700"
        }
      />
    </button>
  );
}
