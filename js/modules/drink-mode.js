/* ============================================================
 * DRINK MODE MODULE
 * Controls the Cocktail / Mocktail toggle across the app
 * ============================================================ */

// Shared state — current mode: 'cocktail' or 'mocktail'
export let drinkMode = 'cocktail';

/**
 * Sets the app-wide drink mode and updates the pill UI.
 * Actual page refresh is handled by window.* calls in the HTML onclick
 * to avoid circular imports between vault.js / fridge.js / drink-mode.js.
 *
 * @param {'cocktail'|'mocktail'} mode
 * @param {'vault'|'fridge'} context  Which page triggered the change
 */
export function setDrinkMode(mode, context) {
    drinkMode = mode;

    // Update pill buttons for vault
    const vaultCocktailPill = document.getElementById('vault-pill-cocktail');
    const vaultMocktailPill = document.getElementById('vault-pill-mocktail');
    if (vaultCocktailPill && vaultMocktailPill) {
        vaultCocktailPill.classList.toggle('active', mode === 'cocktail');
        vaultMocktailPill.classList.toggle('active', mode === 'mocktail');
    }

    // Update pill buttons for fridge
    const fridgeCocktailPill = document.getElementById('fridge-pill-cocktail');
    const fridgeMocktailPill = document.getElementById('fridge-pill-mocktail');
    if (fridgeCocktailPill && fridgeMocktailPill) {
        fridgeCocktailPill.classList.toggle('active', mode === 'cocktail');
        fridgeMocktailPill.classList.toggle('active', mode === 'mocktail');
    }

    // Refresh the relevant page content via window globals (avoids circular imports)
    if (context === 'vault') {
        const searchVal = document.getElementById('vaultSearch')?.value || '';
        if (window.renderVault) window.renderVault(searchVal);
    } else if (context === 'fridge') {
        if (window.renderFridgeCategories) window.renderFridgeCategories();
        const resultsContainer = document.getElementById('matching-results');
        if (resultsContainer) resultsContainer.innerHTML = '';
    }
}
