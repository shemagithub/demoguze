"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

/** /cart opens the side drawer instead of a separate cart page. */
export default function CartPage() {
  const router = useRouter();
  const { openCart } = useCart();

  useEffect(() => {
    openCart();
    router.replace("/");
  }, [openCart, router]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f3f3f3] text-sm text-neutral-500">
      Opening cart…
    </div>
  );
}
