import type { Checkin, ExerciseProgress, MealLog, PrepLog, Profile, SupplementLog, WorkoutFeedback } from '../types'
import { anchorBenchmark } from './plan'

export const STORAGE = {
  onboarded: 'kc-onboarded-v2', checkins: 'kc-checkins-v2', feedback: 'kc-feedback-v2', postponed: 'kc-postponed-v2',
  meals: 'kc-meals-v2', prep: 'kc-prep-v2', shopping: 'kc-shopping-v2', profile: 'kc-profile-v2',
  exercises: 'kc-exercises-v2', supplements: 'kc-supplements-v2'
} as const

export function readLocal<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || '') as T } catch { return fallback }
}

export function writeLocal<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const defaultProfile: Profile = {
  age: 20, heightCm: 178, weightKg: 75, plantBased: true, vegan: false,
  equipment: { pullupBar: false, bands: false, dipBars: false, mat: true, none: true },
  hardDayCalories: '2.500–2.700', recoveryCalories: '2.300–2.500', proteinTarget: 140
}

export const defaultExercises: ExerciseProgress[] = [
  { key:'pushups', label:'Push-ups', unit:'Wdh.', current:0, record:0, nextStep:'Saubere erhöhte Push-ups → Boden' },
  { key:'pullups', label:'Pull-ups', unit:'Wdh.', current:0, record:0, nextStep:'Scapular Pulls → negative Pull-ups' },
  { key:'dips', label:'Dips', unit:'Wdh.', current:0, record:0, nextStep:'Bench Dips → parallele Dips' },
  { key:'squats', label:'Squats', unit:'Wdh.', current:0, record:0, nextStep:'Tempo Squats → Assisted Pistol Squat' },
  { key:'bulgarian', label:'Bulgarian Split Squats', unit:'Wdh.', current:0, record:0, nextStep:'Mehr Tiefe → kontrollierte Zusatzlast' },
  { key:'plank', label:'Plank', unit:'Sek.', current:0, record:0, nextStep:'60 Sek. sauber → Long-lever Plank' },
  { key:'hollow', label:'Hollow Hold', unit:'Sek.', current:0, record:0, nextStep:'Tuck Hold → vollständiger Hollow Hold' },
  { key:'lsit', label:'L-Sit', unit:'Sek.', current:0, record:0, nextStep:'Tuck Support Hold', advanced:true },
  { key:'handstand', label:'Handstand', unit:'Sek.', current:0, record:0, nextStep:'Wall Walk → Handstand an der Wand', advanced:true },
  { key:'pistol', label:'Pistol Squat', unit:'Wdh.', current:0, record:0, nextStep:'Box Pistol Squat', advanced:true }
]

export function initialFeedback(): WorkoutFeedback[] {
  const stored = readLocal<WorkoutFeedback[]>(STORAGE.feedback, [])
  return stored.some(item => item.date === anchorBenchmark.date && item.cycleDay === 1) ? stored : [anchorBenchmark, ...stored]
}

export type LocalData = {
  checkins: Record<string, Checkin>
  feedback: WorkoutFeedback[]
  postponed: string[]
  meals: MealLog[]
  prep: PrepLog[]
  shopping: Record<string, boolean>
  profile: Profile
  exercises: ExerciseProgress[]
  supplements: SupplementLog[]
}
