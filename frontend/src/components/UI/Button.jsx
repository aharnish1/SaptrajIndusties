import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-300 relative overflow-hidden group font-body";
  
  const variants = {
    primary: "btn-primary-gradient text-deep-black hover:scale-105",
    secondary: "btn-secondary-gradient text-accent-primary hover:text-glow-primary hover:scale-105",
    outline: "bg-transparent border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-primary hover:shadow-[0_0_15px_rgba(255,122,0,0.15)]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
      )}
    </button>
  );
};

export default Button;
