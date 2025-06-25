import React from 'react';
import { ProductCardProps } from '../types';
import { HeartIcon } from './Icons';

interface ProductCardWithFavProps extends ProductCardProps {
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardWithFavProps> = ({ product, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 cursor-pointer relative"
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
      >
        {onToggleFavorite && (
          <button
            className={`absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-[#e82630]/90 transition-colors`}
            onClick={e => { e.stopPropagation(); onToggleFavorite(product.id); }}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <HeartIcon className={isFavorite ? 'text-[#e82630] fill-[#e82630]' : 'text-[#886364]'} size="22px" />
          </button>
        )}
      </div>
      <div>
        <p className="text-[#181111] text-base font-medium leading-normal">{product.brand}</p>
        <p className="text-[#886364] text-sm font-normal leading-normal">{product.name} · ${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};