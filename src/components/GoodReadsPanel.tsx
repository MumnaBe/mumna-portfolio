import { goodReads, type Book } from '../data/goodReads'

const SPINE_COLORS = ['#e79bb0', '#8fb3e8', '#e8c46e', '#9fd3b3', '#bba6e6', '#f2ab80']

const STATUS_LABELS: Record<Book['status'], string> = {
  reading: 'reading now',
  finished: 'finished',
  'want-to-read': 'want to read',
}

export default function GoodReadsPanel() {
  if (goodReads.length === 0) {
    return (
      <>
        <div className="bookshelf" aria-hidden="true">
          {[7, 8.5, 7.5].map((height) => (
            <span key={height} className="book-spine book-spine--blank" style={{ height: `${height}rem` }} />
          ))}
        </div>
        <p className="empty-state mt-5">{'// the shelf is empty for now 📚'}</p>
      </>
    )
  }

  const notes = goodReads.filter((book) => book.note)

  return (
    <>
      <ul className="bookshelf" aria-label="Bookshelf">
        {goodReads.map((book, i) => (
          <li
            key={`${book.title}-${book.author}`}
            className="book-spine"
            style={{ backgroundColor: SPINE_COLORS[i % SPINE_COLORS.length], height: `${9 + ((i * 7) % 4) * 0.6}rem` }}
          >
            <span className="book-title">{book.title}</span>
            <span className="book-author">{book.author}</span>
            <span className="sr-only">({STATUS_LABELS[book.status]})</span>
            {book.status === 'reading' && (
              <span className="book-flag" aria-hidden="true">
                now
              </span>
            )}
          </li>
        ))}
      </ul>

      {notes.length > 0 && (
        <ul className="tri-list mt-6">
          {notes.map((book) => (
            <li key={`${book.title}-${book.author}`}>
              <span className="font-semibold text-title">{book.title}</span>{' '}
              <span className="text-muted">({STATUS_LABELS[book.status]})</span>: {book.note}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
