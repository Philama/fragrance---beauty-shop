import React from 'react';
import { RatingDistributionBarProps } from '../types';

export const RatingDistributionBar: React.FC<RatingDistributionBarProps> = ({
  stars,
  percentage,
  barColor = "bg-[#171212]",
  bgColor = "bg-[#e4dddd]",
}) => {
  return (
    <>
      <p className="text-[#171212] text-sm font-normal leading-normal">{stars}</p>
      <div className={`flex h-2 flex-1 overflow-hidden rounded-full ${bgColor}`}>
        <div className={`rounded-full ${barColor}`} style={{ width: `${percentage}%` }} aria-hidden="true"></div>
      </div>
      <p className="text-[#82686a] text-sm font-normal leading-normal text-right w-[40px]">{percentage}%</p>
    </>
  );
};
