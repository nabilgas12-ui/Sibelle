# Si Belle — ربط الواجهة بالـ Backend (Supabase)

## ما تم إنجازه

تم ربط **الموقع** و **لوحة التحكم** بمشروع Supabase الخاص بك:

| العنصر | القيمة |
|--------|--------|
| Project URL | `https://jmqyganibaayodsrdxxl.supabase.co` |
| Publishable key | `sb_publishable_uQNyM0xU2Cam-aGlQIG-oA_SoetRiiC` |
| Secret key | **لا يُستخدم في الواجهة أبداً** (للخادم فقط) |

### الملفات الجديدة / المعدّلة

- `js/supabase.js` — عميل Supabase + دوال التحميل و RPC
- `js/app.js` — تحميل المنتجات من الجدول `products` + تتبع الطلب عبر `track_order`
- `checkout.html` — إنشاء الطلب عبر RPC `create_order`
- `admin/js/admin.js` — تسجيل الدخول عبر Supabase Auth + قراءة/تعديل الطلبات والمنتجات من قاعدة البيانات
- إضافة سكربتات CDN في الصفحات

---

## خطوات التشغيل الإلزامية

### 1) تنفيذ الـ SQL (إن لم يكن منفّذاً)

1. افتح [Supabase Dashboard](https://supabase.com/dashboard) → مشروعك  
2. **SQL Editor** → الصق محتوى `si_belle_backend_FINAL_V4.sql` → **Run**

### 2) إنشاء أول مستخدم Admin

1. **Authentication → Users → Add user**  
   - أدخل بريدك وكلمة مرور  
2. انسخ **User UID**  
3. في SQL Editor نفّذ:

```sql
update public.profiles
set role = 'admin', active = true
where id = 'الصق-الـ-UUID-هنا';
```

### 3) اختبار الموقع

- افتح `index.html` / `shop.html` — يجب أن تظهر المنتجات من الجدول `products` (أضف منتجات من اللوحة إن كانت فارغة).
- أكمل طلب تجريبي من `checkout.html` — يُستدعى `create_order`.
- تتبّع الطلب برقم الطلب + رقم الهاتف.

### 4) اختبار لوحة التحكم

- افتح `admin/index.html`
- سجّل الدخول بالبريد وكلمة المرور اللذين أنشأتهما في Auth
- يجب أن تظهر الطلبات والمنتجات من قاعدة البيانات

---

## ملاحظات مهمة

1. **المفتاح السري (`sb_secret_...`) لا يوضع أبداً في كود المتصفح.** استخدم فقط الـ publishable key.
2. السياسات (RLS) تمنع الزائر العادي من الكتابة على الجداول الحساسة؛ الإدارة تتم عبر مستخدم مسجّل له دور `admin` / `manager` / `staff`.
3. رفع الصور إلى Storage يحتاج صلاحية `media.manage`؛ حالياً يمكن لصق رابط صورة مباشرة في حقل الصورة.
4. إذا ظهرت أخطاء CORS أو "Failed to fetch"، تأكد أن المشروع مفعّل وأن الـ URL صحيح.
5. حالات الطلب في القاعدة:  
   `pending | confirmed | preparing | ready | shipped | delivered | cancelled | returned`  
   اللوحة تعرضها بشكل موحّد.

---

## إضافة منتجات تجريبية سريعة (SQL)

```sql
insert into public.products (name_ar, name_fr, category_id, price, old_price, stock, active, featured, image_url, sort_order)
values
('حجاب حريري أنيق', 'Hijab soyeux élégant', 'hijab', 2500, 3200, 40, true, true, null, 1),
('طقم خروج كلاسيك', 'Ensemble sortie classique', 'ensemble', 6500, null, 22, true, true, null, 2),
('جبة منزلية مريحة', 'Djellaba maison confortable', 'home', 3800, 4500, 17, true, false, null, 3);
```

بعد الإدراج أعد تحميل الصفحة الرئيسية.
'''


---

## إصلاح خطأ الطلب: `gen_random_bytes does not exist`

إذا ظهر عند تأكيد الطلب:

```
function gen_random_bytes(integer) does not exist
```

1. افتحي **Supabase → SQL Editor**
2. نفّذي محتوى الملف `FIX_ORDER.sql` (أو الأمر التالي فقط):

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
```

3. أعيدي تحميل صفحة الدفع وجربي الطلب من جديد.

---

## التحديث الفوري (Realtime) — لوحة التحكم + المتجر

تم تفعيل تحديث تلقائي فوري بدون ريفريش في:

- **لوحة التحكم**: أعداد الطلبات، الرئيسية (Dashboard)، قائمة الطلبات، المنتجات، التصنيفات، شارة الطلبات في القائمة الجانبية
- **المتجر**: المنتجات، التصنيفات، الرئيسية، صفحة المتجر

### كيف يعمل؟

1. **Supabase Realtime** — عند أي تغيير في الجداول `orders` / `order_items` / `products` / `categories` يصل التحديث فوراً
2. **Polling احتياطي** — كل 12 ثانية في اللوحة و 20 ثانية في المتجر (يعمل حتى لو كان Realtime غير مفعّل)

### تفعيل Realtime في Supabase (مهم للتحديث الفوري)

1. افتح [Supabase Dashboard](https://supabase.com/dashboard) → مشروعك
2. **Database → Publications** (أو **Replication**)
3. تأكد أن الجداول التالية ضمن `supabase_realtime`:
   - `orders`
   - `order_items`
   - `products`
   - `categories`

أو نفّذ في **SQL Editor**:

```sql
-- تفعيل Realtime للجداول الأساسية
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.order_items;
alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.categories;
```

> إذا ظهر خطأ "already member of publication" فهذا يعني أنها مفعّلة مسبقاً — لا مشكلة.

### ملاحظات

- التحديث يعمل فقط والصفحة مفتوحة (لا يعمل في الخلفية بعد إغلاق التبويب)
- عند فتح Console في المتصفح يجب أن ترى: `[SiBelle] Realtime connected` أو `[SiBelle Store] Realtime connected`
- إذا لم يظهر Realtime، الـ polling يضمن التحديث خلال ثوانٍ قليلة


---

## ⚡ التحديث الفوري والسرعة (مهم — نفّذ مرة واحدة)

1. نفّذ الملف `REALTIME_AND_STORAGE.sql` كاملاً في **Supabase → SQL Editor**
   (يفعّل Realtime لكل الجداول + حاوية `product-images` للصور + فهارس).
2. افتح لوحة التحكم → **المنتجات** → اضغط **⚡ تسريع الصور** مرة واحدة
   (يضغط الصور القديمة المخزّنة base64 ويرفعها إلى Storage).
3. من الآن: أي صورة جديدة تُضغط تلقائياً (~100KB) وتُرفع إلى Storage.

### كيف يعمل التحديث الآن
- كل تعديل في اللوحة (كمية، سعر، اسم، صورة، تصنيف، إعلان، نصوص…) يصل المتجر عبر Realtime
  ويُطبَّق على الصفحة مباشرة **بدون إعادة جلب البيانات** وبدون ريفريش.
- الطلبات الجديدة تظهر في اللوحة فوراً مع تنبيه صوتي.
- إن انقطع Realtime يتحول الموقع تلقائياً إلى فحص خفيف كل 5 ثوانٍ (بدون صور).
- المتجر يحفظ نسخة محلية فيظهر المحتوى فوراً عند الزيارة التالية ثم يُحدَّث بالخلفية.
