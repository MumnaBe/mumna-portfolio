import { useState } from 'react'
import { random } from '../data/resume'
import BlogPanel from './BlogPanel'
import GoodReadsPanel from './GoodReadsPanel'
import RecipesPanel from './RecipesPanel'

function TrophyIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
      <path d="M20 14h-7c0 8 3.5 12 8.5 13M44 14h7c0 8-3.5 12-8.5 13" fill="none" stroke="#4a3a40" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 10h24v12c0 9-5.4 16-12 16s-12-7-12-16Z" fill={color} stroke="#4a3a40" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M26 15c0 6 2 10 4 12" stroke="#fff" strokeOpacity=".6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M29 38h6v8h-6Z" fill={color} stroke="#4a3a40" strokeWidth="2.5" />
      <rect x="21" y="46" width="22" height="8" rx="1.5" fill="#5b4a45" stroke="#3a2d2a" strokeWidth="2" />
    </svg>
  )
}

function Wins() {
  return (
    <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-3">
      {random.wins.map((win) => (
        <li key={win.title} className="trophy">
          <TrophyIcon color={win.color} />
          <div className="trophy-plaque">
            <p className="font-mono text-[0.78rem] font-bold text-title">{win.title}</p>
            <p className="mt-0.5 font-mono text-[0.68rem] leading-snug text-muted">{win.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

const FILES = [
  { id: 'wins', Panel: Wins },
  { id: 'blog', Panel: BlogPanel },
  { id: 'good-reads', Panel: GoodReadsPanel },
  { id: 'recipes', Panel: RecipesPanel },
]

export default function RandomFiles() {
  // nothing open to start; clicking the same file again closes it
  const [openId, setOpenId] = useState<string | null>(null)
  const openFile = FILES.find((file) => file.id === openId)

  return (
    <fieldset className="box mt-10 px-5 pt-4 pb-7 sm:px-8">
      <legend>cat ~/random.md</legend>

      {random.motto && (
        <blockquote className="mb-5">
          <p className="font-mono text-xs text-muted">my life motto</p>
          <p className="mt-1 text-lg font-semibold text-title">“{random.motto.text}”</p>
          {random.motto.source && <footer className="mt-1 text-sm text-muted">— {random.motto.source}</footer>}
        </blockquote>
      )}

      <p className="font-mono text-sm text-muted">{'// a few random things about me. click a file to open it:'}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {FILES.map(({ id }) => (
          <button
            key={id}
            type="button"
            className="retro-tab"
            aria-expanded={openId === id}
            aria-controls="random-file"
            onClick={() => setOpenId((current) => (current === id ? null : id))}
          >
            {id}.md
          </button>
        ))}
      </div>

      {openFile && (
        <div id="random-file" className="mt-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted">~/random/{openFile.id}.md</p>
            <button type="button" className="text-link text-xs" onClick={() => setOpenId(null)}>
              close ✕
            </button>
          </div>
          <openFile.Panel />
        </div>
      )}
    </fieldset>
  )
}
