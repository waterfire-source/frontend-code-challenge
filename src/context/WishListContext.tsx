import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../hooks/useProducts';

interface WishListContextType {
  wishList: Product[];
  addToWishList: (product: Product) => void;
  removeFromWishList: (id: string) => void;
  count: number;
}

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) throw new Error('useWishList must be used within WishListProvider');
  return context;
};

export const WishListProvider = ({ children }: { children: ReactNode }) => {
  const [wishList, setWishList] = useState<Product[]>([]);

  const addToWishList = (product: Product) => {
    setWishList((prev) => (prev.find((item) => item.id === product.id) ? prev : [...prev, product]));
  };

  const removeFromWishList = (id: string) => {
    setWishList((prev) => prev.filter((item) => item.id !== id));
  };

  const count = wishList.length;

  return (
    <WishListContext.Provider value={{ wishList, addToWishList, removeFromWishList, count }}>
      {children}
    </WishListContext.Provider>
  );
}; 