
/* ==========================================
   GOTOPUP.ID — SCRIPT.JS
   BAGIAN 1/5 — KONFIGURASI & KATALOG
========================================== */

/* UBAH KODE DISKON DI SINI */
const DISCOUNT_CONFIG = {
  code: "ADMIN TAMPAN1",
  type: "fixed",       // "fixed" = potongan rupiah, "percent" = persen
  value: 1000
};

/* KONFIGURASI TOKO */
const CONFIG = {
  paymentWhatsApp: "628818238236",
  helpWhatsApp: "6283130951231",
  bannerInterval: 3000
};

const money = n => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(Number(n) || 0);

const safe = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
})[c]);

/*
  Format item katalog:
  [id, nama, gambar, kategori, field akun]
  Kategori: game / game-pc / entertainment
*/
const CATALOG = [
  ["freefire","Free Fire","freefire.jpg","game",["Player ID"]],
  ["freefiremax","Free Fire MAX","freefiremax.jpg","game",["Player ID"]],
  ["mobilelegends","Mobile Legends","mobilelegends.jpg","game",["User ID","Zone ID"]],
  ["roblox","Roblox","roblox.jpg","game",["Username"]],
  ["pubg","PUBG Mobile","pubg.jpg","game",["Character ID"]],
  ["magicchess","Magic Chess GoGo","magicchesgogo.jpg","game",["User ID","Zone ID"]],
  ["honorofkings","Honor of Kings","honorofkings.jpg","game",["Player ID"]],
  ["bloodstrike","Blood Strike","bloodstrike.jpg","game",["Player ID"]],
  ["footballmaster2","Football Master 2","footballmaster2.jpg","game",["Player ID"]],
  ["footballdreams","Football Dreams: Be A Pro","footballdreamsbeapro.jpg","game",["Player ID"]],
  ["ragnarokclassic","Ragnarok M Classic","ragnarokmclasic.jpg","game",["User ID"]],
  ["zepeto","Zepeto","zepeto.jpg","game",["ZEPETO ID"]],
  ["kingofavalon","King of Avalon","kingofavalon.jpg","game",["Player ID"]],
  ["undawn","Undawn","undawn.jpg","game",["Character ID"]],
  ["metalslug","Metal Slug Awakening","metalslugawakening.jpg","game",["Player ID"]],
  ["captaintsubasa","Captain Tsubasa Ace","captaintsubasaace.jpg","game",["Player ID"]],
  ["betheking","Be The King","bethekingjudgedestiny.jpg","game",["User ID"]],
  ["topeleven","Top Eleven","topeleven.jpg","game",["Manager ID"]],
  ["cloudsong","Cloud Song Saga of Skywalkers","cloudsongsagaofskywalkers.jpg","game",["User ID"]],
  ["harrypotter","Harry Potter Magic Awakened","harrypottermagicawakened.jpg","game",["Player ID"]],
  ["aov","Arena of Valor","arenaofvalor.jpg","game",["Player ID"]],
  ["afkjourney","AFK Journey","afkjourney.jpg","game",["Player ID"]],
  ["racingmaster","Racing Master","racingmaster.jpg","game",["Player ID"]],
  ["onmyoji","Onmyoji Arena","onmyojiarena.jpg","game",["Player ID"]],
  ["muorigin2","MU Origin 2","muorigin2.jpg","game",["User ID"]],
  ["mobrush","MOB RUSH","mobrush.jpg","game",["Player ID"]],
  ["muorigin3","MU Origin 3 SEA","muorigin3.jpg","game",["User ID"]],
  ["identityv","Identity V","identityv.jpg","game",["Player ID"]],
  ["legacyfate","Legacy Fate Sacred and Fearless","legacyfatesacredandfearless.jpg","game",["Player ID"]],
  ["rainbowsix","Rainbow Six Mobile","rainbowsixmobile.jpg","game",["Player ID"]],
  ["codm","Call of Duty Mobile ID","callofduty.jpg","game",["Open ID"]],
  ["snowbreak","Snowbreak Containment Zone","snowbreakcontaimentzone.jpg","game",["Player ID"]],
  ["honkaiimpact","Honkai Impact 3","honkaiimpact3.jpg","game",["Captain ID"]],
  ["pathtonowhere","Path to Nowhere","pathtonowhere.jpg","game",["Player ID"]],
  ["heavenburnsred","Heaven Burns Red","heavenburnsred.jpg","game",["Player ID"]],
  ["arenabreakout","Arena Breakout","arenabreakout.jpg","game",["Player ID"]],
  ["lifeafter","LifeAfter","lifeafter.jpg","game",["Character ID"]],
  ["loveanddeepspace","Love and Deepspace","loveanddeepspace.jpg","game",["Player ID"]],
  ["watcherofrealms","Watcher of Realms","watcherofrealms.jpg","game",["Player ID"]],
  ["hsr","Honkai Star Rail","honkaistarrail.jpg","game",["UID","Server"]],
  ["zzz","Zenless Zone Zero","zenlesszonezero.jpg","game",["UID","Server"]],
  ["speeddrifters","Speed Drifters","speeddrifters.jpg","game",["Player ID"]],
  ["tamashi","Tamashi Rise of Yokai","tamashiriseofyokai.jpg","game",["Player ID"]],
  ["marvelduel","Marvel Duel","marvelduel.jpg","game",["Player ID"]],
  ["ghoststory","Ghost Story Love Destiny","ghoststorylovedestiny.jpg","game",["Player ID"]],
  ["ragnarokorigin","Ragnarok Origin","ragnarokorigin.jpg","game",["User ID"]],
  ["stateofsurvival","State of Survival","stateofsurvival.jpg","game",["Player ID"]],
  ["tft","Teamfight Tactics Mobile","teamfighttacticsmobile.jpg","game",["Riot ID"]],
  ["genshin","Genshin Impact","genshinimpact.jpg","game",["UID","Server"]],
  ["lotr","Lord of the Rings Rise to War","thelordoftheringsrisetowar.jpg","game",["Player ID"]],
  ["ragnarokx","Ragnarok X Next Generation","ragnarokxnextgeneration.jpg","game",["User ID"]],
  ["onepunch","One Punch Man The Strongest","onepunchmanthestrongest.jpg","game",["User ID"]],
  ["wildrift","League of Legends Wild Rift","leagueoflegends.jpg","game",["Riot ID"]],
  ["growtopia","Growtopia","growtopia.jpg","game",["GrowID"]],
  ["tomjerry","Tom and Jerry Chase","tomandjerrychase.jpg","game",["Player ID"]],
  ["hago","Hago","hago.jpg","game",["Hago ID"]],
  ["pgr","Punishing Gray Raven","punishinggreyraven.jpg","game",["User ID"]],
  ["pixelgun","Pixel Gun 3D","pixelgun3d.jpg","game",["Player ID"]],
  ["astraknight","Astra Knights of Veda","astraknightsofveda.jpg","game",["Player ID"]],
  ["mushroom","Legend of Mushroom Rush","leagueofmushroomrush.jpg","game",["Player ID"]],
  ["heroickim","Heroic Uncle Kim","heroicunclekim.jpg","game",["Player ID"]],
  ["totalfootball","Total Football","totalfootball.jpg","game",["Player ID"]],

  ["valorant","Valorant","valorant.jpg","game-pc",["Riot ID"]],
  ["deltaforce","Delta Force","deltaforce.jpg","game-pc",["Player ID"]],
  ["pointblank","Point Blank","pointblank.jpg","game-pc",["User ID"]],
  ["lor","Legends of Runeterra","legendsofruneterra.jpg","game-pc",["Riot ID"]],
  ["lolpc","League of Legends PC","leagueoflegends.jpg","game-pc",["Riot ID"]],
  ["marvelrivals","Marvel Rivals","marvelrivals.jpg","game-pc",["Player ID"]],

  ["poppo","Poppo Live","logo.jpg","entertainment",["User ID"]],
  ["bigo","Bigo Live","bigolive.jpg","entertainment",["User ID"]],
  ["chamet","Chamet","chamet.jpg","entertainment",["User ID"]],
  ["wesing","WeSing","wesing.jpg","entertainment",["User ID"]],
  ["sugo","Sugo Voice Live Chat Party","sugo.jpg","entertainment",["User ID"]],
  ["lita","Lita","lita.jpg","entertainment",["User ID"]],
  ["livu","Livu","livu.jpg","entertainment",["User ID"]],
  ["likee","Likee","likee.jpg","entertainment",["Likee ID"]],
  ["starmaker","StarMaker","starmaker.jpg","entertainment",["User ID"]],
  ["wetv","WeTV","weetv.jpg","entertainment",["Email"]],
  ["vidio","Vidio","weetv.jpg","entertainment",["Email"]]
];

