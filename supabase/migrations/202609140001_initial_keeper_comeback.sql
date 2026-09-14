create extension if not exists pgcrypto;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  max_minutes integer not null default 45 check (max_minutes between 10 and 120),
  current_level text not null default 'restart' check (current_level in ('restart','building','returning')),
  goalkeeper boolean not null default true,
  goals text[] not null default array['fitness','mobility','goalkeeper']::text[],
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.daily_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  checkin_date date not null default current_date,
  energy smallint not null check (energy between 1 and 5),
  sleep_quality smallint not null check (sleep_quality between 1 and 5),
  soreness smallint not null check (soreness between 0 and 10),
  back_pain smallint not null check (back_pain between 0 and 10),
  neck_pain smallint not null check (neck_pain between 0 and 10),
  notes text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, checkin_date)
);

create table public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_date date not null default current_date,
  workout_key text not null,
  title text not null,
  status text not null default 'completed' check (status in ('completed','skipped','shortened')),
  planned_minutes integer not null check (planned_minutes between 1 and 180),
  actual_minutes integer not null check (actual_minutes between 0 and 180),
  perceived_effort smallint check (perceived_effort between 1 and 10),
  notes text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, session_date, workout_key)
);

create table public.weekly_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  plan_version integer not null default 1,
  plan jsonb not null check (jsonb_typeof(plan) = 'array'),
  generated_from jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, week_start)
);

alter table public.profiles enable row level security;
alter table public.daily_checkins enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.weekly_plans enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "profiles_delete_own" on public.profiles for delete to authenticated using ((select auth.uid()) = user_id);

create policy "checkins_select_own" on public.daily_checkins for select to authenticated using ((select auth.uid()) = user_id);
create policy "checkins_insert_own" on public.daily_checkins for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "checkins_update_own" on public.daily_checkins for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "checkins_delete_own" on public.daily_checkins for delete to authenticated using ((select auth.uid()) = user_id);

create policy "sessions_select_own" on public.workout_sessions for select to authenticated using ((select auth.uid()) = user_id);
create policy "sessions_insert_own" on public.workout_sessions for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "sessions_update_own" on public.workout_sessions for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "sessions_delete_own" on public.workout_sessions for delete to authenticated using ((select auth.uid()) = user_id);

create policy "plans_select_own" on public.weekly_plans for select to authenticated using ((select auth.uid()) = user_id);
create policy "plans_insert_own" on public.weekly_plans for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "plans_update_own" on public.weekly_plans for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "plans_delete_own" on public.weekly_plans for delete to authenticated using ((select auth.uid()) = user_id);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.daily_checkins to authenticated;
grant select, insert, update, delete on public.workout_sessions to authenticated;
grant select, insert, update, delete on public.weekly_plans to authenticated;
