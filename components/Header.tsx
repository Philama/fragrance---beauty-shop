
import React from 'react';

interface HeaderProps {
  cartIcon: React.ReactNode;
  onCartClick?: () => void;
  cartItemCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartIcon, onCartClick, cartItemCount }) => {
  return (
    <div className="flex items-center bg-white p-4 pb-2 justify-end sticky top-0 z-10">
      <div className="flex w-12 items-center justify-end">
        <button
          onClick={onCartClick}
          className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-[#181111] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
          aria-label={`Bolsa de compras${cartItemCount !== undefined ? `, ${cartItemCount} artículos` : ''}`}
        >
          {cartIcon}
          {cartItemCount !== undefined && cartItemCount > 0 && (
            <span 
              className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#e82630] rounded-full"
              aria-hidden="true"
            >
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
