import { NavLink } from "react-router-dom";
import { getStreak, getTodayTotalMinutes, getMonthTotalMinutes } from "../lib/analytics";
import { HomeIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  { to: "/", label: "Today", icon: <HomeIcon className="h-5 w-5" /> },
  { to: "/routine", label: "Routine", icon: <CalendarIcon className="h-5 w-5" /> },
  { to: "/dashboard", label: "Dashboard", icon: <ChartBarIcon className="h-5 w-5" /> },
];

export default function Sidebar({ onNavigate }) {
  const streak = getStreak();
  const todayMinutes = getTodayTotalMinutes();
  const monthMinutes = getMonthTotalMinutes();

  return (
    <aside className="h-full w-[260px] flex-shrink-0 border-r border-stone-200 bg-white/90 backdrop-blur-lg px-5 py-6 flex flex-col">

      {/* Workspace Title */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.15em] text-stone-400">Workspace</div>
        <div className="mt-1 text-xl font-semibold tracking-tight">Study Tracker</div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <SidebarLink
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            onClick={onNavigate}
          />
        ))}
      </nav>

      <div className="my-6 border-t border-stone-200" />

      {/* Quick Stats */}
      <div className="flex flex-col gap-4 text-sm">
        <StatBlock title="Streak" value={`${streak} days`} />
        <StatBlock title="Today" value={`${todayMinutes} min`} />
        <StatBlock title="This Month" value={`${(monthMinutes / 60).toFixed(1)} hrs`} />
      </div>

      <div className="flex-1"></div>

      {/* Footer */}
      <div className="text-[10px] text-stone-400">
        Mobile Friendly Sidebar 🌿
      </div>
    </aside>
  );
}

function SidebarLink({ to, label, icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition 
        ${isActive
          ? "bg-stone-900 text-white"
          : "text-stone-700 hover:bg-stone-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

function StatBlock({ title, value }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-stone-400">
        {title}
      </div>
      <div className="text-sm font-semibold text-stone-800 mt-0.5">{value}</div>
    </div>
  );
}
