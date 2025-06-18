
import React from 'react';
import { ReviewCardProps } from '../types';
import { ReviewStars } from './ReviewStars';
import { ThumbsUpIcon, ThumbsDownIcon } from './Icons';

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex flex-col gap-3 bg-white">
      <div className="flex items-center gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
          style={{ backgroundImage: `url("${review.reviewer.imageUrl}")` }}
          role="img"
          aria-label={`Foto de perfil de ${review.reviewer.name}`}
        ></div>
        <div className="flex-1">
          <p className="text-[#171212] text-base font-medium leading-normal">{review.reviewer.name}</p>
          <p className="text-[#82686a] text-sm font-normal leading-normal">{review.date}</p>
        </div>
      </div>
      <ReviewStars rating={review.rating} size="20px" />
      <p className="text-[#171212] text-base font-normal leading-normal">{review.text}</p>
      <div className="flex gap-9 text-[#82686a]">
        <button className="flex items-center gap-2 hover:text-[#171212]" aria-label={`Me gusta la reseña (${review.likes} me gusta)`}>
          <ThumbsUpIcon size="20px" />
          <p className="text-inherit">{review.likes}</p>
        </button>
        <button className="flex items-center gap-2 hover:text-[#171212]" aria-label={`No me gusta la reseña (${review.dislikes} no me gusta)`}>
          <ThumbsDownIcon size="20px" />
          <p className="text-inherit">{review.dislikes}</p>
        </button>
      </div>
    </div>
  );
};
