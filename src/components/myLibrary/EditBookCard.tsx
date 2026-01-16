import type { Book } from "../../types/book.types";
import { BookCard } from "./BookCard";
import { EditCheckBox } from "./EditCheckBox";

interface EditBookCardProps {
  book: Book;
  selected: boolean;
  onToggle: () => void;
}

export default function EditBookCard({
  book,
  selected,
  onToggle,
}: EditBookCardProps) {
  return (
    <div
      className="relative w-[104px] shrink-0 cursor-pointer"
      onClick={onToggle}
    >
      <BookCard book={book} />

      <div
        className="absolute top-2 right-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <EditCheckBox checked={selected} />
      </div>
    </div>
  );
}