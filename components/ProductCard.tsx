import React from 'react';
import { Product, ProductCardProps } from '../types';

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 cursor-pointer"
      onClick={() => onClick(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(product.id);}}
      aria-label={`Ver detalles del producto: ${product.brand} ${product.name}, precio ${product.price.toFixed(2)}`}
    >
      <div
        className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl flex flex-col"
        style={{ backgroundImage: `url("${product.imageUrl}")` }}
        role="img"
        aria-label={`${product.brand} ${product.name}`}
      ></div>
      <div>
        <p className="text-[#181111] text-base font-medium leading-normal">{product.brand}</p>
        <p className="text-[#886364] text-sm font-normal leading-normal">{product.name} · ${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};