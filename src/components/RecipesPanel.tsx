import { useState } from 'react'
import { recipes, type Recipe } from '../data/recipes'
import { CloseIcon } from './Icons'
import Modal from './Modal'

function RecipeDetails({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(() => new Set())

  const toggle = (index: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="emoji-tile" aria-hidden="true">
            {recipe.emoji}
          </span>
          <div>
            <h3 id="recipe-title" className="text-xl font-semibold text-ink">
              {recipe.title}
            </h3>
            <p className="exp-meta mt-1">
              {recipe.time} · serves {recipe.serves}
            </p>
          </div>
        </div>
        <button type="button" className="circle-btn shrink-0" onClick={onClose} aria-label="Close recipe">
          <CloseIcon />
        </button>
      </div>

      {recipe.blurb && <p className="mt-4 text-body">{recipe.blurb}</p>}

      <div className="mt-6 grid gap-8 sm:grid-cols-[1fr_1.4fr]">
        <div>
          <h4 className="recipe-subhead">ingredients</h4>
          <ul className="mt-3 space-y-2">
            {recipe.ingredients.map((item, i) => (
              <li key={item}>
                <label className={`ingredient ${checked.has(i) ? 'is-checked' : ''}`}>
                  <input type="checkbox" checked={checked.has(i)} onChange={() => toggle(i)} />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="recipe-subhead">steps</h4>
          <ol className="recipe-steps mt-3">
            {recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {recipe.note && <p className="mt-6 font-hand text-xl text-accent">{recipe.note}</p>}
    </div>
  )
}

export default function RecipesPanel() {
  const [selected, setSelected] = useState<Recipe | null>(null)

  if (recipes.length === 0) {
    return (
      <div className="max-w-sm">
        <div className="recipe-card">
          <div className="recipe-card-head">
            <span>recipe no. 01</span>
            <span aria-hidden="true">🍳</span>
          </div>
          <p className="px-5 pt-3 pb-5 font-hand text-xl leading-7 text-[#4a4046]">nothing here yet... check back soon!</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {recipes.map((recipe, i) => (
          <li key={recipe.title}>
            <article className="recipe-card h-full">
              <div className="recipe-card-head">
                <span>recipe no. {String(i + 1).padStart(2, '0')}</span>
                <span aria-hidden="true">{recipe.emoji}</span>
              </div>
              <div className="flex flex-1 flex-col px-5 pt-1 pb-4">
                <h4 className="font-hand text-2xl leading-[56px] text-[#4a3a40]">
                  <button type="button" className="stretched text-left" onClick={() => setSelected(recipe)} aria-haspopup="dialog">
                    {recipe.title}
                  </button>
                </h4>
                <p className="font-mono text-[0.72rem] leading-7 text-[#7a6870]">
                  {recipe.time} · serves {recipe.serves}
                </p>
                {recipe.blurb && <p className="font-hand text-lg leading-7 text-[#4a4046]">{recipe.blurb}</p>}
                <p className="mt-auto pt-7 font-mono text-[0.7rem] leading-7 text-[#9b5d6b]">
                  {recipe.tags.map((tag) => `#${tag}`).join(' ')}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Modal open={selected !== null} onClose={() => setSelected(null)} labelledBy="recipe-title" className="modal-wide">
        {selected && <RecipeDetails recipe={selected} onClose={() => setSelected(null)} />}
      </Modal>
    </>
  )
}
