// ==========================================
// GOTOPUP.ID - PENGATURAN TOKO
// ==========================================

const STORE_CONFIG = {
  name: "GOTOPUP.ID",

  discountCode: "TAMPAN1",
  discountType: "percent",
  discountValue: 5,

  emergencyWhatsApp: "08818238236",
  paymentWhatsApp: "083130951231",

  bannerInterval: 3000,

  currency: "IDR"
};

// ==========================================
// CATATAN:
// Kode diskon 5% adalah contoh pengaturan.
// Ubah discountValue jika ingin mengganti.
// ==========================================

let currentDiscount = 0;
let selectedGame = null;
let selectedProduct = null;
let selectedCategory = "all";
let selectedFilter = "all";
let currentOrder = null;

const orders = [];

function formatRupiah(value) {
  return "Rp" + Number(value).toLocaleString("id-ID");
}
// ==========================================
// DATABASE PRODUK GOTOPUP.ID
// ==========================================

const CATALOG = {

  "Free Fire": {
    image: "freefire.jpg",
    category: "game",
    popular: true,
    fields: [
      {name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}
    ],
    tabs: ["Diamonds","Membership"],
    products: []
  },

  "Free Fire MAX": {
    image: "freefiremax.jpg",
    category: "game",
    popular: true,
    fields: [
      {name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}
    ],
    tabs: ["Diamonds","Membership"],
    products: []
  },

  "Mobile Legends": {
    image: "mobilelegends.jpg",
    category: "game",
    popular: true,
    fields: [
      {name:"userId",label:"User ID",placeholder:"User ID",required:true},
      {name:"server",label:"Server ID",placeholder:"Server ID",required:true}
    ],
    tabs: [
      "Diamonds",
      "Weekly Diamond Pass & Bundle",
      "2X First Recharge",
      "Top Up Global",
      "Starlight"
    ],
    products: []
  },

  "Roblox": {
    image: "roblox.jpg",
    category: "game",
    popular: true,
    fields: [
      {name:"username",label:"Username Roblox",placeholder:"Masukkan username",required:true}
    ],
    tabs: ["Robux"],
    products: []
  },

  "PUBG Mobile": {
    image: "pubg.jpg",
    category: "game",
    popular: true,
    fields: [
      {name:"userId",label:"Character ID",placeholder:"Masukkan Character ID",required:true}
    ],
    tabs: ["UC"],
    products: []
  },

  "Valorant": {
    image: "valorant.jpg",
    category: "game",
    popular: true,
    fields: [
      {name:"riotId",label:"Riot ID",placeholder:"Nama#Tag",required:true},
      {name:"region",label:"Region",placeholder:"Pilih region",type:"select",options:["Indonesia","Asia Pacific","Other"],required:true}
    ],
    tabs: ["VP"],
    products: []
  },

  "Magic Chess GoGo": {
    image: "magicchesgogo.jpg",
    category: "game",
    fields: [
      {name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true},
      {name:"server",label:"Server",placeholder:"Masukkan Server",required:true}
    ],
    tabs: ["Diamonds","2X Recharge Bonus","Latest Bounty"],
    products: []
  }

};
// ==========================================
// DAFTAR GAME TAMBAHAN
// ==========================================

const GAME_IMAGES = {
  "Honor of Kings":"honorofkings.jpg",
  "Blood Strike":"bloodstrike.jpg",
  "Football Master 2":"footballmaster2.jpg",
  "Football Dreams: Be A Pro":"footballdreamsbeapro.jpg",
  "Ragnarok M: Classic":"ragnarokmclasic.jpg",
  "Zepeto":"zepeto.jpg",
  "King of Avalon":"kingofavalon.jpg",
  "Undawn":"undawn.jpg",
  "Metal Slug: Awakening":"metalslugawakening.jpg",
  "Captain Tsubasa: Ace":"captaintsubasaace.jpg",
  "Be The King: Judge Destiny":"bethekingjudgedestiny.jpg",
  "Top Eleven":"topeleven.jpg",
  "Delta Force":"deltaforce.jpg",
  "Cloud Song: Saga of Skywalkers":"cloudsongsagaofskywalkers.jpg",
  "Harry Potter: Magic Awakened":"harrypottermagicawakened.jpg",
  "Arena of Valor":"arenaofvalor.jpg",
  "AFK Journey":"afkjourney.jpg",
  "Racing Master":"racingmaster.jpg",
  "Onmyoji Arena":"onmyojiarena.jpg",
  "MU Origin 2":"muorigin2.jpg",
  "MOB RUSH":"mobrush.jpg",
  "MU Origin 3":"muorigin3.jpg",
  "Identity V":"identityv.jpg",
  "Legacy Fate: Sacred and Fearless":"legacyfatesacredandfearless.jpg",
  "Rainbow Six Mobile":"rainbowsixmobile.jpg",
  "Call of Duty Mobile":"callofduty.jpg",
  "Snowbreak: Containment Zone":"snowbreakcontaimentzone.jpg",
  "Honkai Impact 3":"honkaiimpact3.jpg",
  "Path to Nowhere":"pathtonowhere.jpg",
  "Heaven Burns Red":"heavenburnsred.jpg",
  "Arena Breakout":"arenabreakout.jpg",
  "Legends of Runeterra":"legendsofruneterra.jpg",
  "LifeAfter":"lifeafter.jpg",
  "Love and Deepspace":"loveanddeepspace.jpg",
  "Watcher of Realms":"watcherofrealms.jpg",
  "Honkai: Star Rail":"honkaistarrail.jpg",
  "Zenless Zone Zero":"zenlesszonezero.jpg",
  "Speed Drifters":"speeddrifters.jpg",
  "Tamashi: Rise of Yokai":"tamashiriseofyokai.jpg",
  "Marvel Duel":"marvelduel.jpg",
  "Ghost Story: Love Destiny":"ghoststorylovedestiny.jpg",
  "Ragnarok Origin":"ragnarokorigin.jpg",
  "State of Survival":"stateofsurvival.jpg",
  "Teamfight Tactics Mobile":"teamfighttacticsmobile.jpg",
  "Genshin Impact":"genshinimpact.jpg",
  "The Lord of the Rings: Rise to War":"thelordoftheringsrisetowar.jpg",
  "Ragnarok X: Next Generation":"ragnarokxnextgeneration.jpg",
  "One Punch Man: The Strongest":"onepunchmanthestrongest.jpg",
  "League of Legends: Wild Rift":"leagueoflegends.jpg",
  "Growtopia":"growtopia.jpg",
  "Tom and Jerry: Chase":"tomandjerrychase.jpg",
  "Hago":"hago.jpg",
  "Punishing: Gray Raven":"punishinggreyraven.jpg",
  "Pixel Gun 3D":"pixelgun3d.jpg",
  "Astra: Knights of Veda":"astraknightsofveda.jpg",
  "Legend of Mushroom: Rush":"leagueofmushroomrush.jpg",
  "Heroic Uncle Kim":"heroicunclekim.jpg",
  "Total Football":"totalfootball.jpg",
  "Point Blank":"pointblank.jpg",
  "League of Legends PC":"leagueoflegends.jpg",
  "Marvel Rivals":"marvelrivals.jpg"
};
// ==========================================
// KATEGORI DIGITAL
// ==========================================

const DIGITAL_IMAGES = {
  "Vidio":"weetv.jpg",
  "Poppo Live":"poppo.jpg",
  "Bigo Live":"bigolive.jpg",
  "Chamet":"chamet.jpg",
  "WeSing":"wesing.jpg",
  "SUGO":"sugo.jpg",
  "Lita":"lita.jpg",
  "LIVU":"livu.jpg",
  "Likee":"likee.jpg",
  "StarMaker":"starmaker.jpg",
  "WeTV":"weetv.jpg"
};

