import { Review } from '@/types';
import { Button } from '../ui/Button';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

interface ReviewCardProps {
  review: Review;
  onToggleVisibility: (id: number, currentStatus: boolean) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onToggleVisibility }) => {
  return (
    <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                'px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider',
                {
                  'bg-green-500/10 text-green-400': review.rating && review.rating >= 4,
                  'bg-yellow-500/10 text-yellow-400': review.rating && review.rating < 4,
                }
              )}
            >
              {review.rating || 'N/A'} / 10
            </span>
            <span className="text-neutral-400 text-sm">
              {new Date(review.submittedAt).toLocaleDateString()}
            </span>
            <span className="text-neutral-500 text-xs px-2 py-0.5 border border-neutral-800 rounded-full">
              {review.listingName} | {review.type}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-white">{review.guestName}</h4>
          <p className="text-neutral-300 leading-relaxed max-w-3xl">{review.content}</p>
        </div>

        <Button
          onClick={() => onToggleVisibility(review.id, review.isPublic)}
          variant="outline"
          className={clsx(
            'flex items-center gap-2 h-9 text-sm font-medium transition-all duration-200 border bg-transparent',
            review.isPublic
              ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-400'
              : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-600'
          )}
        >
          {review.isPublic ? (
            <>
              <Eye className="w-4 h-4" /> Published
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" /> Hidden
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
