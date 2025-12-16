import { Filter, ArrowUpDown } from 'lucide-react';
import { GetReviewsParams } from '@/lib/api-client';
import { Select } from '../ui/Select';

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
      <Select
        label="Filter"
        icon={Filter}
        options={[
          { value: '', label: 'All Ratings' },
          { value: '5', label: '5 Stars' },
          { value: '4', label: '4+ Stars' },
          { value: '3', label: '3+ Stars' },
        ]}
        value={ratingFilter}
        onChange={(val: string) => setRatingFilter(val ? Number(val) : undefined)}
        containerClassName="w-full md:w-auto"
        selectClassName="w-full sm:w-auto"
      />

      <Select
        label="Sort"
        icon={ArrowUpDown}
        options={[
          { value: 'date_desc', label: 'Newest First' },
          { value: 'date_asc', label: 'Oldest First' },
          { value: 'rating_desc', label: 'Highest Rated' },
          { value: 'rating_asc', label: 'Lowest Rated' },
        ]}
        value={sort}
        onChange={(val: string) => setSort(val as GetReviewsParams['sort'])}
        containerClassName="w-full md:w-auto"
        selectClassName="w-full sm:w-auto"
      />
    </div>
  );
};
