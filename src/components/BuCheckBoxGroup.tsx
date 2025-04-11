import React from 'react';
import { WrenchIcon } from './BuIcon';

interface BuCheckBoxGroupProps {
  label?: string;
  description?: string;
  children: React.ReactNode;
  error?: string;
}

export default function BuCheckBoxGroup({
  label,
  description,
  children,
  error,
}: BuCheckBoxGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center gap-1.5">
          <WrenchIcon className="w-5 h-5 text-orange-500" />
          <span className="text-base font-semibold text-[#1B1B1B]">
            {label}
          </span>
        </div>
      )}
      
      {description && (
        <p className="text-sm text-[#737373]">
          {description}
        </p>
      )}
      
      <div className="flex flex-row flex-wrap gap-3 mt-2">
        {children}
      </div>
      
      {error && (
        <p className="text-xs text-[#DC3545] mt-2">{error}</p>
      )}
    </div>
  );
}