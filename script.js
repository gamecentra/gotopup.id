
/* =====================================================
   GOTUP.ID — SCRIPT.JS
   ===================================================== */

// DISKON — LETAK PALING ATAS, MUDAH DIEDIT
const DISCOUNT_CONFIG = {
    code: "ADMIN TAMPAN1",
    amount: 100,
    fakeCode: "WARDISKON5PERAK"
};

const CONFIG = {
    paymentWhatsApp: "628818238236",
    customerService: "6283130951231",
    qrisImage: "qris.png"
};

// DATA PRODUK
// Masukkan katalog asli ke array ini.
// Format: { name, category, products: [{ name, price }] }
const catalogData = [];

let selectedGame = null;
let selectedProduct = null;
let appliedDiscount = 0;

// FORMAT RUPIAH
function rupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);
}

// ELEMENT
const app = document.getElementById("app");

// TAMPILKAN KATALOG
function renderCatalog() {
    if (!app) return;

    app.innerHTML = `
        <section class="catalog">
            <h2>Katalog Top Up</h2>
            <input
                id="searchGame"
                type="search"
                placeholder="Cari game atau layanan..."
            >
            <div id="gameList" class="game-list"></div>
        </section>
    `;

    document.getElementById("searchGame")
        .addEventListener("input", event => {
            renderGames(event.target.value);
        });

    renderGames();
}

// DAFTAR GAME
function renderGames(keyword = "") {
    const container = document.getElementById("gameList");
    if (!container) return;

    const filtered = catalogData.filter(game =>
        game.name.toLowerCase().includes(keyword.toLowerCase())
    );

    container.innerHTML = filtered.map((game, index) => `
        <button
            class="game-card"
            data-game="${index}"
            type="button"
        >
            <span>${escapeHTML(game.name)}</span>
            <small>${escapeHTML(game.category || "Top Up")}</small>
        </button>
    `).join("");

    container.querySelectorAll("[data-game]")
        .forEach(button => {
            button.addEventListener("click", () => {
                const game = filtered[Number(button.dataset.game)];
                openGame(game);
            });
        });
}

// HALAMAN DETAIL GAME
function openGame(game) {
    selectedGame = game;
    selectedProduct = null;
    appliedDiscount = 0;

    app.innerHTML = `
        <section class="product-page">
            <button id="backCatalog" type="button">← Kembali</button>
            <h2>${escapeHTML(game.name)}</h2>

            <label for="playerId">User ID</label>
            <input id="playerId" placeholder="Masukkan User ID">

            <label for="serverId">Server / Zone ID</label>
            <input id="serverId" placeholder="Masukkan Server ID">

            <h3>Pilih Nominal</h3>
            <div id="productList"></div>

            <label for="discountCode">Kode Diskon</label>
            <input id="discountCode" placeholder="Masukkan kode">

            <button id="applyDiscount" type="button">
                Gunakan Diskon
            </button>

            <p id="discountMessage"></p>
            <p id="totalPrice">Total: Rp0</p>

            <button id="checkout" type="button">
                Lanjut Pembayaran
            </button>
        </section>
    `;

    document.getElementById("backCatalog")
        .addEventListener("click", renderCatalog);

    const list = document.getElementById("productList");

    list.innerHTML = (game.products || []).map((product, index) => `
        <button
            class="product-option"
            data-product="${index}"
            type="button"
        >
            ${escapeHTML(product.name)}
            — ${rupiah(product.price)}
        </button>
    `).join("");

    list.querySelectorAll("[data-product]")
        .forEach(button => {
            button.addEventListener("click", () => {
                selectedProduct =
                    game.products[Number(button.dataset.product)];

                updateTotal();

                list.querySelectorAll(".product-option")
                    .forEach(item => item.classList.remove("active"));

                button.classList.add("active");
            });
        });

    document.getElementById("applyDiscount")
        .addEventListener("click", applyDiscountCode);

    document.getElementById("checkout")
        .addEventListener("click", checkout);
}

// VALIDASI KODE DISKON
function applyDiscountCode() {
    const input = document.getElementById("discountCode");
    const message = document.getElementById("discountMessage");

    const code = input.value.trim().toUpperCase();

    if (code === DISCOUNT_CONFIG.fakeCode.toUpperCase()) {
        appliedDiscount = 0;
        message.textContent =
            "Kode promo sudah habis atau tidak tersedia.";
        updateTotal();
        return;
    }

    if (code === DISCOUNT_CONFIG.code.toUpperCase()) {
        appliedDiscount = DISCOUNT_CONFIG.amount;
        message.textContent = "Kode diskon berhasil digunakan.";
        updateTotal();
        return;
    }

    appliedDiscount = 0;
    message.textContent = "Kode diskon tidak valid.";
    updateTotal();
}

