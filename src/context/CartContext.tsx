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
import { getDisplayPrices } from "@/lib/pricing";

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

function uniqueById(items: Product[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const item of items) {
    if (!item?.id || seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

function loadFromStorage(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? uniqueById(parsed) : [];
  } catch {
    return [];
  }
}

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function normalizeApiProduct(raw: unknown): Product | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const id = typeof r.id === "string" ? r.id : null;
  const slug = typeof r.slug === "string" ? r.slug : null;
  const title = typeof r.title === "string" ? r.title : null;
  const description = typeof r.description === "string" ? r.description : "";
  const price = parseNumber(r.price);
  const discountPrice = parseNumber(r.discountPrice);
  const coverImage =
    typeof r.coverImage === "string"
      ? r.coverImage
      : typeof r.imageUrl === "string"
        ? r.imageUrl
        : null;

  if (!id || !slug || !title || !coverImage || price == null) return null;

  let discountPercent: number | null = null;
  if (discountPrice != null && discountPrice > 0 && discountPrice < price) {
    discountPercent = Math.round(((price - discountPrice) / price) * 100);
  } else if (parseNumber(r.discountPercent) != null) {
    discountPercent = parseNumber(r.discountPercent);
  }

  return {
    id,
    slug,
    title,
    description,
    shortDescription:
      typeof r.shortDescription === "string"
        ? r.shortDescription
        : description.length > 220
          ? `${description.slice(0, 217)}…`
          : description,
    coverImage,
    category:
      typeof r.category === "string" && r.category.trim() !== ""
        ? r.category
        : "Interview",
    price,
    discountPrice,
    discountPercent,
    pdfUrl: typeof r.pdfUrl === "string" ? r.pdfUrl : "",
    bundlePdfUrls: Array.isArray(r.bundlePdfUrls)
      ? (r.bundlePdfUrls as string[])
      : undefined,
    badge: typeof r.badge === "string" ? r.badge : undefined,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCartItems(loadFromStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || cartItems.length === 0) return;
    let cancelled = false;
    void fetch("/api/products")
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as unknown[];
      })
      .then((rows) => {
        if (cancelled || !rows) return;
        const latestProducts = rows
          .map((row) => normalizeApiProduct(row))
          .filter((p): p is Product => p !== null);
        const latestById = new Map(latestProducts.map((p) => [p.id, p]));
        setCartItems((prev) =>
          uniqueById(prev.map((item) => latestById.get(item.id) ?? item))
        );
      })
      .catch(() => {
        /* ignore refresh failure; keep cached cart */
      });
    return () => {
      cancelled = true;
    };
  }, [ready]);

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
      return sum + getDisplayPrices(p).current;
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
