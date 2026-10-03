/* ============================================
   Si Belle — App Logic (Clean JS)
   ============================================ */

let products = []; // loaded from Supabase
let categoriesCache = [];
let productsReady = false;

/* ===== شريط الإعلان: مصدر الحقيقة = قاعدة البيانات (مع نسخة محلية لمنع الوميض) ===== */
const BANNER_KEY = 'siBelleBanner_v1';
let _bannerState = null;
try { _bannerState = JSON.parse(localStorage.getItem(BANNER_KEY) || 'null'); } catch (e) {}
function renderBanner() {
  const bar = document.querySelector('.header-top');
  if (!bar || !_bannerState) return;
  if (!_bannerState.on) { bar.style.display = 'none'; return; }
  bar.style.display = '';
  const lang = localStorage.getItem('siBelleLang') || 'ar';
  const txt = lang === 'fr' ? (_bannerState.fr || _bannerState.ar) : (_bannerState.ar || _bannerState.fr);
  if (txt) {
    document.querySelectorAll('[data-i18n="topBanner"]').forEach(function(el) {
      if (el.textContent !== txt) el.textContent = txt;
    });
  }
}
/** row: صف من القاعدة، أو null = لا يوجد شريط مفعّل */
function setBannerState(row) {
  const ar = row ? (row.text_ar || '') : '';
  const fr = row ? (row.text_fr || '') : '';
  const on = !!row && row.enabled !== false && !!((ar + fr).trim());
  _bannerState = { on: on, ar: ar.trim(), fr: fr.trim() };
  try { localStorage.setItem(BANNER_KEY, JSON.stringify(_bannerState)); } catch (e) {}
  renderBanner();
}
let _bannerFetchTimer = null;
function refreshBanner(delay) {
  if (_bannerFetchTimer) clearTimeout(_bannerFetchTimer);
  _bannerFetchTimer = setTimeout(async function() {
    _bannerFetchTimer = null;
    try {
      if (typeof SiBelleSB === 'undefined') return;
      const ann = await SiBelleSB.loadAnnouncement();
      if (ann !== undefined) setBannerState(ann);
    } catch (e) {}
  }, delay || 0);
}
function onBannerChange(payload) {
  if (payload.eventType === 'DELETE') setBannerState(null);
  else if (payload.new) setBannerState(payload.new);   // فوري
  refreshBanner(300);                                  // ثم مطابقة مع القاعدة
}
renderBanner(); // ارسم من النسخة المحلية فوراً (قبل أي طلب شبكة)

/* ===== STORE LIVE UPDATES (Realtime + fast poll) ===== */
let _storeRtChannel = null;
let _storePollTimer = null;
let _storeLiveBusy = false;
let _storeProductsSig = '';
let _storeCatsSig = '';
let _storeSyncDebounce = null;
let _storeRtRetryTimer = null;

/** Deep signature so ANY change (size L stock, color stock, price, name, badge…) triggers UI refresh */
function _storeSigProducts(list) {
  if (!list || !list.length) return '0';
  return list.length + '|' + list.map(function(p) {
    var colorSig = '';
    try {
      colorSig = JSON.stringify(p.colors || []);
    } catch (e) { colorSig = ''; }
    var sizeSig = '';
    try {
      sizeSig = JSON.stringify(p.sizes || []);
    } catch (e) { sizeSig = ''; }
    var nameAr = (p.name && p.name.ar) || '';
    var nameFr = (p.name && p.name.fr) || '';
    var badge = p.badge ? ((p.badge.ar || '') + '|' + (p.badge.fr || '')) : '';
    return [
      p.id || '',
      p.stock || 0,
      p.price || 0,
      p.oldPrice || 0,
      p.featured ? 1 : 0,
      p.active === false ? 0 : 1,
      nameAr,
      nameFr,
      badge,
      p.image || '',
      p.category || '',
      colorSig,
      sizeSig
    ].join(':');
  }).join('||');
}
function _storeSigCats(list) {
  if (!list || !list.length) return '0';
  return list.length + '|' + list.map(function(c) {
    var n = c.name || {};
    return (c.id || '') + ':' + (c.active !== false ? 1 : 0) + ':' + (n.ar || '') + ':' + (n.fr || '') + ':' + (c.image || '');
  }).join(',');
}

/** Refresh open product modal so size/color stock updates live without closing it */
function refreshOpenProductModal() {
  try {
    var modal = document.getElementById('productModal');
    if (!modal || !modal.classList.contains('open')) return;
    if (typeof modalState === 'undefined' || modalState.productId == null) return;
    var p = products.find(function(x) {
      return x.id === modalState.productId || String(x.id) === String(modalState.productId);
    });
    if (!p) {
      if (typeof closeProductModal === 'function') closeProductModal();
      else modal.classList.remove('open');
      return;
    }
    var colors = (p.colors && p.colors.length) ? p.colors : [{ name: { ar: 'افتراضي', fr: 'Défaut' } }];
    var sizes = (p.sizes && p.sizes.length) ? p.sizes : [{ name: 'Standard' }];
    if (modalState.colorIdx >= colors.length) modalState.colorIdx = 0;
    if (modalState.sizeIdx >= sizes.length) modalState.sizeIdx = 0;

    // Rebuild color buttons with latest stock
    var colorWrap = document.getElementById('modalColors');
    if (colorWrap && typeof colorName === 'function' && typeof getColorTotalStock === 'function') {
      colorWrap.innerHTML = colors.map(function(c, ci) {
        var total = getColorTotalStock(p, ci);
        var label = colorName(c, currentLang);
        var isActive = ci === modalState.colorIdx;
        return '<button type="button" class="modal-option ' + (isActive ? 'active' : '') + (total <= 0 ? ' out' : '') + '"' +
          (total <= 0 ? ' disabled aria-disabled="true"' : ' onclick="selectColor(' + ci + ')"') + '>' + label + '</button>';
      }).join('');
    }

    // Rebuild size buttons for current color with latest stock
    var sizeWrap = document.getElementById('modalSizes');
    if (sizeWrap && typeof sizeName === 'function' && typeof getVariantStock === 'function') {
      // If current size is now 0, switch to first available
      if (getVariantStock(p, modalState.colorIdx, modalState.sizeIdx) <= 0) {
        for (var si = 0; si < sizes.length; si++) {
          if (getVariantStock(p, modalState.colorIdx, si) > 0) {
            modalState.sizeIdx = si;
            break;
          }
        }
      }
      sizeWrap.innerHTML = sizes.map(function(s, si) {
        var st = getVariantStock(p, modalState.colorIdx, si);
        var label = sizeName(s);
        var isActive = si === modalState.sizeIdx;
        return '<button type="button" class="modal-option ' + (isActive ? 'active' : '') + (st <= 0 ? ' out' : '') + '"' +
          (st <= 0 ? ' disabled aria-disabled="true"' : ' onclick="selectSize(' + si + ')"') + '>' + label + '</button>';
      }).join('');
    }

    if (typeof updateModalStock === 'function') updateModalStock();
  } catch (e) {
    console.warn('refreshOpenProductModal', e);
  }
}

function applyStoreDataToUI(skipSanitize) {
  // Remove cart lines for products that no longer exist → fixes phantom badge count
  if (!skipSanitize && typeof sanitizeCart === 'function') sanitizeCart();
  if (typeof updateCartUI === 'function') updateCartUI();
  if (typeof renderCartItems === 'function') renderCartItems();
  // Drop wishlist ids for deleted products
  if (typeof wishlist !== 'undefined' && Array.isArray(wishlist) && products.length) {
    const before = wishlist.length;
    wishlist = wishlist.filter(function(id) {
      return products.some(function(p) { return p.id === id || String(p.id) === String(id); });
    });
    if (wishlist.length !== before && typeof saveWishlist === 'function') saveWishlist();
  }
  if (typeof updateWishlistUI === 'function') updateWishlistUI();
  if (typeof renderProducts === 'function') renderProducts();
  if (typeof renderFeatured === 'function') renderFeatured();
  if (typeof renderHomeCategories === 'function') renderHomeCategories();
  if (typeof renderShopFilters === 'function') renderShopFilters();
  if (typeof renderFooterCategories === 'function') renderFooterCategories();
  // Live-refresh product detail modal (quantity / size availability)
  refreshOpenProductModal();
}

async function loadStoreData(opts) {
  opts = opts || {};
  if (typeof SiBelleSB === 'undefined') {
    console.warn('SiBelleSB not available, keeping empty products');
    productsReady = true;
    return;
  }
  try {
    const [prods, cats] = await Promise.all([
      SiBelleSB.loadProducts(),
      SiBelleSB.loadCategories()
    ]);
    const nextProds = prods || [];
    const nextCats = (cats || []).filter(function(c) { return c.active !== false; });
    const catMap = {};
    nextCats.forEach(function(c) { catMap[c.id] = c.name; });
    nextProds.forEach(function(p) {
      if (catMap[p.category]) p.categoryName = catMap[p.category];
    });

    const nextPSig = _storeSigProducts(nextProds);
    const nextCSig = _storeSigCats(nextCats);
    const changed = opts.force || nextPSig !== _storeProductsSig || nextCSig !== _storeCatsSig;

    products = nextProds;
    categoriesCache = nextCats;
    _storeProductsSig = nextPSig;
    _storeCatsSig = nextCSig;
    productsReady = true;

    if (changed) {
      applyStoreDataToUI();
      saveStoreCache();
      if (!opts.skipCms) await applyCmsFromBackend();
    }
  } catch (e) {
    console.error('Failed to load store data', e);
    productsReady = true;
  }
}

