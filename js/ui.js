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
window.printRecipe = async () => {
    const content = document.getElementById('immersive-recipe-content');
    const recipeName = document.querySelector('.immersive-title')?.innerText || 'Cocktail-Recipe';

    // 1. Show Generating State
    const printBtn = document.querySelector('.immersive-print-btn');
    if (printBtn) {
        printBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        printBtn.disabled = true;
    }

    // Prepare content for capture
    content.classList.add('printing-white-mode');
    // Temporarily hide elements that shouldn't be in the scan
    const closeBtn = document.querySelector('.immersive-close-btn');
    const servings = document.querySelector('.immersive-servings-box');
    if (closeBtn) closeBtn.style.opacity = '0';
    if (servings) servings.style.opacity = '0';

    try {
        // 2. Capture high-res image
        const canvas = await html2canvas(content, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            logging: false,
            windowWidth: 1200
        });

        const imgData = canvas.toDataURL('image/png');

        // 3. Create and Show Preview Overlay (to avoid being "stuck")
        const previewOverlay = document.createElement('div');
        previewOverlay.className = 'print-preview-overlay';
        previewOverlay.innerHTML = `
            <div class="preview-header">
                <button class="preview-close-btn" id="close-preview"><i class="fa-solid fa-arrow-left"></i> Terug</button>
                <button class="preview-share-btn" id="share-preview"><i class="fa-solid fa-share-nodes"></i> Delen / Opslaan</button>
            </div>
            <div class="preview-body">
                <p class="preview-hint">Druk op "Delen" om te printen of op te slaan als PDF</p>
                <img src="${imgData}" alt="Recipe Preview">
            </div>
        `;
        document.body.appendChild(previewOverlay);

        // Handle buttons
        document.getElementById('close-preview').onclick = () => {
            document.body.removeChild(previewOverlay);
        };

        document.getElementById('share-preview').onclick = async () => {
            const response = await fetch(imgData);
            const blob = await response.blob();
            const file = new File([blob], `${recipeName.replace(/\s+/g, '-').toLowerCase()}.png`, { type: 'image/png' });

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: `Cocktail Recipe: ${recipeName}`,
                    text: `Check out this ${recipeName} recipe from Cocktail Maestro!`
                });
            } else {
                // Fallback for desktop or non-share browsers
                const link = document.createElement('a');
                link.download = `${recipeName.replace(/\s+/g, '-').toLowerCase()}.png`;
                link.href = imgData;
                link.click();
            }
        };

    } catch (err) {
        console.error('PDF Generation failed:', err);
        alert('Could not generate preview. Please try again.');
    } finally {
        // 4. Restore UI
        content.classList.remove('printing-white-mode');
        if (closeBtn) closeBtn.style.opacity = '1';
        if (servings) servings.style.opacity = '1';
        if (printBtn) {
            printBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i>';
            printBtn.disabled = false;
        }
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
        'classic':  '',          // Show all classics (empty filter = all)
        'sweet':    'sweet',
        'sour':     'sour',
        'strong':   'strong',
        'mocktail': 'mocktail',
        'creamy':   'creamy',
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
