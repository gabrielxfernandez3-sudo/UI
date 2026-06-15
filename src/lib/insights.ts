import type { JournalEntry, OptionPosition, Position, WatchlistItem } from "@/lib/types";

export function topMover(positions: Position[]): Position | null {
  if (positions.length === 0) return null;
  return positions.reduce((top, position) =>
    Math.abs(position.dayChangePercent) > Math.abs(top.dayChangePercent) ? position : top
  );
}

function daysToExpiration(expiration: string): number {
  const ms = new Date(expiration).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function nearestExpiration(options: OptionPosition[]): number | null {
  if (options.length === 0) return null;
  return Math.min(...options.map((option) => daysToExpiration(option.expiration)));
}

const ALERT_PROXIMITY_PERCENT = 2;

export function watchlistNearAlertCount(items: WatchlistItem[]): number {
  return items.filter((item) => {
    const aboveDistance = item.alertAbove
      ? Math.abs((item.alertAbove - item.price) / item.price) * 100
      : Infinity;
    const belowDistance = item.alertBelow
      ? Math.abs((item.price - item.alertBelow) / item.price) * 100
      : Infinity;
    return Math.min(aboveDistance, belowDistance) <= ALERT_PROXIMITY_PERCENT;
  }).length;
}

export function journalWinRate(entries: JournalEntry[]): { winRate: number; closedCount: number } {
  const closed = entries.filter((entry) => entry.outcome !== "open");
  const wins = closed.filter((entry) => entry.outcome === "win").length;
  return {
    winRate: closed.length ? (wins / closed.length) * 100 : 0,
    closedCount: closed.length,
  };
}
