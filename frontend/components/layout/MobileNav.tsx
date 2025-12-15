'use client';

import { landlordsItems, navLinks } from '../../constants/navigation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end min-[753px]:hidden">
      {/* Backdrop - blurred overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm opacity-100 pointer-events-auto"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Content */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-[320px] bg-white shadow-xl translate-x-0 text-[#333333] flex flex-col py-8 px-8 space-y-10">
        {/* Landlords Section */}
        <div className="space-y-8">
          <h3 className="text-sm font-semibold text-gray-500 tracking-wider">For Landlords</h3>
          <div className="space-y-6 pl-2">
            {landlordsItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-lg font-medium hover:opacity-70 transition-opacity"
                onClick={onClose}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 tracking-wider">Navigation</h3>
          <div className="space-y-5 pl-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 text-lg font-medium hover:opacity-70 transition-opacity"
                onClick={onClose}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
