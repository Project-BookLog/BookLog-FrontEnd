import { Dummy_book, CircleArrow } from "../../assets/icons";

type LikeCardProps = {
  title: string;
  description: string;
};

function LikeCard({ title, description }: LikeCardProps) {
  return (
    <div className="relative rounded-2xl bg-slate-900 text-white px-6 py-5 mt-2 mx-1 overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 opacity-90 blur-[80px] pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <Dummy_book className="w-[170%] h-[170%]" />
        </div>
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-[#000000]/50 pointer-events-none" />

      {/* 이동 버튼 */}
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-[12px]] bg-black/20 p-1"
        // onClick={...} 
      >
        <CircleArrow className="w-8 h-8" />
      </button>

      {/* 내용 */}
      <div className="relative">
        {/* 타이틀 */}
        <div className="text-subtitle-01-sb">
          내가 좋아하는 {title}
        </div>
        <div className="text-body-03 text-gray-300">
          {description}
        </div>

        <div className="flex flex-col items-center gap-3">
          <Dummy_book className="w-[92px] h-35 mt-3"/>

          {/* 정보 */}
          <div className="w-full">
            <div className="text-center mb-2">
              <div className="text-subtitle-02-sb">소년이 온다</div>
              <div className="text-caption-02 text-gray-200">
                한강 저<span className="text-gray-400"> | </span>출판사
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap justify-center gap-2 mb-2 mt-3 text-caption-02">
              {["잔잔한", "사유적", "생각이 필요한"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="px-2 py-1.5 rounded-[4px] bg-white/12 text-caption-02 text-white"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikeCard;
