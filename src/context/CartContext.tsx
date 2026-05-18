"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/types/product";

type CartContextValue = {
  cartItems: Product[];
  ready: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  buyNow: (product: Product) => void;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "jobprepnotes_cart_v1";

function loadFromStorage(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCartItems(loadFromStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      /* ignore */
    }
  }, [cartItems, ready]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const buyNow = useCallback((product: Product) => {
    setCartItems([product]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, p) => {
      const base = p.price;
      if (p.discountPercent != null && p.discountPercent > 0) {
        return sum + Math.round(base * (1 - p.discountPercent / 100) * 100) / 100;
      }
      return sum + base;
    }, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      ready,
      addToCart,
      removeFromCart,
      clearCart,
      buyNow,
      getTotalPrice,
    }),
    [
      cartItems,
      ready,
      addToCart,
      removeFromCart,
      clearCart,
      buyNow,
      getTotalPrice,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
