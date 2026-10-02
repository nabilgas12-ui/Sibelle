/* Si Belle Admin — full control, soft UI, image upload, i18n */
/* Demo credentials removed — use Supabase Auth (email + password).
   After first signup in Supabase Authentication, promote the user:
   update public.profiles set role='admin', active=true where id='YOUR-UUID';
*/

const I18N = {
  ar: {
    dashboard: 'الرئيسية', orders: 'الطلبات', products: 'المنتجات', categories: 'التصنيفات',
    content: 'النصوص', settings: 'الإعدادات', logout: 'تسجيل الخروج', store: 'المتجر',
    loginTitle: 'لوحة تحكم المتجر', loginBtn: 'دخول', loginError: 'بيانات الدخول غير صحيحة',
    totalOrders: 'إجمالي الطلبات', revenue: 'الإيرادات', productsCount: 'المنتجات',
    delivered: 'تم التسليم', pending: 'قيد المعالجة', avgOrder: 'متوسط الطلب',
    newOrders: 'طلبات جديدة', todayOrders: 'طلبات اليوم', shippingFees: 'رسوم التوصيل',
    recentOrders: 'آخر الطلبات', viewAll: 'عرض الكل', orderStatus: 'توزيع الحالات',
    allOrders: 'جميع الطلبات', search: 'بحث برقم / اسم / هاتف...', allStatuses: 'كل الحالات',
    view: 'عرض', save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل',
    addProduct: 'إضافة منتج', addCategory: 'إضافة تصنيف', customer: 'العميل',
    phone: 'الهاتف', wilaya: 'الولاية', amount: 'المبلغ', status: 'الحالة', date: 'التاريخ',
    orderNum: 'رقم الطلب', orderDetails: 'تفاصيل الطلب', customerInfo: 'بيانات العميل',
    productsLabel: 'المنتجات', trackStatus: 'تتبع الحالة', updateStatus: 'تحديث الحالة',
    saveStatus: 'حفظ الحالة', nameAr: 'الاسم (عربي)', nameFr: 'الاسم (فرنسي)',
    price: 'السعر (دج)', oldPrice: 'السعر السابق', category: 'التصنيف', stock: 'المخزون',
    image: 'الصورة', uploadImg: 'اضغطي أو اسحبي صورة من جهازك',
    banner: 'شريط الإعلان العلوي', showBanner: 'إظهار شريط الإعلان', hideBanner: 'إخفاء الشريط',
    privacy: 'سياسة الخصوصية', terms: 'الشروط والأحكام', shippingPolicy: 'سياسة التوصيل',
    siteSettings: 'إعدادات الموقع', contentTexts: 'نصوص الواجهة',
    resetDemo: 'إعادة طلبات تجريبية', clearOrders: 'مسح كل الطلبات', resetProducts: 'إعادة المنتجات',
    confirmed: 'تم التأكيد', prep: 'قيد التحضير', shipped: 'تم الشحن', deliveredSt: 'تم التسليم', cancelled: 'ملغى',
    saved: 'تم الحفظ بنجاح', deleted: 'تم الحذف', welcome: 'مرحباً بك في لوحة التحكم',
    noOrders: 'لا توجد طلبات', noProducts: 'لا توجد منتجات', currency: 'دج',
    email: 'البريد', address: 'العنوان', payment: 'الدفع', notes: 'ملاحظات', total: 'المجموع',
    cod: 'الدفع عند الاستلام', ccp: 'CCP', baridi: 'Baridi Mob',
    active: 'نشط', inactive: 'معطّل', shippingCost: 'تكلفة التوصيل', freeShippingFrom: 'توصيل مجاني من',
    shippingPage: 'التوصيل', shippingByWilaya: 'أسعار التوصيل حسب الولاية', saveShipping: 'حفظ أسعار التوصيل', freeFrom: 'مجاني من', days: 'أيام',
    analytics: 'التحليلات', map: 'خريطة المبيعات', staff: 'الموظفون',
    topProducts: 'الأكثر مبيعاً', worstProducts: 'الأقل مبيعاً',
    salesByRegion: 'المبيعات حسب الولاية', printInvoice: 'طباعة الفاتورة',
    payments: 'طرق الدفع', invoice: 'الفاتورة', addPayment: 'إضافة طريقة دفع',
    paymentId: 'المعرّف', paymentName: 'الاسم', paymentDesc: 'الوصف', paymentDetails: 'تفاصيل الحساب',
    invoiceEnabled: 'تفعيل الفاتورة', invoiceOnSuccess: 'عرض الفاتورة بعد الطلب',
    invoiceQr: 'إظهار رمز QR', invoiceLogo: 'إظهار الشعار', invoiceColor: 'لون الفاتورة',
    invoiceTitle: 'عنوان الفاتورة', invoiceFooter: 'نص أسفل الفاتورة',
    invoiceCompany: 'اسم المتجر على الفاتورة', invoiceSubtitle: 'العنوان الفرعي',
    invoiceNote: 'ملاحظة إضافية', previewInvoice: 'معاينة الفاتورة',
    enabledOn: 'مفعّلة', enabledOff: 'معطّلة',
    addStaff: 'إضافة موظف', role: 'الدور', permissions: 'الصلاحيات',
    adminRole: 'مدير', managerRole: 'مشرف', staffRole: 'موظف',
    permOrders: 'الطلبات', permProducts: 'المنتجات', permContent: 'المحتوى', permSettings: 'الإعدادات', permStaff: 'الموظفون',
    conversion: 'معدل الإكمال', stockAlert: 'تنبيه مخزون', lowStock: 'مخزون منخفض',
    storePhone: 'هاتف المتجر', storeEmail: 'بريد المتجر', storeAddress: 'عنوان المتجر',
    socialLinks: 'روابط التواصل', whatsapp: 'واتساب', instagram: 'إنستغرام', facebook: 'فيسبوك',

  },
  fr: {
    dashboard: 'Tableau de bord', orders: 'Commandes', products: 'Produits', categories: 'Catégories',
    content: 'Textes', settings: 'Paramètres', logout: 'Déconnexion', store: 'Boutique',
    loginTitle: 'Administration boutique', loginBtn: 'Connexion', loginError: 'Identifiants incorrects',
    totalOrders: 'Total commandes', revenue: 'Revenus', productsCount: 'Produits',
    delivered: 'Livrées', pending: 'En cours', avgOrder: 'Panier moyen',
    newOrders: 'Nouvelles', todayOrders: "Aujourd'hui", shippingFees: 'Frais livraison',
    recentOrders: 'Dernières commandes', viewAll: 'Voir tout', orderStatus: 'Répartition',
    allOrders: 'Toutes les commandes', search: 'N° / nom / tél...', allStatuses: 'Tous les statuts',
    view: 'Voir', save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier',
    addProduct: 'Ajouter produit', addCategory: 'Ajouter catégorie', customer: 'Client',
    phone: 'Téléphone', wilaya: 'Wilaya', amount: 'Montant', status: 'Statut', date: 'Date',
    orderNum: 'N° commande', orderDetails: 'Détails commande', customerInfo: 'Infos client',
    productsLabel: 'Produits', trackStatus: 'Suivi', updateStatus: 'Mettre à jour',
    saveStatus: 'Enregistrer statut', nameAr: 'Nom (AR)', nameFr: 'Nom (FR)',
    price: 'Prix (DA)', oldPrice: 'Ancien prix', category: 'Catégorie', stock: 'Stock',
    image: 'Image', uploadImg: 'Cliquez ou glissez une image',
    banner: 'Bandeau publicitaire', showBanner: 'Afficher le bandeau', hideBanner: 'Masquer le bandeau',
    privacy: 'Politique de confidentialité', terms: 'Conditions générales', shippingPolicy: 'Politique livraison',
    siteSettings: 'Réglages site', contentTexts: 'Textes interface',
    resetDemo: 'Réinit. commandes démo', clearOrders: 'Effacer commandes', resetProducts: 'Réinit. produits',
    confirmed: 'Confirmée', prep: 'En préparation', shipped: 'Expédiée', deliveredSt: 'Livrée', cancelled: 'Annulée',
    saved: 'Enregistré', deleted: 'Supprimé', welcome: 'Bienvenue dans le tableau de bord',
    noOrders: 'Aucune commande', noProducts: 'Aucun produit', currency: 'DA',
    email: 'Email', address: 'Adresse', payment: 'Paiement', notes: 'Notes', total: 'Total',
    cod: 'Paiement à la livraison', ccp: 'CCP', baridi: 'Baridi Mob',
    active: 'Actif', inactive: 'Inactif', shippingCost: 'Frais livraison', freeShippingFrom: 'Livraison gratuite dès',
    shippingPage: 'Livraison', shippingByWilaya: 'Tarifs par wilaya', saveShipping: 'Enregistrer les tarifs', freeFrom: 'Gratuit dès', days: 'jours',
    analytics: 'Analyses', map: 'Carte des ventes', staff: 'Équipe',
    topProducts: 'Meilleures ventes', worstProducts: 'Moins vendus',
    salesByRegion: 'Ventes par wilaya', printInvoice: 'Imprimer facture',
    payments: 'Moyens de paiement', invoice: 'Facture', addPayment: 'Ajouter un paiement',
    paymentId: 'Identifiant', paymentName: 'Nom', paymentDesc: 'Description', paymentDetails: 'Détails compte',
    invoiceEnabled: 'Activer la facture', invoiceOnSuccess: 'Afficher après commande',
    invoiceQr: 'Afficher QR code', invoiceLogo: 'Afficher le logo', invoiceColor: 'Couleur facture',
    invoiceTitle: 'Titre facture', invoiceFooter: 'Pied de facture',
    invoiceCompany: 'Nom boutique', invoiceSubtitle: 'Sous-titre',
    invoiceNote: 'Note additionnelle', previewInvoice: 'Aperçu facture',
    enabledOn: 'Activé', enabledOff: 'Désactivé',
    addStaff: 'Ajouter employé', role: 'Rôle', permissions: 'Permissions',
    adminRole: 'Admin', managerRole: 'Manager', staffRole: 'Staff',
    permOrders: 'Commandes', permProducts: 'Produits', permContent: 'Contenu', permSettings: 'Paramètres', permStaff: 'Équipe',
    conversion: 'Taux complétion', stockAlert: 'Alerte stock', lowStock: 'Stock bas',
    storePhone: 'Téléphone', storeEmail: 'Email boutique', storeAddress: 'Adresse',
    socialLinks: 'Réseaux sociaux', whatsapp: 'WhatsApp', instagram: 'Instagram', facebook: 'Facebook',

  }
};

let adminLang = localStorage.getItem('siBelleAdminLang') || 'ar';
function t(k) { return (I18N[adminLang] && I18N[adminLang][k]) || (I18N.ar[k]) || k; }

const STATUS_KEYS = ['pending','confirmed','preparing','ready','shipped','delivered','cancelled','returned'];
function statusLabel(s) {
  const norm = { pending:'confirmed', confirmed:'confirmed', preparing:'prep', ready:'prep', prep:'prep', shipped:'shipped', delivered:'delivered', cancelled:'cancelled', returned:'cancelled' };
  s = norm[s] || s;
  const map = { confirmed: 'confirmed', prep: 'prep', shipped: 'shipped', delivered: 'deliveredSt', cancelled: 'cancelled' };
  return t(map[s] || s);
}
function statusCls(s) {
  const norm = { pending:'confirmed', confirmed:'confirmed', preparing:'prep', ready:'prep', prep:'prep', shipped:'shipped', delivered:'delivered', cancelled:'cancelled', returned:'cancelled' };
  s = norm[s] || s;
  return ({ confirmed: 'status-confirmed', prep: 'status-prep', shipped: 'status-shipped', delivered: 'status-delivered', cancelled: 'status-cancelled' })[s] || '';
}

const DEFAULT_PRODUCTS = [
  { id: 1, name: { ar: 'حجاب حريري أنيق', fr: 'Hijab soyeux élégant' }, category: 'hijab', price: 2500, oldPrice: 3200, image: '', stock: 40, active: true },
  { id: 2, name: { ar: 'طقم خروج كلاسيك', fr: 'Ensemble sortie classique' }, category: 'ensemble', price: 6500, oldPrice: null, image: '', stock: 22, active: true },
  { id: 3, name: { ar: 'جبة منزلية مريحة', fr: 'Djellaba maison confortable' }, category: 'home', price: 3800, oldPrice: 4500, image: '', stock: 17, active: true },
  { id: 4, name: { ar: 'بيجامة قطنية ناعمة', fr: 'Pyjama coton doux' }, category: 'home', price: 3200, oldPrice: null, image: '', stock: 21, active: true },
  { id: 5, name: { ar: 'حجاب شيفون ملون', fr: 'Hijab chiffon coloré' }, category: 'hijab', price: 1800, oldPrice: 2200, image: '', stock: 44, active: true },
  { id: 6, name: { ar: 'إنسمبل أنيق للخروج', fr: 'Ensemble élégant sortie' }, category: 'ensemble', price: 7200, oldPrice: 8500, image: '', stock: 15, active: true },
  { id: 7, name: { ar: 'جبة العيد الفاخرة', fr: "Djellaba d'Aïd luxueuse" }, category: 'occasion', price: 9500, oldPrice: 11000, image: '', stock: 9, active: true },
  { id: 8, name: { ar: 'عباية كلاسيكية', fr: 'Abaya classique' }, category: 'occasion', price: 7800, oldPrice: null, image: '', stock: 20, active: true }
];

const DEFAULT_CATEGORIES = [
  { id: 'hijab', name: { ar: 'حجابات', fr: 'Hijabs' }, image: '', active: true },
  { id: 'ensemble', name: { ar: 'إنسمبل', fr: 'Ensembles' }, image: '', active: true },
  { id: 'home', name: { ar: 'ملابس منزلية', fr: "Vêtements d'intérieur" }, image: '', active: true },
  { id: 'occasion', name: { ar: 'مناسبات', fr: 'Occasions' }, image: '', active: true }
];

const DEFAULT_CONTENT = {
  heroTitle: { ar: 'أناقتك تبدأ من هنا', fr: 'Votre élégance commence ici' },
  heroSubtitle: { ar: 'Si Belle', fr: 'Si Belle' },
  heroDesc: { ar: 'اكتشفي مجموعتنا من الملابس الأنيقة: حجابات، إنسمبل، ملابس منزلية، وجبة العيد والعبايات.', fr: 'Découvrez notre collection : hijabs, ensembles, tenues d\'intérieur, djellabas d\'Aïd et abayas.' },
  topBanner: { ar: '🚚 توصيل سريع إلى جميع ولايات الجزائر • دفع عند الاستلام متاح', fr: '🚚 Livraison rapide dans toutes les wilayas • Paiement à la livraison' },
  catTitle: { ar: 'تصنيفاتنا', fr: 'Nos catégories' },
  catSubtitle: { ar: 'اختاري ما يناسب أسلوبكِ', fr: 'Choisissez ce qui vous ressemble' },
  featuredTitle: { ar: 'منتجات مميزة', fr: 'Produits vedettes' },
  footerDesc: { ar: 'علامة جزائرية للملابس النسائية الأنيقة والمريحة.', fr: 'Marque algérienne de vêtements féminins élégants et confortables.' }
};

const DEFAULT_PAYMENTS = [
  { id: 'cod', enabled: true, name: { ar: 'الدفع عند الاستلام', fr: 'Paiement à la livraison' }, desc: { ar: 'نقداً عند استلام الطلب', fr: 'Espèces à la réception' }, details: '' },
  { id: 'ccp', enabled: true, name: { ar: 'تحويل بريدي / CCP', fr: 'Virement postal / CCP' }, desc: { ar: 'سنرسل رقم الحساب بعد التأكيد', fr: 'Le numéro de compte sera envoyé après confirmation' }, details: 'CCP: 0000000000 clé 00' },
  { id: 'baridi', enabled: true, name: { ar: 'Baridi Mob', fr: 'Baridi Mob' }, desc: { ar: 'تحويل عبر بريدي موب', fr: 'Virement via Baridi Mob' }, details: 'RIP: 00799999XXXXXXXX' }
];

const DEFAULT_INVOICE = {
  enabled: true,
  showOnSuccess: true,
  showQr: true,
  showLogo: true,
  color: '#C9A227',
  title: { ar: 'فاتورة', fr: 'Facture' },
  footer: { ar: 'شكراً لثقتكِ بـ Si Belle', fr: 'Merci pour votre confiance — Si Belle' },
  companyName: 'Si Belle',
  companySubtitle: { ar: 'ملابس نسائية — الجزائر', fr: 'Clothing Line — Algérie' },
  note: { ar: '', fr: '' }
};

const DEFAULT_SETTINGS = {
  bannerEnabled: true,
  shippingCost: 400,
  freeShippingFrom: 8000,
  privacy: {
    ar: 'نحترم خصوصيتكِ. لا نشارك بياناتكِ مع أطراف ثالثة إلا لتوصيل طلبكِ. يمكنكِ طلب حذف بياناتكِ في أي وقت عبر صفحة اتصل بنا.',
    fr: 'Nous respectons votre vie privée. Vos données ne sont partagées qu\'avec les services de livraison. Vous pouvez demander la suppression de vos données à tout moment.'
  },
  terms: {
    ar: 'بالطلب من Si Belle، توافقين على شروط البيع: الدفع عند الاستلام أو التحويل، التوصيل خلال 2–5 أيام عمل حسب الولاية، إمكانية الاستبدال خلال 48 ساعة للمنتجات غير المستخدمة.',
    fr: 'En commandant chez Si Belle, vous acceptez nos conditions : paiement à la livraison ou virement, livraison sous 2–5 jours ouvrés, échange possible sous 48h pour articles non utilisés.'
  },
  shippingPolicy: {
    ar: 'التوصيل متاح لجميع ولايات الجزائر. رسوم التوصيل 400 دج، ومجاني للطلبات فوق 8000 دج.',
    fr: 'Livraison disponible dans toutes les wilayas. Frais de 400 DA, gratuits au-delà de 8000 DA.'
  },
  payments: DEFAULT_PAYMENTS.map(p => ({ ...p, name: { ...p.name }, desc: { ...p.desc } })),
  invoice: { ...DEFAULT_INVOICE, title: { ...DEFAULT_INVOICE.title }, footer: { ...DEFAULT_INVOICE.footer }, companySubtitle: { ...DEFAULT_INVOICE.companySubtitle }, note: { ...DEFAULT_INVOICE.note } }
};

let currentPage = 'dashboard';
let pendingImageData = null;
let pendingProductImages = []; // multiple images for product form
let _orderSearchQuery = '';
let _orderStatusFilter = 'all';
let _orderTimeFilter = 'all';

/* ===== STORAGE (Supabase) ===== */
let _cache = { orders: null, products: null, categories: null };

/* ===== REALTIME + LIVE POLLING ===== */
let _rtChannel = null;
let _livePollTimer = null;
let _liveBusy = false;
let _liveLastOrdersSig = '';
let _liveLastProductsSig = '';
let _liveLastCatsSig = '';

function _ordersSignature(list) {
  if (!list || !list.length) return '0';
  return list.length + '|' + list.map(function(o) {
    return (o.id || o.orderNumber || '') + ':' + (o.status || '') + ':' + (o.totalNum || 0);
  }).join(',');
}
function _productsSignature(list) {
  if (!list || !list.length) return '0';
  return list.length + '|' + list.map(function(p) {
    return (p.id || '') + ':' + (p.stock || 0) + ':' + (p.price || 0) + ':' + (p.active !== false ? 1 : 0) + ':' + ((p.name && p.name.ar) || '') + ':' + JSON.stringify(p.colors || []);
  }).join(',');
}
function _catsSignature(list) {
  if (!list || !list.length) return '0';
  return list.length + '|' + list.map(function(c) {
    return (c.id || '') + ':' + (c.active !== false ? 1 : 0);
  }).join(',');
}

/** Soft re-render current page without losing scroll/focus where possible */
async function softRefreshCurrentPage(reason) {
  try {
    updateNavBadge();
    const page = currentPage;
    if (page === 'orders') {
      await softRenderOrders();
      return;
    }
    if (page === 'dashboard' || page === 'analytics' || page === 'map' || page === 'products' || page === 'categories') {
      const el = document.getElementById('pageContent');
      if (!el) return;
      const map = {
        dashboard: renderDashboard,
        orders: renderOrders,
        products: renderProducts,
        categories: renderCategories,
        analytics: renderAnalytics,
        map: renderMap
      };
      const fn = map[page];
      if (!fn) return;
      const html = await Promise.resolve(fn());
      el.innerHTML = html || '';
      updateNavBadge();
      // re-init map if needed
      if (page === 'map' && typeof initLeafletMap === 'function') {
        try {
          const orders = _cache.orders || [];
          // map page self-inits via inline script in render — skip if not needed
        } catch (e) {}
      }
    } else {
      updateNavBadge();
    }
  } catch (e) {
    console.warn('softRefresh', reason, e);
  }
}

async function liveSyncFromDB(force) {
  if (_liveBusy) return;
  if (!isLoggedIn()) return;
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) return;
  _liveBusy = true;
  try {
    const prevOrders = _ordersSignature(_cache.orders);
    const prevProds = _productsSignature(_cache.products);
    const prevCats = _catsSignature(_cache.categories);

    await Promise.all([
      getOrders(true),
      getProducts(true),
      getCategories(true)
    ]);

    const nextOrders = _ordersSignature(_cache.orders);
    const nextProds = _productsSignature(_cache.products);
    const nextCats = _catsSignature(_cache.categories);

    const changed = force ||
      nextOrders !== prevOrders ||
      nextProds !== prevProds ||
      nextCats !== prevCats;

    _liveLastOrdersSig = nextOrders;
    _liveLastProductsSig = nextProds;
    _liveLastCatsSig = nextCats;

    if (changed) {
      await softRefreshCurrentPage('live-sync');
    } else {
      updateNavBadge();
    }
  } catch (e) {
    console.warn('liveSync', e);
  } finally {
    _liveBusy = false;
  }
}

