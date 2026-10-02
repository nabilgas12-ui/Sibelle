-- ============================================================
-- Si Belle — إصلاح create_order (gen_random_bytes schema)
-- pgcrypto مفعّل في schema extensions، لكن الدالة تبحث في public
-- نفّذي هذا كاملاً في SQL Editor ثم Run
-- ============================================================

-- 1) إصلاح search_path لكل نسخ create_order المحتملة
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT n.nspname AS schema_name, p.proname, pg_get_function_identity_arguments(p.oid) AS args
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE p.proname = 'create_order'
  LOOP
    EXECUTE format(
      'ALTER FUNCTION %I.%I(%s) SET search_path = public, extensions, pg_temp',
      r.schema_name, r.proname, r.args
    );
    RAISE NOTICE 'Fixed search_path on %.%(%)', r.schema_name, r.proname, r.args;
  END LOOP;
END $$;

-- 2) نفس الإصلاح لدوال أخرى قد تستخدم gen_random_bytes
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT n.nspname AS schema_name, p.proname, pg_get_function_identity_arguments(p.oid) AS args
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE p.proname IN ('create_order', 'track_order', 'generate_order_number')
  LOOP
    BEGIN
      EXECUTE format(
        'ALTER FUNCTION %I.%I(%s) SET search_path = public, extensions, pg_temp',
        r.schema_name, r.proname, r.args
      );
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Skip %.%: %', r.schema_name, r.proname, SQLERRM;
    END;
  END LOOP;
END $$;

-- 3) تحقق: هل create_order موجودة؟
SELECT
  n.nspname AS schema,
  p.proname AS function_name,
  pg_get_function_identity_arguments(p.oid) AS arguments
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.proname = 'create_order';

-- 4) اختبار gen_random_bytes عبر search_path
SET search_path TO public, extensions;
SELECT gen_random_bytes(4) AS bytes_ok, gen_random_uuid() AS uuid_ok;
