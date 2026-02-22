import { myIngredients, myFavorites } from '../core/state.js';
import { classicCocktails } from './database.js';
import { createCocktailCardHTML } from '../core/ui-utils.js';

export function toggleCategory(id) {
    const content = document.getElementById(id);
    if (!content) return;

    content.classList.toggle('active');

    const button = content.previousElementSibling;
    const icon = button ? button.querySelector('i') : null;

    if (icon) {
        if (content.classList.contains('active')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    }
}

export function filterCategoryList(input) {
    const filter = input.value.toLowerCase().trim();
    const container = input.closest('.category-content');
    const items = container.querySelectorAll('.fridge-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "flex" : "none";
    });
}

export function updateFridge(checkbox) {
    if (!checkbox) return;
    const value = checkbox.value.toLowerCase().trim();

    // Store state as boolean (true/false) as requested
    myIngredients[value] = checkbox.checked;

    // Save to localStorage immediately
    localStorage.setItem('myIngredients', JSON.stringify(myIngredients));

    // Update UI elements that depend on ingredients
    calculateBarProgress();

    // If matches are already displayed, refresh them silently
    const resultsContainer = document.getElementById('matching-results');
    if (resultsContainer && resultsContainer.innerHTML.trim() !== "" && !resultsContainer.querySelector('.placeholder-text')) {
        checkMatches(true); // Added silent mode
    }

    if (window.updateIngredientSuggestions) {
        window.updateIngredientSuggestions();
    }
}

export function syncCheckboxes() {
    const checkboxes = document.querySelectorAll('.fridge-item input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const val = cb.value.toLowerCase().trim();
        // Check against object key
        cb.checked = !!myIngredients[val];
    });
}

let categoryMap = {}; // Will be dynamically populated

export function renderFridgeCategories() {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const allCocktails = [...classicCocktails, ...myRecipes];

    // Group unique ingredients by their fridgeCategory
    const grouped = {
        spirit: new Map(),
        liqueur: new Map(),
        bitters: new Map(),
        syrup: new Map(),
        juice: new Map(),
        fresh: new Map()
    };

    allCocktails.forEach(cocktail => {
        if (!cocktail.ingredients) return;
        cocktail.ingredients.forEach(ing => {
            if (typeof ing === 'object' && ing.name && ing.fridgeCategory) {
                let cat = ing.fridgeCategory.toLowerCase().trim();
                let val = ing.name.toLowerCase().trim();
                let display = ing.name;

                // Handle syrop/syrup typos
                if (cat === 'syrop') cat = 'syrup';

                // Assign valid categories (fallback to fresh if unknown)
                if (!grouped[cat]) cat = 'fresh';

                // Add to groups Map to ensure uniqueness by lower-case value
                if (!grouped[cat].has(val)) {
                    grouped[cat].set(val, display);
                }

                // Populate the dynamic search map
                categoryMap[val] = cat;
            }
        });
    });

    // Helper to generate HTML for a category list
    function renderList(catKey, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Sort items alphabetically
        const items = Array.from(grouped[catKey].entries()).sort((a, b) => a[1].localeCompare(b[1]));

        container.innerHTML = items.map(([val, display]) => `
            <label class="fridge-item">
                <input type="checkbox" value="${val}" onchange="updateFridge(this)">
                ${display}
            </label>
        `).join('');
    }

    // Render all 6 categories matching the index.html IDs
    renderList('spirit', 'list-spirits');
    renderList('liqueur', 'list-liqueurs');
    renderList('bitters', 'list-bitters');
    renderList('syrup', 'list-syrups');
    renderList('juice', 'list-juices');
    renderList('fresh', 'list-fresh');

    // Make sure checkboxes match our actual localStorage after rendering
    syncCheckboxes();
    // Update bar progress based on total available dynamic items
    calculateBarProgress();
}

