import { routine } from "../lib/routine";

export default function Routine() {
  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Weekly Routine</h1>
        <p className="text-sm text-stone-500">Read-only reference</p>
      </div>

      {/* Weekly Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routine.days.map((day, di) => (
          <div
            key={day.label}
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-medium mb-4">{day.label}</h2>

            <div className="space-y-3">
              {routine.shifts.map((shift, si) => (
                <div
                  key={shift.id}
                  className="rounded-lg border border-stone-100 bg-stone-50 px-3 py-2"
                >
                  <div className="text-xs text-stone-500">{shift.label}</div>
                  <div className="text-sm font-medium text-stone-800">
                    {day.subjects[si] || "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-xs text-stone-400 pt-6">
        Based on your uploaded weekly schedule.
      </div>

    </div>
  );
}