const DIGITAL_CATALOG = {
  "Vidio": {
    category:"premium",
    fields:[{name:"email",label:"Email Akun",placeholder:"Email",required:true}],
    tabs:["Ultimate","Platinum"],
    products:[]
  },
  "WeTV": {
    category:"premium",
    fields:[{name:"email",label:"Email Akun",placeholder:"Email",required:true}],
    tabs:["VIP"],
    products:[]
  },
  "Poppo Live": {
    category:"social",
    fields:[{name:"userId",label:"ID Poppo",placeholder:"Masukkan ID",required:true}],
    tabs:["Coins"],
    products:[]
  },
  "Bigo Live": {
    category:"social",
    fields:[{name:"userId",label:"Bigo ID",placeholder:"Masukkan Bigo ID",required:true}],
    tabs:["Diamonds"],
    products:[]
  },
  "Chamet": {
    category:"social",
    fields:[{name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}],
    tabs:["Diamonds"],
    products:[]
  },
  "WeSing": {
    category:"social",
    fields:[{name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}],
    tabs:["Kcoins"],
    products:[]
  },
  "SUGO": {
    category:"social",
    fields:[{name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}],
    tabs:["Coins"],
    products:[]
  },
  "Lita": {
    category:"social",
    fields:[{name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}],
    tabs:["Coins"],
    products:[]
  },
  "LIVU": {
    category:"social",
    fields:[{name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}],
    tabs:["Coins"],
    products:[]
  },
  "Likee": {
    category:"social",
    fields:[{name:"userId",label:"Likee ID",placeholder:"Masukkan Likee ID",required:true}],
    tabs:["Diamonds"],
    products:[]
  },
  "StarMaker": {
    category:"social",
    fields:[{name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}],
    tabs:["Coins"],
    products:[]
  }
};
// ==========================================
// FREE FIRE - DIAMONDS
// ==========================================

function addProducts(game, category, entries) {
  CATALOG[game].products.push(
    ...entries.map(([name, price]) => ({
      category,
      name,
      price,
      id: game + "-" + category + "-" + name
    }))
  );
}

addProducts("Free Fire","Diamonds",[
  ["5 Diamonds",984],
  ["10 Diamonds",1862],
  ["12 Diamonds",1970],
  ["20 Diamonds",3618],
  ["25 Diamonds",4997],
  ["30 Diamonds",5661],
  ["50 Diamonds",7650],
  ["55 Diamonds",8360],
  ["70 Diamonds",9250],
  ["80 Diamonds",12254],
  ["100 Diamonds",14480],
  ["120 Diamonds",18132],
  ["130 Diamonds",19291],
  ["140 Diamonds",18850],
  ["145 Diamonds",21067],
  ["150 Diamonds",22049],
  ["190 Diamonds",27926],
  ["200 Diamonds",29885],
  ["210 Diamonds",30326],
  ["280 Diamonds",39679],
  ["355 Diamonds",47350],
  ["420 Diamonds",58866],
  ["425 Diamonds",59771],
  ["475 Diamonds",67607],
  ["495 Diamonds",69565],
  ["500 Diamonds",70543],
  ["510 Diamonds",72503],
  ["545 Diamonds",77401],
  ["565 Diamonds",79360],
  ["600 Diamonds",86218],
  ["635 Diamonds",89154],
  ["720 Diamonds",96000],
  ["800 Diamonds",113106],
  ["860 Diamonds",122540],
  ["930 Diamonds",132335],
  ["1000 Diamonds",142129],
  ["1050 Diamonds",146950],
  ["1075 Diamonds",156000],
  ["1080 Diamonds",152909],
  ["1440 Diamonds",204000],
  ["1450 Diamonds",205000],
  ["2160 Diamonds",303000],
  ["2180 Diamonds",305000],
  ["7290 Diamonds",986460],
  ["36500 Diamonds",5005000],
  ["73100 Diamonds",10010000]
]);
// ==========================================
// FREE FIRE - MEMBERSHIP
// ==========================================

addProducts("Free Fire","Membership",[
  ["Member Mingguan",28200],
  ["Member Bulanan",91715],
  ["BP Card",46108],
  ["Level Up Pass Level 6",5598],
  ["Level Up Pass Level 10",9262],
  ["Level Up Pass Level 15",9262],
  ["Level Up Pass Level 20",9262],
  ["Level Up Pass Level 25",9262],
  ["Level Up Pass Level 30",15159]
]);

// ==========================================
// FREE FIRE MAX
// ==========================================

CATALOG["Free Fire MAX"] = {
  ...CATALOG["Free Fire"],
  image:"freefiremax.jpg",
  fields:[{name:"userId",label:"User ID",placeholder:"Masukkan User ID",required:true}],
  products:[]
};

addProducts("Free Fire MAX","Diamonds",[
  ["5 Diamonds",984],
  ["10 Diamonds",1862],
  ["12 Diamonds",1970],
  ["20 Diamonds",3618],
  ["25 Diamonds",4997],
  ["30 Diamonds",5661],
  ["50 Diamonds",7650],
  ["55 Diamonds",7960],
  ["70 Diamonds",9250],
  ["80 Diamonds",12254],
  ["100 Diamonds",14480],
  ["120 Diamonds",18132],
  ["130 Diamonds",19291],
  ["140 Diamonds",18850],
  ["145 Diamonds",21067],
  ["150 Diamonds",22049],
  ["190 Diamonds",27926],
  ["200 Diamonds",29885],
  ["210 Diamonds",30326],
  ["280 Diamonds",39679],
  ["355 Diamonds",47350],
  ["420 Diamonds",58866],
  ["425 Diamonds",59771],
  ["475 Diamonds",67607],
  ["495 Diamonds",69565],
  ["500 Diamonds",70543],
  ["510 Diamonds",72503],
  ["545 Diamonds",77401],
  ["565 Diamonds",79360],
  ["600 Diamonds",86218],
  ["635 Diamonds",89154],
  ["720 Diamonds",96000],
  ["800 Diamonds",109106],
  ["860 Diamonds",118540],
  ["930 Diamonds",128335],
  ["1000 Diamonds",129800],
  ["1050 Diamonds",146950],
  ["1075 Diamonds",156000],
  ["1080 Diamonds",152909],
  ["1440 Diamonds",204000],
  ["1450 Diamonds",205000],
  ["2160 Diamonds",303000],
  ["2180 Diamonds",305000],
  ["7290 Diamonds",925000],
  ["36500 Diamonds",5005000],
  ["73100 Diamonds",10010000]
]);

addProducts("Free Fire MAX","Membership",[
  ["Member Mingguan",28200],
  ["Member Bulanan",91715],
  ["BP Card",46108],
  ["Level Up Pass Level 6",5598],
  ["Level Up Pass Level 10",9262],
  ["Level Up Pass Level 15",9262],
  ["Level Up Pass Level 20",9262],
  ["Level Up Pass Level 25",9262],
  ["Level Up Pass Level 30",15159]
]);
// ==========================================
// MOBILE LEGENDS - DIAMONDS
// ==========================================

addProducts("Mobile Legends","Diamonds",[
  ["5 Diamonds",1675],
  ["10 Diamonds",3479],
  ["12 Diamonds",3859],
  ["19 Diamonds",6241],
  ["28 Diamonds",9209],
  ["44 Diamonds",13953],
  ["54 Diamonds",16595],
  ["59 Diamonds",17674],
  ["71 Diamonds",22465],
  ["74 Diamonds",23450],
  ["85 Diamonds",26418],
  ["88 Diamonds",27406],
  ["110 Diamonds",33235],
  ["113 Diamonds",35344],
  ["128 Diamonds",42685],
  ["148 Diamonds",48816],
  ["170 Diamonds",52563],
  ["176 Diamonds",58684],
  ["184 Diamonds",62276],
  ["222 Diamonds",74898],
  ["240 Diamonds",74016],
  ["258 Diamonds",86804],
  ["277 Diamonds",86357],
  ["284 Diamonds",87399],
  ["296 Diamonds",90832],
  ["301 Diamonds",95186],
  ["305 Diamonds",101230],
  ["333 Diamonds",104480],
  ["346 Diamonds",108827],
  ["356 Diamonds",112387],
  ["370 Diamonds",113783],
  ["384 Diamonds",117598],
  ["408 Diamonds",124398],
  ["424 Diamonds",128917],
  ["452 Diamonds",147732],
  ["518 Diamonds",170076],
  ["845 Diamonds",273549],
  ["875 Diamonds",280042],
  ["938 Diamonds",300598],
  ["966 Diamonds",314324],
  ["1045 Diamonds",316339],
  ["1136 Diamonds",367682],
  ["1159 Diamonds",376696],
  ["1443 Diamonds",465383],
  ["1506 Diamonds",485939],
  ["1704 Diamonds",549023],
  ["2010 Diamonds",574729],
  ["2232 Diamonds",694051],
  ["2380 Diamonds",737049],
  ["2578 Diamonds",801494],
  ["2625 Diamonds",816651],
  ["3453 Diamonds",1080536],
  ["3738 Diamonds",1172116],
  ["4020 Diamonds",1235306],
  ["4588 Diamonds",1228269],
  ["4830 Diamonds",1332469],
  ["5398 Diamonds",1629501],
  ["6030 Diamonds",1850469],
  ["6840 Diamonds",2068318],
  ["8040 Diamonds",2470672],
  ["9660 Diamonds",2896320],
  ["10050 Diamonds",2678670],
  ["14490 Diamonds",4339480],
  ["16080 Diamonds",4931224],
  ["18090 Diamonds",5666317],
  ["19320 Diamonds",5782040],
  ["20100 Diamonds",6161530],
  ["21330 Diamonds",6397793],
  ["23340 Diamonds",7012948],
  ["24150 Diamonds",7225380],
  ["26160 Diamonds",7840953],
  ["28170 Diamonds",8456106]
]);
// ==========================================
// WEEKLY DIAMOND PASS & BUNDLE
// ==========================================

