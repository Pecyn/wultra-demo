import { describe, it, expect } from 'vitest';
import { tableReducer, computeProcessed, type TableState } from './useDataTable';

type Item = { id: number; name: string };

const init: TableState<Item> = {
  data: [],
  sortColumn: null,
  sortDirection: 'asc',
  currentPage: 1,
  pageSize: 10,
};

const paginationItems: Item[] = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: String(i + 1) }));

// Cycles 5, 6, 9, 10 — computeProcessed sorting + pagination
describe('computeProcessed', () => {
  const unsorted: Item[] = [{ id: 2, name: 'b' }, { id: 1, name: 'a' }, { id: 3, name: 'c' }];

  // Cycle 5 — sorting asc returns items in ascending order
  it('sorting asc returns items sorted ascending by sortColumn', () => {
    const s: TableState<Item> = { ...init, data: unsorted, sortColumn: 'name', sortDirection: 'asc' };
    const { processed } = computeProcessed(s);
    expect(processed.map(i => i.name)).toEqual(['a', 'b', 'c']);
  });

  // Cycle 6 — sorting desc returns items in descending order
  it('sorting desc returns items sorted descending by sortColumn', () => {
    const s: TableState<Item> = { ...init, data: unsorted, sortColumn: 'name', sortDirection: 'desc' };
    const { processed } = computeProcessed(s);
    expect(processed.map(i => i.name)).toEqual(['c', 'b', 'a']);
  });

  // Cycle 9 — pagination returns correct slice for page 1
  it('pagination returns correct slice for currentPage and pageSize', () => {
    const s: TableState<Item> = { ...init, data: paginationItems, pageSize: 5, currentPage: 1 };
    const { processed, totalCount } = computeProcessed(s);
    expect(processed).toHaveLength(5);
    expect(processed[0].id).toBe(1);
    expect(totalCount).toBe(12);
  });

  // Cycle 10 — pagination page 2 returns second slice
  it('pagination page 2 returns second slice', () => {
    const s: TableState<Item> = { ...init, data: paginationItems, pageSize: 5, currentPage: 2 };
    const { processed } = computeProcessed(s);
    expect(processed).toHaveLength(5);
    expect(processed[0].id).toBe(6);
  });
});

// Cycle 1 — SET_DATA updates data
describe('tableReducer', () => {
  it('SET_DATA updates data in state', () => {
    const s = tableReducer(init, { type: 'SET_DATA', payload: [{ id: 1, name: 'a' }] });
    expect(s.data).toEqual([{ id: 1, name: 'a' }]);
  });

  // Cycle 2 — SET_SORT sets column + direction asc
  it('SET_SORT sets sortColumn and sortDirection to asc', () => {
    const s = tableReducer(init, { type: 'SET_SORT', column: 'name' });
    expect(s.sortColumn).toBe('name');
    expect(s.sortDirection).toBe('asc');
  });

  // Cycle 3 — SET_SORT same column twice toggles asc → desc
  it('SET_SORT same column twice toggles direction asc → desc', () => {
    const s1 = tableReducer(init, { type: 'SET_SORT', column: 'name' });
    const s2 = tableReducer(s1, { type: 'SET_SORT', column: 'name' });
    expect(s2.sortDirection).toBe('desc');
  });

  // Cycle 4 — SET_SORT different column resets direction to asc
  it('SET_SORT different column resets sortDirection to asc', () => {
    const s1 = tableReducer(init, { type: 'SET_SORT', column: 'name' });
    const s2 = tableReducer(s1, { type: 'SET_SORT', column: 'name' }); // → desc
    const s3 = tableReducer(s2, { type: 'SET_SORT', column: 'id' });
    expect(s3.sortColumn).toBe('id');
    expect(s3.sortDirection).toBe('asc');
  });

  // Cycle 7 — SET_PAGE_SIZE sets pageSize
  it('SET_PAGE_SIZE sets pageSize', () => {
    const s = tableReducer(init, { type: 'SET_PAGE_SIZE', payload: 25 });
    expect(s.pageSize).toBe(25);
  });

  // Cycle 8 — SET_PAGE_SIZE resets currentPage to 1
  it('SET_PAGE_SIZE resets currentPage to 1', () => {
    const s1 = tableReducer(init, { type: 'SET_PAGE', payload: 3 });
    const s2 = tableReducer(s1, { type: 'SET_PAGE_SIZE', payload: 25 });
    expect(s2.currentPage).toBe(1);
  });
});
