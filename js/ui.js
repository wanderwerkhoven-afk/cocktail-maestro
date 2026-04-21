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
window.printRecipe = async () => {
    const content = document.getElementById('immersive-recipe-content');
    const closeBtn = document.querySelector('.immersive-close-btn');
    const printBtn = document.querySelector('.immersive-print-btn');
    const servings = document.querySelector('.immersive-servings-box');
    const title = document.querySelector('.immersive-title')?.innerText || 'Cocktail Recipe';

    if (!content) {
        console.error('Print failed: immersive recipe content not found');
        return;
    }

    const isIOS = window.isIOS
        ? window.isIOS()
        : /iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

    // Open synchronously from user gesture to avoid popup blocking
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
        if (typeof showToast === 'function') {
            showToast('Popup blocked. Please allow popups to print this recipe.');
        }
        return;
    }

    // Loading screen immediately, so Safari keeps the tab alive
    printWindow.document.write(`
        <html lang="en">
            <head>
                <title>Preparing PDF...</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    html, body {
                        margin: 0;
                        padding: 0;
                        background: #ffffff;
                        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                    }
                    .loading {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #333;
                        font-size: 18px;
                        padding: 24px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="loading">Generating your Cocktail Maestro PDF...</div>
            </body>
        </html>
    `);
    printWindow.document.close();

    // Hide UI elements temporarily
    if (closeBtn) closeBtn.style.display = 'none';
    if (printBtn) printBtn.style.display = 'none';
    if (servings) servings.style.display = 'none';

    content.classList.add('printing-white-mode');

    try {
        if (document.fonts?.ready) {
            await document.fonts.ready;
        }

        const canvas = await html2canvas(content, {
            backgroundColor: '#ffffff',
            scale: window.devicePixelRatio > 1 ? 2 : 1.5,
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL('image/png');

        printWindow.document.open();
        printWindow.document.write(`
            <html lang="en">
                <head>
                    <title>${title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        @page {
                            size: auto;
                            margin: 0;
                        }

                        html, body {
                            background: #ffffff;
                            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                            width: 100%;
                            height: 100vh; /* Force single page height */
                            overflow: hidden;
                        }

                        body {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }

                        .print-wrap {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: #fff;
                            padding: ${isIOS ? '0' : '15mm'};
                            font-size: 0; /* Remove any ghost whitespace */
                        }

                        img {
                            max-width: ${isIOS ? '100%' : '850px'};
                            max-height: ${isIOS ? '100%' : '94vh'}; /* Crucial: stay slightly below page height */
                            width: auto;
                            height: auto;
                            object-fit: contain;
                            display: block;
                        }




                        .ios-help {
                            padding: 16px 20px 32px;
                            font-size: 14px;
                            line-height: 1.5;
                            color: #333;
                            text-align: center;
                        }

                        .ios-help button {
                            margin-top: 12px;
                            padding: 12px 18px;
                            border-radius: 12px;
                            border: none;
                            background: #111;
                            color: #fff;
                            font-size: 15px;
                            cursor: pointer;
                        }

                        @media print {
                            .ios-help {
                                display: none !important;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-wrap">
                        <img id="recipe-image" src="${imgData}" alt="Cocktail recipe" />
                    </div>

                    ${
                        isIOS
                            ? `
                            <div class="ios-help">
                                If the print dialog does not open automatically, tap the button below.<br>
                                On iPhone/iPad you can also use Share → Print to save as PDF.
                                <br>
                                <button onclick="window.print()">Open Print</button>
                            </div>
                            `
                            : ''
                    }

                    <script>
                        const img = document.getElementById('recipe-image');

                        function triggerPrint() {
                            setTimeout(() => {
                                try {
                                    window.focus();
                                    window.print();
                                } catch (e) {
                                    console.error('Print trigger failed:', e);
                                }
                            }, ${isIOS ? 900 : 300});
                        }

                        if (img.complete) {
                            triggerPrint();
                        } else {
                            img.onload = triggerPrint;
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();

        // Only auto-close on non-iOS
        if (!isIOS) {
            setTimeout(() => {
                try {
                    printWindow.close();
                } catch (e) {
                    console.warn('Could not close print window:', e);
                }
            }, 1500);
        }
    } catch (err) {
        console.error('Print failed:', err);

        try {
            printWindow.document.open();
            printWindow.document.write(`
                <html lang="en">
                    <head>
                        <title>Print failed</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                                padding: 24px;
                                color: #222;
                                background: #fff;
                            }
                            button {
                                margin-top: 16px;
                                padding: 12px 18px;
                                border-radius: 12px;
                                border: none;
                                background: #111;
                                color: #fff;
                                font-size: 15px;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>Could not generate the printable recipe</h2>
                        <p>Please try again. If you are on iPhone or iPad, use Share → Print to save as PDF.</p>
                        <button onclick="window.close()">Close</button>
                    </body>
                </html>
            `);
            printWindow.document.close();
        } catch (_) {
            printWindow.close();
        }
    } finally {
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
