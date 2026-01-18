import { createContext, useState } from "react";

export type Mood = "따뜻한" | "잔잔한" | "유쾌한" | "어두운" | "서늘한" | "몽환적인" | null;
export type Style = "간결한" | "화려한" | "담백한" | "섬세한" | "직설적" | "은유적" | null;
export type Immersion = "기분 전환" | "지적인 탐구" | "압도적 몰입" | "짙은 여운" | null;


export type FilterState = {
  mood: Mood;
  style: Style;
  immersion: Immersion;
};

type FilterContextValue = {
  filter: FilterState;
  setFilter: (next: FilterState) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const initialFilterState: FilterState = {
  mood: null,
  style: null,
  immersion: null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<FilterState>(initialFilterState);
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}
