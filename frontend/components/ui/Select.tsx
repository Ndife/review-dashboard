import { LucideIcon } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  icon: LucideIcon;
  options: SelectOption[];
  value: string | number | undefined;
  onChange: (value: string) => void;
  containerClassName?: string;
  selectClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  containerClassName,
  selectClassName,
}) => {
  return (
    <div className={`flex items-center gap-2 text-neutral-400 ${containerClassName}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}:</span>
      </div>
      <select
        className={`bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white ${selectClassName}`}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
