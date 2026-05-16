// AppLoader.jsx
// Premium Startup Loader + Simple Internal Loader
// React + TailwindCSS

import { useEffect, useState } from "react";
import logo from '../assets/logo.png';

export default function AppLoader({ children }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setLoading(true);

  const timer = setTimeout(() => {
    setLoading(false);
  }, 3000);

  return () => clearTimeout(timer);
}, []);

  // STARTUP LOADER
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-[9999]">
        
        {/* Animated Grid Background */}
        <div className="absolute  inset-0 opacity-90">
          <div className="grid-bg"></div>
        </div>

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/10 blur-3xl rounded-full"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center">

          {/* Logo */}
          <div className="relative">
            <img
              src={logo} // put your logo in public folder
              alt="Saptraj Industries"
              className="w-[200px] md:w-[360px] object-contain"
            />

            
          </div>

          {/* Loading Text */}
          <p className="mt-12 text-gray-300 tracking-[8px] text-sm">
            LOADING...
          </p>

          {/* Progress Bar */}
          <div className="mt-5 w-[280px] md:w-[400px] h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="loading-bar h-full bg-yellow-400"></div>
          </div>

          {/* Bottom Text */}
          <p className="mt-8 text-yellow-400/90 text-sm tracking-[4px] uppercase">
            Accuracy The Smart Choice
          </p>
        </div>

        {/* Styles */}
        <style>{`
          .grid-bg {
            width: 100%;
            height: 100%;
            background-image:
              linear-gradient(rgba(255, 217, 0, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 217, 0, 0.08) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridMove 10s linear infinite;
          }

          @keyframes gridMove {
            0% {
              transform: translateY(0px);
            }
            100% {
              transform: translateY(50px);
            }
          }

          .loading-bar {
            width: 40%;
            animation: loading 2s ease-in-out infinite;
            box-shadow: 0 0 20px #facc15;
          }

          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(350%);
            }
          }
        `}</style>
      </div>
    );
  }

  // WEBSITE CONTENT
  return children;
}

/* -------------------------------------------------- */
/* SIMPLE INTERNAL LOADER */
/* Use this everywhere inside website */
/* -------------------------------------------------- */

export function SimpleLoader() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}