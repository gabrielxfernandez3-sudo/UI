import { liveProvider } from "@/lib/providers/live";
import type { MarketDataProvider } from "@/lib/types";

// Live prices/history from Yahoo Finance + your holdings from src/data/holdings.ts.
// See src/lib/providers/README.md for swapping in a different data source.
export const provider: MarketDataProvider = liveProvider;
