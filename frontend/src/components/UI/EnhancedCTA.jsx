import React, { useMemo } from 'react';
import MetalDustParticle from './MetalDustParticle';

const EnhancedCTA = ({ children, particleCount = 50 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
  }, [particleCount]);

  return (
    <div className="relative overflow-hidden">
      {/* Particle Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <MetalDustParticle
            key={particle.id}
            x={`${particle.x}%`}
            y={`${particle.y}%`}
            delay={particle.delay}
          />
        ))}
        
        {/* Spark bursts - larger glowing particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`spark-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + Math.sin(i * 0.8) * 40}%`,
              background: i % 3 === 0 ? 'rgba(255, 122, 0, 0.8)' : 'rgba(255, 215, 0, 0.6)',
              boxShadow: i % 3 === 0 
                ? '0 0 6px 2px rgba(255, 122, 0, 0.5)' 
                : '0 0 4px 1px rgba(255, 215, 0, 0.4)',
              animation: `sparkPulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        
        {/* Ambient industrial glow lines */}
        <div 
          className="absolute h-px w-full"
          style={{
            top: '30%',
            background: 'linear-gradient(90deg, transparent, rgba(255,122,0,0.3), transparent)',
            animation: 'glowPulse 4s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute h-px w-full"
          style={{
            top: '70%',
            background: 'linear-gradient(90deg, transparent, rgba(255,122,0,0.2), transparent)',
            animation: 'glowPulse 5s ease-in-out 2s infinite',
          }}
        />
      </div>
      
      {/* Content Layer - passes through children */}
      {React.Children.map(children, (child) => 
        React.isValidElement(child) 
          ? React.cloneElement(child, { className: `${child.props.className || ''} relative z-10` })
          : child
      )}
      
      {/* CSS Animations */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.2; transform: scaleX(0.95); }
          50% { opacity: 0.5; transform: scaleX(1); }
        }
        @keyframes sparkPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default EnhancedCTA;