import { useEffect } from 'react';
import { useDataTable } from '../hooks/useDataTable';
import type { Column } from '../types/api';
import styles from './DataTable.module.css';

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

export function DataTable<T>({ data, columns }: Props<T>) {
  const { state, dispatch, processed, totalCount } = useDataTable<T>(data);

  useEffect(() => {
    dispatch({ type: 'SET_DATA', payload: data });
  }, [data, dispatch]);

  const totalPages = Math.ceil(totalCount / state.pageSize) || 1;

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={col.sortable ? styles.sortable : undefined}
                onClick={
                  col.sortable
                    ? () => dispatch({ type: 'SET_SORT', column: col.key })
                    : undefined
                }
              >
                {col.label}
                {col.sortable && (
                  <span
                    className={
                      state.sortColumn === col.key
                        ? styles.sortActive
                        : styles.sortIdle
                    }
                  >
                    {state.sortColumn === col.key
                      ? state.sortDirection === 'asc'
                        ? ' ↑'
                        : ' ↓'
                      : ' ↕'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processed.map((item, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render
                    ? col.render(item)
                    : String(item[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          onClick={() =>
            dispatch({ type: 'SET_PAGE', payload: state.currentPage - 1 })
          }
          disabled={state.currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {state.currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            dispatch({ type: 'SET_PAGE', payload: state.currentPage + 1 })
          }
          disabled={state.currentPage === totalPages}
        >
          Next
        </button>
        <select
          value={state.pageSize}
          onChange={(e) =>
            dispatch({
              type: 'SET_PAGE_SIZE',
              payload: Number(e.target.value),
            })
          }
        >
          {[10, 25, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
