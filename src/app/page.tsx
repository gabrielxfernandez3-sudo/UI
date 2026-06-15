import { NavCard } from "@/components/NavCard";
import { PortfolioChart } from "@/components/PortfolioChart";
import { provider } from "@/lib/data";
import { formatCurrency, formatPercent, formatSignedCurrency, pnlColor } from "@/lib/format";
import {
  journalWinRate,
  nearestExpiration,
  topMover,
  watchlistNearAlertCount,
} from "@/lib/insights";

export default async function Home() {
  const [summary, positions, options, watchlist, journal, history] = await Promise.all([
    provider.getPortfolioSummary(),
    provider.getPositions(),
    provider.getOptionPositions(),
    provider.getWatchlist(),
    provider.getJournalEntries(),
    provider.getPortfolioHistory(),
  ]);

  const mover = topMover(positions);
  const nearestExp = nearestExpiration(options);
  const nearAlerts = watchlistNearAlertCount(watchlist);
  const { winRate, closedCount } = journalWinRate(journal);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Overview</h1>
        <p className="text-sm text-zinc-500">Where things stand right now</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Total account value
          </p>
          <p className="mt-2 text-4xl font-semibold text-zinc-50">
            {formatCurrency(summary.totalValue)}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Includes {formatCurrency(summary.cashBalance)} cash
          </p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Today
          </p>
          <p className={`mt-2 text-4xl font-semibold ${pnlColor(summary.dayPnL)}`}>
            {formatSignedCurrency(summary.dayPnL)}
          </p>
          <p className={`mt-1 text-sm font-medium ${pnlColor(summary.dayPnL)}`}>
            {formatPercent(summary.dayPnLPercent)}
          </p>
        </div>
      </div>

      {history.length > 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Last month
          </h2>
          <PortfolioChart data={history} />
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-500">
          Portfolio history is unavailable right now (live market data couldn&apos;t be reached).
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NavCard
          href="/portfolio"
          title="Portfolio"
          value={`${positions.length} positions`}
          detail={
            mover
              ? `${mover.symbol} ${formatPercent(mover.dayChangePercent)} today`
              : "No positions yet"
          }
          detailClassName={mover ? pnlColor(mover.dayChangePercent) : undefined}
        />
        <NavCard
          href="/options"
          title="Options"
          value={`${options.length} open contract${options.length === 1 ? "" : "s"}`}
          detail={
            nearestExp !== null ? `Next expiration in ${nearestExp} day${nearestExp === 1 ? "" : "s"}` : "Nothing open"
          }
        />
        <NavCard
          href="/watchlist"
          title="Watchlist"
          value={`${watchlist.length} symbol${watchlist.length === 1 ? "" : "s"} tracked`}
          detail={nearAlerts > 0 ? `${nearAlerts} near an alert level` : "None near alert levels"}
          detailClassName={nearAlerts > 0 ? "text-amber-400" : undefined}
        />
        <NavCard
          href="/journal"
          title="Journal"
          value={closedCount > 0 ? `${winRate.toFixed(0)}% win rate` : "No closed trades"}
          detail={`${closedCount} closed trade${closedCount === 1 ? "" : "s"} logged`}
        />
      </div>
    </div>
  );
}
