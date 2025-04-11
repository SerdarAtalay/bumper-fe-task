import React from 'react';

interface BuButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function BuButton({
  type = 'button',
  children,
  icon,
  fullWidth = false,
  onClick,
  className = '',
}: BuButtonProps) {
  const baseStyles = "flex flex-row justify-center items-center py-3 px-4 gap-2.5 rounded-full border border-[#1B1B1B] font-['Open_Sans'] text-base bg-[#32BE50] text-[#1B1B1B] hover:text-white hover:bg-[#32BE50]/90 active:bg-[#1B1B1B]/90 ";
  
  const widthStyles = fullWidth ? "w-full" : "";
  
  const buttonStyle = `${baseStyles} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyle}
    >
      <span>{children}</span>
      {icon && (
        <span className="flex items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
}