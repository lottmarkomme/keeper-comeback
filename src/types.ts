export type Exercise = {
  name: string
  detail: string
  dose: string
  category: 'warmup' | 'strength' | 'cardio' | 'keeper' | 'mobility' | 'recovery'
}

export type Workout = {
  key: string
  day: string
  title: string
  subtitle: string
  minutes: number
  intensity: 'Leicht' | 'Moderat'
  focus: string
  exercises: Exercise[]
}

export type Checkin = {
  energy: number
  sleep: number
  soreness: number
  backPain: number
  neckPain: number
}

export type Completion = {
  date: string
  workoutKey: string
  minutes: number
  effort: number
}
