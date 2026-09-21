import { experience, type Job } from '../data/resume'
import { useTabs } from '../hooks/useTabs'
import { CalendarIcon, MapPinIcon } from './Icons'
import SectionTitle from './SectionTitle'
import Sparkles from './Sparkles'

type Employer = { company: string; short: string; jobs: Job[] }

function groupByEmployer(jobs: Job[]) {
  const employers: Employer[] = []
  for (const job of jobs) {
    const existing = employers.find((e) => e.company === job.company)
    if (existing) existing.jobs.push(job)
    else employers.push({ company: job.company, short: job.short, jobs: [job] })
  }
  return employers
}

const employers = groupByEmployer(experience)

const sparkles = [
  { top: '4%', left: '70%', size: 14, cross: true },
  { top: '8%', left: '88%', size: 10 },
  { top: '90%', left: '6%', size: 12, cross: true },
]

export default function Experience() {
  const tabs = useTabs('experience', employers.length, 'vertical')

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative scroll-mt-16 py-20">
      <Sparkles items={sparkles} />
      <div className="relative mx-auto max-w-5xl px-5">
        <SectionTitle id="experience-title" command="cat ~/experience.md">
          experience
        </SectionTitle>

        <div className="mt-10 grid gap-6 md:grid-cols-[11rem_1fr] md:gap-8">
          <div {...tabs.listProps} aria-label="Employers" className="exp-tabs self-start">
            {employers.map((employer, i) => (
              <button key={employer.company} {...tabs.tabProps(i)} className="exp-tab">
                {employer.short}
              </button>
            ))}
          </div>

          {employers.map((employer, i) => (
            <div key={employer.company} {...tabs.panelProps(i)} className="card p-6 sm:p-8">
              {employer.jobs.map((job) => (
                <article key={`${job.title}-${job.dates}`} className="exp-role">
                  <h3 className="text-xl font-semibold tracking-tight text-heading sm:text-2xl">
                    {job.title} <span className="text-accent">@ {employer.company}</span>
                  </h3>
                  <p className="exp-meta mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarIcon width={14} height={14} />
                      {job.dates}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon width={14} height={14} />
                      {job.location}
                    </span>
                  </p>
                  <ul className="tri-list mt-4">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
