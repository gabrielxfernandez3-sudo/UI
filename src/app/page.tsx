import { PortfolioChart } from "@/components/PortfolioChart";
import { PositionsTable } from "@/components/PositionsTable";
import { SummaryCard } from "@/components/SummaryCard";
import { provider } from "@/lib/data";
import { formatCurrency, formatPercent, formatSignedCurrency, pnlColor } from "@/lib/format";

export default async function Home() {
  const [summary, positions, history] = await Promise.all([
    provider.getPortfolioSummary(),
    provider.getPositions(),
    provider.getPortfolioHistory(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Overview</h1>
        <p className="text-sm text-zinc-500">Account snapshot and top positions</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Value" value={formatCurrency(summary.totalValue)} />
        <SummaryCard
          label="Day P&L"
          value={formatSignedCurrency(summary.dayPnL)}
          subValue={formatPercent(summary.dayPnLPercent)}
          subValueClassName={pnlColor(summary.dayPnL)}
        />
        <SummaryCard
          label="Total P&L"
          value={formatSignedCurrency(summary.totalPnL)}
          subValue={formatPercent(summary.totalPnLPercent)}
          subValueClassName={pnlColor(summary.totalPnL)}
        />
        <SummaryCard label="Cash Balance" value={formatCurrency(summary.cashBalance)} />
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Portfolio value (last 30 days)
        </h2>
        <PortfolioChart data={history} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Positions
        </h2>
        <PositionsTable positions={positions} />
      </div>
    </div>
  );
}
