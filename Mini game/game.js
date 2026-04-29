const spirits = [
    { name: "Gin", alcohol: 40, sweet: 0, sour: 0, bitter: 2, color: "#34c878", color2: "#0d7a3d" },
    { name: "Rum", alcohol: 38, sweet: 2, sour: 0, bitter: 1, color: "#d99032", color2: "#8a4219" },
    { name: "Vodka", alcohol: 40, sweet: 0, sour: 0, bitter: 0, color: "#bceeff", color2: "#3ea7c5" },
    { name: "Tequila", alcohol: 38, sweet: 0, sour: 1, bitter: 2, color: "#f2c24a", color2: "#bd7d20" },
    { name: "Whiskey", alcohol: 43, sweet: 1, sour: 0, bitter: 3, color: "#c66a20", color2: "#703211" },
    { name: "Vermouth", alcohol: 18, sweet: 2, sour: 0, bitter: 2, color: "#e3e3c7", color2: "#9e9e7e" },
    { name: "Cointreau", alcohol: 40, sweet: 4, sour: 1, bitter: 0, color: "#ff9f24", color2: "#d85810" },
    { name: "Kahlua", alcohol: 20, sweet: 4, sour: 0, bitter: 3, color: "#5a2c18", color2: "#1f0d06" },
    { name: "Sake", alcohol: 15, sweet: 1, sour: 1, bitter: 0, color: "#fff", color2: "#eee" },
    { name: "Brandy", alcohol: 35, sweet: 2, sour: 0, bitter: 2, color: "#a34b11", color2: "#5e2609" }
];

const juices = [
    { name: "Lemon", alcohol: 0, sweet: 0, sour: 5, bitter: 1, color: "#fff04a", color2: "#e0a60a" },
    { name: "Orange", alcohol: 0, sweet: 3, sour: 1, bitter: 0, color: "#ffa500", color2: "#cc8400" },
    { name: "Cranberry", alcohol: 0, sweet: 2, sour: 3, bitter: 0, color: "#ff1e4e", color2: "#a10022" },
    { name: "Soda", alcohol: 0, sweet: 0, sour: 0, bitter: 0, color: "#d1f4ff", color2: "#89d4eb" },
    { name: "Lime", alcohol: 0, sweet: 0, sour: 5, bitter: 0, color: "#32cd32", color2: "#228b22" },
    { name: "Sugar Syrup", alcohol: 0, sweet: 5, sour: 0, bitter: 0, color: "#fefefe", color2: "#ddd" }
];

let selectedItem = null;
let mix = createEmptyMix();
let gameState = "idle";
let holdTimer = null;
let shakeTime = 0;

const UI = {
    shelfOne: document.getElementById("shelf-one"),
    shelfTwo: document.getElementById("shelf-two"),
    juiceShelf: document.getElementById("juice-shelf"),
    info: document.getElementById("info-panel"),
    stats: document.getElementById("stats"),
    liquidFill: document.getElementById("liquid-fill"),
    bartender: document.getElementById("bartender"),
    popup: document.getElementById("score-popup"),
    game: document.getElementById("game")
};

init();

