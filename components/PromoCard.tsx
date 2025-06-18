
import React from 'react';
import { PromoCardProps } from '../types';

export const PromoCard: React.FC<PromoCardProps> = ({ title, subtitle, buttonText, imageUrl }) => {
  return (
    <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      <div className="flex flex-[2_2_0px] flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[#181111] text-base font-bold leading-tight">{title}</p>
          <p className="text-[#886364] text-sm font-normal leading-normal">{subtitle}</p>
        </div>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#f4f0f0] text-[#181111] text-sm font-medium leading-normal w-fit"
        >
          <span className="truncate">{buttonText}</span>
        </button>
      </div>
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
    </div>
  );
};