addProducts("Mobile Legends","Weekly Diamond Pass & Bundle",[
  ["Weekly Diamond Pass",30490],
  ["Weekly Diamond Pass x2",62990],
  ["Weekly Diamond Pass x3",93990],
  ["Weekly Elite Bundle",17317],
  ["Monthly Epic Bundle",84884]
]);

// ==========================================
// 2X FIRST RECHARGE
// ==========================================

addProducts("Mobile Legends","2X First Recharge",[
  ["100 Diamonds (50+50)",17317],
  ["300 Diamonds (150+150)",50751],
  ["500 Diamonds (250+250)",84884],
  ["1000 Diamonds (500+500)",169759]
]);

// ==========================================
// TOP UP GLOBAL
// ==========================================

addProducts("Mobile Legends","Top Up Global",[
  ["Weekly Diamond Pass Global 1",36551],
  ["Weekly Diamond Pass Global 2",40141],
  ["Twilight Pass 1",175318],
  ["Twilight Pass 2",203960],
  ["11 Diamonds",3520],
  ["22 Diamonds",6939],
  ["70 Diamonds",23616],
  ["223 Diamonds",69401],
  ["336 Diamonds",103600],
  ["570 Diamonds",176002],
  ["1163 Diamonds",347000],
  ["2398 Diamonds",694004],
  ["6042 Diamonds",1715008],
  ["140 Diamonds",46685],
  ["Weekly Elite Bundle",17317],
  ["Monthly Epic Bundle",84884]
]);

// ==========================================
// STARLIGHT
// ==========================================

addProducts("Mobile Legends","Starlight",[
  ["Starlight Biasa (Gift 7 Hari)",40000],
  ["Starlight Premium (Gift 7 Hari)",96000]
]);
// ==========================================
// ROBLOX
// ==========================================

addProducts("Roblox","Robux",[
  ["50 Robux",6500],
  ["100 Robux",12600],
  ["200 Robux",25200],
  ["300 Robux",37500],
  ["400 Robux",49800],
  ["500 Robux",62500],
  ["600 Robux",74800],
  ["700 Robux",87200],
  ["800 Robux",99800],
  ["900 Robux",112300],
  ["1000 Robux",124500],
  ["1500 Robux",187000],
  ["2000 Robux",250000],
  ["2500 Robux",311000],
  ["3000 Robux",373000],
  ["4000 Robux",497000],
  ["5000 Robux",625000]
]);

// ==========================================
// MAGIC CHESS GOGO
// ==========================================

addProducts("Magic Chess GoGo","Diamonds",[
  ["5 Diamond",1780],
  ["Weekly Card",31700],
  ["12 Diamonds (11+1 Bonus)",4303],
  ["19 Diamonds (17+2 Bonus)",6540],
  ["28 Diamonds (25+3 Bonus)",9524],
  ["44 Diamonds (40+4 Bonus)",15218],
  ["59 Diamonds (53+6 Bonus)",20000],
  ["85 Diamonds (77+8 Bonus)",29000],
  ["170 Diamonds (154+16 Bonus)",57836],
  ["240 Diamonds (217+23 Bonus)",81232],
  ["296 Diamonds (256+40 Bonus)",95878],
  ["408 Diamonds (367+41 Bonus)",137276],
  ["568 Diamonds (503+65 Bonus)",187999],
  ["875 Diamonds (774+101 Bonus)",288971],
  ["2010 Diamonds (1708+302 Bonus)",637916],
  ["4830 Diamonds (4003+827 Bonus)",1520959]
]);

addProducts("Magic Chess GoGo","2X Recharge Bonus",[
  ["100 Diamonds (50+50 Bonus)",18986],
  ["300 Diamonds (150+150 Bonus)",55841],
  ["500 Diamonds (250+250 Bonus)",92932],
  ["1000 Diamonds (500+500 Bonus)",186358]
]);

addProducts("Magic Chess GoGo","Latest Bounty",[
  ["Lukas's Battle Bounty",18786],
  ["Battle for Discounts",18786]
]);
// ==========================================
// PUBG MOBILE
// ==========================================

addProducts("PUBG Mobile","UC",[
  ["60 UC",16793],
  ["120 UC",33587],
  ["600 UC + 60 Bonus",170750],
  ["3000 UC + 850 Bonus",849915],
  ["6000 UC + 2100 Bonus",1698820],
  ["12000 UC + 4200 Bonus",3396740],
  ["18000 UC + 6300 Bonus",5094960],
  ["24000 UC + 8400 Bonus",6793180],
  ["36000 UC + 12600 Bonus",10189920],
  ["48000 UC + 16800 Bonus",13585960]
]);

// ==========================================
// VALORANT
// ==========================================

addProducts("Valorant","VP",[
  ["475 VP",53219],
  ["1000 VP",105939],
  ["1475 VP",158659],
  ["2050 VP",211378],
  ["2525 VP",264097],
  ["3050 VP",316817],
  ["3650 VP",366713],
  ["4125 VP",419432],
  ["4650 VP",472151],
  ["5350 VP",526753],
  ["5700 VP",577590],
  ["5825 VP",579473],
  ["6350 VP",632192],
  ["7300 VP",732924],
  ["7400 VP",737632],
  ["9000 VP",892966],
  ["11000 VP",1035120],
  ["11475 VP",1087839],
  ["12000 VP",1140559],
  ["13050 VP",1245998],
  ["14650 VP",1401333],
  ["15100 VP",1456876],
  ["16350 VP",1561373],
  ["16700 VP",1612210],
  ["18300 VP",1767544],
  ["20000 VP",1927586],
  ["22000 VP",2069740]
]);

// ==========================================
// EA SPORTS FC MOBILE
// ==========================================

addProducts("EA Sports FC Mobile","FC Points",[
  ["40 FC Points",6900],
  ["100 FC Points",16200],
  ["520 FC Points",78000],
  ["1070 FC Points",156475],
  ["2200 FC Points",323250],
  ["5750 FC Points",784325],
  ["12000 FC Points",1569100]
]);

addProducts("EA Sports FC Mobile","Silver",[
  ["39 Silver",6900],
  ["99 Silver",16200],
  ["499 Silver",78000],
  ["999 Silver",156475],
  ["1999 Silver",323250],
  ["4999 Silver",784325],
  ["9999 Silver",1569100]
]);
// ==========================================
// GAME LAINNYA
// ==========================================

