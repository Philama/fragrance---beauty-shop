import React from 'react';
import { AccordionItemProps } from '../types';
import { CaretDownIcon } from './Icons';

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, initiallyOpen = false }) => {
  return (
    <details className="flex flex-col border-t border-t-[#e4dddd] group" open={initiallyOpen}>
      <summary className="flex cursor-pointer items-center justify-between gap-6 py-3 list-none">
        <p className="text-[#171212] text-sm font-medium leading-normal">{title}</p>
        <CaretDownIcon className="text-[#171212] group-open:rotate-180 transition-transform duration-200" size="20px" />
      </summary>
      <div className="pb-3 pt-1 text-[#82686a] text-sm font-normal leading-normal">
        {children}
      </div>
    </details>
  );
};
