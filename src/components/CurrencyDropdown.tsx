"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";
import type { CurrencyCode } from "@/data/currencies";

export function CurrencyDropdown() {
  const { code, currency, currencies, setCode } = useCurrency();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (next: CurrencyCode) => {
    setCode(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Currency ${currency.code}. Open menu to change.`}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1 rounded-full px-1 text-[10px] font-medium tracking-wide text-neutral-800 transition hover:bg-black/5 hover:text-black sm:h-8 sm:gap-1.5 sm:px-1.5 sm:text-[11px]"
      >
        <span
          aria-hidden
          className="inline-block h-3 w-3 shrink-0 overflow-hidden rounded-full border border-neutral-300"
          style={{ background: currency.flag }}
        />
        {/* Hide code on very narrow phones so it never covers BOTE */}
        <span className="hidden min-[400px]:inline">{currency.code}</span>
        <svg
          aria-hidden
          width="10"
          height="10"
          viewBox="0 0 12 12"
          className={`text-neutral-500 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label="Select currency"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+6px)] right-0 z-[80] w-[min(220px,calc(100vw-1rem))] overflow-hidden rounded-2xl border border-neutral-200 bg-white py-1 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          >
            {currencies.map((c) => {
              const selected = c.code === code;
              return (
                <li key={c.code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => pick(c.code)}
                    className={`flex w-full items-center gap-3 px-3.5 py-3 text-left transition sm:py-2.5 ${
                      selected
                        ? "bg-[#3b449b]/[0.08] text-[#3b449b]"
                        : "text-neutral-800 hover:bg-neutral-50"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-4 w-4 shrink-0 rounded-full border border-neutral-300"
                      style={{ background: c.flag }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-semibold tracking-wide">
                        {c.code}
                        <span className="ml-1.5 font-normal text-neutral-500">
                          {c.symbol}
                        </span>
                      </span>
                      <span className="block text-[10px] text-neutral-500">
                        {c.label}
                      </span>
                    </span>
                    {selected && (
                      <span className="text-[10px] font-bold tracking-wider uppercase">
                        Active
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
