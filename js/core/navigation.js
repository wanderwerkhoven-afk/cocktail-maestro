import { renderVault } from '../pages/vault.js';
import { renderShoppingList } from '../modules/shopping.js';
import { renderMyRecipes } from '../pages/recipes.js';
import { syncCheckboxes, calculateBarProgress } from '../modules/fridge.js';

export function navigateTo(pageId) {
    // Switch active page
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const activePage = document.getElementById(pageId + '-page');
    if (activePage) activePage.classList.add('active');

    // Update bottom nav visibility
    const bottomNav = document.querySelector('.bottom-nav');
    if (pageId === 'auth') {
        if (bottomNav) bottomNav.style.display = 'none';
    } else {
        if (bottomNav) bottomNav.style.display = 'flex';
    }

    // Update bottom nav icons
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');

    // --- Page-specific actions ---

    // Als we naar de Fridge gaan: zet de vinkjes goed EN update de fles-status
    if (pageId === 'fridge') {
        syncCheckboxes();
        calculateBarProgress(); // Zorgt dat de fles meeverandert als je vinkjes laadt
    }

    // Als we naar de Home gaan (of waar je Bar Status kaart staat):
    // Zorg dat de fles daar ook de juiste data toont
    if (pageId === 'home') {
        calculateBarProgress();
    }

    if (pageId === 'vault') renderVault();
    if (pageId === 'shopping') renderShoppingList();
    if (pageId === 'recipes') renderMyRecipes();

    // Sync collapsible intro states
    if (window.applyIntroStates) window.applyIntroStates();
}
