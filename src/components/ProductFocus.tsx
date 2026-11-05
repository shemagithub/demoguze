"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product, Size, ViewSide } from "@/types/product";
import { useCurrency } from "@/context/CurrencyContext";
import { GarmentImage } from "@/components/GarmentImage";

interface ProductFocusProps {
  product: Product;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onAddToCart: (product: Product, size: Size) => void;
}

const SNAP = { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };

export function ProductFocus({
  product,
  onClose,
  onPrev,
  onNext,
  onAddToCart,
}: ProductFocusProps) {
  const { format } = useCurrency();
  const [side, setSide] = useState<ViewSide>("front");
  const [size, setSize] = useState<Size | null>(null);
  const [added, setAdded] = useState(false);
  const flipped = side === "back";

  useEffect(() => {
    setSide("front");
    setSize(null);
    setAdded(false);
  }, [product.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  const handleAdd = () => {
    if (!size) return;
    onAddToCart(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={SNAP}
    >
      <button
        type="button"
        aria-label="Close product view"
        className="absolute inset-0 z-0 cursor-default bg-white/30"
        onClick={onClose}
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-[max(0.75rem,var(--safe-top))] right-3 z-50 flex min-h-10 items-center gap-1.5 rounded-full bg-white/80 px-3 text-[11px] font-medium tracking-[0.2em] text-neutral-600 uppercase backdrop-blur-sm transition-colors hover:text-black sm:right-6 md:right-8"
      >
        Close <span className="text-base leading-none">×</span>
      </button>

      <NavArrow side="left" onClick={onPrev} label="Previous item" />
      <NavArrow side="right" onClick={onNext} label="Next item" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col items-center overflow-y-auto overscroll-contain px-3 pt-[max(2.5rem,calc(var(--safe-top)+2rem))] pb-[max(1.25rem,var(--safe-bottom))] sm:px-6">
        <motion.div
          layoutId={`garment-${product.id}`}
          className="mb-1 aspect-[2/3] h-[min(48dvh,480px)] w-auto max-w-[min(88vw,320px)] shrink-0 sm:h-[min(56dvh,560px)] sm:max-w-[360px] md:h-[min(62vh,640px)] md:max-w-[400px]"
          style={{ perspective: 1400 }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        >
          <motion.div
            className="relative h-full w-full"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 drop-shadow-[0_20px_28px_rgba(0,0,0,0.2)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <GarmentImage
                src={product.frontImage}
                alt={`${product.title} front`}
              />
            </div>
            <div
              className="absolute inset-0 drop-shadow-[0_20px_28px_rgba(0,0,0,0.2)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <GarmentImage
                src={product.backImage}
                alt={`${product.title} back`}
              />
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            className="mt-2 flex w-full max-w-sm flex-col items-center px-1 pb-2 text-center sm:mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={SNAP}
          >
            <h2 className="text-sm font-bold tracking-[0.1em] text-black uppercase sm:text-base md:text-lg">
              {product.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-500 sm:mt-1.5">
              {format(product.price)}
            </p>

            <div
              className="relative mt-4 flex w-[min(100%,232px)] rounded-full border border-neutral-300 bg-white p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:mt-5"
              role="group"
              aria-label="Garment side"
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-neutral-950"
                initial={false}
                animate={{ x: side === "front" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 480, damping: 36 }}
              />
              {(["front", "back"] as ViewSide[]).map((value) => {
                const active = side === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSide(value)}
                    aria-pressed={active}
                    className={`relative z-10 flex-1 rounded-full py-2.5 text-center text-[11px] font-bold tracking-[0.18em] uppercase outline-none transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-1 ${
                      active
                        ? "text-white"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>

            <div
              className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-2 sm:mt-5 sm:gap-3"
              role="group"
              aria-label="Select size"
            >
              {product.sizes.map((s) => {
                const active = size === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-medium transition sm:h-11 sm:w-11 ${
                      active
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500"
                    }`}
                    aria-pressed={active}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <motion.button
              type="button"
              onClick={handleAdd}
              disabled={!size}
              whileTap={size ? { scale: 0.98 } : undefined}
              className="mt-4 w-full rounded-full py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase outline-none transition-opacity disabled:cursor-not-allowed sm:mt-5 sm:py-4 sm:text-[13px]"
              style={
                added
                  ? {
                      background: "#059669",
                      color: "#ffffff",
                      boxShadow: "0 10px 24px rgba(5,150,105,0.28)",
                    }
                  : size
                    ? {
                        background: "#111111",
                        color: "#ffffff",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
                        cursor: "pointer",
                      }
                    : {
                        background: "#e8e8e8",
                        color: "#525252",
                        border: "1px solid #cfcfcf",
                        boxShadow: "none",
                      }
              }
            >
              {added ? "Added to Cart" : size ? "Add to Cart" : "Select a Size"}
            </motion.button>

            <button
              type="button"
              className="mt-2 min-h-9 text-[11px] font-medium tracking-[0.08em] text-neutral-600 underline underline-offset-4 transition hover:text-black sm:mt-3"
            >
              See Availability
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function NavArrow({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-[32%] z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300/80 bg-white/90 text-xl text-neutral-700 shadow-sm backdrop-blur-sm transition hover:bg-white sm:top-[38%] sm:h-12 sm:w-12 sm:text-2xl ${
        side === "left" ? "left-1.5 sm:left-4 md:left-6" : "right-1.5 sm:right-4 md:right-6"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