/* ==========================================
   BAGIAN 2/5 — DATA PRODUK
========================================== */

/*
  Tiap game punya subkategori sendiri.
  Format produk: ["Nama produk", harga angka]
  Harga dalam rupiah, tanpa titik.
*/
const PRODUCTS = {
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

  freefiremax: {
    "Diamond": [
      ["5 Diamonds",984],["10 Diamonds",1862],["12 Diamonds",1970],
      ["20 Diamonds",3618],["25 Diamonds",4997],["30 Diamonds",5661],
      ["50 Diamonds",7650],["55 Diamonds",7960],["70 Diamonds",9250],
      ["80 Diamonds",12254],["100 Diamonds",14480],["120 Diamonds",18132],
      ["130 Diamonds",19291],["140 Diamonds",18850],["145 Diamonds",21067],
      ["150 Diamonds",22049],["190 Diamonds",27926],["200 Diamonds",29885],
      ["210 Diamonds",30326],["280 Diamonds",39679],["355 Diamonds",47350],
      ["420 Diamonds",58866],["425 Diamonds",59771],["475 Diamonds",67607],
      ["495 Diamonds",69565],["500 Diamonds",70543],["510 Diamonds",72503],
      ["545 Diamonds",77401],["565 Diamonds",79360],["600 Diamonds",86218],
      ["635 Diamonds",89154],["720 Diamonds",96000],["800 Diamonds",109106],
      ["860 Diamonds",118540],["930 Diamonds",128335],["1000 Diamonds",129800],
      ["1050 Diamonds",146950],["1075 Diamonds",156000],["1080 Diamonds",152909],
      ["1440 Diamonds",204000],["1450 Diamonds",205000],["2160 Diamonds",303000],
      ["2180 Diamonds",305000],["7290 Diamonds",925000],["36500 Diamonds",5005000],
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
    "Weekly Pass & Bundle": [
      ["Weekly Diamond Pass",30490],["WDP x2",62990],["WDP x3",93990],
      ["Weekly Elite Bundle",17317],["Monthly Epic Bundle",84884]
    ],
    "2x First Recharge": [
      ["100 (50+50)",17317],["300 (150+150)",50751],
      ["500 (250+250)",84884],["1000 (500+500)",169759]
    ],
    "Top Up Global": [
      ["WDP",36551],["WDP Global",40141],["Twilight Pass",175318],
      ["Twilight Pass Global",203960],["11 Diamonds",3520],
      ["22 Diamonds",6939],["70 Diamonds",23616],["223 Diamonds",69401],
      ["336 Diamonds",103600],["570 Diamonds",176002],["1163 Diamonds",347000],
      ["2398 Diamonds",694004],["6042 Diamonds",1715008],["140 Diamonds",46685],
      ["Weekly Elite Bundle",17317],["Monthly Epic Bundle",84884]
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

  vidio: {
    "Vidio Ultimate": [
      ["Ultimate All Screen 1 Tahun",1379500],["Ultimate Mobile 30 Hari",105500],
      ["Ultimate Mobile 1 Tahun",765500],["Ultimate All Screen 30 Hari",200500],
      ["Ultimate Mobile 3 Bulan",263658]
    ],
    "Vidio Platinum": [
      ["Platinum 30 Hari",54500],["Platinum Extra 30 Hari",76500],
      ["Platinum 3 Bulan",118500],["Platinum Extra 3 Bulan",187500],
      ["Platinum 1 Tahun",398500],["Platinum Extra 1 Tahun",553500]
    ]
  },

  weetv: {
    "WeTV VIP": [["12 Months VIP",476200]]
  },

  poppo: {
    "Coins": [
      ["1.000 Coins",2684],["7.000 Coins",15190],["21.000 Coins",44570],
      ["25.500 Coins",54099],["43.500 Coins",92412],["43.750 Coins",93008],
      ["70.000 Coins",147401],["83.000 Coins",175391],["88.000 Coins",186310],
      ["88.990 Coins",188493],["178.000 Coins",376487],["180.000 Coins",381053],
      ["210.000 Coins",441203],["270.000 Coins",571230],["273.000 Coins",577185],
      ["252.000 Coins",732225],["350.000 Coins",735004],["430.000 Coins",911285],
      ["450.000 Coins",950988],["455.000 Coins",962701],["700.000 Coins",1469509],
      ["1.050.000 Coins",2204013],["1.400.000 Coins",2938517],
      ["1.750.000 Coins",3673022],["2.100.000 Coins",4407526],
      ["2.450.000 Coins",5142030],["2.800.000 Coins",5876535],
      ["3.150.000 Coins",6611039],["3.500.000 Coins",7345544],
      ["4.200.000 Coins",8814552],["4.900.000 Coins",10283561],
      ["5.600.000 Coins",11752570],["6.300.000 Coins",13221578],
      ["7.000.000 Coins",14690587],["8.750.000 Coins",18363109],
      ["10.500.000 Coins",22035631],["12.250.000 Coins",25708152],
      ["14.000.000 Coins",29380674],["15.750.000 Coins",33053196],
      ["17.500.000 Coins",36725718],["19.250.000 Coins",40398239],
      ["21.000.000 Coins",44070761],["24.500.000 Coins",51415805],
      ["28.000.000 Coins",58760848],["31.500.000 Coins",66105892],
      ["35.000.000 Coins",73450935]
    ]
  },

  bigo: {
    "Diamonds": [
      ["25 Diamonds",9495],["50 Diamonds",18489],["100 Diamonds",36478],
      ["150 Diamonds",54672],["200 Diamonds",72661],["250 Diamonds",90650],
      ["300 Diamonds",108639],["500 Diamonds",180799],["750 Diamonds",270949],
      ["1000 Diamonds",361098],["2000 Diamonds",721492],["3000 Diamonds",1082091],
      ["4000 Diamonds",1442485],["5000 Diamonds",1803083],
      ["7500 Diamonds",2704375],["10000 Diamonds",3605666],
      ["20000 Diamonds",7210832],["30000 Diamonds",10815999],
      ["50000 Diamonds",18026331]
    ]
  },

  chamet: {
    "Diamonds": [
      ["18.750 Diamonds",60488],["62.500 Diamonds",200804],
      ["187.500 Diamonds",600385],["625.000 Diamonds",2003540],
      ["1.875.000 Diamonds",5999348],["3.750.000 Diamonds",11987924],
      ["6.250.000 Diamonds",20030900]
    ]
  },

  wesing: {
    "Kcoins": [
      ["37 Kcoins",10400],["112 Kcoins",30100],["373 Kcoins",99100],
      ["933 Kcoins",247000],["1866 Kcoins",493400],
      ["3731 Kcoins",986300],["5597 Kcoins",1479000]
    ]
  },

  sugo: {
    "Coins": [
      ["1.200 Coins",20738],["2.400 Coins",41180],["6.250 Coins",102506],
      ["12.500 Coins",204716],["37.500 Coins",613558],
      ["65.000 Coins",1022400],["130.000 Coins",2044504]
    ]
  },

  lita: {
    "Coins": [
      ["300 Coins",39688],["600 Coins",78877],["1.000 Coins",130195],
      ["2.000 Coins",259889],["5.000 Coins",648973],["10.000 Coins",1296514]
    ]
  },

  livu: {
    "Coins": [
      ["299 Coins",54716],["650 Coins",90896],["990 Coins",145004],
      ["2500 Coins",325148],["5000 Coins",627332],["10000 Coins",1166360],
      ["20000 Coins",2268716],["50000 Coins",5388188]
    ]
  },

  likee: {
    "Diamonds": [
      ["100 Diamonds",36277],["200 Diamonds",72053],["500 Diamonds",178991],
      ["1000 Diamonds",357481],["1500 Diamonds",535972],["2000 Diamonds",714461],
      ["2500 Diamonds",892952],["3000 Diamonds",1071442],["3500 Diamonds",1249933],
      ["4000 Diamonds",1428423],["4500 Diamonds",1606914],["5000 Diamonds",1785206],
      ["10000 Diamonds",3569914],["20000 Diamonds",7139328]
    ]
  },

  starmaker: {
    "Global Coins + Bonus": [
      ["60+5 Coins",13500],["420+40 Coins",91700],["300+25 Coins",65600],
      ["600+60 Coins",130800],["1000+110 Coins",219500],
      ["1200+150 Coins",266500],["1600+200 Coins",355200],
      ["2100+300 Coins",472600],["2700+400 Coins",608200],
      ["3000+450 Coins",677400],["3400+550 Coins",775200],
      ["5000+850 Coins",1147000],["6000+1100 Coins",1387000],
      ["6500+1200 Coins",1503100],["7000+1300 Coins",1616600],
      ["10000+1900 Coins",2315700],["14000+2800 Coins",3261500]
    ]
  }
};

/* ==========================================
   BAGIAN 3/5 — RENDER BERANDA & DAFTAR
========================================== */

let currentPage = "homePage";
let currentCategory = "game";
let currentGame = null;
let currentProduct = null;
let currentSubcategory = "all";
let currentFilter = "all";
let discountIsActive = false;
let currentOrder = null;
let bannerIndex = 0;
let bannerInterval = null;

const byId = id => document.getElementById(id);

function findGame(id) {
  return CATALOG.find(item => item[0] === id);
}

function gameCard(item) {
  const [id, name, image] = item;
  return `
    <button class="game-card" type="button" data-game-id="${safe(id)}">
      <img src="${safe(image)}" alt="${safe(name)}"
        loading="lazy" onerror="this.onerror=null;this.src='logo.jpg'">
      <span>${safe(name)}</span>
    </button>`;
}

function renderHome() {
  const gameGrid = byId("homeGameGrid");
  const pcGrid = byId("homePcGrid");
  const entertainmentGrid = byId("homeEntertainmentGrid");

  if (gameGrid) {
    gameGrid.innerHTML = CATALOG
      .filter(item => item[3] === "game")
      .map(gameCard).join("");
  }

  if (pcGrid) {
    pcGrid.innerHTML = CATALOG
      .filter(item => item[3] === "game-pc")
      .map(gameCard).join("");
  }

  if (entertainmentGrid) {
    entertainmentGrid.innerHTML = CATALOG
      .filter(item => item[3] === "entertainment")
      .map(gameCard).join("");
  }
}

function categoryTitle(category) {
  return {
    "game": ["Game", "Pilih game favorit kamu"],
    "game-pc": ["Game PC", "Pilih game PC yang ingin kamu top up"],
    "entertainment": ["Entertainment", "Pilih layanan hiburan dan digital"]
  }[category] || ["Game", "Pilih produk"];
}

function openCategory(category) {
  currentCategory = category;
  currentFilter = "all";

  const [title, description] = categoryTitle(category);
  byId("gamePageTitle").textContent = title;
  byId("gamePageDescription").textContent = description;
  byId("gameSearch").value = "";

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.classList.toggle(button.dataset.filter === "all" ? "active" : "", button.dataset.filter === "all");
  });

  renderListing();
  showPage("gamePage");
}

function renderListing() {
  const search = (byId("gameSearch")?.value || "").trim().toLowerCase();

  const items = CATALOG.filter(item => {
    const matchesCategory = item[3] === currentCategory;
    const matchesSearch = item[1].toLowerCase().includes(search);
    const matchesFilter = currentFilter === "all" ||
      (currentFilter === "popular" && [
        "freefire","freefiremax","mobilelegends","roblox",
        "pubg","valorant","magicchess"
      ].includes(item[0]));
    return matchesCategory && matchesSearch && matchesFilter;
  });

  byId("gameListGrid").innerHTML = items.length
    ? items.map(gameCard).join("")
    : `<div class="empty-state"><h3>Belum ditemukan</h3>
       <p>Coba kata pencarian lain.</p></div>`;
}

byId("gameSearch").addEventListener("input", renderListing);

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(item =>
      item.classList.toggle("active", item === button)
    );
    renderListing();
  });
});

