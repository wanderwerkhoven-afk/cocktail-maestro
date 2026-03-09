import { shoppingList, myIngredients } from '../core/state.js';
import { showToast } from '../core/ui-utils.js';
import { classicCocktails } from './database.js';

export function renderShoppingList() {
    const listContainer = document.getElementById('shopping-list-items');
    const emptyState = document.getElementById('shopping-list-empty');
    const titleContainer = document.getElementById('shopping-list-title-container');
    if (!listContainer) return;

    listContainer.innerHTML = "";

    // Always try to render smart recommendation first
    renderSmartRecommendation();

    if (shoppingList.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        if (titleContainer) titleContainer.style.display = "none";
    } else {
        if (emptyState) emptyState.style.display = "none";
        if (titleContainer) titleContainer.style.display = "flex";

        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = `shopping-item ${item.checked ? 'checked' : ''}`;

            li.innerHTML = `
                <div class="shopping-item-info" onclick="window.toggleItemCheck(${index})">
                    <i class="${item.checked ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
                    <span class="shopping-item-name">${item.name}</span>
                </div>
                <button class="remove-item-btn" onclick="window.removeFromShoppingList(${index})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;
            listContainer.appendChild(li);
        });
    }
}

export function renderSmartRecommendation() {
    const recommendationContainer = document.getElementById('smart-recommendation');
    if (!recommendationContainer) return;

    const recommendations = calculateSmartRecommendations();

    if (!recommendations || recommendations.length === 0) {
        recommendationContainer.innerHTML = "";
        return;
    }

    const categoryIcons = {
        'spirit': 'assets/Fridge/spirits.webp',
        'liqueur': 'assets/Fridge/liqueurs.webp',
        'bitters': 'assets/Fridge/bitters.webp',
        'syrup': 'assets/Fridge/syrups.webp',
        'juice': 'assets/Fridge/juices.webp',
        'fresh': 'assets/Fridge/fresh.webp'
    };

    recommendationContainer.innerHTML = `
        <div class="recommendation-header">
            <div class="recommendation-icon">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h2>Smart Buy Recommendations</h2>
        </div>
        <div class="recommendation-carousel" id="shopping-recommendations-carousel" onscroll="window.updateCarouselDots('shopping-recommendations-carousel')">
            ${recommendations.map((rec, index) => {
                const iconPath = categoryIcons[rec.category] || 'assets/Fridge/spirits.webp';
                return `
                    <div class="recommendation-card">
                        <div class="rank-badge">#${index + 1}</div>
                        <div class="bottle-display">
                            <div class="bottle-image-wrapper">
                                <img src="${iconPath}" alt="${rec.name}">
                            </div>
                            <div class="bottle-info">
                                <span class="bottle-name">${rec.name}</span>
                                <span class="unlock-count">Unlocks ${rec.count} new cocktails!</span>
                            </div>
                            <button class="add-recommendation-btn" onclick="addToShoppingList(event, '${rec.name}')">
                                <i class="fa-solid fa-cart-plus"></i> Add
                            </button>
                        </div>

                        <div class="unlocked-carousel-container">
                            <h4>Unlocks:</h4>
                            <div class="mini-cocktail-list">
                                ${rec.cocktails.map(c => `
                                    <div class="mini-cocktail-card">
                                        <div class="mini-cocktail-img">
                                            <img src="${c.image}" alt="${c.name}">
                                        </div>
                                        <span class="mini-cocktail-name">${c.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="carousel-indicators" id="dots-shopping-recommendations-carousel">
            ${recommendations.map((_, index) => `<div class="dot${index === 0 ? ' active' : ''}"></div>`).join('')}
        </div>
    `;

    // Ensure initial dot styling is correct on render
    setTimeout(() => {
        if (window.updateCarouselDots) window.updateCarouselDots('shopping-recommendations-carousel');
    }, 50);
}

function calculateSmartRecommendations() {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const allCocktails = [...classicCocktails, ...myRecipes];

    const missingMap = {};

    allCocktails.forEach(cocktail => {
        const missing = cocktail.ingredients.filter(ing => {
            const nameToSearch = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
            
            const isFound = Object.keys(myIngredients).some(mine => {
                if (!myIngredients[mine]) return false;
                const cleanMine = mine.toLowerCase().trim();
                return nameToSearch.includes(cleanMine) || cleanMine.includes(nameToSearch);
            });

            return !isFound;
        });

        if (missing.length === 1) {
            const missingIng = missing[0];
            const ingName = (typeof missingIng === 'object' ? missingIng.name : missingIng).trim();
            const ingKey = ingName.toLowerCase();
            const ingCategory = (typeof missingIng === 'object' ? missingIng.fridgeCategory : 'fresh');

            if (!missingMap[ingKey]) {
                missingMap[ingKey] = {
                    name: ingName,
                    category: ingCategory,
                    count: 0,
                    cocktails: []
                };
            }
            missingMap[ingKey].count++;
            missingMap[ingKey].cocktails.push({
                name: cocktail.name,
                image: cocktail.image
            });
        }
    });

    const recommendations = Object.values(missingMap).sort((a, b) => b.count - a.count);

    return recommendations.slice(0, 5);
}

export function toggleItemCheck(index) {
    shoppingList[index].checked = !shoppingList[index].checked;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    renderShoppingList();
}

export function removeFromShoppingList(index) {
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    renderShoppingList();
}

export function clearShoppingList() {
    if (shoppingList.length === 0) return;
    if (confirm("Wil je de hele lijst leegmaken?")) {
        shoppingList.length = 0;
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        renderShoppingList();
    }
}

export function addToShoppingList(e, ingredient) {
    if (e) e.stopPropagation();

    const exists = shoppingList.some(item => item.name === ingredient);

    if (!exists) {
        shoppingList.push({ name: ingredient, checked: false });
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        renderShoppingList(); // Add this line to update the UI immediately
        showToast(`${ingredient} added to list!`);
    } else {
        showToast(`${ingredient} is already on the list.`, 'error');
    }
}

export function downloadShoppingList() {
    if (shoppingList.length === 0) {
        showToast("Je shoppinglijst is leeg!", "error");
        return;
    }

    const date = new Date().toLocaleDateString();
    let text = `🍸 COCKTAIL MAESTRO - SHOPPING LIST (${date})\n`;
    text += `==========================================\n\n`;

    shoppingList.forEach((item, i) => {
        const check = item.checked ? '[x]' : '[ ]';
        text += `${check} ${item.name}\n`;
    });

    text += `\nGegenereerd door Cocktail Maestro`;

    // Try Web Share API first
    if (navigator && navigator.share) {
        navigator.share({
            title: 'Mijn Cocktail Boodschappenlijst',
            text: text
        }).catch(() => {
            // Fallback to download if share fails or cancelled
            downloadAsFile(text);
        });
    } else {
        downloadAsFile(text);
    }
}

function downloadAsFile(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cocktail-boodschappenlijst-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Lijst gedownload als .txt");
}
