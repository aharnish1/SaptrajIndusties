import React from 'react';
import { Search, Menu } from 'lucide-react';
import NotificationBell from '../NotificationBell';

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 sm:h-20 bg-deep-black border-b border-gunmetal-gray flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gunmetal-gray/50 flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="relative flex-1 min-w-0 max-w-md lg:max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
          <input
            type="text"
            id="topbar-search"
            name="topbarSearch"
            placeholder="Search..."
            className="w-full min-w-0 bg-[#111] border border-[#333] rounded-lg pl-10 pr-3 sm:pr-4 py-2 text-sm text-white focus:outline-none focus:border-industrial-yellow transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
        <NotificationBell />

        <div className="flex items-center gap-2 sm:gap-3 border-l border-[#333] pl-3 sm:pl-6">
          <div className="w-8 h-8 rounded-full bg-industrial-yellow flex items-center justify-center text-deep-black font-bold text-sm flex-shrink-0">
            A
          </div>
          <div className="hidden sm:flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">Admin User</span>
            <span className="text-xs text-gray-500">Superadmin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
