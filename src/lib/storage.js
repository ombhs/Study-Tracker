/* =========================================================
    LOCAL STORAGE ENGINE FOR STUDY TRACKER
    Handles:
    ✔ add session
    ✔ remove session
    ✔ fetch sessions (today / all / by date)
    ✔ generates unique IDs
========================================================= */

const KEY = "study_sessions_v1";

/* --------------------------------------
    Load all sessions
-------------------------------------- */
export function getAllSessions() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/* --------------------------------------
    Save all sessions
-------------------------------------- */
function saveAllSessions(sessions) {
  localStorage.setItem(KEY, JSON.stringify(sessions));
}

/* --------------------------------------
    Add new session
-------------------------------------- */
export function addSession({ date, subject, minutes, notes }) {
  const sessions = getAllSessions();

  const entry = {
    id: Math.random().toString(36).slice(2, 10),
    date,
    subject,
    minutes,
    notes: notes || "",
    time: new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    }),
  };

  sessions.unshift(entry);
  saveAllSessions(sessions);
}

/* --------------------------------------
    Remove a session by ID
-------------------------------------- */
export function removeSession(id) {
  const sessions = getAllSessions().filter((s) => s.id !== id);
  saveAllSessions(sessions);
}

/* --------------------------------------
    Get sessions by date
-------------------------------------- */
export function getSessionsForDate(date) {
  return getAllSessions().filter((s) => s.date === date);
}

/* --------------------------------------
    Clear all sessions (optional)
-------------------------------------- */
export function clearAllSessions() {
  localStorage.removeItem(KEY);
}
