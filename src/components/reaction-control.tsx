import type { MouseEvent } from 'react'
import { Flame, Heart, Star, ThumbsUp } from 'lucide-react'
import type { AnimationMode } from '../hooks/useReaction'

type ReactionControlProps = {
  onSendReaction: (svg: SVGSVGElement, amount?: number) => void
  onClear: () => void
  mode: AnimationMode
  onModeChange: (mode: AnimationMode) => void
  speed: number
  onSpeedChange: (speed: number) => void
}

export default function ReactionControl({
  onSendReaction,
  onClear,
  mode,
  onModeChange,
  speed,
  onSpeedChange,
}: ReactionControlProps) {
  function handleReactionClick(
    event: MouseEvent<HTMLButtonElement>,
    amount = 1,
  ) {
    const svg = event.currentTarget.querySelector('svg')

    if (svg) {
      onSendReaction(svg, amount)
    }
  }

  const buttonClass =
    'rounded p-2 text-primary hover:bg-primary/10'

  return (
    <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-label="Send heart reaction"
          className={buttonClass}
          onClick={(event) => handleReactionClick(event)}
        >
          <Heart className="size-6" />
        </button>

        <button
          type="button"
          aria-label="Send thumbs up reaction"
          className={buttonClass}
          onClick={(event) => handleReactionClick(event)}
        >
          <ThumbsUp className="size-6" />
        </button>

        <button
          type="button"
          aria-label="Send fire reaction"
          className={buttonClass}
          onClick={(event) => handleReactionClick(event)}
        >
          <Flame className="size-6" />
        </button>

        <button
          type="button"
          aria-label="Send star reaction"
          className={buttonClass}
          onClick={(event) => handleReactionClick(event)}
        >
          <Star className="size-6" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={(event) => handleReactionClick(event, 60)}
          className="flex items-center gap-2 border border-outline px-3 py-2 text-xs hover:bg-white/5"
        >
          <Heart aria-hidden="true" className="size-4 text-primary" />
          Test 60
        </button>

        <button
          type="button"
          onClick={onClear}
          className="border border-outline px-3 py-2 text-xs hover:bg-white/5"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Animation mode">
        <button
          type="button"
          aria-pressed={mode === 'css'}
          onClick={() => onModeChange('css')}
          className={`border px-3 py-2 text-xs ${mode === 'css'
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-outline text-muted'
            }`}
        >
          Phase 1 · CSS
        </button>

        <button
          type="button"
          aria-pressed={mode === 'gsap'}
          onClick={() => onModeChange('gsap')}
          className={`border px-3 py-2 text-xs ${mode === 'gsap'
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-outline text-muted'
            }`}
        >
          Phase 2 · GSAP
        </button>
      </div>

      {mode === 'gsap' && (
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between gap-4 text-xs">
            <label htmlFor="reaction-speed">Reaction speed</label>

            <output htmlFor="reaction-speed" className="text-primary">
              {speed.toFixed(1)}×
            </output>
          </div>

          <input
            id="reaction-speed"
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={speed}
            onChange={(event) =>
              onSpeedChange(Number(event.target.value))
            }
            className="block w-full accent-primary"
          />
        </div>
      )}
    </div>
  )
}