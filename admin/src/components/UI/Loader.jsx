import React from 'react';

const Loader = ({ text = "ADMIN PANEL" }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-deep-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Logo/Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 w-16 h-16 border-4 border-industrial-yellow border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 w-12 h-12 bg-deep-black rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-industrial-yellow rounded-sm"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-industrial-yellow tracking-wider animate-pulse">
            {text}
          </h1>
          <div className="mt-2 flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-industrial-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-industrial-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-industrial-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-industrial-yellow opacity-5 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
