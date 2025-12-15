import { Review } from '@/types';
import { Star } from 'lucide-react';

interface ReviewsSectionProps {
    reviews: Review[];
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
    return (
        <section className="pt-12 border-t border-gray-100" id="reviews" aria-labelledby="reviews-heading">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h2 id="reviews-heading" className="text-2xl font-bold text-[#284E4C]">Guest Reviews</h2>
                    <div className="flex items-center gap-1 bg-[#284E4C] text-white px-3 py-1 rounded-full text-xs font-bold">
                        <Star className="w-3 h-3 fill-white" />
                        4.9
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {reviews.length === 0 ? (
                        <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500">No reviews available for display.</p>
                        </div>
                ) : (
                    reviews.map((review) => (
                        <article key={review.id} className="bg-white border-b border-gray-100 last:border-0 pb-8 last:pb-0" itemScope itemType="https://schema.org/Review">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-[#284E4C] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {review.guestName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#284E4C] text-lg" itemProp="author">{review.guestName}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <time itemProp="datePublished" dateTime={review.submittedAt.toString()}>
                                            {new Date(review.submittedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                        </time>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-16">
                                    <div className="flex items-center gap-1 mb-2" aria-label={`Rated ${review.rating || 5} out of 5 stars`}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < (review.rating || 5) ? "fill-[#284E4C] text-[#284E4C]" : "fill-gray-200 text-gray-200"}`} />
                                    ))}
                                    </div>
                                <p className="text-gray-600 leading-relaxed text-lg" itemProp="reviewBody">
                                    {review.content}
                                </p>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};
