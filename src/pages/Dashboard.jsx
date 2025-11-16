import { useState } from "react";
import {
  getLast7Days,
  getMonthlySummary,
  getRangeSummary,
  getStreak,
  getMonthTotalMinutes,
  getTodayTotalMinutes,
} from "../lib/analytics";
import { BarChart, HorizontalBars } from "../components/Charts";

export default function Dashboard() {
  const last7 = getLast7Days();
  const monthly = getMonthlySummary();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rangeData, setRangeData] = useState(null);

  const applyRange = () => {
    if (!from || !to) return;
    setRangeData(getRangeSummary(from, to));
  };

  return (
    <div className="space-y-6 pb-24"> {/* bottom padding for nav */}

      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-stone-500">Your study statistics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard title="Streak" value={`${getStreak()} days`} />
        <StatCard title="Today" value={`${getTodayTotalMinutes()} min`} />
        <StatCard
          title="This Month"
          value={`${(getMonthTotalMinutes() / 60).toFixed(1)} hrs`}
        />
      </div>

      {/* Last 7 Days */}
      <Card title="Last 7 Days">
        <div className="w-full overflow-x-auto">
          <BarChart
            data={last7.map((d) => ({
              label: d.date.slice(5),
              value: d.minutes,
            }))}
            height={120}
          />
        </div>
      </Card>

      {/* Monthly Summary */}
      <Card title="Monthly Summary">
        <div className="w-full overflow-x-auto">
          <BarChart
            data={monthly.map((m) => ({
              label: m.month.slice(5),
              value: Number(m.hours),
            }))}
            height={120}
          />
        </div>
      </Card>

      {/* Custom Range */}
      <Card title="Custom Range">
        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="px-3 py-2 rounded-md border border-stone-300 w-full"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="px-3 py-2 rounded-md border border-stone-300 w-full"
          />

          <button
            onClick={applyRange}
            className="px-4 py-2 text-sm rounded-md bg-stone-900 text-white w-full md:w-auto"
          >
            Apply
          </button>
        </div>

        {rangeData && (
          <div className="mt-6 space-y-6">
            <StatCard title="Total Minutes" value={rangeData.totalMinutes} />

            <div>
              <h3 className="text-sm font-semibold mb-2">Subjects</h3>

              <HorizontalBars
                data={Object.entries(rangeData.subjects).map(
                  ([label, value]) => ({ label, value })
                )}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

/* ----------------------------------------
   STAT CARD
----------------------------------------- */
function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-3 md:p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-stone-400">
        {title}
      </div>
      <div className="text-lg md:text-xl font-semibold">{value}</div>
    </div>
  );
}

/* ----------------------------------------
   UNIVERSAL CARD
----------------------------------------- */
function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <h2 className="text-base md:text-lg font-medium">{title}</h2>
      {children}
    </div>
  );
}
