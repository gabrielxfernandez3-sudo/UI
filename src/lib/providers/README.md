# Data providers

`mockProvider` (in `mock.ts`) implements `MarketDataProvider` with static
sample data so the dashboard works without any external connections.

To wire up live data from TradingView via MCP:

1. Set up the TradingView MCP server in your terminal/Claude Code config.
2. Create `tradingview.ts` here that implements `MarketDataProvider`,
   fetching real positions, watchlist, and quotes through that MCP connection
   (or a small server-side API route that calls it).
3. In `src/lib/data.ts`, swap the exported `provider` to the new
   implementation.

No other file needs to change — every page reads through `src/lib/data.ts`.
