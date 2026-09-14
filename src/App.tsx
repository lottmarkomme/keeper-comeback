import { useEffect, useMemo, useState } from 'react'
import { Activity, ArrowLeft, CalendarDays, Check, ChevronRight, CircleUserRound, Flame, Home, LogIn, Play, ShieldCheck, Sparkles, TrendingUp, X } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import { adaptWorkout, getWeekStart, makeWeek, todayIndex } from './lib/plan'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import type { Checkin, Completion, Workout } from './types'

type Tab = 'home' | 'plan' | 'progress' | 'profile'
const STORAGE = { checkin: 'kc-checkin', completions: 'kc-completions', onboarded: 'kc-onboarded' }
const today = () => new Date().toISOString().slice(0, 10)

function read<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || '') as T } catch { return fallback }
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [selected, setSelected] = useState<Workout | null>(null)
  const [showCheckin, setShowCheckin] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => !read(STORAGE.onboarded, false))
  const [session, setSession] = useState<Session | null>(null)
  const [checkin, setCheckin] = useState<Checkin | undefined>(() => read<Record<string, Checkin>>(STORAGE.checkin, {})[today()])
  const [completions, setCompletions] = useState<Completion[]>(() => read(STORAGE.completions, []))
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => { localStorage.setItem(STORAGE.completions, JSON.stringify(completions)) }, [completions])
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(''), 3000); return () => clearTimeout(id) }, [toast])

  const weekStart = getWeekStart()
  const weekCompletions = completions.filter(c => new Date(c.date) >= weekStart).length
  const previousRate = Math.min(1, completions.length / 7)
  const weekNumber = Math.max(0, Math.floor((Date.now() - new Date('2026-09-14').getTime()) / 604800000))
  const week = useMemo(() => makeWeek(weekNumber, previousRate), [weekNumber, previousRate])
  const baseToday = week[todayIndex()]
  const adapted = adaptWorkout(baseToday, checkin)

  async function saveCheckin(next: Checkin) {
    const all = read<Record<string, Checkin>>(STORAGE.checkin, {})
    all[today()] = next
    localStorage.setItem(STORAGE.checkin, JSON.stringify(all))
    setCheckin(next)
    setShowCheckin(false)
    setToast('Training für heute angepasst')
    if (session && supabase) {
      await supabase.from('daily_checkins').upsert({
        user_id: session.user.id, checkin_date: today(), energy: next.energy, sleep_quality: next.sleep,
        soreness: next.soreness, back_pain: next.backPain, neck_pain: next.neckPain
      }, { onConflict: 'user_id,checkin_date' })
    }
  }

  async function finishWorkout(workout: Workout) {
    if (completions.some(c => c.date === today() && c.workoutKey === workout.key)) {
      setToast('Diese Einheit ist heute schon erledigt')
      return
    }
    const entry = { date: today(), workoutKey: workout.key, minutes: workout.minutes, effort: workout.intensity === 'Leicht' ? 4 : 6 }
    setCompletions(old => [...old, entry])
    setSelected(null)
    setToast('Stark – Einheit gespeichert!')
    if (session && supabase) {
      await supabase.from('workout_sessions').upsert({
        user_id: session.user.id, session_date: today(), workout_key: workout.key, title: workout.title,
        planned_minutes: workout.minutes, actual_minutes: workout.minutes, perceived_effort: entry.effort, status: 'completed'
      }, { onConflict: 'user_id,session_date,workout_key' })
    }
  }

  if (showOnboarding) return <Onboarding onDone={() => { localStorage.setItem(STORAGE.onboarded, 'true'); setShowOnboarding(false) }} />

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark">KC</div>
        <div><p className="eyebrow">KEEPER COMEBACK</p><h1>{tab === 'home' ? 'Dein Heute' : tab === 'plan' ? 'Wochenplan' : tab === 'progress' ? 'Fortschritt' : 'Dein Profil'}</h1></div>
        <button className="avatar" onClick={() => setTab('profile')} aria-label="Profil öffnen"><CircleUserRound /></button>
      </header>

      <main>
        {tab === 'home' && <HomeView workout={adapted.workout} note={adapted.note} checkin={checkin} weekCompletions={weekCompletions} onCheckin={() => setShowCheckin(true)} onOpen={() => setSelected(adapted.workout)} />}
        {tab === 'plan' && <PlanView week={week} completions={completions} onOpen={setSelected} />}
        {tab === 'progress' && <ProgressView completions={completions} />}
        {tab === 'profile' && <ProfileView session={session} onToast={setToast} onReset={() => { localStorage.clear(); location.reload() }} />}
      </main>

      <nav className="bottom-nav">
        <NavButton active={tab === 'home'} icon={<Home />} label="Heute" onClick={() => setTab('home')} />
        <NavButton active={tab === 'plan'} icon={<CalendarDays />} label="Plan" onClick={() => setTab('plan')} />
        <NavButton active={tab === 'progress'} icon={<TrendingUp />} label="Fortschritt" onClick={() => setTab('progress')} />
        <NavButton active={tab === 'profile'} icon={<CircleUserRound />} label="Profil" onClick={() => setTab('profile')} />
      </nav>

      {showCheckin && <CheckinSheet initial={checkin} onClose={() => setShowCheckin(false)} onSave={saveCheckin} />}
      {selected && <WorkoutSheet workout={selected} onClose={() => setSelected(null)} onFinish={finishWorkout} />}
      {toast && <div className="toast"><Check size={18} />{toast}</div>}
    </div>
  )
}

