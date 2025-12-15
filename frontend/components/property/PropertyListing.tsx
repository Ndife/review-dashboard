'use client';

import { useState, useEffect } from 'react';
import { Users, Bed, Bath, Wifi, Tv, Coffee, BathIcon, House, LucideIcon } from 'lucide-react';
import { Navbar } from '../layout/Navbar';
import { PhotoGrid } from './PhotoGrid';
import { PropertyDetails } from './PropertyDetails';
import { ReviewsSection } from '../reviews/ReviewsSection';
import { BookingWidget } from '../booking/BookingWidget';
import { PropertyHeader } from './PropertyHeader';
import { Review } from '../../types';
import { apiClient } from '@/lib/api-client';
import { SAMPLE_PROPERTY } from '../../constants/mockData';
import { PropertyStat as PropertyStatType } from '../../types/index';

// Map string icon names to components for the Header
// Map string icon names to components for the Header
const iconMap: Record<string, LucideIcon> = {
  Users,
  Bed,
  Bath,
  Wifi,
  Tv,
  Coffee,
  BathIcon,
  House,
};

// Transform SAMPLE_PROPERTY stats once, as SAMPLE_PROPERTY is static
const mappedStats: PropertyStatType[] = SAMPLE_PROPERTY.stats.map((stat) => ({
  ...stat,
  icon: iconMap[stat.iconName] || House,
}));

export default function PropertyListing() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.getReviews({ publicOnly: true });
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF6] font-sans selection:bg-[#284E4C] selection:text-white">
      <Navbar />
      <main className="max-w-350 mx-auto xl:px-20 px-4 pt-24 pb-20">
        <PhotoGrid photos={SAMPLE_PROPERTY.photos} />

        <PropertyHeader title={SAMPLE_PROPERTY.title} stats={mappedStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
          <div className="lg:col-span-2 space-y-12">
            <PropertyDetails
              description={SAMPLE_PROPERTY.description}
              amenities={SAMPLE_PROPERTY.amenities}
            />
            <ReviewsSection reviews={reviews} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
