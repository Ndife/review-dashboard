import { useState, useEffect, useCallback } from 'react';
import { apiClient, ReviewsResponse, GetReviewsParams } from '@/lib/api-client';
import { Review } from '@/types';

interface UseReviewsReturn {
  reviews: Review[];
  meta: ReviewsResponse['meta'] | null;
  loading: boolean;
  error: Error | null;
  filters: {
    rating: number | undefined;
    sort: GetReviewsParams['sort'];
  };
  setRatingFilter: (rating: number | undefined) => void;
  setSort: (sort: GetReviewsParams['sort']) => void;
  toggleVisibility: (id: number, currentStatus: boolean) => Promise<void>;
  refreshReviews: () => Promise<void>;
}

export function useReviews(): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [meta, setMeta] = useState<ReviewsResponse['meta'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Filters
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<GetReviewsParams['sort']>('date_desc');

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.getReviews({ rating: ratingFilter, sort });
      setReviews(data.data);
      setMeta(data.meta);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [ratingFilter, sort]);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);

  const toggleVisibility = async (id: number, currentStatus: boolean) => {
    // Optimistic update
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, isPublic: !currentStatus } : r)));
    try {
      await apiClient.updateReviewVisibility(id, !currentStatus);
    } catch (e) {
      // Revert on fail
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, isPublic: currentStatus } : r)));
      console.error('Failed to update visibility', e);
    }
  };

  return {
    reviews,
    meta,
    loading,
    error,
    filters: {
      rating: ratingFilter,
      sort,
    },
    setRatingFilter,
    setSort,
    toggleVisibility,
    refreshReviews: fetchReviews,
  };
}
