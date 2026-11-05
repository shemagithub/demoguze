"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Currency is chosen from the header dropdown — no separate page. */
export default function CurrencyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f3f3f3] text-sm text-neutral-500">
      Opening shop…
    </div>
  );
}
