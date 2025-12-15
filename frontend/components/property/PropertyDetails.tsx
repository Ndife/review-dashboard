import { useState } from 'react';
import {
  Users,
  Bed,
  Bath,
  Wifi,
  Tv,
  Coffee,
  BathIcon,
  House,
  LucideIcon,
  UtensilsCrossed,
  WashingMachine,
  Wind,
  Thermometer,
  ShieldCheck,
  Network,
  ChevronRight,
} from 'lucide-react';
import { Amenity } from '../../types/property';
import { Button } from '../ui/Button';

// Map string icon names to components
const iconMap: Record<string, LucideIcon> = {
  Users,
  Bed,
  Bath,
  Wifi,
  Tv,
  Coffee,
  BathIcon,
  House,
  Network,
  UtensilsCrossed,
  WashingMachine,
  Wind,
  Thermometer,
  ShieldCheck,
};

const getIconByName = (name: string) => {
  const Icon = iconMap[name];
  return Icon ? <Icon className="w-5 h-5 opacity-70" /> : null;
};

interface PropertyDetailsProps {
  description: string;
  amenities: Amenity[];
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ description, amenities }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="lg:col-span-2">
      {/* Description */}
      <section
        className="rounded-lg text-card-foreground mb-8 p-6 bg-white border-0 shadow-lg"
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading" className="text-2xl font-semibold mb-4 text-[#333333]">
          About this property
        </h2>
        <div className="space-y-4">
          <p className="text-[#5C5C5A] whitespace-pre-line leading-relaxed">
            {isExpanded ? description : `${description.slice(0, 300)}...`}
          </p>
        </div>

        <Button
          variant="link"
          onClick={toggleReadMore}
          className="p-0 h-auto text-[#284E4C] hover:text-[#284E4C]/90 mt-2"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </Button>
      </section>

      {/* Amenities Grid */}
      <section
        className="rounded-lg text-card-foreground mb-8 p-6 bg-white border-0 shadow-lg"
        aria-labelledby="amenities-heading"
      >
        <div className="flex justify-between mb-4">
          <h2 id="amenities-heading" className="text-2xl font-bold mb-6 text-[#5C5C5A]">
            Amenities
          </h2>
          <Button variant="outline" size="sm" className="text-[#284E4C] text-sm font-medium gap-2">
            View all amenities
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-4 text-[#5C5C5A]">
              {getIconByName(amenity.iconName)} {amenity.label}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
