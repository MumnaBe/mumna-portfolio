import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useMediaQuery'

export default function Typewriter({ words }: { words: string[] }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const word = words[index % words.length]
    let delay = deleting ? 45 : 95
    if (!deleting && text === word) delay = 1700
    if (deleting && text === '') delay = 350

    const id = window.setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => window.clearTimeout(id)
  }, [text, deleting, index, words, reduced])

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="ml-1.5 text-body">
        {reduced ? words[0] : text}
        <span className="caret" />
      </span>
    </>
  )
}
