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
    const items = container.querySelectorAll('.fridge-item-premium');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "flex" : "none";
    });
}

export function filterAllIngredients(searchTerm) {
    const filter = searchTerm.toLowerCase().trim();
    const categories = document.querySelectorAll('.fridge-category');

    categories.forEach(category => {
        const content = category.querySelector('.category-content');
        const items = category.querySelectorAll('.fridge-item-premium');
        let hasVisibleItem = false;

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filter)) {
                item.style.display = "flex";
                hasVisibleItem = true;
            } else {
                item.style.display = "none";
            }
        });

        // Toggle category visibility and expansion based on global search
        if (filter !== "") {
            category.style.display = hasVisibleItem ? "block" : "none";
            if (hasVisibleItem && content && !content.classList.contains('active')) {
                // Auto-expand category if matches are found inside
                content.classList.add('active');
                const icon = category.querySelector('.category-toggle i');
                if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        } else {
            category.style.display = "block";
        }
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
    const checkboxes = document.querySelectorAll('.fridge-item-premium input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const val = cb.value.toLowerCase().trim();
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
            <div class="fridge-item-premium">
                <div class="item-main-click" onclick="const cb = this.querySelector('input'); cb.checked = !cb.checked; updateFridge(cb);">
                    <span class="item-name">${display}</span>
                    <input type="checkbox" value="${val}" style="display:none;">
                    <span class="toggle-switch"></span>
                </div>
                <button class="add-to-cart-btn" onclick="window.addToShoppingList(event, '${display}')" title="Add to shopping list">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
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
            // Group matches by missing count
            const groups = {
                0: { title: "Perfect Matches", items: [] },
                1: { title: "Missing 1 Ingredient", items: [] },
                2: { title: "Missing 2 Ingredients", items: [] }
            };

            matches.forEach(cocktail => {
                groups[cocktail.missingCount].items.push(cocktail);
            });

            // Render each group as a carousel section
            [0, 1, 2].forEach(missingCount => {
                const group = groups[missingCount];
                if (group.items.length === 0) return;

                const section = document.createElement('div');
                section.className = 'vault-category-section'; // Reuse Vault styling
                section.style.marginBottom = '2rem';

                const title = document.createElement('h3');
                title.className = 'category-heading';
                title.innerText = group.title;
                section.appendChild(title);

                const carouselId = `fridge-carousel-missing-${missingCount}`;
                const carousel = document.createElement('div');
                carousel.className = 'carousel';
                carousel.id = carouselId;

                // Scroll listener for dots
                carousel.addEventListener('scroll', () => {
                    window.updateCarouselDots(carouselId);
                    
                    const openCards = carousel.querySelectorAll('.cocktail-card.open');
                    openCards.forEach(card => card.classList.remove('open'));
                }, { passive: true });

                group.items.forEach(cocktail => {
                    const cardWrapper = document.createElement('div');
                    cardWrapper.innerHTML = createCocktailCardHTML(cocktail, {
                        isPerfect: cocktail.missingCount === 0,
                        missingCount: cocktail.missingCount,
                        missingItems: cocktail.missingItems
                    });
                    carousel.appendChild(cardWrapper.firstElementChild);
                });

                section.appendChild(carousel);

                // Add dots container for this carousel
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'carousel-indicators';
                dotsContainer.id = `dots-${carouselId}`;
                
                group.items.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = index === 0 ? 'dot active' : 'dot';
                    dotsContainer.appendChild(dot);
                });

                section.appendChild(dotsContainer);
                resultsContainer.appendChild(section);
                
                // Ensure active dot is calculated properly after DOM insertion
                setTimeout(() => window.updateCarouselDots(carouselId), 50);
            });
        }

        btn.innerHTML = `<i class="fa-solid fa-glass-citrus"></i> Find Cocktails`;
        btn.style.pointerEvents = "auto";
        if (!silent) resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, silent ? 0 : 600);
}

export function calculateBarProgress() {
    // Collect all possible ingredient names from the DOM checkboxes
    const allCheckboxes = document.querySelectorAll('.fridge-item-premium input[type="checkbox"]');
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
