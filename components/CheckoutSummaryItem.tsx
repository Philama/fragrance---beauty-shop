
import React from 'react';
import { CheckoutSummaryItemProps } from '../types';

export const CheckoutSummaryItem: React.FC<CheckoutSummaryItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
      <div className="flex items-center gap-4 flex-grow">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 shrink-0"
          style={{ backgroundImage: `url("${item.imageUrl}")` }}
          role="img"
          aria-label={item.name} // Use item.name for aria-label directly
        ></div>
        <div className="flex flex-col justify-center flex-grow">
          <p className="text-[#181111] text-base font-medium leading-normal line-clamp-1">{item.name}</p>
          <p className="text-[#886364] text-sm font-normal leading-normal line-clamp-2">{item.size}</p>
        </div>
      </div>
      <div className="shrink-0">
        <p className="text-[#181111] text-base font-normal leading-normal">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};
