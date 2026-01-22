type BookContentProps = {
  title: string;
  author: string;
  publisher?: string;
  tags?: string[]; // ✅ 태그 선택
};

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[4px] bg-[#E4E5F0] px-[8px] py-[3px] text-caption-02 font-medium text-[#3049C0]">
      {children}
    </span>
  );
}

export default function BookContent({
  title,
  author,
  publisher,
  tags,
}: BookContentProps) {
  return (
    <div className="h-full w-[240px] rounded-[12px] bg-[#EFEDEB] px-[12px] py-[16px]">
      {/* 책 이미지 */}
      <div className="mx-auto h-[140px] w-[92px] rounded-[4px] bg-[#CDCCCB] grid place-items-center text-caption-01 text-[#0A0A0A]">
        책 img
      </div>

      {/* 책 정보 */}
      <div className="mt-2.5 text-center">
        <div className="text-body-01-sb text-[#4D4D4C]">
          {title}
        </div>
        <div className="mt-[2px] text-en-caption-02 text-[#81807F]">
          {author}
          {publisher ? ` | ${publisher}` : ""}
        </div>
      </div>

      {/* 태그 (있을 때만 렌더링) */}
      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      )}
    </div>
  );
}
