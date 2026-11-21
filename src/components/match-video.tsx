import type { RefObject } from 'react'

type MatchVideoProps = {
  reactionLayerRef: RefObject<HTMLDivElement | null>
}

export default function MatchVideo({ reactionLayerRef }: MatchVideoProps) {
  return (
    <div className="relative isolate aspect-video overflow-hidden border border-outline bg-black">
      <iframe
        src="https://www.youtube-nocookie.com/embed/oqnOmZ-SS3Y?playsinline=1&rel=0"
        title="EA SPORTS FC Mobile — The World's Game Update"
        className="absolute inset-0 size-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      <div
        ref={reactionLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
      />
    </div>
  )
}