function init() {
    spirits.forEach((s, i) => {
        const parent = i < Math.ceil(spirits.length / 2) ? UI.shelfOne : UI.shelfTwo;
        parent.appendChild(createBottle(s));
    });
    juices.forEach(j => UI.juiceShelf.appendChild(createBottle(j, true)));
    
    // Counter items: Click to add instantly (2x ice rule)
    document.getElementById("ice-btn").addEventListener("click", () => addSpecial("Ice", "#fff"));
    document.getElementById("lemon-btn").addEventListener("click", () => addSpecial("Lemon Slice", "#fff04a"));
    document.getElementById("egg-btn").addEventListener("click", () => addSpecial("Egg White", "#fdfdfd"));

    const pourBtn = document.getElementById("pour-btn");
    pourBtn.addEventListener("pointerdown", startPouring);
    window.addEventListener("pointerup", stopPouring);

    const shakeBtn = document.getElementById("shake-btn");
    shakeBtn.addEventListener("pointerdown", startShaking);
    window.addEventListener("pointerup", stopShaking);

    document.getElementById("serve-btn").addEventListener("click", serveMix);
    document.getElementById("reset-btn").addEventListener("click", resetGame);

    // Menu logic
    const menuBtn = document.getElementById("menu-btn");
    const gameMenu = document.getElementById("game-menu");
    const closeMenuBtn = document.getElementById("close-menu");

    menuBtn.addEventListener("click", () => {
        gameMenu.classList.add("show");
    });

    closeMenuBtn.addEventListener("click", () => {
        gameMenu.classList.remove("show");
    });

    // Close menu when clicking outside content
    gameMenu.addEventListener("click", (e) => {
        if (e.target === gameMenu) gameMenu.classList.remove("show");
    });

    updateUI();
    handleResize();
    window.addEventListener("resize", handleResize);
    FX.init();
}

function handleResize() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const gameW = 1920;
    const gameH = 1080;
    
    const scale = Math.min(ww / gameW, wh / gameH);
    UI.game.style.transform = `scale(${scale})`;
}

function createBottle(ing, isJuice = false) {
    const b = document.createElement("div");
    b.className = `bottle ${isJuice ? 'juice' : ''}`;
    b.style.setProperty("--bottle-color", ing.color);
    b.style.setProperty("--bottle-color2", ing.color2);
    b.innerHTML = `<div class="bottle-cap"></div><div class="bottle-neck"></div><div class="bottle-body"></div><div class="bottle-label">${ing.name}</div>`;
    b.addEventListener("click", () => selectBottle(ing, b));
    return b;
}

function selectBottle(ing, el) {
    if (gameState !== "idle") return;
    document.querySelectorAll(".bottle, .ice-bucket, .lemon-bowl").forEach(x => x.classList.remove("selected"));
    el.classList.add("selected");
    selectedItem = { type: "ing", data: ing };
    UI.info.innerHTML = `<div>Geselecteerd: <span style="color: var(--gold)">${ing.name}</span></div><div style="font-size: 24px; opacity: 0.8">HOUD DE POUR KNOP IN</div>`;
    
    // Animate bottle tilt preview? 
    UI.bartender.querySelector('.arm.right').style.transform = "rotate(-20deg)";
}

function addSpecial(name, color) {
    if (gameState !== "idle" && gameState !== "pouring") return;
    
    const amount = 15; // fixed amount per click
    if (mix.volume + amount > 300) return;
    
    mix.volume += amount;
    if (name === "Ice") {
        mix.dilution += 5;
        if (!mix.iceCount) mix.iceCount = 0;
        mix.iceCount++;
    } else if (name === "Lemon Slice") {
        mix.sourness += 2;
    } else if (name === "Egg White") {
        mix.sweetness += 0.5; // slight texture
    }
    
    if (!mix.volumes[name]) mix.volumes[name] = 0;
    mix.volumes[name] += amount;
    
    mix.visualColor = blendColor(color, 0.1);
    updateUI();
    FX.triggerSplash(color);
    
    // Visual feedback
    const btnId = name === "Ice" ? "ice-btn" : (name === "Egg White" ? "egg-btn" : "lemon-btn");
    const el = document.getElementById(btnId);
    el.style.transform = "scale(1.2) translateY(-20px)";
    setTimeout(() => el.style.transform = "", 200);

    UI.info.innerHTML = `<div>Toegevoegd: <span style="color: var(--gold)">${name}</span></div><div style="font-size: 20px; opacity: 0.8">${name === 'Ice' ? 'IJs count: '+mix.iceCount : ''}</div>`;
}

