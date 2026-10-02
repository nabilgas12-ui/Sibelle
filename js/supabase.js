/* Si Belle — Supabase Client (Publishable key only — never put secret key here) */
const SUPABASE_URL = 'https://jmqyganibaayodsrdxxl.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_uQNyM0xU2Cam-aGlQIG-oA_SoetRiiC';

// Load supabase-js from CDN if not present
if (typeof window.supabase === 'undefined') {
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  s.async = false;
  document.head.appendChild(s);
}

// Wait for CDN then create client
function getSupabase() {
  if (window._sb) return window._sb;
  if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
    console.warn('Supabase SDK not loaded yet');
    return null;
  }
  window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage
    }
  });
  return window._sb;
}

async function waitForSupabase(maxMs) {
  maxMs = maxMs || 5000;
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const c = getSupabase();
    if (c) return c;
    await new Promise(r => setTimeout(r, 150));
  }
  return null;
}

// Helper: map DB product row to frontend shape used by app.js
function mapProduct(row) {
  if (!row) return null;
  const imgs = Array.isArray(row.images) ? row.images.filter(Boolean) : [];
  const main = row.image_url || imgs[0] || '';
  const allImages = imgs.length ? imgs : (main ? [main] : []);
  return {
    id: row.id,
    sku: row.sku,
    name: { ar: row.name_ar, fr: row.name_fr },
    category: row.category_id,
    categoryName: { ar: '', fr: '' }, // filled later if needed
    price: Number(row.price) || 0,
    oldPrice: row.old_price != null ? Number(row.old_price) : null,
    badge: row.badge_ar || row.badge_fr ? { ar: row.badge_ar || '', fr: row.badge_fr || '' } : null,
    image: main,
    images: allImages,
    icon: row.icon || '🛍️',
    desc: { ar: row.description_ar || '', fr: row.description_fr || '' },
    colors: Array.isArray(row.colors) ? row.colors : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    stock: Number(row.stock) || 0,
    featured: !!row.featured,
    active: row.active !== false,
    _raw: row
  };
}

// Map a DB category row to the frontend shape
function mapCategory(c) {
  return {
    id: c.id,
    name: { ar: c.name_ar, fr: c.name_fr },
    slug: c.slug,
    image: c.image_url || '',
    icon: c.icon || '',
    active: c.active,
    sort_order: c.sort_order,
    description: { ar: c.description_ar || '', fr: c.description_fr || '' },
    _raw: c
  };
}

// Lightweight poll: NO images, tiny payload — used only as a safety net
async function sbLoadProductsLight() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from('products')
    .select('id,stock,price,old_price,active,featured,colors,sizes,name_ar,name_fr,category_id,badge_ar,badge_fr,sort_order')
    .eq('active', true);
  if (error) return null;
  return data || [];
}

// Public data loaders
async function sbLoadProducts() {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('products')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });
  if (error) {
    console.error('products load error', error);
    return [];
  }
  return (data || []).map(mapProduct);
}

async function sbLoadCategories() {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('categories load error', error);
    return [];
  }
  return (data || []).map(mapCategory);
}

async function sbLoadWilayas() {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('wilayas')
    .select('id, code, name_ar, name_fr')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('wilayas load error', error);
    return [];
  }
  return data || [];
}

async function sbLoadPaymentMethods() {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('payment_methods')
    .select('*')
    .eq('enabled', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('payments load error', error);
    return [];
  }
  return data || [];
}

async function sbLoadStoreSettings() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from('store_settings').select('*').maybeSingle();
  if (error) {
    console.error('store_settings load error', error);
    return null;
  }
  return data;
}

async function sbLoadSiteContent() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from('site_content').select('*').maybeSingle();
  if (error) {
    console.error('site_content load error', error);
    return null;
  }
  return data;
}

async function sbLoadAnnouncement() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from('announcement_banners')
    .select('*')
    .eq('enabled', true)
    .order('sort_order', { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) return null;
  return data;
}

async function sbGetShippingQuote(wilayaId, subtotal) {
  const sb = getSupabase();
  if (!sb) return { shipping_cost: 400, estimated_min_days: 2, estimated_max_days: 5 };
  const { data, error } = await sb.rpc('get_shipping_quote', {
    p_wilaya_id: wilayaId,
    p_commune_id: null,
    p_subtotal: subtotal || 0
  });
  if (error) {
    console.error('shipping quote error', error);
    return { shipping_cost: 400, estimated_min_days: 2, estimated_max_days: 5 };
  }
  return data;
}

async function sbValidateCoupon(code, customerId, subtotal) {
  const sb = getSupabase();
  if (!sb) return { valid: false, message: 'Service unavailable' };
  const { data, error } = await sb.rpc('validate_coupon', {
    p_code: code,
    p_customer_id: customerId || null,
    p_subtotal: subtotal || 0
  });
  if (error) return { valid: false, message: error.message };
  return data;
}

