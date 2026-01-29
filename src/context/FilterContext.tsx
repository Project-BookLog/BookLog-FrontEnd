import { createContext, useState } from "react";

export type Mood = "따뜻한" | "잔잔한" | "유쾌한" | "어두운" | "서늘한" | "몽환적인";
export type Style = "간결한" | "화려한" | "담백한" | "섬세한" | "직설적" | "은유적";
export type Immersion = "기분 전환" | "지적인 탐구" | "압도적 몰입" | "짙은 여운";

export type FilterState = {
  mood: Mood[];
  style: Style[];
  immersion: Immersion[];
};

export type FilterScope = "search" | "author" | "booklog" | "booklogWrite";

export type PageInfo = {
  returnUrl: string;
  preserveQuery?: string[];
};

export type FilterContextValue = {
  getFilter: (scope: FilterScope) => FilterState;
  setFilter: (scope: FilterScope, next: FilterState) => void;
  toggleFilter: (
    scope: FilterScope,
    key: keyof FilterState,
    value: Mood | Style | Immersion
  ) => void;
  resetFilter: (scope: FilterScope) => void;
  getPageInfo: (scope: FilterScope) => PageInfo | null;
  setPageInfo: (scope: FilterScope, info: PageInfo | null) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const initialFilterState: FilterState = {
  mood: [],
  style: [],
  immersion: [],
};

const createEmptyFilterState = (): FilterState => ({
  mood: [],
  style: [],
  immersion: [],
});

// eslint-disable-next-line react-refresh/only-export-components
export const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Record<FilterScope, FilterState>>({
    search: createEmptyFilterState(),
    author: createEmptyFilterState(),
    booklog: createEmptyFilterState(),
    booklogWrite: createEmptyFilterState(),
  });
  const [pageInfos, setPageInfos] = useState<Record<FilterScope, PageInfo | null>>({
    search: null,
    author: null,
    booklog: null,
    booklogWrite: null,
  });

  const getFilter = (scope: FilterScope) => filters[scope];

  const setFilter = (scope: FilterScope, next: FilterState) => {
    setFilters((prev) => ({ ...prev, [scope]: next }));
  };

  const toggleFilter = (
    scope: FilterScope,
    key: keyof FilterState,
    value: Mood | Style | Immersion
  ) => {
    setFilters((prev) => {
      const current = prev[scope][key] as string[];
      const newValue = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [scope]: { ...prev[scope], [key]: newValue } };
    });
  };

  const resetFilter = (scope: FilterScope) => {
    setFilters((prev) => ({ ...prev, [scope]: createEmptyFilterState() }));
  };

  const getPageInfo = (scope: FilterScope) => pageInfos[scope];

  const setPageInfo = (scope: FilterScope, info: PageInfo | null) => {
    setPageInfos((prev) => ({ ...prev, [scope]: info }));
  };

  return (
    <FilterContext.Provider
      value={{
        getFilter,
        setFilter,
        toggleFilter,
        resetFilter,
        getPageInfo,
        setPageInfo,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
