import { profile } from '../data/resume'
import ParticleCat from './ParticleCat'
import ScrambleText from './ScrambleText'
import Typewriter from './Typewriter'

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-x-clip pt-28 pb-4 sm:pt-32">
      <div className="hero-haze" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="title-glow text-4xl font-extrabold tracking-tight sm:text-5xl">
            <ScrambleText text={`Hi, I'm ${profile.firstName}`} />
          </h1>
          <p className="mt-5 text-sm font-semibold text-ink sm:text-base">
            I am a <Typewriter words={profile.roles} />
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="btn-outline" href={`mailto:${profile.email}`}>
              Contact <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="mt-7 text-sm italic text-muted">{profile.note}</p>
        </div>

        <ParticleCat className="justify-self-center md:justify-self-end" />
      </div>
    </section>
  )
}