let _adminRefreshTimer = null;
function _adminRefresh() {
  if (_adminRefreshTimer) return;
  _adminRefreshTimer = setTimeout(function() {
    _adminRefreshTimer = null;
    softRefreshCurrentPage('realtime');
  }, 60);
}
async function _adminFetchRow(table, id) {
  try {
    const sb = SiBelleSB.getSupabase();
    const { data } = await sb.from(table).select('*').eq('id', id).maybeSingle();
    return data || null;
  } catch (e) { return null; }
}
function _beep() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    const ctx = new AC(), o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination); o.frequency.value = 880; g.gain.value = 0.05;
    o.start(); setTimeout(function() { o.stop(); ctx.close(); }, 160);
  } catch (e) {}
}

async function onAdminOrderChange(payload) {
  if (!_cache.orders) return liveSyncFromDB(false);
  const type = payload.eventType;
  if (type === 'DELETE') {
    const id = payload.old && payload.old.id;
    _cache.orders = _cache.orders.filter(o => o.id !== id);
    return _adminRefresh();
  }
  const nw = payload.new;
  if (!nw || nw.id == null) return liveSyncFromDB(false);
  const prev = _cache.orders.find(o => o.id === nw.id);
  const mapped = mapOrderRow(Object.assign({}, prev && prev._raw ? prev._raw : {}, nw));
  if (prev && prev.items && prev.items.length) mapped.items = prev.items;
  if (prev) _cache.orders = _cache.orders.map(o => o.id === nw.id ? mapped : o);
  else {
    _cache.orders.unshift(mapped);
    _beep();
    toast((adminLang === 'ar' ? '🛎️ طلب جديد: ' : '🛎️ Nouvelle commande : ') + (mapped.orderNumber || ''));
  }
  _cache.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  _adminRefresh();
}
async function onAdminOrderItemChange(payload) {
  const row = payload.new || payload.old || {};
  const oid = row.order_id;
  if (!oid || !_cache.orders) return;
  const o = _cache.orders.find(x => x.id === oid);
  if (o) { o.items = []; } // force lazy reload next time the order is opened
}
async function onAdminProductChange(payload) {
  if (!_cache.products) return;
  if (payload.eventType === 'DELETE') {
    const id = payload.old && payload.old.id;
    _cache.products = _cache.products.filter(p => String(p.id) !== String(id));
    return _adminRefresh();
  }
  const nw = payload.new;
  if (!nw || nw.id == null) return liveSyncFromDB(false);
  const prev = _cache.products.find(p => String(p.id) === String(nw.id));
  let merged = Object.assign({}, prev && prev._raw ? prev._raw : {}, nw);
  if (!prev || merged.name_ar === undefined) { const full = await _adminFetchRow('products', nw.id); if (full) merged = full; }
  if (merged.active === false) {
    _cache.products = _cache.products.filter(p => String(p.id) !== String(nw.id));
    return _adminRefresh();
  }
  const mapped = mapAdminProduct(merged);
  if (prev) _cache.products = _cache.products.map(p => p === prev ? mapped : p);
  else _cache.products.push(mapped);
  _cache.products.sort((a, b) => ((a._raw.sort_order || 0) - (b._raw.sort_order || 0)) || (Number(a.id) - Number(b.id)));
  _adminRefresh();
}
async function onAdminCategoryChange(payload) {
  if (!_cache.categories) return;
  if (payload.eventType === 'DELETE') {
    const id = payload.old && payload.old.id;
    _cache.categories = _cache.categories.filter(c => c.id !== id);
    return _adminRefresh();
  }
  const nw = payload.new;
  if (!nw || nw.id == null) return liveSyncFromDB(false);
  const prev = _cache.categories.find(c => c.id === nw.id);
  const mapped = mapAdminCategory(Object.assign({}, prev && prev._raw ? prev._raw : {}, nw));
  if (prev) _cache.categories = _cache.categories.map(c => c.id === nw.id ? mapped : c);
  else _cache.categories.push(mapped);
  _cache.categories.sort((a, b) => ((a._raw.sort_order || 0) - (b._raw.sort_order || 0)));
  _adminRefresh();
}

let _adminRtOk = false;
function _setAdminPoll(ms) {
  if (_livePollTimer) clearInterval(_livePollTimer);
  _livePollTimer = setInterval(function() {
    if (document.hidden) return;
    liveSyncFromDB(false);
  }, ms);
}
let _adminVisBound = false;
function startLiveUpdates() {
  stopLiveUpdates();
  _adminRtOk = false;
  // Supabase Realtime — applies each change directly (no full re-fetch)
  try {
    const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
    if (sb && typeof sb.channel === 'function') {
      _rtChannel = sb.channel('admin-live')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, onAdminOrderChange)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, onAdminOrderItemChange)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, onAdminProductChange)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, onAdminCategoryChange)
        .subscribe(function(status) {
          if (status === 'SUBSCRIBED') {
            console.log('[SiBelle] Realtime connected');
            const wasDown = !_adminRtOk;
            _adminRtOk = true;
            _setAdminPoll(60000);              // healthy → rare safety poll
            if (wasDown) liveSyncFromDB(false); // catch up after (re)connect
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            console.warn('[SiBelle] Realtime status:', status, '— fast fallback poll');
            _adminRtOk = false;
            _setAdminPoll(6000);
          }
        });
    }
  } catch (e) {
    console.warn('Realtime setup failed, using polling only', e);
  }
  // Until Realtime confirms, poll at a moderate rate
  _setAdminPoll(8000);
  if (!_adminVisBound) {
    _adminVisBound = true;
    document.addEventListener('visibilitychange', function() { if (!document.hidden) liveSyncFromDB(false); });
  }
  setTimeout(function() { liveSyncFromDB(false); }, 1500);
}

function stopLiveUpdates() {
  if (_livePollTimer) {
    clearInterval(_livePollTimer);
    _livePollTimer = null;
  }
  if (_rtChannel) {
    try {
      const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
      if (sb) sb.removeChannel(_rtChannel);
    } catch (e) {}
    _rtChannel = null;
  }
}

function mapOrderItem(it) {
  if (!it) return null;
  // Extract color/size from many possible column / jsonb shapes
  let color = it.color || it.variant_color || it.couleur || null;
  let size = it.size || it.variant_size || it.taille || it.measure || null;
  // jsonb options / attributes / meta
  const bags = [it.options, it.attributes, it.meta, it.variant, it.extra, it.details];
  bags.forEach(function(bag) {
    if (!bag) return;
    let obj = bag;
    if (typeof bag === 'string') {
      try { obj = JSON.parse(bag); } catch(e) { obj = null; }
    }
    if (obj && typeof obj === 'object') {
      if (!color) color = obj.color || obj.couleur || obj.Color || null;
      if (!size) size = obj.size || obj.taille || obj.Size || obj.measure || null;
    }
  });
  // product_snapshot style
  if (it.product_snapshot && typeof it.product_snapshot === 'object') {
    if (!color) color = it.product_snapshot.color || null;
    if (!size) size = it.product_snapshot.size || null;
  }
  return {
    id: it.product_id != null ? it.product_id : it.id,
    product_id: it.product_id != null ? it.product_id : it.id,
    qty: Number(it.quantity != null ? it.quantity : it.qty) || 1,
    quantity: Number(it.quantity != null ? it.quantity : it.qty) || 1,
    color: color ? String(color) : null,
    size: size ? String(size) : null,
    price: Number(it.unit_price != null ? it.unit_price : (it.price != null ? it.price : (it.line_total != null && it.quantity ? Number(it.line_total)/Number(it.quantity) : 0))) || 0,
    name_ar: it.product_name_ar || it.name_ar || it.name || null,
    name_fr: it.product_name_fr || it.name_fr || it.name || null,
    image: it.image_url || it.image || (it.product_snapshot && it.product_snapshot.image_url) || null,
    _raw: it
  };
}

function mapOrderRow(o) {
  // Support nested order_items from join, or items array, or jsonb items
  let rawItems = [];
  if (Array.isArray(o.order_items)) rawItems = o.order_items;
  else if (Array.isArray(o.items)) rawItems = o.items;
  else if (o.items && typeof o.items === 'object') {
    try { rawItems = Array.isArray(o.items) ? o.items : []; } catch(e) { rawItems = []; }
  }
  const items = rawItems.map(mapOrderItem).filter(Boolean);
  return {
    id: o.id,
    orderNumber: o.order_number,
    name: o.customer_name,
    phone: o.customer_phone,
    email: o.customer_email || '',
    wilaya: o.wilaya,
    commune: o.commune,
    address: o.address,
    payment: o.payment_method_id || 'cod',
    notes: o.notes || '',
    status: o.status,
    items: items,
    total: (Number(o.total) || 0).toLocaleString() + ' دج',
    totalNum: Number(o.total) || 0,
    shipping: Number(o.shipping_cost) || 0,
    discount: Number(o.discount) || 0,
    subtotal: Number(o.subtotal) || 0,
    date: o.created_at,
    history: [],
    _raw: o
  };
}

async function getOrders(force) {
  if (_cache.orders && !force) return _cache.orders;
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) return [];
  // Fast list load — NO order_items join (loaded on demand in ensureOrderItems)
  const res = await sb.from('orders')
    .select('id, order_number, customer_name, customer_phone, customer_email, wilaya, commune, address, payment_method_id, notes, status, total, shipping_cost, discount, subtotal, created_at')
    .order('created_at', { ascending: false })
    .limit(150);
  if (res.error) {
    console.error(res.error);
    // fallback full select
    const res2 = await sb.from('orders').select('*').order('created_at', { ascending: false }).limit(150);
    if (res2.error) { console.error(res2.error); return []; }
    _cache.orders = (res2.data || []).map(mapOrderRow);
  } else {
    _cache.orders = (res.data || []).map(mapOrderRow);
  }
  updateNavBadge();
  return _cache.orders;
}

/** Load items for a single order if missing */
async function ensureOrderItems(order) {
  if (!order) return order;
  if (order.items && order.items.length) return order;
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb || !order.id) return order;
  try {
    const { data, error } = await sb.from('order_items').select('*').eq('order_id', order.id);
    if (!error && data) {
      order.items = data.map(mapOrderItem).filter(Boolean);
    }
  } catch (e) { console.warn(e); }
  return order;
}
function saveOrders() { /* no-op — writes go through specific update functions */ }

function mapAdminProduct(row) {
  const imgs = Array.isArray(row.images) ? row.images.filter(Boolean) : [];
  const main = row.image_url || imgs[0] || '';
  const allImages = imgs.length ? imgs : (main ? [main] : []);
  return {
    id: row.id,
    name: { ar: row.name_ar, fr: row.name_fr },
    category: row.category_id,
    price: Number(row.price) || 0,
    oldPrice: row.old_price != null ? Number(row.old_price) : null,
    image: main,
    images: allImages,
    stock: Number(row.stock) || 0,
    active: true,
    sku: row.sku,
    colors: Array.isArray(row.colors) ? row.colors : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    badge: row.badge_ar || row.badge_fr ? { ar: row.badge_ar, fr: row.badge_fr } : null,
    desc: { ar: row.description_ar || '', fr: row.description_fr || '' },
    _raw: row
  };
}
function mapAdminCategory(c) {
  return {
    id: c.id,
    name: { ar: c.name_ar, fr: c.name_fr },
    image: c.image_url || '',
    active: c.active !== false,
    _raw: c
  };
}
async function getProducts(force) {
  if (_cache.products && !force) return _cache.products;
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) return DEFAULT_PRODUCTS.slice();
  const { data, error } = await sb.from('products').select('*').order('sort_order').order('id');
  if (error) { console.error(error); return []; }
  _cache.products = (data || []).filter(row => row.active !== false).map(mapAdminProduct);
  return _cache.products;
}
async function saveProducts() { /* no-op */ }

async function getCategories(force) {
  if (_cache.categories && !force) return _cache.categories;
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) return DEFAULT_CATEGORIES.slice();
  const { data, error } = await sb.from('categories').select('*').order('sort_order');
  if (error) { console.error(error); return []; }
  // عرض الكل: النشط والمعطّل (للتمكن من الحذف النهائي من اللوحة)
  _cache.categories = (data || []).map(mapAdminCategory);
  return _cache.categories;
}
function saveCategories() { /* no-op */ }

let _contentCache = null;
function getContent() {
  if (_contentCache) return _contentCache;
  try {
    const c = localStorage.getItem('siBelleAdminContent');
    if (c) { _contentCache = JSON.parse(c); return _contentCache; }
  } catch(e) {}
  _contentCache = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  return _contentCache;
}
function saveContent(c) {
  _contentCache = c;
  try { localStorage.setItem('siBelleAdminContent', JSON.stringify(c)); } catch(e) {}
}

/** تحميل النصوص من site_content + announcement */
async function hydrateContentFromDB() {
  try {
    if (typeof SiBelleSB === 'undefined') return getContent();
    const [site, ann] = await Promise.all([
      SiBelleSB.loadSiteContent(),
      SiBelleSB.loadAnnouncement()
    ]);
    const c = getContent();
    if (site) {
      if (site.hero_title_ar || site.hero_title_fr) c.heroTitle = { ar: site.hero_title_ar || '', fr: site.hero_title_fr || '' };
      if (site.hero_subtitle_ar || site.hero_subtitle_fr) c.heroSubtitle = { ar: site.hero_subtitle_ar || '', fr: site.hero_subtitle_fr || '' };
      if (site.hero_description_ar || site.hero_description_fr) c.heroDesc = { ar: site.hero_description_ar || '', fr: site.hero_description_fr || '' };
      if (site.categories_title_ar || site.categories_title_fr) c.catTitle = { ar: site.categories_title_ar || '', fr: site.categories_title_fr || '' };
      if (site.categories_subtitle_ar || site.categories_subtitle_fr) c.catSubtitle = { ar: site.categories_subtitle_ar || '', fr: site.categories_subtitle_fr || '' };
      if (site.featured_title_ar || site.featured_title_fr) c.featuredTitle = { ar: site.featured_title_ar || '', fr: site.featured_title_fr || '' };
      if (site.footer_description_ar || site.footer_description_fr) c.footerDesc = { ar: site.footer_description_ar || '', fr: site.footer_description_fr || '' };
    }
    if (ann) {
      c.topBanner = { ar: ann.text_ar || '', fr: ann.text_fr || '' };
      const s = getSettings();
      s.bannerEnabled = ann.enabled !== false;
      saveSettings(s);
    }
    saveContent(c);
    return c;
  } catch (e) {
    console.warn('hydrateContent', e);
    return getContent();
  }
}
function getSettings() {
  const raw = localStorage.getItem('siBelleAdminSettings');
  let s = raw ? JSON.parse(raw) : null;
  if (!s) {
    s = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem('siBelleAdminSettings', JSON.stringify(s));
    return s;
  }
  // merge defaults for new keys (payments / invoice)
  if (!Array.isArray(s.payments) || !s.payments.length) {
    s.payments = JSON.parse(JSON.stringify(DEFAULT_PAYMENTS));
  }
  if (!s.invoice) {
    s.invoice = JSON.parse(JSON.stringify(DEFAULT_INVOICE));
  } else {
    s.invoice = { ...DEFAULT_INVOICE, ...s.invoice,
      title: { ...DEFAULT_INVOICE.title, ...(s.invoice.title || {}) },
      footer: { ...DEFAULT_INVOICE.footer, ...(s.invoice.footer || {}) },
      companySubtitle: { ...DEFAULT_INVOICE.companySubtitle, ...(s.invoice.companySubtitle || {}) },
      note: { ...DEFAULT_INVOICE.note, ...(s.invoice.note || {}) }
    };
  }
  return s;
}
function saveSettings(s) {
  localStorage.setItem('siBelleAdminSettings', JSON.stringify(s));
  // expose for storefront
  try {
    localStorage.setItem('siBellePayments', JSON.stringify(s.payments || []));
    localStorage.setItem('siBelleInvoice', JSON.stringify(s.invoice || {}));
  } catch (e) {}
}
function getPayments() {
  const s = getSettings();
  return Array.isArray(s.payments) ? s.payments : JSON.parse(JSON.stringify(DEFAULT_PAYMENTS));
}
function getInvoiceConfig() {
  const s = getSettings();
  return s.invoice || JSON.parse(JSON.stringify(DEFAULT_INVOICE));
}

function seedDemoOrders() {
  if (getOrders().length > 0) return;
  const now = Date.now();
  const demo = [
    { orderNumber: 'SB-20260928-4821', name: 'فاطمة بن علي', phone: '0555123456', email: 'fatima@email.com', wilaya: '16 - الجزائر', commune: 'باب الزوار', address: 'حي السلام رقم 12', payment: 'cod', notes: '', status: 'confirmed', items: [{ id: 1, qty: 2 }, { id: 5, qty: 1 }], total: '6,800 دج', totalNum: 6800, shipping: 400, date: new Date(now - 3600000).toISOString(), history: [{ status: 'confirmed', date: new Date(now - 3600000).toISOString() }] },
    { orderNumber: 'SB-20260927-3102', name: 'سارة محمد', phone: '0666987654', email: '', wilaya: '31 - وهران', commune: 'السانية', address: 'شارع الاستقلال', payment: 'baridi', notes: 'مقاس M', status: 'prep', items: [{ id: 2, qty: 1 }], total: '6,500 دج', totalNum: 6500, shipping: 400, date: new Date(now - 86400000).toISOString(), history: [{ status: 'confirmed', date: new Date(now - 86400000).toISOString() }, { status: 'prep', date: new Date(now - 43200000).toISOString() }] },
    { orderNumber: 'SB-20260926-1599', name: 'أمينة خالدي', phone: '0777112233', email: 'amina@mail.dz', wilaya: '25 - قسنطينة', commune: 'الخروب', address: 'حي النصر', payment: 'ccp', notes: '', status: 'shipped', items: [{ id: 7, qty: 1 }, { id: 8, qty: 1 }], total: '17,300 دج', totalNum: 17300, shipping: 0, date: new Date(now - 172800000).toISOString(), history: [{ status: 'confirmed', date: new Date(now - 172800000).toISOString() }, { status: 'prep', date: new Date(now - 129600000).toISOString() }, { status: 'shipped', date: new Date(now - 86400000).toISOString() }] },
    { orderNumber: 'SB-20260925-8840', name: 'مريم بوعلام', phone: '0544332211', email: '', wilaya: '09 - البليدة', commune: 'بوفاريك', address: 'حي الياسمين', payment: 'cod', notes: '', status: 'delivered', items: [{ id: 4, qty: 2 }], total: '6,400 دج', totalNum: 6400, shipping: 400, date: new Date(now - 345600000).toISOString(), history: [{ status: 'confirmed', date: new Date(now - 345600000).toISOString() }, { status: 'prep', date: new Date(now - 302400000).toISOString() }, { status: 'shipped', date: new Date(now - 259200000).toISOString() }, { status: 'delivered', date: new Date(now - 172800000).toISOString() }] },
    { orderNumber: 'SB-20260928-7001', name: 'نادية عماري', phone: '0555001122', email: 'nadia@dz.com', wilaya: '19 - سطيف', commune: 'العلمة', address: 'حي الأمير', payment: 'cod', notes: 'لون وردي', status: 'confirmed', items: [{ id: 6, qty: 1 }], total: '7,200 دج', totalNum: 7200, shipping: 400, date: new Date(now - 7200000).toISOString(), history: [{ status: 'confirmed', date: new Date(now - 7200000).toISOString() }] }
  ];
  saveOrders(demo);
}

function newOrdersCount() {
  return (_cache.orders || []).filter(o => o.status === 'confirmed' || o.status === 'pending').length;
}


/* ===== STAFF ===== */
const DEFAULT_STAFF = [
  { id: 1, name: 'Admin Principal', email: 'admin@sibelle.dz', role: 'admin', perms: ['orders','products','categories','content','settings','staff','analytics'], active: true },
  { id: 2, name: 'سارة مشرفة', email: 'sara@sibelle.dz', role: 'manager', perms: ['orders','products','analytics'], active: true },
  { id: 3, name: 'أمين موظف', email: 'amine@sibelle.dz', role: 'staff', perms: ['orders'], active: true }
];
let _staffCache = null;
function getStaff() {
  if (_staffCache) return _staffCache;
  try {
    const s = localStorage.getItem('siBelleAdminStaff');
    if (s) { _staffCache = JSON.parse(s); return _staffCache; }
  } catch(e) {}
  _staffCache = [...DEFAULT_STAFF];
  return _staffCache;
}
function saveStaff(list) {
  _staffCache = list;
  try { localStorage.setItem('siBelleAdminStaff', JSON.stringify(list)); } catch(e) {}
}
async function hydrateStaffFromDB() {
  try {
    if (typeof SiBelleSB === 'undefined') return getStaff();
    const rows = await SiBelleSB.loadStaffProfiles();
    if (rows && rows.length) {
      _staffCache = rows.map((r, i) => ({
        id: r.id,
        name: r.full_name || r.email || '—',
        email: r.email || '',
        role: r.role || 'staff',
        perms: [],
        active: r.active !== false
      }));
      saveStaff(_staffCache);
    }
    return getStaff();
  } catch (e) {
    console.warn(e);
    return getStaff();
  }
}