/* ==========================================
   NAVIGASI ANTAR HALAMAN
========================================== */

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === pageId);
  });

  currentPage = pageId;

  document.querySelectorAll(".nav-item").forEach(button => {
    const page = button.dataset.page;
    const active = page === pageId ||
      (page === "gamePage" && pageId === "gameDetailPage") ||
      (page === "gamePage" && pageId === "checkoutPage");
    button.classList.toggle("active", active);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", event => {
  const categoryButton = event.target.closest("[data-open-category]");
  if (categoryButton) {
    openCategory(categoryButton.dataset.openCategory);
    return;
  }

  const gameButton = event.target.closest("[data-game-id]");
  if (gameButton) {
    openGame(gameButton.dataset.gameId);
    return;
  }

  const navButton = event.target.closest(".nav-item");
  if (navButton) {
    const page = navButton.dataset.page;
    if (page === "gamePage") openCategory("game");
    else {
      showPage(page);
      if (page === "ordersPage") renderOrders();
    }
    return;
  }

  if (event.target.closest("[data-back-home]")) {
    showPage("homePage");
  }

  if (event.target.closest("[data-back-games]")) {
    openCategory(currentCategory);
  }

  if (event.target.closest("[data-back-detail]")) {
    if (currentGame) openGame(currentGame[0]);
  }

  if (event.target.closest("[data-open-orders]")) {
    renderOrders();
    showPage("ordersPage");
  }

  if (event.target.closest("[data-open-games]")) {
    openCategory("game");
  }
});
       
