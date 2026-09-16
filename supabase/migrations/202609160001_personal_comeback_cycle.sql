-- Keeper Comeback: personal 8-day cycle, nutrition and progression.
-- Existing weekly data remains untouched for backwards compatibility.

alter table public.profiles
  add column if not exists age integer not null default 20 check (age between 14 and 100),
  add column if not exists height_cm integer not null default 178 check (height_cm between 120 and 230),
  add column if not exists weight_kg numeric(5,1) not null default 75 check (weight_kg between 30 and 300),
  add column if not exists plant_based boolean not null default true,
  add column if not exists vegan boolean not null default false;

alter table public.daily_checkins
  add column if not exists fatigue smallint not null default 3 check (fatigue between 0 and 10),
  add column if not exists pain smallint not null default 0 check (pain between 0 and 10),
  add column if not exists motivation smallint not null default 5 check (motivation between 0 and 10);

alter table public.workout_sessions
  add column if not exists cycle_day smallint check (cycle_day between 1 and 8),
  add column if not exists video_id text;

create table public.workout_videos (
  video_id text primary key,
  cycle_day smallint not null check (cycle_day between 1 and 8),
  title text not null,
  channel text not null,
  duration_minutes integer not null check (duration_minutes between 1 and 180),
  intensity text not null,
  equipment text not null default 'Keine Ausrüstung',
  goals text[] not null default '{}',
  is_alternative boolean not null default false,
  requires_equipment text,
  created_at timestamptz not null default now()
);

create table public.training_cycles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  anchor_date date not null default date '2026-09-15',
  cycle_length smallint not null default 8 check (cycle_length = 8),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index training_cycles_one_active_per_user
  on public.training_cycles(user_id) where active;

create table public.training_days (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cycle_id uuid references public.training_cycles(id) on delete cascade,
  scheduled_date date not null,
  original_date date not null,
  cycle_day smallint not null check (cycle_day between 1 and 8),
  workout_type text not null,
  status text not null default 'planned' check (status in ('planned','completed','postponed','recovery','rest')),
  video_id text references public.workout_videos(video_id),
  postponement_reason text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, scheduled_date, cycle_day)
);

create table public.workout_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workout_session_id uuid references public.workout_sessions(id) on delete set null,
  feedback_date date not null,
  cycle_day smallint not null check (cycle_day between 1 and 8),
  completed boolean not null default true,
  early_stops smallint check (early_stops >= 0),
  extra_breaks smallint check (extra_breaks >= 0),
  intensity smallint check (intensity between 1 and 10),
  legs_fatigue smallint check (legs_fatigue between 1 and 10),
  upper_fatigue smallint check (upper_fatigue between 1 and 10),
  conditioning smallint check (conditioning between 1 and 10),
  technique smallint check (technique between 1 and 10),
  knee_feeling smallint check (knee_feeling between 1 and 10),
  stiffness_before smallint check (stiffness_before between 1 and 10),
  stiffness_after smallint check (stiffness_after between 1 and 10),
  notes text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, feedback_date, cycle_day)
);

create table public.exercise_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_key text not null,
  value numeric(7,2) not null check (value >= 0),
  unit text not null check (unit in ('reps','seconds')),
  recorded_at timestamptz not null default now()
);

create table public.nutrition_days (
  day_number smallint primary key check (day_number between 1 and 8),
  label text not null,
  kcal_min integer not null,
  kcal_max integer not null,
  protein_min integer not null,
  protein_max integer not null
);

create table public.recipes (
  recipe_key text primary key,
  cycle_day smallint not null check (cycle_day between 1 and 8),
  meal_type text not null check (meal_type in ('breakfast','lunch','snack','dinner','pre-workout')),
  title text not null,
  kcal integer not null check (kcal > 0),
  protein integer not null check (protein >= 0),
  prep_minutes integer not null check (prep_minutes > 0),
  meal_prep boolean not null default false,
  overnight boolean not null default false,
  steps text[] not null default '{}',
  alternatives text[] not null default '{}',
  storage_note text not null default '',
  prep_hint text not null default ''
);

