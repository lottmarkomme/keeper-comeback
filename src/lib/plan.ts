import type { Checkin, Exercise, Workout } from '../types'

const warmup: Exercise[] = [
  { name: 'Ruhige Nasenatmung', detail: 'Aufrecht stehen, Schultern locker. Vier Sekunden ein, sechs Sekunden aus.', dose: '2 Min.', category: 'warmup' },
  { name: 'Cat–Cow', detail: 'Im Vierfüßler die Wirbelsäule langsam runden und wieder lang werden lassen. Nie in Schmerz drücken.', dose: '8 Wiederholungen', category: 'mobility' },
  { name: 'World’s Greatest Stretch – sanft', detail: 'Großer Ausfallschritt, hinteres Knie bei Bedarf am Boden. Brustkorb nur so weit öffnen, wie es angenehm bleibt.', dose: '4 je Seite', category: 'mobility' }
]

const sessions: Omit<Workout, 'day'>[] = [
  {
    key: 'base-strength', title: 'Stabile Basis', subtitle: 'Ganzkörperkraft ohne Vollgas', minutes: 38, intensity: 'Moderat', focus: 'Kraft & Rückenfreundlichkeit',
    exercises: [...warmup,
      { name: 'Box Squat', detail: 'Kontrolliert auf einen Stuhl setzen, Füße fest in den Boden, wieder aufstehen. Rücken neutral.', dose: '3 × 8', category: 'strength' },
      { name: 'Erhöhte Liegestütze', detail: 'Hände auf Tisch oder Bank. Körper bleibt als Linie; Höhe so wählen, dass 2–3 Wiederholungen übrig wären.', dose: '3 × 6–10', category: 'strength' },
      { name: 'Bandrudern', detail: 'Band sicher befestigen. Ellenbogen nach hinten führen, Schulterblätter sanft zusammenziehen, Rippen unten lassen.', dose: '3 × 10', category: 'strength' },
      { name: 'Dead Bug', detail: 'Rückenlage, unteren Rücken sanft am Boden halten. Gegengleich Arm und Bein langsam strecken.', dose: '3 × 5 je Seite', category: 'strength' },
      { name: 'Child’s Pose mit Seitgriff', detail: 'Gesäß Richtung Fersen, Hände etwas nach rechts und links wandern. Nur angenehme Dehnung.', dose: '45 Sek. je Seite', category: 'mobility' }
    ]
  },
  {
    key: 'run-walk', title: 'Locker wieder laufen', subtitle: 'Laufen und Gehen im Wechsel', minutes: 35, intensity: 'Leicht', focus: 'Grundlagenausdauer',
    exercises: [
      { name: 'Zügiges Gehen', detail: 'Tempo langsam steigern, Arme locker mitschwingen.', dose: '6 Min.', category: 'warmup' },
      { name: 'Run–Walk', detail: 'Sehr locker laufen: Du solltest in ganzen Sätzen sprechen können. Bei Beschwerden sofort ins Gehen wechseln.', dose: '8 × (1 Min. Lauf + 2 Min. Gehen)', category: 'cardio' },
      { name: 'Ausgehen', detail: 'Tempo stufenweise senken und ruhig atmen.', dose: '5 Min.', category: 'recovery' }
    ]
  },
  {
    key: 'keeper-footwork', title: 'Keeper-Fundament', subtitle: 'Fußarbeit, Reaktion und sichere Landung', minutes: 36, intensity: 'Moderat', focus: 'Torwart & Athletik',
    exercises: [...warmup.slice(0, 2),
      { name: 'Set-Position Holds', detail: 'Füße etwas breiter als hüftbreit, Gewicht auf dem Vorfuß, Hände bereit. Ruhig und stabil bleiben.', dose: '5 × 20 Sek.', category: 'keeper' },
      { name: 'Lateral Shuffle + Set', detail: 'Drei kleine Schritte seitlich, sauber abbremsen und in Torwart-Grundstellung landen.', dose: '4 × 4 je Seite', category: 'keeper' },
      { name: 'Tennisball-Reaktion', detail: 'Ball gegen eine Wand werfen und nach einmaligem Aufprall fangen. Abstand klein halten.', dose: '4 × 45 Sek.', category: 'keeper' },
      { name: 'Knieende Seitlandung', detail: 'Aus Kniestand weich auf Unterarm, Hüfte und Seite abrollen. Erst Technik, keine Weite.', dose: '3 × 4 je Seite', category: 'keeper' },
      { name: 'Einbeinstand', detail: 'Knie leicht gebeugt, Becken gerade. Schwieriger: Ball langsam um den Körper führen.', dose: '3 × 30 Sek. je Seite', category: 'strength' }
    ]
  },
  {
    key: 'mobility-reset', title: 'Mobility Reset', subtitle: 'Bewegen, atmen, Spannung lösen', minutes: 24, intensity: 'Leicht', focus: 'Yoga & Beweglichkeit',
    exercises: [
      { name: '90/90 Atmung', detail: 'Rückenlage, Unterschenkel auf einen Stuhl. Lang ausatmen und Rippen sinken lassen.', dose: '3 Min.', category: 'recovery' },
      { name: 'Beckenkippen', detail: 'In Rückenlage das Becken klein vor- und zurückrollen. Der Bewegungsweg bleibt schmerzfrei.', dose: '10 langsam', category: 'mobility' },
      { name: 'Open Book', detail: 'Seitlage, Knie übereinander. Oberen Arm und Brustkorb langsam öffnen; Knie bleiben zusammen.', dose: '6 je Seite', category: 'mobility' },
      { name: '90/90 Hüftwechsel', detail: 'Im Sitz beide Knie kontrolliert von einer Seite zur anderen bewegen. Hände dürfen stützen.', dose: '8 gesamt', category: 'mobility' },
      { name: 'Halbkniender Hüftbeuger', detail: 'Becken leicht einrollen und nach vorn verlagern, ohne ins Hohlkreuz zu gehen.', dose: '45 Sek. je Seite', category: 'mobility' },
      { name: 'Sphinx', detail: 'Bauchlage auf Unterarmen. Brustbein lang nach vorne ziehen. Weglassen, wenn es den Rücken reizt.', dose: '5 × 15 Sek.', category: 'mobility' },
      { name: 'Body Scan', detail: 'Ruhig liegen, Kiefer und Schultern lösen, Atem beobachten.', dose: '3 Min.', category: 'recovery' }
    ]
  },
  {
    key: 'athletic-strength', title: 'Keeper-Kraft', subtitle: 'Beine, Rumpf und Schultergürtel', minutes: 42, intensity: 'Moderat', focus: 'Kraft & Explosiv-Basis',
    exercises: [...warmup,
      { name: 'Reverse Lunge mit Halt', detail: 'Einen Schritt zurück, vorderes Knie stabil. Beim Hochkommen zwei Sekunden einbeinig halten.', dose: '3 × 6 je Seite', category: 'strength' },
      { name: 'Glute Bridge', detail: 'Fersen in den Boden, Gesäß anspannen, Becken heben ohne den Rücken zu überstrecken.', dose: '3 × 10', category: 'strength' },
      { name: 'Bird Dog', detail: 'Im Vierfüßler Arm und Gegenbein lang machen, Becken ruhig halten.', dose: '3 × 6 je Seite', category: 'strength' },
      { name: 'Pallof Press mit Band', detail: 'Seitlich zum sicher befestigten Band stehen. Hände vor die Brust drücken, Rotation verhindern.', dose: '3 × 8 je Seite', category: 'strength' },
      { name: 'Wadenheben', detail: 'Langsam hochdrücken, oben kurz halten, kontrolliert absenken.', dose: '3 × 12', category: 'strength' }
    ]
  },
  {
    key: 'easy-cardio', title: 'Ausdauer ohne Druck', subtitle: 'Bewegen und frisch aufhören', minutes: 35, intensity: 'Leicht', focus: 'Ausdauer & Erholung',
    exercises: [
      { name: 'Lockeres Cardio', detail: 'Spazieren, Radfahren oder Crosstrainer. Intensität: Du kannst dich entspannt unterhalten.', dose: '30 Min.', category: 'cardio' },
      { name: 'Waden- und Hüftmobilität', detail: 'Ruhig durchbewegen, nicht federn und nie in stechenden Schmerz gehen.', dose: '5 Min.', category: 'mobility' }
    ]
  },
  {
    key: 'full-rest', title: 'Aktive Pause', subtitle: 'Heute zählt Erholung', minutes: 15, intensity: 'Leicht', focus: 'Regeneration',
    exercises: [
      { name: 'Erholungsspaziergang', detail: 'Ganz entspannt gehen. Kein Leistungsziel und kein schlechtes Gewissen.', dose: '10 Min.', category: 'recovery' },
      { name: 'Ruhige Mobilität', detail: 'Schultern kreisen, Cat–Cow und Hüftkreise in angenehmer Größe.', dose: '5 Min.', category: 'mobility' }
    ]
  }
]

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