// HITUNG TOTAL
function updateTotal() {
    const totalElement = document.getElementById("totalPrice");
    if (!totalElement) return;

    const price = selectedProduct
        ? Number(selectedProduct.price)
        : 0;

    const total = Math.max(0, price - appliedDiscount);

    totalElement.textContent = `Total: ${rupiah(total)}`;
}

// PEMBAYARAN
function checkout() {
    if (!selectedGame || !selectedProduct) {
        alert("Pilih nominal top up terlebih dahulu.");
        return;
    }

    const playerId =
        document.getElementById("playerId").value.trim();

    const serverId =
        document.getElementById("serverId").value.trim();

    if (!playerId) {
        alert("User ID wajib diisi.");
        return;
    }

    const price = Number(selectedProduct.price);
    const total = Math.max(0, price - appliedDiscount);

    const message = [
        "Halo GOTUP.ID, saya ingin melakukan top up.",
        "",
        `Game: ${selectedGame.name}`,
        `Produk: ${selectedProduct.name}`,
        `User ID: ${playerId}`,
        `Server ID: ${serverId || "-"}`,
        `Harga: ${rupiah(price)}`,
        `Total: ${rupiah(total)}`
    ].join("\n");

    const url =
        `https://wa.me/${CONFIG.paymentWhatsApp}?text=` +
        encodeURIComponent(message);

    window.open(url, "_blank");
}

// HTML ESCAPE
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// CUSTOMER SERVICE
function openCustomerService() {
    window.open(
        `https://wa.me/${CONFIG.customerService}`,
        "_blank"
    );
}

// MULAI WEBSITE
document.addEventListener("DOMContentLoaded", () => {
    renderCatalog();
});

function makeProducts(lines) {
    return lines.trim().split("\n").map(line => {
        const [name, price] = line.split("|");
        return {
            name: name.trim(),
            price: Number(price.trim().replace(/\./g, ""))
        };
    });
}

const catalogData = [
    {
        name: "FREE FIRE",
        category: "Game",
        products: makeProducts(`
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
Member Mingguan|28200
Member Bulanan|91715
BP Card|46108
Level Up Pass Level 6|5598
Level Up Pass Level 10|9262
Level Up Pass Level 15|9262
Level Up Pass Level 20|9262
Level Up Pass Level 25|9262
Level Up Pass Level 30|15159
`)
    },
    {
        name: "FREE FIRE MAX",
        category: "Game",
        products: makeProducts(`
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
Member Mingguan|28200
Member Bulanan|91715
BP Card|46108
Level Up Pass Level 6|5598
Level Up Pass Level 10|9262
Level Up Pass Level 15|9262
Level Up Pass Level 20|9262
Level Up Pass Level 25|9262
Level Up Pass Level 30|15159
`)
    },
    {
        name: "MOBILE LEGENDS",
        category: "Game",
        products: makeProducts(`
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
Weekly Diamond Pass|30490
Weekly Diamond Pass x2|62990
Weekly Diamond Pass x3|93990
Weekly Elite Bundle|17317
Monthly Epic Bundle|84884
100 Diamonds (50+50)|17317
300 Diamonds (150+150)|50751
500 Diamonds (250+250)|84884
1000 Diamonds (500+500)|169759
Global Weekly Diamond Pass|36551
Global Weekly Diamond Pass|40141
Global Twilight Pass|175318
Global Twilight Pass|203960
Global 11 Diamonds|3520
Global 22 Diamonds|6939
Global 70 Diamonds|23616
Global 223 Diamonds|69401
Global 336 Diamonds|103600
Global 570 Diamonds|176002
Global 1163 Diamonds|347000
Global 2398 Diamonds|694004
Global 6042 Diamonds|1715008
Global 140 Diamonds|46685
Global Weekly Elite Bundle|17317
Global Monthly Epic Bundle|84884
STARLIGHT BIASA (GIF 7HARI)|40000
STARLIGHT PREMIUM (GIF 7 HARI)|96000
`)
    }
];

