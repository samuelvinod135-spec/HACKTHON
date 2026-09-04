import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

export default function Layout() {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#f5f7fa]">
      {/* subtle pastel glow in background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-100/60 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-purple-100/50 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-green-50/60 blur-[120px]" />
      </div>

      <Sidebar />

      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-5 py-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
