export interface PortfolioSummary {
  totalValue: number;
  cashBalance: number;
  dayPnL: number;
  dayPnLPercent: number;
  totalPnL: number;
  totalPnLPercent: number;
}

export interface Position {
  symbol: string;
  name: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  dayChangePercent: number;
}

export interface OptionPosition {
  underlying: string;
  underlyingPrice: number | null;
  type: "call" | "put";
  side: "long" | "short";
  strike: number;
  expiration: string;
  contracts: number;
  avgPremium: number;
  currentPremium: number;
  delta: number;
  theta: number;
  iv: number;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  alertAbove?: number;
  alertBelow?: number;
  note?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  symbol: string;
  direction: "long" | "short" | "call" | "put";
  thesis: string;
  outcome: "win" | "loss" | "open";
  pnl: number | null;
  lessons?: string;
}

export interface PortfolioHistoryPoint {
  date: string;
  value: number;
}

export interface MarketDataProvider {
  getPortfolioSummary(): Promise<PortfolioSummary>;
  getPositions(): Promise<Position[]>;
  getOptionPositions(): Promise<OptionPosition[]>;
  getWatchlist(): Promise<WatchlistItem[]>;
  getJournalEntries(): Promise<JournalEntry[]>;
  getPortfolioHistory(): Promise<PortfolioHistoryPoint[]>;
}
