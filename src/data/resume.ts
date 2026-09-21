import type { SpriteName } from '../components/pixelArt'

const base = import.meta.env.BASE_URL
export const asset = (path: string) => `${base}${path.replace(/^\//, '')}`

export const profile = {
  name: 'Mumna Begum',
  firstName: 'Mumna',
  initials: 'MB',
  handle: 'mumna', // shows up in the navbar logo as mumna@mtl:~$
  host: 'mtl',
  roles: ['Power Platform Developer', 'Software Developer', 'Full-Stack Developer'],
  note: '(based in Montréal, Québec)',
  email: 'mumnabegum@gmail.com',
  github: 'https://github.com/MumnaBe',
  linkedin: 'https://linkedin.com/in/mumnabegum',
  photo: asset('photo.jpg'),
}

export const about = {
  greeting: 'Hi!',
  photoAlt: 'Mumna Begum',
  paragraphs: [
    "I’m a Computer Science graduate from Concordia University and currently work as a software developer. Most of my time is spent building software, solving problems, and learning new technologies.",
    'When I’m not coding, you’ll probably find me running, hiking, reading, spending time with family and friends, or hanging out with my cat. Feel free to connect with me on LinkedIn!',
  
  
  ],
  techIntro: "Lately I've been working with:",
  tech: ['Java', 'Javascript', 'Power Pages', 'Dataverse', 'C# & .NET', 'Node.js'],
}

export const navLinks = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'toolbox', label: 'toolbox' },
  { id: 'certifications', label: 'certs' },
] as const

export const navIds = navLinks.map((link) => link.id)

export type Project = {
  title: string
  org: string
  icon: SpriteName
  summary: string
  tags: string[]
  details: string[]
  code?: string // government work is closed source, so most of these have no link
}

export const projects: Project[] = [
  {
    title: 'SafePort Portals',
    org: 'Health Canada · SafePort',
    icon: 'ship',
    summary:
      'Three public-facing Power Pages portals for ship sanitation inspections, gastrointestinal illness reports, and cruise ship inspection scores, backed by a Dynamics 365 model-driven app.',
    tags: ['Power Pages', 'Dataverse', 'Dynamics 365', 'C#', 'Liquid', 'JavaScript', 'WCAG 2.x'],
    details: [
      'Sole portal developer since March 2026, working through roughly 150 stories and defects across the three portals in parallel with Maritime Declaration of Health work.',
      'Independently led the production release of 2 Power Pages portals after the initial go-live, deploying solutions across development, test, and production.',
      'Building the Cruise Ship Inspection Scores portal for an upcoming release.',
      'Fixed portal-to-Dataverse data issues (missing or mismatched submissions, wrong notification recipients) and added validation for IMO numbers, dates, and numeric fields.',
      'Resolved around 40 WCAG 2.x audit findings: screen reader announcements, ARIA labels, error summaries, focus contrast, reflow, and session timeouts.',
    ],
  },
  {
    title: 'Maritime Declaration of Health',
    org: 'Health Canada · QCMS',
    icon: 'anchor',
    summary:
      'Two public-facing Power Pages portals used to declare health conditions before arriving in Canada, feeding a Dynamics 365 app.',
    tags: ['Power Pages', 'Dataverse', 'Dynamics 365', 'Power Automate', 'Liquid', 'jQuery','JavaScript', 'WCAG 2.x'],
    details: [
      'Maintained and extended the Maritime Declaration of Health portal and its Annex feeding the QCMS Dynamics 365 app.',
      'Built API-based filtering and client-side logic with Liquid, JavaScript, and jQuery, and troubleshot validations, session timeouts, and data relationships.',
      'Configured security roles, business rules, and solution deployments, and delivered 25+ bilingual translation updates.',
    ],
  },
  {
    title: 'Digital Immunization Record',
    org: 'Health Canada · PDIR',
    icon: 'syringe',
    summary:
      'Backend and front-end work on the Pan-Canadian Digital Immunization Record — SMART Health Card QR codes and accessible bilingual PDFs generated from vaccination data.',
    tags: ['TypeScript', 'Node.js', 'Express', 'React', 'PDFKit', 'SMART Health Cards', 'Swagger'],
    details: [
      'Built PDF generation for Issuer-in-a-Box, a TypeScript/Node.js service producing bilingual, screen-reader-accessible immunization records with multi-page tables, pagination, and QR layouts.',
      'Migrated vaccine coding from CVX to SNOMED and made generation fault-tolerant, so an invalid or missing code renders as "Unspecified" instead of rejecting the whole record.',
      'Removed the QR chunking that made split codes unreadable and capped events per disease, so every code scans on the first try.',
      'Led development and testing across 5 repositories, ran sprint planning, reviewed pull requests, and onboarded new developers.',
    ],
  },
  {
    title: 'PDIR Verifier',
    org: 'Health Canada · open source',
    icon: 'qr',
    summary:
      'The public tool that scans a SMART Health Card QR code — from a camera or an uploaded file — and tells you whether the immunization record inside it is valid.',
    tags: ['React', 'TypeScript', 'JavaScript', 'GitHub Actions', 'QR', 'Accessibility'],
    details: [
      'Top contributor to the repo, working on the camera QR scanner, file upload, and the record viewer and validation screens.',
      'Worked through ~25 rounds of reviewer feedback over three months, from scanner edge cases to wording and layout fixes.',
      'One of the few pieces of my government work that is open source, so the code is actually readable.',
    ],
    code: 'https://github.com/hc-sc/PHAC-PDIR-verifier',
  },
  {
    title: 'E-Cert & Internal CRM',
    org: 'Canadian Food Inspection Agency',
    icon: 'folder',
    summary:
      'Features, fixes, and data migration for the E-Cert export certification system and other internal Dynamics 365 applications.',
    tags: ['C#', 'JavaScript', 'Dynamics 365', 'SSIS', 'XrmToolBox', 'Azure DevOps'],
    details: [
      'Delivered features and fixes for the E-Cert export certification system on Dynamics 365, including C# and JavaScript plug-ins for server-side business logic.',
      'Automated bulk data loads with SSIS and moved configuration between environments with the Configuration Migration tool.',
      'Used XrmToolBox for data migration, configuration management, and bilingual translations.',
      'Started here as a QA analyst intern: test suites for two national inspection systems, defects tracked in Azure DevOps.',
    ],
  },
]

