import { navigateTo } from './core/navigation.js';
import { toggleItemCheck, removeFromShoppingList, clearShoppingList, addToShoppingList, downloadShoppingList } from './modules/shopping.js';
import { toggleFavorite } from './modules/favorites.js';
import { renderVault, downloadRecipe, updateServings } from './pages/vault.js';
import { openRecipeForm, closeRecipeForm, addIngredientRow, removeIngredientRow, previewImage, saveNewRecipe, updateRecipe, editRecipe, deleteRecipe, checkRowTyping, renderMyRecipes } from './pages/recipes.js';
import { toggleCategory, filterCategoryList, filterAllIngredients, updateFridge, syncCheckboxes, checkMatches, calculateBarProgress, renderFridgeCategories } from './modules/fridge.js';
import { shakeForCocktail, closeShakeModal } from './modules/randomizer.js';
import { handleCardClick, showToast, createCocktailCardHTML, updateCarouselDots } from './core/ui-utils.js';
import { filterKitchen, initKitchenCarousels, toggleKitchenCard, openKitchenItem } from './pages/kitchen.js';

// Expose functions to global scope for HTML onclick handlers
window.navigateTo = navigateTo;
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
window.previewImage = previewImage;
window.saveNewRecipe = saveNewRecipe;
window.updateRecipe = updateRecipe;
window.editRecipe = editRecipe;
window.deleteRecipe = deleteRecipe;
window.checkRowTyping = checkRowTyping;
window.renderMyRecipes = renderMyRecipes;
window.toggleCategory = toggleCategory;
window.filterCategoryList = filterCategoryList;
window.filterAllIngredients = filterAllIngredients;
window.updateFridge = updateFridge;
window.syncCheckboxes = syncCheckboxes;
window.checkMatches = checkMatches;
window.calculateBarProgress = calculateBarProgress;
window.shakeForCocktail = shakeForCocktail;
window.closeShakeModal = closeShakeModal;
window.handleCardClick = handleCardClick;
window.showToast = showToast;
window.createCocktailCardHTML = createCocktailCardHTML;
window.filterKitchen = filterKitchen;
window.updateCarouselDots = updateCarouselDots;
window.toggleKitchenCard = toggleKitchenCard;
window.openKitchenItem = openKitchenItem;

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
    renderFridgeCategories();
    initKitchenCarousels();
    navigateTo('home');

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

        // 3. Lifecycle: Fade out after duration (using user's 3.2s tweak)
        setTimeout(() => {
            splashScreen.classList.add('hide');
            // Clean up inline styles to let CSS transition take over
            splashScreen.style.opacity = '';
            splashScreen.style.visibility = '';
        }, 3200);
    };

    // Initial trigger
    window.triggerSplash();

    // Re-trigger when app returns to foreground
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            window.triggerSplash();
        }
    });

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
