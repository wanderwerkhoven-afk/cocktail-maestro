import { myFavorites } from '../core/state.js';
import { renderVault } from '../pages/vault.js';
import { checkMatches } from './fridge.js';

export function toggleFavorite(e, cocktailId) {
    if (e) e.stopPropagation();

    const index = myFavorites.indexOf(cocktailId);
    if (index > -1) {
        myFavorites.splice(index, 1);
    } else {
        myFavorites.push(cocktailId);
    }

    localStorage.setItem('myFavorites', JSON.stringify(myFavorites));

    // Re-render the active page to reflect the change
    if (document.getElementById('vault-page').classList.contains('active')) {
        renderVault(document.getElementById('vault-search')?.value || "");
    } else if (document.getElementById('fridge-page').classList.contains('active')) {
        checkMatches();
    }
}
