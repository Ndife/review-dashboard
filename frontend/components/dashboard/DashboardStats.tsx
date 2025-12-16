import { Star } from 'lucide-react';
import { Review } from '@/types';
import { StatsCard } from '../ui/StatsCard';

interface DashboardStatsProps {
  reviews: Review[];
  totalReviews: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ reviews, totalReviews }) => {
  const avgRating =
    reviews.filter((r) => r.rating).reduce((acc, curr) => acc + (curr.rating || 0), 0) /
    (reviews.filter((r) => r.rating).length || 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
      <StatsCard title="Total Reviews" value={totalReviews} />
      <StatsCard
        title="Average Rating"
        value={avgRating.toFixed(1)}
        icon={Star}
        valueClassName="gap-2"
        subValue={<Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
      />
      <StatsCard
        title="Pending Approval"
        value={reviews.filter((r) => !r.isPublic).length}
        valueClassName="text-indigo-400"
      />
    </div>
  );
};
