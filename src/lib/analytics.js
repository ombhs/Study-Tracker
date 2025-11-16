import { getAllSessions } from "./storage";

// Date helper
const iso = (d) => d.toISOString().slice(0, 10);

/* -------------------------------------------
    STREAK
------------------------------------------- */
export function getStreak() {
  const sessions = getAllSessions();
  const doneDays = new Set(sessions.map((s) => s.date));

  let streak = 0;
  let cursor = new Date();

  while (true) {
    const key = iso(cursor);
    if (doneDays.has(key)) streak++;
    else break;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

/* -------------------------------------------
    TOTAL TODAY
------------------------------------------- */
export function getTodayTotalMinutes() {
  const today = iso(new Date());
  return getAllSessions()
    .filter((s) => s.date === today)
    .reduce((a, b) => a + b.minutes, 0);
}

/* -------------------------------------------
    TOTAL THIS MONTH
------------------------------------------- */
export function getMonthTotalMinutes() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  return getAllSessions()
    .filter((s) => {
      const d = new Date(s.date);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((a, b) => a + b.minutes, 0);
}

/* -------------------------------------------
    LAST 7 DAYS
------------------------------------------- */
export function getLast7Days() {
  const sessions = getAllSessions();
  const arr = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = iso(d);
    const total = sessions
      .filter((s) => s.date === key)
      .reduce((sum, x) => sum + x.minutes, 0);

    arr.push({ date: key, minutes: total });
  }

  return arr;
}

/* -------------------------------------------
    MONTHLY SUMMARY
------------------------------------------- */
export function getMonthlySummary() {
  const map = {}; // { "2025-01": minutes }

  getAllSessions().forEach((s) => {
    const d = new Date(s.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!map[key]) map[key] = 0;
    map[key] += s.minutes;
  });

  return Object.entries(map).map(([month, minutes]) => ({
    month,
    hours: (minutes / 60).toFixed(1),
  }));
}

/* -------------------------------------------
    CUSTOM RANGE
------------------------------------------- */
export function getRangeSummary(from, to) {
  const start = new Date(from);
  const end = new Date(to);

  const filtered = getAllSessions().filter((s) => {
    const d = new Date(s.date);
    return d >= start && d <= end;
  });

  const totalMinutes = filtered.reduce((a, b) => a + b.minutes, 0);

  // subject breakdown
  const subjects = {};
  filtered.forEach((s) => {
    if (!subjects[s.subject]) subjects[s.subject] = 0;
    subjects[s.subject] += s.minutes;
  });

  return {
    totalMinutes,
    subjects,
  };
}
