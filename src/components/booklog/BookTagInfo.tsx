// src/components/booktag/BookTagInfo.tsx
type Props = {
  title: string;
  author: string;
};

export default function BookTagInfo({ title, author }: Props) {
  return (
    <div
      className="
        flex items-center gap-[10px]
        h-[33px]
        px-[16px]
        rounded-[20px]
        bg-black/40
        backdrop-blur-[20px]
      "
    >
      <span className="text-body-01-sb text-white whitespace-nowrap">
        {title}
      </span>
      <span className="text-caption-01 text-white/80 whitespace-nowrap">
        {author}
      </span>
    </div>
  );
}
