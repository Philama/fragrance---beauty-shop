
import React, { useState, useEffect } from 'react';
import { ProductDetailsPageProps, DetailedProduct, CartItem, ProductVariant } from '../types';
import { ArrowLeftIcon, ShoppingBagIcon as PdpShoppingBagIcon, StarIcon } from './Icons';
import { ImageGallery } from './ImageGallery';
import { VariantSelector } from './VariantSelector';
import { QuantitySelector } from './QuantitySelector';
import { AccordionItem } from './AccordionItem';
import { CustomerReviews } from './CustomerReviews';

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onNavigateToCart,
  onAddToCart,
  cartItemCount,
}) => {
  if (!product) {
    return <div className="p-4">Cargando detalles del producto...</div>;
  }

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(product.defaultVariantId || product.variants[0]?.id);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
  const currentPrice = selectedVariant?.price || product.price;

  useEffect(() => {
    if (product) {
      const defaultVarId = product.defaultVariantId || product.variants[0]?.id;
      if (!product.variants.find(v => v.id === selectedVariantId) && defaultVarId) {
        setSelectedVariantId(defaultVarId);
      } else if (!defaultVarId && selectedVariantId) {
        setSelectedVariantId(undefined);
      }
    }
  }, [product, selectedVariantId]);
  
  const handleAddToCartClick = () => {
    if (selectedVariantId) {
      onAddToCart(product, selectedVariantId, selectedQuantity);
    } else {
      alert("Por favor, selecciona un tamaño.");
    }
  };
  
  const handleBuyNowClick = () => {
    if (selectedVariantId) {
      onAddToCart(product, selectedVariantId, selectedQuantity);
      onNavigateToCart();
    } else {
      alert("Por favor, selecciona un tamaño.");
    }
  };

  const cssVariables = {
    '--select-button-svg': `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(130,104,106)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')`
  } as React.CSSProperties;

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white justify-between group/design-root overflow-x-hidden"
      style={{ ...cssVariables, fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center bg-white p-4 pb-2 justify-between sticky top-0 z-20 border-b border-gray-100">
          <ArrowLeftIcon onClick={onBack} />
          <div className="flex w-12 items-center justify-end relative">
            <PdpShoppingBagIcon onClick={onNavigateToCart} />
            {cartItemCount !== undefined && cartItemCount > 0 && (
              <span 
                className="absolute top-1 right-[-4px] flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#e82630] rounded-full"
                aria-hidden="true"
              >
                {cartItemCount}
              </span>
            )}
          </div>
        </div>

        <ImageGallery imageUrls={product.imageUrls} productName={product.name} />

        <h1 className="text-[#171212] text-xl font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-1 pt-4">{product.brand} - {product.name}</h1>
        <p className="text-[#82686a] text-base font-normal leading-normal pb-2 pt-1 px-4">{product.description}</p>
        <p className="text-[#171212] text-lg font-semibold leading-normal pb-3 px-4">
          ${currentPrice.toFixed(2)}
          {product.installments && ` o ${product.installments.count} cuotas sin interés de $${product.installments.amount.toFixed(2)}`}
        </p>

        <VariantSelector 
          variants={product.variants} 
          selectedVariantId={selectedVariantId}
          onSelectVariant={setSelectedVariantId}
          groupName={`product-${product.id}-size`}
        />
        
        <QuantitySelector selectedQuantity={selectedQuantity} onQuantityChange={setSelectedQuantity} />

        <div className="flex flex-col p-4">
          <AccordionItem title="Detalles del Producto" initiallyOpen={true}>
            <p>{product.productDetailsContent}</p>
          </AccordionItem>
          <AccordionItem title="Tamaño y Ajuste">
            <p>{product.sizeAndFitContent}</p>
          </AccordionItem>
          <AccordionItem title="Ingredientes">
            <p>{product.ingredientsContent}</p>
          </AccordionItem>
          <AccordionItem title="Envío y Devoluciones">
            <p>{product.shippingAndReturnsContent}</p>
          </AccordionItem>
        </div>
        
        <CustomerReviews 
          averageRating={product.averageRating}
          totalReviews={product.totalReviews}
          ratingDistribution={product.ratingDistribution}
          reviews={product.reviews}
        />

      </div>
      
      <div className="sticky bottom-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
            <button
              onClick={handleAddToCartClick}
              disabled={!selectedVariantId}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-[#f4f1f1] hover:bg-[#e0e0e0] text-[#171212] text-sm font-bold leading-normal tracking-[0.015em] grow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate">Añadir al Carrito</span>
            </button>
            <button
              onClick={handleBuyNowClick}
              disabled={!selectedVariantId}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-[#e82630] hover:bg-[#c62029] text-white text-sm font-bold leading-normal tracking-[0.015em] grow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate">Comprar Ahora</span>
            </button>
          </div>
        </div>
        <div className="h-5 bg-white"></div>
      </div>
    </div>
  );
};
