import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, className = '' }) => {
  const inputClasses = `
    w-full p-3 border rounded-md
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${className}
  `;

  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses.trim()}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default Input;