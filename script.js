
/* =========================================================
   GOTOPUP.ID — SCRIPT UTAMA
   Katalog dan harga akan dimasukkan setelah dikirim user.
   ========================================================= */


/* =========================================================
   1. KODE DISKON — DITARUH PALING ATAS
   Isi "value" setelah nominal diskon ditentukan.
   type: "fixed" = potongan rupiah
         "percent" = potongan persen
   ========================================================= */

const DISCOUNT_CODES = {
  "ADMIN TAMPAN1": {
    type: "fixed",
    value: null,
    active: true
  },

  "WARDISKONJADI5PERAK": {
    type: "fixed",
    value: null,
    active: true
  }
};


/* =========================================================
   2. KONFIGURASI WEBSITE
   ========================================================= */

const CONFIG = {
  storeName: "GOTOPUP.ID",

  // WhatsApp konfirmasi pembayaran
  paymentWhatsApp: "628818238236",

  // WhatsApp customer service
  customerService: "6283135901231",

  // Nama file QRIS
  qrisImage: "qris.png",

  // Durasi banner
  bannerInterval: 3000,

  // Katalog sengaja dikosongkan dahulu.
  // Nanti produk dan harga dimasukkan berdasarkan daftar asli.
  catalog: []
};


/* =========================================================
   3. DATA SEMENTARA DAN STATUS
   ========================================================= */

const state = {
  currentPage: "homePage",
  selectedCategory: "",
  selectedSubcategory: "",
  selectedProduct: null,
  selectedNominal: null,
  appliedDiscount: null,
  accountData: {},
  currentOrder: null,
  bannerIndex: 0
};

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const rupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(number) || 0);

const getElement = (...ids) => {
  for (const id of ids) {
    const element = document.getElementById(id);
    if (element) return element;
  }
  return null;
};


/* =========================================================
   4. NAVIGASI HALAMAN
   ========================================================= */

const PAGE_IDS = [
  "homePage",
  "gamePage",
  "gameDetailPage",
  "checkoutPage",
  "ordersPage",
  "accountPage",
  "isiDataPage",
  "prosesPage",
  "paymentPage",
  "accountDetailPage"
];

function showPage(pageId) {
  const target = document.getElementById(pageId);

  if (!target) {
    console.warn("Halaman tidak ditemukan:", pageId);
    return;
  }

  PAGE_IDS.forEach(id => {
    const page = document.getElementById(id);
    if (page) page.classList.remove("active");
  });

  // Mendukung halaman yang memakai class page
  $$(".page").forEach(page => {
    page.classList.remove("active");
  });

  target.classList.add("active");
  state.currentPage = pageId;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  updateNavigation(pageId);
}

function updateNavigation(pageId) {
  $$("[data-page]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );
  });
}


/* =========================================================
   5. KATEGORI DAN SUBKATEGORI
   Kategori utama hanya GAME, GAME PC, ENTERTAINMENT.
   ========================================================= */

const CATEGORIES = [
  {
    id: "game",
    name: "GAME"
  },
  {
    id: "game-pc",
    name: "GAME PC"
  },
  {
    id: "entertainment",
    name: "ENTERTAINMENT"
  }
];

function selectCategory(categoryId) {
  const validCategory = CATEGORIES.some(
    category => category.id === categoryId
  );

  if (!validCategory) return;

  state.selectedCategory = categoryId;
  state.selectedSubcategory = "";
  state.selectedProduct = null;

  renderSubcategories();
  renderProducts();

  showPage("gamePage");
}

function getCategoryProducts() {
  return CONFIG.catalog.filter(product =>
    product.category === state.selectedCategory
  );
}

function renderSubcategories() {
  const container = getElement("subcategoryList");
  if (!container) return;

  const products = getCategoryProducts();

  const subcategories = [
    ...new Set(
      products.map(product => product.subcategory).filter(Boolean)
    )
  ];

  if (!subcategories.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Daftar subkategori akan ditambahkan setelah katalog dikirim.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = subcategories.map(name => `
    <button
      class="subcategory-item"
      data-subcategory="${escapeHTML(name)}"
      type="button"
    >
      ${escapeHTML(name)}
    </button>
  `).join("");
}

function selectSubcategory(name) {
  state.selectedSubcategory = name;
  renderProducts();
}

function renderProducts() {
  const container = getElement("productGrid");
  if (!container) return;

  let products = getCategoryProducts();

  if (state.selectedSubcategory) {
    products = products.filter(product =>
      product.subcategory === state.selectedSubcategory
    );
  }

  if (!products.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Katalog produk belum dimasukkan.</p>
        <small>Produk dan harga akan ditambahkan satu per satu.</small>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => `
    <button
      class="product-card"
      type="button"
      data-product-id="${escapeHTML(product.id)}"
    >
      <img
        src="${escapeHTML(product.image || "")}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
      >
      <span>${escapeHTML(product.name)}</span>
    </button>
  `).join("");
}


/* =========================================================
   6. DETAIL PRODUK DAN PILIH NOMINAL
   ========================================================= */

function openProduct(productId) {
  const product = CONFIG.catalog.find(
    item => String(item.id) === String(productId)
  );

  if (!product) return;

  state.selectedProduct = product;
  state.selectedNominal = null;
  state.appliedDiscount = null;
  state.accountData = {};

  const title = getElement("detailProductName", "productDetailName");
  if (title) title.textContent = product.name;

  const image = getElement("detailProductImage", "productDetailImage");
  if (image) image.src = product.image || "";

  renderAccountFields(product);
  renderNominals(product);
  updateOrderSummary();

  showPage("gameDetailPage");
}

function renderAccountFields(product) {
  const container = getElement("gameAccountFields");
  if (!container) return;

  const fields = product.fields || [];

  if (!fields.length) {
    container.innerHTML = `
      <p class="field-note">
        Data akun untuk produk ini belum dikonfigurasi.
      </p>
    `;
    return;
  }

  container.innerHTML = fields.map((field, index) => `
    <div class="form-group">
      <label for="accountField${index}">
        ${escapeHTML(field.label)}
      </label>

      <input
        id="accountField${index}"
        type="${field.type || "text"}"
        placeholder="${escapeHTML(field.placeholder || "")}"
        data-account-field="${escapeHTML(field.name)}"
        ${field.required === false ? "" : "required"}
      >
    </div>
  `).join("");
}

function renderNominals(product) {
  const container = getElement("nominalList", "nominalOptions");
  if (!container) return;

  const nominals = product.nominals || [];

  if (!nominals.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Nominal dan harga belum dimasukkan.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = nominals.map((nominal, index) => `
    <button
      type="button"
      class="nominal-card"
      data-nominal-index="${index}"
    >
      <span>${escapeHTML(nominal.name)}</span>
      <strong>${rupiah(nominal.price)}</strong>
    </button>
  `).join("");
}

function selectNominal(index) {
  const product = state.selectedProduct;
  if (!product) return;

  const nominal = product.nominals?.[index];
  if (!nominal) return;

  state.selectedNominal = nominal;
  state.appliedDiscount = null;

  $$(".nominal-card").forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === index);
  });

  updateOrderSummary();
}


/* =========================================================
   7. KODE DISKON
   ========================================================= */

function applyDiscount() {
  const input = getElement("discountCodeInput");
  const message = getElement("discountMessage", "discountCodeMessage");

  if (!input) return;

  const code = input.value.trim().toUpperCase();
  const discount = DISCOUNT_CODES[code];

  if (!code) {
    showDiscountMessage("Masukkan kode diskon terlebih dahulu.", false);
    return;
  }

  if (!discount || !discount.active) {
    state.appliedDiscount = null;
    showDiscountMessage("Kode diskon tidak valid atau tidak aktif.", false);
    updateOrderSummary();
    return;
  }

  if (discount.value === null || discount.value <= 0) {
    state.appliedDiscount = null;
    showDiscountMessage(
      "Kode dikenali, tetapi nominal diskonnya belum diatur.",
      false
    );
    updateOrderSummary();
    return;
  }

  if (!state.selectedNominal) {
    showDiscountMessage("Pilih nominal produk terlebih dahulu.", false);
    return;
  }

  state.appliedDiscount = {
    code,
    type: discount.type,
    value: discount.value
  };

  showDiscountMessage("Kode diskon berhasil digunakan.", true);
  updateOrderSummary();
}

