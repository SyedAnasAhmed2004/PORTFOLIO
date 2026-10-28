import type { ProjectVisual as ProjectVisualKind } from '@/types/profile'

/** Rising market signal with detected events. */
function MarketVisual() {
  return (
    <svg viewBox="0 0 320 200" className="size-full" aria-hidden="true">
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgb(255 255 255 / 0.08)" />
      ))}
      <polyline
        points="0,160 40,150 70,155 100,120 130,128 160,96 190,104 220,70 250,78 280,44 320,36"
        fill="none"
        stroke="#a99bff"
        strokeWidth="2.5"
      />
      {[
        [100, 120],
        [220, 70],
        [280, 44],
      ].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="9" fill="#a99bff" opacity="0.2" />
          <circle cx={x} cy={y} r="4" fill="#f1f1f4" />
        </g>
      ))}
    </svg>
  )
}

/** Chessboard with a few pieces. */
function ChessVisual() {
  const pieces: Record<number, string> = { 12: '♞', 27: '♛', 36: '♚', 45: '♝', 51: '♜' }
  return (
    <div className="grid size-full grid-cols-8 grid-rows-8" aria-hidden="true">
      {Array.from({ length: 64 }, (_, index) => {
        const isDark = (Math.floor(index / 8) + index) % 2 === 1
        return (
          <span
            key={index}
            className={`grid place-items-center text-lg leading-none ${isDark ? 'bg-white/[0.07]' : 'bg-transparent'}`}
          >
            {pieces[index] && <span className="text-fg/90">{pieces[index]}</span>}
          </span>
        )
      })}
    </div>
  )
}

/** Road network coloured by predicted congestion. */
function TrafficVisual() {
  const roads = [
    { d: 'M0 60 C80 60 120 100 200 100 S300 80 320 80', color: '#7ee0a1' },
    { d: 'M0 150 C90 140 150 160 220 130 S300 150 320 150', color: '#f2b13d' },
    { d: 'M90 0 C100 70 80 130 110 200', color: '#ff6b6b' },
    { d: 'M230 0 C220 60 250 120 230 200', color: '#7ee0a1' },
  ]
  return (
    <svg viewBox="0 0 320 200" className="size-full" aria-hidden="true">
      {roads.map((road) => (
        <g key={road.d}>
          <path d={road.d} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="10" />
          <path d={road.d} fill="none" stroke={road.color} strokeWidth="2.5" strokeDasharray="10 6" />
        </g>
      ))}
    </svg>
  )
}

const VISUALS: Record<ProjectVisualKind, () => React.JSX.Element> = {
  market: MarketVisual,
  chess: ChessVisual,
  traffic: TrafficVisual,
}

export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const Visual = VISUALS[kind]
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-md border border-line bg-gradient-to-br from-white/[0.05] to-transparent p-4 shadow-[0_0_40px_rgba(169,155,255,0.08)]">
      <Visual />
    </div>
  )
}
