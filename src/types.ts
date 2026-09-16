export type CycleKind = 'hiit' | 'recovery' | 'upper' | 'legs' | 'fullbody' | 'rest' | 'light'
export type TrafficLight = 'green' | 'yellow' | 'red'
export type EquipmentKey = 'pullupBar' | 'bands' | 'dipBars' | 'mat' | 'none'

export type WorkoutVideo = {
  id: string
  title: string
  channel: string
  minutes: number
  intensity: string
  equipment: string
  goals: string[]
}

export type CycleTemplate = {
  day: number
  kind: CycleKind
  emoji: string
  title: string
  shortTitle: string
  minutes: number
  intensity: string
  video?: WorkoutVideo
  alternativeVideo?: WorkoutVideo
  recoveryNote?: string
}

export type ScheduledDay = CycleTemplate & {
  date: string
  postponed?: boolean
  completed?: boolean
  isToday?: boolean
}

export type Checkin = {
  energy: number
  sleep: number
  soreness: number
  fatigue: number
  pain: number
  backPain: number
  neckPain: number
  motivation: number
}

export type WorkoutFeedback = {
  date: string
  cycleDay: number
  workoutKey: string
  complete: boolean
  minutes: number
  intensity: number
  earlyStops?: number
  extraBreaks?: number
  legsFatigue?: number
  upperFatigue?: number
  conditioning?: number
  technique?: number
  kneeFeeling?: number
  stiffnessBefore?: number
  stiffnessAfter?: number
  notes?: string
  benchmark?: boolean
}

export type ExerciseProgress = {
  key: string
  label: string
  unit: 'Wdh.' | 'Sek.'
  current: number
  record: number
  previous?: number
  nextStep: string
  advanced?: boolean
}

export type Ingredient = {
  name: string
  amount: number
  unit: string
  category: ShoppingCategory
}

export type ShoppingCategory = 'produce' | 'carbs' | 'legumes' | 'protein' | 'soy' | 'nuts' | 'other'

export type Recipe = {
  id: string
  title: string
  meal: 'Frühstück' | 'Mittagessen' | 'Snack' | 'Abendessen' | 'Pre-Workout'
  kcal: number
  protein: number
  minutes: number
  mealPrep: boolean
  overnight?: boolean
  ingredients: Ingredient[]
  steps: string[]
  alternatives: string[]
  storage: string
  prepHint?: string
}

export type NutritionDay = {
  day: number
  title: string
  kcalRange: string
  proteinRange: string
  meals: Recipe[]
}

export type MealLog = { date: string; recipeId: string; eaten: boolean }
export type PrepLog = { date: string; recipeId: string; done: boolean }
export type ShoppingItem = Ingredient & { id: string; checked: boolean }

export type Profile = {
  age: number
  heightCm: number
  weightKg: number
  plantBased: boolean
  vegan: boolean
  equipment: Record<EquipmentKey, boolean>
  hardDayCalories: string
  recoveryCalories: string
  proteinTarget: number
}

export type SupplementLog = {
  date: string
  creatine: boolean
  proteinShake: boolean
}
