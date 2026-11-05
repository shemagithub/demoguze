"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { GarmentImage } from "@/components/GarmentImage";

const SNAP = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

/** Right-side cart panel — opens from the bag icon, no page navigation. */
export function CartDrawer() {
  const { items, isOpen, closeCart, clear, removeAt } = useCart();
  const { format } = useCurrency();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[80] bg-black/35 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SNAP}
            onClick={closeCart}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[90] flex h-dvh w-full max-w-md flex-col bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.16)] sm:max-w-[420px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={SNAP}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 pt-[max(1rem,var(--safe-top))] pb-4 sm:px-6 sm:py-5">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#3b449b] uppercase">
                  GUZE
                </p>
                <h2 className="mt-1 text-lg font-black tracking-[-0.03em] text-neutral-950 sm:text-xl">
                  Cart ({items.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-xl leading-none text-neutral-600 transition hover:border-neutral-400 hover:text-black sm:h-10 sm:w-10"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
              {items.length === 0 ? (
                <div className="flex h-full min-h-[40vh] flex-col items-center justify-center px-4 text-center">
                  <p className="text-base font-semibold text-neutral-800 sm:text-lg">
                    Your rack is empty
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
                    Pick a size on a garment and tap Add to Cart — pieces show up
                    here.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-8 rounded-full bg-[#3b449b] px-7 py-3.5 text-[12px] font-bold tracking-[0.16em] text-white uppercase transition hover:bg-[#2f3780]"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-3 sm:space-y-4">
                  {items.map((item, i) => (
                    <li
                      key={`${item.productId}-${item.size}-${i}`}
                      className="flex gap-3 rounded-2xl border border-neutral-100 bg-[#fafafa] p-3 sm:gap-4"
                    >
                      <div className="h-20 w-14 shrink-0 sm:h-28 sm:w-20">
                        <GarmentImage src={item.image} alt={item.title} />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <p className="truncate text-xs font-bold tracking-wide uppercase sm:text-sm">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-neutral-500">
                          Size {item.size}
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-neutral-950 sm:mt-2 sm:text-base">
                          {format(item.price)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeAt(i)}
                          className="mt-2 min-h-8 text-xs font-medium tracking-wide text-neutral-500 underline underline-offset-4 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-neutral-200 bg-white px-4 pt-4 pb-[max(1.25rem,var(--safe-bottom))] sm:px-6 sm:py-5">
              <div className="mb-1 flex items-center justify-between text-sm text-neutral-500">
                <span>Subtotal</span>
                <span className="text-base font-black tracking-[-0.02em] text-neutral-950 sm:text-lg">
                  {format(total)}
                </span>
              </div>
              <p className="mb-4 text-xs text-neutral-400 sm:mb-5">
                Shipping & taxes calculated at checkout.
              </p>

              <button
                type="button"
                disabled={items.length === 0}
                className="w-full rounded-full py-3.5 text-[12px] font-bold tracking-[0.16em] text-white uppercase transition disabled:cursor-not-allowed sm:py-4 sm:text-[13px]"
                style={{
                  background: items.length ? "#3b449b" : "#e5e5e5",
                  color: items.length ? "#fff" : "#737373",
                }}
              >
                Checkout
              </button>

              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeCart}
                  className="min-h-8 text-xs font-semibold tracking-wide text-[#3b449b] underline underline-offset-4"
                >
                  Keep shopping
                </button>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clear}
                    className="min-h-8 text-xs font-medium tracking-wide text-neutral-500 underline underline-offset-4 hover:text-black"
                  >
                    Clear cart
                  </button>
                )}
              </div>

              <Link
                href="/account"
                onClick={closeCart}
                className="mt-4 block py-1 text-center text-xs tracking-wide text-neutral-500 hover:text-neutral-800 sm:mt-5"
              >
                Sign in for order tracking →
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
