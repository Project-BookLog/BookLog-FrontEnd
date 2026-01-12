// src/components/booktag/BookTagAtButton.tsx
type Props = {
  onClick?: () => void;
};

export default function BookTagAtButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex items-center justify-center
        h-[33px] w-[46px]
        rounded-[20px]
        bg-black/40
        backdrop-blur-[20px]
      "
      aria-label="책 태그"
    >
      <span className="text-body-01-sb text-white">@</span>
    </button>
  );
}
