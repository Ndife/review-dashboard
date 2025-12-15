import { Star } from 'lucide-react';
import { Review } from '@/types';

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
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-neutral-400 text-sm font-medium">Total Reviews</h3>
        <p className="text-3xl font-bold mt-2">{totalReviews}</p>
      </div>
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-neutral-400 text-sm font-medium">Average Rating</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-3xl font-bold">{avgRating.toFixed(1)}</span>
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        </div>
      </div>
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-neutral-400 text-sm font-medium">Pending Approval</h3>
        <p className="text-3xl font-bold mt-2 text-indigo-400">
          {reviews.filter((r) => !r.isPublic).length}
        </p>
      </div>
    </div>
  );
};
