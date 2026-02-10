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
  date: string;
  thumbnailUrl: string;
};

export type ReadingCalendarResponse = {
  month: string;
  days: ReadingCalendarDayDto[];
};

export interface ReadingCalendarStatusResponse {
  month: string;
  progressPercent: number; 
  dayProgress: {
    currentDay: number; 
    lastDay: number; 
  };
  topMoodTags: string[]; 
  aiSummary: string; 
}