function HomeView({ workout, note, checkin, weekCompletions, onCheckin, onOpen }: { workout: Workout; note: string; checkin?: Checkin; weekCompletions: number; onCheckin: () => void; onOpen: () => void }) {
  return <div className="page-stack">
    <section className="hero-card">
      <div className="hero-orb"><Activity /></div>
      <p className="eyebrow lime">HEUTE · {workout.intensity.toUpperCase()}</p>
      <h2>{workout.title}</h2><p>{workout.subtitle}</p>
      <div className="stat-row"><span>{workout.minutes} MIN</span><span>{workout.exercises.length} ÜBUNGEN</span><span>RPE ≤ 6</span></div>
      <button className="primary" onClick={onOpen}><Play size={18} fill="currentColor" /> Einheit ansehen</button>
    </section>
    <section className="adapt-card"><Sparkles size={20} /><div><strong>{checkin ? 'Für dich angepasst' : 'Wie geht es dir heute?'}</strong><p>{note}</p></div><button onClick={onCheckin}>{checkin ? 'Ändern' : 'Check-in'} <ChevronRight size={16} /></button></section>
    <section><div className="section-head"><div><p className="eyebrow">DIESE WOCHE</p><h3>Konstanz vor Vollgas</h3></div><span>{weekCompletions}/7</span></div>
      <div className="week-dots">{['M','D','M','D','F','S','S'].map((day, index) => <div key={index} className={index < weekCompletions ? 'done' : index === todayIndex() ? 'today' : ''}><i>{index < weekCompletions && <Check size={14}/>}</i><small>{day}</small></div>)}</div>
    </section>
    <div className="coach-note"><ShieldCheck /><p><strong>Comeback-Regel:</strong> Hör auf, wenn du das Gefühl hast, du könntest noch etwas. In den ersten Wochen gewinnen wir durch Wiederholen, nicht durch Zerstören.</p></div>
  </div>
}

function PlanView({ week, completions, onOpen }: { week: Workout[]; completions: Completion[]; onOpen: (w: Workout) => void }) {
  return <div className="page-stack"><div className="intro-copy"><p>WOCHE {Math.max(1, Math.ceil((Date.now() - new Date('2026-09-14').getTime()) / 604800000) + 1)}</p><h2>Zurück zur Basis</h2><span>Maximal 45 Minuten · angepasst an deine Tagesform</span></div>
    <div className="plan-list">{week.map((workout, index) => { const done = completions.some(c => c.workoutKey === workout.key); return <button key={workout.key} className={`plan-row ${index === todayIndex() ? 'current' : ''}`} onClick={() => onOpen(workout)}><div className="date-box"><b>{workout.day.slice(0,2)}</b><span>{index + 1}</span></div><div><small>{workout.focus}</small><strong>{workout.title}</strong><span>{workout.minutes} Min. · {workout.intensity}</span></div>{done ? <span className="done-badge"><Check /></span> : <ChevronRight />}</button> })}</div>
  </div>
}

