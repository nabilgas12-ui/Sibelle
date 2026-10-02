-- =====================================================================
-- Si Belle — تفعيل التحديث اللحظي + تخزين الصور (نفّذه مرة واحدة في SQL Editor)
-- =====================================================================

-- 1) Realtime: إضافة الجداول إلى publication (تجاهل أي خطأ "already member")
do $$
declare t text;
begin
  foreach t in array array[
    'orders','order_items','products','categories',
    'store_settings','site_content','announcement_banners',
    'payment_methods','wilayas','wilaya_shipping','legal_pages'
  ] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
             when undefined_table then null;
    end;
  end loop;
end $$;

-- 2) REPLICA IDENTITY FULL: يضمن وصول الصف كاملاً مع كل تحديث/حذف
alter table public.products   replica identity full;
alter table public.categories replica identity full;
alter table public.orders     replica identity full;

-- 3) Storage: حاوية عامة للصور (بدل تخزين base64 داخل الجدول وهو سبب الثقل)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "product-images public read"  on storage.objects;
drop policy if exists "product-images staff write"  on storage.objects;
drop policy if exists "product-images staff update" on storage.objects;
drop policy if exists "product-images staff delete" on storage.objects;

create policy "product-images public read" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "product-images staff write" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');
create policy "product-images staff update" on storage.objects
  for update to authenticated using (bucket_id = 'product-images');
create policy "product-images staff delete" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');

-- 4) فهارس لتسريع القراءة
create index if not exists idx_products_active_sort on public.products (active, sort_order, id);
create index if not exists idx_orders_created_at    on public.orders (created_at desc);
create index if not exists idx_order_items_order_id on public.order_items (order_id);
