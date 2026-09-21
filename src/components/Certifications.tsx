import { useState } from 'react'
import { certifications, type Credential } from '../data/resume'
import Badge from './Badge'
import SectionTitle from './SectionTitle'

function CredentialBadge({ credential }: { credential: Credential }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (!credential.image || imageFailed) {
    return <Badge label={credential.badge} sub={credential.badgeSub} tone="dark" className="h-36 w-auto drop-shadow-md" />
  }

  return (
    <img
      src={credential.image}
      alt=""
      className="h-36 w-auto drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-2"
      onError={() => setImageFailed(true)}
    />
  )
}

export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="relative scroll-mt-24 pb-20">
      <div className="relative mx-auto max-w-5xl px-5">
        <SectionTitle id="certifications-title" command="ls ~/certifications">
          certifications
        </SectionTitle>

        <ul className="mt-12 flex flex-wrap justify-center gap-x-16 gap-y-12">
          {certifications.map((credential) => (
            <li key={credential.name} className="group flex max-w-xs flex-col items-center text-center">
              <CredentialBadge credential={credential} />
              <h3 className="mt-5 font-semibold text-heading">
                {credential.program}: {credential.name}
              </h3>
              <p className="mt-1 text-sm text-body">
                {credential.issuer} · {credential.earned}
              </p>
              {credential.url && (
                <a
                  href={credential.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link mt-3 text-xs"
                  aria-label={`Verify ${credential.program}: ${credential.name} on Microsoft Learn`}
                >
                  verify credential ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
