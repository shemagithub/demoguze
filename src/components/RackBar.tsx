export function RackBar() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 mx-auto h-12 w-full"
    >
      {/* Left bracket */}
      <div className="absolute top-0 left-0 z-20 flex flex-col items-center sm:left-2">
        <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-neutral-300 via-neutral-400 to-neutral-600 shadow-sm" />
        <div className="h-5 w-[3px] bg-gradient-to-b from-neutral-400 to-neutral-600" />
        <div className="h-[3px] w-6 rounded-full bg-gradient-to-r from-neutral-400 to-neutral-600" />
      </div>

      {/* Chrome rail — full width under hangers */}
      <div
        className="absolute top-[15px] right-8 left-8 h-[9px] rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.2)] sm:right-10 sm:left-10"
        style={{
          background:
            "linear-gradient(180deg, #d6d6d6 0%, #fafafa 36%, #b4b4b4 70%, #8c8c8c 100%)",
        }}
      />
      <div
        className="absolute top-[16px] right-12 left-12 h-[2.5px] rounded-full opacity-85 sm:right-16 sm:left-16"
        style={{
          background: "linear-gradient(90deg, transparent, #fff, transparent)",
        }}
      />

      {/* Right bracket */}
      <div className="absolute top-0 right-0 z-20 flex flex-col items-center sm:right-2">
        <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-neutral-300 via-neutral-400 to-neutral-600 shadow-sm" />
        <div className="h-5 w-[3px] bg-gradient-to-b from-neutral-400 to-neutral-600" />
        <div className="h-[3px] w-6 rounded-full bg-gradient-to-r from-neutral-400 to-neutral-600" />
      </div>
    </div>
  );
}
