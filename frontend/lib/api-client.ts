import { Review } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export type SortOption =
  | 'date_asc'
  | 'date_desc'
  | 'rating_asc'
  | 'rating_desc';

export interface GetReviewsParams {
  page?: number;
  rating?: number;
  sort?: SortOption;
  publicOnly?: boolean;
}

export interface ReviewsResponse {
  data: Review[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export const apiClient = {
  async getReviews(params: GetReviewsParams = {}): Promise<ReviewsResponse> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.rating) searchParams.set('rating', params.rating.toString());
    if (params.sort) searchParams.set('sort', params.sort);
    if (params.publicOnly) searchParams.set('publicOnly', 'true');

    const res = await fetch(`${API_URL}/reviews?${searchParams.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  async updateReviewVisibility(id: number, isPublic: boolean): Promise<Review> {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublic }),
    });
    if (!res.ok) throw new Error('Failed to update review');
    return res.json();
  },
};