async function sbCreateOrder(payload) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { data, error } = await sb.rpc('create_order', {
    p_customer_name: payload.customer_name,
    p_customer_phone: payload.customer_phone,
    p_customer_email: payload.customer_email || null,
    p_wilaya_id: payload.wilaya_id,
    p_commune: payload.commune,
    p_address: payload.address,
    p_delivery_type: payload.delivery_type || 'home',
    p_notes: payload.notes || null,
    p_payment_method_id: payload.payment_method_id,
    p_items: payload.items,
    p_coupon_code: payload.coupon_code || null
  });
  if (error) throw error;
  return data;
}

async function sbTrackOrder(orderNumber, phone) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { data, error } = await sb.rpc('track_order', {
    p_order_number: orderNumber,
    p_phone: phone
  });
  if (error) throw error;
  return data;
}

// Admin helpers (require authenticated staff session)
async function sbSignIn(email, password) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    const err = new Error(error.message || error.error_description || 'Login failed');
    err.code = error.code || error.status;
    err.name = error.name || 'AuthError';
    throw err;
  }
  return data;
}

async function sbSignOut() {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signOut();
}

async function sbGetSession() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data?.session || null;
}

async function sbGetProfile() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data, error } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) return null;
  return data;
}


// ---------- Admin CMS / Settings (Supabase) ----------
async function sbLoadInvoiceSettings() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from('invoice_settings').select('*').maybeSingle();
  if (error) { console.error(error); return null; }
  return data;
}

async function sbLoadLegalPages() {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('legal_pages').select('*').order('sort_order');
  if (error) { console.error(error); return []; }
  return data || [];
}

async function sbLoadStaffProfiles() {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('profiles').select('*').order('created_at');
  if (error) { console.error(error); return []; }
  return data || [];
}

async function sbUpsertSiteContent(payload) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { data, error } = await sb.from('site_content').upsert({ id: true, ...payload }).select().maybeSingle();
  if (error) throw error;
  return data;
}

async function sbUpsertStoreSettings(payload) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { data, error } = await sb.from('store_settings').upsert({ id: true, ...payload }).select().maybeSingle();
  if (error) throw error;
  return data;
}

async function sbUpsertInvoiceSettings(payload) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { data, error } = await sb.from('invoice_settings').upsert({ id: true, ...payload }).select().maybeSingle();
  if (error) throw error;
  return data;
}

async function sbSaveAnnouncement(text_ar, text_fr, enabled) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  // update first banner or insert
  const { data: existing } = await sb.from('announcement_banners').select('id').order('sort_order').limit(1).maybeSingle();
  if (existing && existing.id) {
    const { error } = await sb.from('announcement_banners').update({
      text_ar: text_ar || '', text_fr: text_fr || '', enabled: !!enabled
    }).eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await sb.from('announcement_banners').insert({
      text_ar: text_ar || ' ', text_fr: text_fr || ' ', enabled: !!enabled, sort_order: 0
    });
    if (error) throw error;
  }
}

async function sbUpsertLegalPage(type, title_ar, title_fr, content_ar, content_fr) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { error } = await sb.from('legal_pages').upsert({
    id: type, type, title_ar, title_fr, content_ar, content_fr, enabled: true
  });
  if (error) throw error;
}

async function sbUpsertPaymentMethod(row) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { error } = await sb.from('payment_methods').upsert({
    id: row.id,
    enabled: row.enabled !== false,
    name_ar: row.name?.ar || row.id,
    name_fr: row.name?.fr || row.id,
    description_ar: row.desc?.ar || '',
    description_fr: row.desc?.fr || '',
    details: row.details || '',
    sort_order: row.sort_order || 0
  });
  if (error) throw error;
}

async function sbDeletePaymentMethod(id) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not ready');
  const { error } = await sb.from('payment_methods').delete().eq('id', id);
  if (error) throw error;
}

window.SiBelleSB = {
  getSupabase,
  waitForSupabase,
  mapProduct,
  mapCategory,
  loadProductsLight: sbLoadProductsLight,
  loadProducts: sbLoadProducts,
  loadCategories: sbLoadCategories,
  loadWilayas: sbLoadWilayas,
  loadPaymentMethods: sbLoadPaymentMethods,
  loadStoreSettings: sbLoadStoreSettings,
  loadSiteContent: sbLoadSiteContent,
  loadAnnouncement: sbLoadAnnouncement,
  getShippingQuote: sbGetShippingQuote,
  validateCoupon: sbValidateCoupon,
  createOrder: sbCreateOrder,
  trackOrder: sbTrackOrder,
  signIn: sbSignIn,
  signOut: sbSignOut,
  getSession: sbGetSession,
  getProfile: sbGetProfile,
  loadInvoiceSettings: sbLoadInvoiceSettings,
  loadLegalPages: sbLoadLegalPages,
  loadStaffProfiles: sbLoadStaffProfiles,
  upsertSiteContent: sbUpsertSiteContent,
  upsertStoreSettings: sbUpsertStoreSettings,
  upsertInvoiceSettings: sbUpsertInvoiceSettings,
  saveAnnouncement: sbSaveAnnouncement,
  upsertLegalPage: sbUpsertLegalPage,
  upsertPaymentMethod: sbUpsertPaymentMethod,
  deletePaymentMethod: sbDeletePaymentMethod
};
