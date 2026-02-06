export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate(); 
}

export function getFirstDayWeekday(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay(); // 0(일)~6(토) 
}

export function getCurrentYearMonth() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
}

/** API용 month 문자열 (YYYY-MM) */
export function getCurrentMonthString() {
  const { year, month } = getCurrentYearMonth();
  return `${year}-${String(month).padStart(2, "0")}`;
}