const OTHER_GAMES = {
  "Honor of Kings": [
    ["16 Tokens",3700],
    ["80 Tokens",16500],
    ["240 Tokens",47500],
    ["400 Tokens",80500],
    ["560 Tokens",109500],
    ["2400 + 108 Bonus Tokens",480500],
    ["4000 + 180 Bonus Tokens",800500],
    ["8000 + 360 Bonus Tokens",1599500]
  ],

  "Blood Strike": [
    ["300+20 Gold",42500],
    ["500+40 Gold",70500],
    ["1000+100 Gold",140500],
    ["2000+260 Gold",280500],
    ["5000+800 Gold",710000]
  ],

  "Football Master 2": [
    ["18 FMP",4772],
    ["95 FMP",21716],
    ["191 FMP",43226],
    ["382 FMP",85951],
    ["972 FMP",214128],
    ["1944 FMP",427756],
    ["3888 FMP",855012],
    ["9900 FMP",2136780]
  ],

  "Football Dreams: Be A Pro": [
    ["60 Supreme Tokens",14637],
    ["180 Supreme Tokens",42793],
    ["300 Supreme Tokens",71127],
    ["680 Supreme Tokens",142212],
    ["940 Supreme Tokens",212499],
    ["1280 Supreme Tokens",283868],
    ["1980 Supreme Tokens",425349],
    ["3120 Supreme Tokens",707360],
    ["6480 Supreme Tokens",1417616],
    ["Indonesian Garuda",23996]
  ],

  "Ragnarok M: Classic": [
    ["1.8 Million Zeny",48747],
    ["3 Million + 60 Thousand Zeny",80912],
    ["6.8 Million + 272 Thousand Zeny",158485],
    ["12.8 Million + 768 Thousand Zeny",280522],
    ["32.8 Million + 2.7 Million Zeny",715692],
    ["64.8 Million + 7.2 Million Zeny",1383142],
    ["144 Million + 16 Million Zeny",3109124],
    ["Abundant Double Zeny Supply",492431],
    ["Petty Double Zeny Supply Box",165108],
    ["Upgrade Adventure Log",113076],
    ["Collection Adventure Log",374178]
  ],

  "Zepeto": [
    ["14 Zems",15000],
    ["28 Zems",31300],
    ["58 Zems",62300],
    ["128 Zems",132000],
    ["323 Zems",333100],
    ["1000 Zems",1000500],
    ["4680 Coins",16300],
    ["9700 Coins",31300],
    ["25200 Coins",77700],
    ["40700 Coins",124200],
    ["110000 Coins",325300],
    ["300000 Coins",864100],
    ["Premium (1M)",64300]
  ],

  "King of Avalon": [
    ["500 Diamonds",75975],
    ["1000 Diamonds",154075],
    ["2000 Diamonds",302443],
    ["5000 Diamonds",768330],
    ["10000 Diamonds",1520086],
    ["50000 Diamonds",7663318],
    ["100000 Diamonds",15196272]
  ],

  "Undawn": [
    ["Kartu Mingguan",28400],
    ["Kartu Bulanan",46800],
    ["Dana Elit (REBATE LV 80)",123400],
    ["Glory Pass Premium",139650],
    ["RC x 80",14900],
    ["RC x 250",43700],
    ["RC x 450",72500],
    ["RC x 920",143540],
    ["RC x 1850",287540],
    ["RC x 2800",431540],
    ["RC x 4750",719540],
    ["RC x 9600",1439540],
    ["RC x 33000",4800500],
    ["RC x 66500",9600500]
  ],

  "Top Eleven": [
    ["220 Gems",751000]
  ]
};
// ==========================================
// METAL SLUG
// ==========================================

OTHER_GAMES["Metal Slug: Awakening"] = [
  ["60 Ruby",14000],
  ["120 Ruby",27500],
  ["180 Ruby",41000],
  ["310 Ruby",61800],
  ["630 Ruby",123000],
  ["1300 Ruby",245500],
  ["3230 Ruby",613000],
  ["6500 Ruby",1225500],
  ["6500 Ruby x2",2450500],
  ["6500 Ruby x3",3660500],
  ["6500 Ruby x5",6100500],
  ["6500 Ruby x10",12200500],
  ["6500 Ruby x15",17872250],
  ["6500 Ruby x20",23829500],
  ["6500 Ruby x30",35744000],
  ["6500 Ruby x40",47658500],
  ["6500 Ruby x50",59573000],
  ["6500 Ruby x100",119145500],
  ["Kartu Bulanan",61800],
  ["Kartu Bulanan Premium",123000]
];

// ==========================================
// CAPTAIN TSUBASA
// ==========================================

OTHER_GAMES["Captain Tsubasa: Ace"] = [
  ["6 Golden Ball Pack",1978],
  ["60 + 3 Golden Ball Pack",15284],
  ["300 + 15 Golden Ball Pack",73496],
  ["680 + 35 Golden Ball Pack",147416],
  ["980 + 50 Golden Ball Pack",230576],
  ["1280 + 65 Golden Ball Pack",304496],
  ["1980 + 198 Golden Ball Pack",443096],
  ["3280 + 328 Golden Ball Pack",738776],
  ["6480 + 648 Golden Ball Pack",1477976]
];

// ==========================================
// BE THE KING
// ==========================================

OTHER_GAMES["Be The King: Judge Destiny"] = [
  ["60 Gold",13743],
  ["300 Gold",67796],
  ["680 Gold",135362],
  ["2040 Gold",403194],
  ["3400 Gold",673459],
  ["6800 Gold",1349121],
  ["60 Ult Tokens",13743],
  ["300 Ult Tokens",67796],
  ["680 Ult Tokens",135362],
  ["2040 Ult Tokens",403194],
  ["3400 Ult Tokens",673459],
  ["6800 Ult Tokens",1349121],
  ["20400 Ult Tokens",4027443]
];

// ==========================================
// DELTA FORCE
// ==========================================

OTHER_GAMES["Delta Force"] = [
  ["18 + 1 Delta Coins",5900],
  ["30 + 2 Delta Coins",8600],
  ["60 + 3 Delta Coins",16400],
  ["300 + 36 Delta Coins",79701],
  ["420 + 62 Delta Coins",109401],
  ["680 + 105 Delta Coins",153202],
  ["1280 + 264 Delta Coins",305603],
  ["1680 + 385 Delta Coins",381804],
  ["3280 + 834 Delta Coins",762808],
  ["6480 + 1944 Delta Coins",1525115],
  ["12960 + 3888 Delta Coins",3049730],
  ["19440 + 5832 Delta Coins",4574346]
];
// ==========================================
// CLOUD SONG
// ==========================================

OTHER_GAMES["Cloud Song: Saga of Skywalkers"] = [
  ["0.99$ Tickets",11803],
  ["1.99$ Tickets",19336],
  ["2.99$ Tickets",34406],
  ["5.99$ Tickets",68312],
  ["11.99$ Tickets",136123],
  ["21.99$ Tickets",271748],
  ["29.99$ Tickets",339560],
  ["59.99$ Tickets",678619],
  ["99.99$ Tickets",1356738]
];

// ==========================================
// HARRY POTTER
// ==========================================

OTHER_GAMES["Harry Potter: Magic Awakened"] = [
  ["60 Jewels",16916],
  ["300 Jewels",81554],
  ["680 + 70 Jewels",163634],
  ["980 + 165 Jewels",255974],
  ["1280 + 270 Jewels",338054],
  ["1980 + 380 Jewels",491954],
  ["3280 + 780 Jewels",820274],
  ["6480 + 2000 Jewels",1641074]
];

// ==========================================
// ARENA OF VALOR
// ==========================================

OTHER_GAMES["Arena of Valor"] = [
  ["40 Vouchers",10500],
  ["90 Vouchers",20500],
  ["230 Vouchers",50500],
  ["470 Vouchers",100500],
  ["950 Vouchers",200500],
  ["1430 Vouchers",300500],
  ["2390 Vouchers",500500]
];

// ==========================================
// AFK JOURNEY
// ==========================================

OTHER_GAMES["AFK Journey"] = [
  ["21 Dragon Crystals",16124],
  ["126 Dragon Crystals",77644],
  ["294 Dragon Crystals",155764],
  ["588 Dragon Crystals",321769],
  ["1554 Dragon Crystals",780724],
  ["3150 Dragon Crystals",1561924],
  ["Classic Gazette",77644],
  ["Premium Gazette",243649],
  ["Growth Bundle",468244]
];

// ==========================================
// RACING MASTER
// ==========================================

OTHER_GAMES["Racing Master"] = [
  ["70 + 4 Gems",16500],
  ["140 + 7 Gems",32500],
  ["210 + 11 Gems",48500],
  ["350 + 18 Gems",79500],
  ["700 + 35 Gems",159500],
  ["1000 + 50 Gems",225500],
  ["1400 + 70 Gems",315500],
  ["2100 + 105 Gems",470500],
  ["3400 + 170 Gems",760500],
  ["6600 + 330 Gems",1469500]
];
// ==========================================
// ONMYOJI ARENA
// ==========================================

OTHER_GAMES["Onmyoji Arena"] = [
  ["Jade 60",15500],
  ["Jade 200",71500],
  ["Jade 1280",284000],
  ["Jade 3280",707000],
  ["Jade 6480",1450000]
];

// ==========================================
// MU ORIGIN
// ==========================================

OTHER_GAMES["MU Origin 2"] = [
  ["5 Badges",5343],
  ["70 Badges",10187],
  ["109 Badges",15635],
  ["195 Badges",27743],
  ["325 Badges",45904],
  ["951 Badges",133687],
  ["1621 Badges",227522],
  ["5401 Badges",757241],
  ["17283 Badges",2422071]
];

