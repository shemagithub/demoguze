"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { GarmentFlip } from "@/components/GarmentFlip";

interface RackItemProps {
  product: Product;
  index: number;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
  onHoverChange?: (id: string | null) => void;
}

export function RackItem({
  product,
  index,
  selected,
  dimmed,
  onSelect,
  onHoverChange,
}: RackItemProps) {
  const [showFront, setShowFront] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const didDrag = useRef(false);
  const interactive = !selected && !dimmed;

  const onEnter = useCallback(() => {
    if (!interactive) return;
    setShowFront(true);
    onHoverChange?.(product.id);
  }, [interactive, onHoverChange, product.id]);

  const onLeave = useCallback(() => {
    setShowFront(false);
    onHoverChange?.(null);
  }, [onHoverChange]);

  return (
    <motion.button
      type="button"
      onPointerDown={(e) => {
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
      onClick={() => {
        if (!interactive || didDrag.current) return;
        onSelect(product.id);
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      data-rack-item
      className="relative flex shrink-0 snap-center flex-col items-center outline-none"
      style={{
        /* Match 640×960 garment canvases so every hang is equal length */
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
      aria-label={`${product.title}. Hover for front view. Click to inspect.`}
      aria-hidden={selected}
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
