import { OptionsTable } from "@/components/OptionsTable";
import { provider } from "@/lib/data";

export default async function OptionsPage() {
  const options = await provider.getOptionPositions();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Options</h1>
        <p className="text-sm text-zinc-500">Open option positions, Greeks, and time to expiration</p>
      </div>
      <OptionsTable options={options} />
    </div>
  );
}
