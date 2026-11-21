import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export type AnimationMode = 'css' | 'gsap'

const reactionColors: Record<string, string> = {
  'lucide-heart': '#fb7185',
  'lucide-thumbs-up': '#60a5fa',
  'lucide-flame': '#fb923c',
  'lucide-star': '#facc15',
}

export default function useReaction() {
  const [mode, setMode] = useState<AnimationMode>('css')
  const [speed, setSpeed] = useState(1)

  const reactionLayerRef = useRef<HTMLDivElement>(null)
  const activeCleanups = useRef(new Set<() => void>())
  const activeTimelines = useRef(new Set<gsap.core.Timeline>())
  const currentSpeed = useRef(1)

  useEffect(() => {
    const cleanups = activeCleanups.current

    return () => {
      for (const cleanup of cleanups) {
        cleanup()
      }
    }
  }, [])

  function clearReactions() {
    for (const cleanup of activeCleanups.current) {
      cleanup()
    }
  }

  function changeMode(nextMode: AnimationMode) {
    clearReactions()
    setMode(nextMode)
  }

  function changeSpeed(nextSpeed: number) {
    currentSpeed.current = nextSpeed
    setSpeed(nextSpeed)

    for (const timeline of activeTimelines.current) {
      timeline.timeScale(nextSpeed)
    }
  }

  function spawnReaction(sourceSVG: SVGSVGElement, amount = 1) {
    const layer = reactionLayerRef.current

    if (!layer) return

    const width = layer.clientWidth
    const height = layer.clientHeight

    if (width === 0 || height === 0) return

    const travelDistance = Math.max(0, height - 72)
    const spawnSpread = Math.min(80, width * 0.2)

    const color =
      Object.entries(reactionColors).find(([iconClass]) =>
        sourceSVG.classList.contains(iconClass),
      )?.[1] ?? '#b6ff32'

    for (let index = 0; index < amount; index++) {
      const particle = document.createElement('div')
      const svg = sourceSVG.cloneNode(true) as SVGSVGElement

      svg.removeAttribute('class')
      svg.style.color = color
      svg.setAttribute('fill', 'currentColor')
      svg.setAttribute('aria-hidden', 'true')
      svg.setAttribute('focusable', 'false')

      particle.className = 'reaction-particle'
      particle.setAttribute('aria-hidden', 'true')

      const spreadPosition =
        amount > 1
          ? ((index * 37) % 101) / 100
          : Math.random()

      const startX =
        width - 60 - 36 - spreadPosition * spawnSpread

      const direction =
        amount > 1
          ? index % 2 === 0 ? 1 : -1
          : Math.random() < 0.5 ? -1 : 1

      const sway =
        (amount > 1 ? 12 + index % 13 : 12 + Math.random() * 12)
        * direction

      particle.style.setProperty('--start-x', `${startX}px`)
      particle.style.setProperty('--sway', `${sway}px`)
      particle.style.setProperty(
        '--travel-distance',
        `${travelDistance}px`,
      )

      particle.appendChild(svg)

      let timeline: gsap.core.Timeline | undefined

      function cleanup() {
        particle.removeEventListener('animationend', cleanup)
        particle.removeEventListener('animationcancel', cleanup)

        if (timeline) {
          timeline.kill()
          activeTimelines.current.delete(timeline)
        }

        particle.remove()
        activeCleanups.current.delete(cleanup)
      }

      activeCleanups.current.add(cleanup)

      if (mode === 'css') {
        particle.classList.add('reaction-particle--css')

        particle.addEventListener('animationend', cleanup)
        particle.addEventListener('animationcancel', cleanup)

        layer.appendChild(particle)
      } else {
        particle.style.left = `${startX}px`
        particle.style.willChange = 'transform, opacity'

        gsap.set(particle, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0,
          transformOrigin: '0% 100%',
          force3D: true,
        })

        layer.appendChild(particle)

        timeline = gsap.timeline({
          paused: true,
          defaults: { ease: 'none' },
          onComplete: cleanup,
        })

        timeline
          .to(particle, {
            x: sway,
            y: -travelDistance * 0.25,
            scale: 38 / 36,
            duration: 0.75,
          })
          .to(particle, {
            x: -sway,
            y: -travelDistance * 0.5,
            scale: 40 / 36,
            duration: 0.75,
          })
          .to(particle, {
            x: sway,
            y: -travelDistance * 0.75,
            scale: 43 / 36,
            duration: 0.75,
          })
          .to(particle, {
            x: 0,
            y: -travelDistance,
            scale: 45 / 36,
            duration: 0.75,
          })

        timeline.to(
          particle,
          { opacity: 1, duration: 0.3 },
          0,
        )

        timeline.to(
          particle,
          { opacity: 0, duration: 0.75 },
          2.25,
        )

        activeTimelines.current.add(timeline)
        timeline.timeScale(currentSpeed.current).play()
      }
    }
  }

  return {
    reactionLayerRef,
    spawnReaction,
    clearReactions,
    mode,
    changeMode,
    speed,
    changeSpeed,
  }
}