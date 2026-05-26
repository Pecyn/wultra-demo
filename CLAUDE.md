# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React SPA — demo dashboard for Wultra take-home assignment.
Visualises paired devices and users from a static mock backend hosted on GitHub Pages.

## Commands

```bash
pnpm dev          # start dev server at http://localhost:3000
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
pnpm preview      # preview production build

# Tests (add "test": "vitest" to package.json scripts first)
pnpm vitest run                                    # run all tests once
pnpm vitest run src/hooks/useDataTable.test.ts     # run a single test file
pnpm vitest                                        # watch mode
```

> Note: `package.json` has no `test` script yet. Add `"test": "vitest"` before running tests.

## Stack

- React 19 + TypeScript
- Vite 8 (dev server: port 3000)
- React Router v7 — BrowserRouter + Routes
- Recharts — charts
- Vitest + @testing-library/react + @testing-library/user-event
- pnpm

## API

Base URL: `https://wultra.github.io/mtoken-tools/react-demo-api/`

| Endpoint                  | Used by                               |
| ------------------------- | ------------------------------------- |
| `statistics.json`         | Overview page                         |
| `devices/index.json`      | Devices list (client-side pagination) |
| `devices/{deviceId}.json` | Device detail + event history         |
| `users/index.json`        | Users list                            |

All fetching is done in custom hooks inside `src/hooks/`. The `src/api/client.ts` module wraps `fetch` and sets the base URL.

## Architecture

The app follows a pages → hooks → API layering:

- **Pages** (`src/pages/`) own routing and compose components. Default exports.
- **Hooks** (`src/hooks/`) own all data fetching and table state. Named exports.
  - `useDataTable` drives sort/filter/pagination via `useReducer` — it is the most complex piece and the main unit-test target.
  - `useLocalStorage` persists state across page loads without any library.
  - `useDevices`, `useDevice`, `useUsers`, `useStatistics` each fetch one endpoint and return `{ data, loading, error }`.
- **Components** (`src/components/`) are purely presentational. Named exports.

## Pages & routing

| Path           | Page           | Hook                          |
| -------------- | -------------- | ----------------------------- |
| `/`            | `Overview`     | `useStatistics`               |
| `/devices`     | `Devices`      | `useDevices` + `useDataTable` |
| `/devices/:id` | `DeviceDetail` | `useDevice`                   |
| `/users`       | `Users`        | `useUsers` + `useDataTable`   |

## Coding conventions

- Functional components only — no class components
- Named exports everywhere except pages (pages use default export)
- No `any` — use `unknown` and narrow with type guards

## State management

- Local component state: `useState`
- Table state (sort, filter, pagination): `useReducer` inside `useDataTable`
- Server state: custom fetch hooks
- Persistent state: `useLocalStorage` hook

## Styling

- Plain CSS — no CSS framework, no component library
- CSS variables defined in `src/styles/global.css`
- Component-level styles via CSS Modules (`Component.module.css`)

### Design tokens

```css
:root {
  --color-bg: #080c12;
  --color-surface: #0d1520;
  --color-surface-2: rgba(9, 103, 157, 0.1);
  --color-border: #1a2535;
  --color-text: #ffffff;
  --color-text-muted: #8899aa;
  --color-accent: #0099ff;
  --color-accent-hover: #0077cc;

  --color-success: #2ea043;
  --color-warning: #d29922;
  --color-danger: #f85149;
  --color-muted: #484f58;

  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

## Testing

- Unit tests: `useDataTable` hook — sorting, filtering, pagination, page reset logic
- Integration test: `DataTable` component — render, sort interaction, filter interaction
- Test files co-located with source: `hooks/useDataTable.test.ts`, `components/DataTable.test.tsx`
- No need to test pages, API hooks, or purely visual components

## What NOT to use

- No CSS frameworks (Bootstrap, MUI, Chakra, Reactstrap)
- No external state management (Redux, Zustand, MobX)
- No Next.js or any other React meta-framework
- No `any` type