export function checkMatches(silent = false) {
    const btn = document.querySelector('.match-btn-large');
    const resultsContainer = document.getElementById('matching-results');
    if (!resultsContainer || !btn) return;

    if (!silent) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Searching...`;
        btn.style.pointerEvents = "none";
    }

    setTimeout(() => {
        const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        const allCocktails = [...classicCocktails, ...myRecipes];

        const matches = allCocktails.map(cocktail => {
            const missing = cocktail.ingredients.filter(ing => {
                const nameToSearch = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
                const targetCategory = (typeof ing === 'object' && ing.fridgeCategory) ? ing.fridgeCategory.toLowerCase().trim() : null;

                // Check in object keys if checked
                const isFound = Object.keys(myIngredients).some(mine => {
                    if (!myIngredients[mine]) return false; // Skip if explicitly false
                    const cleanMine = mine.toLowerCase().trim();

                    // Fallback to name-based fuzzy matching
                    if (nameToSearch.includes(cleanMine) || cleanMine.includes(nameToSearch)) return true;

                    // Broad category matching: if the target has a category, check if the user's ingredient belongs to it
                    const userCategory = categoryMap[cleanMine];
                    if (targetCategory && userCategory === targetCategory) return true;

                    return false;
                });

                return !isFound;
            });
            return { ...cocktail, missingCount: missing.length, missingItems: missing };
        })
            .filter(c => c.missingCount <= 2)
            .sort((a, b) => {
                if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount;
                const aFav = myFavorites.includes(a.id);
                const bFav = myFavorites.includes(b.id);
                return bFav - aFav;
            });

        resultsContainer.innerHTML = "";

        if (matches.length === 0) {
            resultsContainer.innerHTML = `
                <div class="placeholder-text" style="text-align:center; padding: 40px 20px;">
                    <i class="fa-solid fa-ice-cream" style="font-size: 3rem; opacity: 0.2; margin-bottom: 10px;"></i>
                    <p>No close matches found.<br><small>Try selecting more spirits!</small></p>
                </div>`;
        } else {
            matches.forEach(cocktail => {
                const cardHTML = createCocktailCardHTML(cocktail, {
                    isPerfect: cocktail.missingCount === 0,
                    missingCount: cocktail.missingCount,
                    missingItems: cocktail.missingItems
                });
                const cardWrapper = document.createElement('div');
                cardWrapper.innerHTML = cardHTML;
                const card = cardWrapper.firstElementChild;
                resultsContainer.appendChild(card);
            });
        }

        btn.innerHTML = `<i class="fa-solid fa-glass-citrus"></i> Find Cocktails`;
        btn.style.pointerEvents = "auto";
        if (!silent) resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, silent ? 0 : 600);
}

export function calculateBarProgress() {
    // Collect all possible ingredient names from the DOM checkboxes
    const allCheckboxes = document.querySelectorAll('.fridge-item input[type="checkbox"]');
    const allPossibleValues = Array.from(allCheckboxes).map(cb => cb.value.toLowerCase().trim());

    // 1. Count only valid ingredients that are checked in state
    const checkedCount = allPossibleValues.filter(val => myIngredients[val]).length;
    const totalPossible = allPossibleValues.length || 100;

    const bottleCountEl = document.getElementById('bottle-count');
    if (bottleCountEl) bottleCountEl.innerText = checkedCount;

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const allCocktails = [...classicCocktails, ...myRecipes];

    const perfectMatches = allCocktails.filter(cocktail => {
        const missing = cocktail.ingredients.filter(ing => {
            const nameToSearch = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
            const targetCategory = (typeof ing === 'object' && ing.fridgeCategory) ? ing.fridgeCategory.toLowerCase().trim() : null;

            return !Object.keys(myIngredients).some(mine => {
                if (!myIngredients[mine]) return false;
                const cleanMine = mine.toLowerCase().trim();

                if (nameToSearch.includes(cleanMine) || cleanMine.includes(nameToSearch)) return true;

                const userCategory = categoryMap[cleanMine];
                if (targetCategory && userCategory === targetCategory) return true;

                return false;
            });
        });
        return missing.length === 0;
    }).length;

    const matchCountEl = document.getElementById('match-count');
    if (matchCountEl) matchCountEl.innerText = perfectMatches;

    const percentage = totalPossible > 0 ? Math.round((checkedCount / totalPossible) * 100) : 0;
    updateBarUI(percentage, checkedCount);
}

function updateBarUI(pct, count) {
    const liquidGroup = document.getElementById('liquid-group');
    const textEl = document.getElementById('bar-pct-text');

    if (liquidGroup) {
        liquidGroup.style.transition = 'none';
        liquidGroup.style.transform = 'translateY(220px)';

        setTimeout(() => {
            liquidGroup.style.transition = 'transform 3.0s cubic-bezier(0.4, 0, 0.2, 1)';
            const bottomY = 243;
            const topY = 30;
            const range = bottomY - topY;
            const moveY = bottomY - (pct / 100 * range);
            liquidGroup.style.transform = `translateY(${moveY}px)`;
        }, 50);
    }

    if (textEl) {
        animateValue(textEl, 0, pct, 3000);
    }
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerText = Math.floor(progress * (end - start) + start) + "%";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