catalogData.push(
    {
        name: "ROBLOX",
        category: "Game",
        products: makeProducts(`
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
`)
    },
    {
        name: "MAGIC CHESS GOGO",
        category: "Game",
        products: makeProducts(`
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
2010 Diamonds (1708 + 302 Bonus)|637916
4830 Diamonds (4003 + 827 Bonus)|1520959
100 Diamonds (50 + 50 Bonus)|18986
300 Diamonds (150 + 150 Bonus) (1x/User)|55841
500 Diamonds (250 + 250 Bonus) (1x/User)|92932
1000 Diamonds (500 + 500 Bonus) (1x/User)|186358
Lukas's Battle Bounty|18786
Battle for Discounts|18786
`)
    },
    {
        name: "PUBG MOBILE",
        category: "Game",
        products: makeProducts(`
60 UC|16793
120 UC|33587
600 UC + 60 Bonus|170750
3000 UC + 850 Bonus|849915
6000 UC + 2100 Bonus|1698820
12000 UC + 4200 Bonus|3396740
18000 UC + 6300 Bonus|5094960
24000 UC + 8400 Bonus|6793180
36000 UC + 12600 Bonus|10189920
48000 UC + 16800 Bonus|13585960
`)
    },
    {
        name: "VALORANT",
        category: "PC Game",
        products: makeProducts(`
475 VP|53219
1000 VP|105939
1475 VP|158659
2050 VP|211378
2525 VP|264097
3050 VP|316817
3650 VP|366713
4125 VP|419432
4650 VP|472151
5350 VP|526753
5700 VP|577590
5825 VP|579473
6350 VP|632192
7300 VP|732924
7400 VP|737632
9000 VP|892966
11000 VP|1035120
11475 VP|1087839
12000 VP|1140559
13050 VP|1245998
14650 VP|1401333
15100 VP|1456876
16350 VP|1561373
16700 VP|1612210
18300 VP|1767544
20000 VP|1927586
22000 VP|2069740
`)
    },
    {
        name: "EA ESPORT FC MOBILE",
        category: "Game",
        products: makeProducts(`
40 FC Points|6900
100 FC Points|16200
520 FC Points|78000
1070 FC Points|156475
2200 FC Points|323250
5750 FC Points|784325
12000 FC Points|1569100
39 Silver|6900
99 Silver|16200
499 Silver|78000
999 Silver|156475
1999 Silver|323250
4999 Silver|784325
9999 Silver|1569100
`)
    },
    {
        name: "VIDIO",
        category: "Entertainment",
        products: makeProducts(`
Ultimate All Screen 1 Tahun|1379500
Ultimate Mobile 30 Hari|105500
Ultimate Mobile 1 Tahun|765500
Ultimate All Screen 30 Hari|200500
Ultimate Mobile 3 Bulan|263658
Platinum 30 Hari|54500
Platinum Extra 30 Hari|76500
Platinum 3 Bulan|118500
Platinum Extra 3 Bulan|187500
Platinum 1 Tahun|398500
Platinum Extra 1 Tahun|553500
`)
    },
    {
        name: "HONOR OF KINGS",
        category: "Game",
        products: makeProducts(`
16 Tokens|3700
80 Tokens|16500
240 Tokens|47500
400 Tokens|80500
560 Tokens|109500
2400 + 108 Bonus Tokens|480500
4000 + 180 Bonus Tokens|800500
8000 + 360 Bonus Tokens|1599500
`)
    },
    {
        name: "BLOOD STRIKE",
        category: "Game",
        products: makeProducts(`
300+20 GOLD|42500
500+40 GOLD|70500
1000+100 GOLD|140500
2000+260 GOLD|280500
5000+800 GOLD|710000
`)
    },
    {
        name: "FOOTBALL MASTER 2",
        category: "Game",
        products: makeProducts(`
18 FMP|4772
95 FMP|21716
191 FMP|43226
382 FMP|85951
972 FMP|214128
1944 FMP|427756
3888 FMP|855012
9900 FMP|2136780
`)
    },
    {
        name: "FOOTBALL DREAMS BE A PRO",
        category: "Game",
        products: makeProducts(`
60 Supreme Tokens|14637
180 Supreme Tokens|42793
300 Supreme Tokens|71127
680 Supreme Tokens|142212
940 Supreme Tokens|212499
1280 Supreme Tokens|283868
1980 Supreme Tokens|425349
3120 Supreme Tokens|707360
6480 Supreme Tokens|1417616
Indonesian Garuda|23996
`)
    },
    {
        name: "RAGNAROK M CLASSIC",
        category: "Game",
        products: makeProducts(`
1.8 Million Zeny|48747
3 Million + 60 Thousand Zeny|80912
6.8 Million + 272 Thousand Zeny|158485
12.8 Million + 768 Thousand Zeny|280522
32.8 Million + 2.7 Million Zeny|715692
64.8 Million + 7.2 Million Zeny|1383142
144 Million + 16 Million Zeny|3109124
Abundant Double Zeny Supply|492431
Petty Double Zeny Supply Box|165108
Upgrade Adventure Log|113076
Collection Adventure Log|374178
`)
    },
    {
        name: "ZEPETO",
        category: "Entertainment",
        products: makeProducts(`
14 Zems|15000
28 Zems|31300
58 Zems|62300
128 Zems|132000
323 Zems|333100
1000 Zems|1000500
4680 Coins|16300
9700 Coins|31300
25200 Coins|77700
40700 Coins|124200
110000 Coins|325300
300000 Coins|864100
Premium (1M)|64300
`)
    }
);

