import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-industrial-yellow text-deep-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,212,0,0.5)]",
    secondary: "bg-transparent border border-industrial-yellow text-industrial-yellow hover:bg-industrial-yellow hover:text-deep-black box-glow",
    outline: "bg-transparent border border-gunmetal-gray text-gray-300 hover:text-white hover:border-gray-500",
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