/* ---------- Local cache: instant first paint on repeat visits ---------- */
const STORE_CACHE_KEY = 'siBelleStoreCache_v2';
let _storeCacheTimer = null;

function _slimRow(row) {
  if (!row) return row;
  const r = Object.assign({}, row);
  // never persist huge legacy base64 images (would blow the localStorage quota)
  const big = function(u) { return typeof u === 'string' && u.indexOf('data:') === 0 && u.length > 40000; };
  if (big(r.image_url)) r.image_url = null;
  if (Array.isArray(r.images)) r.images = r.images.filter(function(u) { return !big(u); });
  return r;
}
function saveStoreCache() {
  if (_storeCacheTimer) clearTimeout(_storeCacheTimer);
  _storeCacheTimer = setTimeout(function() {
    try {
      localStorage.setItem(STORE_CACHE_KEY, JSON.stringify({
        t: Date.now(),
        p: products.map(function(x) { return _slimRow(x._raw); }).filter(Boolean),
        c: categoriesCache.map(function(x) { return x._raw; }).filter(Boolean)
      }));
    } catch (e) { /* quota / private mode — ignore */ }
  }, 800);
}
function hydrateStoreFromCache() {
  try {
    if (typeof SiBelleSB === 'undefined' || !SiBelleSB.mapProduct) return false;
    const raw = localStorage.getItem(STORE_CACHE_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    if (!d || !Array.isArray(d.p) || !d.p.length) return false;
    const cats = (d.c || []).map(SiBelleSB.mapCategory).filter(function(c) { return c.active !== false; });
    const catMap = {};
    cats.forEach(function(c) { catMap[c.id] = c.name; });
    const prods = d.p.map(SiBelleSB.mapProduct);
    prods.forEach(function(p) { if (catMap[p.category]) p.categoryName = catMap[p.category]; });
    products = prods;
    categoriesCache = cats;
    _storeProductsSig = _storeSigProducts(prods);
    _storeCatsSig = _storeSigCats(cats);
    applyStoreDataToUI(true); // do NOT sanitize cart from possibly-stale cache
    return true;
  } catch (e) { return false; }
}

/* ---------- Instant, incremental updates from Realtime payloads ---------- */
let _storeUiRaf = null;
function _scheduleUiApply() {
  if (_storeUiRaf) return;
  _storeUiRaf = requestAnimationFrame(function() {
    _storeUiRaf = null;
    _storeProductsSig = _storeSigProducts(products);
    _storeCatsSig = _storeSigCats(categoriesCache);
    applyStoreDataToUI();
    saveStoreCache();
  });
}
function _sortProducts() {
  products.sort(function(a, b) {
    const ra = a._raw || {}, rb = b._raw || {};
    const d = (Number(ra.sort_order) || 0) - (Number(rb.sort_order) || 0);
    if (d) return d;
    return Number(a.id) - Number(b.id) || String(a.id).localeCompare(String(b.id));
  });
}
function _attachCatName(p) {
  const c = categoriesCache.find(function(x) { return x.id === p.category; });
  if (c) p.categoryName = c.name;
}
async function _fetchRow(table, id) {
  try {
    const sb = SiBelleSB.getSupabase();
    const { data } = await sb.from(table).select('*').eq('id', id).maybeSingle();
    return data || null;
  } catch (e) { return null; }
}

async function onProductChange(payload) {
  const type = payload.eventType;
  if (type === 'DELETE') {
    const id = payload.old && payload.old.id;
    products = products.filter(function(p) { return String(p.id) !== String(id); });
    return _scheduleUiApply();
  }
  let nw = payload.new;
  if (!nw || nw.id == null) return scheduleStoreLiveSync();
  const prev = products.find(function(p) { return String(p.id) === String(nw.id); });
  // Large/unchanged columns may be omitted from the payload → merge over what we already have
  let merged = Object.assign({}, prev && prev._raw ? prev._raw : {}, nw);
  if (!prev || merged.name_ar === undefined) {
    const full = await _fetchRow('products', nw.id);
    if (full) merged = full;
  }
  if (merged.active === false) {
    products = products.filter(function(p) { return String(p.id) !== String(nw.id); });
    return _scheduleUiApply();
  }
  const mapped = SiBelleSB.mapProduct(merged);
  _attachCatName(mapped);
  if (prev) products = products.map(function(p) { return p === prev ? mapped : p; });
  else products.push(mapped);
  _sortProducts();
  _scheduleUiApply();
}

async function onCategoryChange(payload) {
  const type = payload.eventType;
  if (type === 'DELETE') {
    const id = payload.old && payload.old.id;
    categoriesCache = categoriesCache.filter(function(c) { return c.id !== id; });
    return _scheduleUiApply();
  }
  const nw = payload.new;
  if (!nw || nw.id == null) return scheduleStoreLiveSync();
  const prev = categoriesCache.find(function(c) { return c.id === nw.id; });
  const merged = Object.assign({}, prev && prev._raw ? prev._raw : {}, nw);
  categoriesCache = categoriesCache.filter(function(c) { return c.id !== nw.id; });
  if (merged.active !== false) {
    categoriesCache.push(SiBelleSB.mapCategory(merged));
    categoriesCache.sort(function(a, b) { return (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0); });
  }
  products.forEach(_attachCatName);
  _scheduleUiApply();
}

let _cmsDebounce = null;
function scheduleCmsSync() {
  if (_cmsDebounce) clearTimeout(_cmsDebounce);
  _cmsDebounce = setTimeout(function() { _cmsDebounce = null; applyCmsFromBackend(); }, 200);
}

/* ---------- Safety-net sync (only if Realtime is down or missed an event) ---------- */
async function storeLiveSync() {
  if (_storeLiveBusy || document.hidden) return;
  _storeLiveBusy = true;
  try {
    await loadStoreData({ skipCms: true });
  } catch (e) {
    console.warn('storeLiveSync', e);
  } finally {
    _storeLiveBusy = false;
  }
}
/** Debounced full reload — used only as a fallback */
function scheduleStoreLiveSync() {
  if (_storeSyncDebounce) clearTimeout(_storeSyncDebounce);
  _storeSyncDebounce = setTimeout(function() {
    _storeSyncDebounce = null;
    storeLiveSync();
  }, 250);
}
/** Tiny poll (no images). Triggers a full reload only when something really differs. */
async function storeLightPoll() {
  if (document.hidden || _storeLiveBusy || typeof SiBelleSB === 'undefined') return;
  refreshBanner(0);
  try {
    const rows = await SiBelleSB.loadProductsLight();
    if (!rows) return;
    const cur = new Map(products.map(function(p) { return [String(p.id), p]; }));
    let needFull = rows.length !== products.length;
    if (!needFull) {
      const J = function(v) { return JSON.stringify(v || []); };
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i], p = cur.get(String(r.id));
        if (!p) { needFull = true; break; }
        const q = p._raw || {};
        if (Number(q.stock) !== Number(r.stock) || Number(q.price) !== Number(r.price) ||
            Number(q.old_price || 0) !== Number(r.old_price || 0) || !!q.featured !== !!r.featured ||
            q.name_ar !== r.name_ar || q.name_fr !== r.name_fr || q.category_id !== r.category_id ||
            (q.badge_ar || '') !== (r.badge_ar || '') || (q.badge_fr || '') !== (r.badge_fr || '') ||
            J(q.colors) !== J(r.colors) || J(q.sizes) !== J(r.sizes)) { needFull = true; break; }
      }
    }
    if (needFull) await storeLiveSync();
  } catch (e) { console.warn('storeLightPoll', e); }
}

let _storeRtOk = false;
let _storeVisBound = false;
function _setStorePoll(ms) {
  if (_storePollTimer) clearInterval(_storePollTimer);
  _storePollTimer = setInterval(storeLightPoll, ms);
}

function startStoreLiveUpdates() {
  stopStoreLiveUpdates();
  _storeRtOk = false;
  function attachRealtime() {
    try {
      const sb = window.SiBelleSB && window.SiBelleSB.getSupabase && window.SiBelleSB.getSupabase();
      if (!sb || typeof sb.channel !== 'function') {
        _storeRtRetryTimer = setTimeout(attachRealtime, 600);
        return;
      }
      _storeRtChannel = sb.channel('store-live')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, onProductChange)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, onCategoryChange)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'store_settings' }, scheduleCmsSync)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, scheduleCmsSync)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'announcement_banners' }, onBannerChange)
        .subscribe(function(status) {
          if (status === 'SUBSCRIBED') {
            console.log('[SiBelle Store] Realtime connected');
            const wasDown = !_storeRtOk;
            _storeRtOk = true;
            _setStorePoll(45000);      // realtime is healthy → rare safety poll
            if (wasDown) storeLightPoll(); // catch anything missed while connecting/reconnecting
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            console.warn('[SiBelle Store] Realtime status:', status, '— fast fallback poll');
            _storeRtOk = false;
            _setStorePoll(5000);       // realtime down → light poll every 5s
          }
        });
    } catch (e) {
      console.warn('Store Realtime setup failed, polling only', e);
      _setStorePoll(5000);
    }
  }
  attachRealtime();
  // Until Realtime confirms, poll quickly (cheap, no images)
  _setStorePoll(5000);

  if (!_storeVisBound) {
    _storeVisBound = true;
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) storeLightPoll();
    });
    window.addEventListener('online', function() { scheduleStoreLiveSync(); });
  }
}

