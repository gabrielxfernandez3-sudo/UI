import { mockProvider } from "@/lib/providers/mock";
import type { MarketDataProvider } from "@/lib/types";

// Swap this for a live provider once a real data source is connected.
// See src/lib/providers/README.md
export const provider: MarketDataProvider = mockProvider;