/* ==========================================
   BAGIAN 4/5 — DETAIL GAME & PRODUK
========================================== */

function openGame(id) {
  const item = findGame(id);
  if (!item) return;

  currentGame = item;
  currentProduct = null;
  currentSubcategory = "all";
  discountIsActive = false;

  byId("detailGameTitle").textContent = item[1];
  byId("detailGameName").textContent = item[1];
  byId("detailGameImage").src = item[2];
  byId("detailGameImage").alt = item[1];
  byId("detailGameDescription").textContent =
    "Pilih subkategori dan produk yang ingin kamu beli";

  renderAccountFields();
  renderSubcategories();
  renderProducts();
  updateSummary();
  showPage("gameDetailPage");
}

function getProductGroups() {
  if (!currentGame) return {};
  return PRODUCTS[currentGame[0]] || {};
}

function renderAccountFields() {
  const fields = currentGame?.[4] || [];
  byId("gameAccountFields").innerHTML = fields.map((name, index) => `
    <label>
      ${safe(name)}
      <input id="account-${index}" type="text"
        placeholder="Masukkan ${safe(name)}" autocomplete="off" required>
    </label>
  `).join("");
}

function readAccountFields() {
  const fields = currentGame?.[4] || [];
  const values = [];

  for (let index = 0; index < fields.length; index++) {
    const input = byId(`account-${index}`);
    const value = input?.value.trim() || "";

    if (!value) {
      input?.focus();
      toast(`Isi ${fields[index]} terlebih dahulu.`);
      return null;
    }
    values.push(`${fields[index]}: ${value}`);
  }

  return values.join(" | ");
}

