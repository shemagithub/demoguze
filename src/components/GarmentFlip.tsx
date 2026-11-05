"use client";

import { motion } from "framer-motion";
import { GarmentImage } from "@/components/GarmentImage";

interface GarmentFlipProps {
  /** Hanging / default pose on the rack. */
  sideSrc: string;
  /** Revealed on hover. */
  frontSrc: string;
  alt: string;
  /** When true, show front; otherwise side. */
  showFront: boolean;
  className?: string;
}

/** Rack garment: side view while hanging, crossfade to front on hover. */
export function GarmentFlip({
  sideSrc,
  frontSrc,
  alt,
  showFront,
  className = "",
}: GarmentFlipProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: showFront ? 0 : 1,
          scale: showFront ? 0.97 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <GarmentImage
          src={sideSrc}
          alt={`${alt} side`}
          className="drop-shadow-[0_18px_24px_rgba(0,0,0,0.2)]"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: showFront ? 1 : 0,
          scale: showFront ? 1.03 : 0.98,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <GarmentImage
          src={frontSrc}
          alt={`${alt} front`}
          className="drop-shadow-[0_18px_24px_rgba(0,0,0,0.22)]"
        />
      </motion.div>
    </div>
  );
}
