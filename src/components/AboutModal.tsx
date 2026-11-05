"use client";

import { AnimatePresence, motion } from "framer-motion";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close about"
            className="fixed inset-0 z-[60] bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 z-[70] w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-7 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-4 text-lg text-neutral-400 hover:text-black"
            >
              ×
            </button>
            <p className="text-xl font-black tracking-[-0.04em]">UNKNOWN</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Interactive streetwear rack. Drag to browse pieces, click to
              inspect, flip Front / Back, pick a size, and add to cart — a
              frontend showcase of shared-element motion and 3D garment flips.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-black py-3 text-[11px] font-semibold tracking-[0.16em] text-white uppercase"
            >
              Back to rack
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
