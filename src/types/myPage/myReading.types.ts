export interface ReadingStatusResponse {
  month: string;
  progressPercent: number;
  dayProgress: {
    currentDay: number;
    lastDay: number;
  };
  topMoodTags: string[];
  aiSummary: string;
}


export type ReadingCalendarDayDto = {
  date: string; // "2026-01-01"
  thumbnailUrl: string;
};

export type ReadingCalendarResponse = {
  month: string; // "2026-01"
  days: ReadingCalendarDayDto[];
};
