import React, { useState, useEffect, useCallback } from 'react';
import { SearchPageProps, Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowLeftIcon, MagnifyingGlassIcon } from './Icons';

export const SearchPage: React.FC<SearchPageProps> = ({
  allProducts,
  onProductClick,
  onNavigateHome,
  performSearch,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (currentQuery: string) => {
    if (!currentQuery.trim()) {
      setResults([]);
      setError(null);
      setHasSearched(true); // User cleared search or searched empty
      return;
    }
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const searchResults = await performSearch(currentQuery);
      setResults(searchResults);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error durante la búsqueda.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [performSearch]);

  useEffect(() => {
    // If there's an initial query (e.g., from a deep link or previous state), perform search
    if (initialQuery && initialQuery.trim() !== '') {
      handleSearch(initialQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]); // Only on initialQuery change, not handleSearch

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(query);
  };

  return (
    <div 
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 p-4 flex items-center gap-2">
        <ArrowLeftIcon onClick={onNavigateHome} />
        <form onSubmit={handleSubmit} className="flex-grow flex items-center bg-gray-100 rounded-full h-11 px-4">
          <MagnifyingGlassIcon className="text-gray-500 mr-2" size="20px"/>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim() === '') { // Clear results if input is emptied
                setResults([]);
                setHasSearched(false);
                setError(null);
              }
            }}
            placeholder="Buscar fragancias, belleza..."
            className="flex-grow bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 text-sm"
            aria-label="Campo de búsqueda de productos"
          />
        </form>
         <button 
            type="submit" 
            form="search-form-in-header" // Assuming form has this id if not wrapping button
            onClick={() => handleSearch(query)} // For cases where Enter isn't pressed
            className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-[#e82630] rounded-full hover:bg-[#c62029] transition-colors h-11"
            disabled={isLoading}
            aria-label="Iniciar búsqueda"
        >
            {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <p className="text-gray-600">Buscando productos...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => handleSearch(query)}
              className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#e82630] rounded-full hover:bg-[#c62029]"
            >
              Intentar de Nuevo
            </button>
          </div>
        )}
        {!isLoading && !error && hasSearched && results.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">No se encontraron productos para "{query}".</p>
            <p className="text-gray-500 text-sm mt-2">Intenta con diferentes palabras clave o revisa la ortografía.</p>
          </div>
        )}
        {!isLoading && !error && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map(product => (
              <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
          </div>
        )}
        {!isLoading && !error && !hasSearched && (
             <div className="text-center py-10 mt-10">
                <MagnifyingGlassIcon className="text-gray-300 mx-auto mb-4" size="60px" />
                <p className="text-gray-500 text-lg">Encuentra tus productos favoritos.</p>
                <p className="text-gray-400 text-sm mt-1">Busca por nombre, marca o tipo de producto.</p>
            </div>
        )}
      </main>
    </div>
  );
};
