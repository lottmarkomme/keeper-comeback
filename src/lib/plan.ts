import type { Checkin, CycleTemplate, EquipmentKey, ScheduledDay, TrafficLight, WorkoutFeedback } from '../types'

export const CYCLE_ANCHOR = '2026-09-15'

export const cycleTemplates: CycleTemplate[] = [
  {
    day: 1, kind: 'hiit', emoji: '🔥', title: '50 Min Full Body HIIT', shortTitle: 'HIIT Full Body', minutes: 50, intensity: '8–9/10',
    video: { id: '1s_0rUUo0A0', title: '50 Min Full Body HIIT', channel: 'YouTube Workout', minutes: 50, intensity: 'Fortgeschritten', equipment: 'Keine Ausrüstung', goals: ['Ausdauer', 'Ganzkörperbelastung', 'Kraftausdauer', 'Kondition'] }
  },
  {
    day: 2, kind: 'recovery', emoji: '🧘', title: 'Recovery + Full Body Mobility', shortTitle: 'Recovery + Mobility', minutes: 20, intensity: '2–3/10',
    video: { id: 'lPKRiU9u_Hc', title: '20 Minute Full Body Flexibility Routine', channel: 'Tom Merrick', minutes: 20, intensity: 'Leicht', equipment: 'Matte optional', goals: ['Wirbelsäule', 'Hüfte', 'Hamstrings', 'Schultern', 'Brustwirbelsäule'] },
    recoveryNote: 'Optional 30–60 Minuten entspannt spazieren. Du sollst dich danach besser fühlen als vorher.'
  },
  {
    day: 3, kind: 'upper', emoji: '💪', title: 'Calisthenics Upper Body', shortTitle: 'Upper Body', minutes: 30, intensity: '7–8/10',
    video: { id: 'wUtrI5bnrUc', title: '30 Min Upper Body Calisthenics / Bodyweight', channel: 'YouTube Workout', minutes: 30, intensity: 'Mittel', equipment: 'Keine Ausrüstung', goals: ['Brust', 'Schultern', 'Trizeps', 'oberer Rücken', 'Core'] },
    alternativeVideo: { id: '61mlOpBEnGc', title: '20 Min Upper Body Calisthenics with Pull Up Bar', channel: 'Tom Peto Training', minutes: 20, intensity: 'Mittel', equipment: 'Klimmzugstange', goals: ['Pull-ups', 'Push', 'Rücken', 'Core'] }
  },
  {
    day: 4, kind: 'legs', emoji: '🦵', title: 'Calisthenics Legs + Core', shortTitle: 'Legs + Core', minutes: 30, intensity: '7–8/10',
    video: { id: 'ywVaPs9WbgM', title: 'Calisthenics Leg Workout – Follow Along', channel: 'THENX', minutes: 30, intensity: 'Mittel–hoch', equipment: 'Keine Ausrüstung', goals: ['Quadrizeps', 'Hamstrings', 'Gesäß', 'Waden', 'Stabilität', 'Explosivität'] }
  },
  {
    day: 5, kind: 'recovery', emoji: '🌿', title: 'Recovery / Mobility', shortTitle: 'Recovery', minutes: 20, intensity: '1–3/10',
    video: { id: '2wYQhJdv2oI', title: '20 Minute Full Body Flexibility Routine V3', channel: 'Tom Merrick', minutes: 20, intensity: 'Sehr leicht', equipment: 'Matte optional', goals: ['Beweglichkeit', 'Spannung lösen', 'aktive Erholung'] },
    recoveryNote: 'Alternativ sind 30–60 Minuten Spazierengehen, sehr leichte Mobility oder eine vollständige Pause richtig.'
  },
  {
    day: 6, kind: 'fullbody', emoji: '🤸', title: 'Calisthenics Full Body', shortTitle: 'Full Body', minutes: 30, intensity: '7–8/10',
    video: { id: 'fWptOzJI3Wc', title: '30 Min Full Body Calisthenics Workout at Home', channel: 'Tom Peto Training', minutes: 30, intensity: 'Mittel–hoch', equipment: 'Keine Ausrüstung', goals: ['Push', 'Legs', 'Rücken/Posture', 'Core', 'Schulterkraft'] }
  },
  {
    day: 7, kind: 'rest', emoji: '😴', title: 'Vollständiger Rest Day', shortTitle: 'Rest Day', minutes: 0, intensity: '0–1/10',
    recoveryNote: 'Heute ist Regeneration Training. Kein schlechtes Gewissen, kein HIIT und kein Leistungsziel. Schlaf, Ernährung und Flüssigkeit sind heute dein Training.'
  },
  {
    day: 8, kind: 'light', emoji: '🚶', title: 'Mobility + leichtes Cardio', shortTitle: 'Mobility + Cardio', minutes: 20, intensity: '2–4/10',
    video: { id: 'DkTCcOY1o5M', title: '20 Min Low Impact Cardio – No Jumping', channel: 'YouTube Workout', minutes: 20, intensity: 'Leicht', equipment: 'Keine Ausrüstung', goals: ['lockere Kondition', 'Durchblutung', 'Vorbereitung auf HIIT'] },
    alternativeVideo: { id: '2wYQhJdv2oI', title: '20 Minute Full Body Flexibility Routine V3', channel: 'Tom Merrick', minutes: 20, intensity: 'Sehr leicht', equipment: 'Matte optional', goals: ['Mobility', 'Regeneration'] }
  }
]