OTHER_GAMES["MU Origin 3"] = [
  ["70 Divine Diamonds",15300],
  ["350 Divine Diamonds",73500],
  ["1050 Divine Diamonds",230500],
  ["2100 Divine Diamonds",443100],
  ["3500 Divine Diamonds",738800],
  ["7000 Divine Diamonds",1478000],
  ["10500 Divine Diamonds",2309600],
  ["14000 Divine Diamonds",3048800],
  ["21000 Divine Diamonds",4619600]
];

// ==========================================
// MOB RUSH
// ==========================================

OTHER_GAMES["MOB RUSH"] = [
  ["100 Diamonds",16593],
  ["300 Diamonds",48778],
  ["500 Diamonds",80964],
  ["1000 Diamonds",161428],
  ["2000 Diamonds",322356],
  ["3000 Diamonds",483284],
  ["5000 Diamonds",805140],
  ["10000 Diamonds",1609780],
  ["Top Value Pack",5328],
  ["Super Value Hero Pack",16593],
  ["Diamond Benefits Weekly",19811],
  ["Diamond Benefits Monthly",39123],
  ["Account Growth Fund Normal",48778],
  ["Account Growth Fund Advanced",129242],
  ["BattlePass",80964]
];

// ==========================================
// IDENTITY V
// ==========================================

OTHER_GAMES["Identity V"] = [
  ["60 Echoes",14575],
  ["185 Echoes",43089],
  ["305 Echoes",71604],
  ["690 Echoes",142891],
  ["2025 Echoes",428039],
  ["3330 Echoes",713187],
  ["6590 Echoes",1426056]
];

// ==========================================
// LEGACY FATE
// ==========================================

OTHER_GAMES["Legacy Fate: Sacred and Fearless"] = [
  ["70 Token",19385],
  ["130 Token",35123],
  ["330 Token",88631],
  ["750 Token",168669],
  ["990 Token",248707],
  ["1410 Token",348529],
  ["2180 Token",497813],
  ["3610 Token",847641],
  ["7130 Token",1695681]
];
// ==========================================
// RAINBOW SIX MOBILE
// ==========================================

OTHER_GAMES["Rainbow Six Mobile"] = [
  ["50 Platinum",12000],
  ["110 Platinum",23000],
  ["300 Platinum",56500],
  ["650 Platinum",111500],
  ["1350 Platinum",225500],
  ["3500 Platinum",559500],
  ["7250 Platinum",1119500],
  ["11250 Platinum",1699500],
  ["250 Platinum First Purchase Only",12000],
  ["600 Platinum First Purchase Only",56500],
  ["2700 Platinum First Purchase Only",225500],
  ["7000 Platinum First Purchase Only",559500]
];

// ==========================================
// CALL OF DUTY
// ==========================================

OTHER_GAMES["Call of Duty Mobile"] = [
  ["63 CP",10000],
  ["128 CP",20500],
  ["321 CP",50500],
  ["645 CP",100500],
  ["1373 CP",200500],
  ["2060 CP",300500],
  ["3564 CP",500500],
  ["7656 CP",1000500]
];

// ==========================================
// SNOWBREAK
// ==========================================

OTHER_GAMES["Snowbreak: Containment Zone"] = [
  ["6 BitGold",15223],
  ["30 BitGold",73196],
  ["98 BitGold",229630],
  ["198 BitGold",441276],
  ["328 BitGold",735740],
  ["648 BitGold",1471900]
];

// ==========================================
// HONKAI IMPACT 3
// ==========================================

OTHER_GAMES["Honkai Impact 3"] = [
  ["Monthly Card",77450],
  ["30 B-Chips",8195],
  ["65 B-Chips",16175],
  ["330 B-Chips",77450],
  ["990 B-Chips",242750],
  ["1320 B-Chips",318750],
  ["1980 B-Chips",465050],
  ["3300 B-Chips",774750],
  ["6600 B-Chips",1548050],
  ["65 Crystals",16175],
  ["330 Crystals",77450],
  ["660 Crystals",154400],
  ["1320 Crystals",318750],
  ["3300 Crystals",807350],
  ["6600 Crystals",1613210]
];

// ==========================================
// PATH TO NOWHERE
// ==========================================

OTHER_GAMES["Path to Nowhere"] = [
  ["60 Ultracubes",15730],
  ["300 + 30 Ultracubes",75697],
  ["980 + 150 Ultracubes",237513],
  ["1980 + 400 Ultracubes",446922],
  ["3280 + 700 Ultracubes",732480],
  ["6480 + 1600 Ultracubes",1379745],
  ["Weekly Arrest Pack",15730],
  ["Chief Inauguration Special I",15730],
  ["Weekly Training Pack I",75697],
  ["Black Key VIP 30 Days",75697],
  ["Chief Inauguration Special II",75697],
  ["Chief Inauguration Special III",151846],
  ["Weekly Training Pack II",237513],
  ["Dis Jackpot",237513],
  ["Monthly Arrest Pack I",237513],
  ["Rookie Arrest Pack",294625],
  ["Monthly Arrest Pack II",380292],
  ["Chief Inauguration Special IV",446922],
  ["Chief Inauguration Special V",732480],
  ["Chief Inauguration Special VI",1379745]
];
// ==========================================
// HEAVEN BURNS RED
// ==========================================

OTHER_GAMES["Heaven Burns Red"] = [
  ["130 Paid Quartz",20368],
  ["410 Paid Quartz",58768],
  ["870 Paid Quartz",117202],
  ["1370 Paid Quartz",183986],
  ["2720 Paid Quartz",334246],
  ["4750 Paid Quartz",567985],
  ["10000 Paid Quartz",1169028]
];

// ==========================================
// ARENA BREAKOUT
// ==========================================

OTHER_GAMES["Arena Breakout"] = [
  ["60 + 6 Bonds",16354],
  ["310 + 25 Bonds",76451],
  ["630 + 45 Bonds",149409],
  ["1580 + 110 Bonds",370757],
  ["3200 + 200 Bonds",748466],
  ["6500 + 320 Bonds",1448869],
  ["Pilihan Pemula",19630],
  ["Battle Pass Lanjutan",66102],
  ["Battle Pass Premium",194505]
];

// ==========================================
// LEGENDS OF RUNETERRA
// ==========================================

OTHER_GAMES["Legends of Runeterra"] = [
  ["475 Coins",54885],
  ["1000 Coins",109269],
  ["2050 Coins",218038],
  ["3650 Coins",378278],
  ["5350 Coins",543374],
  ["11000 Coins",1067796]
];

// ==========================================
// LIFEAFTER
// ==========================================

OTHER_GAMES["LifeAfter"] = [
  ["65 Credits",13550],
  ["330 Credits",64800],
  ["558 Credits",103450],
  ["1108 Credits",192850],
  ["2268 Credits",384700],
  ["3468 Credits",602250],
  ["5768 Credits",960350],
  ["7768 Credits",1280150]
];

// ==========================================
// LOVE AND DEEPSPACE
// ==========================================

OTHER_GAMES["Love and Deepspace"] = [
  ["Aurum Pass 30 Days",87457],
  ["60 Crystals",19064],
  ["300 Crystals + 30 Diamonds",87457],
  ["450 Crystals + 90 Diamonds",116768],
  ["980 Crystals + 150 Diamonds",243783],
  ["1980 Crystals + 360 Diamonds",488043],
  ["6480 Crystals + 1600 Diamonds",1660491],
  ["Companionship Pack",292635]
];

// ==========================================
// WATCHER OF REALMS
// ==========================================

OTHER_GAMES["Watcher of Realms"] = [
  ["499 W-Gold",91875],
  ["999 W-Gold",183640],
  ["1999 W-Gold",366973],
  ["2999 W-Gold",550354],
  ["4999 W-Gold",917018],
  ["9999 W-Gold",1831742],
  ["29999 W-Gold",5482485],
  ["59999 W-Gold",10982793]
];
// ==========================================
// HONKAI STAR RAIL
// ==========================================

OTHER_GAMES["Honkai: Star Rail"] = [
  ["Express Supply Pass",75550],
  ["60 Oneiric Shard",15700],
  ["300 + 30 Oneiric Shard",75550],
  ["980 + 110 Oneiric Shard",237050],
  ["1980 + 260 Oneiric Shard",455550],
  ["3280 + 600 Oneiric Shard",759550],
  ["6480 + 1600 Oneiric Shard",1519550]
];

// ==========================================
// ZENLESS ZONE ZERO
// ==========================================

