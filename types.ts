import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export type User = SupabaseUser; // Re-export for convenience

export enum Tab {
  Fragrances = 'Fragrances',
  Beauty = 'Beauty',
  Brands = 'Brands',
  Favorites = 'Favorites',
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number; 
  imageUrl: string; 
  category?: 'Fragrances' | 'Beauty';
}

export interface ProductVariant {
  id: string; 
  size: string; 
  price: number;
}

export interface Reviewer {
  name: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  reviewer: Reviewer;
  date: string; 
  rating: number; 
  text: string;
  likes: number;
  dislikes: number;
}

export interface RatingDistribution {
  stars: 1 | 2 | 3 | 4 | 5;
  percentage: number;
}

export interface DetailedProduct extends Product {
  imageUrls: string[]; 
  description: string; 
  longDescription: string; 
  installments?: {
    count: number;
    amount: number;
  };
  variants: ProductVariant[];
  defaultVariantId?: string;
  productDetailsContent: string;
  sizeAndFitContent: string;
  ingredientsContent: string;
  shippingAndReturnsContent: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution[];
  reviews: Review[];
}

export interface CartItem {
  id: string; 
  productId: string; 
  variantId: string;
  brand: string;
  name: string;
  size: string; 
  price: number; 
  quantity: number;
  imageUrl: string; 
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
}

export interface PromoCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
}

export enum NavItemType {
  Home = 'Home',
  Search = 'Search',
  Brands = 'Brands',
  Wishlist = 'Wishlist',
  Me = 'Me', // Represents Profile
  Admin = 'Admin',
}

export interface NavItem {
  id: NavItemType;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  href?: string;
}

export interface IconProps {
  className?: string;
  size?: string | number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

export interface ShoppingBagItemProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export interface ShoppingBagPageProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  subtotal: number;
  shipping: number;
  total: number;
}

export interface ImageGalleryProps {
  imageUrls: string[];
  productName: string;
}

export interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | undefined;
  onSelectVariant: (variantId: string) => void;
  groupName: string; 
}

export interface QuantityDropdownProps {
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
}

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}

export interface ReviewStarsProps {
  rating: number;
  size?: string | number;
  className?: string;
  starColor?: string;
  emptyStarColor?: string;
}

export interface RatingDistributionBarProps {
  stars: number;
  percentage: number;
  barColor?: string;
  bgColor?: string;
}

export interface ReviewCardProps {
  review: Review;
}

export interface CustomerReviewsProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution[];
  reviews: Review[];
}

export interface ProductDetailsPageProps {
  product: DetailedProduct;
  onBack: () => void;
  onNavigateToCart: () => void;
  onAddToCart: (product: DetailedProduct, variantId: string, quantity: number) => void;
  cartItemCount?: number;
}

export interface ProductCardProps {
  product: Product;
  onClick: (productId: string) => void;
}

export interface PaymentSummary {
  subtotal: number;
  shipping: number;
  taxes: number;
  discount: number;
  total: number;
  klarnaPayment?: number;
}

export interface CheckoutSummaryItemProps {
  item: CartItem; 
}

export interface CheckoutSummaryPageProps {
  items: CartItem[];
  paymentSummary: PaymentSummary;
  onBack: () => void; 
  onProceedToPayment: () => void;
}

export interface AdminPageProps {
  onAddNewProduct: (product: Product) => Promise<void>; 
  onNavigateHome: () => void;
  onLogout: () => void;
  currentUser: User | null; // Pass current user for context
}

export interface AdminLoginPageProps {
  onGoogleSignIn: () => Promise<void>; // Changed from onLoginSuccess
  onNavigateHome: () => void;
  currentUser: User | null; // To display messages like "Logged in as non-admin"
  isCurrentUserAdmin: boolean;
  authInProgress: boolean;
}

export interface UserProfilePageProps {
  currentUser: User | null;
  onGoogleSignIn: () => Promise<void>;
  onLogout: () => void;
  onNavigateHome: () => void;
  authInProgress: boolean;
}

export interface SearchPageProps {
  allProducts: Product[];
  onProductClick: (productId: string) => void;
  onNavigateHome: () => void;
  performSearch: (query: string) => Promise<Product[]>;
  initialQuery?: string;
}