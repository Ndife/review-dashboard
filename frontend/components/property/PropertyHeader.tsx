import { PropertyHeaderProps } from '@/types';
import { Button } from '../ui/Button';

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ title, stats }) => {
  return (
    <div className="mb-8 md:mb-12">
      {/* desktop */}
      <div className="hidden md:block space-y-4 pb-8 border-b border-gray-200">
        <header>
          <h1 className="text-3xl font-bold mb-6 text-[#333333]">{title}</h1>
        </header>

        {/* Stats Row */}
        <div className="flex items-center gap-8">
          {stats.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-0 hover:bg-transparent"
              data-state="close"
            >
              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-full">
                  <item.icon className="w-4 h-4 text-[#284E4C]" />
                </div>
                <div className="text-sm">
                  <span className="font-medium text-[#333333]">{item.value}</span>
                  <span className="text-[#5C5C5A] block">{item.label}</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden space-y-4">
        <header className="flex items-start justify-between">
          <h1 className="text-2xl font-bold text-[#333333] leading-tight mb-2">{title}</h1>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 rounded-2xl p-4">
          {stats.map((item, index) => (
            <div key={index} data-state="close" className="cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl shadow-sm">
                  <item.icon className="w-4 h-4 text-[#284E4C]" />
                </div>
                <div>
                  <span className="font-semibold text-[#333333] block">{item.value}</span>
                  <span className="text-sm text-[#5C5C5A]">{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
