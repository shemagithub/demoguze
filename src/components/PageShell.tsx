import { Header } from "@/components/Header";

export function PageShell({
  title,
  subtitle,
  children,
  wide = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-[#f3f3f3]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#ffffff_0%,#f3f3f3_55%,#ebebeb_100%)]"
      />
      <Header />
      <main
        className={`relative mx-auto w-full flex-1 px-4 pt-8 pb-[max(2rem,var(--safe-bottom))] sm:px-6 sm:py-12 md:px-10 md:py-16 ${
          wide ? "max-w-6xl" : "max-w-4xl"
        }`}
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[#3b449b] uppercase sm:text-[12px]">
          BOTE
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-neutral-950 sm:mt-3 sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:mt-4 sm:text-base md:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mt-8 sm:mt-10 md:mt-12">{children}</div>
      </main>
    </div>
  );
}
