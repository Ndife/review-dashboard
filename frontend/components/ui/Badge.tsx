import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'neutral' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className }) => {
  const variants = {
    success: 'bg-green-500/10 text-green-400',
    warning: 'bg-yellow-500/10 text-yellow-400',
    neutral: 'bg-neutral-800/50 text-neutral-400 border border-neutral-700',
    outline: 'text-neutral-500 border border-neutral-800',
  };

  return (
    <span
      className={clsx(
        'px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
