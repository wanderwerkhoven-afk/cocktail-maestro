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
    const splashContent = splashScreen?.querySelector('.splash-content');

    window.triggerSplash = () => {
        if (!splashScreen || !splashContent) return;

        // 1. Reset: Show splash and remove old content to kill animations
        splashScreen.classList.remove('hide');
        const newContent = splashContent.cloneNode(true);
        splashContent.parentNode.replaceChild(newContent, splashContent);

        // 2. Lifecycle: Fade out after short duration
        // We use the 3.2s duration from the user's recent manual tweak
        setTimeout(() => {
            splashScreen.classList.add('hide');
        }, 3200);
    };

    // Initial trigger
    window.triggerSplash();

    // Re-trigger when app returns to foreground (visibility change)
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
