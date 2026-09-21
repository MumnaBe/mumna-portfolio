import { PALETTE, sprites, type SpriteName } from './pixelArt'

type Props = { name: SpriteName; className?: string }

// merge runs of the same colour into one rect, the way the favicon does it —
// otherwise a sprite is 144 elements instead of about 30
function rowToRects(row: string, y: number) {
  const rects = []
  let x = 0
  while (x < row.length) {
    const char = row[x]
    let width = 1
    while (row[x + width] === char) width++
    if (char !== ' ') {
      rects.push(<rect key={`${x},${y}`} x={x} y={y} width={width} height={1} fill={PALETTE[char]} />)
    }
    x += width
  }
  return rects
}

export default function PixelIcon({ name, className = '' }: Props) {
  return (
    <svg viewBox="0 0 12 12" shapeRendering="crispEdges" className={className} aria-hidden="true" focusable="false">
      {sprites[name].flatMap((row, y) => rowToRects(row, y))}
    </svg>
  )
}
