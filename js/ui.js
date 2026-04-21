import { navigateTo } from './core/navigation.js';
import { toggleItemCheck, removeFromShoppingList, clearShoppingList, addToShoppingList, downloadShoppingList } from './modules/shopping.js';
import { toggleFavorite } from './modules/favorites.js';
import { renderVault, downloadRecipe, updateServings } from './pages/vault.js';
import { openRecipeForm, closeRecipeForm, addIngredientRow, removeIngredientRow, addInstructionRow, removeInstructionRow, previewImage, saveNewRecipe, updateRecipe, editRecipe, deleteRecipe, checkRowTyping, checkStepTyping, renderMyRecipes, setRecipeMode } from './pages/recipes.js';
import { toggleCategory, filterCategoryList, filterAllIngredients, updateFridge, syncCheckboxes, checkMatches, calculateBarProgress, renderFridgeCategories } from './modules/fridge.js';
import { shakeForCocktail, closeShakeModal, toggleRandomizerFullscreen } from './modules/randomizer.js';
import { handleCardClick, showToast, createCocktailCardHTML, updateCarouselDots, enlargeRecipe, closeImmersiveRecipe, updateImmersiveServings, updateSearchClearButton, clearSearch } from './core/ui-utils.js';
import { filterKitchen, initKitchenCarousels, toggleKitchenCard, openKitchenItem } from './pages/kitchen.js';
import { setDrinkMode } from './modules/drink-mode.js';
import { initSettings, openSettingsModal, closeSettingsModal, toggleLanguageList, closeLanguageList, toggleUnitList, closeUnitList, changeUnit, toggleThemeList, closeThemeList, changeTheme, openTermsModal, closeTermsModal, openPrivacyModal, closePrivacyModal } from './pages/settings.js';
import { fetchCloudData } from './core/auth.js';
import { getInitialDestination } from './core/auth-flow.js';
import { applyLanguage, changeLanguage } from './core/i18n.js';
import { classicCocktails } from './modules/database.js';
import { mocktailRecipes } from './modules/mocktails.js';

/**
 * Device detection helper for iOS specific behavior
 */
window.isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};

// Expose functions to global scope for HTML onclick handlers
window.navigateTo = navigateTo;
window.changeLanguage = (lang) => {
    changeLanguage(lang);
    if (window.closeLanguageList) window.closeLanguageList();
};
window.toggleItemCheck = toggleItemCheck;
window.removeFromShoppingList = removeFromShoppingList;
window.clearShoppingList = clearShoppingList;
window.addToShoppingList = addToShoppingList;
window.downloadShoppingList = downloadShoppingList;
window.toggleFavorite = toggleFavorite;
window.renderVault = renderVault;
window.downloadRecipe = downloadRecipe;
window.updateServings = updateServings;
window.openRecipeForm = openRecipeForm;
window.closeRecipeForm = closeRecipeForm;
window.addIngredientRow = addIngredientRow;
window.removeIngredientRow = removeIngredientRow;
window.addInstructionRow = addInstructionRow;
window.removeInstructionRow = removeInstructionRow;
window.previewImage = previewImage;
window.saveNewRecipe = saveNewRecipe;
window.updateRecipe = updateRecipe;
window.editRecipe = editRecipe;
window.deleteRecipe = deleteRecipe;
window.checkRowTyping = checkRowTyping;
window.checkStepTyping = checkStepTyping;
window.renderMyRecipes = renderMyRecipes;
window.setRecipeMode = setRecipeMode;
window.toggleCategory = toggleCategory;
window.filterCategoryList = filterCategoryList;
window.filterAllIngredients = filterAllIngredients;
window.updateFridge = updateFridge;
window.syncCheckboxes = syncCheckboxes;
window.checkMatches = checkMatches;
window.calculateBarProgress = calculateBarProgress;
window.shakeForCocktail = shakeForCocktail;
window.closeShakeModal = closeShakeModal;
window.toggleRandomizerFullscreen = toggleRandomizerFullscreen;
window.handleCardClick = handleCardClick;
window.showToast = showToast;
window.createCocktailCardHTML = createCocktailCardHTML;
window.enlargeRecipe = enlargeRecipe;
window.closeImmersiveRecipe = closeImmersiveRecipe;
window.updateImmersiveServings = updateImmersiveServings;
window.filterKitchen = filterKitchen;
window.updateCarouselDots = updateCarouselDots;
window.toggleKitchenCard = toggleKitchenCard;
window.openKitchenItem = openKitchenItem;
window.setDrinkMode = setDrinkMode;
window.openSettingsModal = openSettingsModal;
window.closeSettingsModal = closeSettingsModal;
window.toggleLanguageList = toggleLanguageList;
window.closeLanguageList = closeLanguageList;
window.toggleUnitList = toggleUnitList;
window.closeUnitList = closeUnitList;
window.changeUnit = changeUnit;
window.toggleThemeList = toggleThemeList;
window.closeThemeList = closeThemeList;
window.changeTheme = changeTheme;
window.openTermsModal = openTermsModal;
window.closeTermsModal = closeTermsModal;
window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;
window.updateSearchClearButton = updateSearchClearButton;
window.clearSearch = clearSearch;
window.shareRecipe = async () => {
    const title = document.querySelector('.immersive-title')?.innerText || 'Cocktail Recipe';
    const description = document.querySelector('.immersive-description')?.innerText || '';
    const ingredients = Array.from(document.querySelectorAll('.immersive-ing-list li'))
        .map(li => li.innerText.replace(/\s+/g, ' ').trim())
        .join('\n');
    
    const shareData = {
        title: `Cocktail Maestro: ${title}`,
        text: `${title}\n\n${description}\n\nIngredients:\n${ingredients}\n\nShared via Cocktail Maestro`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for browsers that don't support Web Share API
            const text = encodeURIComponent(shareData.text);
            window.open(`mailto:?subject=${encodeURIComponent(shareData.title)}&body=${text}`);
        }
    } catch (err) {
        console.error('Error sharing:', err);
    }
};

