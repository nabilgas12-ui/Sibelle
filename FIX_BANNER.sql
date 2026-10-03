-- =====================================================================
-- FIX_BANNER.sql — إصلاح الشريط الإعلاني (نفّذه مرة واحدة في SQL Editor)
-- =====================================================================

-- 1) اترك صفاً واحداً فقط (الأول) واحذف أي صفوف قديمة زائدة كانت تُظهر نصاً قديماً
delete from public.announcement_banners
where id not in (
  select id from public.announcement_banners order by sort_order asc, id asc limit 1
);

-- 2) سياسات القراءة: الزائر يقرأ الصف دائماً (مفعّلاً أو مخفياً) ليعرف المتجر حالته
alter table public.announcement_banners enable row level security;

do $$
declare r record;
begin
  for r in select policyname from pg_policies
           where schemaname = 'public' and tablename = 'announcement_banners' and cmd = 'SELECT'
  loop
    execute format('drop policy %I on public.announcement_banners', r.policyname);
  end loop;
end $$;

create policy "banner public read" on public.announcement_banners
  for select using (true);

-- 3) صلاحية الكتابة لحسابات لوحة التحكم (المسجّلين)
drop policy if exists "banner staff write" on public.announcement_banners;
create policy "banner staff write" on public.announcement_banners
  for all to authenticated using (true) with check (true);

-- 4) Realtime
do $$ begin
  alter publication supabase_realtime add table public.announcement_banners;
exception when duplicate_object then null; end $$;
alter table public.announcement_banners replica identity full;
