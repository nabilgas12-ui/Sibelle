-- =====================================================================
-- Si Belle — إصلاح إعدادات الفاتورة (نفّذه مرة واحدة في Supabase SQL Editor)
-- يضمن وجود الجدول والأعمدة وأن الزبون (anon) يستطيع قراءة الإعدادات
-- =====================================================================
create table if not exists public.invoice_settings (
  id boolean primary key default true,
  enabled boolean default true,
  show_on_success boolean default true,
  show_logo boolean default true,
  show_qr boolean default true,
  show_customer boolean default true,
  show_address boolean default true,
  show_payment boolean default true,
  show_items boolean default true,
  show_shipping boolean default true,
  show_discount boolean default true,
  show_total boolean default true,
  auto_number_prefix text default 'SB-',
  color text default '#C9A227',
  title_ar text, title_fr text,
  company_name text,
  company_subtitle_ar text, company_subtitle_fr text,
  footer_ar text, footer_fr text,
  note_ar text, note_fr text,
  updated_at timestamptz default now(),
  constraint invoice_settings_single check (id)
);

alter table public.invoice_settings enable row level security;

drop policy if exists "invoice_settings public read"  on public.invoice_settings;
drop policy if exists "invoice_settings staff write"  on public.invoice_settings;
create policy "invoice_settings public read" on public.invoice_settings
  for select using (true);
create policy "invoice_settings staff write" on public.invoice_settings
  for all to authenticated using (true) with check (true);

-- صف افتراضي إن لم يوجد
insert into public.invoice_settings (id) values (true) on conflict (id) do nothing;
