import type { JournalEntry } from "@/lib/types";
import { formatSignedCurrency, pnlColor } from "@/lib/format";

const outcomeStyles: Record<JournalEntry["outcome"], string> = {
  win: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  loss: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  open: "bg-zinc-500/10 text-zinc-300 border-zinc-500/30",
};

export function JournalList({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry) => (
        <div key={entry.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-50">{entry.symbol}</span>
                <span className="text-xs uppercase text-zinc-500">{entry.direction}</span>
                <span className="text-xs text-zinc-500">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-300">{entry.thesis}</p>
              {entry.lessons && (
                <p className="mt-2 text-sm text-zinc-500">
                  <span className="font-medium text-zinc-400">Lesson: </span>
                  {entry.lessons}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`rounded-full border px-2 py-1 text-xs font-medium capitalize ${outcomeStyles[entry.outcome]}`}
              >
                {entry.outcome}
              </span>
              {entry.pnl !== null && (
                <span className={`text-sm font-semibold ${pnlColor(entry.pnl)}`}>
                  {formatSignedCurrency(entry.pnl)}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
