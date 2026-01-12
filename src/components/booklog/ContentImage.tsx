import BookTag from "./BookTag";

type Props = {
  /** 책 이미지 칸인지(첫 번째) */
  isBook?: boolean;

  /** 실제 이미지 URL 쓰면 여기에 */
  src?: string;

  /** placeholder 텍스트 */
  label?: string;

  /** 책 태그(책칸일 때만 사용) */
  bookTitle?: string;
  bookAuthor?: string;
};

export default function BooklogContentImage({
  isBook = false,
  src,
  label = "img",
  bookTitle = "책 제목",
  bookAuthor = "저자명 저",
}: Props) {
  return (
    <div
      className="
        relative
        w-[140px] h-[140px]
        shrink-0
        rounded-[8px]
        bg-[#CDCCCB]
        overflow-hidden
      "
    >
      {/* 이미지가 있으면 이미지, 없으면 placeholder */}
      {src ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-caption-01 text-[#2B2B2B]">
          {isBook ? "책 img" : label}
        </div>
      )}

      {/* 책 이미지 칸이면 @/책정보 태그 */}
      {isBook && (
        <div className="absolute left-[10px] bottom-[10px]">
          <BookTag title={bookTitle} author={bookAuthor} />
        </div>
      )}
    </div>
  );
}
