
import React from 'react';
import { QuantityDropdownProps } from '../types';

export const QuantitySelector: React.FC<QuantityDropdownProps> = ({ selectedQuantity, onQuantityChange, maxQuantity = 10 }) => {
  const options = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-[#171212] text-base font-medium leading-normal pb-2">Cantidad</p>
        <select
          value={selectedQuantity}
          onChange={(e) => onQuantityChange(parseInt(e.target.value, 10))}
          className="form-select appearance-none block w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#171212] focus:outline-0 focus:ring-0 border border-[#e4dddd] bg-white focus:border-[#cdb8b9] h-14 bg-no-repeat bg-right-[15px] p-[15px] text-base font-normal leading-normal"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(130,104,106)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e")',
            backgroundSize: '20px 20px',
          }}
          aria-label="Seleccionar cantidad"
        >
          {options.map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>
    </div>
  );
};