function stopStoreLiveUpdates() {
  if (_storePollTimer) {
    clearInterval(_storePollTimer);
    _storePollTimer = null;
  }
  if (_storeSyncDebounce) {
    clearTimeout(_storeSyncDebounce);
    _storeSyncDebounce = null;
  }
  if (_storeRtRetryTimer) {
    clearTimeout(_storeRtRetryTimer);
    _storeRtRetryTimer = null;
  }
  if (_storeRtChannel) {
    try {
      const sb = window.SiBelleSB && window.SiBelleSB.getSupabase && window.SiBelleSB.getSupabase();
      if (sb) sb.removeChannel(_storeRtChannel);
    } catch (e) {}
    _storeRtChannel = null;
  }
}

// Boot: paint from cache instantly → fetch fresh data + CMS in parallel → go live
async function bootStoreData() {
  hydrateStoreFromCache();
  await Promise.all([
    loadStoreData({ force: true, skipCms: true }),
    applyCmsFromBackend()
  ]);
  startStoreLiveUpdates();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootStoreData);
} else {
  bootStoreData();
}



const translations = {
  ar: {
    dir: "rtl",
    topBanner: "🚚 توصيل سريع إلى جميع ولايات الجزائر • دفع عند الاستلام متاح",
    navHome: "الرئيسية", navShop: "المتجر", navAbout: "من نحن", navContact: "اتصل بنا",
    searchPlaceholder: "بحث...",
    heroTitle: "أناقتك تبدأ من هنا", heroSubtitle: "Si Belle",
    heroDesc: "اكتشفي مجموعتنا من الملابس الأنيقة: حجابات، إنسمبل، ملابس منزلية، وجبة العيد والعبايات.",
    btnShop: "تسوقي الآن", btnDiscover: "اكتشفي المجموعة",
    catTitle: "تصنيفاتنا", catSubtitle: "اختاري ما يناسب أسلوبكِ",
    catHijab: "حجابات", catHijabDesc: "حجابات أنيقة بكل الألوان",
    catEnsemble: "إنسمبل", catEnsembleDesc: "أطقم خروج راقية ومريحة",
    catHome: "ملابس منزلية", catHomeDesc: "جبة وبيجامة للراحة التامة",
    catOccasion: "مناسبات", catOccasionDesc: "جبة العيد والعبايات الفاخرة",
    featuredTitle: "منتجات مميزة", featuredSubtitle: "الأكثر طلباً من Si Belle",
    allProducts: "كل المنتجات", addToCart: "أضيفي للسلة", viewDetails: "التفاصيل",
    cartTitle: "سلة التسوق", cartEmpty: "سلتك فارغة", cartEmptyDesc: "أضيفي منتجاتك المفضلة",
    total: "المجموع", checkout: "إتمام الطلب", continueShopping: "متابعة التسوق", remove: "إزالة",
    shopTitle: "المتجر", filterAll: "الكل", filterHijab: "حجابات", filterEnsemble: "إنسمبل",
    filterHome: "منزلية", filterOccasion: "مناسبات",
    aboutTitle: "من نحن",
    aboutP1: "سي بيل هي علامة جزائرية متخصصة في الملابس النسائية الأنيقة والمريحة.",
    aboutP2: "نبدأ بمجموعة مختارة من الحجابات والإنسمبل والملابس المنزلية، وسنوسع نحو جبة العيد والعبايات.",
    aboutP3: "هدفنا تقديم تجربة تسوق سلسة مع توصيل موثوق في كل الجزائر.",
    feature1: "جودة راقية", feature1Desc: "أقمشة مختارة وتصاميم عصرية",
    feature2: "توصيل سريع", feature2Desc: "إلى جميع ولايات الجزائر",
    feature3: "دفع مريح", feature3Desc: "الدفع عند الاستلام متاح",
    feature4: "دعم محلي", feature4Desc: "فريق جزائري جاهز لمساعدتكِ",
    contactTitle: "اتصل بنا", contactDesc: "نحن هنا للإجابة على أسئلتكِ",
    formName: "الاسم الكامل", formPhone: "رقم الهاتف", formWilaya: "الولاية",
    formAddress: "العنوان التفصيلي", formEmail: "البريد الإلكتروني", formNotes: "ملاحظات",
    formSubmit: "تأكيد الطلب", orderSummary: "ملخص الطلب",
    payment: "طريقة الدفع", payCod: "الدفع عند الاستلام", payCcp: "تحويل بريدي / CCP", payBaridi: "Baridi Mob",
    shipping: "التوصيل", shippingFree: "التوصيل مجاني فوق 8000 دج",
    trackOrder: "تتبع طلبي", trackDesc: "أدخلي رقم الطلب (مثال: SB-20260928-4821)", trackSearch: "بحث",
    trackNotFound: "لم يتم العثور على هذا الطلب", trackFound: "حالة طلبكِ",
    statusConfirmed: "تم تأكيد الطلب", statusPrep: "قيد التحضير", statusShipped: "تم الشحن", statusDelivered: "تم التسليم",
    successTitle: "تم استلام طلبكِ بنجاح!", successDesc: "سنتصل بكِ قريباً لتأكيد الطلب والتوصيل. شكراً لثقتكِ بـ Si Belle ❤️",
    backHome: "العودة للرئيسية",
    footerDesc: "علامة جزائرية للملابس النسائية الأنيقة والمريحة.",
    footerLinks: "روابط سريعة", footerCats: "التصنيفات", footerContact: "تواصل معنا",
    footerRights: "© 2026 Si Belle — جميع الحقوق محفوظة",
    currency: "دج", addedToCart: "أُضيف للسلة ✓", qty: "الكمية",
    privacyTitle: "سياسة الخصوصية", termsTitle: "الشروط والأحكام",
    footerLegal: "قانوني", footerCountry: "الجزائر"
  },
  fr: {
    dir: "ltr",
    topBanner: "🚚 Livraison rapide dans toutes les wilayas d'Algérie • Paiement à la livraison disponible",
    navHome: "Accueil", navShop: "Boutique", navAbout: "À propos", navContact: "Contact",
    searchPlaceholder: "Rechercher...",
    heroTitle: "Votre élégance commence ici", heroSubtitle: "Si Belle",
    heroDesc: "Découvrez notre collection : hijabs, ensembles, tenues d'intérieur, djellabas d'Aïd et abayas.",
    btnShop: "Acheter maintenant", btnDiscover: "Découvrir la collection",
    catTitle: "Nos catégories", catSubtitle: "Choisissez ce qui vous ressemble",
    catHijab: "Hijabs", catHijabDesc: "Hijabs élégants de toutes couleurs",
    catEnsemble: "Ensembles", catEnsembleDesc: "Ensembles de sortie raffinés et confortables",
    catHome: "Vêtements d'intérieur", catHomeDesc: "Djellabas et pyjamas pour un confort total",
    catOccasion: "Occasions", catOccasionDesc: "Djellabas d'Aïd et abayas luxueuses",
    featuredTitle: "Produits vedettes", featuredSubtitle: "Les plus demandés de Si Belle",
    allProducts: "Tous les produits", addToCart: "Ajouter au panier", viewDetails: "Détails",
    cartTitle: "Panier", cartEmpty: "Votre panier est vide", cartEmptyDesc: "Ajoutez vos articles préférés",
    total: "Total", checkout: "Commander", continueShopping: "Continuer vos achats", remove: "Supprimer",
    shopTitle: "Boutique", filterAll: "Tout", filterHijab: "Hijabs", filterEnsemble: "Ensembles",
    filterHome: "Intérieur", filterOccasion: "Occasions",
    aboutTitle: "À propos de nous",
    aboutP1: "Si Belle est une marque algérienne spécialisée dans les vêtements féminins élégants et confortables.",
    aboutP2: "Nous proposons hijabs, ensembles et vêtements d'intérieur, et élargirons vers les djellabas d'Aïd et abayas.",
    aboutP3: "Notre objectif : une expérience d'achat fluide avec livraison fiable dans toute l'Algérie.",
    feature1: "Qualité raffinée", feature1Desc: "Tissus sélectionnés et designs modernes",
    feature2: "Livraison rapide", feature2Desc: "Dans toutes les wilayas d'Algérie",
    feature3: "Paiement flexible", feature3Desc: "Paiement à la livraison disponible",
    feature4: "Support local", feature4Desc: "Une équipe algérienne à votre écoute",
    contactTitle: "Contactez-nous", contactDesc: "Nous sommes là pour répondre à vos questions",
    formName: "Nom complet", formPhone: "Numéro de téléphone", formWilaya: "Wilaya",
    formAddress: "Adresse détaillée", formEmail: "E-mail", formNotes: "Notes",
    formSubmit: "Confirmer la commande", orderSummary: "Récapitulatif",
    payment: "Mode de paiement", payCod: "Paiement à la livraison", payCcp: "Virement postal / CCP", payBaridi: "Baridi Mob",
    shipping: "Livraison", shippingFree: "Livraison gratuite au-delà de 8000 DA",
    trackOrder: "Suivre ma commande", trackDesc: "Entrez le N° de commande (ex: SB-20260928-4821)", trackSearch: "Rechercher",
    trackNotFound: "Commande introuvable", trackFound: "Statut de votre commande",
    statusConfirmed: "Commande confirmée", statusPrep: "En préparation", statusShipped: "Expédiée", statusDelivered: "Livrée",
    successTitle: "Commande reçue avec succès !", successDesc: "Nous vous contacterons bientôt. Merci de votre confiance ❤️",
    backHome: "Retour à l'accueil",
    footerDesc: "Marque algérienne de vêtements féminins élégants et confortables.",
    footerLinks: "Liens rapides", footerCats: "Catégories", footerContact: "Nous contacter",
    footerRights: "© 2026 Si Belle — Tous droits réservés",
    currency: "DA", addedToCart: "Ajouté au panier ✓", qty: "Qté",
    privacyTitle: "Politique de confidentialité", termsTitle: "Conditions générales",
    footerLegal: "Légal", footerCountry: "Algérie"
  }
};