function renderSubcategories() {
  const groups = getProductGroups();
  const names = Object.keys(groups);
  const container = byId("subcategoryList");

  if (!names.length) {
    container.innerHTML =
      `<span class="small-note">Produk untuk layanan ini belum tersedia.</span>`;
    return;
  }

  const buttons = ["all", ...names];
  container.innerHTML = buttons.map(name => `
    <button class="subcategory-button ${currentSubcategory === name ? "active" : ""}"
      type="button" data-subcategory="${safe(name)}">
      ${name === "all" ? "Semua" : safe(name)}
    </button>
  `).join("");

  container.querySelectorAll("[data-subcategory]").forEach(button => {
    button.addEventListener("click", () => {
      currentSubcategory = button.dataset.subcategory;
      renderSubcategories();
      renderProducts();
    });
  });
}

function renderProducts() {
  const groups = getProductGroups();
  const names = Object.keys(groups);
  const visibleNames = currentSubcategory === "all"
    ? names
    : names.filter(name => name === currentSubcategory);

  const products = visibleNames.flatMap(group =>
    (groups[group] || []).map(product => ({
      name: product[0],
      price: Number(product[1]),
      group
    }))
  );

  const container = byId("productGrid");

  if (!products.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Produk belum tersedia</h3>
        <p>Daftar harga untuk ${safe(currentGame[1])} belum dimasukkan.</p>
      </div>`;
    return;
  }

  container.innerHTML = products.map((product, index) => `
    <button type="button"
      class="product-card ${currentProduct?.name === product.name ? "selected" : ""}"
      data-product-index="${index}">
      <strong>${safe(product.name)}</strong>
      <span class="product-price">${money(product.price)}</span>
      <small class="small-note">${safe(product.group)}</small>
    </button>
  `).join("");

  container.querySelectorAll("[data-product-index]").forEach(button => {
    button.addEventListener("click", () => {
      currentProduct = products[Number(button.dataset.productIndex)];
      renderProducts();
      updateSummary();
    });
  });
}

/* ==========================================
   KODE DISKON & RINGKASAN
========================================== */

function getDiscount(price) {
  if (!discountIsActive || !currentProduct) return 0;

  if (DISCOUNT_CONFIG.type === "percent") {
    return Math.min(price, Math.round(price * DISCOUNT_CONFIG.value / 100));
  }

  return Math.min(price, DISCOUNT_CONFIG.value);
}

function updateSummary() {
  const price = currentProduct?.price || 0;
  const discount = getDiscount(price);

  byId("summaryProduct").textContent = currentProduct?.name || "Belum dipilih";
  byId("summaryPrice").textContent = money(price);
  byId("summaryDiscount").textContent = money(discount);
  byId("summaryTotal").textContent = money(price - discount);
  byId("continueCheckoutButton").disabled = !currentProduct;
}

byId("applyDiscountButton").addEventListener("click", () => {
  const code = byId("discountCodeInput").value.trim().toUpperCase();

  if (!currentProduct) {
    toast("Pilih produk terlebih dahulu.");
    return;
  }

  if (code !== DISCOUNT_CONFIG.code.toUpperCase()) {
    discountIsActive = false;
    byId("discountMessage").textContent = "Kode diskon tidak valid.";
    updateSummary();
    return;
  }

  discountIsActive = true;
  updateSummary();
  byId("discountMessage").textContent =
    `Kode berhasil digunakan. Potongan ${money(getDiscount(currentProduct.price))}.`;
});

byId("continueCheckoutButton").addEventListener("click", () => {
  if (!currentProduct || !currentGame) return;

  const account = readAccountFields();
  if (!account) return;

  const discount = getDiscount(currentProduct.price);
  const total = currentProduct.price - discount;

  byId("checkoutGame").textContent = currentGame[1];
  byId("checkoutProduct").textContent = currentProduct.name;
  byId("checkoutAccount").textContent = account;
  byId("checkoutPrice").textContent = money(currentProduct.price);
  byId("checkoutDiscountCode").textContent =
    discountIsActive ? DISCOUNT_CONFIG.code : "-";
  byId("checkoutDiscount").textContent = money(discount);
  byId("checkoutTotal").textContent = money(total);

  showPage("checkoutPage");
});

/* ==========================================
   BAGIAN 5/5 — PESANAN & PENYIMPANAN LOKAL
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

function toast(message) {
  const element = byId("toastMessage");
  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove("show"), 2600);
}

function openModal(id) {
  const modal = byId(id);
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const modal = byId(id);
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", event => {
  const close = event.target.closest("[data-close-modal]");
  if (close) closeModal(close.dataset.closeModal);

  if (event.target.classList.contains("modal-overlay")) {
    closeModal(event.target.id);
  }
});

byId("createOrderButton").addEventListener("click", () => {
  if (!currentGame || !currentProduct) {
    toast("Pilih produk terlebih dahulu.");
    return;
  }

  const account = readAccountFields();
  if (!account) return;

  const discount = getDiscount(currentProduct.price);
  const total = currentProduct.price - discount;

  currentOrder = {
    id: "GOT" + Date.now(),
    date: new Date().toLocaleString("id-ID"),
    game: currentGame[1],
    product: currentProduct.name,
    account,
    price: currentProduct.price,
    discount,
    total,
    status: "Menunggu konfirmasi manual"
  };

  const orders = loadOrders();
  orders.unshift(currentOrder);
  saveOrders(orders);

  byId("paymentModalInfo").innerHTML = `
    <strong>ID Pesanan:</strong> ${safe(currentOrder.id)}<br>
    <strong>Game:</strong> ${safe(currentOrder.game)}<br>
    <strong>Produk:</strong> ${safe(currentOrder.product)}<br>
    <strong>Total:</strong> ${money(currentOrder.total)}
  `;

  const message = [
    "Halo GOTOPUP.ID, saya ingin konfirmasi pembayaran.",
    `ID Pesanan: ${currentOrder.id}`,
    `Game: ${currentOrder.game}`,
    `Produk: ${currentOrder.product}`,
    `Data akun: ${currentOrder.account}`,
    `Total: ${money(currentOrder.total)}`,
    "Saya sudah melakukan pembayaran QRIS. Mohon dicek."
  ].join("\n");

  byId("paymentWhatsappLink").href =
    `https://wa.me/${CONFIG.paymentWhatsApp}?text=${encodeURIComponent(message)}`;

  renderOrders();
  openModal("paymentModal");
});

