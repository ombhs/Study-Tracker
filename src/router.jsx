import Today from "./pages/Today.jsx";
import Routine from "./pages/Routine.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const routes = [
  { path: "/", element: <Today /> },
  { path: "/routine", element: <Routine /> },
  { path: "/dashboard", element: <Dashboard /> },
];

export default routes;
