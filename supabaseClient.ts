import { createClient, User, AuthChangeEvent, Session } from '@supabase/supabase-js'; // Added AuthChangeEvent, Session
import { Product, DetailedProduct, ProductVariant, Review, RatingDistribution, Reviewer } from './types';

const supabaseUrlFromEnv = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKeyFromEnv = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabaseUrl = supabaseUrlFromEnv || 'https://your-supabase-url-not-set.supabase.co';
const supabaseAnonKey = supabaseAnonKeyFromEnv || 'YOUR_SUPABASE_ANON_KEY_NOT_SET';

if (!supabaseUrlFromEnv || !supabaseAnonKeyFromEnv) {
  console.warn(
    'Supabase URL or Anon Key is not set in environment variables. Using placeholder values. ' +
    'Supabase functionality will not work correctly. Please set SUPABASE_URL/REACT_APP_SUPABASE_URL and SUPABASE_ANON_KEY/REACT_APP_SUPABASE_ANON_KEY.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Authentication Functions ---
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin, 
    },
  });
  if (error) {
    console.error('Error signing in with Google:', error);
    return { user: null, session: null, error };
  }
  return { user: null, session: null, error: null }; 
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error);
  return { error };
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } , error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting current user:', error.message);
    return null;
  }
  return user;
};

// Directly export the function for onAuthStateChange to be used in App.tsx
export const onAuthStateChange = (callback: (event: AuthChangeEvent, session: Session | null) => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
};


// --- Admin Check ---
const ADMIN_EMAIL = 'guardi2005@gmail.com'; 
export const isAdmin = (user: User | null): boolean => {
  if (!user || !user.email) return false;
  return user.email === ADMIN_EMAIL;
};


export type ProductRow = {
  id: string; 
  created_at?: string; 
  brand: string | null; 
  name: string | null;  
  price: number | null; 
  image_url: string | null; 
  image_urls?: string[] | null; 
  description?: string | null;
  long_description?: string | null;
  variants?: any[] | null; 
  reviews?: any[] | null; 
  default_variant_id?: string | null;
  product_details_content?: string | null;
  size_and_fit_content?: string | null;
  ingredients_content?: string | null;
  shipping_and_returns_content?: string | null;
  average_rating?: number | null;
  total_reviews?: number | null;
  rating_distribution?: RatingDistribution[] | null;
  installments?: { count: number; amount: number } | null;
};

export const mapProductRowToDetailedProduct = (row: ProductRow): DetailedProduct => {
  const brand = row.brand ?? 'Unknown Brand';
  const name = row.name ?? 'Unnamed Product';
  const price = row.price ?? 0;
  const defaultImageUrl = 'https://via.placeholder.com/300x400.png?text=No+Image+Available';
  const imageUrl = row.image_url ?? defaultImageUrl;

  let mappedVariants: ProductVariant[];
  let defaultVariantIdToUse: string | undefined;

  if (Array.isArray(row.variants) && row.variants.length > 0 &&
      row.variants.every(v => typeof v === 'object' && v !== null && 'id' in v && 'size' in v && 'price' in v)) {
    mappedVariants = row.variants as ProductVariant[];
    defaultVariantIdToUse = row.default_variant_id || mappedVariants[0]?.id;
  } else {
    const defaultVariant: ProductVariant = {
      id: `${row.id}-default-size`,
      size: 'Standard',
      price: price, 
    };
    mappedVariants = [defaultVariant];
    defaultVariantIdToUse = defaultVariant.id;
  }
  
  let mappedReviews: Review[] = [];
  let calculatedAverageRating = 0;
  let calculatedTotalReviews = 0;
  const ratingCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (Array.isArray(row.reviews) && row.reviews.length > 0) {
    let sumOfRatings = 0;
    mappedReviews = row.reviews.map((dbReview: any, index: number) => {
      const rating = typeof dbReview.rating === 'number' && dbReview.rating >=1 && dbReview.rating <=5 ? dbReview.rating : 3;
      sumOfRatings += rating;
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating]++;
      }

      const reviewerName = dbReview.user_id ? `User ${dbReview.user_id}` : `Reviewer ${index + 1}`;
      const reviewer: Reviewer = {
          name: dbReview.reviewer?.name || reviewerName,
          imageUrl: dbReview.reviewer?.imageUrl || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(reviewerName)}`,
      };
      
      return {
        id: dbReview.id || `review-${row.id}-${index}`,
        reviewer: reviewer,
        date: dbReview.date || new Date().toLocaleDateString(),
        rating: rating,
        text: dbReview.comment || dbReview.text || 'No comment provided.',
        likes: dbReview.likes || 0,
        dislikes: dbReview.dislikes || 0,
      };
    });
    calculatedTotalReviews = mappedReviews.length;
    if (calculatedTotalReviews > 0) {
        calculatedAverageRating = sumOfRatings / calculatedTotalReviews;
    }
  }
  
  const calculatedRatingDistribution: RatingDistribution[] = Object.keys(ratingCounts).map(starKey => {
    const stars = parseInt(starKey, 10) as 1 | 2 | 3 | 4 | 5;
    return {
      stars: stars,
      percentage: calculatedTotalReviews > 0 ? Math.round((ratingCounts[stars] / calculatedTotalReviews) * 100) : 0,
    };
  });

  return {
    id: row.id,
    brand: brand,
    name: name,
    price: price,
    imageUrl: imageUrl,
    imageUrls: row.image_urls && row.image_urls.length > 0 ? row.image_urls.map(url => url || defaultImageUrl) : [imageUrl],
    description: row.description || `A captivating ${name.toLowerCase()} by ${brand}.`,
    longDescription: row.long_description || 'More details coming soon.',
    installments: row.installments || undefined, 
    variants: mappedVariants,
    defaultVariantId: row.default_variant_id || defaultVariantIdToUse,
    productDetailsContent: row.product_details_content || 'Product details not available.',
    sizeAndFitContent: row.size_and_fit_content || 'Size and fit information not available.',
    ingredientsContent: row.ingredients_content || 'Ingredients not available.',
    shippingAndReturnsContent: row.shipping_and_returns_content || 'Shipping and returns policy not available.',
    averageRating: row.average_rating !== null && row.average_rating !== undefined ? row.average_rating : calculatedAverageRating,
    totalReviews: row.total_reviews !== null && row.total_reviews !== undefined ? row.total_reviews : calculatedTotalReviews,
    ratingDistribution: row.rating_distribution && row.rating_distribution.length > 0 ? row.rating_distribution : calculatedRatingDistribution,
    reviews: mappedReviews,
  };
};

export const mapProductRowToProduct = (row: ProductRow): Product => {
  const defaultImageUrl = 'https://via.placeholder.com/300x400.png?text=No+Image';
  return {
    id: row.id, 
    brand: row.brand ?? 'Unknown Brand',
    name: row.name ?? 'Unnamed Product',
    price: row.price ?? 0,
    imageUrl: row.image_url ?? defaultImageUrl,
  };
};
