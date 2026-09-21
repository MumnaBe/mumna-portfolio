import { useState } from 'react'
import { formatPostDate, posts, type Post } from '../data/blog'
import { CloseIcon } from './Icons'
import Modal from './Modal'

function PostMeta({ post }: { post: Post }) {
  return (
    <p className="exp-meta">
      {post.date && <time dateTime={post.date}>{formatPostDate(post.date)}</time>}
      {post.date && ' · '}
      {post.minutes} min read
    </p>
  )
}

export default function BlogPanel() {
  const [selected, setSelected] = useState<Post | null>(null)

  if (posts.length === 0) {
    return <p className="empty-state">{'// no posts yet. the first one is brewing ☕'}</p>
  }

  return (
    <>
      <ul className="space-y-1">
        {posts.map((post) => (
          <li key={post.slug} className="post-row">
            <PostMeta post={post} />
            <h4 className="mt-1 font-semibold text-ink">
              <button type="button" className="stretched text-left" onClick={() => setSelected(post)} aria-haspopup="dialog">
                {post.title}
              </button>
            </h4>
            {post.summary && <p className="mt-1 text-sm leading-relaxed text-body">{post.summary}</p>}
            {post.tags.length > 0 && (
              <p className="mt-1 font-mono text-[0.7rem] text-muted">{post.tags.map((tag) => `#${tag}`).join(' ')}</p>
            )}
          </li>
        ))}
      </ul>

      <Modal open={selected !== null} onClose={() => setSelected(null)} labelledBy="post-title" className="modal-wide">
        {selected && (
          <article className="p-6 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <PostMeta post={selected} />
                <h3 id="post-title" className="mt-2 text-2xl font-bold tracking-tight text-title sm:text-3xl">
                  {selected.title}
                </h3>
              </div>
              <button type="button" className="circle-btn shrink-0" onClick={() => setSelected(null)} aria-label="Close post">
                <CloseIcon />
              </button>
            </div>
            <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: selected.html }} />
          </article>
        )}
      </Modal>
    </>
  )
}