export function makeWeek(weekIndex = 0, completionRate = 0): Workout[] {
  const increase = weekIndex > 0 && completionRate >= 0.7 ? Math.min(weekIndex * 2, 8) : 0
  return sessions.map((session, index) => ({
    ...session,
    day: days[index],
    minutes: Math.min(45, session.minutes + (session.key === 'run-walk' || session.key === 'easy-cardio' ? increase : 0))
  }))
}

export function adaptWorkout(workout: Workout, checkin?: Checkin): { workout: Workout; note: string } {
  if (!checkin) return { workout, note: 'Mach zuerst deinen kurzen Tages-Check – dann passe ich die Einheit an.' }
  const pain = Math.max(checkin.backPain, checkin.neckPain)
  if (pain >= 7) {
    const recovery = makeWeek().find(item => item.key === 'full-rest')!
    return {
      workout: { ...recovery, key: `${workout.key}-recovery`, day: workout.day },
      note: 'Heute keine Belastungseinheit: Deine Schmerzangabe ist hoch. Nur sanfte, schmerzfreie Bewegung – und bitte medizinisch abklären, wenn das neu, stark oder anhaltend ist.'
    }
  }
  if (pain >= 4 || checkin.energy <= 2 || checkin.sleep <= 2 || checkin.soreness >= 7) {
    return {
      workout: { ...workout, minutes: Math.max(15, Math.round(workout.minutes * 0.65)), intensity: 'Leicht', exercises: workout.exercises.map(ex => ({ ...ex, dose: ex.dose.replace(/^3 ×/, '2 ×').replace(/^4 ×/, '3 ×') })) },
      note: 'Heute ist eine reduzierte Version sinnvoll: ungefähr zwei Drittel des Umfangs, sauber und ohne Leistungsdruck.'
    }
  }
  return { workout, note: 'Die Werte sehen passend aus. Bleib trotzdem bei ungefähr 6 von 10 Anstrengung und hör frisch auf.' }
}

export function getWeekStart(date = new Date()) {
  const copy = new Date(date)
  const day = copy.getDay() || 7
  copy.setDate(copy.getDate() - day + 1)
  copy.setHours(0, 0, 0, 0)
  return copy
}

export function todayIndex(date = new Date()) {
  return (date.getDay() + 6) % 7
}
