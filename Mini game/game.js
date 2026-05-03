import { db, auth } from "../js/core/firebase.js";
import { collection, getDocs, doc, updateDoc, arrayUnion, query, orderBy, limit, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { cocktailDatabase } from "./game_recipes.js";
import { FX } from "./canvas-effects.js";

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
    { name: "Brandy", alcohol: 35, sweet: 2, sour: 0, bitter: 2, color: "#a34b11", color2: "#5e2609" },
    { name: "Amaretto", alcohol: 28, sweet: 4, sour: 0, bitter: 1, color: "#b56014", color2: "#5e2e04" },
    { name: "Campari", alcohol: 25, sweet: 2, sour: 0, bitter: 5, color: "#d92323", color2: "#8a1111" },
    { name: "Blue Curacao", alcohol: 25, sweet: 4, sour: 0, bitter: 0, color: "#185edb", color2: "#0d3785" },
    { name: "Peach Schnapps", alcohol: 20, sweet: 5, sour: 0, bitter: 0, color: "#fcd6a2", color2: "#c29f6d" },
    { name: "Baileys", alcohol: 17, sweet: 5, sour: 0, bitter: 0, color: "#e6d5b8", color2: "#ab9875" },
    { name: "Absinthe", alcohol: 65, sweet: 1, sour: 0, bitter: 4, color: "#47e640", color2: "#207a1c" }
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
    bartenderSprite: document.getElementById("bartender-sprite"),
    popup: document.getElementById("score-popup"),
    game: document.getElementById("game"),
    entreeScreen: document.getElementById("entree-screen"),
    leaderboardList: document.getElementById("leaderboard-list"),
    logsList: document.getElementById("logs-list")
};

handleResize(); // Call immediately to avoid initial zoom effect

// --- Bartender Sprite Animation ---
const animations = {
    'rest': {
        path: 'graphics/sprite/sprite-barman-rest-mode/',
        count: 64,
        frames: []
    },
    'winking': {
        path: 'graphics/sprite/sprite-barman-winking-mode/',
        count: 12,
        frames: []
    }
};

let isAnimating = false;

function preloadAnimations() {
    for (const key in animations) {
        const anim = animations[key];
        for (let i = 0; i < anim.count; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `${anim.path}frame_${frameNum}.webp`;
            anim.frames.push(img);
        }
    }
}

async function playBartenderAnimation(mode = 'rest', loops = 1) {
    if (isAnimating) return;
    isAnimating = true;
    
    const anim = animations[mode];
    if (!anim || anim.frames.length === 0) {
        isAnimating = false;
        return;
    }

    for (let l = 0; l < loops; l++) {
        await new Promise(resolve => {
            let currentFrame = 0;
            const animInterval = setInterval(() => {
                currentFrame++;
                if (currentFrame >= anim.count) {
                    clearInterval(animInterval);
                    resolve();
                    return;
                }
                UI.bartenderSprite.src = anim.frames[currentFrame].src;
            }, 40);
        });
    }
    
    // Back to first frame of rest mode (idle state)
    if (animations['rest'].frames[0]) {
        UI.bartenderSprite.src = animations['rest'].frames[0].src;
    }
    isAnimating = false;
}

const animationSequence = [
    { mode: 'rest', loops: 1, pause: 4000 },
    { mode: 'winking', loops: 2, pause: 3000 },
    { mode: 'winking', loops: 1, pause: 5000 },
    { mode: 'winking', loops: 1, pause: 2000 }
];

let sequenceIndex = 0;

async function startAnimationLoop() {
    const step = animationSequence[sequenceIndex];
    await playBartenderAnimation(step.mode, step.loops);
    
    sequenceIndex = (sequenceIndex + 1) % animationSequence.length;
    setTimeout(startAnimationLoop, step.pause);
}
// --- End Bartender Sprite Animation ---

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        auth.onAuthStateChanged(() => {
            init();
        });
    });
} else {
    auth.onAuthStateChanged(() => {
        init();
    });
}

