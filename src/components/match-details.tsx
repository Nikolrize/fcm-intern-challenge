import useReaction from '../hooks/useReaction'
import MatchVideo from './match-video'
import ReactionControl from './reaction-control'


export default function MatchDetails() {
  const {
    reactionLayerRef,
    spawnReaction,
    clearReactions,
    mode,
    changeMode,
    speed,
    changeSpeed,
  } = useReaction()

  return (
    <section aria-labelledby="stream-title">
      <MatchVideo reactionLayerRef={reactionLayerRef} />

      <div className="mt-5 flex items-start gap-3 sm:gap-4">
        <div
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center bg-primary text-lg font-black italic text-black"
        >
          FC
        </div>

        <div className="flex w-full min-w-0 flex-col gap-5 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-1">
            <h2
              id="stream-title"
              className="text-lg font-black uppercase sm:text-xl"
            >
              Matchday Live: Home vs Away
            </h2>

            <p className="text-sm text-muted">
              The match is on. Make your reaction count.
            </p>


            <div className="mt-2 flex flex-wrap gap-2">
              {['Football', 'Watch Party', 'Live Reactions'].map((tag) => (
                <span
                  key={tag}
                  className="border border-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <ReactionControl
            onSendReaction={spawnReaction}
            onClear={clearReactions}
            mode={mode}
            onModeChange={changeMode}
            speed={speed}
            onSpeedChange={changeSpeed}
          />
        </div>
      </div>
    </section>
  )
}