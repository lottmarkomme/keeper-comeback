import { describe, expect, it } from 'vitest'
import { anchorBenchmark, buildSchedule, cyclePositionForDate, cycleTemplates, evaluateReadiness } from './plan'

describe('8-day cycle', () => {
  it('maps the 15 September benchmark to completed day 1', () => {
    expect(cyclePositionForDate('2026-09-15').cycleDay).toBe(1)
    expect(anchorBenchmark.complete).toBe(true)
    expect(anchorBenchmark.workoutKey).toContain('hiit')
  })
  it('maps 16 September to recovery day 2', () => expect(cyclePositionForDate('2026-09-16').cycleDay).toBe(2))
  it('starts a new cycle on 23 September', () => expect(cyclePositionForDate('2026-09-23').cycleDay).toBe(1))
  it('postpones the current workout and all following cycle days', () => {
    const schedule = buildSchedule('2026-09-18', 3, ['2026-09-18'])
    expect(schedule[0].postponed).toBe(true)
    expect(schedule[0].day).toBe(3)
    expect(schedule[1].day).toBe(4)
  })
  it('keeps a rest day in every cycle', () => expect(cycleTemplates[6].kind).toBe('rest'))
  it('contains every supplied YouTube video id', () => {
    const ids = cycleTemplates.flatMap(day => [day.video?.id, day.alternativeVideo?.id]).filter(Boolean)
    expect(ids).toEqual(expect.arrayContaining(['1s_0rUUo0A0','lPKRiU9u_Hc','wUtrI5bnrUc','61mlOpBEnGc','ywVaPs9WbgM','2wYQhJdv2oI','fWptOzJI3Wc','DkTCcOY1o5M']))
    expect(cycleTemplates.filter(day => day.kind !== 'rest').every(day => day.video)).toBe(true)
  })
  it('explains reduced readiness transparently', () => {
    const result = evaluateReadiness({ sleep: 4, energy: 2, soreness: 9, fatigue: 7, pain: 2, backPain: 2, neckPain: 1, motivation: 4 }, cycleTemplates[3])
    expect(result.level).toBe('yellow')
    expect(result.explanation.length).toBeGreaterThan(20)
  })
})
