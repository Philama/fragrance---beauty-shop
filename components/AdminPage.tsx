
import React, { useState } from 'react';
import { Product, AdminPageProps } from '../types';
import { HouseIcon, SignOutIcon } from './Icons';

export const AdminPage: React.FC<AdminPageProps> = ({ onAddNewProduct, onNavigateHome, onLogout, currentUser }) => {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    if (!brand.trim() || !name.trim() || !price.trim() || !imageUrl.trim()) {
      setFeedback('Todos los campos son obligatorios.');
      setIsSubmitting(false);
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setFeedback('El precio debe ser un número positivo.');
      setIsSubmitting(false);
      return;
    }

    try {
      new URL(imageUrl);
    } catch (_) {
      setFeedback('La URL de la imagen no es válida.');
      setIsSubmitting(false);
      return;
    }
    
    const newProduct: Product = {
      id: `temp-${Date.now().toString()}`, 
      brand,
      name,
      price: numericPrice,
      imageUrl,
    };

    try {
      await onAddNewProduct(newProduct);
      setFeedback(`Producto "${newProduct.name}" añadido exitosamente!`);
      setBrand('');
      setName('');
      setPrice('');
      setImageUrl('');
    } catch (error: any) {
      setFeedback(`Error al añadir producto: ${error.message || 'Error desconocido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
        className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden p-4 md:p-8"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <header className="mb-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#181111]">Panel de Administración</h1>
                {currentUser && <p className="text-sm text-gray-500">Conectado como: {currentUser.email}</p>}
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white text-sm font-bold rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Cerrar sesión de administrador"
                >
                    <SignOutIcon className="text-white" size="20px" />
                    <span>Cerrar Sesión</span>
                </button>
                <button
                    onClick={onNavigateHome}
                    className="flex items-center gap-2 px-4 py-2 bg-[#e82630] text-white text-sm font-bold rounded-full hover:bg-[#c62029] transition-colors"
                    aria-label="Volver a la tienda"
                >
                    <HouseIcon className="text-white" size="20px" />
                    <span>Volver a la Tienda</span>
                </button>
            </div>
        </div>
        <p className="text-gray-600 mt-1">Añadir nuevos productos al catálogo.</p>
      </header>

      {feedback && (
        <div 
            className={`p-4 mb-6 rounded-md text-sm ${feedback.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            role="alert"
        >
          {feedback}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Marca
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50"
            placeholder="Ej: Dior"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50"
            placeholder="Ej: J'adore Eau de Parfum"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio ($)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0.01"
            step="0.01"
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50"
            placeholder="Ej: 110.00"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL de la Imagen
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50"
            placeholder="Ej: https://example.com/image.jpg"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-w-[120px] items-center justify-center rounded-full h-11 px-6 bg-[#e82630] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c62029] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e82630] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Añadiendo...' : 'Añadir Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};