create table public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_key text not null references public.recipes(recipe_key) on delete cascade,
  name text not null,
  amount numeric(8,2) not null check (amount > 0),
  unit text not null,
  category text not null
);

create table public.meal_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  recipe_key text not null,
  eaten boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, log_date, recipe_key)
);

create table public.nutrition_targets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  hard_kcal_min integer not null default 2500,
  hard_kcal_max integer not null default 2700,
  recovery_kcal_min integer not null default 2300,
  recovery_kcal_max integer not null default 2500,
  protein_min integer not null default 130,
  protein_max integer not null default 150,
  updated_at timestamptz not null default now()
);

create table public.meal_prep_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  task_date date not null,
  target_date date not null,
  recipe_key text not null,
  done boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, task_date, target_date, recipe_key)
);

create table public.shopping_list_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  window_key text not null,
  name text not null,
  amount numeric(10,2) not null check (amount > 0),
  unit text not null,
  category text not null,
  checked boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, window_key, name, unit)
);

create table public.equipment_profile (
  user_id uuid primary key references auth.users(id) on delete cascade,
  pullup_bar boolean not null default false,
  resistance_bands boolean not null default false,
  dip_bars boolean not null default false,
  mat boolean not null default true,
  no_equipment boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.supplement_tracking (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  creatine_grams numeric(3,1) check (creatine_grams between 0 and 20),
  protein_shake boolean not null default false,
  caffeine boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, log_date)
);

insert into public.workout_videos (video_id, cycle_day, title, channel, duration_minutes, intensity, equipment, goals, is_alternative, requires_equipment) values
  ('1s_0rUUo0A0', 1, '50 Min Full Body HIIT', 'YouTube Workout', 50, '8–9/10', 'Keine Ausrüstung', array['Ausdauer','Ganzkörperbelastung','Kraftausdauer','Kondition'], false, null),
  ('lPKRiU9u_Hc', 2, '20 Minute Full Body Flexibility Routine', 'Tom Merrick', 20, '2–3/10', 'Matte optional', array['Wirbelsäule','Hüfte','Hamstrings','Schultern'], false, null),
  ('wUtrI5bnrUc', 3, '30 Min Upper Body Calisthenics / Bodyweight', 'Calisthenics Workout', 30, '7–8/10', 'Keine Ausrüstung', array['Brust','Schultern','Trizeps','Core'], false, null),
  ('61mlOpBEnGc', 3, '20 Min Upper Body Calisthenics with Pull Up Bar', 'Tom Peto Training', 20, '7–8/10', 'Klimmzugstange', array['Zugkraft','Oberkörper','Core'], true, 'pullup_bar'),
  ('ywVaPs9WbgM', 4, 'Calisthenics Leg Workout – Follow Along', 'THENX', 30, '7–8/10', 'Keine Ausrüstung', array['Beine','Stabilität','Explosivität'], false, null),
  ('2wYQhJdv2oI', 5, '20 Minute Full Body Flexibility Routine V3', 'Tom Merrick', 20, '1–3/10', 'Matte optional', array['Recovery','Mobility'], false, null),
  ('fWptOzJI3Wc', 6, '30 Min Full Body Calisthenics Workout at Home', 'Tom Peto Training', 30, '7–8/10', 'Keine Ausrüstung', array['Push','Legs','Posture','Core'], false, null),
  ('DkTCcOY1o5M', 8, '20 Min Low Impact Cardio', 'Low Impact Cardio', 20, '2–4/10', 'Keine Ausrüstung', array['Leichtes Cardio','HIIT-Vorbereitung'], false, null)
on conflict (video_id) do update set title = excluded.title, channel = excluded.channel;

insert into public.nutrition_days (day_number, label, kcal_min, kcal_max, protein_min, protein_max) values
  (1, 'HIIT', 2600, 2700, 135, 150), (2, 'Recovery', 2350, 2450, 130, 150),
  (3, 'Upper Body', 2500, 2700, 130, 150), (4, 'Legs', 2650, 2750, 135, 150),
  (5, 'Recovery', 2300, 2450, 130, 150), (6, 'Full Body', 2500, 2700, 135, 150),
  (7, 'Rest', 2300, 2450, 130, 150), (8, 'Mobility + Cardio', 2350, 2500, 130, 150)
