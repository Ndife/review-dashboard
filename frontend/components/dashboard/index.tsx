'use client';

import { useReviews } from '@/hooks/useReviews';
import { DashboardStats } from './DashboardStats';
import { ReviewFilters } from './ReviewFilters';
import { ReviewList } from './ReviewList';

export default function Dashboard() {
  const { reviews, meta, loading, filters, setRatingFilter, setSort, toggleVisibility } =
    useReviews();

  // Metrics
  const totalReviews = meta?.total || 0;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Manager Dashboard
          </h1>
          <p className="text-neutral-400 mt-2">Monitor and validate guest feedback.</p>
        </div>
        <div className="flex gap-4">
          <a
            href="/property/1"
            target="_blank"
            className="px-4 py-2 rounded-full glass hover:bg-white/5 transition-colors text-sm font-medium flex items-center gap-2"
          >
            View Public Page
          </a>
        </div>
      </div>

      <DashboardStats reviews={reviews} totalReviews={totalReviews} />

      <ReviewFilters
        ratingFilter={filters.rating}
        setRatingFilter={setRatingFilter}
        sort={filters.sort}
        setSort={setSort}
      />

      <ReviewList reviews={reviews} loading={loading} onToggleVisibility={toggleVisibility} />
    </div>
  );
}
