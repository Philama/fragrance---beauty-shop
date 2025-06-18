import React from 'react';
import { ReviewStarsProps } from '../types';
import { StarIcon } from './Icons';

export const ReviewStars: React.FC<ReviewStarsProps> = ({ 
  rating, 
  size = "18px", 
  className = "",
  starColor = "text-[#171212]",
  emptyStarColor = "text-[#cbbebf]" 
}) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0; // Placeholder for potential half-star logic, though current StarIcon is full/empty
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex gap-0.5 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} size={size} filled className={starColor} />
      ))}
      {/* Placeholder for half star if needed in future, current StarIcon is full/empty
      {hasHalfStar && <StarIcon key="half" size={size} filled={false} className={starColor} />}
      */}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} size={size} filled={false} className={emptyStarColor} />
      ))}
    </div>
  );
};
