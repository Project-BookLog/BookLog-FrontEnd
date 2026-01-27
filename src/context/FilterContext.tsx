import { createContext, useState } from "react";

export type Mood = "따뜻한" | "잔잔한" | "유쾌한" | "어두운" | "서늘한" | "몽환적인";
export type Style = "간결한" | "화려한" | "담백한" | "섬세한" | "직설적" | "은유적";
export type Immersion = "기분 전환" | "지적인 탐구" | "압도적 몰입" | "짙은 여운";

export type FilterState = {
  mood: Mood[];
  style: Style[];
  immersion: Immersion[];
};

export type FilterContextValue = {
  filter: FilterState;
  setFilter: (next: FilterState) => void;
  toggleFilter: (key: keyof FilterState, value: Mood | Style | Immersion) => void;
  resetFilter: () => void;  
  setPageInfo: (info: { returnUrl: string; preserveQuery?: string[] }) => void;
  pageInfo: { returnUrl: string; preserveQuery?: string[] } | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const initialFilterState: FilterState = {
  mood: [],
  style: [],
  immersion: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<FilterState>(initialFilterState);
  const [pageInfo, setPageInfo] = useState<{ returnUrl: string; preserveQuery?: string[] } | null>(null);

  const toggleFilter = (
    key: keyof FilterState,
    value: Mood | Style | Immersion
  ) => {
    setFilter(prev => {
      const current = prev[key] as string[];
      const newValue = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: newValue };
    });
  };


  const resetFilter = () => {
    setFilter(initialFilterState);
  };

  return (
    <FilterContext.Provider value={{ filter, setFilter, toggleFilter, resetFilter, pageInfo, setPageInfo }}>
      {children}
    </FilterContext.Provider>
  );
}
