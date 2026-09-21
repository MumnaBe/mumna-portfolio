import { useState } from 'react'
import { projects, type Project } from '../data/resume'
import { CloseIcon, GitHubIcon, LockIcon } from './Icons'
import Modal from './Modal'
import PixelIcon from './PixelIcon'
import SectionTitle from './SectionTitle'
import Sparkles from './Sparkles'

function ProjectCard({ project, onDetails }: { project: Project; onDetails: () => void }) {
  return (
    <article className="card card-lift project-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <PixelIcon name={project.icon} className="pixel-tile" />
        {project.code ? (
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link relative z-10"
            aria-label={`${project.title} source code on GitHub`}
            title="Source code"
          >
            <GitHubIcon width={18} height={18} />
          </a>
        ) : (
          <span className="icon-link is-muted relative z-10" title="Proprietary work: source code isn't public">
            <LockIcon width={16} height={16} />
            <span className="sr-only">Source code is private</span>
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ink">
        <button type="button" className="stretched text-left" onClick={onDetails} aria-haspopup="dialog">
          {project.title}
        </button>
      </h3>
      <p className="mt-1 font-mono text-[0.7rem] tracking-wider text-muted uppercase">{project.org}</p>
      <p className="mt-3 text-sm leading-relaxed text-body">{project.summary}</p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <p className="font-mono text-[0.72rem] leading-relaxed text-muted">{project.tags.join(' · ')}</p>
        <span className="card-more" aria-hidden="true">
          details →
        </span>
      </div>
    </article>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Modal open={project !== null} onClose={onClose} labelledBy="project-dialog-title">
      {project && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <PixelIcon name={project.icon} className="pixel-tile" />
              <div>
                <h3 id="project-dialog-title" className="text-xl font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-[0.7rem] tracking-wider text-muted uppercase">{project.org}</p>
              </div>
            </div>
            <button type="button" className="circle-btn shrink-0" onClick={onClose} aria-label="Close details">
              <CloseIcon />
            </button>
          </div>
          <ul className="tri-list mt-6">
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag} className="pill">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  )
}

const sparkles = [
  { top: '8%', left: '82%', size: 14, cross: true },
  { top: '14%', left: '94%', size: 10 },
  { top: '92%', left: '10%', size: 12 },
  { top: '86%', left: '90%', size: 16, cross: true },
]

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative scroll-mt-16 py-20">
      <div className="section-haze" aria-hidden="true" />
      <Sparkles items={sparkles} />

      <div className="relative mx-auto max-w-5xl px-5">
        <SectionTitle id="projects-title" command="ls ~/projects">
          projects
        </SectionTitle>
        <p className="mt-5 max-w-2xl text-body">A few of the systems I've helped build. Pick a card for the full story.</p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} onDetails={() => setSelected(project)} />
            </li>
          ))}
        </ul>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
