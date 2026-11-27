// ======================================
// PENGATURAN KODE DISKON - UBAH DI SINI
// ======================================
const DISCOUNT_CODES = {
  TAMPAN1: {
    type: "percent",
    value: 1,
    minPurchase: 0
  }
};

// ======================================
// PENGATURAN WEBSITE
// ======================================
const CONFIG = {
  paymentWhatsApp: "https://wa.me/628818238236",
  helpWhatsApp: "https://wa.me/6283130951231",
  currency: "Rp"
};

// ======================================
// DATA KATALOG
// Format produk: ["Nama produk", harga]
// ======================================
const CATALOG = [
  {
    name: "Mobile Legends",
    image: "mobilelegends.jpg",
    category: "Game",
    fields: [
      { name: "userId", label: "User ID", placeholder: "Masukkan User ID" },
      { name: "server", label: "Zone ID", placeholder: "Masukkan Zone ID" }
    ],
    subcategories: {
      "Diamond": [
        ["5 Diamond", 1675], ["10 Diamond", 3479],
        ["12 Diamond", 3859], ["19 Diamond", 6241],
        ["28 Diamond", 9209], ["44 Diamond", 13953],
        ["54 Diamond", 16595], ["59 Diamond", 17674],
        ["71 Diamond", 22465], ["74 Diamond", 23450],
        ["85 Diamond", 26418], ["88 Diamond", 27406],
        ["110 Diamond", 33235], ["113 Diamond", 35344],
        ["128 Diamond", 42685], ["148 Diamond", 48816],
        ["170 Diamond", 52563], ["176 Diamond", 58684],
        ["184 Diamond", 62276], ["222 Diamond", 74898],
        ["240 Diamond", 74016], ["258 Diamond", 86804],
        ["277 Diamond", 86357], ["284 Diamond", 87399],
        ["296 Diamond", 90832], ["301 Diamond", 95186],
        ["305 Diamond", 101230], ["333 Diamond", 104480],
        ["346 Diamond", 108827], ["356 Diamond", 112387],
        ["370 Diamond", 113783], ["384 Diamond", 117598],
        ["408 Diamond", 124398], ["424 Diamond", 128917],
        ["452 Diamond", 147732], ["518 Diamond", 170076],
        ["845 Diamond", 273549], ["875 Diamond", 280042],
        ["938 Diamond", 300598], ["966 Diamond", 314324],
        ["1045 Diamond", 316339], ["1136 Diamond", 367682],
        ["1159 Diamond", 376696], ["1443 Diamond", 465383],
        ["1506 Diamond", 485939], ["1704 Diamond", 549023],
        ["2010 Diamond", 574729], ["2232 Diamond", 694051],
        ["2380 Diamond", 737049], ["2578 Diamond", 801494],
        ["2625 Diamond", 816651], ["3453 Diamond", 1080536],
        ["3738 Diamond", 1172116], ["4020 Diamond", 1235306],
        ["4588 Diamond", 1228269], ["4830 Diamond", 1332469],
        ["5398 Diamond", 1629501], ["6030 Diamond", 1850469],
        ["6840 Diamond", 2068318], ["8040 Diamond", 2470672],
        ["9660 Diamond", 2896320], ["10050 Diamond", 2678670],
        ["14490 Diamond", 4339480], ["16080 Diamond", 4931224],
        ["18090 Diamond", 5666317], ["19320 Diamond", 5782040],
        ["20100 Diamond", 6161530], ["21330 Diamond", 6397793],
        ["23340 Diamond", 7012948], ["24150 Diamond", 7225380],
        ["26160 Diamond", 7840953], ["28170 Diamond", 8456106]
      ],
      "Weekly Diamond Pass": [
        ["WDP", 30490], ["WDP x2", 62990], ["WDP x3", 93990]
      ],
      "Bundle": [
        ["Weekly Elite Bundle", 17317],
        ["Monthly Epic Bundle", 84884]
      ],
      "2x First Recharge": [
        ["100 (50+50)", 17317],
        ["300 (150+150)", 50751],
        ["500 (250+250)", 84884],
        ["1000 (500+500)", 169759]
      ],
      "Starlight": [
        ["Basic Gift 7 Days", 40000],
        ["Premium Gift 7 Days", 96000]
      ]
    }
  },
  {
    name: "Free Fire",
    image: "freefire.jpg",
    category: "Game",
    fields: [
      { name: "userId", label: "Player ID", placeholder: "Masukkan Player ID" }
    ],
    subcategories: {
      "Diamond": [
        ["5 Diamond", 984], ["10 Diamond", 1862],
        ["12 Diamond", 1970], ["20 Diamond", 3618],
        ["25 Diamond", 4997], ["30 Diamond", 5661],
        ["50 Diamond", 7650], ["55 Diamond", 8360],
        ["70 Diamond", 9250], ["80 Diamond", 12254],
        ["100 Diamond", 14480], ["120 Diamond", 18132],
        ["130 Diamond", 19291], ["140 Diamond", 18850],
        ["145 Diamond", 21067], ["150 Diamond", 22049],
        ["190 Diamond", 27926], ["200 Diamond", 29885],
        ["210 Diamond", 30326], ["280 Diamond", 39679],
        ["355 Diamond", 47350], ["420 Diamond", 58866],
        ["425 Diamond", 59771], ["475 Diamond", 67607],
        ["495 Diamond", 69565], ["500 Diamond", 70543],
        ["510 Diamond", 72503], ["545 Diamond", 77401],
        ["565 Diamond", 79360], ["600 Diamond", 86218],
        ["635 Diamond", 89154], ["720 Diamond", 96000],
        ["800 Diamond", 113106], ["860 Diamond", 122540],
        ["930 Diamond", 132335], ["1000 Diamond", 142129],
        ["1050 Diamond", 146950], ["1075 Diamond", 156000],
        ["1080 Diamond", 152909], ["1440 Diamond", 204000],
        ["1450 Diamond", 205000], ["2160 Diamond", 303000],
        ["2180 Diamond", 305000], ["7290 Diamond", 986460],
        ["36500 Diamond", 5005000], ["73100 Diamond", 10010000]
      ],
      "Membership": [
        ["Weekly", 28200], ["Monthly", 91715],
        ["BP Card", 46108], ["Level Up Pass L6", 5598],
        ["Level Up Pass L10", 9262], ["Level Up Pass L15", 9262],
        ["Level Up Pass L20", 9262], ["Level Up Pass L25", 9262],
        ["Level Up Pass L30", 15159]
      ]
    }
  },
  {
    name: "Free Fire MAX",
    image: "freefiremax.jpg",
    category: "Game",
    fields: [
      { name: "userId", label: "Player ID", placeholder: "Masukkan Player ID" }
    ],
    subcategories: {
      "Diamond": [
        ["5 Diamond", 984], ["10 Diamond", 1862],
        ["12 Diamond", 1970], ["20 Diamond", 3618],
        ["25 Diamond", 4997], ["30 Diamond", 5661],
        ["50 Diamond", 7650], ["55 Diamond", 7960],
        ["70 Diamond", 9250], ["80 Diamond", 12254],
        ["100 Diamond", 14480], ["120 Diamond", 18132],
        ["130 Diamond", 19291], ["140 Diamond", 18850],
        ["145 Diamond", 21067], ["150 Diamond", 22049],
        ["190 Diamond", 27926], ["200 Diamond", 29885],
        ["210 Diamond", 30326], ["280 Diamond", 39679],
        ["355 Diamond", 47350], ["420 Diamond", 58866],
        ["425 Diamond", 59771], ["475 Diamond", 67607],
        ["495 Diamond", 69565], ["500 Diamond", 70543],
        ["510 Diamond", 72503], ["545 Diamond", 77401],
        ["565 Diamond", 79360], ["600 Diamond", 86218],
        ["635 Diamond", 89154], ["720 Diamond", 96000],
        ["800 Diamond", 109106], ["860 Diamond", 118540],
        ["930 Diamond", 128335], ["1000 Diamond", 129800],
        ["1050 Diamond", 146950], ["1075 Diamond", 156000],
        ["1080 Diamond", 152909], ["1440 Diamond", 204000],
        ["1450 Diamond", 205000], ["2160 Diamond", 303000],
        ["2180 Diamond", 305000], ["7290 Diamond", 925000],
        ["36500 Diamond", 5005000], ["73100 Diamond", 10010000]
      ],
      "Membership": [
        ["Weekly", 28200], ["Monthly", 91715],
        ["BP Card", 46108], ["Level Up Pass L6", 5598],
        ["Level Up Pass L10", 9262], ["Level Up Pass L15", 9262],
        ["Level Up Pass L20", 9262], ["Level Up Pass L25", 9262],
        ["Level Up Pass L30", 15159]
      ]
    }
  },
  {
    name: "Roblox",
    image: "roblox.jpg",
    category: "Game",
    fields: [
      { name: "userId", label: "Username Roblox", placeholder: "Masukkan username" }
    ],
    subcategories: {
      "Robux": [
        ["50 Robux", 6500], ["100 Robux", 12600],
        ["200 Robux", 25200], ["300 Robux", 37500],
        ["400 Robux", 49800], ["500 Robux", 62500],
        ["600 Robux", 74800], ["700 Robux", 87200],
        ["800 Robux", 99800], ["900 Robux", 112300],
        ["1000 Robux", 124500], ["1500 Robux", 187000],
        ["2000 Robux", 250000], ["2500 Robux", 311000],
        ["3000 Robux", 373000], ["4000 Robux", 497000],
        ["5000 Robux", 625000]
      ]
    }
  }
];
// Tambahkan katalog game lain di bagian CATALOG di atas.
// Kategori utama hanya Game, Game PC, dan Entertainment.

