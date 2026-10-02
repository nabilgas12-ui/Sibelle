-- ============================================================
-- Si Belle — حفظ اللون والمقاس في عناصر الطلب + جدول التوصيل
-- نفّذي في Supabase → SQL Editor → Run
-- ============================================================

-- 1) أعمدة اللون والمقاس على order_items
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS color text,
  ADD COLUMN IF NOT EXISTS size text;

-- 2) إن كان create_order لا يمرّر اللون/المقاس، هذا يساعد الطلبات الجديدة
-- (يجب أن تكون دالة create_order تكتب p_items.color و p_items.size)
-- مثال داخل حلقة إدراج العناصر:
--   INSERT INTO order_items (order_id, product_id, quantity, unit_price, color, size, ...)
--   VALUES (..., (item->>'color'), (item->>'size'), ...);

-- 3) جدول أسعار التوصيل حسب الولاية
CREATE TABLE IF NOT EXISTS public.wilaya_shipping (
  wilaya_id integer PRIMARY KEY REFERENCES public.wilayas(id) ON DELETE CASCADE,
  price numeric NOT NULL DEFAULT 400,
  free_shipping_from numeric DEFAULT 8000,
  estimated_min_days integer DEFAULT 2,
  estimated_max_days integer DEFAULT 5
);

-- 4) ملء صف لكل ولاية إن لم يكن موجوداً
INSERT INTO public.wilaya_shipping (wilaya_id, price, free_shipping_from)
SELECT w.id, 400, 8000
FROM public.wilayas w
WHERE NOT EXISTS (
  SELECT 1 FROM public.wilaya_shipping ws WHERE ws.wilaya_id = w.id
);

-- 5) صلاحيات القراءة للزائر (إن لزم)
GRANT SELECT ON public.wilaya_shipping TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.wilaya_shipping TO authenticated;

-- 6) تحقق
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'order_items' AND column_name IN ('color','size');

SELECT count(*) AS wilaya_shipping_rows FROM public.wilaya_shipping;
