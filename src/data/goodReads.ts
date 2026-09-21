// books for the good-reads.md shelf. empty shelf until I actually add some.

export type Book = {
  title: string
  author: string
  status: 'reading' | 'finished' | 'want-to-read'
  note?: string
}

export const goodReads: Book[] = []
