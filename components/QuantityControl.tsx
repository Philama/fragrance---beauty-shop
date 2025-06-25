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
    <div className="flex items-center gap-3 text-[#171212]">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-[#f4f1f1] text-2xl font-bold shadow transition hover:bg-[#e8b4b7] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#e8b4b7] disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Disminuir cantidad"
      >
        -
      </button>
      <input
        className="text-xl font-semibold w-14 h-10 text-center bg-white border border-[#e4dddd] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e8b4b7] focus:border-[#e8b4b7] transition disabled:bg-gray-50"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        aria-label="Cantidad actual"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-[#f4f1f1] text-2xl font-bold shadow transition hover:bg-[#e8b4b7] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#e8b4b7] disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
};
