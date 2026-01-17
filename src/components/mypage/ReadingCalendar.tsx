import { BackIcon } from "../../assets/icons";
import { useMemo } from "react";

interface ReadBook {
  id: number;
  date: string;
  coverImage: string;
}

const booksrc = "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936434595.jpg";

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

function ReadingCalendar() {
  const currentYear = 2026;
  const currentMonth = 1; 

  const daysInMonth = 31;
  const firstDayWeekday = 4; 

  const monthDays = useMemo((): CalendarDay[] => {
    const days: CalendarDay[] = [];
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push({ date: 0, hasBook: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const book = dummyBooks.find(b => b.date === dateKey);
      days.push({ date: day, hasBook: !!book, book });
    }
    return days;
  }, []);

  const weeks = useMemo((): CalendarDay[][] => {
    const rows: CalendarDay[][] = [];
    for (let i = 0; i < monthDays.length; i += 7) {
      rows.push(monthDays.slice(i, i + 7));
    }
    return rows;
  }, [monthDays]);

  return (
    <div className="bg-bg">
      {/* 제목 영역 */}
      <header className="mb-3.5 flex justify-between">
        <p className="text-title-02">독서 캘린더</p>
        <button
          type="button"
          className="flex items-center gap-0.5 text-gray-500 text-body-03"
        >
          <span>전체보기</span>
          <BackIcon className="rotate-180 w-[14px] h-[14px]" />
        </button>
      </header>

      {/* 내용 영역 */}
      <section className="w-full">
        {/* 요일 */}
        <div className="grid grid-cols-7 gap-1">
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <p key={day} className="w-11 text-subtitle-02-m text-gray-700 text-center leading-none">
              {day}
            </p>
          ))}
        </div>
        <hr className="border-gray-100 my-3 " />

        {/* 날짜 그리드 */}
        <div className="space-y-3">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7 gap-x-1 gap-y-3 ">
              {week.map(({ date, hasBook, book }, dayIdx) => (
                <div 
                  key={dayIdx}
                  className={`relative w-11 ${
                    hasBook ? 'h-[74px]' : 'h-[18px]'
                  }`}
                >
                  {/* 날짜 */}
                  <div className="flex justify-center h-[30px]" >
                    {date > 0 && (
                      <p className="text-body-03 text-gray-600 leading-none">
                        {date}
                      </p>
                    )}
                  </div>
                  
                  {/* 책 이미지 */}
                  {hasBook && book && (
                    <div className="flex justify-center absolute w-11 h-14 absolute bottom-0 left-0 right-0 h-14 overflow-hidden">
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