window.printRecipe = async () => {

    const content = document.getElementById('immersive-recipe-content');
    const closeBtn = document.querySelector('.immersive-close-btn');
    const printBtn = document.querySelector('.immersive-print-btn');
    const servings = document.querySelector('.immersive-servings-box');

    // Open window synchronously to bypass Safari/iOS popup blockers
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write('<html lang="en"><body style="background:#f4f4f4; display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; margin:0;"><h2 style="color:#333;">Generating your Cocktail Maestro PDF...</h2></body></html>');
    }

    // Hide UI elements temporarily
    if (closeBtn) closeBtn.style.display = 'none';
    if (printBtn) printBtn.style.display = 'none';
    if (servings) servings.style.display = 'none';

    // Apply white mode for printing
    content.classList.add('printing-white-mode');

    try {
        const canvas = await html2canvas(content, {
            backgroundColor: '#ffffff',
            scale: 2, // High resolution
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL('image/png');

        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Cocktail Recipe - ${document.querySelector('.immersive-title').innerText}</title>
                        <style>
                            body { margin: 0; display: flex; justify-content: center; background: #ffffff; }
                            img { max-width: 100%; height: auto; }
                            @page { margin: 0; size: auto; }
                        </style>
                    </head>
                    <body>
                        <img src="${imgData}" onload="window.print(); window.close();">
                    </body>
                </html>
            `);
            printWindow.document.close();
        } else {
            // If popup was somehow still blocked, fallback to standard print
            window.print();
        }
    } catch (err) {
        console.error('Print failed:', err);
        if (printWindow) printWindow.close();
        window.print(); // Fallback to standard print
    } finally {
        // Restore UI elements and theme
        content.classList.remove('printing-white-mode');
        if (closeBtn) closeBtn.style.display = 'flex';
        if (printBtn) printBtn.style.display = 'flex';
        if (servings) servings.style.display = 'flex';
    }
};
window.classicCocktails = classicCocktails;
window.mocktailRecipes = mocktailRecipes;

/**
 * Filter by category from the Home page — navigates to Vault with a filter term
 */
window.filterByCategory = (categoryKey) => {
    // Map our home category keys to search terms the Vault understands
    const termMap = {
        'classic': '',          // Show all classics (empty filter = all)
        'sweet': 'sweet',
        'sour': 'sour',
        'strong': 'strong',
        'mocktail': 'mocktail',
        'creamy': 'creamy',
    };

    const term = termMap[categoryKey] ?? categoryKey;

    navigateTo('vault');

    // Give the vault page a tick to render, then apply the filter
    setTimeout(() => {
        const searchInput = document.getElementById('vault-search');
        if (searchInput) {
            searchInput.value = term;
        }
        // renderVault is imported and called via navigateTo already — re-render with filter
        if (window.renderVaultFiltered) {
            window.renderVaultFiltered(term);
        } else {
            // Fallback: trigger input event so existing listeners pick it up
            const event = new Event('input', { bubbles: true });
            if (searchInput) searchInput.dispatchEvent(event);
        }
    }, 50);
};

/**
 * Toggle expanding/collapsing of intro cards
 */
window.toggleIntro = (btn) => {
    const section = btn.closest('section');
    const introClass = Array.from(section.classList).find(c => c.endsWith('-intro'));
    const storageKey = `is_collapsed_${introClass}`;

    const isCollapsed = section.classList.toggle('is-collapsed');
    localStorage.setItem(storageKey, isCollapsed ? 'true' : 'false');
};

/**
 * Apply saved collapse states to all intro sections
 */
window.applyIntroStates = () => {
    const introSections = document.querySelectorAll('[class$="-intro"]');
    introSections.forEach(section => {
        const introClass = Array.from(section.classList).find(c => c.endsWith('-intro'));
        const storageKey = `is_collapsed_${introClass}`;
        const savedState = localStorage.getItem(storageKey);

        if (savedState === 'true') {
            section.classList.add('is-collapsed');
        } else {
            section.classList.remove('is-collapsed');
        }
    });
};

// Navigation bridge to specific kitchen items
window.goToKitchenItem = (event, kitchenId) => {
    if (event) event.stopPropagation();
    navigateTo('kitchen');
    // Small delay to ensure the page is active before scrolling/opening
    setTimeout(() => {
        openKitchenItem(kitchenId);
    }, 100);
};

// Initialisatie
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(); // Apply saved language
    renderFridgeCategories();
    initKitchenCarousels();
    initSettings(); // Authenticate and sync cloud data
    window.applyIntroStates(); // Sync collapsible intros

    // Pre-calculate the destination for a smooth transition
    const getDestPromise = getInitialDestination();

    // Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    const originalContent = splashScreen?.querySelector('.splash-content')?.cloneNode(true);

    window.triggerSplash = () => {
        if (!splashScreen || !originalContent) return;

        // 1. Reset state: remove hide class AND force instant opacity
        splashScreen.classList.remove('hide');
        splashScreen.style.opacity = '1';
        splashScreen.style.visibility = 'visible';

        // 2. Restart animations: Remove current, force reflow, then add original clone
        const currentContent = splashScreen.querySelector('.splash-content');
        if (currentContent) {
            currentContent.remove();
        }

        // Force Reflow to ensure browser registers the removal
        void splashScreen.offsetWidth;

        // Add fresh clone from the original state
        const newContent = originalContent.cloneNode(true);
        splashScreen.appendChild(newContent);

        // 3. Lifecycle: Coordinate exit based on destination
        setTimeout(async () => {
            const dest = await getDestPromise;

            if (dest === 'auth') {
                // Trigger Logo Up / Text Down animation
                splashScreen.classList.add('exit-to-auth');

                // Navigate to auth (CSS will handle the rest)
                setTimeout(() => {
                    navigateTo('auth');
                    splashScreen.classList.add('hide');
                    splashScreen.classList.remove('exit-to-auth');
                }, 800); // Duration of the "Logo Up" movement
            } else {
                // Standard fade out for Home
                splashScreen.classList.add('hide');
                navigateTo('home');
            }

            // Cleanup inline styles and remove from layout after fade
            setTimeout(() => {
                splashScreen.style.opacity = '';
                splashScreen.style.visibility = '';
                splashScreen.style.display = 'none'; // Fully remove from layout
            }, 1000);
        }, 3200);
    };

    // Initial trigger
    window.triggerSplash();


    // Zorg dat we ingrediënt suggesties updaten als dat nodig is
    window.updateIngredientSuggestions = () => {
        const datalist = document.getElementById('ingredients-suggestions');
        if (!datalist) return;
        const checkboxes = document.querySelectorAll('.fridge-item-premium input[type="checkbox"]');
        let ingredients = Array.from(checkboxes).map(cb => cb.value);
        ingredients = [...new Set(ingredients)].sort();
        datalist.innerHTML = ingredients.map(ing => `<option value="${ing}">`).join('');
    };

    window.updateIngredientSuggestions();
});