function init() {
    // Hide old shelves if they exist
    if (UI.shelfOne) UI.shelfOne.style.display = 'none';
    if (UI.shelfTwo) UI.shelfTwo.style.display = 'none';
    if (UI.juiceShelf) UI.juiceShelf.style.display = 'none';

    // Prevent context menu globally on the game to avoid selection/copy-paste UI on mobile
    UI.game.addEventListener("contextmenu", e => e.preventDefault());

    // Map new bottle IDs to ingredients
    const bottleMapping = [
        { id: "new-bottle-whiskey", name: "Whiskey" },
        { id: "new-bottle-cognac", name: "Brandy" }, // Cognac maps to Brandy for recipes
        { id: "new-bottle-dark-rum", name: "Rum" },
        { id: "new-bottle-white-rum", name: "Rum" },
        { id: "new-bottle-vodka", name: "Vodka" },
        { id: "new-bottle-gin", name: "Gin" },
        { id: "new-bottle-tequila", name: "Tequila" },
        { id: "new-bottle-cointreau", name: "Cointreau" },
        { id: "new-bottle-disaronno", name: "Amaretto" }, // Disaronno is Amaretto
        { id: "new-bottle-campari", name: "Campari" },
        { id: "new-bottle-soda", name: "Soda" },
        { id: "new-bottle-baileys", name: "Baileys" },
        { id: "new-bottle-kahlua", name: "Kahlua" },
        { id: "new-bottle-vermouth", name: "Vermouth" },
        { id: "new-bottle-blue-curacau", name: "Blue Curacao" },
        { id: "new-bottle-peach-liquor", name: "Peach Schnapps" },
        { id: "new-bottle-orange-juice", name: "Orange" },
        { id: "new-bottle-lemon-juice", name: "Lemon" },
        { id: "new-bottle-lime-juice", name: "Lime" },
        { id: "new-bottle-cranberry-juice", name: "Cranberry" },
        { id: "new-bottle-sugar-syrup", name: "Sugar Syrup" }
    ];

    bottleMapping.forEach(map => {
        const el = document.getElementById(map.id);
        if (el) {
            // Find data in spirits or juices
            const data = spirits.find(s => s.name === map.name) || juices.find(j => j.name === map.name);
            if (data) {
                el.addEventListener("click", () => selectBottle(data, el));
            }
        }
    });

    // Special items
    const iceBtn = document.getElementById("new-ice-bucket");
    const lemonBtn = document.getElementById("new-lemon-bowl");
    const bittersBtn = document.getElementById("new-bottle-angostura");
    const eggBtn = document.getElementById("egg-btn"); // Keeping old egg btn for now if no new one

    if (iceBtn) iceBtn.addEventListener("click", () => addSpecial("Ice", "#fff"));
    if (lemonBtn) lemonBtn.addEventListener("click", () => addSpecial("Lemon Slice", "#fff04a"));
    if (bittersBtn) bittersBtn.addEventListener("click", () => addSpecial("Bitters", "#6e1c10"));
    if (eggBtn) eggBtn.addEventListener("click", () => addSpecial("Egg White", "#fdfdfd"));

    const pourBtn = document.getElementById("new-pour-btn");
    if (pourBtn) {
        pourBtn.addEventListener("pointerdown", startPouring);
        window.addEventListener("pointerup", stopPouring);
        pourBtn.addEventListener("contextmenu", e => e.preventDefault());
    }

    const shakeBtn = document.getElementById("new-shake-btn");
    if (shakeBtn) {
        shakeBtn.addEventListener("pointerdown", startShaking);
        window.addEventListener("pointerup", stopShaking);
        shakeBtn.addEventListener("contextmenu", e => e.preventDefault());
    }

    const serveBtn = document.getElementById("new-serve-btn");
    const resetBtn = document.getElementById("reset-btn");
    const toScoreboardBtn = document.getElementById("to-scoreboard-btn");
    if (serveBtn) serveBtn.addEventListener("click", serveMix);
    if (resetBtn) resetBtn.addEventListener("click", window.resetGame);
    if (toScoreboardBtn) {
        toScoreboardBtn.addEventListener("click", () => {
            window.goToEntree();
        });
    }

    // Menu logic
    const menuBtn = document.getElementById("menu-btn");
    const gameMenu = document.getElementById("game-menu");
    const closeMenuBtn = document.getElementById("close-menu");
    const closeMenuCross = document.getElementById("close-menu-cross");

    if (menuBtn && gameMenu) {
        menuBtn.addEventListener("click", () => gameMenu.classList.add("show"));
        if (closeMenuBtn) closeMenuBtn.addEventListener("click", () => gameMenu.classList.remove("show"));
        if (closeMenuCross) closeMenuCross.addEventListener("click", () => gameMenu.classList.remove("show"));
        gameMenu.addEventListener("click", (e) => {
            if (e.target === gameMenu) gameMenu.classList.remove("show");
        });
    }

    // Uitleg logic
    const uitlegBtn = document.getElementById("uitleg-btn");
    const uitlegModal = document.getElementById("uitleg-modal");
    const closeUitlegBtn = document.getElementById("close-uitleg-btn");
    const closeUitlegCross = document.getElementById("close-uitleg-cross");

    if (uitlegBtn && uitlegModal) {
        uitlegBtn.addEventListener("click", () => uitlegModal.classList.add("show"));
        if (closeUitlegBtn) closeUitlegBtn.addEventListener("click", () => uitlegModal.classList.remove("show"));
        if (closeUitlegCross) closeUitlegCross.addEventListener("click", () => uitlegModal.classList.remove("show"));
        uitlegModal.addEventListener("click", (e) => {
            if (e.target === uitlegModal) uitlegModal.classList.remove("show");
        });
    }

    updateUI();
    handleResize();
    window.addEventListener("resize", handleResize);
    preloadAnimations();
    startAnimationLoop();
    FX.init();

    // Entree Screen Logic
    const startBtn = document.getElementById("start-game-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            UI.entreeScreen.classList.add("hide");
        });
    }

    // Clear logs logic
    const clearBtn = document.getElementById("clear-logs-btn");
    if (clearBtn) {
        clearBtn.addEventListener("click", async () => {
            if (!confirm("Weet je zeker dat je jouw recente shakes wilt verwijderen?")) return;
            const user = auth.currentUser;
            if (user) {
                await updateDoc(doc(db, "users", user.uid), {
                    minigameLogs: []
                });
                updateEntreeScreen();
            }
        });
    }

    updateEntreeScreen();
}

