import { useMemo } from "react";
import { getDaysInMonth, getFirstDayWeekday } from "../../utils/date";

interface ReadBook {
  id: number;
  date: string;
  coverImage: string;
}

const booksrc =
  "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936434595.jpg";

const dummyBooks: ReadBook[] = [
  { id: 1, date: "2026-01-03", coverImage: booksrc },
  { id: 2, date: "2026-01-10", coverImage: booksrc },
  { id: 3, date: "2026-01-15", coverImage: booksrc },
  { id: 4, date: "2026-01-28", coverImage: booksrc },
  { id: 5, date: "2026-01-29", coverImage: booksrc },
];

type CalendarDay = {
  date: number;
  hasBook: boolean;
  book?: ReadBook;
};

type ReadingCalendarProps = {
  year: number;
  month: number;
};

function ReadingCalendar({ year, month }: ReadingCalendarProps) {
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayWeekday = getFirstDayWeekday(year, month);

  const monthDays = useMemo((): CalendarDay[] => {
    const days: CalendarDay[] = [];

    // 앞쪽 공백
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push({ date: 0, hasBook: false });
    }

    // 실제 날짜
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const book = dummyBooks.find((b) => b.date === dateKey);
      days.push({ date: day, hasBook: !!book, book });
    }

    return days;
  }, [year, month, daysInMonth, firstDayWeekday]);

  const weeks = useMemo((): CalendarDay[][] => {
    const rows: CalendarDay[][] = [];
    for (let i = 0; i < monthDays.length; i += 7) {
      rows.push(monthDays.slice(i, i + 7));
    }
    return rows;
  }, [monthDays]);

  return (
    <div className="bg-bg">
      <section className="w-full">
        {/* 요일 */}
        <div className="grid grid-cols-7 gap-1 pt-3">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <p
              key={day}
              className="w-11 text-subtitle-02-m text-gray-700 text-center leading-none"
            >
              {day}
            </p>
          ))}
        </div>
        <hr className="border-gray-100 my-3 " />

        {/* 날짜 그리드 */}
        <div className="space-y-3">
          {weeks.map((week, weekIdx) => (
            <div
              key={weekIdx}
              className="grid grid-cols-7 gap-x-1 gap-y-3 "
            >
              {week.map(({ date, hasBook, book }, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`relative w-11 ${
                    hasBook ? "h-[74px]" : "h-[18px]"
                  }`}
                >
                  {/* 날짜 */}
                  <div
                    className={`flex justify-center ${
                      hasBook ? "h-[30px]" : "h-[18px]"
                    }`}
                  >
                    {date > 0 && (
                      <p className="text-body-03 text-gray-600 leading-none">
                        {date}
                      </p>
                    )}
                  </div>

                  {/* 책 이미지 */}
                  {hasBook && book && (
                    <div className="flex justify-center absolute w-11 h-14 bottom-0 left-0 right-0 overflow-hidden">
                      <img
                        src={book.coverImage}
                        alt={`책 ${book.id}`}
                        className="w-[35px] h-[50px] mt-[6px] object-cover rounded-[4px]"
                      />
                    </div>
                  )}
                </div>
              ))}
              {/* 주마다 하단선 */}
              <hr className="col-span-7 border-gray-100" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ReadingCalendar;
