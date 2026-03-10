import { classicCocktails } from './database.js';
import { createCocktailCardHTML } from '../core/ui-utils.js';

export function shakeForCocktail() {
    const shakerCard = document.getElementById('main-shaker-card');
    const modal = document.getElementById('shake-modal');
    const resultContainer = document.getElementById('shake-result-card');

    if (!shakerCard || !modal || !resultContainer) return;

    // Target either the old or new class to prevent breakage
    if (shakerCard.classList.contains('shaking')) return;
    shakerCard.classList.add('shaking');

    setTimeout(() => {
        shakerCard.classList.remove('shaking');

        if (typeof classicCocktails !== 'undefined' && classicCocktails.length > 0) {
            const randomCocktail = classicCocktails[Math.floor(Math.random() * classicCocktails.length)];

            resultContainer.innerHTML = createCocktailCardHTML(randomCocktail, {
                forceOpen: true,
                hideFavorite: true,
                isNeutral: true,
                hideIngredientIcons: true
            });

            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 50);
        } else {
            alert("Database 'classicCocktails' niet gevonden!");
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
