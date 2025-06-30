import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled, className = '' }) => {
  let buttonClasses = `
    px-4 py-2 rounded-md font-semibold text-lg
    transition-colors duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  if (variant === 'primary') {
    buttonClasses += ` bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`;
  } else if (variant === 'secondary') {
    buttonClasses += ` bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400`;
  } else if (variant === 'danger') {
    buttonClasses += ` bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`;
  } else if (variant === 'outline') {
    buttonClasses += ` border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500`;
  }

  buttonClasses += ` ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses.trim()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;