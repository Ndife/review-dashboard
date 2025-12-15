import React from 'react';

export interface DropdownItem {
  label: string;
  symbol?: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode | string;
}

export interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}