/* ===== AUTH (Supabase) ===== */
let _sessionReady = false;
let _isLoggedIn = false;
let _profile = null;

async function refreshAuth() {
  if (typeof SiBelleSB === 'undefined') return false;
  const session = await SiBelleSB.getSession();
  _isLoggedIn = !!session;
  if (session) {
    _profile = await SiBelleSB.getProfile();
  } else {
    _profile = null;
  }
  _sessionReady = true;
  return _isLoggedIn;
}

function isLoggedIn() { return _isLoggedIn; }

async function login(email, password) {
  try {
    if (typeof SiBelleSB === 'undefined') {
      throw new Error('Supabase غير محمّل — تحقق من الاتصال بالإنترنت');
    }
    const client = await SiBelleSB.waitForSupabase(6000);
    if (!client) throw new Error('تعذر تحميل Supabase SDK (CDN)');
    await SiBelleSB.signIn(email, password);
    const ok = await refreshAuth();
    if (!ok) throw new Error('تعذر إنشاء الجلسة');

    // إذا لم يُنشأ الـ profile تلقائياً، أنشئه أو حدّثه
    if (!_profile) {
      const sb = SiBelleSB.getSupabase();
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        await sb.from('profiles').upsert({
          id: user.id,
          email: user.email,
          full_name: user.email,
          role: 'admin',
          active: true
        });
        _profile = await SiBelleSB.getProfile();
      }
    }

    if (_profile && _profile.role && !['admin','manager','staff'].includes(_profile.role)) {
      await SiBelleSB.signOut();
      _isLoggedIn = false;
      throw new Error('هذا الحساب ليس لديه صلاحية دخول اللوحة');
    }
    if (_profile && _profile.active === false) {
      await SiBelleSB.signOut();
      _isLoggedIn = false;
      throw new Error('الحساب معطّل');
    }
    return true;
  } catch (e) {
    console.error('login error', e);
    window._lastLoginError = (e && (e.message || e.error_description || e.msg)) || String(e);
    return false;
  }
}

async function logout() {
  stopLiveUpdates();
  try { await SiBelleSB.signOut(); } catch(e) {}
  _isLoggedIn = false;
  _profile = null;
  location.reload();
}

/* ===== HELPERS ===== */
function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}
function formatDate(iso) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleString(adminLang === 'ar' ? 'ar-DZ' : 'fr-DZ', { dateStyle: 'medium', timeStyle: 'short' }); }
  catch { return iso; }
}
/** Compress an image (File or data-URL) to a small JPEG data-URL (max side 1000px) */
function compressImage(src, maxSide, quality) {
  maxSide = maxSide || 1000; quality = quality || 0.82;
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let w = img.naturalWidth, h = img.naturalHeight;
      const k = Math.min(1, maxSide / Math.max(w, h));
      w = Math.max(1, Math.round(w * k)); h = Math.max(1, Math.round(h * k));
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(c.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => reject(new Error('image load failed'));
    if (typeof src === 'string') img.src = src;
    else { const r = new FileReader(); r.onload = () => { img.src = r.result; }; r.onerror = reject; r.readAsDataURL(src); }
  });
}
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) { reject(new Error('not image')); return; }
    if (file.size > 12 * 1024 * 1024) { toast(adminLang === 'ar' ? 'الصورة كبيرة جداً (حد 12MB)' : 'Image trop grande (max 12MB)'); reject(new Error('size')); return; }
    compressImage(file, 1000, 0.82).then(resolve).catch(reject);
  });
}
function dataUrlToBlob(d) {
  const parts = d.split(','); const mime = (parts[0].match(/:(.*?);/) || [])[1] || 'image/jpeg';
  const bin = atob(parts[1]); const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}
let _storageBroken = false;
/** Upload a data-URL to Supabase Storage → public URL. Falls back to the (already compressed) data-URL. */
async function uploadImageToStorage(dataUrl, folder) {
  if (!dataUrl || dataUrl.indexOf('data:') !== 0) return dataUrl;
  if (_storageBroken) return dataUrl;
  try {
    const sb = SiBelleSB.getSupabase();
    const blob = dataUrlToBlob(dataUrl);
    const path = (folder || 'products') + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.jpg';
    const { error } = await sb.storage.from('product-images').upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false });
    if (error) throw error;
    const { data } = sb.storage.from('product-images').getPublicUrl(path);
    return (data && data.publicUrl) || dataUrl;
  } catch (e) {
    console.warn('Storage upload failed — run REALTIME_AND_STORAGE.sql. Using compressed inline image.', e);
    _storageBroken = true;
    return dataUrl;
  }
}
async function resolveImages(list, folder) {
  return Promise.all((list || []).map(u => (u && u.indexOf('data:') === 0) ? uploadImageToStorage(u, folder) : u));
}
function setupUpload(zoneId, previewId, onData) {
  const zone = document.getElementById(zoneId);
  const preview = document.getElementById(previewId);
  if (!zone) return;
  const input = zone.querySelector('input[type=file]');
  const handle = async (file) => {
    try {
      const data = await fileToDataUrl(file);
      pendingImageData = data;
      if (preview) { preview.src = data; preview.classList.add('show'); }
      if (onData) onData(data);
    } catch (e) {}
  };
  input?.addEventListener('change', e => { if (e.target.files[0]) handle(e.target.files[0]); });
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('dragover');
    if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]);
  });
}

/* ===== NAV ===== */
function showPage(page) {
  currentPage = page;
  pendingImageData = null;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === page));
  document.getElementById('pageTitle').textContent = t(page);
  updateNavBadge();
  renderPage();
  closeSidebar();
}
function updateNavBadge() {
  const badge = document.getElementById('ordersBadge');
  if (!badge) return;
  // Show total orders count (more visible); fall back to new if empty list loading
  const total = (_cache.orders || []).length;
  const n = total > 0 ? total : newOrdersCount();
  badge.textContent = n > 0 ? String(n) : '';
  badge.style.display = n > 0 ? 'flex' : 'none';
  badge.style.background = '#e74c3c';
  badge.style.color = '#fff';
}
async function renderPage() {
  const el = document.getElementById('pageContent');
  if (!el) return;
  const hasCache = (_cache.orders || _cache.products || _cache.categories);
  if (!hasCache) {
    el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--muted)">Loading...</div>';
  }
  try {
    // Load only data needed for current page (faster)
    const page = currentPage;
    const tasks = [];
    if (page === 'orders' || page === 'dashboard' || page === 'analytics' || page === 'map') {
      tasks.push(getOrders());
    }
    if (page === 'products' || page === 'dashboard' || page === 'orders') {
      tasks.push(getProducts());
    }
    if (page === 'categories' || page === 'products' || page === 'dashboard') {
      tasks.push(getCategories());
    }
    if (tasks.length) await Promise.all(tasks);
  } catch(e) { console.error(e); }
  const map = {
    dashboard: renderDashboard, orders: renderOrders, products: renderProducts,
    categories: renderCategories, content: renderContent, settings: renderSettings,
    analytics: renderAnalytics, map: renderMap, staff: renderStaff,
    payments: renderPayments, invoice: renderInvoice, shipping: renderShipping
  };
  const fn = map[currentPage] || renderDashboard;
  const html = await Promise.resolve(fn());
  el.innerHTML = html || '';
  updateNavBadge();
}

/* ===== DASHBOARD ===== */
function getLast7DaysBuckets() {
  const orders = (_cache.orders || []).filter(o => o.status !== 'cancelled');
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const isToday = i === 0;
    days.push({
      date: d,
      isToday,
      label: d.toLocaleDateString(adminLang === 'ar' ? 'ar-DZ' : 'fr-DZ', { weekday: 'short' }),
      dayNum: d.getDate(),
      count: 0,
      revenue: 0,
      newCount: 0
    });
  }
  (_cache.orders || []).forEach(o => {
    const od = new Date(o.date);
    od.setHours(0, 0, 0, 0);
    const bucket = days.find(d => d.date.getTime() === od.getTime());
    if (!bucket) return;
    if (o.status !== 'cancelled') {
      bucket.count++;
      bucket.revenue += o.totalNum || 0;
    }
    if (o.status === 'confirmed') bucket.newCount++;
  });
  return days;
}

function goToOrdersFiltered(status) {
  _orderStatusFilter = status || 'all';
  _orderTimeFilter = 'all';
  showPage('orders');
}


function renderDashboard() {
  const orders = _cache.orders || [];
  const products = _cache.products || [];
  const activeOrders = orders.filter(o => o.status !== 'cancelled');
  const revenue = activeOrders.reduce((s, o) => s + (o.totalNum || 0), 0);
  const shippingTotal = activeOrders.reduce((s, o) => s + (o.shipping || 0), 0);
  const pending = orders.filter(o => o.status === 'confirmed' || o.status === 'prep').length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const newO = newOrdersCount();
  const today = new Date().toDateString();
  const todayCount = orders.filter(o => new Date(o.date).toDateString() === today).length;
  const todayRevenue = orders.filter(o => new Date(o.date).toDateString() === today && o.status !== 'cancelled')
    .reduce((s, o) => s + (o.totalNum || 0), 0);
  const avg = activeOrders.length ? Math.round(revenue / activeOrders.length) : 0;
  const recent = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);
  const conv = orders.length ? (delivered / orders.length) * 100 : 0;
  const days = getLast7DaysBuckets();
  const maxDayCount = Math.max(1, ...days.map(d => d.count));
  const lowStock = products.filter(p => (p.stock || 0) <= 10 && p.active !== false).length;
  const greeting = adminLang === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Bienvenue sur le tableau de bord';
  const sub = adminLang === 'ar' ? 'نظرة واضحة ومنظّمة على أداء المتجر' : 'Vue claire et organisée des performances';
  const daysTitle = adminLang === 'ar' ? 'الطلبات حسب الأيام' : 'Commandes par jour';
  const controlTitle = adminLang === 'ar' ? 'تحكم سريع' : 'Contrôle rapide';
  const todayLabel = adminLang === 'ar' ? 'اليوم' : "Aujourd'hui";

  return `
    <div class="dash-hero">
      <div>
        <h1>${greeting}</h1>
        <p>${sub}</p>
      </div>
      <div class="hero-stats">
        <div class="hs-item"><strong>${revenue.toLocaleString()}</strong><span>${t('revenue')} ${t('currency')}</span></div>
        <div class="hs-item"><strong>${orders.length}</strong><span>${t('totalOrders')}</span></div>
        <div class="hs-item"><strong>${avg.toLocaleString()}</strong><span>${t('avgOrder')}</span></div>
        <div class="hs-item hs-today"><strong>${todayCount}</strong><span>${t('todayOrders')}</span></div>
      </div>
    </div>

    <!-- Quick control -->
    <div class="dash-control">
      <div class="dash-control-head">
        <h3>${controlTitle}</h3>
        <span class="dash-live-dot">● Live</span>
      </div>
      <div class="dash-control-grid">
        <button type="button" class="ctrl-btn ctrl-gold" onclick="goToOrdersFiltered('confirmed')">
          <span class="ctrl-num">${newO}</span>
          <span class="ctrl-label">${t('newOrders')}</span>
          <span class="ctrl-hint">${adminLang === 'ar' ? 'اضغط للعرض' : 'Voir'}</span>
        </button>
        <button type="button" class="ctrl-btn ctrl-blue" onclick="goToOrdersFiltered('prep')">
          <span class="ctrl-num">${orders.filter(o => o.status === 'prep').length}</span>
          <span class="ctrl-label">${t('prep')}</span>
          <span class="ctrl-hint">${adminLang === 'ar' ? 'قيد التحضير' : 'En préparation'}</span>
        </button>
        <button type="button" class="ctrl-btn ctrl-purple" onclick="goToOrdersFiltered('shipped')">
          <span class="ctrl-num">${orders.filter(o => o.status === 'shipped').length}</span>
          <span class="ctrl-label">${t('shipped')}</span>
          <span class="ctrl-hint">${adminLang === 'ar' ? 'في الطريق' : 'En route'}</span>
        </button>
        <button type="button" class="ctrl-btn ctrl-green" onclick="goToOrdersFiltered('delivered')">
          <span class="ctrl-num">${delivered}</span>
          <span class="ctrl-label">${t('deliveredSt')}</span>
          <span class="ctrl-hint">${Math.round(conv)}% ${t('conversion')}</span>
        </button>
        <button type="button" class="ctrl-btn ctrl-orange" onclick="showPage('products')">
          <span class="ctrl-num">${lowStock}</span>
          <span class="ctrl-label">${t('lowStock')}</span>
          <span class="ctrl-hint">${adminLang === 'ar' ? 'مخزون ≤ 10' : 'Stock ≤ 10'}</span>
        </button>
        <button type="button" class="ctrl-btn ctrl-neutral" onclick="showPage('orders')">
          <span class="ctrl-num">${orders.length}</span>
          <span class="ctrl-label">${t('allOrders')}</span>
          <span class="ctrl-hint">${t('viewAll')}</span>
        </button>
      </div>
    </div>

    <!-- Days strip -->
    <div class="panel days-panel">
      <div class="panel-header">
        <h3>${daysTitle}</h3>
        <div class="days-summary">
          <span>${todayLabel}: <strong>${todayCount}</strong> · ${todayRevenue.toLocaleString()} ${t('currency')}</span>
        </div>
      </div>
      <div class="panel-body days-body">
        <div class="days-strip">
          ${days.map(d => {
            const h = Math.round((d.count / maxDayCount) * 100);
            return `<div class="day-card ${d.isToday ? 'day-today' : ''} ${d.count ? 'has-orders' : ''}" title="${d.revenue.toLocaleString()} ${t('currency')}">
              <div class="day-bar-wrap"><div class="day-bar" style="height:${Math.max(8, h)}%"></div></div>
              <div class="day-count">${d.count}</div>
              <div class="day-label">${d.label}</div>
              <div class="day-num">${d.dayNum}</div>
              ${d.newCount ? `<span class="day-badge">${d.newCount}</span>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    ${buildOrdersLineChart()}

    <div class="stats-grid">
      <div class="stat-card gold">
        <div class="stat-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/></svg>
        </div>
        <div class="stat-label">${t('totalOrders')}</div>
        <div class="stat-value">${orders.length}</div>
        <div class="stat-sub">${pending} ${t('pending')}</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="1.8"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="stat-label">${t('revenue')}</div>
        <div class="stat-value">${revenue.toLocaleString()}</div>
        <div class="stat-sub">${t('currency')}</div>
      </div>
      <div class="stat-card blue">
        <div class="stat-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/></svg>
        </div>
        <div class="stat-label">${t('productsCount')}</div>
        <div class="stat-value">${products.length}</div>
        <div class="stat-sub">${products.filter(p => p.active !== false).length} ${t('active')}</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="1.8"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>
        <div class="stat-label">${t('shippingFees')}</div>
        <div class="stat-value">${shippingTotal.toLocaleString()}</div>
        <div class="stat-sub">${t('currency')}</div>
      </div>
    </div>

    <!-- Recent orders — strong cards -->
    <div class="panel">
      <div class="panel-header">
        <h3>${t('recentOrders')}</h3>
        <button class="btn btn-ghost btn-sm" onclick="showPage('orders')">${t('viewAll')}</button>
      </div>
      <div class="panel-body" style="padding:12px 16px 16px">
        ${recent.length ? renderRecentOrdersCards(recent) : `<div class="empty-state"><div class="icon">📦</div>${t('noOrders')}</div>`}
      </div>
    </div>

    <!-- Status distribution clickable -->
    <div class="panel">
      <div class="panel-header"><h3>${t('orderStatus')}</h3></div>
      <div class="panel-body">
        <div class="status-dist-grid">
          ${STATUS_KEYS.map(s => {
            const c = orders.filter(o => o.status === s).length;
            const pct = orders.length ? Math.round((c / orders.length) * 100) : 0;
            return `<button type="button" class="status-dist-card" onclick="goToOrdersFiltered('${s}')">
              <div class="status ${statusCls(s)}">${statusLabel(s)}</div>
              <div class="sd-num">${c}</div>
              <div class="sd-bar"><div class="sd-fill ${statusCls(s)}" style="width:${pct}%"></div></div>
              <div class="sd-pct">${pct}%</div>
            </button>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

function renderRecentOrdersCards(orders) {
  return `<div class="recent-orders-list">
    ${orders.map(o => {
      const wilayaShort = (o.wilaya || '—').replace(/^\d+\s*-\s*/, '');
      const itemsCount = (o.items || []).reduce((s, it) => s + (it.qty || 1), 0);
      return `<div class="ro-card" onclick="openOrderDetail('${o.orderNumber}')">
        <div class="ro-left">
          <div class="ro-num">${o.orderNumber || '—'}</div>
          <div class="ro-name">${o.name || '—'}</div>
          <div class="ro-meta">
            <span dir="ltr">${o.phone || '—'}</span>
            <span class="ro-dot">·</span>
            <span>${wilayaShort}</span>
            <span class="ro-dot">·</span>
            <span>${itemsCount} ${adminLang === 'ar' ? 'منتج' : 'art.'}</span>
          </div>
        </div>
        <div class="ro-right">
          <div class="ro-total">${o.total || '—'}</div>
          <span class="status ${statusCls(o.status)}">${statusLabel(o.status)}</span>
          <div class="ro-date">${formatDate(o.date)}</div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}



function isSameDay(iso, ref) {
  if (!iso) return false;
  const a = new Date(iso);
  const b = ref || new Date();
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isYesterday(iso) {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return isSameDay(iso, y);
}
function timeBucketLabel(iso) {
  if (isSameDay(iso)) return adminLang === 'ar' ? 'اليوم' : "Aujourd'hui";
  if (isYesterday(iso)) return adminLang === 'ar' ? 'أمس' : 'Hier';
  return null;
}
function formatDateShort(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (isSameDay(iso)) {
      return d.toLocaleTimeString(adminLang === 'ar' ? 'ar-DZ' : 'fr-DZ', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleString(adminLang === 'ar' ? 'ar-DZ' : 'fr-DZ', { dateStyle: 'medium', timeStyle: 'short' });
  } catch { return iso; }
}

function renderOrders() {
  const orders = _cache.orders || [];
  const filter = _orderStatusFilter;
  const timeFilter = _orderTimeFilter;
  // Prefer live input if present, else stored query (survives re-render)
  const liveSearch = document.getElementById('orderSearch');
  if (liveSearch) _orderSearchQuery = liveSearch.value || '';
  const search = (_orderSearchQuery || '').trim().toLowerCase();
  let list = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filter !== 'all') list = list.filter(o => o.status === filter);
  if (timeFilter === 'today') list = list.filter(o => isSameDay(o.date));
  else if (timeFilter === 'yesterday') list = list.filter(o => isYesterday(o.date));
  else if (timeFilter === 'week') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);
    list = list.filter(o => new Date(o.date) >= weekAgo);
  }
  if (search) {
    const digits = search.replace(/\D/g, '');
    list = list.filter(o => {
      const num = (o.orderNumber || '').toLowerCase();
      const name = (o.name || '').toLowerCase();
      const phone = String(o.phone || '');
      const wilaya = (o.wilaya || '').toLowerCase();
      const commune = (o.commune || '').toLowerCase();
      const email = (o.email || '').toLowerCase();
      return num.includes(search)
        || name.includes(search)
        || phone.includes(search)
        || (digits && phone.replace(/\D/g, '').includes(digits))
        || wilaya.includes(search)
        || commune.includes(search)
        || email.includes(search);
    });
  }

  const counts = {
    all: orders.length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    prep: orders.filter(o => o.status === 'prep').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    today: orders.filter(o => isSameDay(o.date)).length
  };

  const timeLabels = {
    all: adminLang === 'ar' ? 'كل الأوقات' : 'Toutes dates',
    today: adminLang === 'ar' ? 'اليوم' : "Aujourd'hui",
    yesterday: adminLang === 'ar' ? 'أمس' : 'Hier',
    week: adminLang === 'ar' ? 'آخر 7 أيام' : '7 derniers jours'
  };

  return `
    <div class="orders-page">
      <div class="orders-chips">
        <button type="button" class="ochip ${filter === 'all' ? 'active' : ''}" onclick="setOrderStatusFilter('all')">
          <span class="ochip-dot all"></span>${adminLang === 'ar' ? 'الكل' : 'Tous'} <em>${counts.all}</em>
        </button>
        <button type="button" class="ochip ochip-confirmed ${filter === 'confirmed' ? 'active' : ''}" onclick="setOrderStatusFilter('confirmed')">
          <span class="ochip-dot confirmed"></span>${statusLabel('confirmed')} <em>${counts.confirmed}</em>
        </button>
        <button type="button" class="ochip ochip-prep ${filter === 'prep' ? 'active' : ''}" onclick="setOrderStatusFilter('prep')">
          <span class="ochip-dot prep"></span>${statusLabel('prep')} <em>${counts.prep}</em>
        </button>
        <button type="button" class="ochip ochip-shipped ${filter === 'shipped' ? 'active' : ''}" onclick="setOrderStatusFilter('shipped')">
          <span class="ochip-dot shipped"></span>${statusLabel('shipped')} <em>${counts.shipped}</em>
        </button>
        <button type="button" class="ochip ochip-delivered ${filter === 'delivered' ? 'active' : ''}" onclick="setOrderStatusFilter('delivered')">
          <span class="ochip-dot delivered"></span>${statusLabel('delivered')} <em>${counts.delivered}</em>
        </button>
        <button type="button" class="ochip ochip-cancelled ${filter === 'cancelled' ? 'active' : ''}" onclick="setOrderStatusFilter('cancelled')">
          <span class="ochip-dot cancelled"></span>${statusLabel('cancelled')} <em>${counts.cancelled}</em>
        </button>
      </div>

      <div class="orders-time-chips">
        <button type="button" class="tchip ${timeFilter === 'all' ? 'active' : ''}" onclick="setOrderTimeFilter('all')">${timeLabels.all}</button>
        <button type="button" class="tchip tchip-today ${timeFilter === 'today' ? 'active' : ''}" onclick="setOrderTimeFilter('today')">
          ${timeLabels.today} <em>${counts.today}</em>
        </button>
        <button type="button" class="tchip ${timeFilter === 'yesterday' ? 'active' : ''}" onclick="setOrderTimeFilter('yesterday')">${timeLabels.yesterday}</button>
        <button type="button" class="tchip ${timeFilter === 'week' ? 'active' : ''}" onclick="setOrderTimeFilter('week')">${timeLabels.week}</button>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>${t('allOrders')} <span class="orders-count-pill">${list.length}</span></h3>
          <div class="filters">
            <input type="search" id="orderSearch" placeholder="${t('search')}" value="${search.replace(/"/g, '')}" oninput="debounceOrders()">
          </div>
        </div>
        <div class="panel-body" style="padding:0">
          ${list.length ? renderOrdersTable(list) : `<div class="empty-state"><div class="icon">📦</div>${t('noOrders')}</div>`}
        </div>
      </div>
    </div>`;
}

