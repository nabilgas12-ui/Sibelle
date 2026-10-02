-- ============================================================
-- أظهري تعريف create_order لمعرفة هل يحفظ color/size
-- ============================================================
SELECT pg_get_functiondef(p.oid)
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.proname = 'create_order';
