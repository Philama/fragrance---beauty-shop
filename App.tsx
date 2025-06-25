import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryTabs, Tab } from './components/CategoryTabs';
import { HeroSection } from './components/HeroSection';
import { ProductCarousel } from './components/ProductCarousel';
import { PromoCard } from './components/PromoCard';
import { BottomNavigationBar, BottomNavItem as BottomNavItemType } from './components/BottomNavigationBar';
import { ShoppingBagPage } from './components/ShoppingBagPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CheckoutSummaryPage } from './components/CheckoutSummaryPage';
import { AdminPage } from './components/AdminPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { UserProfilePage } from './components/UserProfilePage';
import { SearchPage } from './components/SearchPage';
import { Product, PromoCardProps, NavItemType, CartItem, DetailedProduct, PaymentSummary, User } from './types';
import { ShoppingCartIcon, HouseIcon, MagnifyingGlassIcon, HashIcon, HeartIcon, UserCircleIcon, AdminIcon } from './components/Icons';
import { 
  supabase, 
  ProductRow, 
  mapProductRowToDetailedProduct, 
  mapProductRowToProduct,
  signInWithGoogle,
  signOut as supabaseSignOut,
  onAuthStateChange,
  isAdmin as checkIsAdmin
} from './supabaseClient';