function setOrderStatusFilter(status) {
  _orderStatusFilter = status || 'all';
  renderPage();
}

function setOrderTimeFilter(tf) {
  _orderTimeFilter = tf || 'all';
  renderPage();
}


let _ordersTimer;
function debounceOrders() {
  const el = document.getElementById('orderSearch');
  if (el) _orderSearchQuery = el.value || '';
  clearTimeout(_ordersTimer);
  _ordersTimer = setTimeout(function() {
    // Soft re-render orders only (keep focus / no Loading wipe)
    if (currentPage === 'orders') {
      softRenderOrders();
    } else {
      renderPage();
    }
  }, 220);
}

async function softRenderOrders() {
  const el = document.getElementById('pageContent');
  if (!el) return;
  try { await getOrders(); } catch(e) {}
  const html = renderOrders();
  el.innerHTML = html || '';
  // restore focus + cursor at end of search
  const inp = document.getElementById('orderSearch');
  if (inp) {
    inp.focus();
    const len = inp.value.length;
    try { inp.setSelectionRange(len, len); } catch(e) {}
  }
  updateNavBadge();
}

function renderOrdersTable(orders, compact) {
  return `<div class="table-wrap orders-table-wrap"><table class="orders-table">
    <thead><tr>
      <th>${t('orderNum')}</th><th>${t('customer')}</th><th>${t('phone')}</th>
      ${compact ? '' : `<th>${t('wilaya')}</th>`}
      <th>${t('amount')}</th><th>${t('status')}</th><th>${t('date')}</th><th></th>
    </tr></thead>
    <tbody>
      ${orders.map(o => {
        const today = isSameDay(o.date);
        const yest = isYesterday(o.date);
        const bucket = timeBucketLabel(o.date);
        const rowCls = [
          'order-row',
          `row-status-${o.status || 'unknown'}`,
          today ? 'row-today' : '',
          yest ? 'row-yesterday' : '',
          o.status === 'cancelled' ? 'row-cancelled' : '',
          o.status === 'confirmed' ? 'row-confirmed' : ''
        ].filter(Boolean).join(' ');
        return `<tr class="${rowCls}">
          <td>
            <strong class="ord-num">${o.orderNumber || '—'}</strong>
            ${bucket ? `<span class="time-badge ${today ? 'badge-today' : 'badge-yest'}">${bucket}</span>` : ''}
          </td>
          <td>${o.name || '—'}</td>
          <td dir="ltr">${o.phone || '—'}</td>
          ${compact ? '' : `<td>${(o.wilaya || '—').replace(/^\d+\s*-\s*/, '')}</td>`}
          <td><strong class="ord-total">${o.total || '—'}</strong></td>
          <td><span class="status ${statusCls(o.status)} status-lg">${statusLabel(o.status)}</span></td>
          <td class="ord-date-cell">
            <span class="ord-date ${today ? 'date-today' : ''}">${formatDateShort(o.date)}</span>
          </td>
          <td style="white-space:nowrap">
            <button class="btn btn-ghost btn-sm" onclick="openOrderDetail('${o.orderNumber}')">${t('view')}</button>
            <button class="btn btn-ghost btn-sm" style="color:#c0392b" title="${adminLang==='ar'?'حذف':'Supprimer'}" onclick="event.stopPropagation();deleteOrder('${o.orderNumber}')">🗑</button>
          </td>
        </tr>`;
      }).join('')}
    </tbody>
  </table></div>`;
}


async function openOrderDetail(orderNumber) {
  let order = (_cache.orders || []).find(o => o.orderNumber === orderNumber);
  if (!order) return;
  // Load order items if not present
  await ensureOrderItems(order);
  await getProducts();
  const products = _cache.products || [];

  // Fallback: parse color/size from notes "التفاصيل: 1) لون: x · مقاس: y"
  if (order.notes) {
    const noteStr = String(order.notes);
    (order.items || []).forEach(function(it, idx) {
      if (it.color && it.size) return;
      // try patterns
      const reColor = /(?:لون|Couleur)\s*:\s*([^·|\n]+)/gi;
      const reSize = /(?:مقاس|Taille)\s*:\s*([^·|\n]+)/gi;
      let m;
      const colors = []; const sizes = [];
      while ((m = reColor.exec(noteStr))) colors.push(m[1].trim());
      while ((m = reSize.exec(noteStr))) sizes.push(m[1].trim());
      if (!it.color && colors[idx]) it.color = colors[idx];
      else if (!it.color && colors[0] && (order.items||[]).length === 1) it.color = colors[0];
      if (!it.size && sizes[idx]) it.size = sizes[idx];
      else if (!it.size && sizes[0] && (order.items||[]).length === 1) it.size = sizes[0];
    });
  }

  const itemsHtml = (order.items || []).map(it => {
    const pid = it.product_id != null ? it.product_id : it.id;
    const p = products.find(x => x.id === pid || String(x.id) === String(pid));
    const name = (adminLang === 'ar'
      ? (it.name_ar || p?.name?.ar || it.name_fr || p?.name?.fr)
      : (it.name_fr || p?.name?.fr || it.name_ar || p?.name?.ar)) || ('#' + (pid || '?'));
    const unitPrice = Number(it.price) || (p ? Number(p.price) : 0) || 0;
    const qty = Number(it.qty || it.quantity) || 1;
    const lineTotal = unitPrice * qty;
    const imgSrc = it.image || p?.image || (p?.images && p.images[0]) || '';
    const img = imgSrc
      ? `<img src="${imgSrc}" alt="" style="width:56px;height:56px;border-radius:12px;object-fit:cover;flex-shrink:0">`
      : `<div style="width:56px;height:56px;border-radius:12px;background:var(--cream-dark);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${p?.icon || '🛍️'}</div>`;
    const variantParts = [];
    if (it.color) variantParts.push('<span style="display:inline-flex;align-items:center;gap:4px;background:rgba(201,162,39,0.12);padding:2px 10px;border-radius:20px;font-size:0.78rem">' + (adminLang === 'ar' ? 'اللون: ' : 'Couleur: ') + '<strong>' + it.color + '</strong></span>');
    if (it.size) variantParts.push('<span style="display:inline-flex;align-items:center;gap:4px;background:rgba(201,162,39,0.12);padding:2px 10px;border-radius:20px;font-size:0.78rem">' + (adminLang === 'ar' ? 'المقاس: ' : 'Taille: ') + '<strong>' + it.size + '</strong></span>');
    const variantLine = variantParts.length
      ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">${variantParts.join('')}</div>`
      : `<div style="font-size:0.78rem;color:var(--brown-light);margin-top:4px;font-style:italic">${adminLang==='ar'?'(لم يُحفظ اللون/المقاس في قاعدة البيانات)':'(Couleur/taille non enregistrées en base)'}</div>`;
    const qtyLabel = adminLang === 'ar' ? 'الكمية' : 'Qté';
    return `<div class="order-item-row" style="display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid var(--border)">
      ${img}
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;line-height:1.35">${name}</div>
        ${variantLine}
        <div style="font-size:0.82rem;color:var(--brown-light);margin-top:4px">${qtyLabel}: <strong>${qty}</strong> × ${unitPrice.toLocaleString()} ${t('currency')}</div>
      </div>
      <div style="font-weight:700;color:var(--gold-dark);white-space:nowrap">${lineTotal.toLocaleString()} ${t('currency')}</div>
    </div>`;
  }).join('');

  const statusIdx = ['confirmed', 'prep', 'shipped', 'delivered'].indexOf(order.status);
  const timeline = ['confirmed', 'prep', 'shipped', 'delivered'].map((s, i) => {
    const hist = (order.history || []).find(h => h.status === s);
    let cls = '';
    if (order.status !== 'cancelled') {
      if (i < statusIdx) cls = 'done';
      else if (i === statusIdx) cls = 'active';
    }
    return `<div class="timeline-item ${cls}">
      <div class="timeline-dot">${i < statusIdx ? '✓' : (i === statusIdx ? '●' : i + 1)}</div>
      <div><div class="timeline-label">${statusLabel(s)}</div><div class="timeline-date">${hist ? formatDate(hist.date) : '—'}</div></div>
    </div>`;
  }).join('');

  const payMap = { cod: t('cod'), ccp: t('ccp'), baridi: t('baridi') };

  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay show" onclick="if(event.target===this)closeModal()">
      <div class="modal modal-lg">
        <div class="modal-header">
          <h3>${t('orderDetails')} — ${order.orderNumber}</h3>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="order-detail-grid">
            <div>
              <div class="detail-block">
                <h4>${t('customerInfo')}</h4>
                <div class="detail-row"><span class="l">${t('customer')}</span><span class="v">${order.name}</span></div>
                <div class="detail-row"><span class="l">${t('phone')}</span><span class="v" dir="ltr">${order.phone}</span></div>
                <div class="detail-row"><span class="l">${t('email')}</span><span class="v">${order.email || '—'}</span></div>
                <div class="detail-row"><span class="l">${t('wilaya')}</span><span class="v">${order.wilaya}</span></div>
                <div class="detail-row"><span class="l">Commune</span><span class="v">${order.commune}</span></div>
                <div class="detail-row"><span class="l">${t('address')}</span><span class="v">${order.address}</span></div>
                <div class="detail-row"><span class="l">${t('payment')}</span><span class="v">${payMap[order.payment] || order.payment}</span></div>
                ${order.notes ? `<div class="detail-row"><span class="l">${t('notes')}</span><span class="v">${order.notes}</span></div>` : ''}
              </div>
              <div class="detail-block">
                <h4>${t('productsLabel')}</h4>
                ${itemsHtml || (adminLang==='ar' ? '<p style="color:var(--brown-light);padding:8px 0">لا توجد تفاصيل منتجات محفوظة لهذا الطلب</p>' : '<p style="color:var(--brown-light);padding:8px 0">Aucun détail produit pour cette commande</p>')}
                ${order.shipping ? `<div class="detail-row" style="margin-top:8px"><span class="l">${adminLang==='ar'?'التوصيل':'Livraison'}</span><span class="v">${Number(order.shipping).toLocaleString()} ${t('currency')}</span></div>` : ''}
                ${order.discount ? `<div class="detail-row"><span class="l">${adminLang==='ar'?'خصم':'Remise'}</span><span class="v">-${Number(order.discount).toLocaleString()} ${t('currency')}</span></div>` : ''}
                <div class="detail-row" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
                  <span class="l">${t('total')}</span><span class="v" style="color:var(--gold-dark);font-size:1.15rem">${order.total}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="detail-block">
                <h4>${t('trackStatus')}</h4>
                <div class="timeline">${timeline}</div>
              </div>
              <div class="detail-block">
                <h4>${t('updateStatus')}</h4>
                <select id="newStatus" style="margin-bottom:12px">
                  ${STATUS_KEYS.map(s => `<option value="${s}" ${order.status===s?'selected':''}>${statusLabel(s)}</option>`).join('')}
                </select>
                <button class="btn btn-primary" style="width:100%;margin-bottom:8px" onclick="updateOrderStatus('${order.orderNumber}')">${t('saveStatus')}</button>
                <button class="btn btn-ghost" style="width:100%;margin-bottom:8px" onclick="printOrderInvoice('${order.orderNumber}')">🖨 ${t('printInvoice')}</button>
                <button class="btn btn-danger" style="width:100%" onclick="deleteOrder('${order.orderNumber}')">${adminLang==='ar'?'🗑 حذف الطلب':'🗑 Supprimer'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}


async function deleteOrder(orderNumber) {
  const order = (_cache.orders || []).find(o => o.orderNumber === orderNumber);
  if (!order) return;
  const ok = confirm(adminLang === 'ar'
    ? ('حذف الطلب ' + orderNumber + ' نهائياً؟')
    : ('Supprimer définitivement la commande ' + orderNumber + ' ?'));
  if (!ok) return;
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) { toast('Supabase non connecté'); return; }
  try {
    // delete items first if table exists
    if (order.id) {
      try { await sb.from('order_items').delete().eq('order_id', order.id); } catch (e) {}
      const { error } = await sb.from('orders').delete().eq('id', order.id);
      if (error) throw error;
    } else {
      const { error } = await sb.from('orders').delete().eq('order_number', orderNumber);
      if (error) throw error;
    }
    _cache.orders = (_cache.orders || []).filter(o => o.orderNumber !== orderNumber);
    closeModal();
    updateNavBadge();
    toast(adminLang === 'ar' ? 'تم حذف الطلب' : 'Commande supprimée');
    if (currentPage === 'orders' || currentPage === 'dashboard') renderPage();
  } catch (e) {
    console.error(e);
    toast((e && e.message) || (adminLang === 'ar' ? 'فشل الحذف' : 'Échec suppression'));
  }
}

