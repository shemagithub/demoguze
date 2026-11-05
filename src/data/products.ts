import type { Product } from "@/types/product";

const V = "v=10";

export const PRODUCTS: Product[] = [
  {
    id: "black-polo",
    title: "GUZE NOIR POLO",
    price: 65000,
    currency: "₦",
    sideImage: `/garments/black-polo-side.png?${V}`,
    frontImage: `/garments/black-polo-front.png?${V}`,
    backImage: `/garments/black-polo-back.png?${V}`,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Matte black short-sleeve polo.",
  },
  {
    id: "navy-polo",
    title: "GUZE NAVY POLO",
    price: 65000,
    currency: "₦",
    sideImage: `/garments/navy-polo-side.png?${V}`,
    frontImage: `/garments/navy-polo-front.png?${V}`,
    backImage: `/garments/navy-polo-back.png?${V}`,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Deep navy polo with clean placket.",
  },
  {
    id: "plum-polo",
    title: "GUZE PLUM POLO",
    price: 65000,
    currency: "₦",
    sideImage: `/garments/plum-polo-side.png?${V}`,
    frontImage: `/garments/plum-polo-front.png?${V}`,
    backImage: `/garments/plum-polo-back.png?${V}`,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Rich plum short-sleeve polo.",
  },
  {
    id: "blue-polo",
    title: "GUZE STRIKE POLO",
    price: 72000,
    currency: "₦",
    sideImage: `/garments/blue-polo-side.png?${V}`,
    frontImage: `/garments/blue-polo-front.png?${V}`,
    backImage: `/garments/blue-polo-back.png?${V}`,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Royal blue polo with striped cuffs.",
  },
  {
    id: "black-hoodie",
    title: "GUZE VOID HOODIE",
    price: 89000,
    currency: "₦",
    sideImage: `/garments/black-hoodie-side.png?${V}`,
    frontImage: `/garments/black-hoodie-front.png?${V}`,
    backImage: `/garments/black-hoodie-back.png?${V}`,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Heavy black streetwear hoodie.",
  },
  {
    id: "white-hoodie",
    title: "GUZE CLOUD HOODIE",
    price: 89000,
    currency: "₦",
    sideImage: `/garments/white-hoodie-side.png?${V}`,
    frontImage: `/garments/white-hoodie-front.png?${V}`,
    backImage: `/garments/white-hoodie-back.png?${V}`,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Oversized white fleece hoodie.",
  },
];

export function formatPrice(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
