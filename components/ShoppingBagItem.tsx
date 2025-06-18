
import React from 'react';
import { ShoppingBagItemProps } from '../types';
import { QuantityControl } from './QuantityControl';

export const ShoppingBagItem: React.FC<ShoppingBagItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      onRemoveItem(item.id); 
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };
  
  return (
    <div className="flex gap-4 bg-white px-4 py-3 justify-between items-center">
      <div className="flex items-start gap-4">
        <div
          className="bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg w-[70px] h-[93px] shrink-0"
          style={{ backgroundImage: `url("${item.imageUrl}")` }}
          role="img"
          aria-label={`${item.brand} ${item.name}`}
        ></div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-[#171212] text-base font-medium leading-normal">{item.brand}</p>
          <p className="text-[#82686a] text-sm font-normal leading-normal">
            {item.name} - Tamaño: {item.size}
          </p>
          <p className="text-[#82686a] text-sm font-normal leading-normal">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="shrink-0">
        <QuantityControl
          quantity={item.quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onQuantityChange={handleQuantityChange}
        />
      </div>
    </div>
  );
};