function startPouring(e) {
    if (!selectedItem || gameState !== "idle") return;
    if (mix.volume >= 300) return;

    gameState = "pouring";
    const streamColor = selectedItem.type === "ing" ? selectedItem.data.color : selectedItem.color;
    UI.bartender.querySelector('.arm.right').style.transform = "rotate(-60deg)";
    FX.startPour(streamColor);
    
    holdTimer = setInterval(() => {
        if (mix.volume >= 300) { stopPouring(); return; }

        if (selectedItem.type === "ing") {
            const ing = selectedItem.data;
            // 1 second = 10ml. Interval 50ms = 20 times per second. 10 / 20 = 0.5ml
            const pourAmount = 0.5;
            mix.volume += pourAmount;
            mix.alcoholMl += (ing.alcohol / 100) * pourAmount;
            mix.sweetness += (ing.sweet / 10) * pourAmount;
            mix.sourness += (ing.sour / 10) * pourAmount;
            mix.bitterness += (ing.bitter / 10) * pourAmount;
            mix.visualColor = blendColor(ing.color, 0.05);
            
            // Track exact volume of each ingredient for better scoring
            if (!mix.volumes[ing.name]) mix.volumes[ing.name] = 0;
            mix.volumes[ing.name] += pourAmount;
            mix.ingredients.push(ing.name);
        } else {
            const pourAmount = 0.2;
            mix.volume += pourAmount;
            if (selectedItem.name === "Ice") mix.dilution += 0.2;
            if (selectedItem.name === "Lemon Slice") mix.sourness += 0.1;
            mix.visualColor = blendColor(selectedItem.color, 0.02);
            if (!mix.volumes[selectedItem.name]) mix.volumes[selectedItem.name] = 0;
            mix.volumes[selectedItem.name] += pourAmount;
        }
        updateUI();
    }, 50);
}

function stopPouring() {
    if (gameState !== "pouring") return;
    clearInterval(holdTimer);
    gameState = "idle";
    UI.bartender.querySelector('.arm.right').style.transform = "rotate(-30deg)";
    FX.stopPour();
}

function startShaking() {
    if (mix.volume === 0 || gameState !== "idle") return;
    gameState = "shaking";
    UI.game.classList.add("shaking");
    UI.info.textContent = "SHAKING...";

    holdTimer = setInterval(() => {
        shakeTime += 0.1;
        mix.dilution += 0.3;
        if (shakeTime > 6) explode();
        updateUI();
    }, 100);
}

function stopShaking() {
    if (gameState !== "shaking") return;
    clearInterval(holdTimer);
    UI.game.classList.remove("shaking");
    gameState = "idle";
    mix.shaken = true;
    UI.info.textContent = "KLAAR OM TE SERVEREN!";
}

function explode() {
    clearInterval(holdTimer);
    gameState = "dead";
    FX.triggerExplosion();
    UI.game.classList.add("exploding");
    UI.bartender.classList.add("dying");
    setTimeout(() => {
        showResult({ score: 0, reaction: "dying", title: "BOEM!", text: "Iets te enthousiast geshaked...", alc: "0" });
    }, 1200);
}

function serveMix() {
    if (mix.volume === 0 || !mix.shaken || gameState !== "idle") return;
    gameState = "serving";
    UI.bartender.querySelector('.arm.left').style.transform = "rotate(-55deg) translateY(-40px)";
    setTimeout(() => showResult(evaluateMix()), 1500);
}

