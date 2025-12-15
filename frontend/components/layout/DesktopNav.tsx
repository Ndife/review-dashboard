'use client';

import { Building2 } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';
import { landlordsItems, languageItems, currencyItems, navLinks } from '../../constants/navigation';
import { DropdownItem } from '../../types/navigation';

interface DesktopNavProps {
  selectedLanguage: DropdownItem;
  setSelectedLanguage: (item: DropdownItem) => void;
  selectedCurrency: DropdownItem;
  setSelectedCurrency: (item: DropdownItem) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  return (
    <nav className="hidden md:flex px-8 items-center gap-14 text-sm font-medium">
      {/* Landlords Dropdown */}
      <Dropdown
        trigger={
          <span className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">Landlords</span>
          </span>
        }
        items={landlordsItems}
        dropdownClassName="w-42"
      />

      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <link.icon className="w-4 h-4" />
          <span className="font-medium whitespace-nowrap"> {link.label}</span>
        </a>
      ))}

      <div className="flex items-center gap-14">
        {/* Language Dropdown */}
        <Dropdown
          trigger={
            <span className="flex items-center">
              <span className="pr-4 text-lg">{selectedLanguage.icon}</span>
              {selectedLanguage.label}
            </span>
          }
          items={languageItems.map((item) => ({
            ...item,
            onClick: () => setSelectedLanguage(item),
            href: undefined, // Ensure we don't navigate, just select
          }))}
          align="right"
          className=""
          dropdownClassName="w-32"
          linkClassName="py-2 hover:rounded-lg"
          showChevron={false}
        />

        {/* Currency Dropdown */}
        <Dropdown
          trigger={
            <>
              <span className="text-lg filter drop-shadow-sm">{selectedCurrency.icon}</span>
              <span className="text-sm font-medium ml-1 filter drop-shadow-sm">
                {selectedCurrency.label}
              </span>
            </>
          }
          items={currencyItems.map((item) => ({
            ...item,
            onClick: () => setSelectedCurrency(item),
            href: undefined,
          }))}
          align="right"
          dropdownClassName="w-32"
          linkClassName="py-1"
          linkIconClassName="text-sm"
          showChevron={false}
        />
      </div>
    </nav>
  );
};
