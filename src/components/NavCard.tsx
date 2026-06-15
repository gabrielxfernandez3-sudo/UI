import Link from "next/link";

interface NavCardProps {
  href: string;
  title: string;
  value: string;
  detail: string;
  detailClassName?: string;
}

export function NavCard({ href, title, value, detail, detailClassName }: NavCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/60"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-300">{title}</p>
        <span className="text-zinc-600 transition-transform group-hover:translate-x-0.5">→</span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-zinc-50">{value}</p>
      <p className={`mt-1 text-sm ${detailClassName ?? "text-zinc-500"}`}>{detail}</p>
    </Link>
  );
}