OTHER_GAMES["Zenless Zone Zero"] = [
  ["60 Monochrome",15700],
  ["300 + 30 Monochrome",75550],
  ["980 + 110 Monochrome",237050],
  ["1980 + 260 Monochrome",455550],
  ["3280 + 600 Monochrome",759550],
  ["6480 + 1600 Monochrome",1519550],
  ["Inter-Knot Membership",75550]
];

// ==========================================
// SPEED DRIFTERS
// ==========================================

OTHER_GAMES["Speed Drifters"] = [
  ["56 Diamonds",10235],
  ["112 Diamonds",19970],
  ["282 Diamonds",49173],
  ["579 Diamonds",97846],
  ["1230 Diamonds",195191],
  ["1845 Diamonds",292537],
  ["3134 Diamonds",487227]
];

// ==========================================
// TAMASHI
// ==========================================

OTHER_GAMES["Tamashi: Rise of Yokai"] = [
  ["60 Sycee",15562],
  ["300 Sycee",74871],
  ["600 Sycee",150183],
  ["900 Sycee",234909],
  ["1200 Sycee",310221],
  ["1800 Sycee",451431],
  ["3000 Sycee",752679],
  ["6000 Sycee",1505799]
];

// ==========================================
// MARVEL DUEL
// ==========================================

OTHER_GAMES["Marvel Duel"] = [
  ["60 Stardust + 40 Iso-gems",134450],
  ["120 Stardust + 120 Iso-gems",265200],
  ["300 Stardust + 400 Iso-gems",653600],
  ["600 Stardust + 860 Iso-gems",1307100]
];

// ==========================================
// GHOST STORY
// ==========================================

OTHER_GAMES["Ghost Story: Love Destiny"] = [
  ["Monthly Pass",62185],
  ["Privilege Monthly Card",123915],
  ["65 Jade",15679],
  ["125 Jade",30901],
  ["315 + 16 Jade",76437],
  ["625 + 63 Jade",152374],
  ["1250 + 125 Jade",304247],
  ["3125 + 469 Jade",759835],
  ["6250 + 1250 Jade",1519282],
  ["12500 + 2500 Jade",3038064],
  ["31250 + 6250 Jade",7594321]
];
// ==========================================
// RAGNAROK ORIGIN
// ==========================================

OTHER_GAMES["Ragnarok Origin"] = [
  ["40 Nyan Berry",14892],
  ["210 Nyan Berry",68444],
  ["430 Nyan Berry",136528],
  ["900 Nyan Berry",280720],
  ["2300 Nyan Berry",701116],
  ["4800 Nyan Berry",1442971],
  ["9600 Nyan Berry",2885579],
  ["4800 Nyan Berry x5",7212851],
  ["24000 Nyan Berry",7213129],
  ["4800 Nyan Berry x10",14425204],
  ["48000 Nyan Berry",14425758],
  ["4800 Nyan Berry x15",21637556],
  ["4800 Nyan Berry x20",28849908],
  ["96000 Nyan Berry",28851014],
  ["4800 Nyan Berry x25",36062261],
  ["4800 Nyan Berry x30",43274613],
  ["4800 Nyan Berry x40",57699317],
  ["4800 Nyan Berry x50",72124021]
];

// ==========================================
// STATE OF SURVIVAL
// ==========================================

OTHER_GAMES["State of Survival"] = [
  ["100 Diamonds",17722],
  ["500 Diamonds",85531],
  ["1000 Diamonds",171639],
  ["2000 Diamonds",354618],
  ["5000 Diamonds",860500],
  ["10000 Diamonds",1721576],
  ["20000 Diamonds",3541674]
];

// ==========================================
// TEAMFIGHT TACTICS
// ==========================================

OTHER_GAMES["Teamfight Tactics Mobile"] = [
  ["575 TFT Coins",58813],
  ["1380 TFT Coins",136564],
  ["2800 TFT Coins",272629],
  ["4500 TFT Coins",428131],
  ["6500 TFT Coins",603071],
  ["13500 TFT Coins",1166766]
];

// ==========================================
// GENSHIN IMPACT
// ==========================================

OTHER_GAMES["Genshin Impact"] = [
  ["60 Genesis Crystals",16175],
  ["300 + 30 Genesis Crystals",77450],
  ["980 + 110 Genesis Crystals",242750],
  ["1980 + 260 Genesis Crystals",465050],
  ["3280 + 600 Genesis Crystals",774750],
  ["6480 + 1600 Genesis Crystals",1548050],
  ["Blessing of the Welkin Moon",77450],
  ["60 Chronal Nexus",16175],
  ["300 + 30 Chronal Nexus",77450],
  ["980 + 110 Chronal Nexus",242750],
  ["1980 + 260 Chronal Nexus",465058],
  ["3280 + 600 Chronal Nexus",774750]
];

// ==========================================
// LORD OF THE RINGS
// ==========================================

OTHER_GAMES["The Lord of the Rings: Rise to War"] = [
  ["200 Gems",13253],
  ["1000 Gems",65527],
  ["2300 Gems",130868],
  ["4600 Gems",261551],
  ["11500 Gems",653599],
  ["23000 Gems",1307013]
];
// ==========================================
// RAGNAROK X
// ==========================================

OTHER_GAMES["Ragnarok X: Next Generation"] = [
  ["2310 Diamonds",69000],
  ["4990 Diamonds",146600],
  ["Hadiah Privilege W",204099],
  ["10290 Diamonds",301800],
  ["Assurance of Exclusivity",346527],
  ["15600 Diamonds",457000],
  ["Oath of Bond",562908],
  ["31200 Diamonds",913500],
  ["51370 Diamonds",1461300],
  ["160540 Diamonds",4565500],
  ["321090 Diamonds",9130500],
  ["963270 Diamonds",27390500]
];

// ==========================================
// ONE PUNCH MAN
// ==========================================

OTHER_GAMES["One Punch Man: The Strongest"] = [
  ["6 Kupon",9700],
  ["22 Kupon",37500],
  ["54 Kupon",92900],
  ["107 Kupon",185300],
  ["214 Kupon",370100],
  ["321 Kupon",554900],
  ["2669 Kupon",4620500]
];

// ==========================================
// WILD RIFT
// ==========================================

OTHER_GAMES["League of Legends: Wild Rift"] = [
  ["425 Cores",53702],
  ["1000 Cores",119255],
  ["1850 Cores",214259],
  ["3275 Cores",375766],
  ["10000 Cores",1073095]
];

// ==========================================
// GROWTOPIA
// ==========================================

OTHER_GAMES["Growtopia"] = [
  ["Chest O' Gems",28500],
  ["Gem Fountain",75200],
  ["It's Rainin' Gems",150500],
  ["Gem Bounty",450500],
  ["Gem Abundance",738000],
  ["Royal Grow Pass",150500],
  ["1-Year Subscription Token",738000]
];

// ==========================================
// TOM AND JERRY
// ==========================================

OTHER_GAMES["Tom and Jerry: Chase"] = [
  ["60 Diamonds",16000],
  ["180 + 6 Diamonds",43700],
  ["300 + 20 Diamonds",71500],
  ["600 + 45 Diamonds",143000],
  ["1200 + 100 Diamonds",288500],
  ["1800 + 170 Diamonds",436000],
  ["3000 + 300 Diamonds",721400],
  ["6000 + 1000 Diamonds",1412200]
];

// ==========================================
// HAGO
// ==========================================

OTHER_GAMES["Hago"] = [
  ["1200 Diamonds",2645],
  ["9200 Diamonds",16834],
  ["18200 Diamonds",33167],
  ["45600 Diamonds",82167],
  ["76200 Diamonds",136612],
  ["183000 Diamonds",327167],
  ["336000 Diamonds",599391],
  ["672400 Diamonds",1198280]
];

// ==========================================
// PUNISHING GRAY RAVEN
// ==========================================

const PGR_PRODUCTS = [
  ["5 Rainbow Cards",14982],
  ["28 Rainbow Cards",69047],
  ["34 Rainbow Cards",85459],
  ["59 Rainbow Cards",138559],
  ["71 Rainbow Cards",165592],
  ["119 Rainbow Cards",279515],
  ["299 Rainbow Cards",685968],
  ["600 Rainbow Cards",1391520]
];

OTHER_GAMES["Punishing: Gray Raven"] = [
  ...PGR_PRODUCTS.map(([name,price]) => ["Android - "+name,price]),
  ...PGR_PRODUCTS.map(([name,price]) => ["iOS - "+name,price])
];
// ==========================================
// PIXEL GUN 3D
// ==========================================

