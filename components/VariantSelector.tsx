
import React from 'react';
import { VariantSelectorProps } from '../types';

export const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, selectedVariantId, onSelectVariant, groupName }) => {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 p-4">
      {variants.map((variant) => (
        <label
          key={variant.id}
          className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-[#171212] relative cursor-pointer transition-all
            ${selectedVariantId === variant.id 
              ? 'border-[3px] border-[#e8b4b7] px-3.5' 
              : 'border-[#e4dddd] hover:border-[#ccb7b8]'
            }`}
        >
          {variant.size}
          <input
            type="radio"
            className="invisible absolute"
            name={groupName}
            value={variant.id}
            checked={selectedVariantId === variant.id}
            onChange={() => onSelectVariant(variant.id)}
            aria-label={`Seleccionar tamaño ${variant.size}`}
          />
        </label>
      ))}
    </div>
  );
};
