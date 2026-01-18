export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate(); 
}

export function getFirstDayWeekday(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay(); // 0(일)~6(토) 
}
