import { describe, expect, it } from 'vitest'
import { breakfastForCycleDay, nutritionDays } from './nutrition'

describe('nutrition seed', () => {
  it('contains all eight cycle days', () => expect(nutritionDays).toHaveLength(8))
  it('contains real meals for every day', () => nutritionDays.forEach(day => expect(day.meals.length).toBeGreaterThanOrEqual(4)))
  it('has an overnight breakfast on every day', () => {
    for (let day = 1; day <= 8; day++) expect(breakfastForCycleDay(day).overnight).toBe(true)
  })
})
