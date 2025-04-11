import React from 'react';
import { AnyFieldApi } from '@tanstack/react-form';
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface BuCheckBoxProps {
  label: string;
  field: AnyFieldApi;
  icon?: React.ReactNode;
  error?: string;
  onChange?: () => void;
}

export default function BuCheckBox({
  label,
  field,
  icon,
  error,
  onChange,
}: BuCheckBoxProps) {
  const isChecked = field.state.value;
  
  const handleClick = () => {
    field.handleChange(!isChecked);
    if (onChange) {
      onChange();
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        flex flex-row justify-center items-center
        py-3 px-4 gap-3
        rounded-full border
        transition-colors duration-200
        ${isChecked 
          ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]' 
          : error
              ? 'bg-white text-[#DC3545] border-[#DC3545]'
              : 'bg-white text-[#1B1B1B] border-[#1B1B1B] hover:bg-[#DCE6E6]'}
        font-["Open_Sans"] text-base
      `}
      aria-pressed={isChecked}
    >
      <span>{label}</span>
      {isChecked 
        ? <CheckIcon className="w-4 h-4" />
        : error 
          ? <ExclamationCircleIcon className="w-4 h-4 text-[#DC3545]" />
          : icon
      }
    </button>
  );
}