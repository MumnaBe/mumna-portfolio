import type { ReactNode } from 'react'

type Props = {
  id: string
  command: string // the little "$ cat ~/experience.md" line under the heading
  children: ReactNode
}

export default function SectionTitle({ id, command, children }: Props) {
  return (
    <div>
      <div className="section-heading-row">
        <h2 id={id} className="section-title">
          <span className="section-slash" aria-hidden="true">
            /
          </span>
          {children}
        </h2>
        <span className="section-rule" aria-hidden="true" />
      </div>
      <p className="section-command" aria-hidden="true">
        <span className="text-petal">$ </span>
        {command}
      </p>
    </div>
  )
}
