"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { RackBar } from "@/components/RackBar";
import { RackItem } from "@/components/RackItem";
import { ProductFocus } from "@/components/ProductFocus";

export function ClothingRack() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { add } = useCart();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const selected = PRODUCTS.find((p) => p.id === selectedId) ?? null;
  const hovered = PRODUCTS.find((p) => p.id === hoveredId) ?? null;
  const selectedIndex = selected
    ? PRODUCTS.findIndex((p) => p.id === selected.id)
    : -1;

  const selectProduct = useCallback((id: string) => {
    setHoveredId(null);
    setSelectedId(id);
  }, []);

  const closeFocus = useCallback(() => {
    setHoveredId(null);
    setSelectedId(null);
  }, []);

  const goRelative = useCallback(
    (delta: number) => {
      if (selectedIndex < 0) return;
      const next = (selectedIndex + delta + PRODUCTS.length) % PRODUCTS.length;
      setSelectedId(PRODUCTS[next].id);
    },
    [selectedIndex],
  );

  const swipeRack = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-rack-item]");
    const step = first ? first.offsetWidth + 12 : el.clientWidth * 0.5;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const center = () => {
      const mid = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTo({
        left: Math.max(0, mid),
        behavior: "instant" as ScrollBehavior,
      });
    };

    center();
    const t1 = window.setTimeout(center, 80);
    const t2 = window.setTimeout(center, 300);
    window.addEventListener("resize", center);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", center);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedId) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        swipeRack(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        swipeRack(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, swipeRack]);

  return (
    <LayoutGroup>
      <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#f3f3f3]">
        <Header dimmed={!!selected} />

        <main className="relative flex flex-1 flex-col">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#ffffff_0%,#f3f3f3_58%,#ebebeb_100%)]"
          />

          <motion.div
            animate={{
              filter: selected ? "blur(6px)" : "blur(0px)",
              opacity: selected ? 0.4 : 1,
            }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-1 flex-col justify-center"
          >
            <div className="relative mx-auto w-full max-w-[1800px]">
              <div className="px-2 md:px-6">
                <RackBar />
              </div>

              <div className="relative pt-1">
                {!selected && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous clothes"
                      onClick={() => swipeRack(-1)}
                      className="absolute top-[38%] left-1 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300/80 bg-white/90 text-xl leading-none text-neutral-700 shadow-md backdrop-blur-sm transition hover:bg-white sm:h-12 sm:w-12 sm:text-2xl md:left-4"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next clothes"
                      onClick={() => swipeRack(1)}
                      className="absolute top-[38%] right-1 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300/80 bg-white/90 text-xl leading-none text-neutral-700 shadow-md backdrop-blur-sm transition hover:bg-white sm:h-12 sm:w-12 sm:text-2xl md:right-4"
                    >
                      ›
                    </button>
                  </>
                )}

                <div
                  ref={scrollerRef}
                  className="rack-scroll flex touch-pan-x items-start gap-2 overflow-x-auto overscroll-x-contain px-[4vw] pb-8 sm:gap-3 sm:px-[2vw] sm:pb-6"
                  style={{
                    scrollSnapType: "x mandatory",
                    scrollPaddingInline: "4vw",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {PRODUCTS.map((product, index) => (
                    <RackItem
                      key={product.id}
                      product={product}
                      index={index}
                      selected={product.id === selectedId}
                      dimmed={!!selectedId && product.id !== selectedId}
                      onSelect={selectProduct}
                      onHoverChange={setHoveredId}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!selected && (
              <motion.div
                key={hovered ? hovered.id : "hint"}
                className="pointer-events-none absolute bottom-[max(0.75rem,var(--safe-bottom))] left-1/2 z-30 w-full max-w-xl -translate-x-1/2 px-4 text-center sm:bottom-4 sm:px-6"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {hovered ? (
                  <p
                    className="text-xs font-medium tracking-[0.18em] text-[#3b449b] uppercase sm:text-sm sm:tracking-[0.22em] md:text-base"
                    aria-live="polite"
                  >
                    {hovered.title}
                  </p>
                ) : (
                  <p className="text-[9px] tracking-[0.14em] text-neutral-400 uppercase sm:text-[10px] sm:tracking-[0.16em]">
                    Swipe or arrows · Hover = front &amp; name · Tap = open
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {selected && (
              <ProductFocus
                key={selected.id}
                product={selected}
                onClose={closeFocus}
                onPrev={() => goRelative(-1)}
                onNext={() => goRelative(1)}
                onAddToCart={add}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </LayoutGroup>
  );
}
