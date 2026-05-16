import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const MetalDustText = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [isHovered, setIsHovered] = useState(false);

  const COLORS = {
    silver: 'rgba(192, 192, 192, ',
    gunmetal: 'rgba(100, 105, 115, ',
    darkGray: 'rgba(80, 85, 90, ',
    softWhite: 'rgba(220, 225, 230, ',
    amber: 'rgba(255, 180, 100, ',
    orange: 'rgba(255, 140, 50, ',
  };

  const createParticle = useCallback((canvas) => {
    const isSpark = Math.random() > 0.92;
    const isAmbient = Math.random() > 0.7;
    
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: isSpark 
        ? Math.random() * 1.5 + 0.5 
        : Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * (isAmbient ? 0.15 : 0.3),
      speedY: (Math.random() - 0.5) * (isAmbient ? 0.1 : 0.2) - 0.05,
      opacity: Math.random() * 0.4 + 0.1,
      fadeIn: true,
      fadeOut: false,
      fadeSpeed: 0.002 + Math.random() * 0.003,
      color: isSpark 
        ? COLORS.amber + (Math.random() * 0.3 + 0.2) + ')'
        : COLORS.silver + (Math.random() * 0.3 + 0.1) + ')',
      blur: Math.random() > 0.6 ? 'blur(0.5px)' : 'none',
      isSpark,
    };
  }, [COLORS]);

  const drawParticle = useCallback((ctx, particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    
    if (particle.blur !== 'none') {
      ctx.filter = particle.blur;
    }
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, []);

  const updateParticle = useCallback((particle, canvas, mouse) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    if (mouse.active) {
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 80 && dist > 0) {
        const force = (80 - dist) / 80;
        particle.speedX += (dx / dist) * force * 0.02;
        particle.speedY += (dy / dist) * force * 0.02;
      }
    }
    
    if (particle.fadeIn) {
      particle.opacity += particle.fadeSpeed;
      if (particle.opacity >= Math.random() * 0.3 + 0.2) {
        particle.fadeIn = false;
      }
    }
    
    if (particle.fadeOut) {
      particle.opacity -= particle.fadeSpeed * 2;
    }
    
    if (particle.y < -10 || particle.x < -10 || particle.x > canvas.width + 10) {
      particle.fadeOut = true;
    }
    
    particle.speedX *= 0.995;
    particle.speedY *= 0.995;
    particle.speedY -= 0.002;
    
    return particle.opacity > 0;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = container.getBoundingClientRect();
    
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const particleCount = isHovered ? 60 : 40;
    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(canvas);
      particle.opacity = Math.random() * 0.3;
      particlesRef.current.push(particle);
    }

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      const targetCount = isHovered ? 60 : 40;
      
      while (particlesRef.current.length < targetCount && Math.random() > 0.95) {
        particlesRef.current.push(createParticle(canvas));
      }
      
      particlesRef.current = particlesRef.current.filter(particle => {
        const alive = updateParticle(particle, { width: rect.width, height: rect.height }, mouseRef.current);
        if (alive) {
          drawParticle(ctx, particle);
        }
        return alive;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle, drawParticle, updateParticle, isHovered]);

  const handleMouseEnter = useCallback((e) => {
    setIsHovered(true);
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseRef.current.active = false;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  return (
    <motion.span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ willChange: 'transform' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.4s ease',
        }}
      />
      {children}
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHovered
            ? 'radial-gradient(ellipse at 50% 50%, rgba(180, 185, 195, 0.12) 0%, transparent 70%)'
            : 'transparent',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.span>
  );
};

export default MetalDustText;