function ProgressView({ completions }: { completions: Completion[] }) {
  const minutes = completions.reduce((sum, item) => sum + item.minutes, 0)
  const lastSeven = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return { label: ['So','Mo','Di','Mi','Do','Fr','Sa'][d.getDay()], value: completions.filter(c => c.date === d.toISOString().slice(0,10)).reduce((s,c) => s+c.minutes,0) } })
  return <div className="page-stack"><section className="progress-hero"><div><p className="eyebrow lime">DEIN COMEBACK</p><h2>{completions.length} Einheiten</h2><span>Jeder kleine Haken zählt.</span></div><Flame /></section>
    <div className="metric-grid"><article><span>Trainingszeit</span><b>{minutes}</b><small>Minuten gesamt</small></article><article><span>Ø Einheit</span><b>{completions.length ? Math.round(minutes/completions.length) : 0}</b><small>Minuten</small></article></div>
    <section className="chart-card"><div className="section-head"><div><p className="eyebrow">LETZTE 7 TAGE</p><h3>Bewegungsminuten</h3></div></div><div className="bars">{lastSeven.map((d,i) => <div key={i}><span style={{height: `${Math.max(5, d.value/45*100)}%`}}></span><small>{d.label}</small></div>)}</div></section>
    <div className="milestone"><div><Check /></div><p><strong>Nächstes Ziel</strong><br/>Drei Einheiten in einer Woche abschließen</p><span>{Math.min(3, completions.length)}/3</span></div>
  </div>
}

function ProfileView({ session, onToast, onReset }: { session: Session | null; onToast: (s:string)=>void; onReset:()=>void }) {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  async function signIn() {
    if (!supabase || !email) return
    setSending(true)
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.href.split('#')[0] } })
    setSending(false); onToast(error ? error.message : 'Login-Link wurde gesendet')
  }
  return <div className="page-stack"><section className="profile-card"><div className="profile-icon"><CircleUserRound /></div><h2>{session?.user.email || 'Lokales Profil'}</h2><p>{session ? 'Dein Fortschritt wird sicher synchronisiert.' : 'Deine Daten bleiben aktuell auf diesem Gerät.'}</p></section>
    {!session && <section className="login-card"><p className="eyebrow">SYNC AKTIVIEREN</p><h3>Mit E‑Mail anmelden</h3><p>Du erhältst einen sicheren Login-Link. Kein Passwort nötig.</p><input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="deine@email.de"/><button className="primary" onClick={signIn} disabled={!isSupabaseConfigured || sending}><LogIn size={18}/>{sending ? 'Wird gesendet…' : 'Login-Link senden'}</button></section>}
    <section className="settings-list"><div><span>Trainingslimit</span><strong>45 Minuten</strong></div><div><span>Schwerpunkt</span><strong>Fitness · Keeper · Mobility</strong></div><div><span>Startniveau</span><strong>Wiedereinstieg</strong></div></section>
    <button className="danger-link" onClick={onReset}>Lokale Trainingsdaten zurücksetzen</button>
    <p className="legal-note">Kein Medizinprodukt und kein Ersatz für ärztliche Untersuchung. Bei neuen starken Schmerzen, Taubheit/Schwäche, Problemen mit Blase oder Darm, Fieber oder Beschwerden nach einem Unfall bitte sofort medizinisch abklären.</p>
  </div>
}

function NavButton({ active, icon, label, onClick }: { active:boolean; icon:React.ReactNode; label:string; onClick:()=>void }) { return <button className={active ? 'active' : ''} onClick={onClick}>{icon}<span>{label}</span></button> }