const EXTRA_ITEMS = [
  ["Magic Chess GoGo", "magicchesgogo.jpg", "Game"],
  ["PUBG Mobile", "pubg.jpg", "Game"],
  ["Honor of Kings", "honorofkings.jpg", "Game"],
  ["Blood Strike", "bloodstrike.jpg", "Game"],
  ["EA Sports FC Mobile", "easportfcmobile.jpg", "Game"],
  ["Ragnarok M Classic", "ragnarokmclasic.jpg", "Game"],
  ["Zepeto", "zepeto.jpg", "Game"],
  ["Undawn", "undawn.jpg", "Game"],
  ["Metal Slug Awakening", "metalslugawakening.jpg", "Game"],
  ["Delta Force", "deltaforce.jpg", "Game"],
  ["Cloud Song Saga of Skywalkers", "cloudsongsagaofskywalkers.jpg", "Game"],
  ["Harry Potter Magic Awakened", "harrypottermagicawakened.jpg", "Game"],
  ["Arena of Valor", "arenaofvalor.jpg", "Game"],
  ["AFK Journey", "afkjourney.jpg", "Game"],
  ["Racing Master", "racingmaster.jpg", "Game"],
  ["Onmyoji Arena", "onmyojiarena.jpg", "Game"],
  ["MU Origin 2", "muorigin2.jpg", "Game"],
  ["MOB RUSH", "mobrush.jpg", "Game"],
  ["MU Origin 3 SEA", "muorigin3.jpg", "Game"],
  ["Identity V", "identityv.jpg", "Game"],
  ["Rainbow Six Mobile", "rainbowsixmobile.jpg", "Game"],
  ["Call of Duty Mobile", "callofduty.jpg", "Game"],
  ["Honkai Impact 3", "honkaiimpact3.jpg", "Game"],
  ["Path to Nowhere", "pathtonowhere.jpg", "Game"],
  ["Arena Breakout", "arenabreakout.jpg", "Game"],
  ["LifeAfter", "lifeafter.jpg", "Game"],
  ["Love and Deepspace", "loveanddeepspace.jpg", "Game"],
  ["Honkai Star Rail", "honkaistarrail.jpg", "Game"],
  ["Zenless Zone Zero", "zenlesszonezero.jpg", "Game"],
  ["Genshin Impact", "genshinimpact.jpg", "Game"],
  ["Ragnarok Origin", "ragnarokorigin.jpg", "Game"],
  ["Ragnarok X Next Generation", "ragnarokxnextgeneration.jpg", "Game"],
  ["One Punch Man The Strongest", "onepunchmanthestrongest.jpg", "Game"],
  ["Punishing Gray Raven", "punishinggreyraven.jpg", "Game"],
  ["Pixel Gun 3D", "pixelgun3d.jpg", "Game"],
  ["Marvel Rivals", "marvelrivals.jpg", "Game"],
  ["Valorant", "valorant.jpg", "Game PC"],
  ["Point Blank", "pointblank.jpg", "Game PC"],
  ["League of Legends PC", "leagueoflegends.jpg", "Game PC"],
  ["Football Master 2", "footballmaster2.jpg", "Game"],
  ["Football Dreams: Be A Pro", "footballdreamsbeapro.jpg", "Game"],
  ["Captain Tsubasa Ace", "captaintsubasaace.jpg", "Game"],
  ["Be The King", "bethekingjudgedestiny.jpg", "Game"],
  ["Top Eleven", "topeleven.jpg", "Game"],
  ["League of Legends Wild Rift", "leagueoflegends.jpg", "Game"],
  ["Growtopia", "growtopia.jpg", "Game"],
  ["Tom and Jerry Chase", "tomandjerrychase.jpg", "Game"],
  ["Hago", "hago.jpg", "Game"],
  ["Vidio", "weetv.jpg", "Entertainment"],
  ["WeTV", "weetv.jpg", "Entertainment"]
];

