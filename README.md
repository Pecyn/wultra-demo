# Wultra Demo

React SPA visualising paired devices and users from a mock backend.

## Requirements

- Node.js v24.14.0
- pnpm v10.33.0

## Install & Run

```bash
pnpm install
pnpm dev
```

## Pages

- **Overview** — KPI metrics, device status breakdown, platform distribution, event type summary
- **Devices** — sortable, paginated device table
- **Device detail** — device info and event history
- **Users** — sortable user table

## Scripts

| Command        | Description                               |
| -------------- | ----------------------------------------- |
| `pnpm dev`     | Start dev server on http://localhost:3000 |
| `pnpm build`   | Type-check and build for production       |
| `pnpm preview` | Preview production build                  |
| `pnpm test`    | Run unit tests                            |
| `pnpm lint`    | Run ESLint                                |

## Technical Decisions

- Vite — standard choice for new React SPAs, pure client-side SPA
- React Router v7 with `BrowserRouter` + `Routes` — simplest API that fits
- Table state (sort, pagination) in `useDataTable` with `useReducer`, separated from presentational `DataTable`. Hook owns all state transitions including page reset on sort change.
- Recharts for charts — lightweight and React-first. Plain CSS with CSS variables and CSS Modules, dark theme inspired by Wultra.com
- Custom fetch hooks with `useEffect` and `AbortController` cleanup — simple and sufficient for this scope. Basic loading/error states only.
- `useDataTable` covered by unit tests using TDD. Integration tests and Suspense-based loading left for future work.

## What I Would Add Next

- Better solution for loading state, e.g. via Suspense + `use` hook instead of manual `loading` flags, skeletons
- Column filtering in DataTable (by status, platform, etc.)
- Integration tests for DataTable component
- Generic `useFetch<T>` hook — fetch logic is currently duplicated across `useDevices`, `useUsers` and `useStatistics`
- Better error handling — per-route error boundaries, retry logic, HTTP status-aware error messages
