import { myIngredients } from '../core/state.js';
import { classicCocktails } from './database.js';
import { createCocktailCardHTML, createPresentationHTML, showToast } from '../core/ui-utils.js';

export function shakeForCocktail() {
    const shakerCard = document.getElementById('main-shaker-card');
    const modal = document.getElementById('shake-modal');
    const resultContainer = document.getElementById('shake-result-card');

    if (!shakerCard || !modal || !resultContainer) return;

    // Target either the old or new class to prevent breakage
    if (shakerCard.classList.contains('shaking')) return;
    shakerCard.classList.add('shaking');

    const isFullscreen = shakerCard.classList.contains('is-fullscreen');

    setTimeout(() => {
        shakerCard.classList.remove('shaking');

        const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        const allCocktails = [...classicCocktails, ...myRecipes];

        // Filter cocktails that can be fully made with available ingredients
        const makeableCocktails = allCocktails.filter(cocktail => {
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

        if (makeableCocktails.length > 0) {
            const randomCocktail = makeableCocktails[Math.floor(Math.random() * makeableCocktails.length)];

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
            showToast("No cocktails found with current ingredients!", "error");
        }
    }, 2000);
}

export function toggleRandomizerFullscreen(event) {
    if (event) event.stopPropagation(); // Prevent triggering shake

    const shakerCard = document.getElementById('main-shaker-card');
    if (!shakerCard) return;

    const isNowFullscreen = shakerCard.classList.toggle('is-fullscreen');
    
    // Toggle body scroll locking
    if (isNowFullscreen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

export function closeShakeModal() {
    const modal = document.getElementById('shake-modal');
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}
