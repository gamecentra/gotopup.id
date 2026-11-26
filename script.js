
/* ==========================================
   BAGIAN 1/8 — KONFIGURASI TOKO & KATALOG
========================================== */

// Ubah pengaturan diskon di sini.
const STORE_CONFIG = {
  name: "GOTOPUP.ID",
  discountCode: "TAMPAN1",
  discountType: "fixed",
  discountValue: 1000,
  paymentWhatsapp: "628818238236",
  helpWhatsapp: "6283130951231",
  sliderInterval: 3000
};

const rupiah = value =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

const escapeHTML = value =>
  String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);

/*
  Katalog game dan file gambar.
  Nama file mengikuti aset yang sudah lu punya.
  Tambahkan data produk ke products sesuai daftar harga asli.
*/
const CATALOG = [
  { id:"freefire", name:"Free Fire", image:"freefire.jpg", category:"game", popular:true, fields:[["User ID","text","Masukkan User ID"]] },
  { id:"freefiremax", name:"Free Fire MAX", image:"freefiremax.jpg", category:"game", popular:true, fields:[["User ID","text","Masukkan User ID"]] },
  { id:"mobilelegends", name:"Mobile Legends", image:"mobilelegends.jpg", category:"game", popular:true, fields:[["User ID","text","Masukkan User ID"],["Zone ID","text","Masukkan Zone ID"]] },
  { id:"roblox", name:"Roblox", image:"roblox.jpg", category:"game", popular:true, fields:[["Username","text","Masukkan username"]] },
  { id:"pubg", name:"PUBG Mobile", image:"pubg.jpg", category:"game", popular:true, fields:[["Character ID","text","Masukkan Character ID"]] },
  { id:"valorant", name:"Valorant", image:"valorant.jpg", category:"game-pc", popular:true, fields:[["Riot ID","text","Nama#Tag"]] },
  { id:"magicchess", name:"Magic Chess GoGo", image:"magicchesgogo.jpg", category:"game", popular:true, fields:[["User ID","text","Masukkan User ID"],["Zone ID","text","Masukkan Zone ID"]] },
  { id:"vidio", name:"Vidio", image:"weetv.jpg", category:"entertainment", fields:[["Email","email","Email akun"]] },
  { id:"honorofkings", name:"Honor of Kings", image:"honorofkings.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"bloodstrike", name:"Blood Strike", image:"bloodstrike.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"footballmaster2", name:"Football Master 2", image:"footballmaster2.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"footballdreams", name:"Football Dreams: Be A Pro", image:"footballdreamsbeapro.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"ragnarokclassic", name:"Ragnarok M Classic", image:"ragnarokmclasic.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"zepeto", name:"Zepeto", image:"zepeto.jpg", category:"game", fields:[["ZEPETO ID","text","Masukkan ZEPETO ID"]] },
  { id:"kingofavalon", name:"King of Avalon", image:"kingofavalon.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"undawn", name:"Undawn", image:"undawn.jpg", category:"game", fields:[["Character ID","text","Masukkan Character ID"]] },
  { id:"metalslug", name:"Metal Slug Awakening", image:"metalslugawakening.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"captaintsubasa", name:"Captain Tsubasa Ace", image:"captaintsubasaace.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"betheking", name:"Be The King", image:"bethekingjudgedestiny.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"topeleven", name:"Top Eleven", image:"topeleven.jpg", category:"game", fields:[["Manager ID","text","Masukkan Manager ID"]] },
  { id:"deltaforce", name:"Delta Force", image:"deltaforce.jpg", category:"game-pc", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"cloudsong", name:"Cloud Song Saga of Skywalkers", image:"cloudsongsagaofskywalkers.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"harrypotter", name:"Harry Potter Magic Awakened", image:"harrypottermagicawakened.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"aov", name:"Arena of Valor", image:"arenaofvalor.jpg", category:"game", fields:[["Character ID","text","Masukkan Character ID"]] },
  { id:"afkjourney", name:"AFK Journey", image:"afkjourney.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"racingmaster", name:"Racing Master", image:"racingmaster.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"onmyoji", name:"Onmyoji Arena", image:"onmyojiarena.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"muorigin2", name:"MU Origin 2", image:"muorigin2.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"mobrush", name:"MOB RUSH", image:"mobrush.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"muorigin3", name:"MU Origin 3 SEA", image:"muorigin3.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"identityv", name:"Identity V", image:"identityv.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"legacyfate", name:"Legacy Fate Sacred and Fearless", image:"legacyfatesacredandfearless.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"rainbowsix", name:"Rainbow Six Mobile", image:"rainbowsixmobile.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"codm", name:"Call of Duty Mobile ID", image:"callofduty.jpg", category:"game", fields:[["Open ID","text","Masukkan Open ID"]] },
  { id:"snowbreak", name:"Snowbreak Containment Zone", image:"snowbreakcontaimentzone.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"honkaiimpact", name:"Honkai Impact 3", image:"honkaiimpact3.jpg", category:"game", fields:[["Captain ID","text","Masukkan Captain ID"]] },
  { id:"pathtonowhere", name:"Path to Nowhere", image:"pathtonowhere.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"heavenburnsred", name:"Heaven Burns Red", image:"heavenburnsred.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"arenabreakout", name:"Arena Breakout", image:"arenabreakout.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"lor", name:"Legends of Runeterra", image:"legendsofruneterra.jpg", category:"game-pc", fields:[["Riot ID","text","Nama#Tag"]] },
  { id:"lifeafter", name:"LifeAfter", image:"lifeafter.jpg", category:"game", fields:[["Character ID","text","Masukkan Character ID"]] },
  { id:"loveanddeepspace", name:"Love and Deepspace", image:"loveanddeepspace.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"watcherofrealms", name:"Watcher of Realms", image:"watcherofrealms.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"hsr", name:"Honkai Star Rail", image:"honkaistarrail.jpg", category:"game", fields:[["UID","text","Masukkan UID"],["Server","text","Masukkan server"]] },
  { id:"zzz", name:"Zenless Zone Zero", image:"zenlesszonezero.jpg", category:"game", fields:[["UID","text","Masukkan UID"],["Server","text","Masukkan server"]] },
  { id:"speeddrifters", name:"Speed Drifters", image:"speeddrifters.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"tamashi", name:"Tamashi Rise of Yokai", image:"tamashiriseofyokai.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"marvelduel", name:"Marvel Duel", image:"marvelduel.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"ghoststory", name:"Ghost Story Love Destiny", image:"ghoststorylovedestiny.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"ragnarokorigin", name:"Ragnarok Origin", image:"ragnarokorigin.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"stateofsurvival", name:"State of Survival", image:"stateofsurvival.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"tft", name:"Teamfight Tactics Mobile", image:"teamfighttacticsmobile.jpg", category:"game", fields:[["Riot ID","text","Nama#Tag"]] },
  { id:"genshin", name:"Genshin Impact", image:"genshinimpact.jpg", category:"game", fields:[["UID","text","Masukkan UID"],["Server","text","Pilih server"]] },
  { id:"lotr", name:"Lord of the Rings Rise to War", image:"thelordoftheringsrisetowar.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"ragnarokx", name:"Ragnarok X Next Generation", image:"ragnarokxnextgeneration.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"onepunch", name:"One Punch Man The Strongest", image:"onepunchmanthestrongest.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"wildrift", name:"League of Legends Wild Rift", image:"leagueoflegends.jpg", category:"game", fields:[["Riot ID","text","Nama#Tag"]] },
  { id:"growtopia", name:"Growtopia", image:"growtopia.jpg", category:"game", fields:[["GrowID","text","Masukkan GrowID"]] },
  { id:"tomjerry", name:"Tom and Jerry Chase", image:"tomandjerrychase.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"hago", name:"Hago", image:"hago.jpg", category:"game", fields:[["Hago ID","text","Masukkan Hago ID"]] },
  { id:"pgr", name:"Punishing Gray Raven", image:"punishinggreyraven.jpg", category:"game", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"pixelgun", name:"Pixel Gun 3D", image:"pixelgun3d.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"astraknight", name:"Astra Knights of Veda", image:"astraknightsofveda.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"mushroom", name:"Legend of Mushroom Rush", image:"leagueofmushroomrush.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"heroickim", name:"Heroic Uncle Kim", image:"heroicunclekim.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"totalfootball", name:"Total Football", image:"totalfootball.jpg", category:"game", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"pointblank", name:"Point Blank", image:"pointblank.jpg", category:"game-pc", fields:[["User ID","text","Masukkan User ID"]] },
  { id:"lolpc", name:"League of Legends PC", image:"leagueoflegends.jpg", category:"game-pc", fields:[["Riot ID","text","Nama#Tag"]] },
  { id:"marvelrivals", name:"Marvel Rivals", image:"marvelrivals.jpg", category:"game-pc", fields:[["Player ID","text","Masukkan Player ID"]] },
  { id:"weTV", name:"WeTV", image:"weetv.jpg", category:"entertainment", fields:[["Email","email","Email akun"]] }
];

// Data produk awal. Isi lengkap wajib disambungkan dari daftar harga asli.
const PRODUCT_DATA = {
  freefire: {
    "Diamond": [
      ["5 Diamonds",984],["10 Diamonds",1862],["12 Diamonds",1970],
      ["20 Diamonds",3618],["25 Diamonds",4997],["30 Diamonds",5661],
      ["50 Diamonds",7650],["55 Diamonds",8360],["70 Diamonds",9250],
      ["80 Diamonds",12254],["100 Diamonds",14480],["120 Diamonds",18132],
      ["130 Diamonds",19291],["140 Diamonds",18850],["145 Diamonds",21067],
      ["150 Diamonds",22049],["190 Diamonds",27926],["200 Diamonds",29885],
      ["210 Diamonds",30326],["280 Diamonds",39679],["355 Diamonds",47350],
      ["420 Diamonds",58866],["425 Diamonds",59771],["475 Diamonds",67607],
      ["495 Diamonds",69565],["500 Diamonds",70543],["510 Diamonds",72503],
      ["545 Diamonds",77401],["565 Diamonds",79360],["600 Diamonds",86218],
      ["635 Diamonds",89154],["720 Diamonds",96000],["800 Diamonds",113106],
      ["860 Diamonds",122540],["930 Diamonds",132335],["1000 Diamonds",142129],
      ["1050 Diamonds",146950],["1075 Diamonds",156000],["1080 Diamonds",152909],
      ["1440 Diamonds",204000],["1450 Diamonds",205000],["2160 Diamonds",303000],
      ["2180 Diamonds",305000],["7290 Diamonds",986460],["36500 Diamonds",5005000],
      ["73100 Diamonds",10010000]
    ],
    "Membership": [
      ["Weekly",28200],["Monthly",91715],["BP Card",46108],
      ["Level Up Pass L6",5598],["Level Up Pass L10",9262],
      ["Level Up Pass L15",9262],["Level Up Pass L20",9262],
      ["Level Up Pass L25",9262],["Level Up Pass L30",15159]
    ]
  },
  mobilelegends: {
    "Diamond": [
      ["5 Diamonds",1675],["10 Diamonds",3479],["12 Diamonds",3859],
      ["19 Diamonds",6241],["28 Diamonds",9209],["44 Diamonds",13953],
      ["54 Diamonds",16595],["59 Diamonds",17674],["71 Diamonds",22465],
      ["74 Diamonds",23450],["85 Diamonds",26418],["88 Diamonds",27406],
      ["110 Diamonds",33235],["113 Diamonds",35344],["128 Diamonds",42685],
      ["148 Diamonds",48816],["170 Diamonds",52563],["176 Diamonds",58684],
      ["184 Diamonds",62276],["222 Diamonds",74898],["240 Diamonds",74016],
      ["258 Diamonds",86804],["277 Diamonds",86357],["284 Diamonds",87399],
      ["296 Diamonds",90832],["301 Diamonds",95186],["305 Diamonds",101230],
      ["333 Diamonds",104480],["346 Diamonds",108827],["356 Diamonds",112387],
      ["370 Diamonds",113783],["384 Diamonds",117598],["408 Diamonds",124398],
      ["424 Diamonds",128917],["452 Diamonds",147732],["518 Diamonds",170076],
      ["845 Diamonds",273549],["875 Diamonds",280042],["938 Diamonds",300598],
      ["966 Diamonds",314324],["1045 Diamonds",316339],["1136 Diamonds",367682],
      ["1159 Diamonds",376696],["1443 Diamonds",465383],["1506 Diamonds",485939],
      ["1704 Diamonds",549023],["2010 Diamonds",574729],["2232 Diamonds",694051],
      ["2380 Diamonds",737049],["2578 Diamonds",801494],["2625 Diamonds",816651],
      ["3453 Diamonds",1080536],["3738 Diamonds",1172116],["4020 Diamonds",1235306],
      ["4588 Diamonds",1228269],["4830 Diamonds",1332469],["5398 Diamonds",1629501],
      ["6030 Diamonds",1850469],["6840 Diamonds",2068318],["8040 Diamonds",2470672],
      ["9660 Diamonds",2896320],["10050 Diamonds",2678670],["14490 Diamonds",4339480],
      ["16080 Diamonds",4931224],["18090 Diamonds",5666317],["19320 Diamonds",5782040],
      ["20100 Diamonds",6161530],["21330 Diamonds",6397793],["23340 Diamonds",7012948],
      ["24150 Diamonds",7225380],["26160 Diamonds",7840953],["28170 Diamonds",8456106]
    ],
    "Weekly Diamond Pass & Bundle": [
      ["Weekly Diamond Pass",30490],["WDP x2",62990],["WDP x3",93990],
      ["Weekly Elite Bundle",17317],["Monthly Epic Bundle",84884]
    ],
    "2x First Recharge": [
      ["100 (50+50)",17317],["300 (150+150)",50751],
      ["500 (250+250)",84884],["1000 (500+500)",169759]
    ],
    "Starlight": [
      ["Basic Gift 7 Days",40000],["Premium Gift 7 Days",96000]
    ]
  },
  roblox: {
    "Robux": [
      ["50 Robux",6500],["100 Robux",12600],["200 Robux",25200],
      ["300 Robux",37500],["400 Robux",49800],["500 Robux",62500],
      ["600 Robux",74800],["700 Robux",87200],["800 Robux",99800],
      ["900 Robux",112300],["1000 Robux",124500],["1500 Robux",187000],
      ["2000 Robux",250000],["2500 Robux",311000],["3000 Robux",373000],
      ["4000 Robux",497000],["5000 Robux",625000]
    ]
  },
  vidio: {
    "Vidio Ultimate": [
      ["Ultimate All Screen 1 Tahun",1379500],
      ["Ultimate Mobile 30 Hari",105500],
      ["Ultimate Mobile 1 Tahun",765500],
      ["Ultimate All Screen 30 Hari",200500],
      ["Ultimate Mobile 3 Bulan",263658]
    ],
    "Vidio Platinum": [
      ["Platinum 30 Hari",54500],["Platinum Extra 30 Hari",76500],
      ["Platinum 3 Bulan",118500],["Platinum Extra 3 Bulan",187500],
      ["Platinum 1 Tahun",398500],["Platinum Extra 1 Tahun",553500]
    ]
  },
  valorant: {
    "Valorant Points": [
      ["475 VP",53219],["1000 VP",105939],["1475 VP",158659],
      ["2050 VP",211378],["2525 VP",264097],["3050 VP",316817],
      ["3650 VP",366713],["4125 VP",419432],["4650 VP",472151],
      ["5350 VP",526753],["5700 VP",577590],["5825 VP",579473],
      ["6350 VP",632192],["7300 VP",732924],["7400 VP",737632],
      ["9000 VP",892966],["11000 VP",1035120],["11475 VP",1087839],
      ["12000 VP",1140559],["13050 VP",1245998],["14650 VP",1401333],
      ["15100 VP",1456876],["16350 VP",1561373],["16700 VP",1612210],
      ["18300 VP",1767544],["20000 VP",1927586],["22000 VP",2069740]
    ]
  },
  weetv: {
    "WeTV VIP": [["12 Months VIP",476200]]
  }
};
      
/* ==========================================
   BAGIAN 2/8 — STATE & NAVIGASI HALAMAN
========================================== */

let currentPage = "homePage";
let selectedCategory = "game";
let selectedGame = null;
let selectedSubcategory = "all";
let selectedProduct = null;
let discountApplied = false;
let discountAmount = 0;
let currentOrder = null;
let currentBanner = 0;
let bannerTimer = null;

const $ = id => document.getElementById(id);

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === pageId);
  });

  currentPage = pageId;

  document.querySelectorAll(".nav-item").forEach(button => {
    const target = button.dataset.page;
    button.classList.toggle(
      "active",
      target === pageId ||
      (pageId === "gameDetailPage" && target === "gamePage") ||
      (pageId === "checkoutPage" && target === "gamePage")
    );
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openCategory(category) {
  selectedCategory = category;
  selectedGame = null;

  const titles = {
    game: ["Pilih Game", "Temukan game yang ingin kamu top up"],
    "game-pc": ["Pilih Game PC", "Temukan produk game PC"],
    entertainment: ["Entertainment", "Pilih layanan entertainment"]
  };

  const heading = titles[category] || titles.game;
  $("gamePageTitle").textContent = heading[0];
  $("gamePageDescription").textContent = heading[1];

  if ($("gameSearch")) $("gameSearch").value = "";

  renderGameList();
  showPage("gamePage");
}

function openGame(gameId) {
  const game = CATALOG.find(item => item.id === gameId);
  if (!game) return;

  selectedGame = game;
  selectedProduct = null;
  selectedSubcategory = "all";
  discountApplied = false;
  discountAmount = 0;

  $("detailGameTitle").textContent = game.name;
  $("detailGameName").textContent = game.name;
  $("detailGameDescription").textContent =
    "Pilih subkategori dan produk yang ingin kamu beli";
  $("detailGameImage").src = game.image;
  $("detailGameImage").alt = game.name;

  renderSubcategories();
  renderProducts();
  renderAccountFields();
  updateSummary();
  showPage("gameDetailPage");
}

function goBackHome() {
  showPage("homePage");
}

function goBackGames() {
  openCategory(selectedCategory);
}

function goBackDetail() {
  if (selectedGame) openGame(selectedGame.id);
}

document.addEventListener("click", event => {
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    openCategory(categoryButton.dataset.category);
    return;
  }

  const openCategoryButton = event.target.closest("[data-open-category]");
  if (openCategoryButton) {
    openCategory(openCategoryButton.dataset.openCategory);
    return;
  }

  const navButton = event.target.closest("[data-page]");
  if (navButton) {
    const page = navButton.dataset.page;

    if (page === "gamePage") {
      openCategory("game");
    } else {
      showPage(page);
    }
    return;
  }

  if (event.target.closest("[data-back-home]")) {
    goBackHome();
    return;
  }

  if (event.target.closest("[data-back-games]")) {
    goBackGames();
    return;
  }

  if (event.target.closest("[data-back-detail]")) {
    goBackDetail();
    return;
  }

  if (event.target.closest("[data-open-orders]")) {
    showPage("ordersPage");
    renderOrderHistory();
    return;
  }

  if (event.target.closest("[data-open-games]")) {
    openCategory("game");
    return;
  }

  const closeButton = event.target.closest("[data-close-modal]");
  if (closeButton) {
    closeModal(closeButton.dataset.closeModal);
  }
});

/* ==========================================
   BAGIAN 3/8 — RENDER GAME & PENCARIAN
========================================== */

function renderGameCard(game) {
  return `
    <button class="game-card" type="button"
      data-game-id="${escapeHTML(game.id)}">
      <img src="${escapeHTML(game.image)}"
        alt="${escapeHTML(game.name)}"
        loading="lazy"
        onerror="this.src='logo.jpg'">
      <span>${escapeHTML(game.name)}</span>
    </button>
  `;
}

function renderGameList() {
  const grid = $("gameListGrid");
  if (!grid) return;

  const search = ($("gameSearch")?.value || "").trim().toLowerCase();

  const games = CATALOG.filter(game => {
    return game.category === selectedCategory &&
      game.name.toLowerCase().includes(search);
  });

  grid.innerHTML = games.length
    ? games.map(renderGameCard).join("")
    : `<div class="empty-state"><h3>Game tidak ditemukan</h3>
       <p>Coba kata pencarian lain.</p></div>`;
}

function renderPopularGames() {
  const grid = $("popularGameGrid");
  if (!grid) return;

  const popular = CATALOG.filter(game => game.popular);
  grid.innerHTML = popular.map(renderGameCard).join("");
}

document.addEventListener("click", event => {
  const gameCard = event.target.closest("[data-game-id]");
  if (gameCard) openGame(gameCard.dataset.gameId);
});

$("gameSearch")?.addEventListener("input", renderGameList);

/* ==========================================
   BAGIAN 4/8 — SUBKATEGORI, PRODUK & FORM
========================================== */

function getGameProducts(game) {
  if (!game) return {};
  return PRODUCT_DATA[game.id.toLowerCase()] || {};
}

function renderSubcategories() {
  const container = $("subcategoryList");
  if (!container || !selectedGame) return;

  const categories = Object.keys(getGameProducts(selectedGame));

  if (!categories.length) {
    container.innerHTML =
      `<p class="small-note">Daftar produk untuk game ini belum dimasukkan.</p>`;
    return;
  }

  container.innerHTML = `
    <button type="button"
      class="subcategory-button ${selectedSubcategory === "all" ? "active" : ""}"
      data-subcategory="all">Semua</button>
    ${categories.map(name => `
      <button type="button"
        class="subcategory-button ${selectedSubcategory === name ? "active" : ""}"
        data-subcategory="${escapeHTML(name)}">
        ${escapeHTML(name)}
      </button>
    `).join("")}
  `;

  container.querySelectorAll("[data-subcategory]").forEach(button => {
    button.addEventListener("click", () => {
      selectedSubcategory = button.dataset.subcategory;
      renderSubcategories();
      renderProducts();
    });
  });
}

function renderProducts() {
  const container = $("productGrid");
  if (!container || !selectedGame) return;

  const groups = getGameProducts(selectedGame);
  const categoryNames = Object.keys(groups);

  const visibleGroups = selectedSubcategory === "all"
    ? categoryNames
    : categoryNames.filter(name => name === selectedSubcategory);

  const products = visibleGroups.flatMap(category =>
    (groups[category] || []).map(product => ({
      name: product[0],
      price: Number(product[1]),
      category
    }))
  );

  if (!products.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Produk belum tersedia</h3>
        <p>Daftar produk untuk game ini belum dimasukkan ke katalog.</p>
      </div>`;
    return;
  }

  container.innerHTML = products.map((product, index) => `
    <button type="button"
      class="product-card ${selectedProduct?.name === product.name ? "selected" : ""}"
      data-product-index="${index}">
      <strong>${escapeHTML(product.name)}</strong>
      <span class="product-price">${rupiah(product.price)}</span>
      <span class="small-note">${escapeHTML(product.category)}</span>
    </button>
  `).join("");

  container.querySelectorAll("[data-product-index]").forEach(button => {
    button.addEventListener("click", () => {
      selectedProduct = products[Number(button.dataset.productIndex)];
      renderProducts();
      updateSummary();
    });
  });
}

function renderAccountFields() {
  const container = $("gameAccountFields");
  if (!container || !selectedGame) return;

  container.innerHTML = (selectedGame.fields || []).map((field, index) => {
    const [label, type, placeholder] = field;
    const id = `accountField${index}`;

    return `
      <label for="${id}">
        ${escapeHTML(label)}
        <input id="${id}" type="${escapeHTML(type)}"
          placeholder="${escapeHTML(placeholder)}"
          autocomplete="off" required>
      </label>`;
  }).join("");
}

function getAccountData() {
  if (!selectedGame) return null;

  const values = [];
  const fields = selectedGame.fields || [];

  for (let i = 0; i < fields.length; i++) {
    const input = $(`accountField${i}`);
    const value = input?.value.trim() || "";

    if (!value) {
      input?.focus();
      showToast(`Isi ${fields[i][0]} terlebih dahulu.`);
      return null;
    }

    values.push(`${fields[i][0]}: ${value}`);
  }

  return values.join(" | ");
}

/* ==========================================
   BAGIAN 5/8 — RINGKASAN & DISKON
========================================== */

function calculateDiscount(price) {
  if (!discountApplied) return 0;

  if (STORE_CONFIG.discountType === "percent") {
    return Math.min(
      price,
      Math.round(price * STORE_CONFIG.discountValue / 100)
    );
  }

  return Math.min(price, STORE_CONFIG.discountValue);
}

function updateSummary() {
  const price = selectedProduct?.price || 0;
  discountAmount = calculateDiscount(price);
  const total = Math.max(0, price - discountAmount);

  if ($("summaryProduct")) {
    $("summaryProduct").textContent =
      selectedProduct?.name || "Belum dipilih";
  }
  if ($("summaryPrice")) $("summaryPrice").textContent = rupiah(price);
  if ($("summaryDiscount")) $("summaryDiscount").textContent = rupiah(discountAmount);
  if ($("summaryTotal")) $("summaryTotal").textContent = rupiah(total);

  if ($("continueCheckoutButton")) {
    $("continueCheckoutButton").disabled = !selectedProduct;
  }
}

$("applyDiscountButton")?.addEventListener("click", () => {
  const input = $("discountCodeInput");
  const code = (input?.value || "").trim().toUpperCase();

  if (code !== STORE_CONFIG.discountCode.toUpperCase()) {
    discountApplied = false;
    discountAmount = 0;
    if ($("discountMessage")) {
      $("discountMessage").textContent = "Kode diskon tidak valid.";
    }
    updateSummary();
    return;
  }

  if (!selectedProduct) {
    showToast("Pilih produk terlebih dahulu.");
    return;
  }

  discountApplied = true;
  updateSummary();

  if ($("discountMessage")) {
    $("discountMessage").textContent =
      `Kode berhasil digunakan. Potongan ${rupiah(discountAmount)}.`;
  }
});

$("continueCheckoutButton")?.addEventListener("click", () => {
  if (!selectedProduct) {
    showToast("Pilih produk terlebih dahulu.");
    return;
  }

  const account = getAccountData();
  if (!account) return;

  const price = selectedProduct.price;
  const discount = calculateDiscount(price);

  $("checkoutGame").textContent = selectedGame.name;
  $("checkoutProduct").textContent = selectedProduct.name;
  $("checkoutAccount").textContent = account;
  $("checkoutPrice").textContent = rupiah(price);
  $("checkoutDiscountCode").textContent =
    discountApplied ? STORE_CONFIG.discountCode : "-";
  $("checkoutDiscount").textContent = rupiah(discount);
  $("checkoutTotal").textContent = rupiah(price - discount);

  showPage("checkoutPage");
});

/* ==========================================
   BAGIAN 6/8 — PESANAN, QRIS & WHATSAPP
========================================== */

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem("gotopup_orders") || "[]");
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem("gotopup_orders", JSON.stringify(orders));
}

function makeOrderId() {
  return "GOT" + Date.now().toString().slice(-9);
}

$("createOrderButton")?.addEventListener("click", () => {
  if (!selectedGame || !selectedProduct) {
    showToast("Pilih game dan produk terlebih dahulu.");
    return;
  }

  const account = getAccountData();
  if (!account) return;

  const price = selectedProduct.price;
  const discount = calculateDiscount(price);

  currentOrder = {
    id: makeOrderId(),
    date: new Date().toLocaleString("id-ID"),
    game: selectedGame.name,
    product: selectedProduct.name,
    account,
    price,
    discount,
    total: price - discount,
    status: "Menunggu konfirmasi manual"
  };

  const orders = loadOrders();
  orders.unshift(currentOrder);
  saveOrders(orders);

  $("paymentModalInfo").innerHTML = `
    <strong>ID Pesanan:</strong> ${escapeHTML(currentOrder.id)}<br>
    <strong>Game:</strong> ${escapeHTML(currentOrder.game)}<br>
    <strong>Produk:</strong> ${escapeHTML(currentOrder.product)}<br>
    <strong>Total:</strong> ${rupiah(currentOrder.total)}
  `;

  const message = [
    "Halo GOTOPUP.ID, saya ingin konfirmasi pembayaran.",
    `ID Pesanan: ${currentOrder.id}`,
    `Game: ${currentOrder.game}`,
    `Produk: ${currentOrder.product}`,
    `Data Akun: ${currentOrder.account}`,
    `Total: ${rupiah(currentOrder.total)}`,
    "Saya sudah melakukan pembayaran QRIS. Mohon dicek."
  ].join("\n");

  $("paymentWhatsappLink").href =
    `https://wa.me/${STORE_CONFIG.paymentWhatsapp}?text=${encodeURIComponent(message)}`;

  openModal("paymentModal");
  renderOrderHistory();
});

function renderOrderHistory() {
  const container = $("orderHistoryList");
  if (!container) return;

  const orders = loadOrders();

  if (!orders.length) {
    container.innerHTML = `
      <div class="empty-state">
        <span>📋</span>
        <h3>Belum Ada Pesanan</h3>
        <p>Pesanan kamu akan muncul di sini.</p>
      </div>`;
    return;
  }

  container.innerHTML = orders.map(order => `
    <div class="order-history-card">
      <strong>${escapeHTML(order.game)}</strong>
      <p>${escapeHTML(order.product)}</p>
      <p>${escapeHTML(order.id)}</p>
      <p>${rupiah(order.total)}</p>
      <span class="order-status">${escapeHTML(order.status)}</span>
      <p class="small-note">${escapeHTML(order.date)}</p>
    </div>
  `).join("");
}

/* ==========================================
   BAGIAN 7/8 — MODAL, NOTIFIKASI & SLIDER
========================================== */

function openModal(id) {
  const modal = $(id);
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const modal = $(id);
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  const toast = $("toastMessage");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

$("showDiscountInfoButton")?.addEventListener("click", () => {
  openModal("discountInfoModal");
});

$("showStoreInfoButton")?.addEventListener("click", () => {
  openModal("storeInfoModal");
});

$("copyDiscountButton")?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(STORE_CONFIG.discountCode);
    showToast("Kode diskon berhasil disalin.");
  } catch {
    showToast(`Kode diskon: ${STORE_CONFIG.discountCode}`);
  }
});

document.querySelectorAll(".modal-overlay").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal(modal.id);
  });
});