function renderOrders() {
  const container = byId("orderHistoryList");
  if (!container) return;

  const orders = loadOrders();

  container.innerHTML = orders.length
    ? orders.map(order => `
      <article class="order-history-card">
        <strong>${safe(order.game)}</strong>
        <p>${safe(order.product)}</p>
        <p>ID: ${safe(order.id)}</p>
        <strong>${money(order.total)}</strong>
        <p class="order-status">${safe(order.status)}</p>
        <small class="small-note">${safe(order.date)}</small>
      </article>
    `).join("")
    : `<div class="empty-state">
        <h3>Belum Ada Pesanan</h3>
        <p>Pesanan kamu akan muncul di sini.</p>
      </div>`;
}

/* ==========================================
   INFO DISKON & INFORMASI TOKO
========================================== */

byId("showDiscountInfoButton").addEventListener("click", () => {
  byId("discountCodeDisplay").textContent = DISCOUNT_CONFIG.code;
  openModal("discountInfoModal");
});

byId("copyDiscountButton").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(DISCOUNT_CONFIG.code);
    toast("Kode diskon berhasil disalin.");
  } catch {
    toast(`Kode diskon: ${DISCOUNT_CONFIG.code}`);
  }
});

byId("showStoreInfoButton").addEventListener("click", () => {
  openModal("storeInfoModal");
});

