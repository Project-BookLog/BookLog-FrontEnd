import type { BookLog } from "../../../types/booklog.types";

type BookLogCardProps = BookLog & {
  isLast?: boolean;
};

function BookLogCard({
  id,
  userId,
  userName,
  content,
  uploadImg,
  tags,
  UserIcon,
  isLast,
}: BookLogCardProps) {
 
  return (
    <div
      key={id}
      className={`w-65 bg-gray-100 p-4 rounded-lg flex-shrink-0 ${
        isLast ? "me-10" : ""
      }`}
    >
      <div className="flex justify-between">
        {/* 유저영역 */}
        <div className="flex gap-3 mb-3 ">
          <UserIcon className="w-10 h-10" />
          <div>
            <div className="text-subtitle-01-sb">{userName}</div>
            <div className="text-en-caption-02 text-gray-600">@{userId}</div>
          </div>
        </div>

        <div>
          <button className="w-14 h-8 bg-white rounded-sm text-caption-01 text-gray-800">
            팔로우
          </button>
        </div>
      </div>

      <div className="text-caption-02 text-gray-800">{content}</div>

      {uploadImg && (
        <div className="mt-3 flex gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-md text-caption-02">
            img
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-md text-caption-02">
            img
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-md text-caption-02">
            img
          </div>
        </div>
      )}

      {/* 태그들 */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="text-primary text-caption-02 rounded-sm bg-lightblue-1 px-2 py-1"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookLogCard;
