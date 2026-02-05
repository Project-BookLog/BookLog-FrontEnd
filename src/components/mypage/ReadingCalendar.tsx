import { useEffect, useMemo, useState } from "react";
import { getDaysInMonth, getFirstDayWeekday } from "../../utils/date";
import { getReadingCalendar } from "../../api/myReading";
import { LoadingPage } from "../../pages/onboarding/LoadingPage";
import { ErrorPage } from "../../pages/onboarding/ErrorPage";

type CalendarDay = {
  date: number;            // 1~31, 빈칸은 0
  hasBook: boolean;
  thumbnailUrl?: string;
};

type ReadingCalendarProps = {
  year: number;  // 2026
  month: number; // 1~12
};

const pad2 = (n: number) => n.toString().padStart(2, "0");

function ReadingCalendar({ year, month }: ReadingCalendarProps) {
  const [daysDto, setDaysDto] = useState<{ date: string; thumbnailUrl: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ API month 포맷: "YYYY-MM"fq
  const monthKey = useMemo(() => `${year}-${pad2(month)}`, [year, month]);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getReadingCalendar(monthKey);
        if (!alive) return;
        setDaysDto(data.days ?? []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        if (!alive) return;
        setError("독서 캘린더 불러오기 실패");
        setDaysDto([]);
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [monthKey]);

  // ✅ "YYYY-MM-DD" -> thumbnailUrl 빠른 조회용 Map
  const thumbByDate = useMemo(() => {
    const m = new Map<string, string>();
    for (const d of daysDto) m.set(d.date, d.thumbnailUrl);
    return m;
  }, [daysDto]);

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
      const dateKey = `${year}-${pad2(month)}-${pad2(day)}`;
      const thumbnailUrl = thumbByDate.get(dateKey);
      days.push({
        date: day,
        hasBook: !!thumbnailUrl,
        thumbnailUrl,
      });
    }

    return days;
  }, [year, month, daysInMonth, firstDayWeekday, thumbByDate]);

  const weeks = useMemo((): CalendarDay[][] => {
    const rows: CalendarDay[][] = [];
    for (let i = 0; i < monthDays.length; i += 7) {
      rows.push(monthDays.slice(i, i + 7));
    }
    return rows;
  }, [monthDays]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

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
            <div key={weekIdx} className="grid grid-cols-7 gap-x-1 gap-y-3">
              {week.map(({ date, hasBook, thumbnailUrl }, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`relative w-11 ${hasBook ? "h-[74px]" : "h-[18px]"}`}
                >
                  {/* 날짜 */}
                  <div className={`flex justify-center ${hasBook ? "h-[30px]" : "h-[18px]"}`}>
                    {date > 0 && (
                      <p className="text-body-03 text-gray-600 leading-none">{date}</p>
                    )}
                  </div>

                  {/* 책 이미지 */}
                  {hasBook && thumbnailUrl && (
                    <div className="flex justify-center absolute w-11 h-14 bottom-0 left-0 right-0 overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={`${monthKey}-${pad2(date)} 책`}
                        className="w-[35px] h-[50px] mt-[6px] object-cover rounded-[4px]"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
              <hr className="col-span-7 border-gray-100" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ReadingCalendar;
