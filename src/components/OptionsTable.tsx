import type { OptionPosition } from "@/lib/types";
import { formatCurrency, formatSignedCurrency, pnlColor } from "@/lib/format";

function daysToExpiration(expiration: string): number {
  const ms = new Date(expiration).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function OptionsTable({ options }: { options: OptionPosition[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900 text-left text-xs uppercase tracking-wide text-zinc-500">
            <th className="px-4 py-3 font-medium">Contract</th>
            <th className="px-4 py-3 font-medium">Side</th>
            <th className="px-4 py-3 font-medium">Contracts</th>
            <th className="px-4 py-3 font-medium">Avg Premium</th>
            <th className="px-4 py-3 font-medium">Current</th>
            <th className="px-4 py-3 font-medium">DTE</th>
            <th className="px-4 py-3 font-medium">Delta</th>
            <th className="px-4 py-3 font-medium">Theta</th>
            <th className="px-4 py-3 font-medium">IV</th>
            <th className="px-4 py-3 font-medium">P&L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {options.map((option) => {
            const multiplier = option.side === "long" ? 1 : -1;
            const pnl =
              (option.currentPremium - option.avgPremium) * option.contracts * 100 * multiplier;
            return (
              <tr key={`${option.underlying}-${option.type}-${option.strike}-${option.expiration}`} className="hover:bg-zinc-900/60">
                <td className="px-4 py-3">
                  <div className="font-medium text-zinc-50">
                    {option.underlying} {formatCurrency(option.strike)} {option.type.toUpperCase()}
                  </div>
                  <div className="text-xs text-zinc-500">
                    Exp {new Date(option.expiration).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-zinc-300">{option.side}</td>
                <td className="px-4 py-3 text-zinc-300">{option.contracts}</td>
                <td className="px-4 py-3 text-zinc-300">{formatCurrency(option.avgPremium)}</td>
                <td className="px-4 py-3 text-zinc-300">{formatCurrency(option.currentPremium)}</td>
                <td className="px-4 py-3 text-zinc-300">{daysToExpiration(option.expiration)}</td>
                <td className="px-4 py-3 text-zinc-300">{option.delta.toFixed(2)}</td>
                <td className="px-4 py-3 text-zinc-300">{option.theta.toFixed(2)}</td>
                <td className="px-4 py-3 text-zinc-300">{(option.iv * 100).toFixed(0)}%</td>
                <td className={`px-4 py-3 font-medium ${pnlColor(pnl)}`}>{formatSignedCurrency(pnl)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
