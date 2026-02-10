import type { ReadingCalendarStatusResponse } from "../../types/myPage/myReading.types";

type CalendarCommentCardProps = {
  data: ReadingCalendarStatusResponse;
};


function CalendarCommentCard({ data }: CalendarCommentCardProps) {
  const { aiSummary, dayProgress, progressPercent, month } = data;
  return (
    <div className="bg-bg">        
      {/* 내용 영역 */}
      <section className="w-full bg-gray-100 rounded-[12px] p-4">
        {/* subitle */}
        <div className="flex justify-between items-center">
          <div className="w-full text-subtitle-01-sb">{Number(month.split("-")[1])}월의 기록, {progressPercent}%의 몰입</div>
          <div className="text-caption-01 justify-center rounded-full px-3 py-1 h-[25px]">{dayProgress.currentDay}/{dayProgress.lastDay}</div>
        </div>

        {/* content */}
        <div className="mt-2">
          <p className="text-caption-02 text-gray-600">{aiSummary}</p>
        </div>

      </section>
    </div>
  );
}

export default CalendarCommentCard;
