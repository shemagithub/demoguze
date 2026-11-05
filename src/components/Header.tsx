"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CurrencyDropdown } from "@/components/CurrencyDropdown";

interface HeaderProps {
  dimmed?: boolean;
}

/** Same navbar design — cart opens a right-side drawer; currency is a dropdown. */
export function Header({ dimmed = false }: HeaderProps) {
  const { count, openCart } = useCart();

  return (
    <header
      className={`relative z-50 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 px-3 pt-[max(0.5rem,var(--safe-top))] pb-2 transition-opacity duration-300 sm:gap-x-3 sm:px-5 md:px-8 md:py-2.5 ${
        dimmed ? "pointer-events-none opacity-35" : "opacity-100"
      }`}
    >
      <div className="min-w-0 justify-self-start">
        <Link
          href="/about"
          className="inline-flex max-w-full truncate text-[10px] font-medium tracking-[0.14em] text-neutral-800 uppercase transition-colors hover:text-black sm:text-[11px] sm:tracking-[0.18em]"
        >
          About
        </Link>
      </div>

      <Link
        href="/"
        className="justify-self-center px-1 text-[18px] font-black tracking-[-0.04em] text-black sm:text-[22px] md:text-[28px]"
      >
        BOTE
      </Link>

      <div className="flex min-w-0 items-center justify-end gap-0.5 text-neutral-800 sm:gap-2 md:gap-4">
        <CurrencyDropdown />
        <IconLink href="/search" label="Search">
          <SearchIcon />
        </IconLink>
        <IconLink href="/account" label="Account">
          <UserIcon />
        </IconLink>
        <button
          type="button"
          aria-label="Open cart"
          onClick={openCart}
          className="relative flex h-9 w-8 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-60 sm:h-8 sm:w-8"
        >
          <CartIcon />
          {count > 0 && (
            <span className="absolute top-0.5 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white sm:-top-1 sm:-right-1">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function IconLink({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex h-9 w-8 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-60 sm:h-8 sm:w-8"
    >
      {children}
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="sm:h-[18px] sm:w-[18px]">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="sm:h-[18px] sm:w-[18px]">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="sm:h-[18px] sm:w-[18px]">
      <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
      <path d="M9 8V7a3 3 0 016 0v1" strokeLinecap="round" />
    </svg>
  );
}
