import React, { useState } from 'react';
import { Product, AdminPageProps } from '../types';
import { HouseIcon, SignOutIcon } from './Icons';
import * as XLSX from 'xlsx';
import { supabase } from '../supabaseClient';

export const AdminPage: React.FC<AdminPageProps> = ({ onAddNewProduct, onNavigateHome, onLogout, currentUser }) => {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products for admin list
  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data.map((row: any) => ({
        id: row.id,
        brand: row.brand,
        name: row.name,
        price: row.price,
        imageUrl: row.image_url,
      })));
    };
    fetchProducts();
  }, []);

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

  // Handle Excel file upload
  const handleExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFeedback(null);
    setIsSubmitting(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: any[] = XLSX.utils.sheet_to_json(worksheet);
      let addedCount = 0;
      for (const row of json) {
        // Adaptar para el formato extendido
        if (row.Marca && row.NombreProducto && row.Categoria) {
          const newProduct: Product = {
            id: `temp-${Date.now().toString()}-${Math.random()}`,
            brand: row.Marca,
            name: row.NombreProducto,
            price: parseFloat(row.PrecioFinal || row.PrecioOriginal || '0'),
            imageUrl: row.URLImagen ? (row.URLImagen.startsWith('http') ? row.URLImagen : `https://TU_DOMINIO.com/images/${row.URLImagen}`) : '',
            category: row.Categoria,
            // Puedes guardar otros campos en la base de datos si tu modelo lo permite
          };
          try {
            await onAddNewProduct(newProduct);
            addedCount++;
          } catch (error: any) {
            // Optionally handle row error
          }
        }
      }
      setFeedback(`${addedCount} productos añadidos exitosamente desde el archivo Excel.`);
    } catch (error: any) {
      setFeedback('Error al procesar el archivo Excel.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (!error) {
      setProducts(products => products.filter(p => p.id !== productId));
      setFeedback('Producto eliminado exitosamente.');
    } else {
      setFeedback('Error al eliminar el producto.');
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Ej: Dior" />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Ej: J'adore Eau de Parfum" />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0.01" step="0.01" disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Ej: 110.00" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
            <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Ej: https://example.com/image.jpg" />
          </div>
          <div>
            <label htmlFor="codigoProducto" className="block text-sm font-medium text-gray-700 mb-1">Código Producto</label>
            <input type="text" id="codigoProducto" disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Ej: 12345" />
          </div>
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <input type="text" id="categoria" disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Ej: Fragancias" />
          </div>
          <div>
            <label htmlFor="subcategoria" className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
            <input type="text" id="subcategoria" disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Ej: Perfumería Masculina" />
          </div>
          <div>
            <label htmlFor="descripcionCorta" className="block text-sm font-medium text-gray-700 mb-1">Descripción Corta</label>
            <textarea id="descripcionCorta" rows={2} disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Breve descripción del producto" />
          </div>
          <div>
            <label htmlFor="beneficiosClave" className="block text-sm font-medium text-gray-700 mb-1">Beneficios Clave</label>
            <textarea id="beneficiosClave" rows={2} disabled={isSubmitting} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e8b4b7] focus:border-[#e8b4b7] sm:text-sm disabled:bg-gray-50" placeholder="Beneficio 1, Beneficio 2, ..." />
          </div>
        </div>
        <div>
          <label htmlFor="excelFile" className="block text-sm font-medium text-gray-700 mb-1">O cargar productos desde archivo Excel</label>
          <input type="file" id="excelFile" accept=".xlsx,.xls" onChange={handleExcelUpload} disabled={isSubmitting} className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e8b4b7] file:text-white hover:file:bg-[#e82630]" />
          <p className="text-xs text-gray-500 mt-1">El archivo debe tener columnas: <b>Marca, NombreProducto, CodigoProducto, Puntos, Categoria, Subcategoria, PrecioOriginal, PorcentajeDescuento, PrecioFinal, PrecioSinImpuestosNacionales, Moneda, NotasOlfativasTipoPiel, DescripcionCorta, BeneficiosClave, URLImagen, StockLimiteUnidades, IncluyeItems, AptoDesdeEdad</b>.<br/>Puedes descargar un <a href="/ejemplo_productos.xlsx" download className="text-[#e82630] underline hover:text-[#c62029]">ejemplo aquí</a>.</p>
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="flex min-w-[120px] items-center justify-center rounded-full h-11 px-6 bg-[#e82630] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c62029] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e82630] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">{isSubmitting ? 'Añadiendo...' : 'Añadir Producto'}</button>
        </div>
      </form>

      {/* Lista de productos para eliminar */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Eliminar productos</h2>
        <ul className="divide-y divide-gray-200">
          {products.map(product => (
            <li key={product.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <div className="font-medium text-[#181111]">{product.brand}</div>
                  <div className="text-sm text-[#886364]">{product.name}</div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
