"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PRODUCTS } from "@/data/products";
import { useCurrency } from "@/context/CurrencyContext";
import { GarmentImage } from "@/components/GarmentImage";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { format } = useCurrency();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <PageShell
      title="Search"
      subtitle="Find hoodies, tees, jackets, and more across the BOTE rack."
      wide
    >
      <label className="block">
        <span className="sr-only">Search products</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hoodies, tees, jackets…"
          className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base text-neutral-900 outline-none transition focus:border-[#3b449b] sm:px-7 sm:py-5 sm:text-lg md:text-xl"
          autoFocus
        />
      </label>

      <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase sm:mt-6 sm:text-sm">
        {results.length} piece{results.length === 1 ? "" : "s"}
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((product) => (
          <li key={product.id}>
            <Link
              href="/"
              className="group block overflow-hidden rounded-[18px] border border-neutral-200 bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:rounded-[24px] sm:p-5"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#f7f7f7] sm:rounded-2xl">
                <GarmentImage src={product.frontImage} alt={product.title} />
              </div>
              <p className="mt-3 text-[11px] font-bold tracking-wide text-neutral-950 uppercase group-hover:text-[#3b449b] sm:mt-4 sm:text-sm">
                {product.title}
              </p>
              <p className="mt-1 text-sm text-neutral-500 sm:mt-1.5 sm:text-base">
                {format(product.price)}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="mt-10 text-base text-neutral-500 sm:mt-12 sm:text-lg">
          No pieces match “{query}”. Try another word or{" "}
          <Link href="/" className="font-semibold text-[#3b449b] underline">
            browse the rack
          </Link>
          .
        </p>
      )}
    </PageShell>
  );
}