catalogData.push(
    {
        name: "KING OF AVALON",
        category: "Game",
        products: makeProducts(`
500 Diamonds|75975
1000 Diamonds|154075
2000 Diamonds|302443
5000 Diamonds|768330
10000 Diamonds|1520086
50000 Diamonds|7663318
100000 Diamonds|15196272
`)
    },
    {
        name: "UNDAWN",
        category: "Game",
        products: makeProducts(`
Kartu Mingguan|28400
Kartu Bulanan|46800
Dana Elit (REBATE LV 80)|123400
Glory Pass Premium|139650
RC x 80|14900
RC x 250|43700
RC x 450|72500
RC x 920|143540
RC x 1850|287540
RC x 2800|431540
RC x 4750|719540
RC x 9600|1439540
RC x 33000|4800500
RC x 66500|9600500
`)
    },
    {
        name: "METAL SLUG AWAKENING",
        category: "Game",
        products: makeProducts(`
60 Ruby|14000
120 Ruby|27500
180 Ruby|41000
310 Ruby|61800
630 Ruby|123000
1300 Ruby|245500
3230 Ruby|613000
6500 Ruby|1225500
6500 Ruby x2|2450500
6500 Ruby x3|3660500
6500 Ruby x5|6100500
6500 Ruby x10|12200500
6500 Ruby x15|17872250
6500 Ruby x20|23829500
6500 Ruby x30|35744000
6500 Ruby x40|47658500
6500 Ruby x50|59573000
6500 Ruby x100|119145500
Kartu Bulanan|61800
Kartu Bulanan Premium|123000
`)
    },
    {
        name: "CAPTAIN TSUBASA ACE",
        category: "Game",
        products: makeProducts(`
6 Golden Ball Pack|1978
60 + 3 Golden Ball Pack|15284
300 + 15 Golden Ball Pack|73496
680 + 35 Golden Ball Pack|147416
980 + 50 Golden Ball Pack|230576
1280 + 65 Golden Ball Pack|304496
1980 + 198 Golden Ball Pack|443096
3280 + 328 Golden Ball Pack|738776
6480 + 648 Golden Ball Pack|1477976
`)
    },
    {
        name: "BE THE KING: JUDGE DESTINY",
        category: "Game",
        products: makeProducts(`
60 Gold|13743
300 Gold|67796
680 Gold|135362
2040 Gold|403194
3400 Gold|673459
6800 Gold|1349121
60 Ult Tokens|13743
300 Ult Tokens|67796
680 Ult Tokens|135362
2040 Ult Tokens|403194
3400 Ult Tokens|673459
6800 Ult Tokens|1349121
20400 Ult Tokens|4027443
`)
    },
    {
        name: "TOP ELEVEN",
        category: "Game",
        products: makeProducts(`
220 Gems|751000
`)
    },
    {
        name: "DELTA FORCE",
        category: "Game",
        products: makeProducts(`
18 + 1 Delta Coins|5900
30 + 2 Delta Coins|8600
60 + 3 Delta Coins|16400
300 + 36 Delta Coins|79701
420 + 62 Delta Coins|109401
680 + 105 Delta Coins|153202
1280 + 264 Delta Coins|305603
1680 + 385 Delta Coins|381804
3280 + 834 Delta Coins|762808
6480 + 1944 Delta Coins|1525115
12960 + 3888 Delta Coins|3049730
19440 + 5832 Delta Coins|4574346
`)
    },
    {
        name: "CLOUD SONG SAGA OF SKYWALKERS",
        category: "Game",
        products: makeProducts(`
0.99$ Tickets|11803
1.99$ Tickets|19336
2.99$ Tickets|34406
5.99$ Tickets|68312
11.99$ Tickets|136123
21.99$ Tickets|271748
29.99$ Tickets|339560
59.99$ Tickets|678619
99.99$ Tickets|1356738
`)
    },
    {
        name: "HARRY POTTER MAGIC AWAKENED",
        category: "Game",
        products: makeProducts(`
60 Jewels|16916
300 Jewels|81554
680 + 70 Jewels|163634
980 + 165 Jewels|255974
1280 + 270 Jewels|338054
1980 + 380 Jewels|491954
3280 + 780 Jewels|820274
6480 + 2000 Jewels|1641074
`)
    },
    {
        name: "ARENA OF VALOR",
        category: "Game",
        products: makeProducts(`
40 Vouchers|10500
90 Vouchers|20500
230 Vouchers|50500
470 Vouchers|100500
950 Vouchers|200500
1430 Vouchers|300500
2390 Vouchers|500500
`)
    },
    {
        name: "AFK JOURNEY",
        category: "Game",
        products: makeProducts(`
21 Dragon Crystals (20 + 1 Bonus)|16124
126 Dragon Crystals (120 + 6 Bonus)|77644
294 Dragon Crystals (280 + 14 Bonus)|155764
588 Dragon Crystals (560 + 28 Bonus)|321769
1554 Dragon Crystals (1480 + 74 Bonus)|780724
3150 Dragon Crystals (3000 + 150 Bonus)|1561924
Esperia Monthly - Classic Gazette|77644
Esperia Monthly - Premium Gazette|243649
Growth Bundle|468244
`)
    },
    {
        name: "RACING MASTER",
        category: "Game",
        products: makeProducts(`
70 + 4 Gems|16500
140 + 7 Gems|32500
210 + 11 Gems|48500
350 + 18 Gems|79500
700 + 35 Gems|159500
1000 + 50 Gems|225500
1400 + 70 Gems|315500
2100 + 105 Gems|470500
3400 + 170 Gems|760500
6600 + 330 Gems|1469500
`)
    },
    {
        name: "ONMYOJI ARENA",
        category: "Game",
        products: makeProducts(`
Jade 60|15500
Jade 200|71500
Jade 1280|284000
Jade 3280|707000
Jade 6480|1450000
`)
    },
    {
        name: "MU ORIGIN 2",
        category: "Game",
        products: makeProducts(`
5 Badges|5343
70 Badges|10187
109 Badges|15635
195 Badges|27743
325 Badges|45904
951 Badges|133687
1621 Badges|227522
5401 Badges|757241
17283 Badges|2422071
`)
    },
    {
        name: "MOB RUSH",
        category: "Game",
        products: makeProducts(`
100 Diamonds|16593
300 Diamonds|48778
500 Diamonds|80964
1000 Diamonds|161428
2000 Diamonds|322356
3000 Diamonds|483284
5000 Diamonds|805140
10000 Diamonds|1609780
Top Value Pack|5328
Super Value Hero Pack|16593
Diamond Benefits Weekly|19811
Diamond Benefits Monthly|39123
Account Growth Fund (Normal)|48778
Account Growth Fund (Advanced)|129242
BattlePass|80964
`)
    }
);

