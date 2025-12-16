import { Filter, ArrowUpDown } from 'lucide-react';
import { GetReviewsParams } from '@/lib/api-client';

interface ReviewFiltersProps {
  ratingFilter: number | undefined;
  setRatingFilter: (rating: number | undefined) => void;
  sort: GetReviewsParams['sort'];
  setSort: (sort: GetReviewsParams['sort']) => void;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  ratingFilter,
  setRatingFilter,
  sort,
  setSort,
}) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 items-stretch md:items-center justify-between glass p-4 rounded-xl animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2 text-neutral-400">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filter:</span>
        </div>
        <select
          className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white w-full sm:w-auto"
          value={ratingFilter || ''}
          onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2 text-neutral-400">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm">Sort:</span>
        </div>
        <select
          className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white w-full sm:w-auto"
          value={sort || ''}
          onChange={(e) => setSort(e.target.value as GetReviewsParams['sort'])}
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="rating_desc">Highest Rated</option>
          <option value="rating_asc">Lowest Rated</option>
        </select>
      </div>
    </div>
  );
};
