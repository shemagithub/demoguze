export type Size = "S" | "M" | "L" | "XL" | "2XL";

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  /** Side / profile view — default hanging pose on the rack. */
  sideImage: string;
  /** Front view — shown on rack hover. */
  frontImage: string;
  /** Back view — product focus flip. */
  backImage: string;
  sizes: Size[];
  description?: string;
}

export type ViewSide = "front" | "back";

export interface CartItem {
  productId: string;
  title: string;
  size: Size;
  price: number;
  currency: string;
  image: string;
}