async function updateEntreeScreen() {
    try {
        // 1. Global Highscores (Top score per user)
        const scoresQuery = query(collection(db, "minigame-highscores"), orderBy("score", "desc"), limit(50));
        const scoresSnap = await getDocs(scoresQuery);
        const allScores = scoresSnap.docs.map(d => d.data());
        
        // Filter for unique users (only the best score per person)
        const seenUsers = new Set();
        const scores = [];
        for (const s of allScores) {
            // Identifier is UID for logged in, Name for guests
            const identifier = s.uid && s.uid !== 'guest' ? s.uid : s.name;
            if (!seenUsers.has(identifier)) {
                seenUsers.add(identifier);
                scores.push(s);
            }
            if (scores.length >= 5) break;
        }
        
        UI.leaderboardList.innerHTML = scores.length 
            ? scores.map(s => `<li><span>${s.name}</span><span>${s.score} pts</span></li>`).join('')
            : '<li><span>Geen scores...</span></li>';

        // 2. User Recent Shakes
        const user = auth.currentUser;
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            let logs = userDoc.exists() ? (userDoc.data().minigameLogs || []) : [];
            
            // Sort by timestamp if available, else reverse order
            logs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

            UI.logsList.innerHTML = logs.length
                ? logs.slice(0, 10).map(l => {
                    const ingList = l.volumes ? Object.entries(l.volumes)
                        .map(([name, vol]) => {
                            // Find feedback for this specific ingredient
                            const fb = Array.isArray(l.feedback) ? l.feedback.find(f => f.ing === name) : null;
                            let statusHtml = '';
                            if (fb) {
                                if (fb.type === 'too_much') statusHtml = `<span class="fb-less">minder <i class="fa-solid fa-arrow-down"></i></span>`;
                                else if (fb.type === 'too_little') statusHtml = `<span class="fb-more">meer <i class="fa-solid fa-arrow-up"></i></span>`;
                                else if (fb.type === 'extra') statusHtml = `<span class="fb-extra">laat weg</span>`;
                            }
                            return `<div class="log-ing">${Math.round(vol)} ml - ${name} ${statusHtml}</div>`;
                        })
                        .join('') : '';
                    
                    // Handle missing ingredients
                    const missing = Array.isArray(l.feedback) ? l.feedback.filter(f => f.type === 'missing') : [];
                    const missingHtml = missing.length > 0 
                        ? `<div class="log-feedback missing">Je mist wat ...</div>` 
                        : '';

                    return `
                        <li class="log-item">
                            <div class="log-header">
                                <span class="log-title">${l.time} - ${l.name}</span>
                                <span class="log-score">${l.score}</span>
                            </div>
                            <div class="log-details">
                                ${ingList}
                                ${missingHtml}
                            </div>
                        </li>
                    `;
                }).join('')
                : '<li><span>Begin met mixen!</span></li>';

            if (logs.length > 3) {
                UI.logsList.innerHTML += UI.logsList.innerHTML; 
                startLogsAutoScroll(UI.logsList.parentElement);
            } else {
                stopLogsAutoScroll();
            }
        } else {
             UI.logsList.innerHTML = '<li><span>Log in om je shakes op te slaan!</span></li>';
        }
    } catch (e) {
        console.error("Error updating entree screen:", e);
    }
}

