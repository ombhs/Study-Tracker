import { useRoutes } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import routes from "./router.jsx";
import MobileMenuButton from "./components/MobileMenuButton.jsx";
import BottomNav from "./components/BottomNav.jsx";


export default function App() {
  const element = useRoutes(routes);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-stone-100">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          {/* Sidebar Panel */}
          <div className="w-[260px] bg-white shadow-xl border-r border-stone-200">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black/30"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen px-4 py-6 md:px-10 md:py-10">

        {/* Mobile Top Bar */}
        <div className="md:hidden mb-6 flex items-center gap-3">
          <MobileMenuButton onClick={() => setOpen(true)} />
          <h1 className="text-xl font-semibold tracking-tight">Study Tracker</h1>
        </div>

        <div className="max-w-4xl mx-auto">{element}</div>
      </main>
      <BottomNav />
    </div>
  );
}
