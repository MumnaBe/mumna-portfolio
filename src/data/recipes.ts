// recipes.md — TODO: add the ones I actually make, not the ones I mean to make

export type Recipe = {
  title: string
  emoji: string
  time: string
  serves: string
  tags: string[]
  blurb?: string
  ingredients: string[]
  steps: string[]
  note?: string
}

export const recipes: Recipe[] = []