export type Job = {
  title: string
  company: string
  short: string // label on the experience tab
  dates: string
  location: string
  bullets: string[]
}

export const experience: Job[] = [
  {
    title: 'Software Developer',
    company: 'Health Canada',
    short: 'Health Canada',
    dates: 'June 2025 - Present',
    location: 'Montréal, QC',
    bullets: [
      "Sole portal developer since March 2026 on the SafePort project's 3 public portals (Gastrointestinal Illness Report, Ship Sanitation Inspection, Cruise Ship Inspection Scores), delivered in parallel with Maritime Declaration of Health work — roughly 150 stories and defects.",
      'Independently led the production release of 2 Power Pages portals after the initial go-live, deploying solutions across development, test, and production environments.',
      'Building the Cruise Ship Inspection Scores portal for an upcoming release, including product owner feedback, translations, and inspection filters.',
      'Fixed portal-to-Dataverse data issues (missing or mismatched submissions, wrong notification recipients), added validation for IMO numbers, dates, and numeric fields, and configured security roles.',
      'Resolved around 40 WCAG 2.x accessibility audit findings — screen reader announcements, ARIA labels, error summaries, focus contrast, reflow, session timeouts — testing with NVDA and VoiceOver.',
      'Mentor 2 interns and present sprint review demos to clients and the scrum team.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Health Canada',
    short: 'Health Canada',
    dates: 'August 2024 - June 2025',
    location: 'Montréal, QC',
    bullets: [
      'Built PDF generation for Issuer-in-a-Box, a TypeScript/Node.js service producing bilingual, screen-reader-accessible SMART Health Card immunization records with dynamic multi-page tables, pagination, and QR code layouts.',
      'Migrated vaccine coding from CVX to SNOMED and made record generation fault-tolerant, so invalid or missing codes render as "Unspecified" instead of rejecting the whole record; updated regex schemas and unit tests.',
      'Top contributor to the open-source PDIR Verifier (React): built camera QR scanning, and file upload.',
      'Led development and testing for PDIR across 5 repositories (TypeScript, Node.js, JavaScript); ran sprint planning, reviewed pull requests, and onboarded new developers.',
      'Completed 70 user stories in 10 months; demoed to the F/P/T Digital Health Technical Committee (~300 attendees), directors, and PHAC policy clients.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'Canadian Food Inspection Agency',
    short: 'CFIA',
    dates: 'May 2023 - April 2024',
    location: 'Montréal, QC',
    bullets: [
      'Delivered features and fixes for the E-Cert export certification system on Microsoft Dynamics 365, including C# and JavaScript plug-ins for server-side business logic.',
      'Automated bulk data loads with SSIS, migrated configuration between environments with the Configuration Migration tool, and used XrmToolBox for data migration and bilingual translations.',
      'Worked in an Agile team, contributing to sprint goals and continuous improvement.',
    ],
  },
  {
    title: 'QA Analyst Intern',
    company: 'Canadian Food Inspection Agency',
    short: 'CFIA',
    dates: 'Sept 2022 - April 2023',
    location: 'Montréal, QC',
    bullets: [
      'Developed and executed test suites for two national inspection systems, verifying functionality, accessibility, and performance against business requirements.',
      'Reported and tracked defects in Azure DevOps, working with developers through resolution and raising testing blockers in scrum sessions.',
    ],
  },
]

export type Skill = {
  name: string
  icon?: string // file name (without .svg) in public/icons
  abbr?: string // shown instead when there is no icon
}

export type ToolGroup = { id: string; label: string; items: Skill[] }

export const toolbox: ToolGroup[] = [
  {
    id: 'power-platform',
    label: 'Power Platform',
    items: [
      { name: 'Power Pages', abbr: 'PP' },
      { name: 'Power Apps', abbr: 'PA' },
      { name: 'Power Automate', abbr: 'Flow' },
      { name: 'Dataverse', abbr: 'DV' },
      { name: 'Dynamics 365', abbr: 'D365' },
      { name: 'XrmToolBox', abbr: 'Xrm' },
      { name: 'Liquid', abbr: '{{ }}' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'C#', icon: 'csharp' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Java', icon: 'java' },
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'mysql' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    items: [
      { name: '.NET', icon: 'dot-net' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'React', icon: 'react' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'jQuery', icon: 'jquery' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Azure DevOps', icon: 'azuredevops' },
      { name: 'Swagger', icon: 'swagger' },
      { name: 'Figma', icon: 'figma' },
      { name: 'SSIS', abbr: 'SSIS' },
    ],
  },
  {
    id: 'web',
    label: 'Web',
    items: [
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'WCAG 2.x', abbr: 'a11y' },
      { name: 'WET-BOEW', abbr: 'WET' },
    ],
  },
]

export type Credential = {
  program: string
  name: string
  issuer: string
  earned: string
  credentialId?: string
  url?: string
  image?: string // official badge art; falls back to the drawn <Badge /> when missing
  badge: string
  badgeSub: string
}

export const certifications: Credential[] = [
  {
    program: 'Microsoft Certified',
    name: 'Power Platform Functional Consultant Associate',
    issuer: 'Microsoft',
    earned: 'August 2026',
    credentialId: '223586CDA42BBCB7',
    url: 'https://learn.microsoft.com/en-us/users/begummumnahcsc-1049/credentials/223586cda42bbcb7',
    image: asset('badges/microsoft-certified-associate.svg'),
    badge: 'ASSOCIATE',
    badgeSub: 'MICROSOFT',
  },
]

// the ~/random.md extras under the about section. an empty list just hides its tab.

export type Trophy = { title: string; detail: string; color: string }
export type Place = { city: string; country: string; status: 'home' | 'visited' | 'bucket' }

export type RandomFiles = {
  motto?: { text: string; source?: string }
  wins: Trophy[]
  travel: Place[]
}

export const random: RandomFiles = {
  wins: [
    { title: 'microsoft certified', detail: '2026 · pl-200 power platform', color: '#8fb3e8' },
    { title: 'software developer', detail: '2024 · joined health canada', color: '#e79bb0' },
    { title: "bachelor's degree", detail: '2024 · computer science, concordia', color: '#9fd3b3' },
    { title: 'first dev internship', detail: '2023 · canadian food inspection agency', color: '#bba6e6' },
    { title: 'first tech job', detail: '2022 · qa analyst intern, cfia', color: '#f2ab80' },
    { title: 'dec', detail: '2021 · pure & applied sciences, vanier', color: '#e8c46e' },
  ],
  travel: [],
}
