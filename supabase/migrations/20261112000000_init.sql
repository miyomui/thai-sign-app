-- โครงสร้างฐานข้อมูลเริ่มต้น (ไฟล์กลาง — ห้ามแก้ไฟล์ migration เก่า ให้สร้างไฟล์ใหม่แทน)

-- ---------- ข้อมูลเนื้อหา (ทุกคนอ่านได้) ----------
create table public.categories (
  id          text primary key,              -- เช่น 'greeting' (ตรงกับ lib/constants/categories.js)
  name        text not null,
  short_name  text not null,
  sort_order  int  not null default 0
);

create table public.vocab (
  vocab_id           text primary key,       -- 'V001'
  thai_text          text not null,
  category_id        text not null references public.categories(id),
  thsl_gloss         text not null,
  facial_expression  text,
  thumbnail_url      text,
  video_url          text,
  avatar_clip_id     text                    -- ชื่อคลิปใน Unity (ปกติ = vocab_id)
);

create table public.lessons (
  lesson_id   text primary key,              -- '01'
  title       text not null,
  tag         text not null,
  sort_order  int  not null default 0
);

create table public.lesson_vocab (
  lesson_id   text references public.lessons(lesson_id) on delete cascade,
  vocab_id    text references public.vocab(vocab_id) on delete cascade,
  sort_order  int not null default 0,
  primary key (lesson_id, vocab_id)
);

-- ---------- ข้อมูลของผู้ใช้ (เห็นเฉพาะของตัวเอง) ----------
create table public.saved_words (
  user_id     uuid not null references auth.users(id) on delete cascade,
  vocab_id    text not null references public.vocab(vocab_id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, vocab_id)
);

create table public.learning_progress (
  user_id     uuid not null references auth.users(id) on delete cascade,
  vocab_id    text not null references public.vocab(vocab_id) on delete cascade,
  learned_at  timestamptz not null default now(),
  primary key (user_id, vocab_id)
);

create table public.quiz_attempts (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  source      text not null,                 -- 'practice' | 'lesson:01' ...
  score       int  not null,
  total       int  not null,
  wrong_ids   text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- ---------- Row Level Security ----------
alter table public.categories        enable row level security;
alter table public.vocab             enable row level security;
alter table public.lessons           enable row level security;
alter table public.lesson_vocab      enable row level security;
alter table public.saved_words       enable row level security;
alter table public.learning_progress enable row level security;
alter table public.quiz_attempts     enable row level security;

create policy "อ่านหมวดได้ทุกคน"      on public.categories   for select using (true);
create policy "อ่านคำศัพท์ได้ทุกคน"    on public.vocab        for select using (true);
create policy "อ่านบทเรียนได้ทุกคน"    on public.lessons      for select using (true);
create policy "อ่านคำในบทได้ทุกคน"     on public.lesson_vocab for select using (true);

create policy "จัดการคำที่บันทึกของตัวเอง" on public.saved_words
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "จัดการความก้าวหน้าของตัวเอง" on public.learning_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "จัดการผลสอบของตัวเอง" on public.quiz_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
