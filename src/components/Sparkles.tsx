import { CrossSparkleIcon, SparkleIcon } from './Icons'

export type Spark = { top: string; left: string; size: number; delay?: number; cross?: boolean }

export default function Sparkles({ items }: { items: Spark[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s, i) => {
        const Icon = s.cross ? CrossSparkleIcon : SparkleIcon
        return (
          <Icon
            key={i}
            className="sparkle"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: `${s.delay ?? i * 0.4}s` }}
          />
        )
      })}
    </div>
  )
}
