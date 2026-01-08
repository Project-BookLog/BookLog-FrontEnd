import { Dummy_book, CircleArrow } from "../../assets/icons";

type LikeCardProps = {
  title: string;
  description: string;
};

function LikeCard({ title, description }: LikeCardProps) {
  return (
    <div className="relative rounded-2xl bg-slate-900 text-white px-6 py-5 mt-2 mx-1 overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 opacity-90 blur-sm pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <Dummy_book className="w-[170%] h-[170%]" />
        </div>
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* 이동 버튼 */}
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-1"
        // onClick={...} 
      >
        <CircleArrow className="w-8 h-8" />
      </button>

      {/* 내용 */}
      <div className="relative">
        {/* 타이틀 */}
        <div className="text-[16px] font-semibold">
          내가 좋아하는 {title}
        </div>
        <div className="text-[12px] text-gray-300 mb-3">
          {description}
        </div>

        <div className="flex flex-col items-center gap-3">
          <Dummy_book />

          {/* 정보 */}
          <div className="w-full">
            <div className="text-center mb-2">
              <div className="text-[15px] font-medium">소년이 온다</div>
              <div className="text-[11px] text-gray-600">
                한강 저 | 출판사
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap justify-center gap-2 mb-2 mt-3">
              {["잔잔한", "사유적", "생각이 필요한"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="px-2 py-1 rounded-md bg-white/12 text-[11px]"
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
