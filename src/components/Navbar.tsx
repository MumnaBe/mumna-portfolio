import { useEffect, useState } from 'react'
import { navIds, navLinks, profile } from '../data/resume'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons'
import { socialLinks } from './socialLinks'

type Props = { theme: Theme; onToggleTheme: () => void }

export default function Navbar({ theme, onToggleTheme }: Props) {
  const active = useActiveSection(navIds)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const themeLabel = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
  const ThemeIcon = theme === 'dark' ? MoonIcon : SunIcon

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="prompt-logo" aria-label={`${profile.name}, back to top`}>
          <span aria-hidden="true">
            <span className="text-accent">{profile.handle}</span>
            <span className="text-muted">@{profile.host}</span>
            <span className="text-body">:~$</span>
          </span>
          <span className="caret" aria-hidden="true" />
        </a>

        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={`nav-link ${active === link.id ? 'is-active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="hidden h-5 w-px bg-line lg:block" aria-hidden="true" />
          <ul className="flex items-center">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <li key={label} className="hidden lg:block">
                <a
                  href={href}
                  className="icon-link"
                  aria-label={label}
                  title={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon width={17} height={17} />
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={onToggleTheme} aria-label={themeLabel} title={themeLabel} className="icon-link">
                <ThemeIcon width={18} height={18} />
              </button>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button type="button" onClick={onToggleTheme} aria-label={themeLabel} className="circle-btn">
            <ThemeIcon />
          </button>
          <button
            type="button"
            className="circle-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="mx-4 mb-3 rounded-2xl border border-line bg-surface p-2 font-mono shadow-lg md:hidden">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? 'location' : undefined}
                className={`block rounded-xl px-4 py-3 text-sm ${active === link.id ? 'bg-haze text-ink' : 'text-body'}`}
              >
                <span className="text-petal" aria-hidden="true">
                  ./
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
