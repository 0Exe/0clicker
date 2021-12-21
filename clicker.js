let coin_count = 0;
let cps = 0;
let cp = 1;
let u1_cost = 10;
let ua_cost = 10;
let u2_cost = 140;
let ub_cost = 200;
let u1x = 0;
let uax = 0;
let u2x = 0;
let ubx = 0;

let save = localStorage.getItem("coin_counter");
if (save) {
    let parsed = JSON.parse(save);
    coin_count = parsed.counter;
    cps = parsed.cps;
    u1_cost = parsed.upgrades.u1[0];
    ua_cost = parsed.upgrades.ua[0];
    u2_cost = parsed.upgrades.u2[0];
    ub_cost = parsed.upgrades.ub[0];
    u1x = parsed.upgrades.u1[1];
    uax = parsed.upgrades.ua[1];
    u2x = parsed.upgrades.u2[1];
    ubx = parsed.upgrades.ub[1];
}

setInterval(function() {
    coin_count += cps;
    document.getElementById("cps").innerHTML = cps;
    update_counter();
}, 1000);

function update_counter() {
    let counter = document.getElementById("coin_counter");

    let _0click = {
        "counter": coin_count,
        "cps": cps,
        "upgrades": {
            "u1": [u1_cost, u1x],
            "ua": [ua_cost, uax],
            "u2": [u2_cost, u2x],
            "ub": [ub_cost, ubx],
        }
    }

    localStorage.setItem("coin_counter", JSON.stringify(_0click));
    counter.innerHTML = coin_count;

    document.getElementById("upgradesList").innerHTML = `
    <div class="_23ft">
        Passive <br>
        +1 CPS: ${u1x} <br>
        +5 CPS: ${u2x}
    </div>

    <div class="_23ft">
        Power <br>
        +1 CPC: ${uax} <br>
        +2 CPC: ${ubx}
    </div>
    `
}

function click() {
    coin_count += cp;
    update_counter();
}

document.getElementById("click").addEventListener("click", click);

const u1 = document.getElementById("u1");
u1.addEventListener("click", () => {
    if (coin_count >= u1_cost) {
        coin_count -= u1_cost;
        u1_cost = Math.floor(u1_cost * 1.2);
        document.getElementById("u1c").innerHTML = `${u1_cost} Coins`;
        cps++;
        u1x++;
        update_counter();
    }
});


const u2 = document.getElementById("u2");
u2.addEventListener("click", () => {
    if (coin_count >= u2_cost) {
        coin_count -= u2_cost;
        u2_cost = Math.floor(u2_cost * 1.2);
        document.getElementById("u2c").innerHTML = `${u2_cost} Coins`;
        cps++;
        u2x++;
        update_counter();
    }
});

const ua = document.getElementById("ua");
ua.addEventListener("click", () => {
    if (coin_count >= ua_cost) {
        coin_count -= ua_cost;
        ua_cost = Math.floor(ua_cost * 1.1);
        document.getElementById("uac").innerHTML = `${ua_cost} Coins`;
        cp++;
        uax++;
        document.getElementById("cp").innerHTML = cp;
        update_counter();
    }
});

const ub = document.getElementById("ub");
ub.addEventListener("click", () => {
    if (coin_count >= ub_cost) {
        coin_count -= ub_cost;
        ub_cost = Math.floor(ub_cost * 1.1);
        document.getElementById("ubc").innerHTML = `${ub_cost} Coins`;
        cp++;
        ubx++;
        document.getElementById("cp").innerHTML = cp;
        update_counter();
    }
});

document.getElementById("reset").addEventListener("click", () => {
    // get confirmation
    if (confirm("Are you sure you want to reset your progress?")) {
        coin_count = 0;
        cps = 0;
        cp = 1;
        u1_cost = 10;
        ua_cost = 10;
        u2_cost = 140;
        ub_cost = 200;
        u1x = 0;
        uax = 0;
        u2x = 0;
        ubx = 0;
        update_counter();
    }
});

document.getElementById("displayUpgrades").addEventListener("click", () => toggleUpgrades());
document.getElementById("closeUpgrades").addEventListener("click", () => toggleUpgrades());
function toggleUpgrades() {
    document.getElementById("main").classList.toggle("invis");
    document.getElementById("upgrades").classList.toggle("invis");
}