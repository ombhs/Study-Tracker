import { NavLink } from "react-router-dom";
import { HomeIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export default function BottomNav() {
  return (
    <div className="
      fixed bottom-0 left-0 right-0 z-40 
      bg-white border-t border-stone-300 
      shadow-sm md:hidden
    ">
      <div className="flex justify-around py-2">
        
        <NavButton to="/" label="Today" icon={<HomeIcon className="h-6 w-6" />} />
        
        <NavButton to="/routine" label="Routine" icon={<CalendarIcon className="h-6 w-6" />} />
        
        <NavButton to="/dashboard" label="Dashboard" icon={<ChartBarIcon className="h-6 w-6" />} />

      </div>
    </div>
  );
}

function NavButton({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex flex-col items-center gap-0.5 px-3 py-1 text-xs 
        ${isActive ? "text-stone-900 font-semibold" : "text-stone-500"}`
      }
    >
      {icon}
      <span className="text-[11px]">{label}</span>
    </NavLink>
  );
}
