import { useRef, useState, type KeyboardEvent } from 'react'

const STEPS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

// tabs that follow the WAI-ARIA pattern: arrow keys, Home/End, roving tabindex
export function useTabs(idPrefix: string, count: number, orientation: 'horizontal' | 'vertical' = 'horizontal') {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number) => {
    setActive(i)
    refs.current[i]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      select(e.key === 'Home' ? 0 : count - 1)
      return
    }
    const step = STEPS[e.key]
    if (!step) return
    e.preventDefault()
    select((active + step + count) % count)
  }

  const listProps = { role: 'tablist' as const, 'aria-orientation': orientation }

  const tabProps = (i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      refs.current[i] = el
    },
    id: `${idPrefix}-tab-${i}`,
    type: 'button' as const,
    role: 'tab' as const,
    'aria-selected': i === active,
    'aria-controls': `${idPrefix}-panel-${i}`,
    tabIndex: i === active ? 0 : -1,
    onClick: () => setActive(i),
    onKeyDown,
  })

  const panelProps = (i: number) => ({
    id: `${idPrefix}-panel-${i}`,
    role: 'tabpanel' as const,
    'aria-labelledby': `${idPrefix}-tab-${i}`,
    hidden: i !== active,
    tabIndex: 0,
  })

  return { active, listProps, tabProps, panelProps }
}