let currentLang = localStorage.getItem('siBelleLang') || 'ar';
let cart = (function() {
  try {
    const raw = JSON.parse(localStorage.getItem('siBelleCart') || '[]');
    if (!Array.isArray(raw)) return [];
    return raw.filter(function(i) {
      return i && i.id != null && (Number(i.qty) || 0) > 0;
    });
  } catch (e) { return []; }
})();
let currentFilter = 'all';

/* ===== WISHLIST / FAVORITES ===== */
let wishlist = (function() {
  try {
    const raw = JSON.parse(localStorage.getItem('siBelleWishlist') || '[]');
    if (!Array.isArray(raw)) return [];
    return raw.filter(function(id) { return id != null; }).map(function(id) {
      return (typeof id === 'object' && id.id != null) ? id.id : id;
    });
  } catch (e) { return []; }
})();

function saveWishlist() {
  try { localStorage.setItem('siBelleWishlist', JSON.stringify(wishlist)); } catch (e) {}
}

function isInWishlist(id) {
  return wishlist.some(function(w) { return w === id || String(w) === String(id); });
}

function toggleWishlist(id, ev) {
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
  id = (typeof id === 'object' && id && id.id != null) ? id.id : id;
  if (isInWishlist(id)) {
    wishlist = wishlist.filter(function(w) { return w !== id && String(w) !== String(id); });
    showToast(currentLang === 'ar' ? 'أُزيل من المفضلة' : 'Retiré des favoris');
  } else {
    wishlist.push(id);
    showToast(currentLang === 'ar' ? 'أُضيف للمفضلة ♥' : 'Ajouté aux favoris ♥');
  }
  saveWishlist();
  updateWishlistUI();
  // refresh hearts on cards if present
  document.querySelectorAll('.wish-btn[data-id]').forEach(function(btn) {
    const bid = btn.getAttribute('data-id');
    const on = isInWishlist(bid) || isInWishlist(Number(bid));
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function updateWishlistUI() {
  const count = wishlist.length;
  document.querySelectorAll('.icon-btn[aria-label="Wishlist"] .wish-count, .wish-count').forEach(function(el) {
    // skip if this element is somehow also used as cart badge
    if (el.closest('.cart-btn') || el.closest('[aria-label="Cart"]')) return;
    if (count > 0) {
      el.textContent = String(count);
      el.classList.add('is-visible');
      el.style.setProperty('display', 'flex', 'important');
    } else {
      el.textContent = '';
      el.classList.remove('is-visible');
      el.style.setProperty('display', 'none', 'important');
    }
  });
  document.querySelectorAll('.icon-btn[aria-label="Wishlist"]').forEach(function(btn) {
    btn.classList.toggle('has-items', count > 0);
  });
}

function openWishlist() {
  let overlay = document.getElementById('wishOverlay');
  let drawer = document.getElementById('wishDrawer');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'wishOverlay';
    overlay.className = 'cart-overlay';
    overlay.onclick = closeWishlist;
    document.body.appendChild(overlay);
  }
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'wishDrawer';
    drawer.className = 'cart-drawer';
    document.body.appendChild(drawer);
  }
  renderWishlistItems();
  overlay.classList.add('open');
  drawer.classList.add('open');
}

function closeWishlist() {
  document.getElementById('wishOverlay')?.classList.remove('open');
  document.getElementById('wishDrawer')?.classList.remove('open');
}

function renderWishlistItems() {
  const drawer = document.getElementById('wishDrawer');
  if (!drawer) return;
  const title = currentLang === 'ar' ? 'المفضلة' : 'Favoris';
  const empty = currentLang === 'ar' ? 'لا توجد منتجات في المفضلة' : 'Aucun favori pour le moment';
  const emptyDesc = currentLang === 'ar' ? 'اضغطي ♥ على أي منتج لحفظه هنا' : 'Appuyez sur ♥ sur un produit pour l’enregistrer';
  const removeLbl = currentLang === 'ar' ? 'إزالة' : 'Retirer';
  const viewLbl = currentLang === 'ar' ? 'عرض' : 'Voir';

  let body = '';
  if (!wishlist.length) {
    body = '<div class="cart-empty"><div class="icon">♥</div><p>' + empty + '</p><p style="font-size:0.85rem;margin-top:6px">' + emptyDesc + '</p></div>';
  } else {
    body = wishlist.map(function(id) {
      const p = products.find(function(x) { return x.id === id || String(x.id) === String(id); });
      if (!p) return '';
      const img = p.image ? '<img src="' + p.image + '" alt="">' : (p.icon || '🛍️');
      return '<div class="cart-item">' +
        '<div class="cart-item-img">' + img + '</div>' +
        '<div class="cart-item-info">' +
          '<h4>' + (p.name[currentLang] || '') + '</h4>' +
          '<div class="price">' + (p.price || 0).toLocaleString() + ' ' + t('currency') + '</div>' +
          '<div class="cart-item-qty" style="gap:8px">' +
            '<button class="btn btn-primary btn-sm" onclick="closeWishlist(); openProductModal(' + p.id + ')">' + viewLbl + '</button>' +
            '<button onclick="toggleWishlist(' + p.id + '); renderWishlistItems();" style="color:#c0392b;font-size:0.8rem">' + removeLbl + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  drawer.innerHTML =
    '<div class="cart-header">' +
      '<h3>' + title + ' <span style="color:var(--pink-deep)">♥</span></h3>' +
      '<button class="cart-close" onclick="closeWishlist()">×</button>' +
    '</div>' +
    '<div class="cart-items" id="wishItems">' + body + '</div>';
}


/* ===== HOME CATEGORIES (same design, data from Supabase) ===== */
const CAT_VISUALS = [
  {
    img: 'images/cat-hijab.png',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M4 10h2M18 10h2"/></svg>'
  },
  {
    img: 'images/cat-ensemble.png',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 3h12l2 6H4L6 3z"/><path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/></svg>'
  },
  {
    img: 'images/cat-home.png',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
  },
  {
    img: 'images/cat-occasion.png',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14 2 9.2h7.6z"/></svg>'
  }
];

function renderHomeCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  const list = (typeof categoriesCache !== 'undefined' && categoriesCache) ? categoriesCache : [];
  if (!list.length) {
    grid.innerHTML = '';
    grid._loopReady = false;
    return;
  }
  const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : (localStorage.getItem('siBelleLang') || 'ar');

  function cardHtml(c, i) {
    const vis = CAT_VISUALS[i % CAT_VISUALS.length];
    const img = (c.image && String(c.image).trim()) ? c.image : vis.img;
    const title = (c.name && (c.name[lang] || c.name.ar || c.name.fr)) || c.id;
    const desc = (c.description && (c.description[lang] || c.description.ar)) || '';
    const href = 'shop.html?cat=' + encodeURIComponent(c.id || c.slug || '');
    return (
      '<a href="' + href + '" class="category-card" data-cat-index="' + i + '">' +
        '<div class="category-img"><img src="' + img + '" alt="' + String(title).replace(/"/g,'&quot;') + '" onerror="this.src=\'' + vis.img + '\'"></div>' +
        '<div class="category-body">' +
          '<div class="cat-icon">' + vis.icon + '</div>' +
          '<h3>' + title + '</h3>' +
          '<div class="cat-line"><span></span><span class="heart">♥</span><span></span></div>' +
          (desc ? '<p>' + desc + '</p>' : '') +
        '</div>' +
      '</a>'
    );
  }

  // لا نعيد بناء الشريط (ولا نُرجع موضع التمرير) إلا إذا تغيّرت البيانات فعلاً
  const sig = lang + '|' + list.map(function(c) {
    return [c.id, c.image, c.name && c.name.ar, c.name && c.name.fr, c.description && c.description.ar].join('~');
  }).join('||');
  if (grid._sig === sig && grid.children.length) return;
  grid._sig = sig;

  // ثلاث نسخ لتمرير دائري بلا نهاية
  const one = list.map(function(c, i) { return cardHtml(c, i); }).join('');
  grid.innerHTML = one + one + one;
  grid._loopReady = true;
  grid._setWidth = 0;

  const n = list.length;
  function isRtl() { return getComputedStyle(grid).direction === 'rtl'; }
  // موضع التمرير بالقيمة المطلقة من حافة البداية (يعمل في RTL و LTR)
  function getPos() { return Math.abs(grid.scrollLeft); }
  function setPos(p) {
    const prev = grid.style.scrollBehavior;
    grid.style.scrollBehavior = 'auto';
    grid.scrollLeft = isRtl() ? -p : p;
    grid.style.scrollBehavior = prev || '';
  }
  function measure() {
    const cards = grid.querySelectorAll('.category-card');
    if (cards.length < n * 2) return 0;
    // عرض مجموعة واحدة = المسافة بين بطاقة وما يماثلها في النسخة التالية (تشمل الفجوات بدقة)
    return Math.abs(cards[n].offsetLeft - cards[0].offsetLeft);
  }
  grid._getPos = getPos; grid._setPos = setPos;

  // ابدأ من النسخة الوسطى
  requestAnimationFrame(function() {
    const w = measure();
    if (!w) return;
    grid._setWidth = w;
    setPos(w);
  });

  if (!grid._loopBound) {
    grid._loopBound = true;
    let settle = null;
    // لا نقفز أثناء سحب المستخدم — ننتظر توقف التمرير ثم نعيد الموضع بصمت إلى النسخة الوسطى
    grid.addEventListener('scroll', function() {
      if (!grid._loopReady) return;
      if (settle) clearTimeout(settle);
      settle = setTimeout(function() {
        const w = measure() || grid._setWidth;
        if (!w) return;
        grid._setWidth = w;
        const pos = getPos();
        if (pos < w * 0.5) setPos(pos + w);
        else if (pos >= w * 1.5) setPos(pos - w);
      }, 140);
    }, { passive: true });
  }
}


function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('siBelleLang', lang);
  document.body.classList.toggle('rtl', lang === 'ar');
  document.documentElement.lang = lang;
  document.documentElement.dir = translations[lang].dir;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  renderBanner();
  if (typeof window.renderPayOptions === 'function') window.renderPayOptions();

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  renderProducts();
  updateCartUI();
  renderCartItems();
  if (typeof renderHomeCategories === 'function') renderHomeCategories();
  if (typeof applyStoreSettings === 'function') applyStoreSettings();
  if (typeof renderFooterCategories === 'function') renderFooterCategories();
  if (typeof applyCmsFromBackend === 'function') applyCmsFromBackend();
  // refresh checkout shipping note + wilaya labels if present
  if (typeof window.onWilayaChange === 'function' && document.getElementById('wilayaSelect')) {
    window.onWilayaChange();
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  if (isDark) {
    html.removeAttribute('data-theme');
    localStorage.setItem('siBelleTheme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('siBelleTheme', 'dark');
  }
}

function initTheme() {
  if (localStorage.getItem('siBelleTheme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleMenu() {
  const panel = document.getElementById('mobileNavPanel');
  const overlay = document.getElementById('navOverlay');
  const btn = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
  if (!panel) {
    const nav = document.querySelector('.nav');
    if (nav) nav.classList.toggle('mobile-open');
    return;
  }
  const open = panel.classList.toggle('open');
  overlay?.classList.toggle('open', open);
  btn?.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
  document.getElementById('mobileNavPanel')?.classList.remove('open');
  document.getElementById('navOverlay')?.classList.remove('open');
  document.getElementById('menuToggle')?.classList.remove('open');
  document.querySelector('.menu-toggle')?.classList.remove('open');
  document.body.style.overflow = '';
}


function autoScrollCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid || grid._autoBound) return;
  grid._autoBound = true;
  let pausedUntil = 0;
  const pause = function(ms) { pausedUntil = Date.now() + ms; };
  ['pointerdown', 'touchstart', 'wheel', 'mouseenter', 'focusin'].forEach(function(ev) {
    grid.addEventListener(ev, function() { pause(ev === 'mouseenter' ? 4000 : 5000); }, { passive: true });
  });
  grid.addEventListener('mouseleave', function() { pause(1500); });
  grid.addEventListener('touchend', function() { pause(5000); }, { passive: true });

  setInterval(function() {
    if (document.hidden || Date.now() < pausedUntil) return;
    if (grid.scrollWidth - grid.clientWidth <= 0 || !grid._loopReady) return;
    const rtl = getComputedStyle(grid).direction === 'rtl';
    const step = Math.min(grid.clientWidth * 0.85, 280);
    grid.scrollBy({ left: rtl ? -step : step, behavior: 'smooth' });
  }, 3500);
}

function scrollCategories(dir) {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  const factor = getComputedStyle(grid).direction === 'rtl' ? -1 : 1;
  const step = 280;
  grid._lastManual = Date.now();
  // في الوضع الدائري نمرر دائماً — الحلقة تعيد الموضع تلقائياً
  grid.scrollBy({ left: dir * step * factor, behavior: 'smooth' });
}

function saveCart() {
  localStorage.setItem('siBelleCart', JSON.stringify(cart));
}

function addToCart(id, qty = 1, color = null, size = null) {
  const item = cart.find(i => i.id === id && (i.color || null) === (color || null) && (i.size || null) === (size || null));
  if (item) item.qty += qty;
  else cart.push({ id, qty, color: color || null, size: size || null });
  saveCart();
  updateCartUI();
  showToast(t('addedToCart'));
}

function cartItemKey(item) {
  return item.id + '|' + (item.color || '') + '|' + (item.size || '');
}

function updateQty(id, delta, color, size) {
  const item = cart.find(i => i.id === id && (i.color || null) === (color || null) && (i.size || null) === (size || null));
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => !(i.id === id && (i.color || null) === (color || null) && (i.size || null) === (size || null)));
  saveCart();
  updateCartUI();
  renderCartItems();
}

function removeFromCart(id, color, size) {
  cart = cart.filter(i => !(i.id === id && (i.color || null) === (color || null) && (i.size || null) === (size || null)));
  saveCart();
  updateCartUI();
  renderCartItems();
}

function sanitizeCart() {
  if (!Array.isArray(cart)) { cart = []; }
  const before = cart.length;
  // Drop invalid lines
  cart = cart.filter(function(i) {
    if (!i || i.id == null) return false;
    if ((Number(i.qty) || 0) <= 0) return false;
    // If products are loaded, drop unknown product ids
    if (productsReady && products.length) {
      const exists = products.some(function(p) { return p.id === i.id || String(p.id) === String(i.id); });
      if (!exists) return false;
    }
    return true;
  });
  if (cart.length !== before) {
    try { localStorage.setItem('siBelleCart', JSON.stringify(cart)); } catch (e) {}
  }
}

function updateCartUI() {
  sanitizeCart();
  const count = cart.reduce(function(s, i) { return s + (Number(i.qty) || 0); }, 0);
  // Only badges inside the cart button (never wishlist)
  document.querySelectorAll('.cart-btn .cart-count, .icon-btn[aria-label="Cart"] .cart-count').forEach(function(el) {
    if (count > 0) {
      el.textContent = String(count);
      el.classList.add('is-visible');
      el.style.setProperty('display', 'flex', 'important');
    } else {
      el.textContent = '';
      el.classList.remove('is-visible');
      el.style.setProperty('display', 'none', 'important');
    }
  });
}

function openCart() {
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
  renderCartItems();
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><div class="icon">🛍️</div><p>${t('cartEmpty')}</p><p style="font-size:0.85rem;margin-top:6px">${t('cartEmptyDesc')}</p></div>`;
    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = '0 ' + t('currency');
    return;
  }
  let total = 0;
  container.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return '';
    total += p.price * item.qty;
    const colorEsc = (item.color || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    const sizeEsc = (item.size || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    const variantLine = (item.color || item.size)
      ? `<div class="cart-variant">${[item.color, item.size].filter(Boolean).join(' · ')}</div>`
      : '';
    return `<div class="cart-item">
      <div class="cart-item-img">${p.image ? `<img src="${p.image}" alt="">` : p.icon}</div>
      <div class="cart-item-info">
        <h4>${p.name[currentLang]}</h4>
        ${variantLine}
        <div class="price">${p.price.toLocaleString()} ${t('currency')}</div>
        <div class="cart-item-qty">
          <button onclick="updateQty(${p.id},-1,'${colorEsc}','${sizeEsc}')">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${p.id},1,'${colorEsc}','${sizeEsc}')">+</button>
          <button onclick="removeFromCart(${p.id},'${colorEsc}','${sizeEsc}')" style="margin-inline-start:auto;color:#c0392b;font-size:0.8rem">${t('remove')}</button>
        </div>
      </div>
    </div>`;
  }).join('');
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = total.toLocaleString() + ' ' + t('currency');
}

function renderProducts(filter) {
  if (filter !== undefined) currentFilter = filter;
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const isHome = !!document.getElementById('categoriesGrid') && !document.getElementById('shopFilters') && !document.querySelector('.shop-filters');
  let list;
  if (isHome) {
    // الصفحة الرئيسية: المميزة أولاً ثم الباقي (حد أقصى 8)
    const featured = products.filter(function(p) { return p.featured || (p._raw && p._raw.featured); });
    list = (featured.length ? featured : products).slice(0, 8);
  } else {
    list = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
  }
  grid.innerHTML = list.map(p => {
    const wished = isInWishlist(p.id);
    return `
    <div class="product-card" onclick="openProductModal(${p.id})" style="cursor:pointer">
      <div class="product-img">
        ${p.image ? `<img src="${p.image}" loading="lazy" decoding="async" alt="${(p.name[currentLang] || '').replace(/"/g, '&quot;')}">` : p.icon}
        ${p.badge ? `<span class="product-badge">${p.badge[currentLang]}</span>` : ''}
        <button type="button" class="wish-btn ${wished ? 'active' : ''}" data-id="${p.id}"
          aria-label="Wishlist" aria-pressed="${wished ? 'true' : 'false'}"
          onclick="toggleWishlist(${p.id}, event)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <h3>${p.name[currentLang]}</h3>
        <div class="product-cat">${p.categoryName ? (p.categoryName[currentLang] || '') : ''}</div>
        <div class="product-price">
          <span class="current">${p.price.toLocaleString()} ${t('currency')}</span>
          ${p.oldPrice ? `<span class="old">${p.oldPrice.toLocaleString()}</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn btn-primary" onclick="event.stopPropagation(); openProductModal(${p.id})">${t('viewDetails')}</button>
        </div>
      </div>
    </div>`;
  }).join('');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });
}


