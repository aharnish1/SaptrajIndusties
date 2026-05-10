import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Folders, MessageSquare, Settings, LogOut } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext';


const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Projects', path: '/projects', icon: Folders },
    { name: 'Inquiries', path: '/inquiries', icon: MessageSquare },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-gunmetal-gray flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-gunmetal-gray">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="SAPTRAJ INDUSTRIES LLP" 
            className="h-10 w-auto object-contain"
          />
          <div>
            <h1 className="text-xl font-heading font-bold text-industrial-yellow uppercase tracking-widest">
              Admin
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-gunmetal-gray text-industrial-yellow border border-[#333] shadow-[0_0_10px_rgba(255,212,0,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-gunmetal-gray/50'
              }`}
            >
              <link.icon size={20} className={isActive ? 'text-industrial-yellow' : 'text-gray-500'} />
              <span className="font-semibold text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gunmetal-gray">
        <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-laser-red transition-colors rounded-lg hover:bg-[#111]">
          <LogOut size={20} />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