/* ==========================================
   SLIDER BANNER OTOMATIS
========================================== */

function initSlider() {
  const track = byId("bannerTrack");
  const dots = byId("bannerDots");
  if (!track || !dots) return;

  const slides = [...track.querySelectorAll(".banner-slide")];
  if (slides.length < 2) return;

  dots.innerHTML = slides.map((_, index) => `
    <button type="button"
      class="banner-dot ${index === 0 ? "active" : ""}"
      data-dot="${index}" aria-label="Banner ${index + 1}">
    </button>
  `).join("");

  function moveTo(index) {
    bannerIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${bannerIndex * 100}%)`;

    dots.querySelectorAll(".banner-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === bannerIndex);
    });
  }

  dots.addEventListener("click", event => {
    const button = event.target.closest("[data-dot]");
    if (!button) return;

    moveTo(Number(button.dataset.dot));
    clearInterval(bannerInterval);
    bannerInterval = setInterval(
      () => moveTo(bannerIndex + 1),
      CONFIG.bannerInterval
    );
  });

  clearInterval(bannerInterval);
  bannerInterval = setInterval(
    () => moveTo(bannerIndex + 1),
    CONFIG.bannerInterval
  );
}

/* ==========================================
   MULAI TOKO
========================================== */

function initStore() {
  renderHome();
  renderOrders();
  initSlider();

  byId("discountCodeDisplay").textContent = DISCOUNT_CONFIG.code;

  document.querySelectorAll(".help-button, .floating-help").forEach(link => {
    link.href = `https://wa.me/${CONFIG.helpWhatsApp}`;
  });
}

document.addEventListener("DOMContentLoaded", initStore);
