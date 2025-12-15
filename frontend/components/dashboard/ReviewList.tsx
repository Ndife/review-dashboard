import { Review } from '@/types';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  loading: boolean;
  onToggleVisibility: (id: number, currentStatus: boolean) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading, onToggleVisibility }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
      {loading ? (
        <div className="text-center py-20 text-neutral-500">Loading reviews...</div>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} onToggleVisibility={onToggleVisibility} />
        ))
      )}
    </div>
  );
};
