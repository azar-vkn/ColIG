-- ===== ColIG Supabase Database Schema =====
-- Run this in your Supabase SQL Editor

-- 1. Users Profile Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  preferred_niche text,
  preferred_language text default 'en',
  subscription_tier text default 'free' check (subscription_tier in ('free', 'pro')),
  generations_today integer default 0,
  last_generation_date date default current_date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Generations Table
create table if not exists public.generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  tool text not null check (tool in ('hook', 'caption', 'carousel', 'hashtag', 'rewrite')),
  input jsonb not null default '{}',
  output jsonb not null default '[]',
  created_at timestamptz default now()
);

-- 3. Subscriptions Table
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  plan text not null default 'free' check (plan in ('free', 'pro', 'team')),
  status text not null default 'active' check (status in ('active', 'cancelled', 'expired')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.generations enable row level security;
alter table public.subscriptions enable row level security;

-- 5. RLS Policies - Profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 6. RLS Policies - Generations
create policy "Users can view own generations"
  on public.generations for select
  using (auth.uid() = user_id);

create policy "Users can insert own generations"
  on public.generations for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own generations"
  on public.generations for delete
  using (auth.uid() = user_id);

-- 7. RLS Policies - Subscriptions
create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- 8. Trigger: Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 9. Trigger: Update generation count
create or replace function public.increment_generation_count()
returns trigger as $$
begin
  update public.profiles
  set
    generations_today = case
      when last_generation_date = current_date then generations_today + 1
      else 1
    end,
    last_generation_date = current_date
  where id = new.user_id;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_generation_created
  after insert on public.generations
  for each row execute procedure public.increment_generation_count();

-- 10. Indexes for performance
create index if not exists idx_generations_user_id on public.generations(user_id);
create index if not exists idx_generations_created_at on public.generations(created_at desc);
create index if not exists idx_generations_tool on public.generations(tool);