catalogData.push(
    {
        name: "MU Origin 3 Sea",
        category: "Game",
        products: makeProducts(`
70 Divine Diamonds|15300
350 Divine Diamonds|73500
1.050 Divine Diamonds|230500
2.100 Divine Diamonds|443100
3.500 Divine Diamonds|738800
7.000 Divine Diamonds|1478000
10.500 Divine Diamonds|2309600
14.000 Divine Diamonds|3048800
21.000 Divine Diamonds|4619600
`)
    },
    {
        name: "Identity V",
        category: "Game",
        products: makeProducts(`
60 Echoes|14575
185 Echoes|43089
305 Echoes|71604
690 Echoes|142891
2.025 Echoes|428039
3.330 Echoes|713187
6.590 Echoes|1426056
`)
    },
    {
        name: "Legacy Fate Sacred and Fearless",
        category: "Game",
        products: makeProducts(`
70 Token|19385
130 Token|35123
330 Token|88631
750 Token|168669
990 Token|248707
1.410 Token|348529
2.180 Token|497813
3.610 Token|847641
7.130 Token|1695681
`)
    },
    {
        name: "Rainbow Six Mobile",
        category: "Game",
        products: makeProducts(`
50 Platinum|12000
110 Platinum|23000
300 Platinum|56500
650 Platinum|111500
1.350 Platinum|225500
3.500 Platinum|559500
7.250 Platinum|1119500
11.250 Platinum|1699500
250 Platinum (First Purchase Only)|12000
600 Platinum (First Purchase Only)|56500
2.700 Platinum (First Purchase Only)|225500
7.000 Platinum (First Purchase Only)|559500
`)
    },
    {
        name: "Call of Duty Mobile ID",
        category: "Game",
        products: makeProducts(`
63 CP|10000
128 CP|20500
321 CP|50500
645 CP|100500
1.373 CP|200500
2.060 CP|300500
3.564 CP|500500
7.656 CP|1000500
`)
    },
    {
        name: "Snowbreak Containment Zone",
        category: "Game",
        products: makeProducts(`
6 BitGold|15223
30 BitGold|73196
98 BitGold|229630
198 BitGold|441276
328 BitGold|735740
648 BitGold|1471900
`)
    },
    {
        name: "Honkai Impact 3",
        category: "Game",
        products: makeProducts(`
Monthly Card|77450
30 B-Chips|8195
65 B-Chips|16175
330 B-Chips|77450
990 B-Chips|242750
1.320 B-Chips|318750
1.980 B-Chips|465050
3.300 B-Chips|774750
6.600 B-Chips|1548050
65 Crystals|16175
330 Crystals|77450
660 Crystals|154400
1.320 Crystals|318750
3.300 Crystals|807350
6.600 Crystals|1613210
`)
    },
    {
        name: "Path to Nowhere",
        category: "Game",
        products: makeProducts(`
60 Ultracubes|15730
300 + 30 Ultracubes|75697
980 + 150 Ultracubes|237513
1.980 + 400 Ultracubes|446922
3.280 + 700 Ultracubes|732480
6.480 + 1.600 Ultracubes|1379745
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
`)
    },
    {
        name: "Heaven Burns Red",
        category: "Game",
        products: makeProducts(`
130 Paid Quartz|20368
410 Paid Quartz|58768
870 Paid Quartz|117202
1.370 Paid Quartz|183986
2.720 Paid Quartz|334246
4.750 Paid Quartz|567985
10.000 Paid Quartz|1169028
`)
    },
    {
        name: "Arena Breakout",
        category: "Game",
        products: makeProducts(`
60 + 6 Bonds|16354
310 + 25 Bonds|76451
630 + 45 Bonds|149409
1.580 + 110 Bonds|370757
3.200 + 200 Bonds|748466
6.500 + 320 Bonds|1448869
Pilihan Pemula|19630
Battle Pass Lanjutan|66102
Battle Pass Premium|194505
`)
    },
    {
        name: "Legend of Runeterra",
        category: "Game",
        products: makeProducts(`
475 Coins|54885
1.000 Coins|109269
2.050 Coins|218038
3.650 Coins|378278
5.350 Coins|543374
11.000 Coins|1067796
`)
    },
    {
        name: "LifeAfter",
        category: "Game",
        products: makeProducts(`
65 Credits|13550
330 Credits|64800
558 Credits|103450
1.108 Credits|192850
2.268 Credits|384700
3.468 Credits|602250
5.768 Credits|960350
7.768 Credits|1280150
`)
    },
    {
        name: "Love and Deepspace",
        category: "Game",
        products: makeProducts(`
Aurum Pass (30 Days)|87457
60 Crystals|19064
300 Crystals + 30 Diamonds|87457
450 Crystals + 90 Diamonds|116768
980 Crystals + 150 Diamonds|243783
1.980 Crystals + 360 Diamonds|488043
6.480 Crystals + 1.600 Diamonds|1660491
Companionship Pack|292635
`)
    },
    {
        name: "Watcher of Realms",
        category: "Game",
        products: makeProducts(`
499 W-Gold|91875
999 W-Gold|183640
1.999 W-Gold|366973
2.999 W-Gold|550354
4.999 W-Gold|917018
9.999 W-Gold|1831742
29.999 W-Gold|5482485
59.999 W-Gold|10982793
`)
    },
    {
        name: "Honkai: Star Rail",
        category: "Game",
        products: makeProducts(`
Express Supply Pass|75550
60 Oneiric Shard|15700
300 + 30 Oneiric Shard|75550
980 + 110 Oneiric Shard|237050
1.980 + 260 Oneiric Shard|455550
3.280 + 600 Oneiric Shard|759550
6.480 + 1.600 Oneiric Shard|1519550
`)
    }
);
  