/** Get color display name */
function colorName(c, lang) {
  if (!c) return '';
  if (typeof c === 'string') return c;
  if (c.name) return (typeof c.name === 'object' ? (c.name[lang] || c.name.ar || c.name.fr || '') : c.name);
  return c.label || '';
}

/** Get size display name */
function sizeName(s) {
  if (!s) return '';
  if (typeof s === 'string') return s;
  return s.name || s.label || '';
}

/**
 * Stock for a specific color+size combination.
 * Supports new format (color.stocks[sizeName]) and legacy (min of color.stock / size.stock / product.stock).
 */
function getVariantStock(p, colorIdx, sizeIdx) {
  if (!p) return 0;
  const colors = p.colors || [];
  const sizes = p.sizes || [];
  const c = colors[colorIdx];
  const s = sizes[sizeIdx];
  const cN = colorName(c, 'ar');
  const sN = sizeName(s);

  // New matrix format
  if (c && c.stocks && typeof c.stocks === 'object' && sN) {
    if (c.stocks[sN] !== undefined) return Math.max(0, Number(c.stocks[sN]) || 0);
  }
  // Alternate: size.stocks[colorName]
  if (s && s.stocks && typeof s.stocks === 'object' && cN) {
    if (s.stocks[cN] !== undefined) return Math.max(0, Number(s.stocks[cN]) || 0);
  }
  // Legacy: independent stocks on color/size
  if (colors.length || sizes.length) {
    const cs = (c && typeof c.stock === 'number') ? c.stock : null;
    const ss = (s && typeof s.stock === 'number') ? s.stock : null;
    if (cs !== null && ss !== null) return Math.max(0, Math.min(cs, ss));
    if (cs !== null) return Math.max(0, cs);
    if (ss !== null) return Math.max(0, ss);
  }
  // Fallback: overall product stock
  return Math.max(0, Number(p.stock) || 0);
}