function showDiscountMessage(message, success) {
  const element = getElement(
    "discountMessage",
    "discountCodeMessage"
  );

  if (!element) return;

  element.textContent = message;
  element.classList.toggle("success", success);
  element.classList.toggle("error", !success);
}

function calculateDiscount(price) {
  if (!state.appliedDiscount) return 0;

  const discount = state.appliedDiscount;

  let amount = discount.type === "percent"
    ? price * discount.value / 100
    : discount.value;

  return Math.min(Math.floor(amount), price);
}


/* =========================================================
   8. RINGKASAN PESANAN
   ========================================================= */

function updateOrderSummary() {
  const product = state.selectedProduct;
  const nominal = state.selectedNominal;

  const price = Number(nominal?.price || 0);
  const discount = calculateDiscount(price);
  const total = Math.max(0, price - discount);

  const productName = getElement("summaryProduct");
  const priceElement = getElement("summaryPrice");
  const discountElement = getElement("summaryDiscount");
  const totalElement = getElement("summaryTotal");

  if (productName) {
    productName.textContent = product && nominal
      ? `${product.name} - ${nominal.name}`
      : "-";
  }

  if (priceElement) priceElement.textContent = rupiah(price);
  if (discountElement) discountElement.textContent = rupiah(discount);
  if (totalElement) totalElement.textContent = rupiah(total);

  return { price, discount, total };
}


/* =========================================================
   9. VALIDASI DATA PEMBELI
   ========================================================= */

function collectAccountData() {
  const fields = $$("[data-account-field]");
  const data = {};

  for (const field of fields) {
    const key = field.dataset.accountField;
    const value = field.value.trim();

    if (field.required && !value) {
      field.focus();
      alert("Mohon lengkapi data akun terlebih dahulu.");
      return null;
    }

    data[key] = value;
  }

  state.accountData = data;
  return data;
}


/* =========================================================
   10. BUAT PESANAN
   ========================================================= */

function createOrder() {
  if (!state.selectedProduct) {
    alert("Pilih produk terlebih dahulu.");
    return;
  }

  if (!state.selectedNominal) {
    alert("Pilih nominal terlebih dahulu.");
    return;
  }

  const accountData = collectAccountData();
  if (accountData === null) return;

  const totals = updateOrderSummary();

  const order = {
    id: "GTP-" + Date.now(),
    product: state.selectedProduct.name,
    nominal: state.selectedNominal.name,
    price: totals.price,
    discount: totals.discount,
    total: totals.total,
    discountCode: state.appliedDiscount?.code || null,
    accountData,
    status: "MENUNGGU",
    createdAt: new Date().toISOString()
  };

  state.currentOrder = order;

  saveOrder(order);
  renderPaymentPage(order);
  showPage("paymentPage");
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);

  localStorage.setItem(
    "gotopup_orders",
    JSON.stringify(orders)
  );
}

function getOrders() {
  try {
    return JSON.parse(
      localStorage.getItem("gotopup_orders") || "[]"
    );
  } catch {
    return [];
  }
}


/* =========================================================
   11. HALAMAN PEMBAYARAN
   ========================================================= */

function renderPaymentPage(order) {
  const total = getElement("paymentTotal", "checkoutTotal");
  const orderId = getElement("paymentOrderId");
  const qris = getElement("qrisImage");

  if (total) total.textContent = rupiah(order.total);
  if (orderId) orderId.textContent = order.id;

  if (qris) qris.src = CONFIG.qrisImage;
}

function confirmPayment() {
  const order = state.currentOrder;

  if (!order) {
    alert("Pesanan tidak ditemukan.");
    return;
  }

  const message = [
    "HALO GOTOPUP.ID",
    "",
    "Saya ingin konfirmasi pembayaran.",
    "",
    `ID Pesanan: ${order.id}`,
    `Produk: ${order.product}`,
    `Nominal: ${order.nominal}`,
    `Total: ${rupiah(order.total)}`,
    `Status: ${order.status}`,
    "",
    "Saya akan mengirimkan bukti pembayaran."
  ].join("\n");

  const url =
    `https://wa.me/${CONFIG.paymentWhatsApp}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}


/* =========================================================
   12. RIWAYAT PESANAN
   ========================================================= */

function renderOrders() {
  const container = getElement("orderHistory", "ordersList");
  if (!container) return;

  const orders = getOrders();

  if (!orders.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Belum ada riwayat pesanan.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => `
    <div class="order-card">
      <strong>${escapeHTML(order.id)}</strong>
      <p>${escapeHTML(order.product)} - ${escapeHTML(order.nominal)}</p>
      <p>${rupiah(order.total)}</p>
      <span class="order-status">
        ${escapeHTML(order.status)}
      </span>
    </div>
  `).join("");
}


/* =========================================================
   13. ADMIN — DASAR PENGELOLAAN PESANAN
   Catatan: autentikasi admin wajib dihubungkan ke Supabase.
   ========================================================= */

function updateOrderStatus(orderId, newStatus) {
  const allowedStatuses = [
    "MENUNGGU",
    "DIPROSES",
    "BERHASIL",
    "GAGAL"
  ];

  if (!allowedStatuses.includes(newStatus)) return;

  const orders = getOrders();
  const index = orders.findIndex(order => order.id === orderId);

  if (index === -1) return;

  orders[index].status = newStatus;

  localStorage.setItem(
    "gotopup_orders",
    JSON.stringify(orders)
  );

  renderOrders();
  renderAdminOrders();
}

function renderAdminOrders() {
  const container = getElement("adminTransactionList");
  if (!container) return;

  const orders = getOrders();

  if (!orders.length) {
    container.innerHTML = "<p>Belum ada transaksi.</p>";
    return;
  }

  container.innerHTML = orders.map(order => `
    <div class="admin-order-card">
      <strong>${escapeHTML(order.id)}</strong>
      <p>${escapeHTML(order.product)} - ${escapeHTML(order.nominal)}</p>
      <p>${rupiah(order.total)}</p>
      <p>Status: ${escapeHTML(order.status)}</p>

      <button
        type="button"
        data-order-status="${escapeHTML(order.id)}"
        data-status="DIPROSES"
      >PROSES</button>

      <button
        type="button"
        data-order-status="${escapeHTML(order.id)}"
        data-status="BERHASIL"
      >DONE</button>

      <button
        type="button"
        data-order-status="${escapeHTML(order.id)}"
        data-status="GAGAL"
      >GAGAL</button>
    </div>
  `).join("");
}


/* =========================================================
   14. BANNER OTOMATIS
   ========================================================= */

function initBannerSlider() {
  const track = getElement("bannerTrack");
  if (!track) return;

  const banners = $$(".banner-slide", track);
  if (banners.length <= 1) return;

  setInterval(() => {
    state.bannerIndex =
      (state.bannerIndex + 1) % banners.length;

    track.style.transform =
      `translateX(-${state.bannerIndex * 100}%)`;

    $$(".banner-dot").forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === state.bannerIndex
      );
    });
  }, CONFIG.bannerInterval);
}


/* =========================================================
   15. PENCARIAN PRODUK
   ========================================================= */

function searchProducts(keyword) {
  const container = getElement("productGrid");
  if (!container) return;

  const query = keyword.trim().toLowerCase();

  const results = CONFIG.catalog.filter(product =>
    product.name.toLowerCase().includes(query)
  );

  if (!query) {
    renderProducts();
    return;
  }

  if (!results.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Produk tidak ditemukan.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(product => `
    <button
      class="product-card"
      type="button"
      data-product-id="${escapeHTML(product.id)}"
    >
      <img src="${escapeHTML(product.image || "")}" alt="">
      <span>${escapeHTML(product.name)}</span>
    </button>
  `).join("");
}


/* =========================================================
   16. WHATSAPP CUSTOMER SERVICE
   ========================================================= */

function openCustomerService() {
  window.open(
    `https://wa.me/${CONFIG.customerService}`,
    "_blank"
  );
}


