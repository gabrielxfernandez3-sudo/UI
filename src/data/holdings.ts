import type { JournalEntry } from "@/lib/types";

/**
 * Your real account data. Edit these to match your actual portfolio —
 * prices, names, and history are pulled live; everything below is the
 * stuff only you know (what you hold, your alerts, your notes).
 */

export interface EquityHolding {
  symbol: string;
  quantity: number;
  avgCost: number;
}

export interface OptionHolding {
  underlying: string;
  type: "call" | "put";
  side: "long" | "short";
  strike: number;
  expiration: string; // YYYY-MM-DD
  contracts: number;
  avgPremium: number;
  /** Update this manually when you check your broker — free live options
   *  quotes aren't available without a brokerage/TradingView connection. */
  currentPremium: number;
  delta: number;
  theta: number;
  iv: number;
}

export interface WatchlistEntry {
  symbol: string;
  alertAbove?: number;
  alertBelow?: number;
  note?: string;
}

export const cashBalance = 4250.75;

export const equityHoldings: EquityHolding[] = [
  { symbol: "AAPL", quantity: 25, avgCost: 187.32 },
  { symbol: "NVDA", quantity: 12, avgCost: 118.5 },
  { symbol: "MSFT", quantity: 10, avgCost: 402.1 },
  { symbol: "AMD", quantity: 40, avgCost: 152.75 },
  { symbol: "SPY", quantity: 30, avgCost: 545.2 },
];

export const optionHoldings: OptionHolding[] = [
  {
    underlying: "AAPL",
    type: "call",
    side: "long",
    strike: 210,
    expiration: "2026-07-17",
    contracts: 3,
    avgPremium: 4.5,
    currentPremium: 5.85,
    delta: 0.42,
    theta: -0.06,
    iv: 0.27,
  },
  {
    underlying: "NVDA",
    type: "put",
    side: "short",
    strike: 120,
    expiration: "2026-06-19",
    contracts: 2,
    avgPremium: 2.1,
    currentPremium: 1.35,
    delta: -0.24,
    theta: -0.09,
    iv: 0.46,
  },
  {
    underlying: "SPY",
    type: "call",
    side: "short",
    strike: 575,
    expiration: "2026-06-20",
    contracts: 5,
    avgPremium: 1.8,
    currentPremium: 1.1,
    delta: 0.18,
    theta: -0.05,
    iv: 0.15,
  },
];

export const watchlistEntries: WatchlistEntry[] = [
  { symbol: "TSLA", alertAbove: 340, alertBelow: 290, note: "Watching for breakout above 340" },
  { symbol: "META", alertAbove: 640 },
  { symbol: "PLTR", alertBelow: 110, note: "Earnings next week" },
  { symbol: "SOFI" },
  { symbol: "COIN", alertAbove: 300, alertBelow: 230 },
];

export const journalEntries: JournalEntry[] = [
  {
    id: "j1",
    date: "2026-06-12",
    symbol: "NVDA",
    direction: "put",
    thesis: "Sold cash-secured put after IV spike post-earnings, expected mean reversion.",
    outcome: "open",
    pnl: null,
    lessons: "Wait for IV rank confirmation before sizing up.",
  },
  {
    id: "j2",
    date: "2026-06-10",
    symbol: "AMD",
    direction: "long",
    thesis: "Bought dip near 50-day MA on sector rotation into semis.",
    outcome: "loss",
    pnl: -212.5,
    lessons: "Sector rotation thesis was too early; should have waited for confirmation candle.",
  },
  {
    id: "j3",
    date: "2026-06-05",
    symbol: "AAPL",
    direction: "call",
    thesis: "Bought July calls ahead of WWDC anticipating AI feature announcements.",
    outcome: "win",
    pnl: 405,
    lessons: "Take partial profits into news events instead of holding full size through.",
  },
];