function CheckinSheet({ initial, onClose, onSave }: { initial?:Checkin; onClose:()=>void; onSave:(c:Checkin)=>void }) {
  const [values, setValues] = useState<Checkin>(initial || { energy:3, sleep:3, soreness:2, backPain:2, neckPain:2 })
  return <div className="sheet-backdrop" onMouseDown={onClose}><div className="sheet" onMouseDown={e=>e.stopPropagation()}><div className="sheet-head"><div><p className="eyebrow">60-SEKUNDEN-CHECK</p><h2>Wie ist dein Körper heute?</h2></div><button onClick={onClose}><X /></button></div>
    <Slider label="Energie" value={values.energy} min={1} max={5} onChange={v=>setValues({...values,energy:v})}/><Slider label="Schlafqualität" value={values.sleep} min={1} max={5} onChange={v=>setValues({...values,sleep:v})}/><Slider label="Muskelkater" value={values.soreness} min={0} max={10} onChange={v=>setValues({...values,soreness:v})}/><Slider label="Rückenschmerz" value={values.backPain} min={0} max={10} onChange={v=>setValues({...values,backPain:v})}/><Slider label="Nackenschmerz" value={values.neckPain} min={0} max={10} onChange={v=>setValues({...values,neckPain:v})}/>
    <button className="primary" onClick={()=>onSave(values)}>Training anpassen</button></div></div>
}

function Slider({label,value,min,max,onChange}:{label:string;value:number;min:number;max:number;onChange:(v:number)=>void}) { return <label className="slider"><div><span>{label}</span><b>{value}/{max}</b></div><input type="range" min={min} max={max} value={value} onChange={e=>onChange(Number(e.target.value))}/></label> }

function WorkoutSheet({ workout, onClose, onFinish }: {workout:Workout;onClose:()=>void;onFinish:(w:Workout)=>void}) { return <div className="sheet-backdrop"><div className="sheet workout-sheet"><div className="sheet-head"><button className="back" onClick={onClose}><ArrowLeft/></button><div><p className="eyebrow">{workout.focus}</p><h2>{workout.title}</h2></div></div><div className="workout-meta"><span>{workout.minutes} Min.</span><span>{workout.intensity}</span><span>RPE ≤ 6</span></div><div className="exercise-list">{workout.exercises.map((ex,i)=><article key={`${ex.name}-${i}`}><div className={`exercise-number ${ex.category}`}>{i+1}</div><div><small>{ex.dose}</small><h3>{ex.name}</h3><p>{ex.detail}</p></div></article>)}</div><button className="primary sticky-action" onClick={()=>onFinish(workout)}><Check/> Einheit abschließen</button></div></div> }

function Onboarding({onDone}:{onDone:()=>void}) { const [step,setStep]=useState(0); const slides=[
  {icon:<Activity/>,kicker:'DEIN NEUSTART',title:'Nicht zurück auf früher. Erst einmal vorwärts.',text:'Keeper Comeback bringt dich mit Einheiten bis 45 Minuten zurück zu Ausdauer, Kraft, Beweglichkeit und Torwart-Athletik.'},
  {icon:<Sparkles/>,kicker:'JEDEN TAG PASSEND',title:'Der Plan hört auf deinen Körper.',text:'Energie, Schlaf, Muskelkater sowie Rücken- und Nackenschmerz bestimmen, ob du normal, reduziert oder regenerativ trainierst.'},
  {icon:<ShieldCheck/>,kicker:'SICHER STARTEN',title:'Schmerz ist kein Motivationstest.',text:'Trainiere nie in stechenden oder zunehmenden Schmerz. Starke oder anhaltende Beschwerden gehören medizinisch abgeklärt – besonders bei Taubheit, Schwäche, Fieber oder Blasen-/Darmproblemen.'}
]; const s=slides[step]; return <div className="onboarding"><div className="onboard-top"><div className="brand-mark">KC</div><div className="step-dots">{slides.map((_,i)=><i key={i} className={i===step?'active':''}/>)}</div></div><div className="onboard-visual">{s.icon}</div><div className="onboard-copy"><p className="eyebrow lime">{s.kicker}</p><h1>{s.title}</h1><p>{s.text}</p></div><button className="primary" onClick={()=>step<slides.length-1?setStep(step+1):onDone()}>{step<slides.length-1?'Weiter':'Mein Comeback starten'} <ChevronRight/></button></div> }
