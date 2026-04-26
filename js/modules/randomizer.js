import { myIngredients } from '../core/state.js';
import { createCocktailCardHTML, createPresentationHTML, showToast } from '../core/ui-utils.js';

export function shakeForCocktail() {
    const shakerCard = document.getElementById('main-shaker-card');
    const modal = document.getElementById('shake-modal');
    const resultContainer = document.getElementById('shake-result-card');

    if (!shakerCard || !modal || !resultContainer) return;
    if (shakerCard.classList.contains('shaking')) return;

    // Haptic feedback for mobile
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([80, 50, 80]);
    }

    shakerCard.classList.add('shaking');

    const isFullscreen = shakerCard.classList.contains('is-fullscreen');
    
    // Get filters
    const filters = JSON.parse(localStorage.getItem('randomizer_filters')) || {
        type: 'both',
        availability: 'fridge',
        spirits: ['vodka', 'rum', 'tequila', 'gin', 'whiskey', 'brandy'],
        flavors: []
    };

    setTimeout(() => {
        shakerCard.classList.remove('shaking');

        const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        let allCocktails = [...(window.classicCocktails || []), ...(window.mocktailRecipes || []), ...myRecipes];

        // 1. Filter by Type (Cocktail/Mocktail)
        if (filters.type === 'cocktail') {
            allCocktails = allCocktails.filter(c => !c.isMocktail);
        } else if (filters.type === 'mocktail') {
            allCocktails = allCocktails.filter(c => c.isMocktail);
        }

        // 2. Filter by Spirits
        if (filters.spirits && filters.spirits.length > 0) {
            allCocktails = allCocktails.filter(c => {
                // If mocktail, it might not have a base spirit, so we keep it if filtering for mocktails
                if (c.isMocktail) return true;
                if (!c.ingredients) return false;
                
                return c.ingredients.some(ing => {
                    const name = (typeof ing === 'object' ? ing.name : ing).toLowerCase();
                    return filters.spirits.some(s => name.includes(s));
                });
            });
        }

        // 3. Filter by Flavor Profile
        if (filters.flavors && filters.flavors.length > 0) {
            allCocktails = allCocktails.filter(c => {
                if (!c.category && !c.description) return false;
                const searchable = `${c.category?.join(' ') || ''} ${c.description || ''} ${c.name || ''}`.toLowerCase();
                return filters.flavors.some(f => searchable.includes(f.toLowerCase()));
            });
        }

        // 4. Filter by Availability
        let filteredList = allCocktails;
        if (filters.availability === 'fridge') {
            filteredList = allCocktails.filter(cocktail => {
                if (!cocktail.ingredients) return false;
                return cocktail.ingredients.every(ing => {
                    const nameToSearch = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
                    return Object.keys(myIngredients).some(mine => {
                        if (!myIngredients[mine]) return false;
                        const cleanMine = mine.toLowerCase().trim();
                        return nameToSearch.includes(cleanMine) || cleanMine.includes(nameToSearch);
                    });
                });
            });
        }

        if (filteredList.length > 0) {
            const randomCocktail = filteredList[Math.floor(Math.random() * filteredList.length)];

            if (isFullscreen) {
                resultContainer.innerHTML = createPresentationHTML(randomCocktail);
            } else {
                resultContainer.innerHTML = createCocktailCardHTML(randomCocktail, {
                    forceOpen: true,
                    hideFavorite: true,
                    isNeutral: true,
                    hideIngredientIcons: true
                });
            }

            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 50);
        } else {
            showToast("No cocktails found matching your filters!", "error");
        }
    }, 2000);
}

