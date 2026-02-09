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

  //이미지컷 
  const totalImages = images.length;
  const visibleImages = totalImages <= 4 ? images : images.slice(0, 3);
  const remainCount = totalImages > 4 ? totalImages - 3 : 0;



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
          <img src={author.profileImageUrl} alt={`${author.nickname} 프로필`}  className="w-10 h-10 rounded-full" />
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

      <div className="text-caption-02 text-gray-800 break-words whitespace-pre-wrap">{content}</div>

      {totalImages > 0 && (
        <div className="mt-3 flex gap-2">
          {visibleImages.map(img => (
            <img
              key={img.imageId}
              src={img.imageUrl}
              className="w-[54px] h-[54px] rounded-[7.2px] object-cover"
            />
          ))}

          {remainCount > 0 && (
            <div className="relative rounded-md overflow-hidden">
              <img
                src={images[3].imageUrl}
                className="w-[54px] h-[54px] rounded-[7.2px] object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-caption-02 font-semibold">
                +{remainCount}
              </div>
            </div>
          )}
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