/* =========================================================
   17. TOAST / NOTIFIKASI
   ========================================================= */

function showToast(message) {
  const container = getElement("toastContainer");

  if (!container) {
    alert(message);
    return;
  }

  container.textContent = message;
  container.classList.add("show");

  setTimeout(() => {
    container.classList.remove("show");
  }, 2500);
}


/* =========================================================
   18. KEAMANAN TEKS HTML
   ========================================================= */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}


/* =========================================================
   19. EVENT LISTENER
   ========================================================= */

document.addEventListener("click", event => {
  const target = event.target;

  // Navigasi
  const pageButton = target.closest("[data-page]");
  if (pageButton) {
    showPage(pageButton.dataset.page);
    return;
  }

  // Kategori
  const categoryButton = target.closest("[data-category]");
  if (categoryButton) {
    selectCategory(categoryButton.dataset.category);
    return;
  }

  // Subkategori
  const subcategoryButton = target.closest("[data-subcategory]");
  if (subcategoryButton) {
    selectSubcategory(subcategoryButton.dataset.subcategory);

    // TEMPEL DI BAGIAN BAWAH CONFIG.catalog YANG SUDAH ADA
// Jangan hapus katalog sebelumnya.
// Pastikan koma setelah produk sebelumnya.

makeProduct("free-fire", "FREE FIRE", "game", "freefire.jpg", {
  "DIAMONDS": `
5 Diamonds|984
10 Diamonds|1862
12 Diamonds|1970
20 Diamonds|3618
25 Diamonds|4997
30 Diamonds|5661
50 Diamonds|7650
55 Diamonds|8360
70 Diamonds|9250
80 Diamonds|12254
100 Diamonds|14480
120 Diamonds|18132
130 Diamonds|19291
140 Diamonds|18850
145 Diamonds|21067
150 Diamonds|22049
190 Diamonds|27926
200 Diamonds|29885
210 Diamonds|30326
280 Diamonds|39679
355 Diamonds|47350
420 Diamonds|58866
425 Diamonds|59771
475 Diamonds|67607
495 Diamonds|69565
500 Diamonds|70543
510 Diamonds|72503
545 Diamonds|77401
565 Diamonds|79360
600 Diamonds|86218
635 Diamonds|89154
720 Diamonds|96000
800 Diamonds|113106
860 Diamonds|122540
930 Diamonds|132335
1000 Diamonds|142129
1050 Diamonds|146950
1075 Diamonds|156000
1080 Diamonds|152909
1440 Diamonds|204000
1450 Diamonds|205000
2160 Diamonds|303000
2180 Diamonds|305000
7290 Diamonds|986460
36500 Diamonds|5005000
73100 Diamonds|10010000
`,
  "MEMBERSHIP & LEVEL UP PASS": `
Member Mingguan|28200
Member Bulanan|91715
BP Card|46108
Level Up Pass Level 6|5598
Level Up Pass Level 10|9262
Level Up Pass Level 15|9262
Level Up Pass Level 20|9262
Level Up Pass Level 25|9262
Level Up Pass Level 30|15159
`
}),

makeProduct("free-fire-max", "FREE FIRE MAX", "game", "freefire.jpg", {
  "DIAMONS": `
5 Diamonds|984
10 Diamonds|1862
12 Diamonds|1970
20 Diamonds|3618
25 Diamonds|4997
30 Diamonds|5661
50 Diamonds|7650
55 Diamonds|7960
70 Diamonds|9250
80 Diamonds|12254
100 Diamonds|14480
120 Diamonds|18132
130 Diamonds|19291
140 Diamonds|18850
145 Diamonds|21067
150 Diamonds|22049
190 Diamonds|27926
200 Diamonds|29885
210 Diamonds|30326
280 Diamonds|39679
355 Diamonds|47350
420 Diamonds|58866
425 Diamonds|59771
475 Diamonds|67607
495 Diamonds|69565
500 Diamonds|70543
510 Diamonds|72503
545 Diamonds|77401
565 Diamonds|79360
600 Diamonds|86218
635 Diamonds|89154
720 Diamonds|96000
800 Diamonds|109106
860 Diamonds|118540
930 Diamonds|128335
1000 Diamonds|129800
1050 Diamonds|146950
1075 Diamonds|156000
1080 Diamonds|152909
1440 Diamonds|204000
1450 Diamonds|205000
2160 Diamonds|303000
2180 Diamonds|305000
7290 Diamonds|925000
36500 Diamonds|5005000
73100 Diamonds|10010000
`,
  "MEMBERSHIP & LEVEL UP PASS": `
Member Mingguan|28200
Member Bulanan|91715
BP Card|46108
Level Up Pass Level 6|5598
Level Up Pass Level 10|9262
Level Up Pass Level 15|9262
Level Up Pass Level 20|9262
Level Up Pass Level 25|9262
Level Up Pass Level 30|15159
`
}),

makeProduct("mobile-legends", "MOBILE LEGENDS", "game", "mobilelegends.jpg", {
  "DIAMONS": `
5 Diamonds|1675
10 Diamonds|3479
12 Diamonds|3859
19 Diamonds|6241
28 Diamonds|9209
44 Diamonds|13953
54 Diamonds|16595
59 Diamonds|17674
71 Diamonds|22465
74 Diamonds|23450
85 Diamonds|26418
88 Diamonds|27406
110 Diamonds|33235
113 Diamonds|35344
128 Diamonds|42685
148 Diamonds|48816
170 Diamonds|52563
176 Diamonds|58684
184 Diamonds|62276
222 Diamonds|74898
240 Diamonds|74016
258 Diamonds|86804
277 Diamonds|86357
284 Diamonds|87399
296 Diamonds|90832
301 Diamonds|95186
305 Diamonds|101230
333 Diamonds|104480
346 Diamonds|108827
356 Diamonds|112387
370 Diamonds|113783
384 Diamonds|117598
408 Diamonds|124398
424 Diamonds|128917
452 Diamonds|147732
518 Diamonds|170076
845 Diamonds|273549
875 Diamonds|280042
938 Diamonds|300598
966 Diamonds|314324
1045 Diamonds|316339
1136 Diamonds|367682
1159 Diamonds|376696
1443 Diamonds|465383
1506 Diamonds|485939
1704 Diamonds|549023
2010 Diamonds|574729
2232 Diamonds|694051
2380 Diamonds|737049
2578 Diamonds|801494
2625 Diamonds|816651
3453 Diamonds|1080536
3738 Diamonds|1172116
4020 Diamonds|1235306
4588 Diamonds|1228269
4830 Diamonds|1332469
5398 Diamonds|1629501
6030 Diamonds|1850469
6840 Diamonds|2068318
8040 Diamonds|2470672
9660 Diamonds|2896320
10050 Diamonds|2678670
14490 Diamonds|4339480
16080 Diamonds|4931224
18090 Diamonds|5666317
19320 Diamonds|5782040
20100 Diamonds|6161530
21330 Diamonds|6397793
23340 Diamonds|7012948
24150 Diamonds|7225380
26160 Diamonds|7840953
28170 Diamonds|8456106
`,
  "WEEKLY DIAMOND PASS & BUNDLE": `
Weekly Diamond Pass|30490
Weekly Diamond Pass x2|62990
Weekly Diamond Pass x3|93990
Weekly Elite Bundle|17317
Monthly Epic Bundle|84884
`,
  "2X FRIST RECHARGE": `
100 Diamonds (50+50)|17317
300 Diamonds (150+150)|50751
500 Diamonds (250+250)|84884
1000 Diamonds (500+500)|169759
`,
  "TOP UP GLOBAL": `
Weekly Diamond Pass|36551
Weekly Diamond Pass|40141
Twilight Pass|175318
Twilight Pass|203960
11 Diamonds|3520
22 Diamonds|6939
70 Diamonds|23616
223 Diamonds|69401
336 Diamonds|103600
570 Diamonds|176002
1163 Diamonds|347000
2398 Diamonds|694004
6042 Diamonds|1715008
140 Diamonds|46685
Weekly Elite Bundle|17317
Monthly Epic Bundle|84884
`,
  "STARLIGHT GIF 7H": `
STARLIGHT BIASA ( GIF 7HARI )|40000
STARLIGHT PREMIUM ( GIF 7 HARI )|96000
`
}),

makeProduct("roblox", "ROBLOX", "game", "", {
  "ROBUX": `
50 Robux|6500
100 Robux|12600
200 Robux|25200
300 Robux|37500
400 Robux|49800
500 Robux|62500
600 Robux|74800
700 Robux|87200
800 Robux|99800
900 Robux|112300
1000 Robux|124500
1500 Robux|187000
2000 Robux|250000
2500 Robux|311000
3000 Robux|373000
4000 Robux|497000
5000 Robux|625000
`
}),

makeProduct("magic-chess-gogo", "MAGIC CHESS GOGO", "game", "", {
  "DIAMONDS & WEEKLY CARD": `
5 Diamond|1780
Weekly Card|31700
12 Diamonds (11 + 1 Bonus)|4303
19 Diamonds (17 + 2 Bonus)|6540
28 Diamonds (25 + 3 Bonus)|9524
44 Diamonds (40 + 4 Bonus)|15218
59 Diamonds (53 + 6 Bonus)|20000
85 Diamonds (77 + 8 Bonus)|29000
170 Diamonds (154 + 16 Bonus)|57836
240 Diamonds (217 + 23 Bonus)|81232
296 Diamonds (256 + 40 Bonus)|95878
408 Diamonds (367 + 41 Bonus)|137276
568 Diamonds (503 + 65 Bonus)|187999
875 Diamonds (774 + 101 Bonus)|288971
2.010 Diamonds (1.708 + 302 Bonus)|637916
4.830 Diamonds (4.003 + 827 Bonus)|1520959
`,
  "2X RECHARGE BONUS": `
100 Diamonds (50 + 50 Bonus)|18986
300 Diamonds (150 + 150 Bonus) (1x/User)|55841
500 Diamonds (250 + 250 Bonus) (1x/User)|92932
1.000 Diamonds (500 + 500 Bonus) (1x/User)|186358
`,
  "LATEST BOUNTY": `
Lukas's Battle Bounty|18786
Battle for Discounts|18786
`
}),

makeProduct("pubg-mobile", "PUBG MOBILE", "game", "pubg.jpg", {
  "UC": `
60 UC|16793
120 UC|33587
600 UC + 60 Bonus|170750
3.000 UC + 850 Bonus|849915
6.000 UC + 2.100 Bonus|1698820
12.000 UC + 4.200 Bonus|3396740
18.000 UC + 6.300 Bonus|5094960
24.000 UC + 8.400 Bonus|6793180
36.000 UC + 12.600 Bonus|10189920
48.000 UC + 16.800 Bonus|13585960
`
}),

makeProduct("valorant", "VALORANT", "game", "", {
  "VP": `
475 VP|53219
1.000 VP|105939
1.475 VP|158659
2.050 VP|211378
2.525 VP|264097
3.050 VP|316817
3.650 VP|366713
4.125 VP|419432
4.650 VP|472151
5.350 VP|526753
5.700 VP|577590
5.825 VP|579473
6.350 VP|632192
7.300 VP|732924
7.400 VP|737632
9.000 VP|892966
11.000 VP|1035120
11.475 VP|1087839
12.000 VP|1140559
13.050 VP|1245998
14.650 VP|1401333
15.100 VP|1456876
16.350 VP|1561373
16.700 VP|1612210
18.300 VP|1767544
20.000 VP|1927586
22.000 VP|2069740
`
}),

makeProduct("ea-esport-fc-mobile", "EA ESPORT FC MOBILE", "game", "", {
  "FC COIN": `
40 FC Points|6900
100 FC Points|16200
520 FC Points|78000
1.070 FC Points|156475
2.200 FC Points|323250
5.750 FC Points|784325
12.000 FC Points|1569100
`,
  "SILVER": `
39 Silver|6900
99 Silver|16200
499 Silver|78000
999 Silver|156475
1.999 Silver|323250
4.999 Silver|784325
9.999 Silver|1569100
`
}),

makeProduct("vidio", "VIDIO", "entertainment", "", {
  "ULTIMATE": `
Ultimate All Screen 1 Tahun|1379500
Ultimate Mobile 30 Hari|105500
Ultimate Mobile 1 Tahun|765500
Ultimate All Screen 30 Hari|200500
Ultimate Mobile 3 Bulan|263658
`,
  "PLATINUM": `
Platinum 30 Hari|54500
Platinum Extra 30 Hari|76500
Platinum 3 Bulan|118500
Platinum Extra 3 Bulan|187500
Platinum 1 Tahun|398500
Platinum Extra 1 Tahun|553500
`
}),

makeProduct("honor-of-kings", "HONOR OF KINGS", "game", "", {
  "TOKENS": `
16 Tokens|3700
80 Tokens|16500
240 Tokens|47500
400 Tokens|80500
560 Tokens|109500
2.400 + 108 Bonus Tokens|480500
4.000 + 180 Bonus Tokens|800500
8.000 + 360 Bonus Tokens|1599500
`
}),

makeProduct("blood-strike", "BLOOD STRIKE", "game", "bloodstrike.jpg", {
  "GOLD": `
300+20 GOLD|42500
500+40 GOLD|70500
1000+100 GOLD|140500
2000+260 GOLD|280500
5000+800 GOLD|710000
`
}),

makeProduct("football-master-2", "FOOTBALL MASTER 2", "game", "", {
  "FMP": `
18 FMP|4772
95 FMP|21716
191 FMP|43226
382 FMP|85951
972 FMP|214128
1.944 FMP|427756
3.888 FMP|855012
9.900 FMP|2136780
`
}),

makeProduct("football-dreams-be-a-pro", "Football DREAMS Be A pro", "game", "", {
  "Suprame tokens": `
60 Supreme Tokens|14637
180 Supreme Tokens|42793
300 Supreme Tokens|71127
680 Supreme Tokens|142212
940 Supreme Tokens|212499
1.280 Supreme Tokens|283868
1.980 Supreme Tokens|425349
3.120 Supreme Tokens|707360
6.480 Supreme Tokens|1417616
`,
  "Indonesian Garuda": `
Indonesian Garuda|23996
`
}),

makeProduct("ragnarok-m-classic", "RAGNAROK M CLASSIC", "game", "ragnarokmclasic.jpg", {
  "Zeny": `
1.8 Million Zeny|48747
3 Million + 60 Thousand Zeny|80912
6.8 Million + 272 Thousand Zeny|158485
12.8 Million + 768 Thousand Zeny|280522
32.8 Million + 2.7 Million Zeny|715692
64.8 Million + 7.2 Million Zeny|1383142
144 Million + 16 Million Zeny|3109124
`,
  "Supply & adventure Log": `
Abundant Double Zeny Supply|492431
Petty Double Zeny Supply Box|165108
Upgrade Adventure Log|113076
Collection Adventure Log|374178
`
}),

makeProduct("zepeto", "ZEPETO", "entertainment", "", {
  "Zems": `
14 Zems|15000
28 Zems|31300
58 Zems|62300
128 Zems|132000
323 Zems|333100
1.000 Zems|1000500
`,
  "Coins": `
4.680 Coins|16300
9.700 Coins|31300
25.200 Coins|77700
40.700 Coins|124200
110.000 Coins|325300
300.000 Coins|864100
`,
  "Premium": `
Premium (1M)|64300
`
}),
  // ==========================================================
// KATALOG GOTOPUP.ID — LANJUTAN PRODUK 16–30
// Tempel di dalam CONFIG.catalog, setelah produk ZEPETO.
// ==========================================================

makeProduct("king-of-avalon", "KING OF AVALON", "game", "", {
  "Diamonds": `
500 Diamonds|75975
1.000 Diamonds|154075
2.000 Diamonds|302443
5.000 Diamonds|768330
10.000 Diamonds|1520086
50.000 Diamonds|7663318
100.000 Diamonds|15196272
`
}),

makeProduct("undawn", "Undawn", "game", "", {
  "Kartu & pass": `
Kartu Mingguan|28400
Kartu Bulanan|46800
Dana Elit (REBATE LV 80)|123400
Glory Pass Premium|139650
`,
  "RC": `
RC x 80|14900
RC x 250|43700
RC x 450|72500
RC x 920|143540
RC x 1.850|287540
RC x 2.800|431540
RC x 4.750|719540
RC x 9.600|1439540
RC x 33.000|4800500
RC x 66.500|9600500
`
}),

makeProduct("metal-slug-awakening", "METAL SLUG AWAKENING", "game", "metalslugawakening.jpg", {
  "RUBY": `
60 Ruby|14000
120 Ruby|27500
180 Ruby|41000
310 Ruby|61800
630 Ruby|123000
1.300 Ruby|245500
3.230 Ruby|613000
6.500 Ruby|1225500
6.500 Ruby x2|2450500
6.500 Ruby x3|3660500
6.500 Ruby x5|6100500
6.500 Ruby x10|12200500
6.500 Ruby x15|17872250
6.500 Ruby x20|23829500
6.500 Ruby x30|35744000
6.500 Ruby x40|47658500
6.500 Ruby x50|59573000
6.500 Ruby x100|119145500
`,
  "KARTU": `
Kartu Bulanan|61800
Kartu Bulanan Premium|123000
`
}),

makeProduct("captain-tsubasa-ace", "Captain stubase ace", "game", "captaintsubasaace.jpg", {
  "Golden ball pack": `
6 Golden Ball Pack|1978
60 + 3 Golden Ball Pack|15284
300 + 15 Golden Ball Pack|73496
680 + 35 Golden Ball Pack|147416
980 + 50 Golden Ball Pack|230576
1.280 + 65 Golden Ball Pack|304496
1.980 + 198 Golden Ball Pack|443096
3.280 + 328 Golden Ball Pack|738776
6.480 + 648 Golden Ball Pack|1477976
`
}),

makeProduct("be-the-king", "BE THE KING: JUDGE DESTINY", "game", "bethekingjudgedestiny.jpg", {
  "Gold": `
60 Gold|13743
300 Gold|67796
680 Gold|135362
2.040 Gold|403194
3.400 Gold|673459
6.800 Gold|1349121
`,
  "Ult tokens": `
60 Ult Tokens|13743
300 Ult Tokens|67796
680 Ult Tokens|135362
2.040 Ult Tokens|403194
3.400 Ult Tokens|673459
6.800 Ult Tokens|1349121
20.400 Ult Tokens|4027443
`
}),

makeProduct("top-eleven", "Top eleven", "game", "", {
  "Gems": `
220 Gems|751000
`
}),

makeProduct("delta-force", "Delta force", "game", "", {
  "Delta Coins": `
18 + 1 Delta Coins|5900
30 + 2 Delta Coins|8600
60 + 3 Delta Coins|16400
300 + 36 Delta Coins|79701
420 + 62 Delta Coins|109401
680 + 105 Delta Coins|153202
1.280 + 264 Delta Coins|305603
1.680 + 385 Delta Coins|381804
3.280 + 834 Delta Coins|762808
6.480 + 1.944 Delta Coins|1525115
12.960 + 3.888 Delta Coins|3049730
19.440 + 5.832 Delta Coins|4574346
`
}),

makeProduct("cloud-song", "Cloud Song Saga of Skywalkers", "game", "cloudsongsagaofskywalkers.jpg", {
  "Tickets": `
0.99$ Tickets|11803
1.99$ Tickets|19336
2.99$ Tickets|34406
5.99$ Tickets|68312
11.99$ Tickets|136123
21.99$ Tickets|271748
29.99$ Tickets|339560
59.99$ Tickets|678619
99.99$ Tickets|1356738
`
}),

makeProduct("harry-potter-magic-awakened", "Harry Potter Magic awakened", "game", "", {
  "Jewels": `
60Jewels|16916
300 Jewels|81554
680 + 70 Jewels|163634
980 + 165 Jewels|255974
1.280 + 270 Jewels|338054
1.980 + 380 Jewels|491954
3.280 + 780 Jewels|820274
6.480 + 2.000 Jewels|1641074
`
}),

makeProduct("arena-of-valor", "Arena of VALOR", "game", "arenaofvalor.jpg", {
  "Vouchers": `
40 Vouchers|10500
90 Vouchers|20500
230 Vouchers|50500
470 Vouchers|100500
950 Vouchers|200500
1.430 Vouchers|300500
2.390 Vouchers|500500
`
}),

makeProduct("afk-journey", "Afk journey", "game", "afkjourney.jpg", {
  "Dragons Cristal": `
21 Dragon Crystals (20 + 1 Bonus)|16124
126 Dragon Crystals (120 + 6 Bonus)|77644
294 Dragon Crystals (280 + 14 Bonus)|155764
588 Dragon Crystals (560 + 28 Bonus)|321769
1.554 Dragon Crystals (1.480 + 74 Bonus)|780724
3.150 Dragon Crystals (3.000 + 150 Bonus)|1561924
`,
  "Esperia monthly": `
Esperia Monthly - Classic Gazette|77644
Esperia Monthly - Premium Gazette|243649
Growth Bundle|468244
`
}),

makeProduct("racing-master", "Racing master", "game", "racingmaster.jpg", {
  "Gems": `
70 + 4 Gems|16500
140 + 7 Gems|32500
210 + 11 Gems|48500
350 + 18 Gems|79500
700 + 35 Gems|159500
1.000 + 50 Gems|225500
1.400 + 70 Gems|315500
2.100 + 105 Gems|470500
3.400 + 170 Gems|760500
6.600 + 330 Gems|1469500
`
}),

makeProduct("onmyoji-arena", "Onmyoji arena", "game", "onmyojiarena.jpg", {
  "Jade": `
Jade 60|15500
Jade 200|71500
Jade 1280|284000
Jade 3280|707000
Jade 6480|1450000
`
}),

makeProduct("mu-origin-2", "Mu origin 2", "game", "muorigin2.jpg", {
  "Badges": `
5 Badges|5343
70 Badges|10187
109 Badges|15635
195 Badges|27743
325 Badges|45904
951 Badges|133687
1.621 Badges|227522
5.401 Badges|757241
17.283 Badges|2422071
`
}),

makeProduct("mob-rush", "Mob rush", "game", "mobrush.jpg", {
  "DIAMONS": `
100 Diamonds|16593
300 Diamonds|48778
500 Diamonds|80964
1.000 Diamonds|161428
2.000 Diamonds|322356
3.000 Diamonds|483284
5.000 Diamonds|805140
10.000 Diamonds|1609780
`,
  "Pack & benefits": `
Top Value Pack|5328
Super Value Hero Pack|16593
Diamond Benefits Weekly|19811
Diamond Benefits Monthly|39123
Account Growth Fund (Normal)|48778
Account Growth Fund (Advanced)|129242
BattlePass|80964
`
}),
  // ==========================================================
// KATALOG GOTOPUP.ID — LANJUTAN PRODUK 31–45
// Tempel setelah produk nomor 30 (Mob Rush).
// ==========================================================

makeProduct("mu-origin-3-sea", "Mu origin 3 sea", "game", "", {
  "Divine Diamonds": `
70 Divine Diamonds|15300
350 Divine Diamonds|73500
1.050 Divine Diamonds|230500
2.100 Divine Diamonds|443100
3.500 Divine Diamonds|738800
7.000 Divine Diamonds|1478000
10.500 Divine Diamonds|2309600
14.000 Divine Diamonds|3048800
21.000 Divine Diamonds|4619600
`
}),

makeProduct("identity-v", "Identity V", "game", "", {
  "Echoes": `
60 Echoes|14575
185 Echoes|43089
305 Echoes|71604
690 Echoes|142891
2.025 Echoes|428039
3.330 Echoes|713187
6.590 Echoes|1426056
`
}),

makeProduct("legacy-fate", "Legacy Fate Sacred and Fearless", "game", "", {
  "Token": `
70 Token|19385
130 Token|35123
330 Token|88631
750 Token|168669
990 Token|248707
1.410 Token|348529
2.180 Token|497813
3.610 Token|847641
7.130 Token|1695681
`
}),

makeProduct("rainbow-six-mobile", "Rainbow six mobile", "game", "", {
  "Platinum": `
50 Platinum|12000
110 Platinum|23000
300 Platinum|56500
650 Platinum|111500
1.350 Platinum|225500
3.500 Platinum|559500
7.250 Platinum|1119500
11.250 Platinum|1699500
`,
  "FRIST purchase only": `
250 Platinum (First Purchase Only)|12000
600 Platinum (First Purchase Only)|56500
2.700 Platinum (First Purchase Only)|225500
7.000 Platinum (First Purchase Only)|559500
`
}),

makeProduct("call-of-duty-mobile-id", "Call of duty mobile id", "game", "callofduty.jpg", {
  "CP": `
63 CP|10000
128 CP|20500
321 CP|50500
645 CP|100500
1.373 CP|200500
2.060 CP|300500
3.564 CP|500500
7.656 CP|1000500
`
}),

makeProduct("snowbreak-containment-zone", "Snowbreak Contaiment zone", "game", "", {
  "BitGold": `
6 BitGold|15223
30 BitGold|73196
98 BitGold|229630
198 BitGold|441276
328 BitGold|735740
648 BitGold|1471900
`
}),

makeProduct("honkai-impact-3", "Honkai Impact 3", "game", "", {
  "Monthly card": `
Monthly Card|77450
`,
  "B-chips": `
30 B-Chips|8195
65 B-Chips|16175
330 B-Chips|77450
990 B-Chips|242750
1.320 B-Chips|318750
1.980 B-Chips|465050
3.300 B-Chips|774750
6.600 B-Chips|1548050
`,
  "Cristal": `
65 Crystals|16175
330 Crystals|77450
660 Crystals|154400
1.320 Crystals|318750
3.300 Crystals|807350
6.600 Crystals|1613210
`
}),

makeProduct("path-to-nowhere", "PATH to nowhere", "game", "pathtonowhere.jpg", {
  "Ultracubes": `
60 Ultracubes|15730
300 + 30 Ultracubes|75697
980 + 150 Ultracubes|237513
1.980 + 400 Ultracubes|446922
3.280 + 700 Ultracubes|732480
6.480 + 1.600 Ultracubes|1379745
`,
  "Pack & spesial": `
Weekly Arrest Pack|15730
Chief Inauguration Special I|15730
Weekly Training Pack I|75697
Black Key VIP (30 Days)|75697
Chief Inauguration Special II|75697
Chief Inauguration Special III|151846
Weekly Training Pack II|237513
Dis Jackpot|237513
Monthly Arrest Pack I|237513
Rookie Arrest Pack|294625
Monthly Arrest Pack II|380292
Chief Inauguration Special IV|446922
Chief Inauguration Special V|732480
Chief Inauguration Special VI|1379745
`
}),

makeProduct("heaven-burns-red", "Heaven Burns red", "game", "", {
  "Paid Quartz": `
130 Paid Quartz|20368
410 Paid Quartz|58768
870 Paid Quartz|117202
1.370 Paid Quartz|183986
2.720 Paid Quartz|334246
4.750 Paid Quartz|567985
10.000 Paid Quartz|1169028
`
}),

makeProduct("arena-breakout", "Arena breakout", "game", "arenabreakout.jpg", {
  "Bonds": `
60 + 6 Bonds|16354
310 + 25 Bonds|76451
630 + 45 Bonds|149409
1.580 + 110 Bonds|370757
3.200 + 200 Bonds|748466
6.500 + 320 Bonds|1448869
`,
  "Paket & battle pas": `
Pilihan Pemula|19630
Battle Pass Lanjutan|66102
Battle Pass Premium|194505
`
}),

makeProduct("legend-of-runeterra", "Legend of Runeterra", "game", "", {
  "Coins": `
475 Coins|54885
1.000 Coins|109269
2.050 Coins|218038
3.650 Coins|378278
5.350 Coins|543374
11.000 Coins|1067796
`
}),

makeProduct("lifeafter", "LifeAfter", "game", "lifeafter.jpg", {
  "Credits": `
65 Credits|13550
330 Credits|64800
558 Credits|103450
1.108 Credits|192850
2.268 Credits|384700
3.468 Credits|602250
5.768 Credits|960350
7.768 Credits|1280150
`
}),

makeProduct("love-and-deepspace", "Love and deepspace", "game", "", {
  "Crystals & Pass": `
Aurum Pass (30 Days)|87457
60 Crystals|19064
300 Crystals + 30 Diamonds|87457
450 Crystals + 90 Diamonds|116768
980 Crystals + 150 Diamonds|243783
1.980 Crystals + 360 Diamonds|488043
6.480 Crystals + 1.600 Diamonds|1660491
Companionship Pack|292635
`
}),

makeProduct("watcher-of-realms", "Watcher of Realms", "game", "", {
  "W-Gold": `
499 W-Gold|91875
999 W-Gold|183640
1.999 W-Gold|366973
2.999 W-Gold|550354
4.999 W-Gold|917018
9.999 W-Gold|1831742
29.999 W-Gold|5482485
59.999 W-Gold|10982793
`
}),

makeProduct("honkai-star-rail", "Honkai : star Rail", "game", "", {
  "Oneiric Shard & Pass": `
Express Supply Pass|75550
60 Oneiric Shard|15700
300 + 30 Oneiric Shard|75550
980 + 110 Oneiric Shard|237050
1.980 + 260 Oneiric Shard|455550
3.280 + 600 Oneiric Shard|759550
6.480 + 1.600 Oneiric Shard|1519550
`
}),
  // ==========================================================
// KATALOG GOTOPUP.ID — LANJUTAN PRODUK 46–60
// Tempel setelah produk nomor 45 (Honkai : star Rail).
// ==========================================================

makeProduct("zenless-zone-zero", "Zenless zone zero", "game", "", {
  "Monochrome & Membership": `
60 Monochrome|15700
300 + 30 Monochrome|75550
980 + 110 Monochrome|237050
1.980 + 260 Monochrome|455550
3.280 + 600 Monochrome|759550
6.480 + 1.600 Monochrome|1519550
Inter-Knot Membership|75550
`
}),

makeProduct("speed-drifters", "Speed Drifters", "game", "", {
  "Diamonds": `
56 Diamonds|10235
112 Diamonds|19970
282 Diamonds|49173
579 Diamonds|97846
1.230 Diamonds|195191
1.845 Diamonds|292537
3.134 Diamonds|487227
`
}),

makeProduct("tamashi-rise-of-yokai", "Tamashi rise of yokai", "game", "", {
  "Sycee": `
60 Sycee|15562
300 Sycee|74871
600 Sycee|150183
900 Sycee|234909
1.200 Sycee|310221
1.800 Sycee|451431
3.000 Sycee|752679
6.000 Sycee|1505799
`
}),

makeProduct("marvel-duel", "Marvel duel", "game", "marvelduel.jpg", {
  "Stardust & Iso-gems": `
60 Stardust + 40 Iso-gems|134450
120 Stardust + 120 Iso-gems|265200
300 Stardust + 400 Iso-gems|653600
600 Stardust + 860 Iso-gems|1307100
`
}),

makeProduct("ghost-story-love-destiny", "Ghost story love destiny", "game", "", {
  "Pass & Jade": `
Monthly Pass|62185
Privilege Monthly Card|123915
65 Jade|15679
125 Jade|30901
315 + 16 Jade|76437
625 + 63 Jade|152374
1.250 + 125 Jade|304247
3.125 + 469 Jade|759835
6.250 + 1.250 Jade|1519282
12.500 + 2.500 Jade|3038064
31.250 + 6.250 Jade|7594321
`
}),

makeProduct("ragnarok-origin", "Ragnarok origin", "game", "", {
  "Nyan Berry": `
40 Nyan Berry|14892
210 Nyan Berry|68444
430 Nyan Berry|136528
900 Nyan Berry|280720
2.300 Nyan Berry|701116
4.800 Nyan Berry|1442971
9.600 Nyan Berry|2885579
4.800 Nyan Berry x5|7212851
24.000 Nyan Berry|7213129
4.800 Nyan Berry x10|14425204
48.000 Nyan Berry|14425758
4.800 Nyan Berry x15|21637556
4.800 Nyan Berry x20|28849908
96.000 Nyan Berry|28851014
4.800 Nyan Berry x25|36062261
4.800 Nyan Berry x30|43274613
4.800 Nyan Berry x40|57699317
4.800 Nyan Berry x50|72124021
`
}),

makeProduct("state-of-survival", "State of survival", "game", "", {
  "Diamonds": `
100 Diamonds|17722
500 Diamonds|85531
1.000 Diamonds|171639
2.000 Diamonds|354618
5.000 Diamonds|860500
10.000 Diamonds|1721576
20.000 Diamonds|3541674
`
}),

makeProduct("teamfight-tactics-mobile", "Teamfight tactics mobile", "game", "", {
  "TFT Coins": `
575 TFT Coins|58813
1.380 TFT Coins|136564
2.800 TFT Coins|272629
4.500 TFT Coins|428131
6.500 TFT Coins|603071
13.500 TFT Coins|1166766
`
}),

makeProduct("genshin-impact", "Genshin impact", "game", "", {
  "Genesis crystal": `
60 Genesis Crystals|16175
300 + 30 Genesis Crystals|77450
980 + 110 Genesis Crystals|242750
1.980 + 260 Genesis Crystals|465050
3.280 + 600 Genesis Crystals|774750
6.480 + 1.600 Genesis Crystals|1548050
Blessing of the Welkin Moon|77450
`,
  "Chronal nexsus": `
60 Chronal Nexus|16175
300 + 30 Chronal Nexus|77450
980 + 110 Chronal Nexus|242750
1.980 + 260 Chronal Nexus|465058
3.280 + 600 Chronal Nexus|774750
`
}),

makeProduct("lord-of-the-rings-rise-to-war", "The lord of the rings : rise to war", "game", "", {
  "Gems": `
200 Gems|13253
1.000 Gems|65527
2.300 Gems|130868
4.600 Gems|261551
11.500 Gems|653599
23.000 Gems|1307013
`
}),

makeProduct("ragnarok-x-next-generation", "Ragnarok x next generation", "game", "", {
  "Diamonds": `
2.310 Diamonds|69000
4.990 Diamonds|146600
10.290 Diamonds|301800
15.600 Diamonds|457000
31.200 Diamonds|913500
51.370 Diamonds|1461300
160.540 Diamonds|4565500
321.090 Diamonds|9130500
963.270 Diamonds|27390500
`,
  "Spesial item": `
Hadiah Privilege W|204099
Assurance of Exclusivity|346527
Oath of Bond|562908
`
}),

makeProduct("one-punch-man-the-strongest", "One puch man the strongest", "game", "onepunchmanthestrongest.jpg", {
  "Kupon": `
6 Kupon|9700
22 Kupon|37500
54 Kupon|92900
107 Kupon|185300
214 Kupon|370100
321 Kupon|554900
2.669 Kupon|4620500
`
}),

makeProduct("league-of-legends-wild-rift", "League of legends : wild rift", "game", "", {
  "Cores": `
425 Cores|53702
1.000 Cores|119255
1.850 Cores|214259
3.275 Cores|375766
10.000 Cores|1073095
`
}),

makeProduct("growtopia", "Growtopia", "game", "", {
  "Gems & Items": `
Chest O' Gems|28500
Gem Fountain|75200
It's Rainin' Gems|150500
Gem Bounty|450500
Gem Abundance|738000
Royal Grow Pass|150500
1-Year Subscription Token|738000
`
}),

makeProduct("tom-and-jerry-chase", "Tom and Jery : chase", "game", "", {
  "Diamonds": `
60 Diamonds|16000
180 + 6 Diamonds|43700
300 + 20 Diamonds|71500
600 + 45 Diamonds|143000
1.200 + 100 Diamonds|288500
1.800 + 170 Diamonds|436000
3.000 + 300 Diamonds|721400
6.000 + 1.000 Diamonds|1412200
`
}),
  makeProduct("hago", "hago", "game", "", {
  "Diamonds": `
1.200 Diamonds|2645
9.200 Diamonds|16834
18.200 Diamonds|33167
45.600 Diamonds|82167
76.200 Diamonds|136612
183.000 Diamonds|327167
336.000 Diamonds|599391
672.400 Diamonds|1198280
`
}),

makeProduct("punishing-gray-raven", "Punishing gray raven", "game", "punishinggreyraven.jpg", {
  "Android": `
5 Rainbow Cards|14982
28 Rainbow Cards|69047
34 Rainbow Cards|85459
59 Rainbow Cards|138559
71 Rainbow Cards|165592
119 Rainbow Cards|279515
299 Rainbow Cards|685968
600 Rainbow Cards|1391520
`,
  "IOS": `
5 Rainbow Cards|14982
28 Rainbow Cards|69047
34 Rainbow Cards|85459
59 Rainbow Cards|138559
71 Rainbow Cards|165592
119 Rainbow Cards|279515
299 Rainbow Cards|685968
600 Rainbow Cards|1391520
`
}),

makeProduct("pixel-gun-3d", "Pixel gun 3d", "game", "pixelgun3d.jpg", {
  "Coins": `
50 + 5 Coins|15300
150 + 15 Coins|45198
250 + 25 Coins|75096
500 + 100 Coins|149841
1.000 + 300 Coins|299333
2.500 + 1.000 Coins|747805
`,
  "Keys": `
50 + 5 Keys|15300
150 + 15 Keys|45198
250 + 25 Keys|75095
500 + 100 Keys|149841
1.000 + 300 Keys|299333
2.500 + 1.000 Keys|747805
`,
  "Gems": `
90 + 10 Gems|45198
150 + 25 Gems|75095
300 + 75 Gems|149841
600 + 200 Gems|299333
1.500 + 700 Gems|747805
`,
  "Pixel pass tickets": `
60 + 6 Pixel Pass Tickets|15300
180 + 20 Pixel Pass Tickets|45198
300 + 50 Pixel Pass Tickets|75095
600 + 150 Pixel Pass Tickets|149841
1.200 + 550 Pixel Pass Tickets|299333
3.000 + 1.500 Pixel Pass Tickets|747805
`,
  "Sets": `
Basic Set|75096
Advanced Set|149841
Expert Set|299333
Winner Set|747805
`
}),

makeProduct("astra-knights-of-veda", "ASTRA: KNIGHTS OF VEDA", "game", "astraknightsofveda.jpg", {
  "Rubies": `
60 Rubies|15045
300 Rubies|73811
980 Rubies|220728
1.980 Rubies|441101
3.280 Rubies|734932
6.480 Rubies|1469513
`
}),

makeProduct("legend-of-mushroom-rush", "LEGEND OF MUSHROOM: RUSH", "game", "", {
  "Gems + Bonus Items": `
99 Gems + Bonus Items|14612
499 Gems + Bonus Items|71060
999 Gems + Bonus Items|141620
1.999 Gems + Bonus Items|282740
4.999 Gems + Bonus Items|706100
9.999 Gems + Bonus Items|1411700
29.999 Gems + Bonus Items|4234100
59.999 Gems + Bonus Items|8467700
`
}),

makeProduct("heroic-uncle-kim", "HEROIC UNCLE KIM", "game", "", {
  "Demon Coins, Dragon Orbs & Gems": `
95 Demon Coins + 150 Master Keys|35842
150 Demon Coins + 300 Master Keys|54109
950 Dragon Orbs|100378
220 Gems + 20 Master Keys|11427
1.200 Gems + 90 Master Keys|54109
2.400 Gems + 150 Master Keys|100378
8.500 Gems + 500 Master Keys|291086
16.000 Gems + 1.000 Master Keys|491013
36.000 Gems + 2.000 Master Keys|990574
Ads Pass 30 Days + 240 Gems|100378
`
}),

makeProduct("total-football", "Total football", "game", "", {
  "TF Point Package": `
2 TF Point Package|3900
10 TF Point Package|16900
32 TF Point Package|50100
52 TF Point Package|83200
100 TF Point Package|163500
200 TF Point Package|302000
312 TF Point Package|495600
520 TF Point Package|827500
1.000 TF Point Package|1574300
2.000 TF Point Package|3148100
4.000 TF Point Package|6295600
`
}),

// Nomor 68 — Point Blank
makeProduct("point-blank", "Point blank", "game-pc", "pointblank.jpg", {
  "PB Cash": `
1.200 PB Cash|10340
2.400 PB Cash|20180
6.000 PB Cash|49700
12.000 PB Cash|98899
24.000 PB Cash|197297
36.000 PB Cash|295696
60.000 PB Cash|492494
`
}),

makeProduct("league-of-legends-pc", "league of legends ( PC )", "game-pc", "", {
  "RP": `
575 RP|58800
1.380 RP|136500
2.800 RP|272500
4.500 RP|427900
6.500 RP|602700
13.500 RP|1165900
`
}),

makeProduct("marvel-rivals", "Marvel rivals", "game", "marvelrivals.jpg", {
  "Lattices": `
100 Lattices|18565
500 Lattices|91023
1.000 Lattices|182935
2.180 Lattices|365569
5.680 Lattices|913469
11.680 Lattices|1826637
`
}),

makeProduct("poppo-live", "Poppo live", "entertainment", "poppo.jpg", {
  "Coins": `
1.000 Coins|2684
7.000 Coins|15190
21.000 Coins|44570
25.500 Coins|54099
43.500 Coins|92412
43.750 Coins|93008
70.000 Coins|147401
83.000 Coins|175391
88.000 Coins|186310
88.990 Coins|188493
178.000 Coins|376487
180.000 Coins|381053
210.000 Coins|441203
270.000 Coins|571230
273.000 Coins|577185
252.000 Coins|732225
350.000 Coins|735004
430.000 Coins|911285
450.000 Coins|950988
455.000 Coins|962701
700.000 Coins|1469509
1.050.000 Coins|2204013
1.400.000 Coins|2938517
1.750.000 Coins|3673022
2.100.000 Coins|4407526
2.450.000 Coins|5142030
2.800.000 Coins|5876535
3.150.000 Coins|6611039
3.500.000 Coins|7345544
4.200.000 Coins|8814552
4.900.000 Coins|10283561
5.600.000 Coins|11752570
6.300.000 Coins|13221578
7.000.000 Coins|14690587
8.750.000 Coins|18363109
10.500.000 Coins|22035631
12.250.000 Coins|25708152
14.000.000 Coins|29380674
15.750.000 Coins|33053196
17.500.000 Coins|36725718
19.250.000 Coins|40398239
21.000.000 Coins|44070761
24.500.000 Coins|51415805
28.000.000 Coins|58760848
31.500.000 Coins|66105892
35.000.000 Coins|73450935
`
}),

makeProduct("bigo-live", "Bigo live", "entertainment", "bigolive.jpg", {
  "Diamonds": `
25 Diamonds|9495
50 Diamonds|18489
100 Diamonds|36478
150 Diamonds|54672
200 Diamonds|72661
250 Diamonds|90650
300 Diamonds|108639
500 Diamonds|180799
750 Diamonds|270949
1.000 Diamonds|361098
2.000 Diamonds|721492
3.000 Diamonds|1082091
4.000 Diamonds|1442485
5.000 Diamonds|1803083
7.500 Diamonds|2704375
10.000 Diamonds|3605666
20.000 Diamonds|7210832
30.000 Diamonds|10815999
50.000 Diamonds|18026331
`
}),

makeProduct("chamet", "Chamet", "entertainment", "chamet.jpg", {
  "Diamonds": `
18.750 Diamonds|60488
62.500 Diamonds|200804
187.500 Diamonds|600385
625.000 Diamonds|2003540
1.875.000 Diamonds|5999348
3.750.000 Diamonds|11987924
6.250.000 Diamonds|20030900
`
}),

makeProduct("wesing", "Wesing", "entertainment", "wesing.jpg", {
  "Kcoins": `
37 Kcoins|10400
112 Kcoins|30100
373 Kcoins|99100
933 Kcoins|247000
1.866 Kcoins|493400
3.731 Kcoins|986300
5.597 Kcoins|1479000
`
}),

makeProduct("sugo-voice-live-chat-party", "Sugo : voice live chat party", "entertainment", "sugo.jpg", {
  "Coins": `
1.200 Coins|20738
2.400 Coins|41180
6.250 Coins|102506
12.500 Coins|204716
37.500 Coins|613558
65.000 Coins|1022400
130.000 Coins|2044504
`
}),

makeProduct("lita", "Lita", "entertainment", "lita.jpg", {
  "Lita Coins": `
300 Lita Coins|39688
600 Lita Coins|78877
1.000 Lita Coins|130195
2.000 Lita Coins|259889
5.000 Lita Coins|648973
10.000 Lita Coins|1296514
`
}),

makeProduct("livu", "Livu", "entertainment", "livu.jpg", {
  "Coin": `
299 Coin|54716
650 Coin|90896
990 Coin|145004
2.500 Coin|325148
5.000 Coin|627332
10.000 Coin|1166360
20.000 Coin|2268716
50.000 Coin|5388188
`
}),

makeProduct("like", "Like", "entertainment", "like.jpg", {
  "Diamonds": `
100 Diamonds|36277
200 Diamonds|72053
500 Diamonds|178991
1.000 Diamonds|357481
1.500 Diamonds|535972
2.000 Diamonds|714461
2.500 Diamonds|892952
3.000 Diamonds|1071442
3.500 Diamonds|1249933
4.000 Diamonds|1428423
4.500 Diamonds|1606914
5.000 Diamonds|1785206
10.000 Diamonds|3569914
20.000 Diamonds|7139328
`
}),

makeProduct("starmaker-global", "Starmaker ( global )", "entertainment", "starmaker.jpg", {
  "Coins + Bonus": `
60 Coins + 5 Bonus|13500
420 Coins + 40 Bonus|91700
300 Coins + 25 Bonus|65600
600 Coins + 60 Bonus|130800
1.000 Coins + 110 Bonus|219500
1.200 Coins + 150 Bonus|266500
1.600 Coins + 200 Bonus|355200
2.100 Coins + 300 Bonus|472600
2.700 Coins + 400 Bonus|608200
3.000 Coins + 450 Bonus|677400
3.400 Coins + 550 Bonus|775200
5.000 Coins + 850 Bonus|1147000
6.000 Coins + 1.100 Bonus|1387000
6.500 Coins + 1.200 Bonus|1503100
7.000 Coins + 1.300 Bonus|1616600
10.000 Coins + 1.900 Bonus|2315700
14.000 Coins + 2.800 Bonus|3261500
`
}),

makeProduct("we-tv", "We tv", "entertainment", "", {
  "VIP": `
12 Months VIP|476200
`
}),
