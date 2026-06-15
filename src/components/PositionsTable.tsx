import type { Position } from "@/lib/types";
import { formatCurrency, formatPercent, formatSignedCurrency, pnlColor } from "@/lib/format";

export function PositionsTable({ positions }: { positions: Position[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900 text-left text-xs uppercase tracking-wide text-zinc-500">
            <th className="px-4 py-3 font-medium">Symbol</th>
            <th className="px-4 py-3 font-medium">Qty</th>
            <th className="px-4 py-3 font-medium">Avg Cost</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Market Value</th>
            <th className="px-4 py-3 font-medium">Day %</th>
            <th className="px-4 py-3 font-medium">Total P&L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {positions.map((position) => {
            const marketValue = position.quantity * position.currentPrice;
            const totalPnL = (position.currentPrice - position.avgCost) * position.quantity;
            return (
              <tr key={position.symbol} className="hover:bg-zinc-900/60">
                <td className="px-4 py-3">
                  <div className="font-medium text-zinc-50">{position.symbol}</div>
                  <div className="text-xs text-zinc-500">{position.name}</div>
                </td>
                <td className="px-4 py-3 text-zinc-300">{position.quantity}</td>
                <td className="px-4 py-3 text-zinc-300">{formatCurrency(position.avgCost)}</td>
                <td className="px-4 py-3 text-zinc-300">{formatCurrency(position.currentPrice)}</td>
                <td className="px-4 py-3 text-zinc-300">{formatCurrency(marketValue)}</td>
                <td className={`px-4 py-3 font-medium ${pnlColor(position.dayChangePercent)}`}>
                  {formatPercent(position.dayChangePercent)}
                </td>
                <td className={`px-4 py-3 font-medium ${pnlColor(totalPnL)}`}>
                  {formatSignedCurrency(totalPnL)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
