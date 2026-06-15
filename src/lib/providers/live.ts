import {
  cashBalance,
  equityHoldings,
  journalEntries,
  optionHoldings,
  watchlistEntries,
} from "@/data/holdings";
import { getHistory, getQuotes } from "./quotes";
import type {
  JournalEntry,
  MarketDataProvider,
  OptionPosition,
  PortfolioHistoryPoint,
  PortfolioSummary,
  Position,
  WatchlistItem,
} from "@/lib/types";

async function getPositions(): Promise<Position[]> {
  const quotes = await getQuotes(equityHoldings.map((h) => h.symbol));
  return equityHoldings.map((holding) => {
    const quote = quotes.get(holding.symbol);
    return {
      symbol: holding.symbol,
      name: quote?.name ?? holding.symbol,
      quantity: holding.quantity,
      avgCost: holding.avgCost,
      currentPrice: quote?.price ?? holding.avgCost,
      dayChangePercent: quote?.changePercent ?? 0,
    };
  });
}

async function getOptionPositions(): Promise<OptionPosition[]> {
  const underlyings = [...new Set(optionHoldings.map((h) => h.underlying))];
  const quotes = await getQuotes(underlyings);
  return optionHoldings.map((holding) => ({
    ...holding,
    underlyingPrice: quotes.get(holding.underlying)?.price ?? null,
  }));
}

async function getWatchlist(): Promise<WatchlistItem[]> {
  const quotes = await getQuotes(watchlistEntries.map((w) => w.symbol));
  return watchlistEntries.map((entry) => {
    const quote = quotes.get(entry.symbol);
    return {
      symbol: entry.symbol,
      name: quote?.name ?? entry.symbol,
      price: quote?.price ?? 0,
      changePercent: quote?.changePercent ?? 0,
      alertAbove: entry.alertAbove,
      alertBelow: entry.alertBelow,
      note: entry.note,
    };
  });
}

async function getJournalEntries(): Promise<JournalEntry[]> {
  return journalEntries;
}

async function getPortfolioSummary(): Promise<PortfolioSummary> {
  const positions = await getPositions();
  const totalValue = positions.reduce((sum, p) => sum + p.quantity * p.currentPrice, 0);
  const totalCost = positions.reduce((sum, p) => sum + p.quantity * p.avgCost, 0);
  const dayPnL = positions.reduce(
    (sum, p) => sum + p.quantity * p.currentPrice * (p.dayChangePercent / 100),
    0
  );

  return {
    totalValue: totalValue + cashBalance,
    cashBalance,
    dayPnL,
    dayPnLPercent: totalValue ? (dayPnL / totalValue) * 100 : 0,
    totalPnL: totalValue - totalCost,
    totalPnLPercent: totalCost ? ((totalValue - totalCost) / totalCost) * 100 : 0,
  };
}

async function getPortfolioHistory(): Promise<PortfolioHistoryPoint[]> {
  const histories = await Promise.all(equityHoldings.map((h) => getHistory(h.symbol, "1mo")));
  if (histories.some((h) => h.length === 0)) return [];

  const length = Math.min(...histories.map((h) => h.length));
  const points: PortfolioHistoryPoint[] = [];

  for (let i = 0; i < length; i++) {
    const value = histories.reduce(
      (sum, history, index) => sum + history[i].close * equityHoldings[index].quantity,
      cashBalance
    );
    points.push({ date: histories[0][i].date, value });
  }

  return points;
}

/**
 * Live provider: real prices and history from Yahoo Finance, combined with
 * your holdings/watchlist/journal from src/data/holdings.ts.
 */
export const liveProvider: MarketDataProvider = {
  getPortfolioSummary,
  getPositions,
  getOptionPositions,
  getWatchlist,
  getJournalEntries,
  getPortfolioHistory,
};
