import { useEffect, useState } from "react";
import { getReadingStatus } from "../../api/mypage/myReading";
import type { ReadingStatusResponse } from "../../types/myPage/myReading.types";
import { getCurrentMonthString } from "../../utils/date";

function ReadingStatus() {
  const [status, setStatus] = useState<ReadingStatusResponse | null>(null);

  useEffect(() => {
    const month = getCurrentMonthString(); 
    getReadingStatus(month).then(setStatus);
  }, []);


  if (!status) return null; 

  const { progressPercent, dayProgress, aiSummary, topMoodTags } = status;
 
  return (
    <div className="bg-bg">        
      {/* 제목 영역 */}
      <header className="mb-3.5">
        <p className="text-title-02">독서 현황</p>
      </header>

      {/* 내용 영역 */}
      <section className="w-full bg-gray-100 rounded-[12px] p-4">
        {/* subitle */}
        <div className="flex justify-between items-center">
          <div className="w-full text-subtitle-01-sb">이번 달 독서 현황 {progressPercent}%</div>
          <div className="text-caption-01 bg-white justify-center rounded-full px-3 py-1 h-[25px]">{dayProgress.currentDay}/{dayProgress.lastDay}</div>
        </div>

        {/* content */}
        <div className="mt-2 mb-3">
          <p className="text-caption-02 text-gray-600">{aiSummary}</p>
        </div>

        {/* tag */}
        {topMoodTags.length > 0 && (
          <div className="flex flex-wrap gap-[6px]">
            {topMoodTags.map((tag) => (
              <span
                key={tag}
                className="bg-lightblue-3 text-body-03 text-primary rounded-full px-[14px] py-[5px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ReadingStatus;
