import { describe, expect, it } from 'vitest'
import { adaptWorkout, makeWeek } from './plan'

describe('adaptive plan', () => {
  it('never exceeds the initial 45 minute limit', () => {
    expect(Math.max(...makeWeek(8, 1).map(day => day.minutes))).toBeLessThanOrEqual(45)
  })

  it('replaces training with recovery on high pain', () => {
    const result = adaptWorkout(makeWeek()[0], { energy: 4, sleep: 4, soreness: 2, backPain: 8, neckPain: 1 })
    expect(result.workout.title).toBe('Aktive Pause')
  })

  it('reduces volume on low energy', () => {
    const workout = makeWeek()[0]
    const result = adaptWorkout(workout, { energy: 1, sleep: 4, soreness: 2, backPain: 1, neckPain: 1 })
    expect(result.workout.minutes).toBeLessThan(workout.minutes)
  })
})
