import { asset, toolbox } from '../data/resume'
import { useTabs } from '../hooks/useTabs'
import SectionTitle from './SectionTitle'

export default function Toolbox() {
  const tabs = useTabs('toolbox', toolbox.length)

  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="relative scroll-mt-16 py-20">
      <div className="relative mx-auto max-w-5xl px-5">
        <SectionTitle id="toolbox-title" command="ls ~/toolbox">
          toolbox
        </SectionTitle>

        <div {...tabs.listProps} aria-label="Skill categories" className="mt-10 flex flex-wrap gap-3">
          {toolbox.map((group, i) => (
            <button key={group.id} {...tabs.tabProps(i)} className="retro-tab">
              {group.label}
            </button>
          ))}
        </div>

        {toolbox.map((group, i) => (
          <div key={group.id} {...tabs.panelProps(i)} className="mt-6 rounded-xl">
            <fieldset className="box">
              <legend>~/toolbox/{group.id}</legend>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                {group.items.map((skill) => (
                  <li key={skill.name} className="tool-chip">
                    <span className="tool-icon" aria-hidden="true">
                      {skill.icon ? (
                        <img src={asset(`icons/${skill.icon}.svg`)} alt="" />
                      ) : (
                        <span className="tool-abbr">{skill.abbr ?? skill.name.slice(0, 3)}</span>
                      )}
                    </span>
                    <span className="tool-name">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        ))}
      </div>
    </section>
  )
}
