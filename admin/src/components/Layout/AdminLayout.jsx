import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = () => {
  console.log('AdminLayout component rendering');
  console.log('Outlet available:', typeof Outlet);
  return (
    <div className="min-h-screen bg-deep-black flex font-sans text-metallic-silver">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div style={{color: 'white', padding: '20px'}}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