on conflict (day_number) do update set label = excluded.label, kcal_min = excluded.kcal_min, kcal_max = excluded.kcal_max, protein_min = excluded.protein_min, protein_max = excluded.protein_max;

insert into public.recipes (recipe_key, cycle_day, meal_type, title, kcal, protein, prep_minutes, meal_prep, overnight, prep_hint) values
  ('d1-breakfast',1,'breakfast','Banana Peanut Protein Overnight Oats',720,44,8,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('d2-breakfast',2,'breakfast','Berry Chia Protein Overnight Pudding',650,38,8,true,true,'Walnüsse morgens ergänzen.'),
  ('d3-breakfast',3,'breakfast','Chocolate Banana Overnight Oats',710,45,7,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('d4-breakfast',4,'breakfast','Apple Cinnamon Power Overnight Oats',760,45,8,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('d5-breakfast',5,'breakfast','Soja-Skyr-Müsli-Jar',620,40,6,true,true,'Abends schichten und kaltstellen.'),
  ('d6-breakfast',6,'breakfast','Peanut Berry Overnight Oats',720,44,7,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('d7-breakfast',7,'breakfast','Carrot Cake Overnight Oats',650,39,8,true,true,'Am Vorabend mischen und kaltstellen.'),
  ('d8-breakfast',8,'breakfast','Apple Pie Protein Overnight Oats',700,43,7,true,true,'Am Vorabend mischen und kaltstellen.')
on conflict (recipe_key) do update set title = excluded.title, kcal = excluded.kcal, protein = excluded.protein;

alter table public.workout_videos enable row level security;
alter table public.training_cycles enable row level security;
alter table public.training_days enable row level security;
alter table public.workout_feedback enable row level security;
alter table public.exercise_progress enable row level security;
alter table public.nutrition_days enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.meal_logs enable row level security;
alter table public.nutrition_targets enable row level security;
alter table public.meal_prep_tasks enable row level security;
alter table public.shopping_list_items enable row level security;
alter table public.equipment_profile enable row level security;
alter table public.supplement_tracking enable row level security;

create policy "workout_videos_public_read" on public.workout_videos for select to anon, authenticated using (true);
create policy "nutrition_days_public_read" on public.nutrition_days for select to anon, authenticated using (true);
create policy "recipes_public_read" on public.recipes for select to anon, authenticated using (true);
create policy "ingredients_public_read" on public.recipe_ingredients for select to anon, authenticated using (true);

do $$
declare
  table_name text;
begin
  foreach table_name in array array['training_cycles','training_days','workout_feedback','exercise_progress','meal_logs','meal_prep_tasks','shopping_list_items','equipment_profile','supplement_tracking']
  loop
    execute format('create policy %I on public.%I for select to authenticated using ((select auth.uid()) = user_id)', table_name || '_select_own', table_name);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', table_name || '_insert_own', table_name);
    execute format('create policy %I on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', table_name || '_update_own', table_name);
    execute format('create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', table_name || '_delete_own', table_name);
  end loop;
end $$;

create policy "nutrition_targets_select_own" on public.nutrition_targets for select to authenticated using ((select auth.uid()) = user_id);
create policy "nutrition_targets_insert_own" on public.nutrition_targets for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "nutrition_targets_update_own" on public.nutrition_targets for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "nutrition_targets_delete_own" on public.nutrition_targets for delete to authenticated using ((select auth.uid()) = user_id);

grant usage on schema public to anon, authenticated;
grant select on public.workout_videos, public.nutrition_days, public.recipes, public.recipe_ingredients to anon, authenticated;
grant select, insert, update, delete on public.training_cycles, public.training_days, public.workout_feedback, public.exercise_progress, public.meal_logs, public.nutrition_targets, public.meal_prep_tasks, public.shopping_list_items, public.equipment_profile, public.supplement_tracking to authenticated;
