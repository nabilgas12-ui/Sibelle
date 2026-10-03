-- =====================================================================
-- FIX_PAYMENTS.sql — طرق الدفع (نفّذه مرة واحدة في SQL Editor)
-- =====================================================================
alter table public.payment_methods enable row level security;

do $$
declare r record;
begin
  for r in select policyname from pg_policies
           where schemaname='public' and tablename='payment_methods' and cmd='SELECT'
  loop execute format('drop policy %I on public.payment_methods', r.policyname); end loop;
end $$;

-- الزائر يقرأ الطرق المفعّلة فقط
create policy "payments public read enabled" on public.payment_methods
  for select using (enabled = true);

-- حسابات اللوحة: قراءة وكتابة كاملة (تشمل المعطّلة)
drop policy if exists "payments staff all" on public.payment_methods;
create policy "payments staff all" on public.payment_methods
  for all to authenticated using (true) with check (true);

do $$ begin
  alter publication supabase_realtime add table public.payment_methods;
exception when duplicate_object then null; end $$;
alter table public.payment_methods replica identity full;
