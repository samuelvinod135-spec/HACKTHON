import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import FloatingChatbot from './Chatbot/FloatingChatbot.jsx';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#edf2f8]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 pb-12 sm:px-8">
          <Outlet />
        </main>
      </div>

      {/* Floating Physics & Chemistry Virtual Teaching Assistant Chatbot */}
      <FloatingChatbot />
    </div>
  );
}

