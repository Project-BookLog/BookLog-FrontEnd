type Props = {
  label: string;
  onClick?: () => void;
  active?: boolean;
};

export default function FilterChip({ label, onClick, active = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center
        h-[36px]
        rounded-[20px]
        border
        pl-[16px] pr-[12px] py-[8px]
        gap-[6px]
        text-en-body-01
        whitespace-nowrap
        transition-colors duration-200 ease-out
        ${active ? "bg-black text-white" : "bg-transparent border-[#E7E5E4] text-[#676665]"}
      `}
    >
      <span className="leading-none">{label}</span>

      <svg width="22" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
        <path
          d="M1 1L6 6L11 1"
          stroke={active ? "#FFFFFF" : "#676665"}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
