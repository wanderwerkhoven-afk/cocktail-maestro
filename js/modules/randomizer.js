import { myIngredients } from '../core/state.js';
import { createCocktailCardHTML, createPresentationHTML, showToast } from '../core/ui-utils.js';

export function shakeForCocktail() {
    const shakerCard = document.getElementById('main-shaker-card');
    const modal = document.getElementById('shake-modal');
    const resultContainer = document.getElementById('shake-result-card');

    if (!shakerCard || !modal || !resultContainer) return;
    if (shakerCard.classList.contains('shaking')) return;

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

let lastShakeTime = 0;
const SHAKE_THRESHOLD = 15; // G-force threshold for a shake

export function initShakeDetection() {
    if (typeof DeviceMotionEvent === 'undefined') return;

    // iOS 13+ requires permission for motion sensors
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        const shakerCard = document.getElementById('main-shaker-card');
        if (shakerCard) {
            const requestPerm = () => {
                DeviceMotionEvent.requestPermission()
                    .then(response => {
                        if (response === 'granted') {
                            window.addEventListener('devicemotion', handleMotion);
                        }
                    })
                    .catch(err => console.error("Motion permission denied:", err));
                shakerCard.removeEventListener('click', requestPerm);
            };
            shakerCard.addEventListener('click', requestPerm);
        }
    } else {
        // Non-iOS or older versions — listen immediately
        window.addEventListener('devicemotion', handleMotion);
    }
}

function handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const x = acc.x || 0;
    const y = acc.y || 0;
    const z = acc.z || 0;

    // Calculate total acceleration (G-force)
    const totalAcc = Math.sqrt(x * x + y * y + z * z);

    if (totalAcc > SHAKE_THRESHOLD) {
        const now = Date.now();
        // Prevent multiple triggers (2 second cooldown)
        if (now - lastShakeTime > 2000) {
            // Only trigger if we are on the home page and shaker card is visible
            const homePage = document.getElementById('home-page');
            const modal = document.getElementById('shake-modal');
            
            // Don't shake if a result is already showing
            const isModalOpen = modal && modal.classList.contains('show');

            if (homePage && homePage.classList.contains('active') && !isModalOpen) {
                lastShakeTime = now;
                
                // Add a small haptic vibration for feedback if supported
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
                
                shakeForCocktail();
            }
        }
    }
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
}

export function closeShakeModal() {
    const modal = document.getElementById('shake-modal');
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 400);
}
