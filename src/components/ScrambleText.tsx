import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useMediaQuery'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#'

function scramble(text: string, progress: number) {
  const revealed = Math.floor(progress * text.length)
  return Array.from(text, (ch, i) =>
    i < revealed || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  ).join('')
}

export default function ScrambleText({ text }: { text: string }) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(text)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (reduced) {
      setDisplay(text)
      return
    }
    const total = 28
    let step = 0
    const id = window.setInterval(() => {
      step++
      setDisplay(scramble(text, step / total))
      if (step >= total) window.clearInterval(id)
    }, 45)
    return () => window.clearInterval(id)
  }, [text, reduced, run])

  return (
    <span onMouseEnter={() => setRun((r) => r + 1)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