OTHER_GAMES["Pixel Gun 3D"] = [
  ["50 + 5 Coins",15300],
  ["150 + 15 Coins",45198],
  ["250 + 25 Coins",75096],
  ["500 + 100 Coins",149841],
  ["1000 + 300 Coins",299333],
  ["2500 + 1000 Coins",747805],
  ["50 + 5 Keys",15300],
  ["150 + 15 Keys",45198],
  ["250 + 25 Keys",75095],
  ["500 + 100 Keys",149841],
  ["1000 + 300 Keys",299333],
  ["2500 + 1000 Keys",747805],
  ["90 + 10 Gems",45198],
  ["150 + 25 Gems",75095],
  ["300 + 75 Gems",149841],
  ["600 + 200 Gems",299333],
  ["1500 + 700 Gems",747805],
  ["60 + 6 Pixel Pass Tickets",15300],
  ["180 + 20 Pixel Pass Tickets",45198],
  ["300 + 50 Pixel Pass Tickets",75095],
  ["600 + 150 Pixel Pass Tickets",149841],
  ["1200 + 550 Pixel Pass Tickets",299333],
  ["3000 + 1500 Pixel Pass Tickets",747805],
  ["Basic Set",75096],
  ["Advanced Set",149841],
  ["Expert Set",299333],
  ["Winner Set",747805]
];

// ==========================================
// GAME LAINNYA
// ==========================================

OTHER_GAMES["Astra: Knights of Veda"] = [
  ["60 Rubies",15045],
  ["300 Rubies",73811],
  ["980 Rubies",220728],
  ["1980 Rubies",441101],
  ["3280 Rubies",734932],
  ["6480 Rubies",1469513]
];

OTHER_GAMES["Legend of Mushroom: Rush"] = [
  ["99 Gems + Bonus Items",14612],
  ["499 Gems + Bonus Items",71060],
  ["999 Gems + Bonus Items",141620],
  ["1999 Gems + Bonus Items",282740],
  ["4999 Gems + Bonus Items",706100],
  ["9999 Gems + Bonus Items",1411700],
  ["29999 Gems + Bonus Items",4234100],
  ["59999 Gems + Bonus Items",8467700]
];

OTHER_GAMES["Heroic Uncle Kim"] = [
  ["95 Demon Coins + 150 Master Keys",35842],
  ["150 Demon Coins + 300 Master Keys",54109],
  ["950 Dragon Orbs",100378],
  ["220 Gems + 20 Master Keys",11427],
  ["1200 Gems + 90 Master Keys",54109],
  ["2400 Gems + 150 Master Keys",100378],
  ["8500 Gems + 500 Master Keys",291086],
  ["16000 Gems + 1000 Master Keys",491013],
  ["36000 Gems + 2000 Master Keys",990574],
  ["Ads Pass 30 Days + 240 Gems",100378]
];

OTHER_GAMES["Total Football"] = [
  ["2 TF Point Package",3900],
  ["10 TF Point Package",16900],
  ["32 TF Point Package",50100],
  ["52 TF Point Package",83200],
  ["100 TF Point Package",163500],
  ["200 TF Point Package",302000],
  ["312 TF Point Package",495600],
  ["520 TF Point Package",827500],
  ["1000 TF Point Package",1574300],
  ["2000 TF Point Package",3148100],
  ["4000 TF Point Package",6295600]
];

OTHER_GAMES["Point Blank"] = [
  ["1200 PB Cash",10340],
  ["2400 PB Cash",20180],
  ["6000 PB Cash",49700],
  ["12000 PB Cash",98899],
  ["24000 PB Cash",197297],
  ["36000 PB Cash",295696],
  ["60000 PB Cash",492494]
];

OTHER_GAMES["League of Legends PC"] = [
  ["575 RP",58800],
  ["1380 RP",136500],
  ["2800 RP",272500],
  ["4500 RP",427900],
  ["6500 RP",602700],
  ["13500 RP",1165900]
];

OTHER_GAMES["Marvel Rivals"] = [
  ["100 Lattices",18565],
  ["500 Lattices",91023],
  ["1000 Lattices",182935],
  ["2180 Lattices",365569],
  ["5680 Lattices",913469],
  ["11680 Lattices",1826637]
];

OTHER_GAMES["Vidio"] = [
  ["Ultimate All Screen 1 Tahun",1379500],
  ["Ultimate Mobile 30 Hari",105500],
  ["Ultimate Mobile 1 Tahun",765500],
  ["Ultimate All Screen 30 Hari",200500],
  ["Ultimate Mobile 3 Bulan",263658],
  ["Platinum 30 Hari",54500],
  ["Platinum Extra 30 Hari",76500],
  ["Platinum 3 Bulan",118500],
  ["Platinum Extra 3 Bulan",187500],
  ["Platinum 1 Tahun",398500],
  ["Platinum Extra 1 Tahun",553500]
];

OTHER_GAMES["WeTV"] = [
  ["12 Months VIP",476200]
];

// ==========================================
// INISIALISASI KATALOG
// ==========================================

for (const [name, products] of Object.entries(OTHER_GAMES)) {
  const imageName = GAME_IMAGES[name] || "";

  CATALOG[name] = {
    image: imageName,
    category: "game",
    popular: false,
    fields: [
      {
        name:"userId",
        label:"ID / Username",
        placeholder:"Masukkan ID akun",
        required:true
      }
    ],
    tabs:["Semua Produk"],
    products:products.map(([product,price]) => ({
      name:product,
      price,
      category:"Semua Produk",
      id:name+"-"+product
    }))
  };
}

// ==========================================
// TAMBAHKAN KATALOG SOSIAL & PREMIUM
// ==========================================

for (const [name, data] of Object.entries(DIGITAL_CATALOG)) {
  CATALOG[name] = {
    ...data,
    image: DIGITAL_IMAGES[name] || "",
    popular: false,
    products: data.products || []
  };
}

// ==========================================
// NAVIGASI TANPA RELOAD / AUTO SCROLL
// ==========================================

function showPage(page) {
  document.querySelectorAll(".page").forEach(el => {
    el.classList.remove("active");
  });

  const target = document.getElementById("page-"+page);

  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle("active",el.dataset.page === page);
  });

  window.scrollTo({top:0,behavior:"instant"});
}

// ==========================================
// FILTER GAME
// ==========================================

function renderGames() {
  const grid = document.getElementById("gameGrid");
  const home = document.getElementById("homeGameGrid");
  const search = document.getElementById("gameSearch")?.value.toLowerCase() || "";

  const games = Object.entries(CATALOG).filter(([name,data]) => {
    return name.toLowerCase().includes(search) &&
      (selectedFilter === "all" ||
       (selectedFilter === "popular" && data.popular) ||
       data.category === selectedFilter);
  });

  const html = games.map(([name,data]) => `
    <button class="game-card" onclick="openGame('${name.replace(/'/g,"\\'")}')">
      <img src="${data.image || "logo.jpg"}" alt="${name}" loading="lazy">
      <strong>${name}</strong>
    </button>
  `).join("");

  if (grid) grid.innerHTML = html;

  if (home) {
    home.innerHTML = Object.entries(CATALOG)
      .filter(([name,data]) => data.popular)
      .map(([name,data]) => `
        <button class="game-card" onclick="openGame('${name}')">
          <img src="${data.image || "logo.jpg"}" alt="${name}" loading="lazy">
          <strong>${name}</strong>
        </button>
      `).join("");
  }
}

function filterGames(filter,button) {
  selectedFilter = filter;

  document.querySelectorAll(".filter-tab").forEach(el => {
    el.classList.remove("active");
  });

  button.classList.add("active");
  renderGames();
}

// ==========================================
// PILIH GAME
// ==========================================

function openGame(name) {
  selectedGame = CATALOG[name];

  if (!selectedGame) return;

  selectedGame.name = name;
  selectedProduct = null;
  selectedCategory = selectedGame.tabs[0];

  document.getElementById("detailTitle").textContent = name;
  document.getElementById("selectedGameName").textContent = name;
  document.getElementById("detailImage").src = selectedGame.image || "logo.jpg";

  renderProductTabs();
  renderProducts();
  showPage("detail");
}

// ==========================================
// SUBKATEGORI
// ==========================================

function renderProductTabs() {
  const container = document.getElementById("productTabs");

  container.innerHTML = selectedGame.tabs.map(tab => `
    <button class="product-tab ${tab === selectedCategory ? "active" : ""}"
      onclick="selectProductCategory('${tab.replace(/'/g,"\\'")}')">
      ${tab}
    </button>
  `).join("");
}

