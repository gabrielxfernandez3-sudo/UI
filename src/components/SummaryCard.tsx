interface SummaryCardProps {
  label: string;
  value: string;
  subValue?: string;
  subValueClassName?: string;
}

export function SummaryCard({ label, value, subValue, subValueClassName }: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-50">{value}</p>
      {subValue && (
        <p className={`mt-1 text-sm font-medium ${subValueClassName ?? "text-zinc-400"}`}>
          {subValue}
        </p>
      )}
    </div>
  );
}
