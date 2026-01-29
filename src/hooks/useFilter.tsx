import { useContext } from "react";
import {
  FilterContext,
  type FilterContextValue,
  type FilterScope,
  type FilterState,
  type Mood,
  type Style,
  type Immersion,
  type PageInfo,
} from "../context/FilterContext";

export type ScopedFilterContextValue = {
  filter: FilterState;
  setFilter: (next: FilterState) => void;
  toggleFilter: (key: keyof FilterState, value: Mood | Style | Immersion) => void;
  resetFilter: () => void;
  setPageInfo: (info: PageInfo | null) => void;
  pageInfo: PageInfo | null;
};

export function useFilter(scope: FilterScope): ScopedFilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within FilterProvider");
  }

  const {
    getFilter,
    setFilter,
    toggleFilter,
    resetFilter,
    getPageInfo,
    setPageInfo,
  } = context as FilterContextValue;

  return {
    filter: getFilter(scope),
    setFilter: (next) => setFilter(scope, next),
    toggleFilter: (key, value) => toggleFilter(scope, key, value),
    resetFilter: () => resetFilter(scope),
    pageInfo: getPageInfo(scope),
    setPageInfo: (info) => setPageInfo(scope, info),
  };
}
