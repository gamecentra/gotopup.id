// =============================
// PENGATURAN KODE DISKON
// =============================

const DISCOUNT_CODES = {
  "ADMIN TAMPAN1": {
    discount: 0, // Nanti bisa lu atur
    active: true
  },

  "WARDISKON5PERAK": {
    discount: 0,
    active: false,
    message: "Kode diskon sudah habis."
  }
};
// ==========================================
// KATALOG BAGIAN 1 - GOTOPUP.ID
// Tempel di script.js setelah DISCOUNT_CODES
// ==========================================

const catalogData = [
  {
    id: "freefire",
    name: "Free Fire",
    image: "images/freefire.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["5 Diamonds", 984],
      ["10 Diamonds", 1862],
      ["12 Diamonds", 1970],
      ["20 Diamonds", 3618],
      ["25 Diamonds", 4997],
      ["30 Diamonds", 5661],
      ["50 Diamonds", 7650],
      ["55 Diamonds", 8360],
      ["70 Diamonds", 9250],
      ["80 Diamonds", 12254],
      ["100 Diamonds", 14480],
      ["120 Diamonds", 18132],
      ["130 Diamonds", 19291],
      ["140 Diamonds", 18850],
      ["145 Diamonds", 21067],
      ["150 Diamonds", 22049],
      ["190 Diamonds", 27926],
      ["200 Diamonds", 29885],
      ["210 Diamonds", 30326],
      ["280 Diamonds", 39679],
      ["355 Diamonds", 47350],
      ["420 Diamonds", 58866],
      ["425 Diamonds", 59771],
      ["475 Diamonds", 67607],
      ["495 Diamonds", 69565],
      ["500 Diamonds", 70543],
      ["510 Diamonds", 72503],
      ["545 Diamonds", 77401],
      ["565 Diamonds", 79360],
      ["600 Diamonds", 86218],
      ["635 Diamonds", 89154],
      ["720 Diamonds", 96000],
      ["800 Diamonds", 113106],
      ["860 Diamonds", 122540],
      ["930 Diamonds", 132335],
      ["1000 Diamonds", 142129],
      ["1050 Diamonds", 146950],
      ["1075 Diamonds", 156000],
      ["1080 Diamonds", 152909],
      ["1440 Diamonds", 204000],
      ["1450 Diamonds", 205000],
      ["2160 Diamonds", 303000],
      ["2180 Diamonds", 305000],
      ["7290 Diamonds", 986460],
      ["36500 Diamonds", 5005000],
      ["73100 Diamonds", 10010000],

      ["Member Mingguan", 28200],
      ["Member Bulanan", 91715],
      ["BP Card", 46108],
      ["Level Up Pass Level 6", 5598],
      ["Level Up Pass Level 10", 9262],
      ["Level Up Pass Level 15", 9262],
      ["Level Up Pass Level 20", 9262],
      ["Level Up Pass Level 25", 9262],
      ["Level Up Pass Level 30", 15159]
    ]
  },

  {
    id: "freefiremax",
    name: "Free Fire Max",
    image: "images/freefiremax.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["5 Diamonds", 984],
      ["10 Diamonds", 1862],
      ["12 Diamonds", 1970],
      ["20 Diamonds", 3618],
      ["25 Diamonds", 4997],
      ["30 Diamonds", 5661],
      ["50 Diamonds", 7650],
      ["55 Diamonds", 7960],
      ["70 Diamonds", 9250],
      ["80 Diamonds", 12254],
      ["100 Diamonds", 14480],
      ["120 Diamonds", 18132],
      ["130 Diamonds", 19291],
      ["140 Diamonds", 18850],
      ["145 Diamonds", 21067],
      ["150 Diamonds", 22049],
      ["190 Diamonds", 27926],
      ["200 Diamonds", 29885],
      ["210 Diamonds", 30326],
      ["280 Diamonds", 39679],
      ["355 Diamonds", 47350],
      ["420 Diamonds", 58866],
      ["425 Diamonds", 59771],
      ["475 Diamonds", 67607],
      ["495 Diamonds", 69565],
      ["500 Diamonds", 70543],
      ["510 Diamonds", 72503],
      ["545 Diamonds", 77401],
      ["565 Diamonds", 79360],
      ["600 Diamonds", 86218],
      ["635 Diamonds", 89154],
      ["720 Diamonds", 96000],
      ["800 Diamonds", 109106],
      ["860 Diamonds", 118540],
      ["930 Diamonds", 128335],
      ["1000 Diamonds", 129800],
      ["1050 Diamonds", 146950],
      ["1075 Diamonds", 156000],
      ["1080 Diamonds", 152909],
      ["1440 Diamonds", 204000],
      ["1450 Diamonds", 205000],
      ["2160 Diamonds", 303000],
      ["2180 Diamonds", 305000],
      ["7290 Diamonds", 925000],
      ["36500 Diamonds", 5005000],
      ["73100 Diamonds", 10010000],

      ["Member Mingguan", 28200],
      ["Member Bulanan", 91715],
      ["BP Card", 46108],
      ["Level Up Pass Level 6", 5598],
      ["Level Up Pass Level 10", 9262],
      ["Level Up Pass Level 15", 9262],
      ["Level Up Pass Level 20", 9262],
      ["Level Up Pass Level 25", 9262],
      ["Level Up Pass Level 30", 15159]
    ]
  },

  {
    id: "mobilelegends",
    name: "Mobile Legends",
    image: "images/mobilelegends.jpg",
    category: "game",
    fields: ["id", "server"],
    products: [
      ["5 Diamonds", 1675],
      ["10 Diamonds", 3479],
      ["12 Diamonds", 3859],
      ["19 Diamonds", 6241],
      ["28 Diamonds", 9209],
      ["44 Diamonds", 13953],
      ["54 Diamonds", 16595],
      ["59 Diamonds", 17674],
      ["71 Diamonds", 22465],
      ["74 Diamonds", 23450],
      ["85 Diamonds", 26418],
      ["88 Diamonds", 27406],
      ["110 Diamonds", 33235],
      ["113 Diamonds", 35344],
      ["128 Diamonds", 42685],
      ["148 Diamonds", 48816],
      ["170 Diamonds", 52563],
      ["176 Diamonds", 58684],
      ["184 Diamonds", 62276],
      ["222 Diamonds", 74898],
      ["240 Diamonds", 74016],
      ["258 Diamonds", 86804],
      ["277 Diamonds", 86357],
      ["284 Diamonds", 87399],
      ["296 Diamonds", 90832],
      ["301 Diamonds", 95186],
      ["305 Diamonds", 101230],
      ["333 Diamonds", 104480],
      ["346 Diamonds", 108827],
      ["356 Diamonds", 112387],
      ["370 Diamonds", 113783],
      ["384 Diamonds", 117598],
      ["408 Diamonds", 124398],
      ["424 Diamonds", 128917],
      ["452 Diamonds", 147732],
      ["518 Diamonds", 170076],
      ["845 Diamonds", 273549],
      ["875 Diamonds", 280042],
      ["938 Diamonds", 300598],
      ["966 Diamonds", 314324],
      ["1045 Diamonds", 316339],
      ["1136 Diamonds", 367682],
      ["1159 Diamonds", 376696],
      ["1443 Diamonds", 465383],
      ["1506 Diamonds", 485939],
      ["1704 Diamonds", 549023],
      ["2010 Diamonds", 574729],
      ["2232 Diamonds", 694051],
      ["2380 Diamonds", 737049],
      ["2578 Diamonds", 801494],
      ["2625 Diamonds", 816651],
      ["3453 Diamonds", 1080536],
      ["3738 Diamonds", 1172116],
      ["4020 Diamonds", 1235306],
      ["4588 Diamonds", 1228269],
      ["4830 Diamonds", 1332469],
      ["5398 Diamonds", 1629501],
      ["6030 Diamonds", 1850469],
      ["6840 Diamonds", 2068318],
      ["8040 Diamonds", 2470672],
      ["9660 Diamonds", 2896320],
      ["10050 Diamonds", 2678670],
      ["14490 Diamonds", 4339480],
      ["16080 Diamonds", 4931224],
      ["18090 Diamonds", 5666317],
      ["19320 Diamonds", 5782040],
      ["20100 Diamonds", 6161530],
      ["21330 Diamonds", 6397793],
      ["23340 Diamonds", 7012948],
      ["24150 Diamonds", 7225380],
      ["26160 Diamonds", 7840953],
      ["28170 Diamonds", 8456106],

      ["Weekly Diamond Pass", 30490],
      ["Weekly Diamond Pass x2", 62990],
      ["Weekly Diamond Pass x3", 93990],
      ["Weekly Elite Bundle", 17317],
      ["Monthly Epic Bundle", 84884],

      ["100 Diamonds (50+50)", 17317],
      ["300 Diamonds (150+150)", 50751],
      ["500 Diamonds (250+250)", 84884],
      ["1000 Diamonds (500+500)", 169759],

      ["Weekly Diamond Pass Global", 36551],
      ["Weekly Diamond Pass Global", 40141],
      ["Twilight Pass", 175318],
      ["Twilight Pass", 203960],
      ["11 Diamonds Global", 3520],
      ["22 Diamonds Global", 6939],
      ["70 Diamonds Global", 23616],
      ["223 Diamonds Global", 69401],
      ["336 Diamonds Global", 103600],
      ["570 Diamonds Global", 176002],
      ["1163 Diamonds Global", 347000],
      ["2398 Diamonds Global", 694004],
      ["6042 Diamonds Global", 1715008],
      ["140 Diamonds Global", 46685],
      ["Weekly Elite Bundle Global", 17317],
      ["Monthly Epic Bundle Global", 84884],

      ["STARLIGHT BIASA (GIF 7 HARI)", 40000],
      ["STARLIGHT PREMIUM (GIF 7 HARI)", 96000]
    ]
  },

  {
    id: "roblox",
    name: "Roblox",
    image: "images/roblox.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["50 Robux", 6500],
      ["100 Robux", 12600],
      ["200 Robux", 25200],
      ["300 Robux", 37500],
      ["400 Robux", 49800],
      ["500 Robux", 62500],
      ["600 Robux", 74800],
      ["700 Robux", 87200],
      ["800 Robux", 99800],
      ["900 Robux", 112300],
      ["1000 Robux", 124500],
      ["1500 Robux", 187000],
      ["2000 Robux", 250000],
      ["2500 Robux", 311000],
      ["3000 Robux", 373000],
      ["4000 Robux", 497000],
      ["5000 Robux", 625000]
    ]
  },

  {
    id: "magicchessgogo",
    name: "Magic Chess GoGo",
    image: "images/magicchesgogo.jpg",
    category: "game",
    fields: ["id", "server"],
    products: [
      ["5 Diamond", 1780],
      ["Weekly Card", 31700],
      ["12 Diamonds (11+1 Bonus)", 4303],
      ["19 Diamonds (17+2 Bonus)", 6540],
      ["28 Diamonds (25+3 Bonus)", 9524],
      ["44 Diamonds (40+4 Bonus)", 15218],
      ["59 Diamonds (53+6 Bonus)", 20000],
      ["85 Diamonds (77+8 Bonus)", 29000],
      ["170 Diamonds (154+16 Bonus)", 57836],
      ["240 Diamonds (217+23 Bonus)", 81232],
      ["296 Diamonds (256+40 Bonus)", 95878],
      ["408 Diamonds (367+41 Bonus)", 137276],
      ["568 Diamonds (503+65 Bonus)", 187999],
      ["875 Diamonds (774+101 Bonus)", 288971],
      ["2010 Diamonds (1708+302 Bonus)", 637916],
      ["4830 Diamonds (4003+827 Bonus)", 1520959],

      ["100 Diamonds (50+50 Bonus)", 18986],
      ["300 Diamonds (150+150 Bonus) 1x/User", 55841],
      ["500 Diamonds (250+250 Bonus) 1x/User", 92932],
      ["1000 Diamonds (500+500 Bonus) 1x/User", 186358],

      ["Lukas's Battle Bounty", 18786],
      ["Battle for Discounts", 18786]
    ]
  }
];
// ==========================================
// KATALOG BAGIAN 2 - GOTOPUP.ID
// Lanjutan catalogData bagian pertama
// ==========================================

