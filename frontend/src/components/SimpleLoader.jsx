import React from 'react';

export default function SimpleLoader() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative w-10 h-10">
        
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-yellow-400/20"></div>

        {/* Animated Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 animate-spin"></div>

      </div>
    </div>
  );
}