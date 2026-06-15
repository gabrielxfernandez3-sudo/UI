# Data providers

`liveProvider` (in `live.ts`) is the active provider. It combines:

- **Live prices & history** — fetched from Yahoo Finance (no API key needed),
  via `quotes.ts`.
- **Your holdings, watchlist, and journal** — edited by hand in
  `src/data/holdings.ts`. This is the only file you need to update with your
  real positions, alerts, and trade notes.

Note: free live options-chain data isn't available, so option premiums
(`currentPremium` in `holdings.ts`) are entered manually. The underlying
stock price shown alongside each option *is* live.

To swap to a different source later (e.g. a brokerage or TradingView MCP
connection), implement `MarketDataProvider` in a new file here and update
`src/lib/data.ts` to use it. No page needs to change.