catalogData.push(
    {
        name: "Zenless Zone Zero",
        category: "Game",
        products: makeProducts(`
60 Monochrome|15700
300 + 30 Monochrome|75550
980 + 110 Monochrome|237050
1.980 + 260 Monochrome|455550
3.280 + 600 Monochrome|759550
6.480 + 1.600 Monochrome|1519550
Inter-Knot Membership|75550
`)
    },
    {
        name: "Speed Drifters",
        category: "Game",
        products: makeProducts(`
56 Diamonds|10235
112 Diamonds|19970
282 Diamonds|49173
579 Diamonds|97846
1.230 Diamonds|195191
1.845 Diamonds|292537
3.134 Diamonds|487227
`)
    },
    {
        name: "Tamashi Rise of Yokai",
        category: "Game",
        products: makeProducts(`
60 Sycee|15562
300 Sycee|74871
600 Sycee|150183
900 Sycee|234909
1.200 Sycee|310221
1.800 Sycee|451431
3.000 Sycee|752679
6.000 Sycee|1505799
`)
    },
    {
        name: "Marvel Duel",
        category: "Game",
        products: makeProducts(`
60 Stardust + 40 Iso-gems|134450
120 Stardust + 120 Iso-gems|265200
300 Stardust + 400 Iso-gems|653600
600 Stardust + 860 Iso-gems|1307100
`)
    },
    {
        name: "Ghost Story Love Destiny",
        category: "Game",
        products: makeProducts(`
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
`)
    },
    {
        name: "Ragnarok Origin",
        category: "Game",
        products: makeProducts(`
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
`)
    },
    {
        name: "State of Survival",
        category: "Game",
        products: makeProducts(`
100 Diamonds|17722
500 Diamonds|85531
1.000 Diamonds|171639
2.000 Diamonds|354618
5.000 Diamonds|860500
10.000 Diamonds|1721576
20.000 Diamonds|3541674
`)
    },
    {
        name: "Teamfight Tactics Mobile",
        category: "Game",
        products: makeProducts(`
575 TFT Coins|58813
1.380 TFT Coins|136564
2.800 TFT Coins|272629
4.500 TFT Coins|428131
6.500 TFT Coins|603071
13.500 TFT Coins|1166766
`)
    },
    {
        name: "Genshin Impact",
        category: "Game",
        products: makeProducts(`
60 Genesis Crystals|16175
300 + 30 Genesis Crystals|77450
980 + 110 Genesis Crystals|242750
1.980 + 260 Genesis Crystals|465050
3.280 + 600 Genesis Crystals|774750
6.480 + 1.600 Genesis Crystals|1548050
Blessing of the Welkin Moon|77450
60 Chronal Nexus|16175
300 + 30 Chronal Nexus|77450
980 + 110 Chronal Nexus|242750
1.980 + 260 Chronal Nexus|465058
3.280 + 600 Chronal Nexus|774750
`)
    },
    {
        name: "The Lord of the Rings: Rise to War",
        category: "Game",
        products: makeProducts(`
200 Gems|13253
1.000 Gems|65527
2.300 Gems|130868
4.600 Gems|261551
11.500 Gems|653599
23.000 Gems|1307013
`)
    },
    {
        name: "Ragnarok X Next Generation",
        category: "Game",
        products: makeProducts(`
2.310 Diamonds|69000
4.990 Diamonds|146600
10.290 Diamonds|301800
15.600 Diamonds|457000
31.200 Diamonds|913500
51.370 Diamonds|1461300
160.540 Diamonds|4565500
321.090 Diamonds|9130500
963.270 Diamonds|27390500
Hadiah Privilege W|204099
Assurance of Exclusivity|346527
Oath of Bond|562908
`)
    },
    {
        name: "One Punch Man The Strongest",
        category: "Game",
        products: makeProducts(`
6 Kupon|9700
22 Kupon|37500
54 Kupon|92900
107 Kupon|185300
214 Kupon|370100
321 Kupon|554900
2.669 Kupon|4620500
`)
    },
    {
        name: "League of Legends: Wild Rift",
        category: "Game",
        products: makeProducts(`
425 Cores|53702
1.000 Cores|119255
1.850 Cores|214259
3.275 Cores|375766
10.000 Cores|1073095
`)
    },
    {
        name: "Growtopia",
        category: "Game",
        products: makeProducts(`
Chest O' Gems|28500
Gem Fountain|75200
It's Rainin' Gems|150500
Gem Bounty|450500
Gem Abundance|738000
Royal Grow Pass|150500
1-Year Subscription Token|738000
`)
    },
    {
        name: "Tom and Jerry: Chase",
        category: "Game",
        products: makeProducts(`
60 Diamonds|16000
180 + 6 Diamonds|43700
300 + 20 Diamonds|71500
600 + 45 Diamonds|143000
1.200 + 100 Diamonds|288500
1.800 + 170 Diamonds|436000
3.000 + 300 Diamonds|721400
6.000 + 1.000 Diamonds|1412200
`)
    }
);

