
import React from 'react';
import { CheckoutSummaryPageProps } from '../types';
import { CheckoutSummaryItem } from './CheckoutSummaryItem';
import { ArrowLeftIcon } from './Icons';

export const CheckoutSummaryPage: React.FC<CheckoutSummaryPageProps> = ({
  items,
  paymentSummary,
  onBack,
  onProceedToPayment,
}) => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      role="main" 
    >
      <div>
        <div className="flex items-center bg-white p-4 pb-2 justify-between border-b border-gray-200 sticky top-0 z-10">
          <ArrowLeftIcon onClick={onBack} size="24px" className="text-[#181111]" />
          <h2 className="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Tu Bolsa</h2>
        </div>

        {items.map((item) => (
          <CheckoutSummaryItem key={item.id} item={item} />
        ))}
        
        <div className="border-t border-gray-100 mt-2">
            <h3 className="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Resumen de Pago</h3>
            <div className="p-4">
            <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#886364] text-sm font-normal leading-normal">Subtotal</p>
                <p className="text-[#181111] text-sm font-normal leading-normal text-right">${paymentSummary.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#886364] text-sm font-normal leading-normal">Envío</p>
                <p className="text-[#181111] text-sm font-normal leading-normal text-right">
                {paymentSummary.shipping === 0 ? 'Gratis' : `$${paymentSummary.shipping.toFixed(2)}`}
                </p>
            </div>
            <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#886364] text-sm font-normal leading-normal">Impuestos</p>
                <p className="text-[#181111] text-sm font-normal leading-normal text-right">${paymentSummary.taxes.toFixed(2)}</p>
            </div>
            {paymentSummary.discount > 0 && (
                <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#886364] text-sm font-normal leading-normal">Descuento</p>
                <p className="text-[#181111] text-sm font-normal leading-normal text-right">-${paymentSummary.discount.toFixed(2)}</p>
                </div>
            )}
            </div>
            <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#181111] text-base font-bold leading-normal">Total</p>
                <p className="text-[#181111] text-base font-bold leading-normal text-right">${paymentSummary.total.toFixed(2)}</p>
            </div>
            </div>
        </div>

        {paymentSummary.klarnaPayment && (
          <p className="text-[#181111] text-base font-normal leading-normal pb-3 pt-1 px-4">
            O 4 pagos sin interés de ${paymentSummary.klarnaPayment.toFixed(2)} con Klarna
          </p>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200">
        <div className="flex px-4 py-3">
          <button
            onClick={onProceedToPayment}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#e82630] hover:bg-[#c62029] text-white text-base font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Proceder al Pago</span>
          </button>
        </div>
        <div className="h-5 bg-white"></div>
      </div>
    </div>
  );
};
