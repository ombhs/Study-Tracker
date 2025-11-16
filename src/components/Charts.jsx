export function BarChart({ data, height = 120 }) {
  const max = Math.max(...data.map((d) => d.value), 10);

  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-stone-900 rounded-t-md"
            style={{
              height: `${(d.value / max) * 100}%`,
            }}
          />
          <div className="text-[10px] text-stone-500 mt-1 text-center">
            {d.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HorizontalBars({ data }) {
  const max = Math.max(...data.map((d) => d.value), 10);

  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-24 text-xs text-stone-600 truncate">{d.label}</div>

          <div classname="flex-1 h-3 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-900 rounded-full"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>

          <div className="w-10 text-right text-xs text-stone-600">
            {d.value}
          </div>
        </div>
      ))}
    </div>
  );
}
