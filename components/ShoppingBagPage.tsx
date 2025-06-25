import React from 'react';
import { ShoppingBagPageProps } from '../types';
import { ShoppingBagItem } from './ShoppingBagItem';
import { XIcon } from './Icons';

export const ShoppingBagPage: React.FC<ShoppingBagPageProps> = ({
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  subtotal,
  shipping,
  total,
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shopping-bag-title"
    >
      <div>
        <div className="flex items-center bg-white p-4 pb-2 justify-between border-b border-gray-200 sticky top-0 z-10">
          <XIcon onClick={onClose} size="24px" />
          <h2 id="shopping-bag-title" className="text-[#171212] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Bolsa de Compras ({totalItems})
          </h2>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between gap-x-6 py-2">
            <p className="text-[#82686a] text-sm font-normal leading-normal">Subtotal</p>
            <p className="text-[#171212] text-sm font-normal leading-normal text-right">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between gap-x-6 py-2">
            <p className="text-[#82686a] text-sm font-normal leading-normal">Envío</p>
            <p className="text-[#171212] text-sm font-normal leading-normal text-right">
              {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
            </p>
          </div>
          <div className="flex justify-between gap-x-6 py-2 border-t border-gray-200 mt-2 pt-2">
            <p className="text-[#171212] text-base font-bold leading-normal">Total</p>
            <p className="text-[#171212] text-base font-bold leading-normal text-right">${total.toFixed(2)}</p>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-[#82686a] p-8">Tu bolsa de compras está vacía.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <ShoppingBagItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
        )}
        
        {items.length > 0 && (
            <div className="flex flex-col items-center justify-center pb-3 pt-1 px-4">
              <img src="https://www.gocuotas.com/assets/images/logo-gocuotas.svg" alt="GoCuotas" className="h-8 mb-2" style={{maxWidth: '120px'}} />
              <p className="text-[#82686a] text-sm font-normal leading-normal text-center">
                Paga en 4 cuotas sin interés con <a href="https://www.gocuotas.com/" target="_blank" rel="noopener noreferrer" className="text-[#e82630] underline hover:text-[#c62029]">GoCuotas</a> disponibles al finalizar la compra.
              </p>
            </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200">
          <div className="flex px-4 py-3">
            <button
              onClick={onCheckout}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 flex-1 bg-[#e82630] hover:bg-[#c62029] text-white text-base font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Finalizar Compra</span>
            </button>
          </div>
          <div className="h-5 bg-white"></div>
        </div>
      )}
    </div>
  );
};
