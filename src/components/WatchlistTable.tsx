import type { WatchlistItem } from "@/lib/types";
import { formatCurrency, formatPercent, pnlColor } from "@/lib/format";

export function WatchlistTable({ items }: { items: WatchlistItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900 text-left text-xs uppercase tracking-wide text-zinc-500">
            <th className="px-4 py-3 font-medium">Symbol</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Day %</th>
            <th className="px-4 py-3 font-medium">Alert Below</th>
            <th className="px-4 py-3 font-medium">Alert Above</th>
            <th className="px-4 py-3 font-medium">Note</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {items.map((item) => (
            <tr key={item.symbol} className="hover:bg-zinc-900/60">
              <td className="px-4 py-3">
                <div className="font-medium text-zinc-50">{item.symbol}</div>
                <div className="text-xs text-zinc-500">{item.name}</div>
              </td>
              <td className="px-4 py-3 text-zinc-300">{formatCurrency(item.price)}</td>
              <td className={`px-4 py-3 font-medium ${pnlColor(item.changePercent)}`}>
                {formatPercent(item.changePercent)}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {item.alertBelow ? formatCurrency(item.alertBelow) : "—"}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {item.alertAbove ? formatCurrency(item.alertAbove) : "—"}
              </td>
              <td className="px-4 py-3 text-zinc-400">{item.note ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
