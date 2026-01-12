type Props = {
  label: string;
  onClick?: () => void;
};

export default function FilterChip({ label, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex items-center
        h-[36px]
        rounded-[20px]
        border border-[#E7E5E4]
        bg-transparent
        pl-[16px] pr-[12px] py-[8px]
        gap-[4px]
        text-caption-01
        text-[#676665]
        whitespace-nowrap
      "
    >
      <span className="leading-none">{label}</span>

      <svg width="22" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
        <path
          d="M1 1L6 6L11 1"
          stroke="#676665"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