function evaluateMix() {
    // Use the global cocktailDatabase from recipes.js
    const recipes = cocktailDatabase;

    let bestMatch = null;
    let maxScore = -Infinity;

    recipes.forEach(recipe => {
        let recipeScore = 10000;
        
        // 1. Ingredient Match (Presence and Volume)
        const recipeIngredients = Object.keys(recipe.ingredients);
        const mixIngredients = Object.keys(mix.volumes).filter(ing => ing !== "Ice" && ing !== "Lemon Slice");

        // Check for missing or incorrect amounts in recipe
        recipeIngredients.forEach(ing => {
            const target = recipe.ingredients[ing];
            const actual = mix.volumes[ing] || 0;
            const diff = Math.abs(target - actual);
            
            // Penalty based on percentage deviation
            if (actual === 0) {
                recipeScore -= 3000; // Missing critical ingredient
            } else {
                recipeScore -= (diff / target) * 4000;
            }
        });

        // 2. Penalty for extra unwanted ingredients
        mixIngredients.forEach(ing => {
            if (!recipe.ingredients[ing]) {
                recipeScore -= 2000;
            }
        });

        // 3. Shake time penalty
        const shakeDiff = Math.abs(shakeTime - recipe.idealShake);
        recipeScore -= shakeDiff * 1500;

        // 4. Ice requirement (Always 2x ice)
        const iceCount = mix.iceCount || 0;
        if (iceCount !== 2) {
            recipeScore -= Math.abs(2 - iceCount) * 1500;
        }

        if (recipeScore > maxScore) {
            maxScore = recipeScore;
            bestMatch = recipe;
        }
    });

    const finalScore = Math.max(0, Math.round(maxScore));
    const alcPerc = mix.volume > 0 ? (mix.alcoholMl / mix.volume) * 100 : 0;

    let reaction = "happy";
    let title = "PERFECT!";
    let text = `Een meesterlijke ${bestMatch ? bestMatch.name : 'creatie'}!`;

    if (finalScore < 2500) {
        reaction = "disgust";
        title = "BAH!";
        text = "Dit is niet te drinken. Miguel is diep teleurgesteld.";
    } else if (finalScore < 6000) {
        reaction = "neutral";
        title = "NOG NIET...";
        text = `Het lijkt een beetje op een ${bestMatch ? bestMatch.name : 'cocktail'}, maar de balans is ver te zoeken.`;
    } else if (alcPerc > 42) {
        reaction = "dizzy";
        title = "HEFTIG!";
        text = `Een goede ${bestMatch.name}, maar Miguel ziet nu sterretjes!`;
    }

    return { score: finalScore, reaction, title, text, alc: alcPerc.toFixed(1) };
}

function showResult(r) {
    UI.bartender.className = `bartender ${r.reaction}`;
    document.getElementById("score-title").textContent = r.title;
    document.getElementById("score-number").textContent = r.score;
    document.getElementById("score-text").innerHTML = `${r.text}<br>Alcohol: ${r.alc}%`;
    UI.popup.classList.add("show");
    if (r.score >= 7000) FX.triggerConfetti();
}

function resetGame() { FX.clear(); location.reload(); }

function updateUI() {
    const h = Math.min(100, (mix.volume / 300) * 100);
    UI.liquidFill.style.height = `${h}%`;
    UI.liquidFill.style.setProperty("--fill", mix.visualColor);
    UI.stats.textContent = `Vol: ${Math.round(mix.volume)}ml | Shake: ${shakeTime.toFixed(1)}s`;
    if (mix.volume > 10) FX.spawnBubbles(h / 100);
}

function createEmptyMix() {
    return { 
        volume: 0, 
        alcoholMl: 0, 
        sweetness: 0, 
        sourness: 0, 
        bitterness: 0, 
        dilution: 0, 
        shaken: false, 
        ingredients: [], 
        volumes: {}, 
        visualColor: "#f3c34e" 
    };
}

function blendColor(newCol, ratio) {
    if (mix.volume <= 5) return newCol;
    const old = hexToRgb(mix.visualColor);
    const fresh = hexToRgb(newCol);
    const r = Math.round(old.r * (1 - ratio) + fresh.r * ratio);
    const g = Math.round(old.g * (1 - ratio) + fresh.g * ratio);
    const b = Math.round(old.b * (1 - ratio) + fresh.b * ratio);
    return rgbToHex(r, g, b);
}

function hexToRgb(h) {
    const c = h.replace("#", "");
    return { r: parseInt(c.substring(0, 2), 16), g: parseInt(c.substring(2, 4), 16), b: parseInt(c.substring(4, 6), 16) };
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}
