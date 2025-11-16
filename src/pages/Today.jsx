import { useEffect, useState } from "react";
import TimerBubble from "../components/TimerBubble.jsx";
import SessionCard from "../components/SessionCard.jsx";
import { addSession, getSessionsForDate, removeSession } from "../lib/storage";

export default function Today() {
  const today = new Date().toISOString().slice(0, 10);

  const [sessions, setSessions] = useState([]);

  const refresh = () => {
    setSessions(getSessionsForDate(today));
  };

  useEffect(() => {
    refresh();
  }, []);

  const saveTimerSession = (minutes) => {
    const subject = prompt("Subject studied?");
    if (!subject) return;

    addSession({
      date: today,
      minutes,
      subject,
      notes: "",
    });

    refresh();
  };

  const addManualSession = (e) => {
    e.preventDefault();

    const subject = e.target.subject.value.trim();
    const minutes = Number(e.target.minutes.value);
    const notes = e.target.notes.value.trim();

    if (!subject || minutes <= 0) {
      alert("Enter valid subject & minutes");
      return;
    }

    addSession({
      date: today,
      subject,
      minutes,
      notes,
    });

    e.target.reset();
    refresh();
  };

  const deleteSession = (id) => {
    removeSession(id);
    refresh();
  };

  return (
    <div className="space-y-8">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Today</h1>
        <p className="text-sm text-stone-500">{today}</p>
      </div>

      {/* Timer */}
      <TimerBubble onSave={saveTimerSession} />

      {/* Manual Add */}
      <div className="rounded-xl border border-stone-200 bg-white/80 p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-3">Add Manual Session</h2>

        <form onSubmit={addManualSession} className="space-y-3 text-sm">
          <input
            name="subject"
            placeholder="Subject"
            className="w-full rounded-md border border-stone-300 px-3 py-2"
          />

          <input
            name="minutes"
            type="number"
            placeholder="Minutes"
            className="w-full rounded-md border border-stone-300 px-3 py-2"
          />

          <textarea
            name="notes"
            placeholder="Notes (optional)"
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            rows={2}
          />

          <button className="px-4 py-2 rounded-md bg-stone-900 text-white text-sm">
            Add Session
          </button>
        </form>
      </div>

      {/* Today’s Sessions */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Today's Sessions</h2>

        {sessions.length === 0 && (
          <div className="text-sm text-stone-500">
            No sessions logged today.
          </div>
        )}

        {sessions.map((s) => (
          <SessionCard key={s.id} session={s} onDelete={deleteSession} />
        ))}
      </div>
    </div>
  );
}