function selectProductCategory(category) {
  selectedCategory = category;
  selectedProduct = null;

  renderProductTabs();
  renderProducts();

  document.getElementById("selectedProductName").textContent = "Belum ada produk";
  document.getElementById("selectedProductPrice").textContent = "Rp0";
}

// ==========================================
// PILIH PRODUK
// ==========================================

function renderProducts() {
  if (!selectedGame) return;

  const search = document.getElementById("productSearch").value.toLowerCase();

  const products = selectedGame.products.filter(product => {
    const categoryMatch =
      selectedGame.tabs.length === 1 ||
      product.category === selectedCategory;

    return categoryMatch && product.name.toLowerCase().includes(search);
  });

  document.getElementById("productGrid").innerHTML = products.map((product,index) => `
    <button class="product-card ${selectedProduct?.id === product.id ? "selected" : ""}"
      onclick="selectProduct(${index})">
      <strong>${product.name}</strong>
      <span>${formatRupiah(product.price)}</span>
    </button>
  `).join("");

  window.currentVisibleProducts = products;
}

function selectProduct(index) {
  selectedProduct = window.currentVisibleProducts[index];

  document.getElementById("selectedProductName").textContent = selectedProduct.name;
  document.getElementById("selectedProductPrice").textContent = formatRupiah(selectedProduct.price);

  renderProducts();
}

// ==========================================
// FORM DINAMIS
// ==========================================

function goToCheckout() {
  if (!selectedProduct) {
    return showToast("Pilih produk terlebih dahulu!");
  }

  const container = document.getElementById("dynamicFields");

  container.innerHTML = selectedGame.fields.map(field => {
    if (field.type === "select") {
      return `
        <div class="form-group">
          <label>${field.label}</label>
          <select name="${field.name}" ${field.required ? "required" : ""}>
            <option value="">Pilih ${field.label}</option>
            ${field.options.map(option => `<option value="${option}">${option}</option>`).join("")}
          </select>
        </div>
      `;
    }

    return `
      <div class="form-group">
        <label>${field.label}</label>
        <input name="${field.name}" placeholder="${field.placeholder}"
          ${field.required ? "required" : ""}>
      </div>
    `;
  }).join("");

  document.getElementById("summaryGame").textContent = selectedGame.name;
  document.getElementById("summaryProduct").textContent = selectedProduct.name;
  document.getElementById("summaryPrice").textContent = formatRupiah(selectedProduct.price);

  updateTotal();
  showPage("checkout");
}

// ==========================================
// DISKON
// ==========================================

function applyDiscount() {
  const input = document.getElementById("discountCode").value.trim();

  if (input.toUpperCase() === STORE_CONFIG.discountCode.toUpperCase()) {
    currentDiscount = STORE_CONFIG.discountType === "percent"
      ? Math.round(selectedProduct.price * STORE_CONFIG.discountValue / 100)
      : STORE_CONFIG.discountValue;

    showToast("Kode diskon berhasil digunakan!");
  } else {
    currentDiscount = 0;
    showToast("Kode diskon tidak valid!");
  }

  updateTotal();
}

function updateTotal() {
  if (!selectedProduct) return;

  const discount = Math.min(currentDiscount,selectedProduct.price);
  const total = selectedProduct.price - discount;

  document.getElementById("discountAmount").textContent = formatRupiah(discount);
  document.getElementById("checkoutTotal").textContent = formatRupiah(total);

  return total;
}

// ==========================================
// PEMBAYARAN
// ==========================================

function goToPayment() {
  const fields = document.querySelectorAll("#dynamicFields input, #dynamicFields select");

  const customerData = {};

  for (const field of fields) {
    if (field.required && !field.value.trim()) {
      field.focus();
      return showToast("Lengkapi data akun terlebih dahulu!");
    }

    customerData[field.name] = field.value.trim();
  }

  const phone = document.getElementById("customerPhone").value.trim();

  if (!phone) {
    return showToast("Masukkan nomor WhatsApp pembeli!");
  }

  currentOrder = {
    id:"GOT"+Date.now(),
    game:selectedGame.name,
    product:selectedProduct.name,
    price:selectedProduct.price,
    discount:currentDiscount,
    total:updateTotal(),
    customerData,
    phone,
    date:new Date().toLocaleString("id-ID"),
    status:"Menunggu Konfirmasi"
  };

  document.getElementById("paymentTotal").textContent = formatRupiah(currentOrder.total);

  showPage("payment");
}

// ==========================================
// KONFIRMASI PEMBAYARAN
// ==========================================

function confirmPayment() {
  if (!currentOrder) return;

  document.getElementById("modalTotal").textContent = formatRupiah(currentOrder.total);

  document.getElementById("paymentModal").classList.add("show");
}

function closeModal() {
  document.getElementById("paymentModal").classList.remove("show");
}

// ==========================================
// WHATSAPP KONFIRMASI
// ==========================================

function sendWhatsAppConfirmation() {
  if (!currentOrder) return;

  const data = Object.entries(currentOrder.customerData)
    .map(([key,value]) => `${key}: ${value}`)
    .join("\n");

  const message = `
HALO GOTOPUP.ID

Saya ingin konfirmasi pembayaran.

Nomor Pesanan: ${currentOrder.id}
Game: ${currentOrder.game}
Produk: ${currentOrder.product}
Harga: ${formatRupiah(currentOrder.price)}
Diskon: ${formatRupiah(currentOrder.discount)}
Total: ${formatRupiah(currentOrder.total)}

Data Akun:
${data}

Nomor Pembeli: ${currentOrder.phone}

Status: Pembayaran sudah saya lakukan.
Saya lampirkan bukti pembayaran.

Mohon diperiksa dan diproses.
  `.trim();

  orders.unshift(currentOrder);

  localStorage.setItem("gotopup_orders",JSON.stringify(orders));

  renderOrders();

  const url = "https://wa.me/" +
    STORE_CONFIG.paymentWhatsApp.replace(/\D/g,"") +
    "?text=" + encodeURIComponent(message);

  window.open(url,"_blank");
  closeModal();
}

// ==========================================
// RIWAYAT PESANAN
// ==========================================

function renderOrders() {
  const container = document.getElementById("orderList");

  if (!container) return;

  const saved = JSON.parse(localStorage.getItem("gotopup_orders") || "[]");

  if (!saved.length) {
    container.innerHTML = `
      <div class="empty-state">
        <span>📦</span>
        <h3>Belum Ada Pesanan</h3>
        <p>Pesanan kamu akan muncul di sini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = saved.map(order => `
    <div class="order-card">
      <strong>${order.game}</strong>
      <p>${order.product}</p>
      <p>${order.id}</p>
      <p>${formatRupiah(order.total)}</p>
      <p>Status: ${order.status}</p>
      <p>${order.date}</p>
    </div>
  `).join("");
}

// ==========================================
// BANTUAN WHATSAPP
// ==========================================

function openHelp() {
  const number = STORE_CONFIG.emergencyWhatsApp.replace(/\D/g,"");

  window.open(
    "https://wa.me/"+number+"?text="+encodeURIComponent("Halo GOTOPUP.ID, saya membutuhkan bantuan."),
    "_blank"
  );
}

// ==========================================
// NOTIFIKASI
// ==========================================

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  },2500);
}

// ==========================================
// BANNER OTOMATIS 3 DETIK
// ==========================================

let bannerIndex = 0;

function initBanner() {
  const track = document.getElementById("bannerTrack");
  const dots = document.getElementById("bannerDots");

  if (!track) return;

  const slides = track.querySelectorAll("img");

  dots.innerHTML = Array.from(slides).map((_,i) => `
    <button class="banner-dot ${i===0?"active":""}"
      onclick="goToBanner(${i})"></button>
  `).join("");

  function update() {
    track.style.transform = `translateX(-${bannerIndex*100}%)`;

    dots.querySelectorAll(".banner-dot").forEach((dot,i) => {
      dot.classList.toggle("active",i===bannerIndex);
    });
  }

  window.goToBanner = index => {
    bannerIndex = index;
    update();
  };

  setInterval(() => {
    bannerIndex = (bannerIndex+1)%slides.length;
    update();
  },STORE_CONFIG.bannerInterval);
}

// ==========================================
// MULAI WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded",() => {
  renderGames();
  renderOrders();
  initBanner();
});
