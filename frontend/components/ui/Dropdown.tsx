'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { DropdownItem } from '../../types/navigation';

interface DropdownProps {
  trigger: React.ReactNode; // Content of the button that opens the dropdown
  items: DropdownItem[];
  className?: string; // Additional classes for the trigger
  dropdownClassName?: string; // Additional classes for the dropdown container
  linkClassName?: string; // Additional classes for the dropdown items
  linkIconClassName?: string;
  align?: 'left' | 'right' | 'center';
  showChevron?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  className,
  dropdownClassName,
  linkClassName,
  linkIconClassName,
  align = 'left',
  showChevron = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx('flex items-center gap-1 focus:outline-hidden', className)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown
            className={clsx('w-3 h-3 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        className={clsx(
          'absolute z-50 mt-2 p-1 min-w-32 rounded-md shadow-lg bg-white ring-1 ring-black/5 transition-all duration-200 ease-out origin-top',
          align === 'right'
            ? 'right-0'
            : align === 'center'
              ? 'left-1/2 -translate-x-1/2'
              : 'left-0',
          isOpen ? 'opacity-100 scale-100 transform' : 'opacity-0 scale-95 pointer-events-none',
          dropdownClassName
        )}
      >
        <div className="py-1" role="menu" aria-orientation="vertical">
          {items.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={clsx(
                    'group flex items-center gap-3 px-4 text-sm text-gray-700 hover:bg-[#284E4C] hover:text-white hover:rounded-md transition-colors',
                    linkClassName
                  )}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && (
                    <span className={clsx('text-2xl', linkIconClassName)}>{item.icon}</span>
                  )}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                  className={clsx(
                    'group flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#284E4C] hover:text-white hover:rounded-md transition-colors',
                    linkClassName
                  )}
                  role="menuitem"
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