function formatRupiah(value) {
  return "Rp" + Number(value).toLocaleString("id-ID");
}

function getAllItems() {
  return [
    ...CATALOG,
    ...EXTRA_ITEMS.map(([name, image, category]) => ({
      name,
      image,
      category,
      fields: [{ name: "userId", label: "ID Akun", placeholder: "Masukkan ID akun" }],
      subcategories: {}
    }))
  ];
}

const ALL_ITEMS = getAllItems();
let currentGame = null;
let currentCategory = "";
let currentSubcategory = "";
let selectedProduct = null;
let discountAmount = 0;

function renderHome() {
  const targets = {
    "Game": document.getElementById("gameGrid"),
    "Game PC": document.getElementById("pcGrid"),
    "Entertainment": document.getElementById("entertainmentGrid")
  };

  Object.values(targets).forEach(el => el.innerHTML = "");

  ALL_ITEMS.forEach(item => {
    const target = targets[item.category];
    if (!target) return;

    const card = document.createElement("button");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${item.image}" alt="">
      <span>${item.name}</span>
    `;
    card.addEventListener("click", () => openGame(item.name));
    target.appendChild(card);
  });
}

function openGame(name) {
  currentGame = ALL_ITEMS.find(item => item.name === name);
  if (!currentGame) return;

  document.querySelectorAll("main > section").forEach(el => el.classList.add("hidden"));
  document.getElementById("detailView").classList.remove("hidden");

  document.getElementById("detailTitle").textContent = currentGame.name;
  document.getElementById("detailImage").src = currentGame.image;

  currentSubcategory = Object.keys(currentGame.subcategories)[0] || "";
  selectedProduct = null;
  discountAmount = 0;

  renderSubcategories();
  renderProducts();
  document.getElementById("orderForm").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSubcategories() {
  const wrap = document.getElementById("subcategoryList");
  wrap.innerHTML = "";

  Object.keys(currentGame.subcategories).forEach(name => {
    const button = document.createElement("button");
    button.textContent = name;
    button.className = name === currentSubcategory ? "active" : "";
    button.onclick = () => {
      currentSubcategory = name;
      selectedProduct = null;
      renderSubcategories();
      renderProducts();
      document.getElementById("orderForm").classList.add("hidden");
    };
    wrap.appendChild(button);
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const products = currentGame.subcategories[currentSubcategory] || [];

  if (!products.length) {
    grid.innerHTML = `<div class="empty-state">Daftar produk untuk game ini belum dimasukkan.</div>`;
    return;
  }

  products.forEach(product => {
    const card = document.createElement("button");
    card.className = "product-card";
    card.innerHTML = `<strong>${product[0]}</strong><span>${formatRupiah(product[1])}</span>`;
    card.onclick = () => selectProduct(product, card);
    grid.appendChild(card);
  });
}
function selectProduct(product, card) {
  selectedProduct = product;
  discountAmount = 0;

  document.querySelectorAll(".product-card").forEach(el => el.classList.remove("selected"));
  card.classList.add("selected");

  const form = document.getElementById("orderForm");
  form.classList.remove("hidden");

  const fields = document.getElementById("accountFields");
  fields.innerHTML = "";

  currentGame.fields.forEach(field => {
    const group = document.createElement("div");
    group.className = "field-group";
    group.innerHTML = `
      <label>${field.label}</label>
      <input name="${field.name}" placeholder="${field.placeholder}" required>
    `;
    fields.appendChild(group);
  });

  document.getElementById("selectedProduct").textContent =
    product[0] + " — " + formatRupiah(product[1]);

  document.getElementById("discountInput").value = "";
  document.getElementById("discountMessage").textContent = "";
  updateTotal();
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyDiscount() {
  if (!selectedProduct) {
    showToast("Pilih produk terlebih dahulu");
    return;
  }

  const code = document.getElementById("discountInput").value.trim().toUpperCase();
  const config = DISCOUNT_CODES[code];

  if (!config) {
    discountAmount = 0;
    document.getElementById("discountMessage").textContent = "Kode diskon tidak valid.";
    updateTotal();
    return;
  }

  if (selectedProduct[1] < config.minPurchase) {
    discountAmount = 0;
    document.getElementById("discountMessage").textContent = "Belum memenuhi minimum pembelian.";
    updateTotal();
    return;
  }

  discountAmount = config.type === "percent"
    ? Math.floor(selectedProduct[1] * config.value / 100)
    : config.value;

  document.getElementById("discountMessage").textContent =
    "Kode diskon berhasil digunakan.";
  updateTotal();
}

function updateTotal() {
  if (!selectedProduct) return;

  const total = Math.max(0, selectedProduct[1] - discountAmount);
  document.getElementById("totalPrice").textContent = formatRupiah(total);
}

function checkout() {
  if (!currentGame || !selectedProduct) {
    showToast("Pilih produk terlebih dahulu");
    return;
  }

  const inputs = [...document.querySelectorAll("#accountFields input")];
  const accountData = {};

  for (const input of inputs) {
    if (!input.value.trim()) {
      input.focus();
      showToast("Lengkapi data akun terlebih dahulu");
      return;
    }
    accountData[input.name] = input.value.trim();
  }

  const total = Math.max(0, selectedProduct[1] - discountAmount);
  const order = {
    id: "GT" + Date.now(),
    game: currentGame.name,
    product: selectedProduct[0],
    price: selectedProduct[1],
    discount: discountAmount,
    total,
    accountData,
    date: new Date().toLocaleString("id-ID"),
    status: "Menunggu pembayaran"
  };

  const orders = JSON.parse(localStorage.getItem("gotopup_orders") || "[]");
  orders.unshift(order);
  localStorage.setItem("gotopup_orders", JSON.stringify(orders));

  document.querySelectorAll("main > section").forEach(el => el.classList.add("hidden"));
  document.getElementById("paymentView").classList.remove("hidden");

  document.getElementById("paymentTotal").textContent =
    "Total pembayaran: " + formatRupiah(total);

  const message = [
    "Halo admin GOTOPUP.ID, saya ingin konfirmasi pembayaran.",
    "ID Pesanan: " + order.id,
    "Game: " + order.game,
    "Produk: " + order.product,
    "Total: " + formatRupiah(order.total),
    "Data akun: " + JSON.stringify(accountData)
  ].join("\n");

  document.getElementById("confirmPayment").href =
    CONFIG.paymentWhatsApp + "?text=" + encodeURIComponent(message);

  window.scrollTo({ top: 0, behavior: "smooth" });
}
function showAccount() {
  document.querySelectorAll("main > section").forEach(el => el.classList.add("hidden"));
  document.getElementById("accountView").classList.remove("hidden");
  document.getElementById("accountContent").innerHTML = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showOrderHistory() {
  document.querySelectorAll("main > section").forEach(el => el.classList.add("hidden"));
  document.getElementById("accountView").classList.remove("hidden");

  const target = document.getElementById("accountContent");
  const orders = JSON.parse(localStorage.getItem("gotopup_orders") || "[]");

  if (!orders.length) {
    target.innerHTML = `<div class="empty-state">Belum ada riwayat pesanan.</div>`;
  } else {
    target.innerHTML = "<h3>Riwayat Pesanan</h3>" + orders.map(order => `
      <div class="history-item">
        <strong>${order.game}</strong><br>
        ${order.product}<br>
        Total: ${formatRupiah(order.total)}<br>
        ID: ${order.id}<br>
        Status: ${order.status}<br>
        <small>${order.date}</small>
      </div>
    `).join("");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showDiscountInfo() {
  const target = document.getElementById("accountContent");
  target.innerHTML = `
    <div class="history-item">
      <strong>Info Kode Diskon</strong><br>
      Gunakan kode <strong>TAMPAN1</strong> saat memilih produk
      untuk mendapatkan potongan sesuai pengaturan diskon.
    </div>
  `;
}

function goHome() {
  document.querySelectorAll("main > section").forEach(el => el.classList.remove("hidden"));
  document.getElementById("detailView").classList.add("hidden");
  document.getElementById("accountView").classList.add("hidden");
  document.getElementById("paymentView").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToCatalog(id) {
  goHome();
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, 50);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

let bannerIndex = 0;

function setupBanner() {
  const banners = [...document.querySelectorAll(".banner")];
  const dots = document.getElementById("bannerDots");

  dots.innerHTML = "";
  banners.forEach((banner, index) => {
    const dot = document.createElement("button");
    dot.className = "banner-dot" + (index === 0 ? " active" : "");
    dot.onclick = () => setBanner(index);
    dots.appendChild(dot);
  });

  if (banners.length < 2) return;

  setInterval(() => {
    setBanner((bannerIndex + 1) % banners.length);
  }, 3000);
}

function setBanner(index) {
  const banners = [...document.querySelectorAll(".banner")];
  const dots = [...document.querySelectorAll(".banner-dot")];

  bannerIndex = index;
  banners.forEach((banner, i) => banner.classList.toggle("active", i === index));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  setupBanner();
});
