import { profile } from '../data/resume'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export const socialLinks = [
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: 'GitHub', href: profile.github, Icon: GitHubIcon, external: true },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon, external: true },
]
