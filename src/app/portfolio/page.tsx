import { PositionsTable } from "@/components/PositionsTable";
import { provider } from "@/lib/data";

export default async function PortfolioPage() {
  const positions = await provider.getPositions();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Portfolio</h1>
        <p className="text-sm text-zinc-500">All open equity positions</p>
      </div>
      <PositionsTable positions={positions} />
    </div>
  );
}