export const anchorBenchmark: WorkoutFeedback = {
  date: CYCLE_ANCHOR, cycleDay: 1, workoutKey: 'cycle-1-hiit', complete: true, minutes: 50, intensity: 9,
  notes: 'Vollständig beendet; gegen Ende einzelne Übungen vor Ablauf des Intervalls beendet.', benchmark: true
}

export function parseLocalDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day, 12)
}

export function localIso(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function addDays(iso: string, amount: number) {
  const date = parseLocalDate(iso)
  date.setDate(date.getDate() + amount)
  return localIso(date)
}

export function daysBetween(fromIso: string, toIso: string) {
  return Math.round((parseLocalDate(toIso).getTime() - parseLocalDate(fromIso).getTime()) / 86400000)
}

export function cyclePositionForDate(dateIso: string, postponedDates: string[] = []) {
  const elapsed = daysBetween(CYCLE_ANCHOR, dateIso)
  if (elapsed < 0) return { cycleDay: 1, cycleNumber: 0, postponed: false }
  const delays = postponedDates.filter(item => item <= dateIso).length
  const adjusted = Math.max(0, elapsed - delays)
  return { cycleDay: (adjusted % 8) + 1, cycleNumber: Math.floor(adjusted / 8) + 1, postponed: postponedDates.includes(dateIso) }
}

export function buildSchedule(fromIso: string, amount: number, postponedDates: string[] = [], feedback: WorkoutFeedback[] = []): ScheduledDay[] {
  return Array.from({ length: amount }, (_, offset) => {
    const date = addDays(fromIso, offset)
    const position = cyclePositionForDate(date, postponedDates)
    const template = cycleTemplates[position.cycleDay - 1]
    return { ...template, date, postponed: position.postponed, completed: feedback.some(item => item.date === date && item.complete), isToday: date === localIso() }
  })
}

export function getVideoForEquipment(template: CycleTemplate, equipment: Record<EquipmentKey, boolean>) {
  if (template.day === 3 && equipment.pullupBar && template.alternativeVideo) return template.alternativeVideo
  return template.video
}

export function evaluateReadiness(checkin: Checkin, template: CycleTemplate): { level: TrafficLight; title: string; explanation: string } {
  const maxPain = Math.max(checkin.pain, checkin.backPain, checkin.neckPain)
  if (maxPain >= 7 || checkin.energy <= 1 || checkin.sleep <= 1 || checkin.fatigue >= 8) {
    return {
      level: 'red', title: 'Heute Regeneration priorisieren',
      explanation: template.kind === 'legs' && checkin.soreness >= 7
        ? 'Deine Beine sind noch stark ermüdet. Verschiebe den Leg Day, damit die Reihenfolge erhalten bleibt und du sauber trainieren kannst.'
        : 'Deine Angaben sprechen heute gegen eine harte Einheit. Verschieben ist kein verlorenes Training – der ganze Zyklus rückt sinnvoll weiter.'
    }
  }
  if (maxPain >= 4 || checkin.energy <= 2 || checkin.sleep <= 2 || checkin.soreness >= 7 || checkin.fatigue >= 6 || checkin.motivation <= 2) {
    return { level: 'yellow', title: 'Training reduziert durchführen', explanation: 'Nutze leichtere Varianten, längere Pausen und ungefähr 70 % des normalen Umfangs. Technik bleibt wichtiger als Tempo.' }
  }
  return { level: 'green', title: 'Bereit für die geplante Einheit', explanation: 'Deine Angaben passen zum heutigen Training. Halte dich an die Zielintensität und beende Sätze, bevor die Technik zerfällt.' }
}

export function canPostpone(template: CycleTemplate) {
  return !['rest', 'recovery'].includes(template.kind)
}