async function updateOrderStatus(orderNumber) {
  const newStatus = document.getElementById('newStatus')?.value;
  if (!newStatus) return;
  const orders = _cache.orders || [];
  const order = orders.find(o => o.orderNumber === orderNumber);
  if (!order || !order.id) { toast('Order not found'); return; }
  // map UI status to DB enum if needed
  const statusMap = { confirmed: 'confirmed', prep: 'preparing', shipped: 'shipped', delivered: 'delivered', cancelled: 'cancelled' };
  const dbStatus = statusMap[newStatus] || newStatus;
  try {
    const sb = SiBelleSB.getSupabase();
    const { error } = await sb.rpc('update_order_status', {
      p_order_id: order.id,
      p_status: dbStatus,
      p_note: null
    });
    if (error) throw error;
    // refresh cache
    await getOrders(true);
    toast(t('saved'));
    closeModal();
    updateNavBadge();
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}
function closeModal() { document.getElementById('modalRoot').innerHTML = ''; pendingImageData = null; pendingProductImages = []; }

/* ===== PRODUCTS ===== */
function renderProducts() {
  const products = _cache.products || [];
  return `
    <div class="panel">
      <div class="panel-header">
        <h3>${t('products')} (${products.length})</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="optimizeExistingImages()" title="${adminLang==='ar'?'ضغط الصور القديمة ورفعها لتسريع الموقع':'Compresser les anciennes images'}">⚡ ${adminLang==='ar'?'تسريع الصور':'Optimiser images'}</button>
          <button class="btn btn-primary btn-sm" onclick="openProductForm()">+ ${t('addProduct')}</button>
        </div>
      </div>
      <div class="panel-body">
        ${products.length ? `<div class="prod-grid">${products.map(p => `
          <div class="prod-card">
            <img src="${p.image || '../images/p1.png'}" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22><rect fill=%22%23F5EDE6%22 width=%22200%22 height=%22150%22/></svg>'">
            <div class="prod-card-body">
              <h4>${p.name?.ar || '—'}</h4>
              <div style="font-size:0.8rem;color:var(--brown-light);margin-bottom:4px">${p.name?.fr || ''}</div>
              <div class="price">${Number(p.price).toLocaleString()} ${t('currency')}</div>
              <div style="font-size:0.78rem;color:var(--brown-light);margin-top:4px">${t('stock')}: ${p.stock ?? '—'}</div>
              <div class="actions" style="flex-wrap:wrap;gap:6px">
                <button class="btn btn-ghost btn-sm" onclick="openProductForm(${p.id})">${t('edit')}</button>
                <button class="btn btn-ghost btn-sm" onclick="disableProduct(${p.id})" title="تعطيل">${adminLang==='ar'?'تعطيل':'Désactiver'}</button>
                <button class="btn btn-danger btn-sm" onclick="hardDeleteProduct(${p.id})" title="حذف نهائي">${adminLang==='ar'?'حذف نهائي':'Supprimer'}</button>
              </div>
            </div>
          </div>`).join('')}</div>` : `<div class="empty-state"><div class="icon">🛍️</div>${t('noProducts')}</div>`}
      </div>
    </div>`;
}

function openProductForm(id) {
  const products = _cache.products || [];
  const p = id ? products.find(x => x.id === id) : null;
  const cats = _cache.categories || [];
  pendingImageData = null;
  // load existing images: prefer images array, fallback to single image
  const existing = (p?.images && p.images.length) ? p.images.slice() : (p?.image ? [p.image] : []);
  pendingProductImages = existing.filter(Boolean);
  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay show" onclick="if(event.target===this)closeModal()">
      <div class="modal">
        <div class="modal-header">
          <h3>${p ? t('edit') : t('addProduct')}</h3>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group full">
            <label>${adminLang==='ar'?'صور المنتج (يمكن إضافة عدة صور)':'Images produit (plusieurs images)'}</label>
            <div id="prodImagesGallery" class="prod-images-gallery"></div>
            <div class="upload-zone" id="prodUploadZone" style="margin-top:10px">
              <div class="upload-hint">📷 <strong>${adminLang==='ar'?'اضغطي لإضافة صورة أخرى':'Cliquez pour ajouter une image'}</strong></div>
              <input type="file" accept="image/*" multiple>
            </div>
            <div style="margin-top:8px;font-size:0.78rem;color:var(--brown-light)">${adminLang==='ar'?'الصورة الأولى هي الصورة الرئيسية':'La première image est la photo principale'}</div>
          </div>
          <div class="form-grid">
            <div class="form-group"><label>${t('nameAr')}</label><input id="pf_name_ar" value="${(p?.name?.ar || '').replace(/"/g, '&quot;')}"></div>
            <div class="form-group"><label>${t('nameFr')}</label><input id="pf_name_fr" value="${(p?.name?.fr || '').replace(/"/g, '&quot;')}"></div>
            <div class="form-group"><label>${t('price')}</label><input type="number" id="pf_price" value="${p?.price || ''}"></div>
            <div class="form-group"><label>${t('oldPrice')}</label><input type="number" id="pf_old" value="${p?.oldPrice || ''}"></div>
            <div class="form-group"><label>${t('category')}</label>
              <select id="pf_cat">${cats.map(c => `<option value="${c.id}" ${p?.category===c.id?'selected':''}>${c.name.ar}</option>`).join('')}</select>
            </div>
            <div class="form-group full"><label>${adminLang==='ar'?'الوصف (عربي)':'Description (AR)'}</label>
              <textarea id="pf_desc_ar" rows="3" placeholder="${adminLang==='ar'?'وصف المنتج بالعربية...':'Description du produit en arabe...'}">${(p?.desc?.ar || '').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
            </div>
            <div class="form-group full"><label>${adminLang==='ar'?'الوصف (فرنسي)':'Description (FR)'}</label>
              <textarea id="pf_desc_fr" rows="3" placeholder="${adminLang==='ar'?'وصف المنتج بالفرنسية...':'Description du produit en français...'}">${(p?.desc?.fr || '').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
            </div>
            <div class="form-group full"><label>${adminLang==='ar'?'الألوان (مفصولة بفاصلة)':'Couleurs (séparées par virgule)'}</label>
              <input id="pf_colors" placeholder="وردي, بيج, أسود" value="${(function(){ const c=p?.colors||[]; return c.map(function(x){ if(typeof x==='string') return x; if(x&&x.name){ return (x.name.ar||x.name.fr||x.name||''); } return x?.label||''; }).filter(Boolean).join(', '); })().replace(/"/g,'&quot;')}" oninput="rebuildVariantMatrix()">
            </div>
            <div class="form-group full"><label>${adminLang==='ar'?'المقاسات (مفصولة بفاصلة)':'Tailles (séparées par virgule)'}</label>
              <input id="pf_sizes" placeholder="S, M, L, XL" value="${(function(){ const s=p?.sizes||[]; return s.map(function(x){ if(typeof x==='string') return x; if(x&&x.name) return x.name; return x?.label||''; }).filter(Boolean).join(', '); })().replace(/"/g,'&quot;')}" oninput="rebuildVariantMatrix()">
            </div>
            <div class="form-group full">
              <label>${adminLang==='ar'?'الكميات حسب اللون والمقاس':'Quantités par couleur et taille'}</label>
              <div id="variantMatrixWrap" class="variant-matrix-wrap"></div>
              <div style="margin-top:8px;font-size:0.78rem;color:var(--brown-light)">${adminLang==='ar'?'أدخلي الألوان والمقاسات أعلاه ثم حدّدي الكمية لكل تركيبة. المخزون الكلي يُحسب تلقائياً.':'Saisissez les couleurs et tailles ci-dessus, puis définissez la quantité pour chaque combinaison. Le stock total est calculé automatiquement.'}</div>
            </div>
            <div class="form-group"><label>${t('stock')} / ${adminLang==='ar'?'المخزون الكلي (تلقائي)':'Stock total (auto)'}</label><input type="number" id="pf_stock" min="0" value="${p?.stock ?? 0}" readonly style="background:var(--cream-dark);cursor:default"></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
          <button class="btn btn-primary" onclick="saveProduct(${p ? p.id : 'null'})">${t('save')}</button>
        </div>
      </div>
    </div>`;
  renderProdImagesGallery();
  setupMultiUpload('prodUploadZone');
  // restore existing variant stocks into matrix after render
  window._pendingVariantStocks = (function(){
    const map = {};
    const colors = p?.colors || [];
    colors.forEach(function(c){
      const cName = typeof c === 'string' ? c : (c?.name?.ar || c?.name?.fr || c?.name || c?.label || '');
      if (!cName) return;
      if (c && c.stocks && typeof c.stocks === 'object') {
        Object.keys(c.stocks).forEach(function(sz){ map[cName + '|' + sz] = Number(c.stocks[sz]) || 0; });
      } else if (c && typeof c.stock === 'number') {
        // legacy: single stock per color — distribute later if sizes exist
        map['__color__' + cName] = Number(c.stock) || 0;
      }
    });
    const sizes = p?.sizes || [];
    sizes.forEach(function(s){
      const sName = typeof s === 'string' ? s : (s?.name || s?.label || '');
      if (!sName) return;
      if (s && s.stocks && typeof s.stocks === 'object') {
        Object.keys(s.stocks).forEach(function(cn){ map[cn + '|' + sName] = Number(s.stocks[cn]) || 0; });
      }
    });
    return map;
  })();
  rebuildVariantMatrix();
}

function renderProdImagesGallery() {
  const el = document.getElementById('prodImagesGallery');
  if (!el) return;
  if (!pendingProductImages.length) {
    el.innerHTML = `<div style="padding:12px;color:var(--brown-light);font-size:0.85rem">${adminLang==='ar'?'لا توجد صور بعد':'Aucune image'}</div>`;
    return;
  }
  el.innerHTML = pendingProductImages.map((src, i) => `
    <div class="prod-img-thumb ${i===0?'is-main':''}" data-idx="${i}">
      <img src="${src}" alt="">
      ${i===0 ? `<span class="main-badge">${adminLang==='ar'?'رئيسية':'Principale'}</span>` : ''}
      <button type="button" class="thumb-remove" onclick="removeProdImage(${i})" title="${adminLang==='ar'?'حذف':'Supprimer'}">&times;</button>
      ${i>0 ? `<button type="button" class="thumb-main" onclick="setMainProdImage(${i})" title="${adminLang==='ar'?'اجعلها رئيسية':'Définir principale'}">★</button>` : ''}
    </div>
  `).join('');
}

function removeProdImage(idx) {
  pendingProductImages.splice(idx, 1);
  renderProdImagesGallery();
}

function setMainProdImage(idx) {
  if (idx <= 0 || idx >= pendingProductImages.length) return;
  const [img] = pendingProductImages.splice(idx, 1);
  pendingProductImages.unshift(img);
  renderProdImagesGallery();
}

function setupMultiUpload(zoneId) {
  const zone = document.getElementById(zoneId);
  if (!zone) return;
  const input = zone.querySelector('input[type=file]');
  const handleFiles = async (files) => {
    for (const file of files) {
      try {
        const data = await fileToDataUrl(file);
        pendingProductImages.push(data);
      } catch (e) {}
    }
    renderProdImagesGallery();
    if (input) input.value = '';
  };
  input?.addEventListener('change', e => {
    if (e.target.files?.length) handleFiles(Array.from(e.target.files));
  });
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('dragover');
    if (e.dataTransfer.files?.length) handleFiles(Array.from(e.dataTransfer.files));
  });
}

function parseListInput(raw) {
  return String(raw || '').split(/[,،\n]+/).map(s => s.trim()).filter(Boolean);
}

function rebuildVariantMatrix() {
  const wrap = document.getElementById('variantMatrixWrap');
  if (!wrap) return;
  const colorNames = parseListInput(document.getElementById('pf_colors')?.value);
  const sizeNames = parseListInput(document.getElementById('pf_sizes')?.value);
  const prev = window._pendingVariantStocks || {};
  // preserve current input values
  wrap.querySelectorAll('input[data-ck][data-sk]').forEach(function(inp) {
    prev[inp.dataset.ck + '|' + inp.dataset.sk] = Number(inp.value) || 0;
  });
  window._pendingVariantStocks = prev;

  if (!colorNames.length || !sizeNames.length) {
    wrap.innerHTML = '<div style="padding:14px;background:var(--cream);border-radius:12px;color:var(--brown-light);font-size:0.85rem">' +
      (adminLang === 'ar'
        ? 'أدخلي لوناً واحداً على الأقل ومقاساً واحداً لعرض جدول الكميات'
        : 'Saisissez au moins une couleur et une taille pour afficher le tableau des quantités') +
      '</div>';
    updateTotalStockFromMatrix();
    return;
  }

  let html = '<div class="variant-matrix-scroll"><table class="variant-matrix"><thead><tr><th>' +
    (adminLang === 'ar' ? 'اللون / المقاس' : 'Couleur / Taille') + '</th>';
  sizeNames.forEach(function(sz) {
    html += '<th>' + sz.replace(/</g,'&lt;') + '</th>';
  });
  html += '</tr></thead><tbody>';
  colorNames.forEach(function(cn) {
    html += '<tr><th>' + cn.replace(/</g,'&lt;') + '</th>';
    sizeNames.forEach(function(sz) {
      const key = cn + '|' + sz;
      let val = prev[key];
      if (val === undefined && prev['__color__' + cn] !== undefined) {
        // legacy: distribute color stock equally-ish (put all on first size)
        val = (sz === sizeNames[0]) ? prev['__color__' + cn] : 0;
      }
      if (val === undefined) val = 0;
      html += '<td><input type="number" min="0" data-ck="' + cn.replace(/"/g,'&quot;') + '" data-sk="' + sz.replace(/"/g,'&quot;') +
        '" value="' + val + '" oninput="updateTotalStockFromMatrix()"></td>';
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  wrap.innerHTML = html;
  updateTotalStockFromMatrix();
}

function updateTotalStockFromMatrix() {
  const wrap = document.getElementById('variantMatrixWrap');
  let total = 0;
  if (wrap) {
    wrap.querySelectorAll('input[data-ck][data-sk]').forEach(function(inp) {
      total += Number(inp.value) || 0;
    });
  }
  const stockEl = document.getElementById('pf_stock');
  if (stockEl) stockEl.value = total;
}

function collectVariantStocks() {
  const map = {};
  const wrap = document.getElementById('variantMatrixWrap');
  if (wrap) {
    wrap.querySelectorAll('input[data-ck][data-sk]').forEach(function(inp) {
      map[inp.dataset.ck + '|' + inp.dataset.sk] = Number(inp.value) || 0;
    });
  }
  return map;
}

function parseColorsWithStocks() {
  const colorNames = parseListInput(document.getElementById('pf_colors')?.value);
  const sizeNames = parseListInput(document.getElementById('pf_sizes')?.value);
  const matrix = collectVariantStocks();
  return colorNames.map(function(name) {
    const stocks = {};
    sizeNames.forEach(function(sz) {
      stocks[sz] = Number(matrix[name + '|' + sz]) || 0;
    });
    return { name: { ar: name, fr: name }, stocks: stocks };
  });
}

function parseSizesInput() {
  return parseListInput(document.getElementById('pf_sizes')?.value).map(function(name) {
    return { name: name };
  });
}

async function saveProduct(id) {
  let imgs = pendingProductImages.filter(u => u && (u.startsWith('http') || u.startsWith('data:')));
  imgs = await resolveImages(imgs, 'products');
  const colors = parseColorsWithStocks();
  const sizes = parseSizesInput();
  let totalStock = 0;
  colors.forEach(function(c) {
    if (c.stocks) Object.keys(c.stocks).forEach(function(k) { totalStock += Number(c.stocks[k]) || 0; });
  });
  const payload = {
    name_ar: document.getElementById('pf_name_ar').value,
    name_fr: document.getElementById('pf_name_fr').value,
    description_ar: document.getElementById('pf_desc_ar')?.value || '',
    description_fr: document.getElementById('pf_desc_fr')?.value || '',
    price: Number(document.getElementById('pf_price').value) || 0,
    old_price: Number(document.getElementById('pf_old').value) || null,
    category_id: document.getElementById('pf_cat').value || null,
    stock: totalStock,
    colors: colors,
    sizes: sizes,
    images: imgs,
    image_url: imgs[0] || null,
    active: true
  };
  try {
    const sb = SiBelleSB.getSupabase();
    if (id) {
      const { error } = await sb.from('products').update(payload).eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await sb.from('products').insert(payload);
      if (error) throw error;
    }
    _cache.products = null;
    await getProducts(true);
    toast(t('saved'));
    closeModal();
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error saving product');
  }
}

/** One-click: compress legacy base64 images and move them to Storage → makes store + dashboard much lighter */
async function optimizeExistingImages() {
  const ar = adminLang === 'ar';
  if (!confirm(ar ? 'سيتم ضغط صور المنتجات والتصنيفات القديمة. المتابعة؟' : 'Compresser les anciennes images ?')) return;
  const sb = SiBelleSB.getSupabase();
  let done = 0;
  try {
    const { data: prods } = await sb.from('products').select('id,image_url,images');
    for (const row of (prods || [])) {
      const list = (Array.isArray(row.images) && row.images.length) ? row.images : (row.image_url ? [row.image_url] : []);
      if (!list.some(u => u && u.indexOf('data:') === 0)) continue;
      toast((ar ? 'جارٍ التحسين… ' : 'Optimisation… ') + (done + 1));
      const out = [];
      for (const u of list) {
        if (u && u.indexOf('data:') === 0) {
          const small = await compressImage(u, 1000, 0.82);
          out.push(await uploadImageToStorage(small, 'products'));
        } else out.push(u);
      }
      const { error } = await sb.from('products').update({ images: out, image_url: out[0] || null }).eq('id', row.id);
      if (error) throw error;
      done++;
    }
    const { data: cats } = await sb.from('categories').select('id,image_url');
    for (const c of (cats || [])) {
      if (!c.image_url || c.image_url.indexOf('data:') !== 0) continue;
      const small = await compressImage(c.image_url, 800, 0.82);
      const url = await uploadImageToStorage(small, 'categories');
      const { error } = await sb.from('categories').update({ image_url: url }).eq('id', c.id);
      if (error) throw error;
      done++;
    }
    toast(ar ? ('تم تحسين ' + done + ' عنصر ✅') : (done + ' éléments optimisés ✅'));
    await Promise.all([getProducts(true), getCategories(true)]);
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}

/** تعطيل المنتج (يختفي من الموقع ويبقى في القاعدة) */
async function disableProduct(id) {
  if (!confirm(adminLang === 'ar' ? 'تعطيل هذا المنتج؟' : 'Désactiver ce produit ?')) return;
  try {
    const sb = SiBelleSB.getSupabase();
    const { error } = await sb.from('products').update({ active: false }).eq('id', id);
    if (error) throw error;
    _cache.products = null;
    await getProducts(true);
    toast(adminLang === 'ar' ? 'تم التعطيل' : 'Désactivé');
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}

/** حذف نهائي من القاعدة */
async function hardDeleteProduct(id) {
  if (!confirm(adminLang === 'ar' ? 'حذف نهائي؟ لا يمكن التراجع.' : 'Suppression définitive ?')) return;
  try {
    const sb = SiBelleSB.getSupabase();
    const { error } = await sb.from('products').delete().eq('id', id);
    if (error) throw error;
    _cache.products = null;
    await getProducts(true);
    toast(t('deleted'));
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}

// توافق مع الاسم القديم
async function deleteProduct(id) { return disableProduct(id); }

/* ===== CATEGORIES ===== */
function renderCategories() {
  const cats = _cache.categories || [];
  return `
    <div class="panel">
      <div class="panel-header">
        <h3>${t('categories')} (${cats.length})</h3>
        <button class="btn btn-primary btn-sm" onclick="openCatForm()">+ ${t('addCategory')}</button>
      </div>
      <div class="panel-body">
        <div class="prod-grid">
          ${cats.map(c => `
            <div class="prod-card" style="${c.active ? '' : 'opacity:0.72;border:1px dashed #c9a227'}">
              <img src="${c.image || ''}" alt="" onerror="this.style.background='var(--pink-soft)';this.style.height='120px'">
              <div class="prod-card-body">
                <h4>${c.name.ar} ${c.active ? '' : '<span style="font-size:0.7rem;background:#f5e6c8;color:#8a6d1d;padding:2px 8px;border-radius:999px;margin-inline-start:6px">'+(adminLang==='ar'?'معطّل':'Inactif')+'</span>'}</h4>
                <div style="font-size:0.8rem;color:var(--brown-light)">${c.name.fr}</div>
                <div class="actions" style="flex-wrap:wrap;gap:6px">
                  <button class="btn btn-ghost btn-sm" onclick="openCatForm('${c.id}')">${t('edit')}</button>
                  ${c.active
                    ? `<button class="btn btn-ghost btn-sm" onclick="disableCat('${c.id}')">${adminLang==='ar'?'تعطيل':'Désactiver'}</button>`
                    : `<button class="btn btn-ghost btn-sm" onclick="enableCat('${c.id}')">${adminLang==='ar'?'تفعيل':'Activer'}</button>`}
                  <button class="btn btn-danger btn-sm" onclick="hardDeleteCat('${c.id}')">${adminLang==='ar'?'حذف نهائي':'Supprimer'}</button>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function openCatForm(id) {
  const cats = _cache.categories || [];
  const c = id ? cats.find(x => x.id === id) : null;
  pendingImageData = c?.image || null;
  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay show" onclick="if(event.target===this)closeModal()">
      <div class="modal">
        <div class="modal-header">
          <h3>${c ? t('edit') : t('addCategory')}</h3>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>${t('image')}</label>
            <div class="upload-zone" id="catUploadZone">
              <img class="upload-preview ${c?.image ? 'show' : ''}" id="catPreview" src="${c?.image || ''}" alt="">
              <div class="upload-hint">📷 <strong>${t('uploadImg')}</strong></div>
              <input type="file" accept="image/*">
            </div>
          </div>
          <div class="form-group"><label>${t('nameAr')}</label><input id="cf_ar" value="${(c?.name?.ar || '').replace(/"/g, '&quot;')}"></div>
          <div class="form-group"><label>${t('nameFr')}</label><input id="cf_fr" value="${(c?.name?.fr || '').replace(/"/g, '&quot;')}"></div>
          ${!c ? `<div class="form-group"><label>ID (latin)</label><input id="cf_id" placeholder="ex: accessories"></div>` : ''}
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
          <button class="btn btn-primary" onclick="saveCat('${id || ''}')">${t('save')}</button>
        </div>
      </div>
    </div>`;
  setupUpload('catUploadZone', 'catPreview', d => { pendingImageData = d; });
}

async function saveCat(id) {
  const name_ar = document.getElementById('cf_ar')?.value?.trim() || '';
  const name_fr = document.getElementById('cf_fr')?.value?.trim() || '';
  if (!name_ar && !name_fr) { toast('الاسم مطلوب'); return; }
  const payload = {
    name_ar: name_ar || name_fr,
    name_fr: name_fr || name_ar,
    active: true
  };
  if (pendingImageData && (pendingImageData.startsWith('http') || pendingImageData.startsWith('data:'))) {
    payload.image_url = await uploadImageToStorage(pendingImageData, 'categories');
  }
  try {
    const sb = SiBelleSB.getSupabase();
    if (id) {
      const { error } = await sb.from('categories').update(payload).eq('id', id);
      if (error) throw error;
    } else {
      let newId = (document.getElementById('cf_id')?.value || '').trim().toLowerCase().replace(/\s+/g, '_');
      if (!newId) newId = 'cat_' + Date.now();
      payload.id = newId;
      payload.slug = newId;
      payload.sort_order = ((_cache.categories || []).length || 0) + 1;
      const { error } = await sb.from('categories').insert(payload);
      if (error) throw error;
    }
    await getCategories(true);
    toast(t('saved'));
    closeModal();
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}
async function disableCat(id) {
  if (!confirm(adminLang === 'ar' ? 'تعطيل هذا التصنيف؟' : 'Désactiver ?')) return;
  try {
    const sb = SiBelleSB.getSupabase();
    const { error } = await sb.from('categories').update({ active: false }).eq('id', id);
    if (error) throw error;
    _cache.categories = null;
    await getCategories(true);
    toast(adminLang === 'ar' ? 'تم التعطيل' : 'Désactivé');
    renderPage();
  } catch (e) {
    console.error(e);
    toast((e && e.message) || 'Error');
  }
}

async function enableCat(id) {
  try {
    const sb = SiBelleSB.getSupabase();
    const { error } = await sb.from('categories').update({ active: true }).eq('id', id);
    if (error) throw error;
    _cache.categories = null;
    await getCategories(true);
    toast(adminLang === 'ar' ? 'تم التفعيل' : 'Activé');
    renderPage();
  } catch (e) {
    console.error(e);
    toast((e && e.message) || 'Error');
  }
}

async function hardDeleteCat(id) {
  if (!confirm(adminLang === 'ar' ? 'حذف نهائي؟ لا يمكن التراجع.' : 'Suppression définitive ?')) return;
  try {
    const sb = SiBelleSB.getSupabase();
    const { error } = await sb.from('categories').delete().eq('id', id);
    if (error) throw error;
    _cache.categories = null;
    await getCategories(true);
    toast(t('deleted'));
    renderPage();
  } catch (e) {
    console.error(e);
    toast((e && e.message) || 'Error deleting');
  }
}

// توافق
async function deleteCat(id) { return disableCat(id); }

/* ===== CONTENT ===== */
function renderContent() {
  const content = getContent();
  return `
    <div class="panel">
      <div class="panel-header">
        <h3>${t('contentTexts')}</h3>
        <button class="btn btn-primary btn-sm" onclick="saveAllContent()">${t('save')}</button>
      </div>
      <div class="panel-body">
        ${Object.keys(content).map(k => `
          <div class="content-item">
            <div class="key">${k}</div>
            <div class="form-grid" style="margin-top:8px">
              <div class="form-group"><label>عربي</label><textarea id="ct_ar_${k}" rows="2">${content[k].ar || ''}</textarea></div>
              <div class="form-group"><label>Français</label><textarea id="ct_fr_${k}" rows="2">${content[k].fr || ''}</textarea></div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}
async function saveAllContent() {
  const content = getContent();
  Object.keys(content).forEach(k => {
    const ar = document.getElementById('ct_ar_' + k);
    const fr = document.getElementById('ct_fr_' + k);
    if (ar) content[k].ar = ar.value;
    if (fr) content[k].fr = fr.value;
  });
  saveContent(content);
  try {
    await SiBelleSB.upsertSiteContent({
      hero_title_ar: content.heroTitle?.ar || '',
      hero_title_fr: content.heroTitle?.fr || '',
      hero_subtitle_ar: content.heroSubtitle?.ar || '',
      hero_subtitle_fr: content.heroSubtitle?.fr || '',
      hero_description_ar: content.heroDesc?.ar || '',
      hero_description_fr: content.heroDesc?.fr || '',
      categories_title_ar: content.catTitle?.ar || '',
      categories_title_fr: content.catTitle?.fr || '',
      categories_subtitle_ar: content.catSubtitle?.ar || '',
      categories_subtitle_fr: content.catSubtitle?.fr || '',
      featured_title_ar: content.featuredTitle?.ar || '',
      featured_title_fr: content.featuredTitle?.fr || '',
      footer_description_ar: content.footerDesc?.ar || '',
      footer_description_fr: content.footerDesc?.fr || ''
    });
    if (content.topBanner) {
      const s = getSettings();
      await SiBelleSB.saveAnnouncement(content.topBanner.ar, content.topBanner.fr, s.bannerEnabled !== false);
    }
    toast(t('saved'));
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}


/* ===== SHIPPING BY WILAYA ===== */

async function loadWilayaShipping() {
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) return [];
  let wilayas = [];
  try {
    const { data, error } = await sb.from('wilayas').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    wilayas = data || [];
  } catch (e) {
    try {
      const { data } = await sb.from('wilayas').select('*').order('id');
      wilayas = data || [];
    } catch (e2) { console.error(e2); }
  }
  let prices = {};
  try {
    const { data, error } = await sb.from('wilaya_shipping').select('*');
    if (!error && data) {
      data.forEach(function(row) {
        prices[row.wilaya_id] = {
          price: Number(row.price) || 0,
          free_shipping_from: row.free_shipping_from != null ? Number(row.free_shipping_from) : 8000,
          estimated_min_days: row.estimated_min_days != null ? Number(row.estimated_min_days) : 2,
          estimated_max_days: row.estimated_max_days != null ? Number(row.estimated_max_days) : 5
        };
      });
    }
  } catch (e) { console.warn('wilaya_shipping', e); }
  return wilayas.map(function(w) {
    const p = prices[w.id] || {};
    let communes = [];
    if (Array.isArray(w.communes)) communes = w.communes;
    else if (typeof w.communes === 'string') {
      try { communes = JSON.parse(w.communes); } catch(e) {
        communes = String(w.communes).split(/[,،\n]+/).map(s => s.trim()).filter(Boolean);
      }
    }
    return {
      id: w.id,
      code: w.code || String(w.id),
      name_ar: w.name_ar || '',
      name_fr: w.name_fr || '',
      active: w.active !== false,
      sort_order: w.sort_order != null ? w.sort_order : (Number(w.code) || w.id),
      communes: communes,
      price: p.price != null ? p.price : 400,
      free_shipping_from: p.free_shipping_from != null ? p.free_shipping_from : 8000,
      estimated_min_days: p.estimated_min_days != null ? p.estimated_min_days : 2,
      estimated_max_days: p.estimated_max_days != null ? p.estimated_max_days : 5
    };
  });
}

async function renderShipping() {
  const list = await loadWilayaShipping();
  const rows = list.map(function(w) {
    const communesStr = (w.communes || []).join('، ');
    return `<tr data-wid="${w.id}">
      <td><input type="text" class="w-code" data-wid="${w.id}" value="${String(w.code).replace(/"/g,'&quot;')}" style="width:56px;padding:7px;border:1px solid var(--border);border-radius:8px;text-align:center"></td>
      <td>
        <input type="text" class="w-name-ar" data-wid="${w.id}" value="${(w.name_ar||'').replace(/"/g,'&quot;')}" placeholder="عربي" style="width:100%;min-width:100px;padding:7px;border:1px solid var(--border);border-radius:8px;margin-bottom:4px">
        <input type="text" class="w-name-fr" data-wid="${w.id}" value="${(w.name_fr||'').replace(/"/g,'&quot;')}" placeholder="FR" style="width:100%;min-width:100px;padding:7px;border:1px solid var(--border);border-radius:8px">
      </td>
      <td><input type="text" class="w-communes" data-wid="${w.id}" value="${communesStr.replace(/"/g,'&quot;')}" placeholder="بلدية1، بلدية2" style="width:100%;min-width:140px;padding:7px;border:1px solid var(--border);border-radius:8px;font-size:0.82rem"></td>
      <td><input type="number" min="0" step="50" class="ship-price" data-wid="${w.id}" value="${w.price}" style="width:90px;padding:7px;border:1px solid var(--border);border-radius:8px;text-align:center"></td>
      <td><input type="number" min="0" step="100" class="ship-free" data-wid="${w.id}" value="${w.free_shipping_from}" style="width:90px;padding:7px;border:1px solid var(--border);border-radius:8px;text-align:center"></td>
      <td style="white-space:nowrap">
        <input type="number" min="1" max="30" class="ship-min" data-wid="${w.id}" value="${w.estimated_min_days}" style="width:48px;padding:7px;border:1px solid var(--border);border-radius:8px;text-align:center">
        –
        <input type="number" min="1" max="30" class="ship-max" data-wid="${w.id}" value="${w.estimated_max_days}" style="width:48px;padding:7px;border:1px solid var(--border);border-radius:8px;text-align:center">
      </td>
      <td>
        <button type="button" class="btn btn-ghost btn-sm" style="color:#c0392b" onclick="deleteWilaya(${w.id}, '${String(w.name_ar||w.code).replace(/'/g,"\\'")}')">🗑</button>
      </td>
    </tr>`;
  }).join('');

  return `
    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header"><h3>${adminLang==='ar'?'➕ إضافة ولاية / منطقة':'➕ Ajouter wilaya'}</h3></div>
      <div class="panel-body">
        <div class="form-grid">
          <div class="form-group"><label>${adminLang==='ar'?'رقم الولاية (code)':'Code wilaya'}</label>
            <input type="text" id="new_w_code" placeholder="16"></div>
          <div class="form-group"><label>${adminLang==='ar'?'الاسم عربي':'Nom AR'}</label>
            <input type="text" id="new_w_ar" placeholder="الجزائر"></div>
          <div class="form-group"><label>${adminLang==='ar'?'الاسم فرنسي':'Nom FR'}</label>
            <input type="text" id="new_w_fr" placeholder="Alger"></div>
          <div class="form-group"><label>${t('shippingCost')} (دج)</label>
            <input type="number" id="new_w_price" value="400" min="0"></div>
          <div class="form-group full"><label>${adminLang==='ar'?'البلديات / المناطق (مفصولة بفاصلة)':'Communes (séparées par virgule)'}</label>
            <input type="text" id="new_w_communes" placeholder="باب الزوار، الحراش، رويبة"></div>
        </div>
        <button class="btn btn-primary" onclick="addWilaya()">${adminLang==='ar'?'إضافة الولاية':'Ajouter'}</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <h3>🚚 ${t('shippingByWilaya')} <span class="orders-count-pill">${list.length}</span></h3>
        <button class="btn btn-primary btn-sm" onclick="saveAllWilayaShipping()">${t('saveShipping')}</button>
      </div>
      <div class="panel-body" style="padding:0">
        <div style="padding:12px 16px;font-size:0.84rem;color:var(--brown-light);border-bottom:1px solid var(--border)">
          ${adminLang==='ar'
            ? 'عدّلي الرقم، الاسم، البلديات وسعر التوصيل. يظهرون تلقائياً في صفحة الطلب على الموقع.'
            : 'Modifiez code, nom, communes et tarif. Ils apparaissent automatiquement au checkout.'}
        </div>
        ${list.length ? `
        <div class="table-wrap" style="max-height:65vh;overflow:auto">
          <table class="orders-table">
            <thead>
              <tr>
                <th>${adminLang==='ar'?'الرقم':'Code'}</th>
                <th>${adminLang==='ar'?'الولاية':'Wilaya'}</th>
                <th>${adminLang==='ar'?'البلديات':'Communes'}</th>
                <th>${t('shippingCost')}</th>
                <th>${t('freeFrom')}</th>
                <th>${t('days')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>` : `<div class="empty-state"><div class="icon">🚚</div>${adminLang==='ar'?'لا توجد ولايات — أضيفي من النموذج أعلاه':'Aucune wilaya — ajoutez-en ci-dessus'}</div>`}
      </div>
      ${list.length ? `<div class="panel-body" style="display:flex;justify-content:flex-end;border-top:1px solid var(--border)">
        <button class="btn btn-primary" onclick="saveAllWilayaShipping()">${t('saveShipping')}</button>
      </div>` : ''}
    </div>`;
}

async function addWilaya() {
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) { toast('Supabase non connecté'); return; }
  const code = (document.getElementById('new_w_code')?.value || '').trim();
  const name_ar = (document.getElementById('new_w_ar')?.value || '').trim();
  const name_fr = (document.getElementById('new_w_fr')?.value || '').trim() || name_ar;
  const price = Number(document.getElementById('new_w_price')?.value) || 400;
  const communesRaw = (document.getElementById('new_w_communes')?.value || '');
  const communes = communesRaw.split(/[,،\n]+/).map(s => s.trim()).filter(Boolean);
  if (!code || !name_ar) {
    toast(adminLang==='ar' ? 'أدخلي رقم الولاية والاسم' : 'Code et nom requis');
    return;
  }
  try {
    const payload = {
      code: code,
      name_ar: name_ar,
      name_fr: name_fr,
      active: true,
      sort_order: Number(code) || 99,
      communes: communes
    };
    const { data, error } = await sb.from('wilayas').insert(payload).select('id').single();
    if (error) {
      // retry without communes column
      delete payload.communes;
      const res2 = await sb.from('wilayas').insert(payload).select('id').single();
      if (res2.error) throw res2.error;
      if (res2.data?.id) {
        await sb.from('wilaya_shipping').upsert({
          wilaya_id: res2.data.id, price: price, free_shipping_from: 8000,
          estimated_min_days: 2, estimated_max_days: 5
        });
      }
    } else if (data?.id) {
      await sb.from('wilaya_shipping').upsert({
        wilaya_id: data.id, price: price, free_shipping_from: 8000,
        estimated_min_days: 2, estimated_max_days: 5
      });
    }
    toast(adminLang==='ar' ? 'تمت إضافة الولاية' : 'Wilaya ajoutée');
    renderPage();
  } catch (e) {
    console.error(e);
    toast((e && e.message) || 'Error');
  }
}

async function deleteWilaya(id, name) {
  if (!confirm(adminLang==='ar' ? ('حذف الولاية «' + (name||id) + '»؟') : ('Supprimer «' + (name||id) + '» ?'))) return;
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) return;
  try {
    try { await sb.from('wilaya_shipping').delete().eq('wilaya_id', id); } catch(e) {}
    const { error } = await sb.from('wilayas').delete().eq('id', id);
    if (error) throw error;
    toast(adminLang==='ar' ? 'تم الحذف' : 'Supprimé');
    renderPage();
  } catch (e) {
    console.error(e);
    toast((e && e.message) || 'Error');
  }
}

async function saveAllWilayaShipping() {
  const sb = window.SiBelleSB && window.SiBelleSB.getSupabase();
  if (!sb) { toast('Supabase non connecté'); return; }
  const rows = document.querySelectorAll('tr[data-wid]');
  let ok = 0, fail = 0;
  for (const tr of rows) {
    const wid = Number(tr.dataset.wid);
    const code = tr.querySelector('.w-code')?.value?.trim() || String(wid);
    const name_ar = tr.querySelector('.w-name-ar')?.value?.trim() || '';
    const name_fr = tr.querySelector('.w-name-fr')?.value?.trim() || name_ar;
    const communes = (tr.querySelector('.w-communes')?.value || '').split(/[,،\n]+/).map(s => s.trim()).filter(Boolean);
    const price = Number(tr.querySelector('.ship-price')?.value) || 0;
    const freeFrom = Number(tr.querySelector('.ship-free')?.value) || 0;
    const minD = Number(tr.querySelector('.ship-min')?.value) || 2;
    const maxD = Number(tr.querySelector('.ship-max')?.value) || 5;
    try {
      let up = { code, name_ar, name_fr, sort_order: Number(code) || wid, communes };
      let { error } = await sb.from('wilayas').update(up).eq('id', wid);
      if (error && /communes/i.test(error.message || '')) {
        delete up.communes;
        ({ error } = await sb.from('wilayas').update(up).eq('id', wid));
      }
      if (error) throw error;
      const ship = { wilaya_id: wid, price, free_shipping_from: freeFrom, estimated_min_days: minD, estimated_max_days: maxD };
      const { data: existing } = await sb.from('wilaya_shipping').select('wilaya_id').eq('wilaya_id', wid).maybeSingle();
      if (existing) {
        ({ error } = await sb.from('wilaya_shipping').update(ship).eq('wilaya_id', wid));
      } else {
        ({ error } = await sb.from('wilaya_shipping').insert(ship));
      }
      if (error) throw error;
      ok++;
    } catch (e) {
      console.error('wilaya', wid, e);
      fail++;
    }
  }
  if (fail === 0) toast(t('saved') + ' (' + ok + ')');
  else toast((adminLang==='ar'?'تم ':'Sauvé ') + ok + '/' + (ok+fail));
}

/* ===== SETTINGS ===== */
async function renderSettings() {
  // حمّل من Supabase إن أمكن
  try {
    if (typeof SiBelleSB !== 'undefined') {
      const remote = await SiBelleSB.loadStoreSettings();
      if (remote) {
        const s0 = getSettings();
        s0.shippingCost = Number(remote.default_shipping_cost) || s0.shippingCost;
        s0.freeShippingFrom = Number(remote.default_free_shipping_from) || s0.freeShippingFrom;
        if (remote.store_phone) s0.storePhone = remote.store_phone;
        if (remote.store_email) s0.storeEmail = remote.store_email;
        if (remote.store_address) s0.storeAddress = remote.store_address;
        if (remote.whatsapp) s0.whatsapp = remote.whatsapp;
        if (remote.instagram) s0.instagram = remote.instagram;
        if (remote.facebook) s0.facebook = remote.facebook;
        saveSettings(s0);
      }
    }
  } catch (e) { console.warn(e); }
  const s = getSettings();
  return `
    <div class="panel">
      <div class="panel-header"><h3>${t('banner')}</h3></div>
      <div class="panel-body">
        <div class="toggle-row">
          <div class="info">
            <strong>${s.bannerEnabled ? t('showBanner') : t('hideBanner')}</strong>
            <small>${t('banner')}</small>
          </div>
          <div class="switch ${s.bannerEnabled ? 'on' : ''}" id="bannerSwitch" onclick="toggleBanner()"></div>
        </div>
        <div class="form-group" style="margin-top:12px">
          <label>${t('banner')} (AR)</label>
          <textarea id="set_banner_ar" rows="2">${(getContent().topBanner?.ar) || ''}</textarea>
        </div>
        <div class="form-group">
          <label>${t('banner')} (FR)</label>
          <textarea id="set_banner_fr" rows="2">${(getContent().topBanner?.fr) || ''}</textarea>
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveBannerTexts()">${t('save')}</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><h3>${t('shippingCost')} / ${t('freeShippingFrom')}</h3></div>
      <div class="panel-body">
        <div class="form-grid">
          <div class="form-group"><label>${t('shippingCost')} (${t('currency')})</label>
            <input type="number" id="set_ship" value="${s.shippingCost}"></div>
          <div class="form-group"><label>${t('freeShippingFrom')} (${t('currency')})</label>
            <input type="number" id="set_free" value="${s.freeShippingFrom}"></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveShipSettings()">${t('save')}</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><h3>${t('privacy')}</h3></div>
      <div class="panel-body">
        <div class="form-grid">
          <div class="form-group"><label>عربي</label><textarea id="set_priv_ar" rows="4">${s.privacy?.ar || ''}</textarea></div>
          <div class="form-group"><label>Français</label><textarea id="set_priv_fr" rows="4">${s.privacy?.fr || ''}</textarea></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><h3>${t('terms')}</h3></div>
      <div class="panel-body">
        <div class="form-grid">
          <div class="form-group"><label>عربي</label><textarea id="set_terms_ar" rows="4">${s.terms?.ar || ''}</textarea></div>
          <div class="form-group"><label>Français</label><textarea id="set_terms_fr" rows="4">${s.terms?.fr || ''}</textarea></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><h3>${t('shippingPolicy')}</h3></div>
      <div class="panel-body">
        <div class="form-grid">
          <div class="form-group"><label>عربي</label><textarea id="set_shipp_ar" rows="3">${s.shippingPolicy?.ar || ''}</textarea></div>
          <div class="form-group"><label>Français</label><textarea id="set_shipp_fr" rows="3">${s.shippingPolicy?.fr || ''}</textarea></div>
        </div>
        <button class="btn btn-primary" style="margin-top:12px" onclick="savePolicies()">${t('save')}</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><h3>${t('storePhone')} / ${t('socialLinks')}</h3></div>
      <div class="panel-body">
        <div class="form-grid">
          <div class="form-group"><label>${t('storePhone')}</label><input id="set_phone" value="${s.storePhone||'0555 00 00 00'}"></div>
          <div class="form-group"><label>${t('storeEmail')}</label><input id="set_email" value="${s.storeEmail||'contact@sibelle.dz'}"></div>
          <div class="form-group full"><label>${t('storeAddress')}</label><input id="set_addr" value="${s.storeAddress||'Alger, Algérie'}"></div>
          <div class="form-group"><label>${t('whatsapp')}</label><input id="set_wa" value="${s.whatsapp||''}" placeholder="213555000000"></div>
          <div class="form-group"><label>${t('instagram')}</label><input id="set_ig" value="${s.instagram||''}" placeholder="@sibelle"></div>
          <div class="form-group"><label>${t('facebook')}</label><input id="set_fb" value="${s.facebook||''}"></div>
        </div>
        <button class="btn btn-primary btn-sm" style="margin-top:8px" onclick="saveStoreContact()">${t('save')}</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><h3>${t('siteSettings')}</h3></div>
      <div class="panel-body">
        <div class="detail-block">
          <div class="detail-row"><span class="l">User</span><span class="v"><code>admin</code></span></div>
          <div class="detail-row"><span class="l">Pass</span><span class="v"><code>SiBelle2026</code></span></div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
          <button class="btn btn-ghost" onclick="resetDemoOrders()">${t('resetDemo')}</button>
          <button class="btn btn-danger" onclick="clearOrders()">${t('clearOrders')}</button>
          <button class="btn btn-ghost" onclick="resetProducts()">${t('resetProducts')}</button>
          <a href="../index.html" target="_blank" class="btn btn-primary">${t('store')} ↗</a>
        </div>
      </div>
    </div>`;
}

async function toggleBanner() {
  const s = getSettings();
  s.bannerEnabled = !s.bannerEnabled;
  saveSettings(s);
  try {
    const c = getContent();
    await SiBelleSB.saveAnnouncement(c.topBanner?.ar || ' ', c.topBanner?.fr || ' ', s.bannerEnabled);
    toast(t('saved'));
  } catch (e) { console.error(e); toast(e.message || 'Error'); }
  renderPage();
}
async function saveBannerTexts() {
  const content = getContent();
  content.topBanner = {
    ar: document.getElementById('set_banner_ar').value,
    fr: document.getElementById('set_banner_fr').value
  };
  saveContent(content);
  try {
    const s = getSettings();
    await SiBelleSB.saveAnnouncement(content.topBanner.ar, content.topBanner.fr, s.bannerEnabled !== false);
    toast(t('saved'));
  } catch (e) { console.error(e); toast(e.message || 'Error'); }
}
async function saveShipSettings() {
  // Global defaults kept as fallback only — prefer per-wilaya page
  const s = getSettings();
  const shipEl = document.getElementById('set_ship');
  const freeEl = document.getElementById('set_free');
  if (shipEl) s.shippingCost = Number(shipEl.value) || 400;
  if (freeEl) s.freeShippingFrom = Number(freeEl.value) || 8000;
  saveSettings(s);
  localStorage.setItem('siBelleShipCost', String(s.shippingCost));
  localStorage.setItem('siBelleFreeShip', String(s.freeShippingFrom));
  try {
    const sb = SiBelleSB.getSupabase();
    const { error: e1 } = await sb.from('store_settings').update({
      default_shipping_cost: s.shippingCost,
      default_free_shipping_from: s.freeShippingFrom
    }).eq('id', true);
    if (e1) throw e1;
    toast(t('saved') + (adminLang==='ar' ? ' — للتعديل حسب الولاية: قائمة التوصيل' : ' — tarifs par wilaya: menu Livraison'));
  } catch (e) {
    console.error(e);
    toast((e && e.message) || 'Saved locally only');
  }
}
async function savePolicies() {
  const s = getSettings();
  s.privacy = { ar: document.getElementById('set_priv_ar').value, fr: document.getElementById('set_priv_fr').value };
  s.terms = { ar: document.getElementById('set_terms_ar').value, fr: document.getElementById('set_terms_fr').value };
  s.shippingPolicy = { ar: document.getElementById('set_shipp_ar').value, fr: document.getElementById('set_shipp_fr').value };
  saveSettings(s);
  try {
    await SiBelleSB.upsertLegalPage('privacy', 'سياسة الخصوصية', 'Politique de confidentialité', s.privacy.ar, s.privacy.fr);
    await SiBelleSB.upsertLegalPage('terms', 'الشروط والأحكام', 'Conditions générales', s.terms.ar, s.terms.fr);
    await SiBelleSB.upsertLegalPage('shipping', 'سياسة التوصيل', 'Politique de livraison', s.shippingPolicy.ar, s.shippingPolicy.fr);
    toast(t('saved'));
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}
function resetDemoOrders() {
  localStorage.removeItem('siBelleOrders');
  seedDemoOrders();
  toast(t('saved'));
  updateNavBadge();
  renderPage();
}
function clearOrders() {
  if (!confirm(adminLang === 'ar' ? 'مسح جميع الطلبات؟' : 'Effacer ?')) return;
  saveOrders([]);
  toast(t('deleted'));
  updateNavBadge();
  renderPage();
}
function resetProducts() {
  const prods = DEFAULT_PRODUCTS.map((x, i) => ({ ...x, image: `../images/p${i + 1}.png` }));
  saveProducts(prods);
  toast(t('saved'));
  renderPage();
}

/* ===== THEME / LANG ===== */
function setAdminLang(lang) {
  closeSidebar();
  adminLang = lang;
  localStorage.setItem('siBelleAdminLang', lang);
  document.documentElement.lang = lang;
  document.body.classList.toggle('rtl', lang === 'ar');
  document.body.classList.toggle('ltr', lang !== 'ar');
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-switch-admin button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  // Update sidebar labels
  document.querySelectorAll('.nav-item[data-page]').forEach(n => {
    const page = n.dataset.page;
    const label = n.querySelector('.nav-label');
    if (label) label.textContent = t(page);
  });
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.textContent = t('logout');
  showPage(currentPage);
}
function toggleAdminTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('siBelleAdminTheme', isDark ? 'light' : 'dark');
}

function openSidebar() {
  document.getElementById('sidebar')?.classList.add('open');
  document.getElementById('sidebarOverlay')?.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('show');
  document.body.style.overflow = '';
}

/* ===== INIT ===== */
function initApp() {
  // local content/settings still used as fallback for CMS texts
  getContent();
  getSettings();

  const theme = localStorage.getItem('siBelleAdminTheme');
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  adminLang = localStorage.getItem('siBelleAdminLang') || 'ar';
  document.body.classList.toggle('rtl', adminLang === 'ar');
  document.body.classList.toggle('ltr', adminLang !== 'ar');
  document.body.dir = adminLang === 'ar' ? 'rtl' : 'ltr';

  // wait for supabase + session
  (async function() {
    // small delay to let CDN load
    await new Promise(r => setTimeout(r, 300));
    await refreshAuth();
    if (isLoggedIn()) {
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('app').classList.add('show');
      setAdminLang(adminLang);
      // prefetch
      getOrders(true).then(function() { updateNavBadge(); });
      getProducts(true);
      getCategories(true);
      startLiveUpdates();
    }
  })();
}

async function handleLogin(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (e && e.stopPropagation) e.stopPropagation();
  const user = (document.getElementById('loginUser') || {}).value || '';
  const pass = (document.getElementById('loginPass') || {}).value || '';
  const err = document.getElementById('loginError');
  const form = document.getElementById('loginForm') || (e && e.target);
  const btn = form ? form.querySelector('button[type="submit"]') : null;
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  if (err) { err.style.display = 'none'; err.textContent = ''; }
  let ok = false;
  try {
    ok = await login(user.trim(), pass);
  } catch (ex) {
    console.error(ex);
    window._lastLoginError = ex.message || String(ex);
    ok = false;
  }
  if (ok) {
    if (err) { err.style.display = 'none'; err.textContent = ''; }
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').classList.add('show');
    setAdminLang(adminLang);
    try {
      await getOrders(true);
      await getProducts(true);
      await getCategories(true);
      await hydrateContentFromDB();
      if (typeof hydrateStaffFromDB === 'function') await hydrateStaffFromDB();
    } catch (loadErr) { console.warn('prefetch', loadErr); }
    startLiveUpdates();
    renderPage();
    toast(t('welcome'));
  } else {
    const detail = window._lastLoginError || '';
    let msg = t('loginError');
    if (/Invalid login credentials|invalid_credentials/i.test(detail)) {
      msg = (adminLang === 'ar')
        ? 'البريد أو كلمة المرور غير صحيحة'
        : 'Email ou mot de passe incorrect';
    } else if (/Email not confirmed|email_not_confirmed/i.test(detail)) {
      msg = (adminLang === 'ar')
        ? 'البريد غير مؤكّد — عطّل Confirm email من إعدادات Authentication'
        : 'Email non confirmé — désactivez Confirm email dans Auth';
    } else if (/Failed to fetch|NetworkError|CORS|Load failed/i.test(detail)) {
      msg = (adminLang === 'ar')
        ? 'مشكلة شبكة/CORS — افتح الموقع عبر خادم محلي (npx serve) وليس file://'
        : 'Erreur réseau/CORS — ouvrez via un serveur local (npx serve)';
    } else if (detail) {
      msg = detail;
    }
    if (err) {
      err.style.display = 'block';
      err.textContent = msg;
    } else {
      alert(msg);
    }
  }
  if (btn) { btn.disabled = false; btn.textContent = t('loginBtn'); }
  return false;
}


window.addEventListener('resize', () => {
  if (window.innerWidth > 800) closeSidebar();
  if (_leafletMap) try { _leafletMap.invalidateSize(); } catch(e) {}
});
window.addEventListener('orientationchange', () => {
  setTimeout(() => { if (_leafletMap) try { _leafletMap.invalidateSize(); } catch(e) {} }, 300);
});

document.addEventListener('DOMContentLoaded', initApp);


/* ===== RINGS HELPER ===== */
function ringSVG(pct, colorClass) {
  const r = 45, c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, pct)) / 100) * c;
  return `<div class="ring-wrap"><svg viewBox="0 0 100 100">
    <circle class="bg" cx="50" cy="50" r="${r}"/>
    <circle class="fg ${colorClass}" cx="50" cy="50" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${offset}"/>
  </svg><div class="ring-center"><strong>${Math.round(pct)}%</strong><span>%</span></div></div>`;
}

