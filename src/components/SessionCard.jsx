export default function SessionCard({ session, onDelete }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-stone-800">
            {session.subject}
          </div>
          <div className="text-[11px] text-stone-500">
            {session.minutes} minutes • {session.time}
          </div>
        </div>

        <button
          onClick={() => onDelete(session.id)}
          className="text-xs px-2 py-1 rounded-md border border-stone-300 hover:bg-stone-100"
        >
          Delete
        </button>
      </div>

      {session.notes && (
        <div className="mt-2 text-xs text-stone-700">
          Notes: {session.notes}
        </div>
      )}
    </div>
  );
}
