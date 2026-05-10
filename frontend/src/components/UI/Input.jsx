import React from 'react';

const Input = ({ label, type = 'text', id, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          className="bg-[#0A0A0A] border border-gunmetal-gray rounded px-4 py-3 text-white focus:outline-none focus:border-industrial-yellow focus:ring-1 focus:ring-industrial-yellow transition-all min-h-[120px]"
          {...props}
        />
      ) : (
        <input
          type={type}
          id={id}
          className="bg-[#0A0A0A] border border-gunmetal-gray rounded px-4 py-3 text-white focus:outline-none focus:border-industrial-yellow focus:ring-1 focus:ring-industrial-yellow transition-all"
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