/* ===== ANALYTICS ===== */

function buildOrdersLineChart() {
  const orders = (_cache.orders || []).filter(o => o.status !== 'cancelled');
  // Last 7 days buckets
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0,0,0,0);
    days.push({ date: d, label: d.toLocaleDateString(adminLang === 'ar' ? 'ar-DZ' : 'fr-DZ', { weekday: 'short', day: 'numeric' }), count: 0, revenue: 0 });
  }
  orders.forEach(o => {
    const od = new Date(o.date);
    od.setHours(0,0,0,0);
    const bucket = days.find(d => d.date.getTime() === od.getTime());
    if (bucket) {
      bucket.count++;
      bucket.revenue += o.totalNum || 0;
    }
  });
  const w = 600, h = 200, pad = { t: 20, r: 20, b: 36, l: 40 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxVal = Math.max(1, ...days.map(d => d.count));
  const points = days.map((d, i) => {
    const x = pad.l + (i / Math.max(1, days.length - 1)) * innerW;
    const y = pad.t + innerH - (d.count / maxVal) * innerH;
    return { x, y, ...d };
  });
  const lineD = points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ');
  const areaD = lineD + ' L' + points[points.length-1].x + ',' + (pad.t+innerH) + ' L' + points[0].x + ',' + (pad.t+innerH) + ' Z';
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const y = pad.t + innerH * (1 - f);
    return `<line class="grid-line" x1="${pad.l}" y1="${y}" x2="${w-pad.r}" y2="${y}"/>
      <text class="axis-label" x="${pad.l - 6}" y="${y + 3}" text-anchor="end">${Math.round(maxVal * f)}</text>`;
  }).join('');
  const labels = points.map(p => `<text class="axis-label" x="${p.x}" y="${h - 8}" text-anchor="middle">${p.label}</text>`).join('');
  const dots = points.map(p => `<circle class="dot ${p.count > 0 ? 'dot-gold' : ''}" cx="${p.x}" cy="${p.y}" r="5"><title>${p.count} — ${p.revenue.toLocaleString()}</title></circle>`).join('');
  const title = adminLang === 'ar' ? 'الطلبات خلال 7 أيام' : 'Commandes — 7 derniers jours';
  return `<div class="line-chart-card">
    <h3>${title}</h3>
    <svg class="line-chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
      ${gridLines}
      <path class="area-path" d="${areaD}"/>
      <path class="line-path" d="${lineD}"/>
      ${dots}
      ${labels}
    </svg>
  </div>`;
}


