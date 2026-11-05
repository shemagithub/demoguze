import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <PageShell
      title="Account"
      subtitle="Sign in to save sizes, track orders, and sync your GUZE rack across devices."
    >
      <div className="grid gap-5 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="rounded-[22px] border border-neutral-200 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:rounded-[28px] sm:p-8 md:p-10">
          <h2 className="text-xl font-bold tracking-[-0.03em] text-neutral-950 sm:text-2xl md:text-3xl">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-neutral-500 sm:text-base">
            Frontend placeholder — no live auth in this demo.
          </p>

          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase sm:text-[12px]">
                Email
              </span>
              <input
                type="email"
                placeholder="you@guze.com"
                autoComplete="email"
                className="w-full rounded-full border border-neutral-300 bg-[#fafafa] px-5 py-3.5 text-base text-neutral-900 outline-none transition focus:border-[#3b449b] focus:bg-white sm:px-6 sm:py-4"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase sm:text-[12px]">
                Password
              </span>
              <input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-full border border-neutral-300 bg-[#fafafa] px-5 py-3.5 text-base text-neutral-900 outline-none transition focus:border-[#3b449b] focus:bg-white sm:px-6 sm:py-4"
              />
            </label>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-[#3b449b] py-3.5 text-[12px] font-bold tracking-[0.16em] text-white uppercase transition hover:bg-[#2f3780] sm:mt-8 sm:py-4 sm:text-[13px]"
          >
            Sign in
          </button>

          <p className="mt-5 text-center text-sm text-neutral-500 sm:mt-6 sm:text-base">
            Or continue as guest on the{" "}
            <Link
              href="/"
              className="font-semibold text-[#3b449b] underline underline-offset-4"
            >
              shop rack
            </Link>
            .
          </p>
        </form>

        <aside className="rounded-[22px] bg-[#3b449b] p-5 text-white sm:rounded-[28px] sm:p-8 md:p-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-80 sm:text-[12px]">
            Member perks
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:mt-3 sm:text-3xl md:text-4xl">
            Your rack, everywhere
          </h3>
          <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/90 sm:mt-8 sm:space-y-5 sm:text-base md:text-lg">
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" />
              Saved sizes across the catalog
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" />
              Order history and shipping updates
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" />
              Early access drops on new rack pieces
            </li>
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
