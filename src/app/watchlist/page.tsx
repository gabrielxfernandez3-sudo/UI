import { WatchlistTable } from "@/components/WatchlistTable";
import { provider } from "@/lib/data";

export default async function WatchlistPage() {
  const items = await provider.getWatchlist();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Watchlist</h1>
        <p className="text-sm text-zinc-500">Symbols you&apos;re tracking with price alerts</p>
      </div>
      <WatchlistTable items={items} />
    </div>
  );
}
