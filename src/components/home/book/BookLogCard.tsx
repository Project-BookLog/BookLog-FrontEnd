import type { BookRelatedBooklog } from "../../../types/home/detail.types";

type BookLogCardProps = BookRelatedBooklog & {
  isLast?: boolean;
};

function BookLogCard({
  postId,
  author,
  content,
  images,
  tags,
  isLast,
}: BookLogCardProps) {

 
  return (
    <div
      key={postId}
      className={`w-65 bg-gray-100 p-4 rounded-lg flex-shrink-0 ${
        isLast ? "me-10" : ""
      }`}
    >
      <div className="flex justify-between">
        {/* 유저영역 */}
        <div className="flex gap-3 mb-3 ">
          <img src={author.profileImageUrl} className="w-10 h-10" />
          <div>
            <div className="text-subtitle-01-sb">{author.nickname}</div>
            <div className="text-en-caption-02 text-gray-600">@{author.userId}</div>
          </div>
        </div>

        <div>
          <button className="w-14 h-8 bg-white rounded-sm text-caption-01 text-gray-800">
            {author.followedByMe ? "팔로잉" : "팔로우"}
          </button>
        </div>
      </div>

      <div className="text-caption-02 text-gray-800">{content}</div>

      {images.length > 0 && (
        <div className="mt-3 flex gap-2">
          {images
            .sort((a, b) => a.order - b.order)
            .slice(0, 3)
            .map(img => (
              <img
                key={img.imageId}
                src={img.imageUrl}
                className="w-8 h-8 rounded-md object-cover"
              />
            ))}
        </div>
      )}

      {/* 태그들 */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.tagId}
            className="text-primary text-caption-02 rounded-sm bg-lightblue-1 px-2 py-1"
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookLogCard;
