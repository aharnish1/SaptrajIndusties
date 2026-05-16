import React from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const MetalDustParticle = ({ x, y, delay = 0 }) => {
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0);
  const posX = useMotionValue(x);
  const posY = useMotionValue(y);
  
  React.useEffect(() => {
    const driftX = (Math.random() - 0.5) * 60;
    const driftY = (Math.random() - 0.5) * 60 - 30;
    
    const controls = animate([
      [opacity, 0, 0],
      [opacity, 0.6, 0.3],
      [opacity, 0, 4],
      [scale, 0, 0],
      [scale, 1, 0.5],
      [scale, 0.5, 4],
      [posX, x, 0],
      [posX, x + driftX, 4],
      [posY, y, 0],
      [posY, y + driftY, 4],
    ], {
      duration: 4,
      delay,
      ease: [0.25, 0.1, 0.25, 1]
    });
    
    return controls.stop;
  }, [delay, opacity, scale, posX, posY, x, y]);
  
  const particleColor = React.useMemo(() => {
    const colors = [
      'rgba(169, 169, 169, 0.5)',
      'rgba(192, 192, 192, 0.4)',
      'rgba(128, 128, 128, 0.5)',
      'rgba(211, 211, 211, 0.4)',
      'rgba(119, 136, 153, 0.4)',
      'rgba(255, 122, 0, 0.15)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);
  
  const particleSize = React.useMemo(() => {
    return Math.random() * 2 + 1;
  }, []);
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: posX,
        top: posY,
        width: particleSize,
        height: particleSize,
        borderRadius: '50%',
        background: particleColor,
        opacity,
        scale,
        filter: 'blur(0.5px)',
        pointerEvents: 'none',
        willChange: 'opacity, scale, transform',
      }}
    />
  );
};

export default MetalDustParticle;
