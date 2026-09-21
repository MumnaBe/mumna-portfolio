import { profile } from '../data/resume'
import { ArrowUpIcon } from './Icons'
import { socialLinks } from './socialLinks'

export default function Footer() {
  return (
    <footer className="relative pt-4 pb-8">
      <div className="mx-auto max-w-5xl px-5">
        <fieldset className="box">
          <legend>cat ~/links.md</legend>
          <ul className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a href={href} className="retro-tab" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Icon width={15} height={15} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </fieldset>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
          <p>
            Designed &amp; built by {profile.name} · © {new Date().getFullYear()}
          </p>
          <a href="#top" className="text-link text-sm">
            back to top <ArrowUpIcon width={14} height={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