catalogData.push(
    {
        name: "Hago",
        category: "Game",
        products: makeProducts(`
1.200 Diamonds|2645
9.200 Diamonds|16834
18.200 Diamonds|33167
45.600 Diamonds|82167
76.200 Diamonds|136612
183.000 Diamonds|327167
336.000 Diamonds|599391
672.400 Diamonds|1198280
`)
    },
    {
        name: "Punishing Gray Raven",
        category: "Game",
        products: makeProducts(`
Android - 5 Rainbow Cards|14982
Android - 28 Rainbow Cards|69047
Android - 34 Rainbow Cards|85459
Android - 59 Rainbow Cards|138559
Android - 71 Rainbow Cards|165592
Android - 119 Rainbow Cards|279515
Android - 299 Rainbow Cards|685968
Android - 600 Rainbow Cards|1391520
iOS - 5 Rainbow Cards|14982
iOS - 28 Rainbow Cards|69047
iOS - 34 Rainbow Cards|85459
iOS - 59 Rainbow Cards|138559
iOS - 71 Rainbow Cards|165592
iOS - 119 Rainbow Cards|279515
iOS - 299 Rainbow Cards|685968
iOS - 600 Rainbow Cards|1391520
`)
    },
    {
        name: "Pixel Gun 3D",
        category: "Game",
        products: makeProducts(`
50 + 5 Coins|15300
150 + 15 Coins|45198
250 + 25 Coins|75096
500 + 100 Coins|149841
1.000 + 300 Coins|299333
2.500 + 1.000 Coins|747805
50 + 5 Keys|15300
150 + 15 Keys|45198
250 + 25 Keys|75095
500 + 100 Keys|149841
1.000 + 300 Keys|299333
2.500 + 1.000 Keys|747805
90 + 10 Gems|45198
150 + 25 Gems|75095
300 + 75 Gems|149841
600 + 200 Gems|299333
1.500 + 700 Gems|747805
60 + 6 Pixel Pass Tickets|15300
180 + 20 Pixel Pass Tickets|45198
300 + 50 Pixel Pass Tickets|75095
600 + 150 Pixel Pass Tickets|149841
1.200 + 550 Pixel Pass Tickets|299333
3.000 + 1.500 Pixel Pass Tickets|747805
Basic Set|75096
Advanced Set|149841
Expert Set|299333
Winner Set|747805
`)
    },
    {
        name: "Astra: Knights of Veda",
        category: "Game",
        products: makeProducts(`
60 Rubies|15045
300 Rubies|73811
980 Rubies|220728
1.980 Rubies|441101
3.280 Rubies|734932
6.480 Rubies|1469513
`)
    },
    {
        name: "Legend of Mushroom: Rush",
        category: "Game",
        products: makeProducts(`
99 Gems + Bonus Items|14612
499 Gems + Bonus Items|71060
999 Gems + Bonus Items|141620
1.999 Gems + Bonus Items|282740
4.999 Gems + Bonus Items|706100
9.999 Gems + Bonus Items|1411700
29.999 Gems + Bonus Items|4234100
59.999 Gems + Bonus Items|8467700
`)
    },
    {
        name: "Heroic Uncle Kim",
        category: "Game",
        products: makeProducts(`
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
`)
    },
    {
        name: "Total Football",
        category: "Game",
        products: makeProducts(`
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
`)
    },
    {
        name: "Point Blank",
        category: "Game",
        products: makeProducts(`
1.200 PB Cash|10340
2.400 PB Cash|20180
6.000 PB Cash|49700
12.000 PB Cash|98899
24.000 PB Cash|197297
36.000 PB Cash|295696
60.000 PB Cash|492494
`)
    },
    {
        name: "League of Legends PC",
        category: "Game",
        products: makeProducts(`
575 RP|58800
1.380 RP|136500
2.800 RP|272500
4.500 RP|427900
6.500 RP|602700
13.500 RP|1165900
`)
    },
    {
        name: "Marvel Rivals",
        category: "Game",
        products: makeProducts(`
100 Lattices|18565
500 Lattices|91023
1.000 Lattices|182935
2.180 Lattices|365569
5.680 Lattices|913469
11.680 Lattices|1826637
`)
    },
    {
        name: "Poppo Live",
        category: "Entertainment",
        products: makeProducts(`
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
`)
    },
    {
        name: "Bigo Live",
        category: "Entertainment",
        products: makeProducts(`
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
`)
    },
    {
        name: "Chamet",
        category: "Entertainment",
        products: makeProducts(`
18.750 Diamonds|60488
62.500 Diamonds|200804
187.500 Diamonds|600385
625.000 Diamonds|2003540
1.875.000 Diamonds|5999348
3.750.000 Diamonds|11987924
6.250.000 Diamonds|20030900
`)
    },
    {
        name: "WeSing",
        category: "Entertainment",
        products: makeProducts(`
37 Kcoins|10400
112 Kcoins|30100
373 Kcoins|99100
933 Kcoins|247000
1.866 Kcoins|493400
3.731 Kcoins|986300
5.597 Kcoins|1479000
`)
    },
    {
        name: "Sugo: Voice Live Chat Party",
        category: "Entertainment",
        products: makeProducts(`
1.200 Coins|20738
2.400 Coins|41180
6.250 Coins|102506
12.500 Coins|204716
37.500 Coins|613558
65.000 Coins|1022400
130.000 Coins|2044504
`)
    },
    {
        name: "Lita",
        category: "Entertainment",
        products: makeProducts(`
300 Lita Coins|39688
600 Lita Coins|78877
1.000 Lita Coins|130195
2.000 Lita Coins|259889
5.000 Lita Coins|648973
10.000 Lita Coins|1296514
`)
    },
    {
        name: "Livu",
        category: "Entertainment",
        products: makeProducts(`
299 Coin|54716
650 Coin|90896
990 Coin|145004
2.500 Coin|325148
5.000 Coin|627332
10.000 Coin|1166360
20.000 Coin|2268716
50.000 Coin|5388188
`)
    },
    {
        name: "Like",
        category: "Entertainment",
        products: makeProducts(`
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
`)
    },
    {
        name: "StarMaker Global",
        category: "Entertainment",
        products: makeProducts(`
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
`)
    },
    {
        name: "WeTV",
        category: "Entertainment",
        products: makeProducts(`
12 Months VIP|476200
`)
    }
);
// ========================================
// PENUTUP SCRIPT GOTUP.ID
// ========================================

// Pastikan katalog berhasil dimuat
console.log("GOTUP.ID berhasil dimuat!");
console.log("Total katalog:", catalogData.length);

// Tampilkan jumlah produk setiap katalog
catalogData.forEach((game, index) => {
    console.log(
        `${index + 1}. ${game.name}: ${game.products.length} produk`
    );
});

// ========================================
// AKHIR SCRIPT GOTUP.ID
// ========================================
