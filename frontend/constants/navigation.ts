import { Info, BookOpen, Mail } from 'lucide-react';
import { DropdownItem, NavLink } from '../types/navigation';

export const landlordsItems: DropdownItem[] = [
  { label: 'LONDON', href: '#', icon: '🇬🇧' },
  { label: 'ALGIERS', href: '#', icon: '🇬🇧' },
  { label: 'PARIS', href: '#', icon: '🇫🇷' },
];

export const languageItems: DropdownItem[] = [
  { label: 'English', symbol: 'GBP', href: '#', icon: '🇬🇧' },
  { label: 'Français', symbol: 'EUR', href: '#', icon: '🇫🇷' },
  { label: 'Español', symbol: 'ESP', href: '#', icon: '🇪🇸' },
  { label: 'العربية', symbol: 'AR', href: '#', icon: '🇩🇿' },
  { label: '中文', symbol: 'CN', href: '#', icon: '🇨🇳' },
];

export const currencyItems: DropdownItem[] = [
  { label: 'USD', href: '#', icon: '$' },
  { label: 'EUR', href: '#', icon: '€' },
  { label: 'GBP', href: '#', icon: '£' },
  { label: 'DZD', href: '#', icon: 'دج' },
];

export const navLinks: NavLink[] = [
  { label: 'About Us', href: '#', icon: Info },
  { label: 'Careers', href: '#', icon: BookOpen },
  { label: 'Contact', href: '#', icon: Mail },
];
