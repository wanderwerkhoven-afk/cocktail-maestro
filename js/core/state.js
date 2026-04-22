export let myIngredients = JSON.parse(localStorage.getItem('myIngredients')) || {};
// Migration: If it was an array before, convert to object
if (Array.isArray(myIngredients)) {
    const obj = {};
    myIngredients.forEach(ing => obj[ing] = true);
    myIngredients = obj;
}
export let myFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
export let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
export let currentImageBase64 = "";

export function setCurrentImageBase64(val) {
    currentImageBase64 = val;
}

/**
 * Update the in-memory state objects/arrays so UI modules see changes immediately
 */
export function updateState(newData) {
    if (newData.ingredients) {
        Object.keys(myIngredients).forEach(key => delete myIngredients[key]);
        Object.assign(myIngredients, newData.ingredients);
    }
    if (newData.favorites) {
        myFavorites.length = 0;
        myFavorites.push(...newData.favorites);
    }
    if (newData.shoppingList) {
        shoppingList.length = 0;
        shoppingList.push(...newData.shoppingList);
    }
}