function getProductSales() {
  const orders = (_cache.orders || []).filter(o => o.status !== 'cancelled');
  const products = _cache.products || [];
  const counts = {};
  orders.forEach(o => {
    (o.items || []).forEach(it => {
      counts[it.id] = (counts[it.id] || 0) + (it.qty || 1);
    });
  });
  return products.map(p => ({
    ...p,
    sold: counts[p.id] || 0
  })).sort((a, b) => b.sold - a.sold);
}

function renderAnalytics() {
  const ranked = getProductSales();
  const top = ranked.filter(p => p.sold > 0).slice(0, 5);
  const worst = [...ranked].reverse().slice(0, 5);
  const maxSold = top[0]?.sold || 1;
  const orders = _cache.orders || [];
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const conv = orders.length ? (delivered / orders.length) * 100 : 0;
  const lowStock = (_cache.products || []).filter(p => (p.stock || 0) < 10);

  return `
    <div class="charts-row">
      <div class="chart-card">
        <h4>${t('conversion')}</h4>
        ${ringSVG(conv, 'green')}
        <div style="font-size:0.85rem;color:var(--brown-light)">${delivered} / ${orders.length}</div>
      </div>
      <div class="chart-card">
        <h4>${t('newOrders')}</h4>
        ${ringSVG(orders.length ? (newOrdersCount()/orders.length)*100 : 0, 'gold')}
        <div style="font-size:0.85rem;color:var(--brown-light)">${newOrdersCount()} ${t('confirmed')}</div>
      </div>
      <div class="chart-card">
        <h4>${t('lowStock')}</h4>
        ${ringSVG((_cache.products || []).length ? (lowStock.length/(_cache.products || []).length)*100 : 0, 'blue')}
        <div style="font-size:0.85rem;color:var(--brown-light)">${lowStock.length} ${t('products')}</div>
      </div>
    </div>
    <div class="two-col">
      <div class="panel">
        <div class="panel-header"><h3>★ ${t('topProducts')}</h3></div>
        <div class="panel-body">
          ${top.length ? `<ul class="rank-list">${top.map((p,i) => `
            <li class="rank-item top">
              <div class="rank-num">${i+1}</div>
              ${p.image ? `<img src="${p.image}" alt="">` : ''}
              <div class="info"><strong>${p.name?.ar || p.name}</strong><small>${p.name?.fr || ''}</small></div>
              <div class="qty">${p.sold}</div>
            </li>`).join('')}</ul>
            <div class="bar-chart" style="margin-top:16px">${top.map(p => `
              <div class="bar-row"><div class="name">${(p.name?.ar||'').slice(0,12)}</div>
              <div class="bar-track"><div class="bar-fill" style="width:${(p.sold/maxSold)*100}%"></div></div>
              <div class="val">${p.sold}</div></div>`).join('')}</div>`
          : `<div class="empty-state">${t('noOrders')}</div>`}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><h3>${t('worstProducts')}</h3></div>
        <div class="panel-body">
          <ul class="rank-list">${worst.map((p,i) => `
            <li class="rank-item bad">
              <div class="rank-num">${i+1}</div>
              ${p.image ? `<img src="${p.image}" alt="">` : ''}
              <div class="info"><strong>${p.name?.ar || p.name}</strong><small>${t('stock')}: ${p.stock ?? '—'}</small></div>
              <div class="qty">${p.sold}</div>
            </li>`).join('')}</ul>
        </div>
      </div>
    </div>
    ${lowStock.length ? `<div class="panel"><div class="panel-header"><h3>⚠ ${t('stockAlert')}</h3></div>
      <div class="panel-body"><ul class="rank-list">${lowStock.map(p => `
        <li class="rank-item"><div class="rank-num">!</div>
        <div class="info"><strong>${p.name?.ar}</strong><small>${t('stock')}: ${p.stock}</small></div></li>`).join('')}</ul></div></div>` : ''}
  `;
}

/* ===== MAP ===== */

