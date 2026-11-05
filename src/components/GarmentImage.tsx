"use client";

interface GarmentImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Full garment photo — always fit inside the box, never crop. */
export function GarmentImage({ src, alt, className = "" }: GarmentImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={`pointer-events-none h-full w-full select-none object-contain object-top [image-rendering:auto] ${className}`}
    />
  );
}
