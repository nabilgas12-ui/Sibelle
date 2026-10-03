-- =====================================================================
-- Si Belle — خصم المخزون عند الطلب + إرجاعه عند الإلغاء
-- نفّذه مرة واحدة في Supabase → SQL Editor → Run
--
-- المخزون مخزّن في products.colors على الشكل:
--   [{ "name": {"ar":"اسود","fr":"اسود"}, "stocks": {"L": 1, "M": 3} }]
-- الحل يعمل بـ Triggers فلا يحتاج تعديل دالة create_order الحالية،
-- ويقفل صف المنتج (FOR UPDATE) فلا يمكن لطلبين متزامنين أخذ نفس القطعة.
-- =====================================================================

-- ---------- دوال مساعدة ----------
-- تعديل مخزون تركيبة (لون+مقاس) داخل JSON المنتج. تُرجع true إن وُجدت التركيبة.
create or replace function public._sb_adjust_variant(
  p_product_id bigint, p_color text, p_size text, p_delta integer, p_check boolean
) returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  prod record;
  new_colors jsonb;
  c jsonb;
  idx int := 0;
  matched boolean := false;
  cur int;
  total int := 0;
  k text;
begin
  select * into prod from public.products where id = p_product_id for update;
  if not found then
    raise exception 'المنتج غير موجود';
  end if;

  new_colors := coalesce(prod.colors, '[]'::jsonb);

  -- حاول إيجاد التركيبة في المصفوفة
  if jsonb_typeof(new_colors) = 'array' and p_size is not null then
    for c in select * from jsonb_array_elements(new_colors) loop
      if (c->'name'->>'ar') = p_color or (c->'name'->>'fr') = p_color
         or (jsonb_typeof(c->'name') = 'string' and (c->>'name') = p_color) then
        if c ? 'stocks' and (c->'stocks') ? p_size then
          cur := coalesce((c->'stocks'->>p_size)::int, 0);
          if p_check and p_delta < 0 and cur + p_delta < 0 then
            raise exception 'الكمية غير متوفرة: % (% / %) المتبقي %',
              coalesce(prod.name_ar, prod.id::text), p_color, p_size, cur
              using errcode = 'P0001';
          end if;
          new_colors := jsonb_set(
            new_colors,
            array[idx::text, 'stocks', p_size],
            to_jsonb(greatest(0, cur + p_delta))
          );
          matched := true;
          exit;
        end if;
      end if;
      idx := idx + 1;
    end loop;
  end if;

  if matched then
    -- أعد حساب المخزون الكلي
    total := 0;
    for c in select * from jsonb_array_elements(new_colors) loop
      if c ? 'stocks' then
        for k in select jsonb_object_keys(c->'stocks') loop
          total := total + coalesce((c->'stocks'->>k)::int, 0);
        end loop;
      end if;
    end loop;
    update public.products set colors = new_colors, stock = total where id = p_product_id;
  else
    -- منتج بدون مصفوفة ألوان/مقاسات: استعمل المخزون الكلي
    cur := coalesce(prod.stock, 0);
    if p_check and p_delta < 0 and cur + p_delta < 0 then
      raise exception 'الكمية غير متوفرة: % المتبقي %',
        coalesce(prod.name_ar, prod.id::text), cur using errcode = 'P0001';
    end if;
    update public.products set stock = greatest(0, cur + p_delta) where id = p_product_id;
  end if;
end;
$$;

-- ---------- 1) خصم المخزون عند إدراج عنصر الطلب ----------
create or replace function public._sb_order_item_deduct()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.product_id is null then
    return new;
  end if;
  -- يرفع استثناء إن لم تكفِ الكمية، فيُلغى الطلب كله (نفس المعاملة)
  perform public._sb_adjust_variant(new.product_id, new.color, new.size, -coalesce(new.quantity, 1), true);
  return new;
end;
$$;

drop trigger if exists sb_order_item_deduct on public.order_items;
create trigger sb_order_item_deduct
  before insert on public.order_items
  for each row execute function public._sb_order_item_deduct();

-- ---------- 2) إرجاع المخزون عند إلغاء الطلب (وإعادة الخصم لو أُعيد تفعيله) ----------
create or replace function public._sb_order_status_stock()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  it record;
  was_released boolean := old.status::text in ('cancelled','returned');
  now_released boolean := new.status::text in ('cancelled','returned');
begin
  if was_released = now_released then
    return new;
  end if;

  for it in select product_id, color, size, quantity from public.order_items where order_id = new.id loop
    if it.product_id is null then continue; end if;
    if now_released then
      -- إلغاء/إرجاع → أعد الكمية
      perform public._sb_adjust_variant(it.product_id, it.color, it.size, coalesce(it.quantity,1), false);
    else
      -- خروج من حالة الإلغاء → اخصم من جديد
      perform public._sb_adjust_variant(it.product_id, it.color, it.size, -coalesce(it.quantity,1), true);
    end if;
  end loop;
  return new;
end;
$$;

drop trigger if exists sb_order_status_stock on public.orders;
create trigger sb_order_status_stock
  after update of status on public.orders
  for each row execute function public._sb_order_status_stock();

-- ---------- تحقق ----------
select tgname, tgrelid::regclass as on_table
from pg_trigger
where tgname in ('sb_order_item_deduct','sb_order_status_stock');
