import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About",
};

const VALUES = [
  {
    title: "The rack",
    body: "Browse like a real closet — swipe the rail, hover for the back, tap to inspect.",
  },
  {
    title: "Real pieces",
    body: "Product photography first. Front and back views, sizes, and a clear path to cart.",
  },
  {
    title: "No noise",
    body: "Minimal layout, bold type, and motion that feels physical — not decorative clutter.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      subtitle="BOTE is a streetwear label built around the hanging rack — clean motion, real product photos, and a closet-first shopping feel."
    >
      <div className="overflow-hidden rounded-[22px] border border-neutral-200 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:rounded-[28px] sm:p-8 md:p-12">
        <p className="text-4xl font-black tracking-[-0.04em] text-neutral-950 sm:text-5xl md:text-6xl">
          BOTE
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 sm:mt-8 sm:text-lg md:text-xl">
          We started with one idea: shopping clothes online should feel like
          walking into a boutique and pulling pieces from a rail — not scrolling
          an endless grid of thumbnails.
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:mt-5 sm:text-base md:text-lg">
          This site is a frontend showcase of that experience: shared-element
          transitions, 3D front/back flips, size selection, and a cart that
          follows you across pages.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:mt-12 md:grid-cols-3">
        {VALUES.map((item) => (
          <div
            key={item.title}
            className="rounded-[20px] border border-neutral-200 bg-white/80 p-5 sm:rounded-[24px] sm:p-7 md:p-8"
          >
            <h2 className="text-lg font-bold tracking-[-0.02em] text-neutral-950 sm:text-xl md:text-2xl">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:mt-3 sm:text-[15px] md:text-base">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#3b449b] px-8 py-3.5 text-[12px] font-bold tracking-[0.16em] text-white uppercase transition hover:bg-[#2f3780] sm:py-4"
        >
          Shop the rack
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-8 py-3.5 text-[12px] font-bold tracking-[0.16em] text-neutral-800 uppercase transition hover:border-neutral-500 sm:py-4"
        >
          Search pieces
        </Link>
      </div>
    </PageShell>
  );
}
