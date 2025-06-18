
import React from 'react';
import { QuantityControlProps } from '../types';

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrease,
  onIncrease,
  onQuantityChange,
  min = 0,
  max = 99,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      value = min;
    } else if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    onQuantityChange(value);
  };

  return (
    <div className="flex items-center gap-2 text-[#171212]">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f1f1] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Disminuir cantidad"
      >
        -
      </button>
      <input
        className="text-base font-medium leading-normal w-7 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        aria-label="Cantidad actual"
      />
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f1f1] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
};
