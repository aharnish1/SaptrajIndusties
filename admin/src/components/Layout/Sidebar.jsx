import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Folders, MessageSquare, Briefcase, Users, Settings, LogOut, UserPlus, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose?.();
  };

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Projects', path: '/projects', icon: Folders },
    { name: 'Inquiries', path: '/inquiries', icon: MessageSquare },
    { name: 'Careers', path: '/careers', icon: Briefcase },
    { name: 'Applications', path: '/career-applications', icon: Users },
    { name: 'Team Members', path: '/team-members', icon: UserPlus },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isLinkActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 max-w-[85vw]
        bg-[#0A0A0A] border-r border-gunmetal-gray
        flex flex-col h-screen
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-4 sm:p-6 border-b border-gunmetal-gray flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={logo}
            alt="SAPTRAJ INDUSTRIES LLP"
            className="h-9 sm:h-10 w-auto object-contain flex-shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-heading font-bold text-industrial-yellow uppercase tracking-widest truncate">
              Admin
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Panel</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 sm:py-6 px-3 sm:px-4 space-y-1">
        {links.map((link) => {
          const active = isLinkActive(link.path);
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
                active
                  ? 'bg-gunmetal-gray text-industrial-yellow border border-[#333] shadow-[0_0_10px_rgba(255,212,0,0.1)]'
                  : 'text-gray-400 hover:text-white hover:bg-gunmetal-gray/50'
              }`}
            >
              <link.icon size={20} className={`flex-shrink-0 ${active ? 'text-industrial-yellow' : 'text-gray-500'}`} />
              <span className="font-semibold text-sm truncate">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 sm:p-4 border-t border-gunmetal-gray">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 w-full text-left text-gray-400 hover:text-laser-red transition-colors rounded-lg hover:bg-[#111]"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
