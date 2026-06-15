import { OptionsTable } from "@/components/OptionsTable";
import { provider } from "@/lib/data";

export default async function OptionsPage() {
  const options = await provider.getOptionPositions();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Options</h1>
        <p className="text-sm text-zinc-500">Your open option contracts and how they&apos;re doing</p>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
        <p className="mb-2 font-medium text-zinc-300">What the columns mean</p>
        <ul className="grid gap-1 sm:grid-cols-2">
          <li><span className="text-zinc-300">Delta</span> — how much the option&apos;s price moves for every $1 the stock moves.</li>
          <li><span className="text-zinc-300">Daily decay</span> — value lost each day just from time passing, even if the stock doesn&apos;t move.</li>
          <li><span className="text-zinc-300">Implied move</span> — how big a price swing the market currently expects (higher = more expected movement).</li>
          <li><span className="text-zinc-300">Days left</span> — calendar days until this contract expires.</li>
        </ul>
      </div>

      <OptionsTable options={options} />
    </div>
  );
}
