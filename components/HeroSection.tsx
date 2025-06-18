
import React from 'react';
import { HeroSectionProps } from '../types';

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, imageUrl, buttonText }) => {
  return (
    <div
      className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px]"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url("${imageUrl}")`,
      }}
    >
      <div className="flex w-full items-end justify-between gap-4 p-4">
        <div className="flex max-w-[440px] flex-1 flex-col gap-1">
          <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">{title}</p>
          <p className="text-white text-base font-medium leading-normal">{subtitle}</p>
        </div>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e82630] text-white text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">{buttonText}</span>
        </button>
      </div>
    </div>
  );
};
