import React from 'react';

const AdminLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Loader Content */}
      <div className="relative flex flex-col items-center justify-center">

        {/* Spinner */}
        <div className="w-28 h-28 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Branding */}
        <h1 className="mt-8 text-4xl md:text-5xl font-bold tracking-[6px] text-yellow-400">
          ADMIN PANEL
        </h1>

        <p className="mt-4 text-gray-400 tracking-[3px] text-sm uppercase">
          Loading Industrial Dashboard...
        </p>

      </div>
    </div>
  );
};

export default AdminLoader;
