import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  subValue?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  subValue,
  className,
  valueClassName,
}) => {
  return (
    <div className={clsx('glass-card p-6 rounded-2xl', className)}>
      <h3 className="text-neutral-400 text-sm font-medium">{title}</h3>
      <div className={clsx('flex items-center gap-2 mt-2', valueClassName)}>
        <span className="text-3xl font-bold">{value}</span>
        {Icon && <Icon className="w-5 h-5" />}
        {subValue}
      </div>
    </div>
  );
};