let logsAutoScrollTimer = null;
let isLogsHovered = false;

function startLogsAutoScroll(container) {
    stopLogsAutoScroll();
    
    // Only attach events once
    if (!container.dataset.hasScrollEvents) {
        container.addEventListener('mouseenter', () => isLogsHovered = true);
        container.addEventListener('mouseleave', () => isLogsHovered = false);
        container.addEventListener('touchstart', () => isLogsHovered = true, {passive: true});
        container.addEventListener('touchend', () => {
            // resume after slight delay on touch
            setTimeout(() => isLogsHovered = false, 1000);
        });
        container.dataset.hasScrollEvents = "true";
    }

    logsAutoScrollTimer = setInterval(() => {
        if (isLogsHovered) return;
        
        container.scrollTop += 1;
        
        // Loop back when reaching exactly half (since we duplicated the content)
        if (container.scrollTop >= container.scrollHeight / 2) {
            container.scrollTop = 0;
        }
    }, 30);
}

function stopLogsAutoScroll() {
    if (logsAutoScrollTimer) {
        clearInterval(logsAutoScrollTimer);
        logsAutoScrollTimer = null;
    }
}

async function saveGameResult(score, name, volumes, feedback) {
    if (score <= 0) return; 

    const user = auth.currentUser;
    const displayName = user ? (user.displayName || user.email.split('@')[0]) : "Gast";

    try {
        // 1. Save to Global Leaderboard (All scores, filtered on display)
        const scoreId = `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        await setDoc(doc(db, "minigame-highscores", scoreId), {
            score,
            name: displayName,
            date: new Date().toLocaleDateString(),
            uid: user ? user.uid : 'guest',
            timestamp: Date.now()
        });

        // 2. Save to User Logs
        if (user) {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                minigameLogs: arrayUnion({
                    score,
                    name,
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    volumes,
                    feedback: feedback || [],
                    timestamp: Date.now()
                })
            });
        }
    } catch (e) {
        console.error("Error saving result:", e);
    }
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

function deselectAll() {
    document.querySelectorAll(".bottle, .new-bottle, .new-ui-element").forEach(x => x.classList.remove("selected"));
    selectedItem = null;
}

function selectBottle(ing, el) {
    if (gameState !== "idle") return;
    deselectAll();
    el.classList.add("selected");
    selectedItem = { type: "ing", data: ing };
    UI.info.innerHTML = `<div>Geselecteerd: <strong>${ing.name}</strong></div><div style="font-size: 32px; margin-top: 5px;">HOUD DE POUR KNOP IN</div>`;
    
    // UI.bartender.querySelector('.arm.right').style.transform = "rotate(-20deg)";
}

function addSpecial(name, color) {
    if (gameState !== "idle" && gameState !== "pouring") return;
    
    // Deselect any bottle when adding specials
    deselectAll();
    
    const amount = name === "Bitters" ? 5 : 15; // 5ml for a dash of bitters, 15 for others
    if (mix.volume + amount > 250) return;
    
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
    const btnId = name === "Ice" ? "new-ice-bucket" : (name === "Egg White" ? "egg-btn" : (name === "Bitters" ? "new-bottle-angostura" : "new-lemon-bowl"));
    const el = document.getElementById(btnId);
    if (el) {
        el.style.transform = "scale(1.2) translateY(-20px)";
        setTimeout(() => el.style.transform = "", 200);
    }

    UI.info.innerHTML = `<div>Toegevoegd: <strong>${name}</strong></div><div style="font-size: 32px; margin-top: 4px;">${name === 'Ice' ? 'IJsblokjes: '+mix.iceCount : ''}</div>`;
}

function startPouring(e) {
    if (!selectedItem || gameState !== "idle") return;
    if (mix.volume >= 250) return;

    gameState = "pouring";
    const streamColor = selectedItem.type === "ing" ? selectedItem.data.color : selectedItem.color;
    // UI.bartender.querySelector('.arm.right').style.transform = "rotate(-60deg)";
    FX.startPour(streamColor);
    
    holdTimer = setInterval(() => {
        if (mix.volume >= 250) { stopPouring(); return; }

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
    // UI.bartender.querySelector('.arm.right').style.transform = "rotate(-30deg)";
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
        if (shakeTime > 10) explode();
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
    // UI.bartender.querySelector('.arm.left').style.transform = "rotate(-55deg) translateY(-40px)";
    setTimeout(() => showResult(evaluateMix()), 1500);
}

function evaluateMix() {
    // Use the global cocktailDatabase from game_recipes.js
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
        recipeScore -= shakeDiff * 1200;

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

    const titlesPerfect = ["PERFECT!", "MEESTERLIJK!", "WAANZINNIG!", "HEERLIJK!"];
    const textsPerfect = [
        `Een meesterlijke ${bestMatch ? bestMatch.name : 'creatie'}! De smaken dansen op Boudewijns tong.`,
        `Perfectie in een glas! Precies de juiste verhoudingen voor een verbluffende ${bestMatch ? bestMatch.name : 'cocktail'}.`,
        `Boudewijn buigt diep. Dit is een ${bestMatch ? bestMatch.name : 'drankje'} dat rechtstreeks op de menukaart mag!`,
        `Fenomenaal gemixt! Zelfs een doorgewinterde bartender zou jaloers zijn op deze ${bestMatch ? bestMatch.name : 'mix'}.`
    ];

    const titlesDisgust = ["BAH!", "YUCK!", "IEUW!", "NEEEE..."];
    const textsDisgust = [
        "Dit is niet te drinken! Boudewijn is diep teleurgesteld en spoelt z'n mond met water.",
        "Wat heb je in hemelsnaam bij elkaar gegooid? Zelfs de gootsteen weigert dit door te slikken.",
        "Een regelrechte belediging voor de cocktailwereld. Dit lijkt meer op afwaswater!",
        "Boudewijn trekt wit weg. Dit brouwsel zou verboden moeten worden volgens de Geneefse conventies."
    ];

    const titlesNeutral = ["NOG NIET...", "BIJNA...", "MWAH...", "OEFENEN!"];
    const textsNeutral = [
        `Het lijkt heel in de verte op een ${bestMatch ? bestMatch.name : 'cocktail'}, maar de balans is ver te zoeken.`,
        `Leuk geprobeerd, maar dit is nog geen meesterwerk. Oefen nog even goed op je verhoudingen!`,
        `Er zit potentie in, maar Boudewijn is nog niet overtuigd. Let extra goed op het recept.`,
        `Niet slecht voor een amateur, maar een echte Maestro zou zich hier nog kapot voor schamen.`
    ];

    const titlesDizzy = ["HEFTIG!", "WOW!", "ZO DAN!", "BRANDSTOF!"];
    const textsDizzy = [
        `De smaak is goed voor een ${bestMatch ? bestMatch.name : 'mix'}, maar Boudewijn ziet nu dubbel! Iets minder alcohol?`,
        `Wow! Deze ${bestMatch ? bestMatch.name : 'cocktail'} slaat in als een bom. Dit is eerder raketbrandstof!`,
        `Heerlijk, maar dodelijk. Boudewijn moet even gaan zitten na dit extreem sterke drankje.`
    ];

    let reaction = "happy";
    let title = titlesPerfect[Math.floor(Math.random() * titlesPerfect.length)];
    let text = textsPerfect[Math.floor(Math.random() * textsPerfect.length)];

    // Feedback logic
    let feedback = [];
    if (bestMatch) {
        Object.keys(bestMatch.ingredients).forEach(ing => {
            const target = bestMatch.ingredients[ing];
            const actual = mix.volumes[ing] || 0;
            if (actual === 0) {
                feedback.push({ ing: ing, type: 'missing' });
            } else if (actual > target + 10) {
                feedback.push({ ing: ing, type: 'too_much' });
            } else if (actual < target - 10) {
                feedback.push({ ing: ing, type: 'too_little' });
            }
        });
        Object.keys(mix.volumes).forEach(ing => {
            // Check if ingredient should NOT be in the recipe (excluding ice and garnishes usually)
            if (ing !== "Ice" && ing !== "Lemon Slice" && ing !== "Egg White" && ing !== "Bitters" && !bestMatch.ingredients[ing]) {
                feedback.push({ ing: ing, type: 'extra' });
            }
        });
    }

    if (finalScore < 2500) {
        reaction = "disgust";
        title = titlesDisgust[Math.floor(Math.random() * titlesDisgust.length)];
        text = textsDisgust[Math.floor(Math.random() * textsDisgust.length)];
    } else if (finalScore < 6000) {
        reaction = "neutral";
        title = titlesNeutral[Math.floor(Math.random() * titlesNeutral.length)];
        text = textsNeutral[Math.floor(Math.random() * textsNeutral.length)];
    } else if (alcPerc > 42) {
        reaction = "dizzy";
        title = titlesDizzy[Math.floor(Math.random() * titlesDizzy.length)];
        text = textsDizzy[Math.floor(Math.random() * textsDizzy.length)];
    }

    return { 
        score: finalScore, 
        reaction, 
        title, 
        text, 
        alc: alcPerc.toFixed(1), 
        recipeName: bestMatch ? bestMatch.name : "Custom Mix",
        volumes: { ...mix.volumes },
        feedback: feedback
    };
}

function showResult(r) {
    UI.bartender.className = `bartender ${r.reaction}`;
    document.getElementById("score-title").textContent = r.title;
    document.getElementById("score-number").textContent = r.score;
    document.getElementById("score-text").innerHTML = `${r.text}<br>Alcohol: ${r.alc}%`;
    UI.popup.classList.add("show");
    
    if (r.score > 0) {
        saveGameResult(r.score, r.recipeName || "Explosie", r.volumes, r.feedback);
    }

    if (r.score >= 7000) FX.triggerConfetti();
}

window.resetGame = function() { 
    UI.game.classList.remove("exploding");
    UI.bartender.className = "bartender";
    FX.clear(); 
    resetGameState();
}

window.goToEntree = function() {
    const gameMenu = document.getElementById("game-menu");
    if (gameMenu) gameMenu.classList.remove("show");
    
    if (UI.entreeScreen) {
        UI.entreeScreen.classList.remove("hide");
        updateEntreeScreen();
    }
    
    resetGameState();
};

function resetGameState() {
    mix = createEmptyMix();
    shakeTime = 0;
    selectedItem = null;
    gameState = "idle";
    
    // Reset visual elements
    if (UI.popup) UI.popup.classList.remove("show");
    document.querySelectorAll(".bottle, .new-bottle, .new-ui-element").forEach(x => x.classList.remove("selected"));
    UI.game.classList.remove("shaking", "exploding");
    UI.bartender.className = "bartender";
    UI.info.innerHTML = "Selecteer een drankje en HOUD de POUR knop ingedrukt.";
    
    updateUI();
}

function updateUI() {
    const h = Math.min(100, (mix.volume / 250) * 100);
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
