import { useState } from "react";

type Props = {
  title: string;
  author: string;
};

export default function BookTag({ title, author }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setOpen((v) => !v);
      }}
      className="
        inline-flex items-center
        rounded-[20px]
        bg-black/40
        backdrop-blur-[20px]
        h-[33px]
        shadow-sm
      "
      aria-label="책 태그"
    >
      {open ? (
        // ✅ 책 제목/저자명 태그
        <div className="flex items-center gap-[8px] px-[16px] py-[6px]">
          <span className="text-body-01-sb text-white whitespace-nowrap">
            {title}
          </span>
          <span className="text-en-caption-02 text-[#E7E5E4] whitespace-nowrap">
            {author}
          </span>
        </div>
      ) : (
        // ✅ @ 태그 
        <div className="flex items-center justify-center w-[46px]">
          <span className="text-body-01-sb text-white">@</span>
        </div>
      )}
    </button>
  );
}
