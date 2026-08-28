export default function ChartTooltip({ active, label, payload, valueFormatter = (value) => value }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {label ? <p className="mb-2 font-semibold text-zinc-950 dark:text-white">{label}</p> : null}
      <div className="space-y-1">
        {payload.map((item) => (
          <div className="flex items-center justify-between gap-6" key={item.dataKey || item.name}>
            <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full" style={{ background: item.color || item.payload?.color }} />
              {item.name}
            </span>
            <span className="font-medium text-zinc-950 dark:text-white">
              {valueFormatter(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
