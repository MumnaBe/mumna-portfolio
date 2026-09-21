import { useState } from 'react'
import { about, profile } from '../data/resume'
import RandomFiles from './RandomFiles'
import SectionTitle from './SectionTitle'

export default function About() {
  const [photoMissing, setPhotoMissing] = useState(false)

  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16 overflow-x-clip pt-16 pb-6">
      <div className="relative mx-auto max-w-5xl px-5">
        <SectionTitle id="about-title" command="cat ~/about-me.md">
          about me
        </SectionTitle>

        <div className="relative mt-12">
          <fieldset className="box px-5 pt-4 pb-7 sm:px-8">
            <legend>whoami</legend>
            <div className="grid gap-10 md:grid-cols-[1fr_16rem] md:items-center">
              <div className="space-y-4 leading-relaxed text-body">
                <p className="text-lg font-semibold text-ink">{about.greeting}</p>
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>{about.techIntro}</p>
                <ul className="tri-list grid grid-cols-2 gap-x-6 font-mono sm:grid-cols-3">
                  {about.tech.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  Want to chat? Find me on{' '}
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-link font-sans">
                    LinkedIn
                  </a>{' '}
                  or send me an{' '}
                  <a href={`mailto:${profile.email}`} className="text-link font-sans">
                    email
                  </a>
                  .
                </p>
              </div>

              <figure className="about-photo">
                <span className="tape" aria-hidden="true" />
                {photoMissing ? (
                  <div className="photo-fallback grid place-items-center bg-gradient-to-br from-[#f9d9e2] to-[#e2d6f0]" aria-hidden="true">
                    <span className="font-mono text-5xl font-bold text-[#b0677a]">{profile.initials}</span>
                  </div>
                ) : (
                  <img src={profile.photo} alt={about.photoAlt} onError={() => setPhotoMissing(true)} />
                )}
              </figure>
            </div>
          </fieldset>
        </div>

        <RandomFiles />
      </div>
    </section>
  )
}
