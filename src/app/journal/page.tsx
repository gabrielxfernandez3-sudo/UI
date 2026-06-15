import { JournalList } from "@/components/JournalList";
import { provider } from "@/lib/data";

export default async function JournalPage() {
  const entries = await provider.getJournalEntries();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Trade Journal</h1>
        <p className="text-sm text-zinc-500">Thesis, outcome, and lessons for each trade</p>
      </div>
      <JournalList entries={entries} />
    </div>
  );
}