catalogData.push(
  {
    id: "kingofavalon",
    name: "King of Avalon",
    image: "images/kingofavalon.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["500 Diamonds", 75975],
      ["1000 Diamonds", 154075],
      ["2000 Diamonds", 302443],
      ["5000 Diamonds", 768330],
      ["10000 Diamonds", 1520086],
      ["50000 Diamonds", 7663318],
      ["100000 Diamonds", 15196272]
    ]
  },

  {
    id: "undawn",
    name: "Undawn",
    image: "images/undawn.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["Kartu Mingguan", 28400],
      ["Kartu Bulanan", 46800],
      ["Dana Elit (REBATE LV 80)", 123400],
      ["Glory Pass Premium", 139650],
      ["RC x 80", 14900],
      ["RC x 250", 43700],
      ["RC x 450", 72500],
      ["RC x 920", 143540],
      ["RC x 1850", 287540],
      ["RC x 2800", 431540],
      ["RC x 4750", 719540],
      ["RC x 9600", 1439540],
      ["RC x 33000", 4800500],
      ["RC x 66500", 9600500]
    ]
  },

  {
    id: "metalslugawakening",
    name: "Metal Slug Awakening",
    image: "images/metalslugawakening.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["60 Ruby", 14000],
      ["120 Ruby", 27500],
      ["180 Ruby", 41000],
      ["310 Ruby", 61800],
      ["630 Ruby", 123000],
      ["1300 Ruby", 245500],
      ["3230 Ruby", 613000],
      ["6500 Ruby", 1225500],
      ["6500 Ruby x2", 2450500],
      ["6500 Ruby x3", 3660500],
      ["6500 Ruby x5", 6100500],
      ["6500 Ruby x10", 12200500],
      ["6500 Ruby x15", 17872250],
      ["6500 Ruby x20", 23829500],
      ["6500 Ruby x30", 35744000],
      ["6500 Ruby x40", 47658500],
      ["6500 Ruby x50", 59573000],
      ["6500 Ruby x100", 119145500],
      ["Kartu Bulanan", 61800],
      ["Kartu Bulanan Premium", 123000]
    ]
  },

  {
    id: "captaintsubasaace",
    name: "Captain Tsubasa Ace",
    image: "images/captaintsubasaace.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["6 Golden Ball Pack", 1978],
      ["60 + 3 Golden Ball Pack", 15284],
      ["300 + 15 Golden Ball Pack", 73496],
      ["680 + 35 Golden Ball Pack", 147416],
      ["980 + 50 Golden Ball Pack", 230576],
      ["1280 + 65 Golden Ball Pack", 304496],
      ["1980 + 198 Golden Ball Pack", 443096],
      ["3280 + 328 Golden Ball Pack", 738776],
      ["6480 + 648 Golden Ball Pack", 1477976]
    ]
  },

  {
    id: "bethekingjudgedestiny",
    name: "Be The King: Judge Destiny",
    image: "images/bethekingjudgedestiny.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["60 Gold", 13743],
      ["300 Gold", 67796],
      ["680 Gold", 135362],
      ["2040 Gold", 403194],
      ["3400 Gold", 673459],
      ["6800 Gold", 1349121],
      ["60 Ult Tokens", 13743],
      ["300 Ult Tokens", 67796],
      ["680 Ult Tokens", 135362],
      ["2040 Ult Tokens", 403194],
      ["3400 Ult Tokens", 673459],
      ["6800 Ult Tokens", 1349121],
      ["20400 Ult Tokens", 4027443]
    ]
  },

  {
    id: "topeleven",
    name: "Top Eleven",
    image: "images/topeleven.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["220 Gems", 751000]
    ]
  },

  {
    id: "deltaforce",
    name: "Delta Force",
    image: "images/deltaforce.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["18 + 1 Delta Coins", 5900],
      ["30 + 2 Delta Coins", 8600],
      ["60 + 3 Delta Coins", 16400],
      ["300 + 36 Delta Coins", 79701],
      ["420 + 62 Delta Coins", 109401],
      ["680 + 105 Delta Coins", 153202],
      ["1280 + 264 Delta Coins", 305603],
      ["1680 + 385 Delta Coins", 381804],
      ["3280 + 834 Delta Coins", 762808],
      ["6480 + 1944 Delta Coins", 1525115],
      ["12960 + 3888 Delta Coins", 3049730],
      ["19440 + 5832 Delta Coins", 4574346]
    ]
  },

  {
    id: "cloudsongsagaofskywalkers",
    name: "Cloud Song Saga of Skywalkers",
    image: "images/cloudsongsagaofskywalkers.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["0.99$ Tickets", 11803],
      ["1.99$ Tickets", 19336],
      ["2.99$ Tickets", 34406],
      ["5.99$ Tickets", 68312],
      ["11.99$ Tickets", 136123],
      ["21.99$ Tickets", 271748],
      ["29.99$ Tickets", 339560],
      ["59.99$ Tickets", 678619],
      ["99.99$ Tickets", 1356738]
    ]
  },

  {
    id: "harrypottermagicawakened",
    name: "Harry Potter Magic Awakened",
    image: "images/harrypottermagicawakened.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["60 Jewels", 16916],
      ["300 Jewels", 81554],
      ["680 + 70 Jewels", 163634],
      ["980 + 165 Jewels", 255974],
      ["1280 + 270 Jewels", 338054],
      ["1980 + 380 Jewels", 491954],
      ["3280 + 780 Jewels", 820274],
      ["6480 + 2000 Jewels", 1641074]
    ]
  },

  {
    id: "arenaofvalor",
    name: "Arena of Valor",
    image: "images/arenaofvalor.jpg",
    category: "game",
    fields: ["id", "server"],
    products: [
      ["40 Vouchers", 10500],
      ["90 Vouchers", 20500],
      ["230 Vouchers", 50500],
      ["470 Vouchers", 100500],
      ["950 Vouchers", 200500],
      ["1430 Vouchers", 300500],
      ["2390 Vouchers", 500500]
    ]
  },

  {
    id: "afkjourney",
    name: "AFK Journey",
    image: "images/afkjourney.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["21 Dragon Crystals (20+1 Bonus)", 16124],
      ["126 Dragon Crystals (120+6 Bonus)", 77644],
      ["294 Dragon Crystals (280+14 Bonus)", 155764],
      ["588 Dragon Crystals (560+28 Bonus)", 321769],
      ["1554 Dragon Crystals (1480+74 Bonus)", 780724],
      ["3150 Dragon Crystals (3000+150 Bonus)", 1561924],
      ["Esperia Monthly - Classic Gazette", 77644],
      ["Esperia Monthly - Premium Gazette", 243649],
      ["Growth Bundle", 468244]
    ]
  },

  {
    id: "racingmaster",
    name: "Racing Master",
    image: "images/racingmaster.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["70 + 4 Gems", 16500],
      ["140 + 7 Gems", 32500],
      ["210 + 11 Gems", 48500],
      ["350 + 18 Gems", 79500],
      ["700 + 35 Gems", 159500],
      ["1000 + 50 Gems", 225500],
      ["1400 + 70 Gems", 315500],
      ["2100 + 105 Gems", 470500],
      ["3400 + 170 Gems", 760500],
      ["6600 + 330 Gems", 1469500]
    ]
  },

  {
    id: "onmyojiarena",
    name: "Onmyoji Arena",
    image: "images/onmyojiarena.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["Jade 60", 15500],
      ["Jade 200", 71500],
      ["Jade 1280", 284000],
      ["Jade 3280", 707000],
      ["Jade 6480", 1450000]
    ]
  },

  {
    id: "muorigin2",
    name: "MU Origin 2",
    image: "images/muorigin2.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["5 Badges", 5343],
      ["70 Badges", 10187],
      ["109 Badges", 15635],
      ["195 Badges", 27743],
      ["325 Badges", 45904],
      ["951 Badges", 133687],
      ["1621 Badges", 227522],
      ["5401 Badges", 757241],
      ["17283 Badges", 2422071]
    ]
  },

  {
    id: "mobrush",
    name: "Mob Rush",
    image: "images/mobrush.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ["100 Diamonds", 16593],
      ["300 Diamonds", 48778],
      ["500 Diamonds", 80964],
      ["1000 Diamonds", 161428],
      ["2000 Diamonds", 322356],
      ["3000 Diamonds", 483284],
      ["5000 Diamonds", 805140],
      ["10000 Diamonds", 1609780],
      ["Top Value Pack", 5328],
      ["Super Value Hero Pack", 16593],
      ["Diamond Benefits Weekly", 19811],
      ["Diamond Benefits Monthly", 39123],
      ["Account Growth Fund (Normal)", 48778],
      ["Account Growth Fund (Advanced)", 129242],
      ["BattlePass", 80964]
    ]
  }
);
catalogData.push(
  // 46. Zenless Zone Zero
  {
    id: 46,
    name: "Zenless Zone Zero",
    image: "images/zenlesszonezero.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "60 Monochrome", price: 15700 },
      { name: "300 + 30 Monochrome", price: 75550 },
      { name: "980 + 110 Monochrome", price: 237050 },
      { name: "1.980 + 260 Monochrome", price: 455550 },
      { name: "3.280 + 600 Monochrome", price: 759550 },
      { name: "6.480 + 1.600 Monochrome", price: 1519550 },
      { name: "Inter-Knot Membership", price: 75550 }
    ]
  },

  // 47. Speed Drifters
  {
    id: 47,
    name: "Speed Drifters",
    image: "images/speeddrifters.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "56 Diamonds", price: 10235 },
      { name: "112 Diamonds", price: 19970 },
      { name: "282 Diamonds", price: 49173 },
      { name: "579 Diamonds", price: 97846 },
      { name: "1.230 Diamonds", price: 195191 },
      { name: "1.845 Diamonds", price: 292537 },
      { name: "3.134 Diamonds", price: 487227 }
    ]
  },

  // 48. Tamashi Rise of Yokai
  {
    id: 48,
    name: "Tamashi Rise of Yokai",
    image: "images/tamashiriseofyokai.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "60 Sycee", price: 15562 },
      { name: "300 Sycee", price: 74871 },
      { name: "600 Sycee", price: 150183 },
      { name: "900 Sycee", price: 234909 },
      { name: "1.200 Sycee", price: 310221 },
      { name: "1.800 Sycee", price: 451431 },
      { name: "3.000 Sycee", price: 752679 },
      { name: "6.000 Sycee", price: 1505799 }
    ]
  },

  // 49. Marvel Duel
  {
    id: 49,
    name: "Marvel Duel",
    image: "images/marvelduel.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "60 Stardust + 40 Iso-gems", price: 134450 },
      { name: "120 Stardust + 120 Iso-gems", price: 265200 },
      { name: "300 Stardust + 400 Iso-gems", price: 653600 },
      { name: "600 Stardust + 860 Iso-gems", price: 1307100 }
    ]
  },

  // 50. Ghost Story Love Destiny
  {
    id: 50,
    name: "Ghost Story Love Destiny",
    image: "images/ghoststorylovedestiny.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "Monthly Pass", price: 62185 },
      { name: "Privilege Monthly Card", price: 123915 },
      { name: "65 Jade", price: 15679 },
      { name: "125 Jade", price: 30901 },
      { name: "315 + 16 Jade", price: 76437 },
      { name: "625 + 63 Jade", price: 152374 },
      { name: "1.250 + 125 Jade", price: 304247 },
      { name: "3.125 + 469 Jade", price: 759835 },
      { name: "6.250 + 1.250 Jade", price: 1519282 },
      { name: "12.500 + 2.500 Jade", price: 3038064 },
      { name: "31.250 + 6.250 Jade", price: 7594321 }
    ]
  },

  // 51. Ragnarok Origin
  {
    id: 51,
    name: "Ragnarok Origin",
    image: "images/ragnarokorigin.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "40 Nyan Berry", price: 14892 },
      { name: "210 Nyan Berry", price: 68444 },
      { name: "430 Nyan Berry", price: 136528 },
      { name: "900 Nyan Berry", price: 280720 },
      { name: "2.300 Nyan Berry", price: 701116 },
      { name: "4.800 Nyan Berry", price: 1442971 },
      { name: "9.600 Nyan Berry", price: 2885579 },
      { name: "4.800 Nyan Berry x5", price: 7212851 },
      { name: "24.000 Nyan Berry", price: 7213129 },
      { name: "4.800 Nyan Berry x10", price: 14425204 },
      { name: "48.000 Nyan Berry", price: 14425758 },
      { name: "4.800 Nyan Berry x15", price: 21637556 },
      { name: "4.800 Nyan Berry x20", price: 28849908 },
      { name: "96.000 Nyan Berry", price: 28851014 },
      { name: "4.800 Nyan Berry x25", price: 36062261 },
      { name: "4.800 Nyan Berry x30", price: 43274613 },
      { name: "4.800 Nyan Berry x40", price: 57699317 },
      { name: "4.800 Nyan Berry x50", price: 72124021 }
    ]
  },

  // 52. State of Survival
  {
    id: 52,
    name: "State of Survival",
    image: "images/stateofsurvival.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "100 Diamonds", price: 17722 },
      { name: "500 Diamonds", price: 85531 },
      { name: "1.000 Diamonds", price: 171639 },
      { name: "2.000 Diamonds", price: 354618 },
      { name: "5.000 Diamonds", price: 860500 },
      { name: "10.000 Diamonds", price: 1721576 },
      { name: "20.000 Diamonds", price: 3541674 }
    ]
  },

  // 53. Teamfight Tactics Mobile
  {
    id: 53,
    name: "Teamfight Tactics Mobile",
    image: "images/teamfighttactics.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "575 TFT Coins", price: 58813 },
      { name: "1.380 TFT Coins", price: 136564 },
      { name: "2.800 TFT Coins", price: 272629 },
      { name: "4.500 TFT Coins", price: 428131 },
      { name: "6.500 TFT Coins", price: 603071 },
      { name: "13.500 TFT Coins", price: 1166766 }
    ]
  },

  // 54. Genshin Impact
  {
    id: 54,
    name: "Genshin Impact",
    image: "images/genshinimpact.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "60 Genesis Crystals", price: 16175 },
      { name: "300 + 30 Genesis Crystals", price: 77450 },
      { name: "980 + 110 Genesis Crystals", price: 242750 },
      { name: "1.980 + 260 Genesis Crystals", price: 465050 },
      { name: "3.280 + 600 Genesis Crystals", price: 774750 },
      { name: "6.480 + 1.600 Genesis Crystals", price: 1548050 },
      { name: "Blessing of the Welkin Moon", price: 77450 },
      { name: "60 Chronal Nexus", price: 16175 },
      { name: "300 + 30 Chronal Nexus", price: 77450 },
      { name: "980 + 110 Chronal Nexus", price: 242750 },
      { name: "1.980 + 260 Chronal Nexus", price: 465058 },
      { name: "3.280 + 600 Chronal Nexus", price: 774750 }
    ]
  },

  // 55. The Lord of the Rings: Rise to War
  {
    id: 55,
    name: "The Lord of the Rings: Rise to War",
    image: "images/lotrrisetowar.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "200 Gems", price: 13253 },
      { name: "1.000 Gems", price: 65527 },
      { name: "2.300 Gems", price: 130868 },
      { name: "4.600 Gems", price: 261551 },
      { name: "11.500 Gems", price: 653599 },
      { name: "23.000 Gems", price: 1307013 }
    ]
  },

  // 56. Ragnarok X Next Generation
  {
    id: 56,
    name: "Ragnarok X Next Generation",
    image: "images/ragnarokxnextgeneration.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "2.310 Diamonds", price: 69000 },
      { name: "4.990 Diamonds", price: 146600 },
      { name: "10.290 Diamonds", price: 301800 },
      { name: "15.600 Diamonds", price: 457000 },
      { name: "31.200 Diamonds", price: 913500 },
      { name: "51.370 Diamonds", price: 1461300 },
      { name: "160.540 Diamonds", price: 4565500 },
      { name: "321.090 Diamonds", price: 9130500 },
      { name: "963.270 Diamonds", price: 27390500 },
      { name: "Hadiah Privilege W", price: 204099 },
      { name: "Assurance of Exclusivity", price: 346527 },
      { name: "Oath of Bond", price: 562908 }
    ]
  },

  // 57. One Punch Man: The Strongest
  {
    id: 57,
    name: "One Punch Man: The Strongest",
    image: "images/onepunchmanthestrongest.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "6 Kupon", price: 9700 },
      { name: "22 Kupon", price: 37500 },
      { name: "54 Kupon", price: 92900 },
      { name: "107 Kupon", price: 185300 },
      { name: "214 Kupon", price: 370100 },
      { name: "321 Kupon", price: 554900 },
      { name: "2.669 Kupon", price: 4620500 }
    ]
  },

  // 58. League of Legends: Wild Rift
  {
    id: 58,
    name: "League of Legends: Wild Rift",
    image: "images/wildrift.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "425 Cores", price: 53702 },
      { name: "1.000 Cores", price: 119255 },
      { name: "1.850 Cores", price: 214259 },
      { name: "3.275 Cores", price: 375766 },
      { name: "10.000 Cores", price: 1073095 }
    ]
  },

  // 59. Growtopia
  {
    id: 59,
    name: "Growtopia",
    image: "images/growtopia.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "Chest O' Gems", price: 28500 },
      { name: "Gem Fountain", price: 75200 },
      { name: "It's Rainin' Gems", price: 150500 },
      { name: "Gem Bounty", price: 450500 },
      { name: "Gem Abundance", price: 738000 },
      { name: "Royal Grow Pass", price: 150500 },
      { name: "1-Year Subscription Token", price: 738000 }
    ]
  },

  // 60. Tom and Jerry: Chase
  {
    id: 60,
    name: "Tom and Jerry: Chase",
    image: "images/tomandjerrychase.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "60 Diamonds", price: 16000 },
      { name: "180 + 6 Diamonds", price: 43700 },
      { name: "300 + 20 Diamonds", price: 71500 },
      { name: "600 + 45 Diamonds", price: 143000 },
      { name: "1.200 + 100 Diamonds", price: 288500 },
      { name: "1.800 + 170 Diamonds", price: 436000 },
      { name: "3.000 + 300 Diamonds", price: 721400 },
      { name: "6.000 + 1.000 Diamonds", price: 1412200 }
    ]
  }
);
catalogData.push(
  {
    id: 61,
    name: "Hago",
    image: "images/hago.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "1.200 Diamonds", price: 2645 },
      { name: "9.200 Diamonds", price: 16834 },
      { name: "18.200 Diamonds", price: 33167 },
      { name: "45.600 Diamonds", price: 82167 },
      { name: "76.200 Diamonds", price: 136612 },
      { name: "183.000 Diamonds", price: 327167 },
      { name: "336.000 Diamonds", price: 599391 },
      { name: "672.400 Diamonds", price: 1198280 }
    ]
  },
  {
    id: 62,
    name: "Punishing Gray Raven",
    image: "images/punishinggrayraven.jpg",
    category: "game",
    fields: ["id"],
    products: [
      ...["Android", "iOS"].flatMap(platform =>
        [14982, 69047, 85459, 138559, 165592, 279515, 685968, 1391520]
          .map((price, i) => ({
            name: `${platform} - ${["5", "28", "34", "59", "71", "119", "299", "600"][i]} Rainbow Cards`,
            price
          }))
    ]
  },
  {
    id: 63,
    name: "Pixel Gun 3D",
    image: "images/pixelgun3d.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "50 + 5 Coins", price: 15300 },
      { name: "150 + 15 Coins", price: 45198 },
      { name: "250 + 25 Coins", price: 75096 },
      { name: "500 + 100 Coins", price: 149841 },
      { name: "1.000 + 300 Coins", price: 299333 },
      { name: "2.500 + 1.000 Coins", price: 747805 },

      { name: "50 + 5 Keys", price: 15300 },
      { name: "150 + 15 Keys", price: 45198 },
      { name: "250 + 25 Keys", price: 75095 },
      { name: "500 + 100 Keys", price: 149841 },
      { name: "1.000 + 300 Keys", price: 299333 },
      { name: "2.500 + 1.000 Keys", price: 747805 },

      { name: "90 + 10 Gems", price: 45198 },
      { name: "150 + 25 Gems", price: 75095 },
      { name: "300 + 75 Gems", price: 149841 },
      { name: "600 + 200 Gems", price: 299333 },
      { name: "1.500 + 700 Gems", price: 747805 },

      { name: "60 + 6 Pixel Pass Tickets", price: 15300 },
      { name: "180 + 20 Pixel Pass Tickets", price: 45198 },
      { name: "300 + 50 Pixel Pass Tickets", price: 75095 },
      { name: "600 + 150 Pixel Pass Tickets", price: 149841 },
      { name: "1.200 + 550 Pixel Pass Tickets", price: 299333 },
      { name: "3.000 + 1.500 Pixel Pass Tickets", price: 747805 },

      { name: "Basic Set", price: 75096 },
      { name: "Advanced Set", price: 149841 },
      { name: "Expert Set", price: 299333 },
      { name: "Winner Set", price: 747805 }
    ]
  },
  {
    id: 64,
    name: "ASTRA: Knights of Veda",
    image: "images/astraknightsofveda.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "60 Rubies", price: 15045 },
      { name: "300 Rubies", price: 73811 },
      { name: "980 Rubies", price: 220728 },
      { name: "1.980 Rubies", price: 441101 },
      { name: "3.280 Rubies", price: 734932 },
      { name: "6.480 Rubies", price: 1469513 }
    ]
  },
  {
    id: 65,
    name: "Legend of Mushroom: Rush",
    image: "images/legendofmushroomrush.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "99 Gems + Bonus Items", price: 14612 },
      { name: "499 Gems + Bonus Items", price: 71060 },
      { name: "999 Gems + Bonus Items", price: 141620 },
      { name: "1.999 Gems + Bonus Items", price: 282740 },
      { name: "4.999 Gems + Bonus Items", price: 706100 },
      { name: "9.999 Gems + Bonus Items", price: 1411700 },
      { name: "29.999 Gems + Bonus Items", price: 4234100 },
      { name: "59.999 Gems + Bonus Items", price: 8467700 }
    ]
  },
  {
    id: 66,
    name: "Heroic Uncle Kim",
    image: "images/heroicunclekim.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "95 Demon Coins + 150 Master Keys", price: 35842 },
      { name: "150 Demon Coins + 300 Master Keys", price: 54109 },
      { name: "950 Dragon Orbs", price: 100378 },
      { name: "220 Gems + 20 Master Keys", price: 11427 },
      { name: "1.200 Gems + 90 Master Keys", price: 54109 },
      { name: "2.400 Gems + 150 Master Keys", price: 100378 },
      { name: "8.500 Gems + 500 Master Keys", price: 291086 },
      { name: "16.000 Gems + 1.000 Master Keys", price: 491013 },
      { name: "36.000 Gems + 2.000 Master Keys", price: 990574 },
      { name: "Ads Pass 30 Days + 240 Gems", price: 100378 }
    ]
  },
  {
    id: 67,
    name: "Total Football",
    image: "images/totalfootball.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "2 TF Point Package", price: 3900 },
      { name: "10 TF Point Package", price: 16900 },
      { name: "32 TF Point Package", price: 50100 },
      { name: "52 TF Point Package", price: 83200 },
      { name: "100 TF Point Package", price: 163500 },
      { name: "200 TF Point Package", price: 302000 },
      { name: "312 TF Point Package", price: 495600 },
      { name: "520 TF Point Package", price: 827500 },
      { name: "1.000 TF Point Package", price: 1574300 },
      { name: "2.000 TF Point Package", price: 3148100 },
      { name: "4.000 TF Point Package", price: 6295600 }
    ]
  }
);
catalogData.push(
  {
    id: 38,
    name: "Point Blank",
    image: "images/pointblank.jpg",
    category: "game_pc",
    fields: ["id"],
    products: [
      { name: "1.200 PB Cash", price: 10340 },
      { name: "2.400 PB Cash", price: 20180 },
      { name: "6.000 PB Cash", price: 49700 },
      { name: "12.000 PB Cash", price: 98899 },
      { name: "24.000 PB Cash", price: 197297 },
      { name: "36.000 PB Cash", price: 295696 },
      { name: "60.000 PB Cash", price: 492494 }
    ]
  },
  {
    id: 69,
    name: "League of Legends (PC)",
    image: "images/leagueoflegendspc.jpg",
    category: "game_pc",
    fields: ["id"],
    products: [
      { name: "575 RP", price: 58800 },
      { name: "1.380 RP", price: 136500 },
      { name: "2.800 RP", price: 272500 },
      { name: "4.500 RP", price: 427900 },
      { name: "6.500 RP", price: 602700 },
      { name: "13.500 RP", price: 1165900 }
    ]
  },
  {
    id: 70,
    name: "Marvel Rivals",
    image: "images/marvelrivals.jpg",
    category: "game",
    fields: ["id"],
    products: [
      { name: "100 Lattices", price: 18565 },
      { name: "500 Lattices", price: 91023 },
      { name: "1.000 Lattices", price: 182935 },
      { name: "2.180 Lattices", price: 365569 },
      { name: "5.680 Lattices", price: 913469 },
      { name: "11.680 Lattices", price: 1826637 }
    ]
  },
  {
    id: 71,
    name: "Poppo Live",
    image: "images/poppolive.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "1.000 Coins", price: 2684 },
      { name: "7.000 Coins", price: 15190 },
      { name: "21.000 Coins", price: 44570 },
      { name: "25.500 Coins", price: 54099 },
      { name: "43.500 Coins", price: 92412 },
      { name: "43.750 Coins", price: 93008 },
      { name: "70.000 Coins", price: 147401 },
      { name: "83.000 Coins", price: 175391 },
      { name: "88.000 Coins", price: 186310 },
      { name: "88.990 Coins", price: 188493 },
      { name: "178.000 Coins", price: 376487 },
      { name: "180.000 Coins", price: 381053 },
      { name: "210.000 Coins", price: 441203 },
      { name: "270.000 Coins", price: 571230 },
      { name: "273.000 Coins", price: 577185 },
      { name: "252.000 Coins", price: 732225 },
      { name: "350.000 Coins", price: 735004 },
      { name: "430.000 Coins", price: 911285 },
      { name: "450.000 Coins", price: 950988 },
      { name: "455.000 Coins", price: 962701 },
      { name: "700.000 Coins", price: 1469509 },
      { name: "1.050.000 Coins", price: 2204013 },
      { name: "1.400.000 Coins", price: 2938517 },
      { name: "1.750.000 Coins", price: 3673022 },
      { name: "2.100.000 Coins", price: 4407526 },
      { name: "2.450.000 Coins", price: 5142030 },
      { name: "2.800.000 Coins", price: 5876535 },
      { name: "3.150.000 Coins", price: 6611039 },
      { name: "3.500.000 Coins", price: 7345544 },
      { name: "4.200.000 Coins", price: 8814552 },
      { name: "4.900.000 Coins", price: 10283561 },
      { name: "5.600.000 Coins", price: 11752570 },
      { name: "6.300.000 Coins", price: 13221578 },
      { name: "7.000.000 Coins", price: 14690587 },
      { name: "8.750.000 Coins", price: 18363109 },
      { name: "10.500.000 Coins", price: 22035631 },
      { name: "12.250.000 Coins", price: 25708152 },
      { name: "14.000.000 Coins", price: 29380674 },
      { name: "15.750.000 Coins", price: 33053196 },
      { name: "17.500.000 Coins", price: 36725718 },
      { name: "19.250.000 Coins", price: 40398239 },
      { name: "21.000.000 Coins", price: 44070761 },
      { name: "24.500.000 Coins", price: 51415805 },
      { name: "28.000.000 Coins", price: 58760848 },
      { name: "31.500.000 Coins", price: 66105892 },
      { name: "35.000.000 Coins", price: 73450935 }
    ]
  },
  {
    id: 72,
    name: "Bigo Live",
    image: "images/bigolive.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "25 Diamonds", price: 9495 },
      { name: "50 Diamonds", price: 18489 },
      { name: "100 Diamonds", price: 36478 },
      { name: "150 Diamonds", price: 54672 },
      { name: "200 Diamonds", price: 72661 },
      { name: "250 Diamonds", price: 90650 },
      { name: "300 Diamonds", price: 108639 },
      { name: "500 Diamonds", price: 180799 },
      { name: "750 Diamonds", price: 270949 },
      { name: "1.000 Diamonds", price: 361098 },
      { name: "2.000 Diamonds", price: 721492 },
      { name: "3.000 Diamonds", price: 1082091 },
      { name: "4.000 Diamonds", price: 1442485 },
      { name: "5.000 Diamonds", price: 1803083 },
      { name: "7.500 Diamonds", price: 2704375 },
      { name: "10.000 Diamonds", price: 3605666 },
      { name: "20.000 Diamonds", price: 7210832 },
      { name: "30.000 Diamonds", price: 10815999 },
      { name: "50.000 Diamonds", price: 18026331 }
    ]
  },
  {
    id: 73,
    name: "Chamet",
    image: "images/chamet.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "18.750 Diamonds", price: 60488 },
      { name: "62.500 Diamonds", price: 200804 },
      { name: "187.500 Diamonds", price: 600385 },
      { name: "625.000 Diamonds", price: 2003540 },
      { name: "1.875.000 Diamonds", price: 5999348 },
      { name: "3.750.000 Diamonds", price: 11987924 },
      { name: "6.250.000 Diamonds", price: 20030900 }
    ]
  }
);
catalogData.push(
  {
    id: 74,
    name: "WeSing",
    image: "images/wesing.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "37 Kcoins", price: 10400 },
      { name: "112 Kcoins", price: 30100 },
      { name: "373 Kcoins", price: 99100 },
      { name: "933 Kcoins", price: 247000 },
      { name: "1.866 Kcoins", price: 493400 },
      { name: "3.731 Kcoins", price: 986300 },
      { name: "5.597 Kcoins", price: 1479000 }
    ]
  },
  {
    id: 75,
    name: "Sugo: Voice Live Chat Party",
    image: "images/sugo.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "1.200 Coins", price: 20738 },
      { name: "2.400 Coins", price: 41180 },
      { name: "6.250 Coins", price: 102506 },
      { name: "12.500 Coins", price: 204716 },
      { name: "37.500 Coins", price: 613558 },
      { name: "65.000 Coins", price: 1022400 },
      { name: "130.000 Coins", price: 2044504 }
    ]
  },
  {
    id: 76,
    name: "Lita",
    image: "images/lita.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "300 Lita Coins", price: 39688 },
      { name: "600 Lita Coins", price: 78877 },
      { name: "1.000 Lita Coins", price: 130195 },
      { name: "2.000 Lita Coins", price: 259889 },
      { name: "5.000 Lita Coins", price: 648973 },
      { name: "10.000 Lita Coins", price: 1296514 }
    ]
  },
  {
    id: 77,
    name: "Livu",
    image: "images/livu.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "299 Coin", price: 54716 },
      { name: "650 Coin", price: 90896 },
      { name: "990 Coin", price: 145004 },
      { name: "2.500 Coin", price: 325148 },
      { name: "5.000 Coin", price: 627332 },
      { name: "10.000 Coin", price: 1166360 },
      { name: "20.000 Coin", price: 2268716 },
      { name: "50.000 Coin", price: 5388188 }
    ]
  },
  {
    id: 78,
    name: "Like",
    image: "images/like.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "100 Diamonds", price: 36277 },
      { name: "200 Diamonds", price: 72053 },
      { name: "500 Diamonds", price: 178991 },
      { name: "1.000 Diamonds", price: 357481 },
      { name: "1.500 Diamonds", price: 535972 },
      { name: "2.000 Diamonds", price: 714461 },
      { name: "2.500 Diamonds", price: 892952 },
      { name: "3.000 Diamonds", price: 1071442 },
      { name: "3.500 Diamonds", price: 1249933 },
      { name: "4.000 Diamonds", price: 1428423 },
      { name: "4.500 Diamonds", price: 1606914 },
      { name: "5.000 Diamonds", price: 1785206 },
      { name: "10.000 Diamonds", price: 3569914 },
      { name: "20.000 Diamonds", price: 7139328 }
    ]
  },
  {
    id: 79,
    name: "StarMaker (Global)",
    image: "images/starmaker.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "60 Coins + 5 Bonus", price: 13500 },
      { name: "420 Coins + 40 Bonus", price: 91700 },
      { name: "300 Coins + 25 Bonus", price: 65600 },
      { name: "600 Coins + 60 Bonus", price: 130800 },
      { name: "1.000 Coins + 110 Bonus", price: 219500 },
      { name: "1.200 Coins + 150 Bonus", price: 266500 },
      { name: "1.600 Coins + 200 Bonus", price: 355200 },
      { name: "2.100 Coins + 300 Bonus", price: 472600 },
      { name: "2.700 Coins + 400 Bonus", price: 608200 },
      { name: "3.000 Coins + 450 Bonus", price: 677400 },
      { name: "3.400 Coins + 550 Bonus", price: 775200 },
      { name: "5.000 Coins + 850 Bonus", price: 1147000 },
      { name: "6.000 Coins + 1.100 Bonus", price: 1387000 },
      { name: "6.500 Coins + 1.200 Bonus", price: 1503100 },
      { name: "7.000 Coins + 1.300 Bonus", price: 1616600 },
      { name: "10.000 Coins + 1.900 Bonus", price: 2315700 },
      { name: "14.000 Coins + 2.800 Bonus", price: 3261500 }
    ]
  },
  {
    id: 80,
    name: "WeTV",
    image: "images/wetv.jpg",
    category: "entertainment",
    fields: ["id"],
    products: [
      { name: "12 Months VIP", price: 476200 }
    ]
  }
);