function initBannerSlider() {
  const track = $("bannerTrack");
  const dots = $("bannerDots");
  if (!track || !dots) return;

  const slides = [...track.querySelectorAll(".banner-slide")];
  if (slides.length <= 1) return;

  dots.innerHTML = slides.map((_, index) => `
    <button type="button" class="banner-dot ${index === 0 ? "active" : ""}"
      aria-label="Banner ${index + 1}" data-banner-index="${index}">
    </button>
  `).join("");

  function goToBanner(index) {
    currentBanner = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentBanner * 100}%)`;

    dots.querySelectorAll(".banner-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentBanner);
    });
  }

  dots.addEventListener("click", event => {
    const button = event.target.closest("[data-banner-index]");
    if (!button) return;

    goToBanner(Number(button.dataset.bannerIndex));
    clearInterval(bannerTimer);
    bannerTimer = setInterval(
      () => goToBanner(currentBanner + 1),
      STORE_CONFIG.sliderInterval
    );
  });

  clearInterval(bannerTimer);
  bannerTimer = setInterval(
    () => goToBanner(currentBanner + 1),
    STORE_CONFIG.sliderInterval
  );
}

/* ==========================================
   BAGIAN 8/8 — INISIALISASI
========================================== */

function initStore() {
  renderPopularGames();
  renderOrderHistory();
  initBannerSlider();

  // Pastikan tombol navigasi selalu mengarah ke halaman yang benar.
  document.querySelectorAll(".nav-item").forEach(button => {
    if (button.dataset.page === "gamePage") {
      button.setAttribute("aria-label", "Pilih Game");
    }
  });

  // Link bantuan menggunakan nomor khusus pusat bantuan.
  document.querySelectorAll(
    '.header-help, .floating-help, a[href*="6283130951231"]'
  ).forEach(link => {
    link.href = `https://wa.me/${STORE_CONFIG.helpWhatsapp}`;
  });

  // Link pembayaran memakai nomor khusus konfirmasi pembayaran.
  const paymentLink = $("paymentWhatsappLink");
  if (paymentLink && !currentOrder) {
    paymentLink.href = `https://wa.me/${STORE_CONFIG.paymentWhatsapp}`;
  }
}

document.addEventListener("DOMContentLoaded", initStore);

