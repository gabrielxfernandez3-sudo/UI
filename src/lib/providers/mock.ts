import type {
  JournalEntry,
  MarketDataProvider,
  OptionPosition,
  PortfolioHistoryPoint,
  PortfolioSummary,
  Position,
  WatchlistItem,
} from "@/lib/types";

const positions: Position[] = [
  { symbol: "AAPL", name: "Apple Inc.", quantity: 25, avgCost: 187.32, currentPrice: 201.45, dayChangePercent: 0.84 },
  { symbol: "NVDA", name: "NVIDIA Corp.", quantity: 12, avgCost: 118.5, currentPrice: 134.2, dayChangePercent: 2.31 },
  { symbol: "MSFT", name: "Microsoft Corp.", quantity: 10, avgCost: 402.1, currentPrice: 412.88, dayChangePercent: -0.42 },
  { symbol: "AMD", name: "Advanced Micro Devices", quantity: 40, avgCost: 152.75, currentPrice: 147.6, dayChangePercent: -1.15 },
  { symbol: "SPY", name: "SPDR S&P 500 ETF", quantity: 30, avgCost: 545.2, currentPrice: 558.9, dayChangePercent: 0.36 },
];

const optionPositions: OptionPosition[] = [
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

const watchlist: WatchlistItem[] = [
  { symbol: "TSLA", name: "Tesla Inc.", price: 318.4, changePercent: 1.92, alertAbove: 340, alertBelow: 290, note: "Watching for breakout above 340" },
  { symbol: "META", name: "Meta Platforms", price: 612.7, changePercent: -0.58, alertAbove: 640 },
  { symbol: "PLTR", name: "Palantir Technologies", price: 132.15, changePercent: 3.42, alertBelow: 110, note: "Earnings next week" },
  { symbol: "SOFI", name: "SoFi Technologies", price: 14.82, changePercent: 0.74 },
  { symbol: "COIN", name: "Coinbase Global", price: 268.3, changePercent: -2.1, alertAbove: 300, alertBelow: 230 },
];

const journalEntries: JournalEntry[] = [
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

const portfolioHistory: PortfolioHistoryPoint[] = [
  { date: "2026-05-15", value: 48250 },
  { date: "2026-05-22", value: 48910 },
  { date: "2026-05-29", value: 49575 },
  { date: "2026-06-05", value: 50320 },
  { date: "2026-06-12", value: 51480 },
  { date: "2026-06-15", value: 52040 },
];

function computeSummary(): PortfolioSummary {
  const totalValue = positions.reduce((sum, p) => sum + p.quantity * p.currentPrice, 0);
  const totalCost = positions.reduce((sum, p) => sum + p.quantity * p.avgCost, 0);
  const dayPnL = positions.reduce(
    (sum, p) => sum + p.quantity * p.currentPrice * (p.dayChangePercent / 100),
    0
  );
  const cashBalance = 4250.75;

  return {
    totalValue: totalValue + cashBalance,
    cashBalance,
    dayPnL,
    dayPnLPercent: (dayPnL / totalValue) * 100,
    totalPnL: totalValue - totalCost,
    totalPnLPercent: ((totalValue - totalCost) / totalCost) * 100,
  };
}

/**
 * In-memory mock provider so the dashboard is fully functional out of the box.
 * Swap this out by implementing MarketDataProvider against a TradingView-backed
 * MCP/data source (see src/lib/providers/README.md) and updating
 * src/lib/data.ts to use it instead.
 */
export const mockProvider: MarketDataProvider = {
  async getPortfolioSummary() {
    return computeSummary();
  },
  async getPositions() {
    return positions;
  },
  async getOptionPositions() {
    return optionPositions;
  },
  async getWatchlist() {
    return watchlist;
  },
  async getJournalEntries() {
    return journalEntries;
  },
  async getPortfolioHistory() {
    return portfolioHistory;
  },
};
