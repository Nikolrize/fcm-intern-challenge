export default function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-header">
      <div className="mx-auto flex max-w-[95vw] sm:max-w-[70vw] items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-black italic text-primary">
            FC
          </span>

          <div className="border-l border-white/20 pl-3">
            <p className="text-xs font-black">
              MOBILE
            </p>
            <p className="text-xs text-muted">
              LIVESTREAM
            </p>
          </div>
        </div>

        <span className="flex items-center gap-2 font-bold tracking-widest sm:text-xs">
          <span className="size-2 rounded-full bg-primary" />
          LIVE NOW
        </span>
      </div>
    </header>
  )
}