
import React from 'react';
import { CustomerReviewsProps } from '../types';
import { ReviewStars } from './ReviewStars';
import { RatingDistributionBar } from './RatingDistributionBar';
import { ReviewCard } from './ReviewCard';

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  averageRating,
  totalReviews,
  ratingDistribution,
  reviews,
}) => {
  return (
    <>
      <h2 className="text-[#171212] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Opiniones de Clientes</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-6 p-4 items-start">
        <div className="flex flex-col gap-2">
          <p className="text-[#171212] text-4xl font-black leading-tight tracking-[-0.033em]">{averageRating.toFixed(1)}</p>
          <ReviewStars rating={averageRating} size="18px" />
          <p className="text-[#171212] text-base font-normal leading-normal">{totalReviews} opiniones</p>
        </div>
        <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-3">
          {ratingDistribution.sort((a,b) => b.stars - a.stars).map(dist => (
            <RatingDistributionBar key={dist.stars} stars={dist.stars} percentage={dist.percentage} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 bg-white p-4">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};
