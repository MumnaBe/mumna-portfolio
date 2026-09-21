type Props = {
  label: string
  sub: string
  tone: 'light' | 'dark'
  className?: string
}

export default function Badge({ label, sub, tone, className = '' }: Props) {
  const dark = tone === 'dark'
  const bg = dark ? '#2f3547' : '#ffffff'
  const edge = dark ? '#c9ccd6' : '#3c3f4a'
  const inner = dark ? '#6b7186' : '#c9c3c8'
  const accent = dark ? '#f1b6c4' : '#b06777'
  const text = dark ? '#ffffff' : '#2f2a30'
  const muted = dark ? '#c9ccd6' : '#6f6870'

  return (
    <svg viewBox="0 0 120 132" className={className} aria-hidden="true">
      <path d="M60 4 112 34v64L60 128 8 98V34Z" fill={bg} stroke={edge} strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 14 103 39v54l-43 25-43-25V39Z" fill="none" stroke={inner} strokeWidth="1.5" />
      <circle cx="60" cy="49" r="16" fill={accent} />
      <path d="M52 49.5l5.5 5.5 11-12" fill="none" stroke={bg} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 76h60" stroke={inner} strokeWidth="1.2" />
      <text x="60" y="93" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={label.length > 10 ? 10.5 : 13} fontWeight="800" fill={text}>
        {label}
      </text>
      <text x="60" y="106" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6.5" letterSpacing="2" fill={muted}>
        {sub}
      </text>
    </svg>
  )
}
