export type TableState<T> = {
  data: T[];
  sortColumn: keyof T | null;
  sortDirection: "asc" | "desc";
  currentPage: number;
  pageSize: number;
};

export type TableAction<T> =
  | { type: "SET_DATA"; payload: T[] }
  | { type: "SET_SORT"; column: keyof T }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number };

export function tableReducer<T>(
  state: TableState<T>,
  action: TableAction<T>,
): TableState<T> {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_SORT":
      return {
        ...state,
        sortColumn: action.column,
        sortDirection:
          state.sortColumn === action.column && state.sortDirection === "asc"
            ? "desc"
            : "asc",
      };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload, currentPage: 1 };
    default:
      return state;
  }
}

export function computeProcessed<T>(state: TableState<T>): {
  processed: T[];
  totalCount: number;
} {
  const sorted = [...state.data];

  if (state.sortColumn !== null) {
    const col = state.sortColumn;
    const dir = state.sortDirection === "asc" ? 1 : -1;
    sorted.sort((a, b) => {
      const av = a[col];
      const bv = b[col];
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }

  const totalCount = sorted.length;
  const start = (state.currentPage - 1) * state.pageSize;
  const processed = sorted.slice(start, start + state.pageSize);
  return { processed, totalCount };
}

import { useEffect, useReducer } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useDataTable<T>(initialData: T[] = []) {
  const [storedPageSize, setStoredPageSize] = useLocalStorage(
    "table-page-size",
    10,
  );

  const [state, dispatch] = useReducer(
    tableReducer as (s: TableState<T>, a: TableAction<T>) => TableState<T>,
    {
      data: initialData,
      sortColumn: null,
      sortDirection: "asc" as const,
      currentPage: 1,
      pageSize: storedPageSize,
    },
  );

  useEffect(() => {
    setStoredPageSize(state.pageSize);
  }, [state.pageSize, setStoredPageSize]);

  const { processed, totalCount } = computeProcessed(state);
  return { state, dispatch, processed, totalCount };
}
