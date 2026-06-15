# Trading Desk

A personal portfolio and options trading dashboard, built with Next.js (App Router) and Tailwind CSS.

## Pages

- **Overview** — account summary, portfolio value history, top positions
- **Portfolio** — all open equity positions
- **Options** — open option contracts with Greeks and days to expiration
- **Watchlist** — tracked symbols with price alerts
- **Journal** — trade thesis, outcome, and lessons learned

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data

The dashboard currently runs on mock data (`src/lib/providers/mock.ts`) so it
works out of the box. To connect a real data source (e.g. a TradingView MCP
connection), see `src/lib/providers/README.md`.
