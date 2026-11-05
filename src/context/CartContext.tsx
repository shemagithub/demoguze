"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product, Size } from "@/types/product";

interface CartContextValue {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  add: (product: Product, size: Size) => void;
  removeAt: (index: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const add = useCallback((product: Product, size: Size) => {
    setItems((prev) => [
      ...prev,
      {
        productId: product.id,
        title: product.title,
        size,
        price: product.price,
        currency: product.currency,
        image: product.frontImage,
      },
    ]);
    setIsOpen(true);
  }, []);

  const removeAt = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      add,
      removeAt,
      clear,
    }),
    [items, isOpen, openCart, closeCart, toggleCart, add, removeAt, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
