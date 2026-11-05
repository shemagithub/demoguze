"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { GarmentFlip } from "@/components/GarmentFlip";

interface RackItemProps {
  product: Product;
  index: number;
  selected: boolean;
  dimmed: boolean;
  /** Same as desktop hover — front view + name. */
  previewed: boolean;
  onSelect: (id: string) => void;
  onPreviewChange: (id: string | null) => void;
}

function hasHoverPointer() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function RackItem({
  product,
  index,
  selected,
  dimmed,
  previewed,
  onSelect,
  onPreviewChange,
}: RackItemProps) {
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const didDrag = useRef(false);
  const pointerType = useRef<string>("mouse");
  const interactive = !selected && !dimmed;
  const showFront = previewed;

  const preview = useCallback(() => {
    if (!interactive) return;
    onPreviewChange(product.id);
  }, [interactive, onPreviewChange, product.id]);

  const clearPreview = useCallback(() => {
    onPreviewChange(null);
  }, [onPreviewChange]);

  return (
    <motion.button
      type="button"
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
        pointerStart.current = { x: e.clientX, y: e.clientY };
        didDrag.current = false;
      }}
      onPointerMove={(e) => {
        if (!pointerStart.current) return;
        const dx = Math.abs(e.clientX - pointerStart.current.x);
        const dy = Math.abs(e.clientY - pointerStart.current.y);
        if (dx > 10 || dy > 10) didDrag.current = true;
      }}
      onPointerUp={() => {
        pointerStart.current = null;
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
      onClick={() => {
        if (!interactive || didDrag.current) return;

        const touchLike =
          pointerType.current === "touch" ||
          pointerType.current === "pen" ||
          !hasHoverPointer();

        // Phone / tablet: first tap = front + name (like hover), second tap = open
        if (touchLike && !previewed) {
          preview();
          return;
        }

        onSelect(product.id);
      }}
      onMouseEnter={() => {
        if (hasHoverPointer()) preview();
      }}
      onMouseLeave={() => {
        if (hasHoverPointer()) clearPreview();
      }}
      data-rack-item
      className="relative flex shrink-0 snap-center flex-col items-center outline-none touch-manipulation"
      style={{
        width: "clamp(200px, 42vw, 420px)",
        height: "min(78dvh, 630px)",
        marginTop: "-28px",
        zIndex: selected ? 0 : showFront ? 40 : 10 + index,
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: selected ? 0 : dimmed ? 0.35 : 1,
        y: showFront ? 6 : 0,
        filter: dimmed ? "blur(6px)" : "blur(0px)",
        scale: selected ? 0.92 : showFront ? 1.04 : 1,
        pointerEvents: interactive ? "auto" : "none",
      }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 30,
        delay: selected ? 0 : Math.min(index * 0.02, 0.12),
      }}
      aria-label={`${product.title}. Tap once for front view, tap again to inspect.`}
      aria-hidden={selected}
      aria-pressed={previewed}
      tabIndex={interactive ? 0 : -1}
    >
      <motion.div
        layoutId={selected ? undefined : `garment-${product.id}`}
        className="h-full w-full origin-top"
        transition={{ type: "spring", stiffness: 360, damping: 32 }}
      >
        <GarmentFlip
          sideSrc={product.sideImage}
          frontSrc={product.frontImage}
          alt={product.title}
          showFront={showFront}
        />
      </motion.div>
    </motion.button>
  );
}
