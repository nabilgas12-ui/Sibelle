-- Si Belle — ولايات + بلديات + أسعار التوصيل
-- نفّذي في Supabase SQL Editor

ALTER TABLE public.wilayas
  ADD COLUMN IF NOT EXISTS communes jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS active boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.wilaya_shipping (
  wilaya_id integer PRIMARY KEY REFERENCES public.wilayas(id) ON DELETE CASCADE,
  price numeric NOT NULL DEFAULT 400,
  free_shipping_from numeric DEFAULT 8000,
  estimated_min_days integer DEFAULT 2,
  estimated_max_days integer DEFAULT 5
);

INSERT INTO public.wilaya_shipping (wilaya_id, price, free_shipping_from)
SELECT w.id, 400, 8000 FROM public.wilayas w
WHERE NOT EXISTS (SELECT 1 FROM public.wilaya_shipping ws WHERE ws.wilaya_id = w.id);

-- صلاحيات الإدارة (authenticated admin عبر RLS الموجود)
GRANT SELECT ON public.wilayas TO anon, authenticated;
GRANT SELECT ON public.wilaya_shipping TO anon, authenticated;