type CurrentPage = 'home' | 'shoppingBag' | 'productDetails' | 'checkoutSummary' | 'admin' | 'adminLogin' | 'profile' | 'search';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Fragrances);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DetailedProduct | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [pdpLoading, setPdpLoading] = useState<boolean>(false);

  // Search specific state
  const [searchQueryForPage, setSearchQueryForPage] = useState<string>('');


  // --- Favorites State ---
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('favoriteProductIds');
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem('favoriteProductIds', JSON.stringify(favoriteProductIds));
  }, [favoriteProductIds]);

  // Toggle favorite handler
  const handleToggleFavorite = (productId: string) => {
    setFavoriteProductIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    setAuthLoading(true);
    
    const subscription = onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      const isAdminUser = checkIsAdmin(user);

      setCurrentUser(user);
      setIsCurrentUserAdmin(isAdminUser);
      setAuthLoading(false);

      if (currentPage === 'adminLogin' && user && isAdminUser) {
        setCurrentPage('admin');
      } else if (((currentPage === 'admin' && (!user || !isAdminUser))) || (currentPage === 'profile' && !user)) {
        setCurrentPage('home');
      }
    });
    
    return () => {
      subscription?.unsubscribe();
    };
  }, [currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      setProductsError(null);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, brand, name, price, image_url') 
          .limit(10); 

        if (error) throw error;
        if (data) setAllProducts((data as ProductRow[]).map(mapProductRowToProduct));
      } catch (err: any) {
        setProductsError(`Failed to load products: ${err.message || 'Unknown error'}`);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      setCartItems([
        {
          id: 'checkout-item-1-sample', productId: 'sample-rose-elixir', variantId: 'sample-rose-elixir-1.7floz',
          brand: 'Aroma Floral (Sample)', name: 'Elixir de Rosas (Sample)', size: '1.7 fl oz',
          price: 120, quantity: 1, 
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM9M1SfH_rDjGYXtRkoNnhiZeS47RyvfcLfTzT80SuoV3zB2Ki-bxsFaG_ozk9kNJqAPnh16Gb6YTqBUT211QOUuABqSfVRc6K7ib4utcaexLjb6_og2YkVAw8qkYDFdi0OS3ujEtr6Q8Tus5ZDN33yejPZmgVhXrAnlXAt8IR85cwXGYBlq0ToD4_NN5RqUi9UqMHuFnrBADoBg0x_DFT5hV_45Fzunh0lYF2Koy8OHij0xoVqxplbmCS3q5BbGPMCBsWHkidg84',
        }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const heroSectionsData = [{
    title: 'Novedades', subtitle: 'Explora los últimos aromas',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoOvzrBBg_irISXhmbeMwPPM8gAfZk__sHcECE9tpFJsLZ6ybNVRpbvChlhFCPI9UtQ0dQn2V0VHeN2VXdCFIKWQ4w7Kz9OU3Rn7ab5ohPiL8YtxxauE5QdGbmxH-WNwqM_ShWibINF8hw42_QaZbsIYdvx77pgPtZZATV6mAMLLo4bvBM9ci18wJ2fz5MFIiV0djGInPJHIJTFcRRMZ91DDw9K7PT6fiUBwH3lBP5sFswb7avZ8DrQPzLtduEInuZJXNu7FqEIQ0',
    buttonText: 'Comprar Ahora',
  }];

  const promoCardsData: PromoCardProps[] = [{
    title: "Fragancias Masculinas", subtitle: 'Hasta 60% de descuento', buttonText: 'Comprar ahora',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPN41hFFfSU0epG1QRho2CR8EkDyx02DYuqGd9_4bbfs5_DnwiSlIlfqoYH4gMAJK5g_zFOe2luyU-WvOBiRgH3AgosO9iPpoqRwoLFGnOYDkkuX2OZSqIvlx5rbH0lCiTe_qBxBsnF3z2T5sjQvh077P9hsNn-ZL5rNiEXzi-Z3QoHLQxIMWjyxr5sfpa87-TwCqmCR7ZwwbVJa-E7xoi6qCS9v7wA4wTPHIA0ie4IbXPrdSFvitbK6nyHE8zcZtynMl5d1f6PXg',
  }];

  const handleNavigateToShoppingBag = () => setCurrentPage('shoppingBag');
  const handleNavigateHome = () => {
    setSelectedProduct(null); 
    setCurrentPage('home');
  };
  
  const handleAddNewProduct = async (newProductData: any) => {
    // Permitir todos los campos posibles
    const productRowToInsert: Partial<ProductRow> = {
      brand: newProductData.brand,
      name: newProductData.name,
      price: newProductData.price,
      image_url: newProductData.imageUrl,
      image_urls: newProductData.imageUrls || [newProductData.imageUrl],
      description: newProductData.descripcionCorta || newProductData.description || '',
      long_description: newProductData.longDescription || '',
      variants: newProductData.variants || null,
      reviews: newProductData.reviews || null,
      default_variant_id: newProductData.defaultVariantId || null,
      product_details_content: newProductData.productDetailsContent || '',
      size_and_fit_content: newProductData.sizeAndFitContent || '',
      ingredients_content: newProductData.ingredientsContent || '',
      shipping_and_returns_content: newProductData.shippingAndReturnsContent || '',
      average_rating: newProductData.averageRating || null,
      total_reviews: newProductData.totalReviews || null,
      rating_distribution: newProductData.ratingDistribution || null,
      installments: newProductData.installments || null,
      codigo_producto: newProductData.codigoProducto || '',
      categoria: newProductData.categoria || '',
      subcategoria: newProductData.subcategoria || '',
      precio_original: newProductData.precioOriginal || null,
      porcentaje_descuento: newProductData.porcentajeDescuento || null,
      precio_final: newProductData.precioFinal || null,
      precio_sin_impuestos_nacionales: newProductData.precioSinImpuestosNacionales || null,
      moneda: newProductData.moneda || '',
      notas_olfativas_tipo_piel: newProductData.notasOlfativasTipoPiel || '',
      beneficios_clave: newProductData.beneficiosClave || '',
      stock_limite_unidades: newProductData.stockLimiteUnidades || null,
      incluye_items: newProductData.incluyeItems || '',
      apto_desde_edad: newProductData.aptoDesdeEdad || null,
    };
    if (newProductData.id && !newProductData.id.startsWith('temp-')) {
        productRowToInsert.id = newProductData.id;
    }
    const { data, error } = await supabase.from('products').insert(productRowToInsert).select().single(); 
    if (error) {
      console.error("Error adding new product to Supabase:", error);
      alert(`Error al añadir producto: ${error.message}`);
      throw error; 
    }
    if (data) {
      const newlyAddedProduct = mapProductRowToProduct(data as ProductRow); 
      setAllProducts((prevProducts: Product[]) => [...prevProducts, newlyAddedProduct]);
      alert(`${newlyAddedProduct.name} ha sido añadido.`);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    await signInWithGoogle();
  };

  const handleLogout = async () => {
    setAuthLoading(true);
    await supabaseSignOut();
  };
  
  const navItemDefinitions: { id: NavItemType; label: string; icon: React.ReactNode; href?: string }[] = [
    { id: NavItemType.Home, label: 'Inicio', icon: <HouseIcon />, href: '#' },
    { id: NavItemType.Search, label: 'Buscar', icon: <MagnifyingGlassIcon />, href: '#' },
    { id: NavItemType.Brands, label: 'Marcas', icon: <HashIcon />, href: '#' },
    { id: NavItemType.Wishlist, label: 'Favoritos', icon: <HeartIcon />, href: '#' },
    { id: NavItemType.Me, label: currentUser ? 'Perfil' : 'Ingresar', icon: <UserCircleIcon />, href: '#' },
    { id: NavItemType.Admin, label: 'Admin', icon: <AdminIcon />, href: '#' },
  ];

  const bottomNavItems: BottomNavItemType[] = navItemDefinitions.map(item => ({
    ...item,
    isActive: (currentPage === 'home' && item.id === NavItemType.Home) || 
              ((currentPage === 'admin' || currentPage === 'adminLogin') && item.id === NavItemType.Admin) ||
              (currentPage === 'profile' && item.id === NavItemType.Me) ||
              (currentPage === 'search' && item.id === NavItemType.Search),
  }));

  const handleNavItemClick = (itemId: NavItemType) => {
    if (authLoading) return;

    switch (itemId) {
      case NavItemType.Home:
        handleNavigateHome();
        break;
      case NavItemType.Admin:
        setCurrentPage(currentUser && isCurrentUserAdmin ? 'admin' : 'adminLogin');
        break;
      case NavItemType.Me:
        setCurrentPage('profile');
        break;
      case NavItemType.Search:
        setSearchQueryForPage(''); // Reset search query when navigating to search page
        setCurrentPage('search');
        break;
      case NavItemType.Brands:
      case NavItemType.Wishlist:
        console.log(`NavItem ${itemId} clicked. Navigating to Home. Functionality not implemented yet.`);
        handleNavigateHome();
        break;
      default:
        console.log(`Unknown NavItem ${itemId} clicked. Navigating to Home.`);
        handleNavigateHome();
        break;
    }
  };

  const handleProductCardClick = async (productId: string) => {
    setPdpLoading(true);
    setPdpLoading(true);
    setSelectedProduct(null); 
    try {
      const { data: dbProduct, error } = await supabase.from('products').select('*').eq('id', productId).single();
      if (error) throw error;
      if (dbProduct) {
        setSelectedProduct(mapProductRowToDetailedProduct(dbProduct as ProductRow));
        setCurrentPage('productDetails');
      } else {
        throw new Error("Producto no encontrado.");
      }
    } catch (err: any) {
      console.error("Error fetching product details:", err);
      setCurrentPage('home'); 
    } finally {
      setPdpLoading(false);
    }
  };

  const handleAddToCartFromPdp = (product: DetailedProduct, variantId: string, quantity: number) => {
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) {
      console.error("Variante seleccionada no encontrada.");
      return;
    }
    const cartItemId = `${product.id}_${variantId}`;
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === cartItemId);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, {
          id: cartItemId, productId: product.id, variantId: variant.id, brand: product.brand,
          name: product.name, size: variant.size, price: variant.price, quantity: quantity, imageUrl: product.imageUrl, 
        }];
      }
    });
    alert(`${quantity} x ${product.name} (${variant.size}) agregado al carrito!`);
  };

  const handleUpdateCartItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0) 
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const handleCheckoutFromShoppingBag = () => setCurrentPage('checkoutSummary');
  const handleProceedToPayment = () => {
    console.log("Procediendo a la pasarela de pago real con detalles:", paymentSummaryDetails);
    alert("La integración de la pasarela de pago aún no está implementada.");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 0; 
  const taxRate = 0.10; 
  const taxes = subtotal * taxRate;
  const discountThreshold = 50;
  const discountAmount = subtotal > discountThreshold ? 10 : 0;
  const total = subtotal + shippingCost + taxes - discountAmount;

  const paymentSummaryDetails: PaymentSummary = {
    subtotal, shipping: shippingCost, taxes, discount: discountAmount, total,
  };
  
  const totalCartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Búsqueda local de productos por nombre o marca
  const performSearch = async (query: string): Promise<Product[]> => {
    if (!query.trim()) return [];
    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);
    return allProducts.filter(product => {
      const name = product.name?.toLowerCase() ?? '';
      const brand = product.brand?.toLowerCase() ?? '';
      return keywords.some(kw => name.includes(kw) || brand.includes(kw));
    });
  };


  if (authLoading) {
    return <div className="flex justify-center items-center min-h-screen text-xl">Verificando sesión...</div>;
  }
  
  if (productsLoading && currentPage === 'home') {
    return <div className="flex justify-center items-center min-h-screen text-xl">Cargando productos...</div>;
  }
  if (pdpLoading && currentPage === 'productDetails') {
    return <div className="flex justify-center items-center min-h-screen text-xl">Cargando detalles del producto...</div>;
  }

  if (currentPage === 'productDetails' && selectedProduct) {
    return <ProductDetailsPage product={selectedProduct} onBack={handleNavigateHome} onNavigateToCart={handleNavigateToShoppingBag} onAddToCart={handleAddToCartFromPdp} cartItemCount={totalCartItemsCount} />;
  }
  if (currentPage === 'shoppingBag') {
    return <ShoppingBagPage items={cartItems} onClose={handleNavigateHome} onUpdateQuantity={handleUpdateCartItemQuantity} onRemoveItem={handleRemoveCartItem} onCheckout={handleCheckoutFromShoppingBag} subtotal={subtotal} shipping={shippingCost} total={subtotal + shippingCost} />;
  }
  if (currentPage === 'checkoutSummary') {
    return <CheckoutSummaryPage items={cartItems} paymentSummary={paymentSummaryDetails} onBack={handleNavigateToShoppingBag} onProceedToPayment={handleProceedToPayment} />;
  }
  
  if (currentPage === 'adminLogin') {
    return <AdminLoginPage 
             onGoogleSignIn={handleGoogleSignIn} 
             onNavigateHome={handleNavigateHome}
             currentUser={currentUser}
             isCurrentUserAdmin={isCurrentUserAdmin}
             authInProgress={authLoading}
           />;
  }
  if (currentPage === 'admin') {
    if (currentUser && isCurrentUserAdmin) {
        return <AdminPage onAddNewProduct={handleAddNewProduct} onNavigateHome={handleNavigateHome} onLogout={handleLogout} currentUser={currentUser} />;
    } else {
        return <AdminLoginPage 
                 onGoogleSignIn={handleGoogleSignIn} 
                 onNavigateHome={handleNavigateHome}
                 currentUser={currentUser}
                 isCurrentUserAdmin={isCurrentUserAdmin}
                 authInProgress={authLoading}
               />;
    }
  }
  if (currentPage === 'profile') {
    return <UserProfilePage 
             currentUser={currentUser} 
             onGoogleSignIn={handleGoogleSignIn} 
             onLogout={handleLogout} 
             onNavigateHome={handleNavigateHome}
             authInProgress={authLoading}
           />;
  }
  if (currentPage === 'search') {
    return <SearchPage 
             allProducts={allProducts}
             onProductClick={handleProductCardClick}
             onNavigateHome={handleNavigateHome}
             performSearch={performSearch}
             initialQuery={searchQueryForPage}
           />;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <Header cartIcon={<ShoppingCartIcon className="text-[#181111]" size="24px" />} onCartClick={handleNavigateToShoppingBag} cartItemCount={totalCartItemsCount} />
      <CategoryTabs activeTab={activeTab} onTabClick={setActiveTab} />
      
      <div className="hidden md:block bg-white">
        <BottomNavigationBar items={bottomNavItems} layout="horizontal" onItemClick={handleNavItemClick} />
      </div>
      
      <main className="flex-grow overflow-y-auto pb-[71px] md:pb-0">
        {heroSectionsData.map((hero, index) => (<div className="p-4" key={index}><HeroSection {...hero} /></div>))}
        
        {productsLoading && <p className="p-4 text-center">Cargando productos...</p>}
        {productsError && <p className="p-4 text-center text-red-500">{productsError}</p>}
        {!productsLoading && !productsError && allProducts.length === 0 && (<p className="p-4 text-center text-gray-500">No hay productos disponibles.</p>)}

        {!productsLoading && !productsError && allProducts.length > 0 && (
          <>
            {activeTab === Tab.Fragrances && (
              <ProductCarousel title="Fragancias" products={allProducts.filter(p => p.category === 'Fragrances')} onProductClick={handleProductCardClick} favoriteProductIds={favoriteProductIds} onToggleFavorite={handleToggleFavorite} />
            )}
            {activeTab === Tab.Beauty && (
              <ProductCarousel title="Belleza" products={allProducts.filter(p => p.category === 'Beauty')} onProductClick={handleProductCardClick} favoriteProductIds={favoriteProductIds} onToggleFavorite={handleToggleFavorite} />
            )}
            {activeTab === Tab.Brands && (
              <ProductCarousel title="Marcas" products={allProducts} onProductClick={handleProductCardClick} favoriteProductIds={favoriteProductIds} onToggleFavorite={handleToggleFavorite} />
            )}
            {activeTab === Tab.Favorites && (
              <ProductCarousel title="Favoritos" products={allProducts.filter(p => favoriteProductIds.includes(p.id))} onProductClick={handleProductCardClick} favoriteProductIds={favoriteProductIds} onToggleFavorite={handleToggleFavorite} />
            )}
          </>
        )}
        {promoCardsData.map((promo, index) => (<div className="p-4" key={index}><PromoCard {...promo} /></div>))}
      </main>
      
      <div className="md:hidden">
        <BottomNavigationBar items={bottomNavItems} layout="vertical" onItemClick={handleNavItemClick} />
      </div>
    </div>
  );
};

export default App;