function renderMap() {
  const orders = (_cache.orders || []).filter(o => o.status !== 'cancelled');
  const byWilaya = {};
  orders.forEach(o => {
    let w = (o.wilaya || '').trim();
    const m = w.match(/^(\d+)\s*-?\s*(.+)$/);
    const key = m ? m[2].trim() : (w || '—');
    if (!byWilaya[key]) byWilaya[key] = { count: 0, name: key };
    byWilaya[key].count++;
  });
  const entries = Object.values(byWilaya).sort((a,b) => b.count - a.count);
  const maxC = entries[0]?.count || 1;
  const total = orders.length || 1;

  // Algeria city coordinates [lat, lng]
  const coords = {
    'الجزائر': [36.7538, 3.0588], 'وهران': [35.6969, -0.6331], 'قسنطينة': [36.365, 6.6147],
    'عنابة': [36.9, 7.7667], 'سطيف': [36.1898, 5.4108], 'البليدة': [36.47, 2.83],
    'تيزي وزو': [36.7167, 4.05], 'بجاية': [36.75, 5.0833], 'تلمسان': [34.8828, -1.3167],
    'باتنة': [35.555, 6.174], 'ورقلة': [31.95, 5.33], 'غرداية': [32.49, 3.67],
    'بشار': [31.6167, -2.2167], 'تمنراست': [22.785, 5.5228], 'سكيكدة': [36.8667, 6.9],
    'جيجل': [36.82, 5.75], 'المدية': [36.2675, 2.75], 'الشلف': [36.165, 1.333],
    'مستغانم': [35.933, 0.09], 'سيدي بلعباس': [35.2, -0.633], 'تيارت': [35.37, 1.32],
    'الأغواط': [33.8, 2.88], 'بسكرة': [34.85, 5.73], 'الوادي': [33.368, 6.867],
    'تبسة': [35.4, 8.12], 'خنشلة': [35.43, 7.14], 'سوق أهراس': [36.28, 7.95],
    'قالمة': [36.46, 7.43], 'بومرداس': [36.76, 3.47], 'تيبازة': [36.59, 2.45],
    'عين الدفلى': [36.26, 1.97], 'غليزان': [35.74, 0.55], 'معسكر': [35.4, 0.14],
    'سعيدة': [34.83, 0.15], 'الجلفة': [34.67, 3.25], 'برج بوعريريج': [36.07, 4.76],
    'ميلة': [36.45, 6.26], 'أدرار': [27.87, -0.29], 'إليزي': [26.5, 8.48],
    'البيض': [33.68, 1.02], 'النعامة': [33.26, -0.31], 'تندوف': [27.67, -8.13],
    'عين تموشنت': [35.3, -1.14], 'المسيلة': [35.7, 4.54]
  };

  function getCoords(name) {
    if (coords[name]) return coords[name];
    for (const k of Object.keys(coords)) {
      if (name.includes(k) || k.includes(name)) return coords[k];
    }
    return null;
  }

  // Defer Leaflet init
  setTimeout(() => initLeafletMap(entries, getCoords, maxC), 80);

  return `
    <div class="panel">
      <div class="panel-header"><h3>${t('salesByRegion')}</h3></div>
      <div class="panel-body">
        <p style="font-size:0.85rem;color:var(--brown-light);margin-bottom:12px">
          ${adminLang === 'ar' ? 'خريطة حقيقية — الدوائر = عدد الطلبات حسب الولاية' : 'Carte interactive — cercles = commandes par wilaya'}
        </p>
        <div id="leafletMap"></div>
        ${entries.length ? `
        <div class="table-wrap" style="margin-top:20px">
          <table>
            <thead><tr><th>#</th><th>${t('wilaya')}</th><th>${t('totalOrders')}</th><th>%</th></tr></thead>
            <tbody>
              ${entries.map((e, i) => `
                <tr>
                  <td>${i+1}</td>
                  <td><strong>${e.name}</strong></td>
                  <td>${e.count}</td>
                  <td>${Math.round(e.count/total*100)}%</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>` : `<div class="empty-state">${t('noOrders')}</div>`}
      </div>
    </div>`;
}

let _leafletMap = null;
function initLeafletMap(entries, getCoords, maxC) {
  const el = document.getElementById('leafletMap');
  if (!el || typeof L === 'undefined') {
    if (el) el.innerHTML = '<p style="padding:40px;text-align:center;color:var(--brown-light)">Chargement de la carte… Vérifiez la connexion internet.</p>';
    return;
  }
  if (_leafletMap) {
    try { _leafletMap.remove(); } catch(e) {}
    _leafletMap = null;
  }
  el.innerHTML = '';
  _leafletMap = L.map(el, { scrollWheelZoom: true }).setView([28.0, 2.5], 5);
  // Esri World Street Map — free, no API key required
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Source: Esri, OpenStreetMap',
    maxZoom: 19
  }).addTo(_leafletMap);

  entries.forEach(e => {
    const c = getCoords(e.name);
    if (!c) return;
    const label = (adminLang === 'ar' ? 'طلب' : 'commandes');
    // Small fixed pixel circle (does not cover neighboring wilayas)
    L.circleMarker(c, {
      radius: 7,
      color: '#1a1a1a',
      weight: 2,
      fillColor: '#C9A227',
      fillOpacity: 0.9
    }).addTo(_leafletMap)
      .bindPopup('<strong>' + e.name + '</strong><br>' + e.count + ' ' + label);

    // Small count badge next to the point
    const icon = L.divIcon({
      className: 'map-count-label',
      html: '<span class="map-badge-sm">' + e.count + '</span><span class="map-name-sm">' + e.name + '</span>',
      iconSize: [80, 28],
      iconAnchor: [-6, 12]
    });
    L.marker(c, { icon, interactive: false }).addTo(_leafletMap);
  });

  setTimeout(() => { try { _leafletMap.invalidateSize(); } catch(e) {} }, 200);
}


function showMapTip(evt, name, count) {
  const tip = document.getElementById('mapTooltip');
  const wrap = document.getElementById('dzMapWrap');
  if (!tip || !wrap) return;
  const rect = wrap.getBoundingClientRect();
  tip.style.display = 'block';
  tip.innerHTML = '<strong>' + name + '</strong>' + count + ' ' + (typeof t === 'function' ? t('totalOrders') : 'commandes');
  tip.style.left = (evt.clientX - rect.left + 12) + 'px';
  tip.style.top = (evt.clientY - rect.top - 10) + 'px';
}
function hideMapTip() {
  const tip = document.getElementById('mapTooltip');
  if (tip) tip.style.display = 'none';
}


async function renderStaff() {
  if (typeof hydrateStaffFromDB === 'function') await hydrateStaffFromDB();

  const list = getStaff();
  const roleLabel = { admin: t('adminRole'), manager: t('managerRole'), staff: t('staffRole') };
  const permLabel = { orders: t('permOrders'), products: t('permProducts'), categories: t('categories'), content: t('permContent'), settings: t('permSettings'), staff: t('permStaff'), analytics: t('analytics') };

  return `
    <div class="panel">
      <div class="panel-header">
        <h3>${t('staff')} (${list.length})</h3>
        <button class="btn btn-primary btn-sm" onclick="openStaffForm()">+ ${t('addStaff')}</button>
      </div>
      <div class="panel-body">
        ${list.map(s => `
          <div class="staff-card">
            <div class="staff-avatar">${(s.name || '?')[0]}</div>
            <div class="staff-info">
              <h4>${s.name}</h4>
              <small>${s.email || ''} · <span class="role-badge">${roleLabel[s.role] || s.role}</span></small>
              <div class="perm-tags">${(s.perms||[]).map(p => `<span class="perm-tag">${permLabel[p]||p}</span>`).join('')}</div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="openStaffForm(${s.id})">${t('edit')}</button>
            ${s.role !== 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deleteStaff(${s.id})">${t('delete')}</button>` : ''}
          </div>`).join('')}
      </div>
    </div>`;
}

function openStaffForm(id) {
  const list = getStaff();
  const s = id ? list.find(x => x.id === id) : null;
  const allPerms = ['orders','products','categories','content','settings','staff','analytics'];
  const permLabel = { orders: t('permOrders'), products: t('permProducts'), categories: t('categories'), content: t('permContent'), settings: t('permSettings'), staff: t('permStaff'), analytics: t('analytics') };
  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay show" onclick="if(event.target===this)closeModal()">
      <div class="modal">
        <div class="modal-header"><h3>${s ? t('edit') : t('addStaff')}</h3>
          <button class="modal-close" onclick="closeModal()">&times;</button></div>
        <div class="modal-body">
          <div class="form-group"><label>${t('customer')}</label><input id="sf_name" value="${(s?.name||'').replace(/"/g,'&quot;')}"></div>
          <div class="form-group"><label>${t('email')}</label><input id="sf_email" value="${(s?.email||'').replace(/"/g,'&quot;')}"></div>
          <div class="form-group"><label>${t('role')}</label>
            <select id="sf_role">
              <option value="admin" ${s?.role==='admin'?'selected':''}>${t('adminRole')}</option>
              <option value="manager" ${s?.role==='manager'?'selected':''}>${t('managerRole')}</option>
              <option value="staff" ${s?.role==='staff'?'selected':''}>${t('staffRole')}</option>
            </select>
          </div>
          <div class="form-group"><label>${t('permissions')}</label>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
              ${allPerms.map(p => `
                <label style="display:flex;align-items:center;gap:6px;font-size:0.88rem;cursor:pointer">
                  <input type="checkbox" class="sf-perm" value="${p}" ${(s?.perms||[]).includes(p)?'checked':''}>
                  ${permLabel[p]}
                </label>`).join('')}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
          <button class="btn btn-primary" onclick="saveStaffMember(${s?s.id:'null'})">${t('save')}</button>
        </div>
      </div>
    </div>`;
}

function saveStaffMember(id) {
  const list = getStaff();
  const perms = [...document.querySelectorAll('.sf-perm:checked')].map(c => c.value);
  const data = {
    name: document.getElementById('sf_name').value,
    email: document.getElementById('sf_email').value,
    role: document.getElementById('sf_role').value,
    perms, active: true
  };
  if (id) {
    const i = list.findIndex(x => x.id === id);
    if (i >= 0) list[i] = { ...list[i], ...data };
  } else {
    const newId = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    list.push({ id: newId, ...data });
  }
  saveStaff(list);
  toast(t('saved'));
  closeModal();
  renderPage();
}
function deleteStaff(id) {
  if (!confirm(adminLang==='ar'?'حذف الموظف؟':'Supprimer ?')) return;
  saveStaff(getStaff().filter(s => s.id !== id));
  toast(t('deleted'));
  renderPage();
}

/* ===== PAYMENTS ===== */
async function renderPayments() {
  try {
    if (typeof SiBelleSB !== 'undefined') {
      const rows = await SiBelleSB.loadPaymentMethods();
      // also load disabled ones for admin
      const sb = SiBelleSB.getSupabase();
      const { data } = await sb.from('payment_methods').select('*').order('sort_order');
      if (data && data.length) {
        const s = getSettings();
        s.payments = data.map(r => ({
          id: r.id,
          enabled: r.enabled !== false,
          name: { ar: r.name_ar, fr: r.name_fr },
          desc: { ar: r.description_ar || '', fr: r.description_fr || '' },
          details: r.details || ''
        }));
        saveSettings(s);
      }
    }
  } catch (e) { console.warn(e); }

  const list = getPayments();
  return `
    <div class="panel">
      <div class="panel-header">
        <h3>${t('payments')}</h3>
        <button class="btn btn-primary btn-sm" onclick="openPaymentForm()">${t('addPayment')}</button>
      </div>
      <div class="panel-body" style="padding:12px 16px 16px">
        <p style="font-size:0.85rem;color:var(--brown-light);margin-bottom:14px">
          ${adminLang === 'ar' ? 'فعّلي أو عطّلي طرق الدفع التي تظهر للعميلة عند إتمام الطلب. يمكنكِ إضافة حساب CCP أو Baridi مع التفاصيل.' : 'Activez ou désactivez les moyens de paiement affichés au checkout. Ajoutez les détails CCP / Baridi.'}
        </p>
        <div class="pay-list">
          ${list.map((p, i) => `
            <div class="pay-card ${p.enabled ? '' : 'pay-off'}">
              <div class="pay-card-top">
                <div>
                  <div class="pay-name">${(p.name && (p.name[adminLang] || p.name.ar)) || p.id}</div>
                  <div class="pay-id"><code>${p.id}</code></div>
                </div>
                <div class="switch ${p.enabled ? 'on' : ''}" onclick="togglePayment(${i})" title="${p.enabled ? t('enabledOn') : t('enabledOff')}"></div>
              </div>
              <div class="pay-desc">${(p.desc && (p.desc[adminLang] || p.desc.ar)) || '—'}</div>
              ${p.details ? `<div class="pay-details">${p.details}</div>` : ''}
              <div class="pay-actions">
                <button class="btn btn-ghost btn-sm" onclick="openPaymentForm(${i})">${t('edit')}</button>
                <button class="btn btn-danger btn-sm" onclick="deletePayment(${i})">${t('delete')}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function openPaymentForm(idx) {
  const list = getPayments();
  const p = typeof idx === 'number' ? list[idx] : { id: '', enabled: true, name: { ar: '', fr: '' }, desc: { ar: '', fr: '' }, details: '' };
  const isEdit = typeof idx === 'number';
  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay show" onclick="if(event.target===this)closeModal()">
      <div class="modal">
        <div class="modal-header">
          <h3>${isEdit ? t('edit') : t('addPayment')}</h3>
          <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group"><label>${t('paymentId')}</label>
            <input id="pay_id" value="${p.id || ''}" ${isEdit ? 'readonly' : ''} placeholder="cod / ccp / baridi / custom"></div>
          <div class="form-grid">
            <div class="form-group"><label>${t('paymentName')} (AR)</label><input id="pay_name_ar" value="${(p.name && p.name.ar) || ''}"></div>
            <div class="form-group"><label>${t('paymentName')} (FR)</label><input id="pay_name_fr" value="${(p.name && p.name.fr) || ''}"></div>
            <div class="form-group"><label>${t('paymentDesc')} (AR)</label><input id="pay_desc_ar" value="${(p.desc && p.desc.ar) || ''}"></div>
            <div class="form-group"><label>${t('paymentDesc')} (FR)</label><input id="pay_desc_fr" value="${(p.desc && p.desc.fr) || ''}"></div>
            <div class="form-group full"><label>${t('paymentDetails')}</label>
              <textarea id="pay_details" rows="2" placeholder="CCP / RIP / IBAN...">${p.details || ''}</textarea></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
          <button class="btn btn-primary" onclick="savePaymentForm(${isEdit ? idx : 'null'})">${t('save')}</button>
        </div>
      </div>
    </div>`;
}

async function savePaymentForm(idx) {
  const id = (document.getElementById('pay_id').value || '').trim().toLowerCase().replace(/\s+/g, '_');
  if (!id) { toast(adminLang === 'ar' ? 'أدخلي المعرّف' : 'Identifiant requis'); return; }
  const s = getSettings();
  const list = getPayments();
  const data = {
    id,
    enabled: true,
    name: { ar: document.getElementById('pay_name_ar').value, fr: document.getElementById('pay_name_fr').value },
    desc: { ar: document.getElementById('pay_desc_ar').value, fr: document.getElementById('pay_desc_fr').value },
    details: document.getElementById('pay_details').value
  };
  if (idx === null || idx === 'null') {
    if (list.some(p => p.id === id)) { toast(adminLang === 'ar' ? 'المعرّف موجود مسبقاً' : 'ID déjà utilisé'); return; }
    list.push(data);
  } else {
    data.enabled = list[idx].enabled !== false;
    list[idx] = data;
  }
  s.payments = list;
  saveSettings(s);
  try {
    await SiBelleSB.upsertPaymentMethod(data);
    toast(t('saved'));
    closeModal();
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}

async function togglePayment(idx) {
  const s = getSettings();
  const list = getPayments();
  if (!list[idx]) return;
  list[idx].enabled = !list[idx].enabled;
  s.payments = list;
  saveSettings(s);
  try {
    await SiBelleSB.upsertPaymentMethod(list[idx]);
    toast(t('saved'));
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}

async function deletePayment(idx) {
  if (!confirm(adminLang === 'ar' ? 'حذف طريقة الدفع؟' : 'Supprimer ce moyen ?')) return;
  const s = getSettings();
  const list = getPayments();
  const row = list[idx];
  if (!row) return;
  list.splice(idx, 1);
  s.payments = list;
  saveSettings(s);
  try {
    await SiBelleSB.deletePaymentMethod(row.id);
    toast(t('deleted'));
    renderPage();
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
}

/* ===== INVOICE DESIGN ===== */
function renderInvoice() {
  const inv = getInvoiceConfig();
  const color = inv.color || '#C9A227';
  return `
    <div class="panel">
      <div class="panel-header">
        <h3>${t('invoice')}</h3>
        <span class="status ${inv.enabled ? 'status-delivered' : 'status-cancelled'}">${inv.enabled ? t('enabledOn') : t('enabledOff')}</span>
      </div>
      <div class="panel-body">
        <div class="toggle-row">
          <div class="info"><strong>${t('invoiceEnabled')}</strong><small>${adminLang === 'ar' ? 'السماح بطباعة وعرض الفاتورة' : 'Autoriser impression / affichage'}</small></div>
          <div class="switch ${inv.enabled ? 'on' : ''}" onclick="toggleInvoiceField('enabled')"></div>
        </div>
        <div class="toggle-row">
          <div class="info"><strong>${t('invoiceOnSuccess')}</strong><small>${adminLang === 'ar' ? 'زر الفاتورة في صفحة نجاح الطلب' : 'Bouton facture page succès'}</small></div>
          <div class="switch ${inv.showOnSuccess ? 'on' : ''}" onclick="toggleInvoiceField('showOnSuccess')"></div>
        </div>
        <div class="toggle-row">
          <div class="info"><strong>${t('invoiceQr')}</strong></div>
          <div class="switch ${inv.showQr ? 'on' : ''}" onclick="toggleInvoiceField('showQr')"></div>
        </div>
        <div class="toggle-row">
          <div class="info"><strong>${t('invoiceLogo')}</strong></div>
          <div class="switch ${inv.showLogo ? 'on' : ''}" onclick="toggleInvoiceField('showLogo')"></div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>${adminLang === 'ar' ? 'تصميم الفاتورة' : 'Design facture'}</h3></div>
      <div class="panel-body">
        <div class="form-grid">
          <div class="form-group"><label>${t('invoiceColor')}</label>
            <div style="display:flex;gap:10px;align-items:center">
              <input type="color" id="inv_color" value="${color}" style="width:52px;height:40px;padding:2px;cursor:pointer">
              <input type="text" id="inv_color_txt" value="${color}" style="flex:1" oninput="document.getElementById('inv_color').value=this.value">
            </div>
          </div>
          <div class="form-group"><label>${t('invoiceCompany')}</label>
            <input id="inv_company" value="${inv.companyName || 'Si Belle'}"></div>
          <div class="form-group"><label>${t('invoiceTitle')} (AR)</label>
            <input id="inv_title_ar" value="${inv.title?.ar || 'فاتورة'}"></div>
          <div class="form-group"><label>${t('invoiceTitle')} (FR)</label>
            <input id="inv_title_fr" value="${inv.title?.fr || 'Facture'}"></div>
          <div class="form-group"><label>${t('invoiceSubtitle')} (AR)</label>
            <input id="inv_sub_ar" value="${inv.companySubtitle?.ar || ''}"></div>
          <div class="form-group"><label>${t('invoiceSubtitle')} (FR)</label>
            <input id="inv_sub_fr" value="${inv.companySubtitle?.fr || ''}"></div>
          <div class="form-group"><label>${t('invoiceFooter')} (AR)</label>
            <input id="inv_foot_ar" value="${inv.footer?.ar || ''}"></div>
          <div class="form-group"><label>${t('invoiceFooter')} (FR)</label>
            <input id="inv_foot_fr" value="${inv.footer?.fr || ''}"></div>
          <div class="form-group full"><label>${t('invoiceNote')} (AR)</label>
            <textarea id="inv_note_ar" rows="2">${inv.note?.ar || ''}</textarea></div>
          <div class="form-group full"><label>${t('invoiceNote')} (FR)</label>
            <textarea id="inv_note_fr" rows="2">${inv.note?.fr || ''}</textarea></div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
          <button class="btn btn-primary" onclick="saveInvoiceDesign()">${t('save')}</button>
          <button class="btn btn-ghost" onclick="previewInvoiceDesign()">${t('previewInvoice')}</button>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>${t('previewInvoice')}</h3></div>
      <div class="panel-body">
        <div class="inv-preview" id="invPreviewBox" style="--inv-accent:${color}">
          ${inv.showLogo !== false ? `<div class="inv-prev-logo"><img src="../images/logo.png" alt=""></div>` : ''}
          <div class="inv-prev-brand" style="color:${color}">${inv.companyName || 'Si Belle'}</div>
          <div class="inv-prev-sub">${(inv.companySubtitle && (inv.companySubtitle[adminLang] || inv.companySubtitle.ar)) || ''}</div>
          <div class="inv-prev-title" style="color:${color}">${(inv.title && (inv.title[adminLang] || inv.title.ar)) || t('invoice')} · SB-DEMO-0001</div>
          <div class="inv-prev-row"><span>${t('customer')}</span><span>فاطمة بن علي</span></div>
          <div class="inv-prev-row"><span>${t('phone')}</span><span dir="ltr">0555 12 34 56</span></div>
          <div class="inv-prev-row"><span>${t('total')}</span><span style="font-weight:700;color:${color}">6,800 ${t('currency')}</span></div>
          <div class="inv-prev-foot">${(inv.footer && (inv.footer[adminLang] || inv.footer.ar)) || ''}</div>
        </div>
      </div>
    </div>`;
}

function toggleInvoiceField(key) {
  const s = getSettings();
  const inv = getInvoiceConfig();
  inv[key] = !inv[key];
  s.invoice = inv;
  saveSettings(s);
  toast(t('saved'));
  renderPage();
}

async function saveInvoiceDesign() {
  const s = getSettings();
  const inv = getInvoiceConfig();
  const color = document.getElementById('inv_color')?.value || document.getElementById('inv_color_txt')?.value || '#C9A227';
  inv.color = color;
  inv.companyName = document.getElementById('inv_company').value || 'Si Belle';
  inv.title = { ar: document.getElementById('inv_title_ar').value, fr: document.getElementById('inv_title_fr').value };
  inv.companySubtitle = { ar: document.getElementById('inv_sub_ar').value, fr: document.getElementById('inv_sub_fr').value };
  inv.footer = { ar: document.getElementById('inv_foot_ar').value, fr: document.getElementById('inv_foot_fr').value };
  inv.note = { ar: document.getElementById('inv_note_ar').value, fr: document.getElementById('inv_note_fr').value };
  s.invoice = inv;
  saveSettings(s);
  try {
    const inv = s.invoice || {};
    await SiBelleSB.upsertInvoiceSettings({
      enabled: inv.enabled !== false,
      show_on_success: inv.showOnSuccess !== false,
      show_logo: inv.showLogo !== false,
      show_qr: inv.showQr !== false,
      show_customer: inv.showCustomer !== false,
      show_address: inv.showAddress !== false,
      show_payment: inv.showPayment !== false,
      show_items: inv.showItems !== false,
      show_shipping: inv.showShipping !== false,
      show_discount: inv.showDiscount !== false,
      show_total: inv.showTotal !== false,
      auto_number_prefix: inv.prefix || 'SB-',
      color: inv.color || '#C9A227',
      title_ar: inv.title?.ar || 'فاتورة',
      title_fr: inv.title?.fr || 'Facture',
      company_name: inv.companyName || 'Si Belle',
      company_subtitle_ar: inv.companySubtitle?.ar || '',
      company_subtitle_fr: inv.companySubtitle?.fr || '',
      footer_ar: inv.footer?.ar || '',
      footer_fr: inv.footer?.fr || '',
      note_ar: inv.note?.ar || '',
      note_fr: inv.note?.fr || ''
    });
    toast(t('saved'));
  } catch (e) {
    console.error(e);
    toast(e.message || 'Error');
  }
  renderPage();
}

function previewInvoiceDesign() {
  saveInvoiceDesign();
  const demo = (_cache.orders || [])[0];
  if (demo) printOrderInvoice(demo.orderNumber);
  else {
    // print with fake order
    const fake = {
      orderNumber: 'SB-DEMO-0001', name: 'فاطمة بن علي', phone: '0555123456',
      wilaya: '16 - الجزائر', commune: 'باب الزوار', address: 'حي السلام',
      payment: 'cod', total: '6,800 دج', totalNum: 6800, date: new Date().toISOString(),
      items: [{ id: 1, qty: 2 }]
    };
    const orders = _cache.orders || [];
    orders.unshift(fake);
    saveOrders(orders);
    printOrderInvoice(fake.orderNumber);
    saveOrders(orders.slice(1));
  }
}

/* ===== PRINT INVOICE ===== */
async function printOrderInvoice(orderNumber) {
  const inv = getInvoiceConfig();
  if (inv.enabled === false) {
    toast(adminLang === 'ar' ? 'الفاتورة معطّلة من الإعدادات' : 'Facture désactivée');
    return;
  }
  let order = (_cache.orders || []).find(o => o.orderNumber === orderNumber);
  if (!order) return;
  await ensureOrderItems(order);
  await getProducts();
  const products = _cache.products || [];
  const payments = getPayments();
  const payObj = payments.find(p => p.id === order.payment);
  const payLabel = payObj
    ? (payObj.name.fr || payObj.name.ar || order.payment)
    : ({ cod: 'Paiement a la livraison', ccp: 'CCP', baridi: 'Baridi Mob' }[order.payment] || order.payment);
  const color = inv.color || '#C9A227';
  const company = inv.companyName || 'Si Belle';
  const subtitle = (inv.companySubtitle && (inv.companySubtitle.fr || inv.companySubtitle.ar)) || 'Clothing Line — Algerie';
  const title = (inv.title && (inv.title.fr || inv.title.ar)) || 'Facture';
  const footer = (inv.footer && (inv.footer.fr || inv.footer.ar)) || 'Merci pour votre confiance — Si Belle';
  const note = (inv.note && (inv.note.fr || inv.note.ar)) || '';
  const items = (order.items || []).map(it => {
    const pid = it.product_id != null ? it.product_id : it.id;
    const p = products.find(x => x.id === pid || String(x.id) === String(pid));
    const name = it.name_fr || p?.name?.fr || it.name_ar || p?.name?.ar || ('#' + (pid || '?'));
    const qty = Number(it.qty || it.quantity) || 1;
    const price = Number(it.price) || (p ? Number(p.price) : 0) || 0;
    const variant = [it.color, it.size].filter(Boolean).join(' / ');
    return { name: name + (variant ? ' (' + variant + ')' : ''), qty: qty, price: price };
  });
  const area = document.createElement('div');
  area.id = 'printArea';
  area.innerHTML = `<div class="print-invoice" style="--inv-accent:${color}">
    ${inv.showLogo !== false ? `<div style="text-align:center;margin-bottom:8px"><img src="../images/logo.png" width="64" height="64" style="border-radius:50%;object-fit:cover" onerror="this.style.display='none'"/></div>` : ''}
    <div class="brand"><h2 style="color:${color}">${company}</h2><small>${subtitle}</small></div>
    <div style="text-align:center;font-weight:700;color:${color};margin-bottom:12px">${title} · N° ${order.orderNumber}</div>
    ${inv.showQr !== false ? `<div style="text-align:center;margin:12px 0">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&margin=6&data=${encodeURIComponent(company + '\nCommande: ' + order.orderNumber + '\nTel: ' + (order.phone||'') + '\nClient: ' + (order.name||''))}"
           width="110" height="110" alt="QR" style="border:1px solid #eee;border-radius:8px"
           onerror="this.style.display='none'"/>
    </div>` : ''}
    <div class="row"><span>Date</span><span>${order.date ? new Date(order.date).toLocaleDateString('fr-DZ') : '—'}</span></div>
    <div class="row"><span>Client</span><span>${order.name}</span></div>
    <div class="row"><span>Tel</span><span>${order.phone}</span></div>
    <div class="row"><span>Wilaya</span><span>${order.wilaya || '—'}</span></div>
    <div class="row"><span>Commune</span><span>${order.commune || '—'}</span></div>
    <div class="row"><span>Adresse</span><span>${order.address || '—'}</span></div>
    <div class="row"><span>Paiement</span><span>${payLabel}</span></div>
    <hr style="border:none;border-top:1px solid #eee;margin:12px 0">
    ${items.map(it => `<div class="row"><span>${it.name} × ${it.qty}</span><span>${(it.price*it.qty).toLocaleString()} DA</span></div>`).join('')}
    <div class="total" style="color:${color}"><span>Total</span><span>${order.total || '—'}</span></div>
    ${note ? `<div style="text-align:center;margin-top:10px;font-size:0.78rem;color:#8B6F5C">${note}</div>` : ''}
    <div style="text-align:center;margin-top:16px;font-size:0.75rem;color:#8B6F5C">${footer}</div>
  </div>`;
  document.body.appendChild(area);
  const img = area.querySelector('img[alt="QR"]') || area.querySelector('img');
  const doPrint = () => {
    window.print();
    setTimeout(() => area.remove(), 800);
  };
  if (img && !img.complete) {
    img.onload = doPrint;
    img.onerror = doPrint;
    setTimeout(doPrint, 2500);
  } else {
    setTimeout(doPrint, 200);
  }
}


window.showPage = showPage;
window.renderShipping = renderShipping;
window.saveAllWilayaShipping = saveAllWilayaShipping;
window.addWilaya = addWilaya;
window.deleteWilaya = deleteWilaya;
window.deleteOrder = deleteOrder;
window.logout = logout;
window.handleLogin = handleLogin;
window.openOrderDetail = openOrderDetail;
window.updateOrderStatus = updateOrderStatus;
window.closeModal = closeModal;
window.openProductForm = openProductForm;
window.rebuildVariantMatrix = rebuildVariantMatrix;
window.updateTotalStockFromMatrix = updateTotalStockFromMatrix;
window.saveProduct = saveProduct;
window.deleteProduct = deleteProduct;
window.disableProduct = disableProduct;
window.hardDeleteProduct = hardDeleteProduct;
window.disableCat = disableCat;
window.hardDeleteCat = hardDeleteCat;
window.enableCat = enableCat;
window.openCatForm = openCatForm;
window.saveCat = saveCat;
window.deleteCat = deleteCat;
window.saveAllContent = saveAllContent;
window.toggleBanner = toggleBanner;
window.saveBannerTexts = saveBannerTexts;
window.saveShipSettings = saveShipSettings;
window.savePolicies = savePolicies;
window.resetDemoOrders = resetDemoOrders;
window.clearOrders = clearOrders;
window.resetProducts = resetProducts;
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
window.renderPage = renderPage;
window.debounceOrders = debounceOrders;
window.setAdminLang = setAdminLang;
window.openPaymentForm = openPaymentForm;
window.savePaymentForm = savePaymentForm;
window.togglePayment = togglePayment;
window.deletePayment = deletePayment;
window.toggleInvoiceField = toggleInvoiceField;
window.saveInvoiceDesign = saveInvoiceDesign;
window.previewInvoiceDesign = previewInvoiceDesign;
window.printOrderInvoice = printOrderInvoice;
window.goToOrdersFiltered = goToOrdersFiltered;
window.softRenderOrders = softRenderOrders;
window.setOrderStatusFilter = setOrderStatusFilter;
window.setOrderTimeFilter = setOrderTimeFilter;

async function saveStoreContact() {
  const s = getSettings();
  s.storePhone = document.getElementById('set_phone')?.value || '';
  s.storeEmail = document.getElementById('set_email')?.value || '';
  s.storeAddress = document.getElementById('set_addr')?.value || '';
  s.whatsapp = document.getElementById('set_wa')?.value || '';
  s.instagram = document.getElementById('set_ig')?.value || '';
  s.facebook = document.getElementById('set_fb')?.value || '';
  saveSettings(s);
  try {
    const sb = SiBelleSB.getSupabase();
    const { error } = await sb.from('store_settings').update({
      store_phone: s.storePhone,
      store_email: s.storeEmail,
      store_address: s.storeAddress,
      whatsapp: s.whatsapp,
      instagram: s.instagram,
      facebook: s.facebook
    }).eq('id', true);
    if (error) throw error;
    toast(t('saved'));
  } catch (e) {
    console.error(e);
    toast((e && e.message) || 'Saved locally only');
  }
}
window.saveStoreContact = saveStoreContact;

window.toggleAdminTheme = toggleAdminTheme;
window.renderAnalytics = renderAnalytics;
window.renderMap = renderMap;
window.renderStaff = renderStaff;
window.openStaffForm = openStaffForm;
window.saveStaffMember = saveStaffMember;
window.deleteStaff = deleteStaff;
window.printOrderInvoice = printOrderInvoice;
window.showMapTip = showMapTip;
window.hideMapTip = hideMapTip;
window.initLeafletMap = initLeafletMap;

