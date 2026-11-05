"use client";

import { CartDrawer } from "@/components/CartDrawer";

/** Mounts the global right-side cart drawer on every page. */
export function CartHost() {
  return <CartDrawer />;
}
