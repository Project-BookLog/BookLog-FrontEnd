import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BackIcon } from "../../assets/icons";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import CalendarCommentCard from "../../components/mypage/CalendarCommentCard";
import ReadingCalendar from "../../components/mypage/ReadingCalendar";
import type { ReadingStatusResponse } from "../../types/myPage/myReading.types";
import { getReadingStatus } from "../../api/mypage/myReading";

function ReadingCalendarPage() {
  const today = useMemo(() => new Date(), []);
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1;

  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);

  const isCurrentMonth =
    year === thisYear && month === thisMonth;

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (isCurrentMonth) return;

    if (month === 12) {
      setYear((prevYear) => prevYear + 1);
      setMonth(1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const apiMonth = `${year}-${month
    .toString()
    .padStart(2, "0")}`;

  const formattedTitle = `${year}.${month
    .toString()
    .padStart(2, "0")}`;


  const {
    data: status,
    isLoading: loading,
  } = useQuery<ReadingStatusResponse>({
    queryKey: ["readingStatus", apiMonth],
    queryFn: () => getReadingStatus(apiMonth),
    placeholderData: (prev) => prev, 
  });

  return (
    <div className="bg-bg min-h-screen">
      <NavBarTop
        title="독서 캘린더"
        onBack={() => history.back()}
      />

      <main className="mt-5 pb-10 px-5">
        <section className="mb-5">
          {!loading && status && (
            <CalendarCommentCard data={status} />
          )}
        </section>

        <section>
          <div className="flex justify-between mb-[14px] pt-3 items-center">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex items-center justify-center"
            >
              <BackIcon className="w-5 h-5 text-gray-900" />
            </button>

            <p className="text-title-02 text-black">
              {formattedTitle}
            </p>

            <button
              type="button"
              onClick={handleNextMonth}
              disabled={isCurrentMonth}
              className="flex items-center justify-center disabled:cursor-default"
            >
              <BackIcon
                className={`w-5 h-5 rotate-180 ${
                  isCurrentMonth
                    ? "text-gray-300"
                    : "text-gray-900"
                }`}
              />
            </button>
          </div>

          <ReadingCalendar year={year} month={month} />
        </section>
      </main>
    </div>
  );
}

export default ReadingCalendarPage;
