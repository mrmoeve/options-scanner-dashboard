# Options Scanner Dashboard

A professional starter dashboard for an options scanning workflow, built with Next.js 15, TypeScript, Tailwind CSS, dark mode support, and mock market data that can later be replaced with Polygon.io integrations.

## Features

- Next.js 15 App Router architecture
- TypeScript across the app
- Tailwind CSS styling with dark mode
- Mobile-responsive layout
- Dedicated pages for:
  - Dashboard
  - Premarket Movers
  - Earnings Calendar
  - Unusual Volume Scanner
  - Watchlists
- Mock market data repository with a future-ready adapter pattern
- Unit tests with Vitest and Testing Library

## Project Structure

```text
.
├── app
│   ├── earnings-calendar
│   │   └── page.tsx
│   ├── premarket-movers
│   │   └── page.tsx
│   ├── unusual-volume-scanner
│   │   └── page.tsx
│   ├── watchlists
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── layout
│   │   ├── app-shell.tsx
│   │   ├── sidebar.tsx
│   │   └── topbar.tsx
│   ├── market
│   │   ├── dashboard-hero.tsx
│   │   └── signal-badge.tsx
│   ├── providers
│   │   └── theme-provider.tsx
│   ├── ui
│   │   ├── data-table.tsx
│   │   ├── page-header.tsx
│   │   ├── section-card.tsx
│   │   └── stat-card.tsx
│   └── theme-toggle.tsx
├── lib
│   ├── data
│   │   ├── index.ts
│   │   ├── mock-market-data.ts
│   │   └── polygon-adapter.ts
│   ├── types
│   │   └── market.ts
│   └── utils.ts
├── tests
│   ├── components
│   │   ├── data-table.test.tsx
│   │   └── stat-card.test.tsx
│   ├── lib
│   │   └── utils.test.ts
│   └── setup.ts
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build
- `npm run start` runs the production server
- `npm run lint` runs Next.js linting
- `npm run test` runs the unit test suite
- `npm run test:watch` runs Vitest in watch mode

## Data Layer Design

The mock data lives in [`lib/data/mock-market-data.ts`](/Users/mrmoeve/Documents/Options Scanner Dashboard/lib/data/mock-market-data.ts) and is exposed through [`lib/data/index.ts`](/Users/mrmoeve/Documents/Options Scanner Dashboard/lib/data/index.ts).

To connect Polygon.io later:

1. Replace the implementation exported from `lib/data/index.ts`.
2. Implement live fetchers in [`lib/data/polygon-adapter.ts`](/Users/mrmoeve/Documents/Options Scanner Dashboard/lib/data/polygon-adapter.ts).
3. Keep page and component code unchanged by preserving the same repository interface.

## Deployment Instructions

### Vercel

1. Push the repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Set any future environment variables, such as a Polygon.io API key.
4. Deploy using the default Next.js build settings.

### Manual Production Build

```bash
npm install
npm run build
npm run start
```

## Future Enhancements

- Replace mock services with Polygon.io REST and websocket adapters
- Add authentication and persistent user watchlists
- Add advanced filter panels for sector, float, and options flow
- Introduce charts and intraday visualizations
