import { navigateTo } from './core/navigation.js';
import { toggleItemCheck, removeFromShoppingList, clearShoppingList, addToShoppingList } from './modules/shopping.js';
import { toggleFavorite } from './modules/favorites.js';
import { renderVault, downloadRecipe, updateServings } from './pages/vault.js';
import { openRecipeForm, closeRecipeForm, addIngredientRow, removeIngredientRow, previewImage, saveNewRecipe, updateRecipe, editRecipe, deleteRecipe, checkRowTyping, renderMyRecipes } from './pages/recipes.js';
import { toggleCategory, filterCategoryList, updateFridge, syncCheckboxes, checkMatches, calculateBarProgress, renderFridgeCategories } from './modules/fridge.js';
import { shakeForCocktail, closeShakeModal } from './modules/randomizer.js';
import { handleCardClick } from './core/ui-utils.js';
import { filterKitchen, updateCarouselDots, initKitchenCarousels, toggleKitchenCard } from './pages/kitchen.js';

// Expose functions to global scope for HTML onclick handlers
window.navigateTo = navigateTo;
window.toggleItemCheck = toggleItemCheck;
window.removeFromShoppingList = removeFromShoppingList;
window.clearShoppingList = clearShoppingList;
window.addToShoppingList = addToShoppingList;
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
window.updateFridge = updateFridge;
window.syncCheckboxes = syncCheckboxes;
window.checkMatches = checkMatches;
window.calculateBarProgress = calculateBarProgress;
window.shakeForCocktail = shakeForCocktail;
window.closeShakeModal = closeShakeModal;
window.handleCardClick = handleCardClick;
window.filterKitchen = filterKitchen;
window.updateCarouselDots = updateCarouselDots;
window.toggleKitchenCard = toggleKitchenCard;

// Initialisatie
document.addEventListener('DOMContentLoaded', () => {
    renderFridgeCategories();
    initKitchenCarousels();
    navigateTo('home');

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
