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

export function refreshState() {
    myIngredients = JSON.parse(localStorage.getItem('myIngredients')) || {};
    // Migration: If it was an array before, convert to object
    if (Array.isArray(myIngredients)) {
        const obj = {};
        myIngredients.forEach(ing => obj[ing] = true);
        myIngredients = obj;
    }
    myFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
}