/** Total stock available for a color across all sizes */
function getColorTotalStock(p, colorIdx) {
  const sizes = p.sizes || [];
  if (!sizes.length) return getVariantStock(p, colorIdx, 0);
  let t = 0;
  for (let i = 0; i < sizes.length; i++) t += getVariantStock(p, colorIdx, i);
  return t;
}

/** Total stock available for a size across all colors */
function getSizeTotalStock(p, sizeIdx) {
  const colors = p.colors || [];
  if (!colors.length) return getVariantStock(p, 0, sizeIdx);
  let t = 0;
  for (let i = 0; i < colors.length; i++) t += getVariantStock(p, i, sizeIdx);
  return t;
}

let modalState = { productId: null, colorIdx: 0, sizeIdx: 0, qty: 1, imgIdx: 0 };

function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  modalState = { productId: id, colorIdx: 0, sizeIdx: 0, qty: 1, imgIdx: 0 };

  const colors = (p.colors && p.colors.length) ? p.colors : [{ name: { ar: 'افتراضي', fr: 'Défaut' } }];
  const sizes = (p.sizes && p.sizes.length) ? p.sizes : [{ name: 'Standard' }];
  const imgs = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : []);

  let modal = document.getElementById('productModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productModal';
    modal.className = 'product-modal';
    document.body.appendChild(modal);
  }

  // Pick first available combination if first is out of stock
  let initC = 0, initS = 0;
  outer: for (let ci = 0; ci < colors.length; ci++) {
    for (let si = 0; si < sizes.length; si++) {
      if (getVariantStock(p, ci, si) > 0) { initC = ci; initS = si; break outer; }
    }
  }
  modalState.colorIdx = initC;
  modalState.sizeIdx = initS;

  const colorBtns = colors.map((c, i) => {
    const total = getColorTotalStock(p, i);
    const label = colorName(c, currentLang);
    return `<button type="button" class="modal-option ${i === initC ? 'active' : ''} ${total <= 0 ? 'out' : ''}"
      ${total <= 0 ? 'disabled aria-disabled="true"' : `onclick="selectColor(${i})"`}>${label}</button>`;
  }).join('');

  const sizeBtns = sizes.map((s, i) => {
    // availability relative to selected color
    const st = getVariantStock(p, initC, i);
    const label = sizeName(s);
    return `<button type="button" class="modal-option ${i === initS ? 'active' : ''} ${st <= 0 ? 'out' : ''}"
      ${st <= 0 ? 'disabled aria-disabled="true"' : `onclick="selectSize(${i})"`}>${label}</button>`;
  }).join('');

  const thumbs = imgs.length > 1 ? `
    <div class="modal-thumbs">
      ${imgs.map((src, i) => `<button type="button" class="modal-thumb ${i===0?'active':''}" onclick="selectModalImage(${i})"><img src="${src}" alt=""></button>`).join('')}
    </div>` : '';

  const stock = getVariantStock(p, initC, initS);
  const stockClass = stock === 0 ? 'out' : stock <= 3 ? 'low' : 'in';
  const stockText = currentLang === 'ar'
    ? (stock === 0 ? 'غير متوفر' : stock <= 3 ? `متبقي ${stock} فقط` : `${stock} متوفر`)
    : (stock === 0 ? 'Rupture' : stock <= 3 ? `Plus que ${stock}` : `${stock} en stock`);

  modal.innerHTML = `
    <div class="product-modal-overlay" onclick="closeProductModal()"></div>
    <div class="product-modal-content">
      <button class="product-modal-close" onclick="closeProductModal()">×</button>
      <div class="product-modal-body">
        <div class="product-modal-img-wrap">
          <div class="product-modal-img" id="modalMainImg">${imgs[0] ? `<img src="${imgs[0]}" alt="${p.name[currentLang]}">` : (p.icon || '🛍️')}</div>
          ${thumbs}
        </div>
        <div class="product-modal-info">
          <h2>${p.name[currentLang]}</h2>
          <div class="modal-cat">${p.categoryName ? (p.categoryName[currentLang] || '') : ''}</div>
          <div class="modal-price">
            ${p.price.toLocaleString()} ${t('currency')}
            ${p.oldPrice ? `<span class="modal-old">${p.oldPrice.toLocaleString()}</span>` : ''}
          </div>
          <p class="modal-desc">${(p.desc && p.desc[currentLang]) || ''}</p>
          <div class="modal-section">
            <label>${currentLang === 'ar' ? 'اللون' : 'Couleur'}</label>
            <div class="modal-options" id="modalColors">${colorBtns}</div>
          </div>
          <div class="modal-section">
            <label>${currentLang === 'ar' ? 'المقاس' : 'Taille'}</label>
            <div class="modal-options" id="modalSizes">${sizeBtns}</div>
          </div>
          <div class="modal-stock ${stockClass}" id="modalStock">${stockText}</div>
          <div class="modal-qty">
            <button onclick="changeModalQty(-1)">−</button>
            <span id="modalQty">1</span>
            <button onclick="changeModalQty(1)">+</button>
          </div>
          <button class="btn btn-primary modal-add-btn" onclick="addFromModal()" ${stock === 0 ? 'disabled' : ''}>${t('addToCart')}</button>
        </div>
      </div>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectModalImage(i) {
  const p = products.find(x => x.id === modalState.productId);
  if (!p) return;
  const imgs = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : []);
  if (i < 0 || i >= imgs.length) return;
  modalState.imgIdx = i;
  const main = document.getElementById('modalMainImg');
  if (main) main.innerHTML = `<img src="${imgs[i]}" alt="">`;
  document.querySelectorAll('.modal-thumb').forEach((el, idx) => el.classList.toggle('active', idx === i));
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function selectColor(i) {
  const p = products.find(x => x.id === modalState.productId);
  if (!p) return;
  if (getColorTotalStock(p, i) <= 0) return;
  modalState.colorIdx = i;
  document.querySelectorAll('#modalColors .modal-option').forEach((el, idx) => el.classList.toggle('active', idx === i));
  // Refresh sizes: enable/disable based on stock for this color
  const sizes = (p.sizes && p.sizes.length) ? p.sizes : [{ name: 'Standard' }];
  const sizeWrap = document.getElementById('modalSizes');
  if (sizeWrap) {
    sizeWrap.innerHTML = sizes.map((s, si) => {
      const st = getVariantStock(p, i, si);
      const label = sizeName(s);
      const isActive = si === modalState.sizeIdx;
      return `<button type="button" class="modal-option ${isActive ? 'active' : ''} ${st <= 0 ? 'out' : ''}"
        ${st <= 0 ? 'disabled aria-disabled="true"' : `onclick="selectSize(${si})"`}>${label}</button>`;
    }).join('');
    // If current size is out for this color, switch to first available
    if (getVariantStock(p, i, modalState.sizeIdx) <= 0) {
      let found = -1;
      for (let si = 0; si < sizes.length; si++) {
        if (getVariantStock(p, i, si) > 0) { found = si; break; }
      }
      if (found >= 0) {
        modalState.sizeIdx = found;
        sizeWrap.querySelectorAll('.modal-option').forEach((el, idx) => el.classList.toggle('active', idx === found));
      }
    }
  }
  modalState.qty = 1;
  const qtyEl = document.getElementById('modalQty');
  if (qtyEl) qtyEl.textContent = '1';
  updateModalStock();
}

function selectSize(i) {
  const p = products.find(x => x.id === modalState.productId);
  if (!p) return;
  if (getVariantStock(p, modalState.colorIdx, i) <= 0) return;
  modalState.sizeIdx = i;
  document.querySelectorAll('#modalSizes .modal-option').forEach((el, idx) => el.classList.toggle('active', idx === i));
  // Keep colors enabled if they have stock in ANY size; only mark fully out-of-stock colors as out
  const colors = (p.colors && p.colors.length) ? p.colors : [{ name: { ar: 'افتراضي', fr: 'Défaut' } }];
  const colorWrap = document.getElementById('modalColors');
  if (colorWrap) {
    colorWrap.innerHTML = colors.map((c, ci) => {
      const total = getColorTotalStock(p, ci);
      const label = colorName(c, currentLang);
      const isActive = ci === modalState.colorIdx;
      return `<button type="button" class="modal-option ${isActive ? 'active' : ''} ${total <= 0 ? 'out' : ''}"
        ${total <= 0 ? 'disabled aria-disabled="true"' : `onclick="selectColor(${ci})"`}>${label}</button>`;
    }).join('');
  }
  modalState.qty = 1;
  const qtyEl = document.getElementById('modalQty');
  if (qtyEl) qtyEl.textContent = '1';
  updateModalStock();
}

function updateModalStock() {
  const p = products.find(x => x.id === modalState.productId);
  if (!p) return;
  const stock = getVariantStock(p, modalState.colorIdx, modalState.sizeIdx);
  const el = document.getElementById('modalStock');
  if (el) {
    el.className = 'modal-stock ' + (stock === 0 ? 'out' : stock <= 3 ? 'low' : 'in');
    el.textContent = currentLang === 'ar'
      ? (stock === 0 ? 'غير متوفر' : stock <= 3 ? `متبقي ${stock} فقط` : `${stock} متوفر`)
      : (stock === 0 ? 'Rupture' : stock <= 3 ? `Plus que ${stock}` : `${stock} en stock`);
  }
  const addBtn = document.querySelector('.modal-add-btn');
  if (addBtn) {
    addBtn.disabled = stock === 0;
    if (stock === 0) addBtn.setAttribute('disabled', 'disabled');
    else addBtn.removeAttribute('disabled');
  }
  // Clamp qty to available stock
  if (modalState.qty > stock && stock > 0) {
    modalState.qty = stock;
    const qtyEl = document.getElementById('modalQty');
    if (qtyEl) qtyEl.textContent = String(stock);
  }
}

function changeModalQty(d) {
  const p = products.find(x => x.id === modalState.productId);
  const max = p ? getVariantStock(p, modalState.colorIdx, modalState.sizeIdx) : 99;
  modalState.qty = Math.max(1, Math.min(max || 1, modalState.qty + d));
  const el = document.getElementById('modalQty');
  if (el) el.textContent = modalState.qty;
}

function addFromModal() {
  if (!modalState.productId) return;
  const p = products.find(x => x.id === modalState.productId);
  if (!p) return;
  const stock = getVariantStock(p, modalState.colorIdx, modalState.sizeIdx);
  if (stock <= 0) return;
  const qty = Math.min(modalState.qty, stock);
  const colors = (p.colors && p.colors.length) ? p.colors : [{ name: { ar: 'افتراضي', fr: 'Défaut' } }];
  const sizes = (p.sizes && p.sizes.length) ? p.sizes : [{ name: 'Standard' }];
  const color = colorName(colors[modalState.colorIdx], currentLang);
  const size = sizeName(sizes[modalState.sizeIdx]);
  addToCart(modalState.productId, qty, color, size);
  closeProductModal();
}

function goToCheckout() {
  if (cart.length === 0) return;
  window.location.href = 'checkout.html';
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', () => {
  // Hide cart badge immediately (prevents flash of stale count)
  document.querySelectorAll('.cart-btn .cart-count, [aria-label="Cart"] .cart-count').forEach(function(el) {
    el.textContent = '';
    el.classList.remove('is-visible');
    el.style.setProperty('display', 'none', 'important');
  });
  document.querySelectorAll('.wish-count').forEach(function(el) {
    el.classList.remove('cart-count');
  });
  autoScrollCategories();
  initTheme();
  setLanguage(currentLang);
  updateCartUI();
  updateWishlistUI();
  // Wire header wishlist buttons
  document.querySelectorAll('.icon-btn[aria-label="Wishlist"]').forEach(function(btn) {
    btn.setAttribute('onclick', 'openWishlist()');
    // Remove mistaken cart-count class from wishlist badges
    btn.querySelectorAll('.wish-count.cart-count').forEach(function(el) {
      el.classList.remove('cart-count');
    });
    // Also strip any pure cart-count that was wrongly put on wishlist button
    btn.querySelectorAll(':scope > .cart-count:not(.wish-count)').forEach(function(el) {
      el.remove();
    });
    if (!btn.querySelector('.wish-count')) {
      const span = document.createElement('span');
      span.className = 'wish-count';
      span.style.display = 'none';
      btn.appendChild(span);
      btn.style.position = 'relative';
    }
  });

  setTimeout(() => {
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[currentLang]?.[key]) el.placeholder = translations[currentLang][key];
    });
  }, 30);

  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

  if (document.getElementById('productsGrid')) {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    renderProducts(cat || 'all');
  }
});


/* ===== TRACK ORDER ===== */
function openTrackModal() {
  const el = document.getElementById('trackOverlay');
  if (!el) return;
  el.classList.add('show');
  const saved = localStorage.getItem('siBelleTrackOrder') || '';
  const input = document.getElementById('trackInput');
  if (input && saved) input.value = saved;
  document.getElementById('trackResult').style.display = 'none';
}

function closeTrackModal() {
  document.getElementById('trackOverlay')?.classList.remove('show');
}

async function searchOrder() {
  const input = document.getElementById('trackInput');
  const phoneInput = document.getElementById('trackPhone');
  const result = document.getElementById('trackResult');
  if (!input || !result) return;
  const num = (input.value || '').trim().toUpperCase();
  const phone = (phoneInput && phoneInput.value || '').trim();
  if (!num) return;
  if (!phone) {
    result.innerHTML = '<p style="color:#c0392b">' + (currentLang==='ar' ? 'أدخلي رقم الهاتف المستخدم في الطلب' : 'Entrez le téléphone utilisé pour la commande') + '</p>';
    result.style.display = 'block';
    return;
  }

  result.innerHTML = '<p style="color:var(--brown-light)">' + (currentLang==='ar' ? 'جاري البحث...' : 'Recherche...') + '</p>';
  result.style.display = 'block';

  try {
    if (typeof SiBelleSB === 'undefined') throw new Error('offline');
    const data = await SiBelleSB.trackOrder(num, phone);
    const order = data.order || {};
    const statusMap = {
      pending: 0, confirmed: 0, preparing: 1, ready: 1, shipped: 2, delivered: 3, cancelled: -1, returned: -1
    };
    let step = statusMap[order.status] !== undefined ? statusMap[order.status] : 0;

    const labels = [t('statusConfirmed'), t('statusPrep'), t('statusShipped'), t('statusDelivered')];
    let html = '<div class="track-order-id">' + (order.order_number || num) + '</div>';
    html += '<p style="color:var(--brown-light);font-size:0.85rem;margin-bottom:8px">' + t('trackFound') + ' — ' + (order.status || '') + '</p>';
    if (step >= 0) {
      html += '<div class="track-steps">';
      labels.forEach(function(lab, i) {
        let cls = 'track-step';
        if (i < step) cls += ' done';
        if (i === step) cls += ' active';
        const icon = i < step ? '✓' : (i === step ? '●' : (i + 1));
        html += '<div class="' + cls + '"><div class="dot">' + icon + '</div><div class="step-label">' + lab + '</div></div>';
      });
      html += '</div>';
    }
    result.innerHTML = html;
    localStorage.setItem('siBelleTrackOrder', num);
  } catch (err) {
    console.error(err);
    result.innerHTML = '<p style="color:#c0392b">' + t('trackNotFound') + '</p><p style="font-size:0.85rem;color:var(--brown-light);margin-top:8px">' + (currentLang==='ar' ? 'تأكدي من الرقم والهاتف أو تواصلي معنا' : 'Vérifiez le numéro et le téléphone ou contactez-nous') + '</p>';
  }
}


window.openTrackModal = openTrackModal;
window.closeTrackModal = closeTrackModal;
window.searchOrder = searchOrder;
window.setLanguage = setLanguage;
window.toggleTheme = toggleTheme;
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.scrollCategories = scrollCategories;
window.addToCart = addToCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.goToCheckout = goToCheckout;
window.renderProducts = renderProducts;
window.openProductModal = openProductModal;
window.toggleWishlist = toggleWishlist;
window.openWishlist = openWishlist;
window.closeWishlist = closeWishlist;
window.renderWishlistItems = renderWishlistItems;
window.closeProductModal = closeProductModal;
window.selectColor = selectColor;
window.selectSize = selectSize;
window.changeModalQty = changeModalQty;
window.addFromModal = addFromModal;


/** تطبيق كل محتوى CMS من الباك اند على الموقع */
async function applyCmsFromBackend() {
  try {
    if (typeof SiBelleSB === 'undefined') return;
    const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : (localStorage.getItem('siBelleLang') || 'ar');

    const [settings, site, ann] = await Promise.all([
      SiBelleSB.loadStoreSettings(),
      SiBelleSB.loadSiteContent(),
      SiBelleSB.loadAnnouncement()
    ]);

    // --- إعدادات المتجر (فوتر اتصال) ---
    if (settings) {
      const phone = settings.store_phone || '';
      const email = settings.store_email || '';
      const addr = settings.store_address || '';
      const elP = document.getElementById('footerPhone');
      const elE = document.getElementById('footerEmail');
      const elA = document.getElementById('footerAddress');
      if (elP && phone) elP.textContent = phone;
      if (elE && email) elE.textContent = email;
      if (elA && addr) elA.textContent = addr;
      // تحديث نص التوصيل المجاني إن وُجد
      if (settings.default_free_shipping_from) {
        const free = Number(settings.default_free_shipping_from);
        const cost = Number(settings.default_shipping_cost) || 400;
        if (translations && translations.ar) {
          translations.ar.shippingFree = 'التوصيل مجاني فوق ' + free + ' دج';
          translations.fr.shippingFree = 'Livraison gratuite au-delà de ' + free + ' DA';
        }
      }
    }

    // --- شريط الإعلان ---
    if (ann !== undefined) setBannerState(ann);

    // --- نصوص الصفحة الرئيسية من site_content ---
    if (site) {
      function pick(ar, fr) {
        return lang === 'fr' ? (fr || ar || '') : (ar || fr || '');
      }
      function setI18n(key, value) {
        if (!value) return;
        document.querySelectorAll('[data-i18n="' + key + '"]').forEach(function(el) {
          el.textContent = value;
        });
        if (translations && translations.ar && translations.fr) {
          // keep in memory for language switch until reload
          if (key in translations.ar || key in translations.fr) {
            // only override current language display; setLanguage will re-read translations
          }
        }
      }
      setI18n('heroTitle', pick(site.hero_title_ar, site.hero_title_fr));
      setI18n('heroSubtitle', pick(site.hero_subtitle_ar, site.hero_subtitle_fr));
      setI18n('heroDesc', pick(site.hero_description_ar, site.hero_description_fr));
      setI18n('catTitle', pick(site.categories_title_ar, site.categories_title_fr));
      setI18n('catSubtitle', pick(site.categories_subtitle_ar, site.categories_subtitle_fr));
      setI18n('featuredTitle', pick(site.featured_title_ar, site.featured_title_fr));
      setI18n('featuredSubtitle', pick(site.featured_subtitle_ar, site.featured_subtitle_fr));
      setI18n('footerDesc', pick(site.footer_description_ar, site.footer_description_fr));

      // تحديث كائن الترجمة الحالي كي يبقى عند تبديل اللغة بعد إعادة التحميل من DB
      if (translations) {
        if (site.hero_title_ar) translations.ar.heroTitle = site.hero_title_ar;
        if (site.hero_title_fr) translations.fr.heroTitle = site.hero_title_fr;
        if (site.hero_subtitle_ar) translations.ar.heroSubtitle = site.hero_subtitle_ar;
        if (site.hero_subtitle_fr) translations.fr.heroSubtitle = site.hero_subtitle_fr;
        if (site.hero_description_ar) translations.ar.heroDesc = site.hero_description_ar;
        if (site.hero_description_fr) translations.fr.heroDesc = site.hero_description_fr;
        if (site.categories_title_ar) translations.ar.catTitle = site.categories_title_ar;
        if (site.categories_title_fr) translations.fr.catTitle = site.categories_title_fr;
        if (site.categories_subtitle_ar) translations.ar.catSubtitle = site.categories_subtitle_ar;
        if (site.categories_subtitle_fr) translations.fr.catSubtitle = site.categories_subtitle_fr;
        if (site.featured_title_ar) translations.ar.featuredTitle = site.featured_title_ar;
        if (site.featured_title_fr) translations.fr.featuredTitle = site.featured_title_fr;
        if (site.featured_subtitle_ar) translations.ar.featuredSubtitle = site.featured_subtitle_ar;
        if (site.featured_subtitle_fr) translations.fr.featuredSubtitle = site.featured_subtitle_fr;
        if (site.footer_description_ar) translations.ar.footerDesc = site.footer_description_ar;
        if (site.footer_description_fr) translations.fr.footerDesc = site.footer_description_fr;
      }
    }
  } catch (e) {
    console.warn('applyCmsFromBackend', e);
  }
}
async function applyStoreSettings() { return applyCmsFromBackend(); }

function renderFooterCategories() {
  const list = (categoriesCache || []).filter(function(c) { return c.active !== false; });
  const box = document.querySelector('.footer-grid h4[data-i18n="footerCats"]');
  if (!box) return;
  const ul = box.parentElement && box.parentElement.querySelector('ul');
  if (!ul) return;
  const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : (localStorage.getItem('siBelleLang') || 'ar');
  if (!list.length) { ul.innerHTML = ''; return; }
  ul.innerHTML = list.map(function(c) {
    const name = (c.name && (c.name[lang] || c.name.ar || c.name.fr)) || c.id;
    return '<li><a href="shop.html?cat=' + encodeURIComponent(c.id) + '">' + name + '</a></li>';
  }).join('');
}

function renderShopFilters() {
  const bar = document.getElementById('shopFilters') || document.querySelector('.shop-filters');
  if (!bar) return;
  const list = (categoriesCache || []).filter(function(c) { return c.active !== false; });
  const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : (localStorage.getItem('siBelleLang') || 'ar');
  const allLabel = lang === 'ar' ? 'الكل' : 'Tout';
  let html = '<button class="filter-btn active" data-filter="all" onclick="filterProducts(\'all\')">' + allLabel + '</button>';
  list.forEach(function(c) {
    const name = (c.name && (c.name[lang] || c.name.ar || c.name.fr)) || c.id;
    html += '<button class="filter-btn" data-filter="' + c.id + '" onclick="filterProducts(\'' + c.id + '\')">' + name + '</button>';
  });
  bar.innerHTML = html;
}

function filterProducts(cat) {
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-filter') === cat);
  });
  if (typeof renderProducts === 'function') renderProducts(cat);
}

async function submitContactForm(form) {
  try {
    const sb = SiBelleSB.getSupabase();
    const name = form.querySelector('[name="name"], #contactName, input[type="text"]')?.value?.trim() || '';
    const phone = form.querySelector('[name="phone"], #contactPhone, input[type="tel"]')?.value?.trim() || '';
    const email = form.querySelector('[name="email"], #contactEmail, input[type="email"]')?.value?.trim() || '';
    const message = form.querySelector('[name="message"], #contactMessage, textarea')?.value?.trim() || '';
    if (!name || !message) {
      showToast(currentLang === 'ar' ? 'الاسم والرسالة مطلوبان' : 'Nom et message requis');
      return;
    }
    const { error } = await sb.from('contact_messages').insert({
      name: name,
      phone: phone || null,
      email: email || null,
      message: message,
      status: 'new'
    });
    if (error) throw error;
    showToast(currentLang === 'ar' ? 'تم إرسال رسالتكِ ✓' : 'Message envoyé ✓');
    form.reset();
  } catch (e) {
    console.error(e);
    showToast(e.message || 'Error');
  }
}

async function applyLegalPage(type) {
  try {
    if (typeof SiBelleSB === 'undefined') return;
    const pages = await SiBelleSB.loadLegalPages();
    const page = (pages || []).find(function(p) { return p.type === type || p.id === type; });
    if (!page) return;
    const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : (localStorage.getItem('siBelleLang') || 'ar');
    const title = lang === 'fr' ? (page.title_fr || page.title_ar) : (page.title_ar || page.title_fr);
    const content = lang === 'fr' ? (page.content_fr || page.content_ar) : (page.content_ar || page.content_fr);
    const titleEl = document.querySelector('[data-legal-title]') || document.querySelector('h1');
    const bodyEl = document.querySelector('[data-legal-body]') || document.querySelector('.legal-body') || document.querySelector('.content-card');
    if (titleEl && title) titleEl.textContent = title;
    if (bodyEl && content) bodyEl.innerHTML = content.replace(/\\n/g, '<br>');
  } catch (e) {
    console.warn(e);
  }
}