export function openRandomizerFilters() {
    const modal = document.getElementById('randomizer-filter-modal');
    if (!modal) return;

    // Load saved filters
    const filters = JSON.parse(localStorage.getItem('randomizer_filters')) || {
        type: 'both',
        availability: 'fridge',
        spirits: ['vodka', 'rum', 'tequila', 'gin', 'whiskey', 'brandy'],
        flavors: []
    };

    // UI State for pills
    document.querySelectorAll('#filter-drink-type .filter-pill').forEach(p => {
        p.classList.toggle('active', p.dataset.value === filters.type);
    });
    document.querySelectorAll('#filter-availability .filter-pill').forEach(p => {
        p.classList.toggle('active', p.dataset.value === filters.availability);
    });

    // Spirits
    document.querySelectorAll('#filter-spirits input').forEach(cb => {
        cb.checked = filters.spirits.includes(cb.value);
    });

    // Flavors
    document.querySelectorAll('#filter-flavors .filter-pill-sm').forEach(p => {
        p.classList.toggle('active', filters.flavors.includes(p.dataset.value));
    });

    // Setup event listeners for pills (one-time setup if needed, or just handle here)
    const pills = modal.querySelectorAll('.filter-pill, .filter-pill-sm');
    pills.forEach(pill => {
        pill.onclick = () => {
            if (pill.classList.contains('filter-pill')) {
                // Group behavior for large pills
                pill.parentElement.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            } else {
                // Toggle behavior for small flavor pills
                pill.classList.toggle('active');
            }
        };
    });

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 50);
}

export function closeRandomizerFilters() {
    const modal = document.getElementById('randomizer-filter-modal');
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 400);
}

export function applyRandomizerFilters() {
    const filters = {
        type: document.querySelector('#filter-drink-type .filter-pill.active')?.dataset.value || 'both',
        availability: document.querySelector('#filter-availability .filter-pill.active')?.dataset.value || 'fridge',
        spirits: Array.from(document.querySelectorAll('#filter-spirits input:checked')).map(cb => cb.value),
        flavors: Array.from(document.querySelectorAll('#filter-flavors .filter-pill-sm.active')).map(p => p.dataset.value)
    };

    localStorage.setItem('randomizer_filters', JSON.stringify(filters));
    closeRandomizerFilters();
    showToast("Filters applied!", "success");
}

window.toggleAllFilterSpirits = (checked) => {
    document.querySelectorAll('#filter-spirits input').forEach(cb => cb.checked = checked);
};

export function toggleRandomizerFullscreen(event) {
    if (event) event.stopPropagation();
    const shakerCard = document.getElementById('main-shaker-card');
    if (!shakerCard) return;
    const isNowFullscreen = shakerCard.classList.toggle('is-fullscreen');
    document.body.style.overflow = isNowFullscreen ? 'hidden' : '';

    // Request motion permission for iOS on interaction
    if (isNowFullscreen && window.requestShakePermission) {
        window.requestShakePermission();
    }
}

export function closeShakeModal() {
    const modal = document.getElementById('shake-modal');
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 400);
}

// --- SHAKE DETECTION LOGIC ---
let lastX, lastY, lastZ;
let moveCounter = 0;
const SHAKE_THRESHOLD = 15;

export function initShakeDetection() {
    if (typeof DeviceMotionEvent === 'undefined') return;
    
    if (typeof DeviceMotionEvent.requestPermission !== 'function') {
        // Android or older iOS
        window.addEventListener('devicemotion', handleMotion);
    }
}

function handleMotion(event) {
    const shakerCard = document.getElementById('main-shaker-card');
    if (!shakerCard || !shakerCard.classList.contains('is-fullscreen')) return;
    if (shakerCard.classList.contains('shaking')) return;

    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    if (lastX !== undefined) {
        let deltaX = Math.abs(lastX - acc.x);
        let deltaY = Math.abs(lastY - acc.y);
        let deltaZ = Math.abs(lastZ - acc.z);

        if ((deltaX > SHAKE_THRESHOLD && deltaY > SHAKE_THRESHOLD) || 
            (deltaX > SHAKE_THRESHOLD && deltaZ > SHAKE_THRESHOLD) || 
            (deltaY > SHAKE_THRESHOLD && deltaZ > SHAKE_THRESHOLD)) {
            
            moveCounter++;
            if (moveCounter > 4) { 
                shakeForCocktail();
                moveCounter = 0;
            }
        } else {
            if (moveCounter > 0) moveCounter -= 0.05;
        }
    }

    lastX = acc.x;
    lastY = acc.y;
    lastZ = acc.z;
}

window.requestShakePermission = async () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
            const permission = await DeviceMotionEvent.requestPermission();
            if (permission === 'granted') {
                window.addEventListener('devicemotion', handleMotion);
            }
        } catch (error) {
            console.warn("Shake permission request failed or was denied.");
        }
    }
};

