import { shoppingList, myIngredients } from '../core/state.js';
import { syncData } from '../core/auth.js';
import { showToast } from '../core/ui-utils.js';
import { classicCocktails } from './database.js';
import { t } from '../core/i18n.js';

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

    // 1. Capture current scroll position
    const oldCarousel = document.getElementById('shopping-recommendations-carousel');
    const savedScrollPos = oldCarousel ? oldCarousel.scrollLeft : 0;

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

    // 2. Update Content
    recommendationContainer.innerHTML = `
        <div class="recommendation-header">
            <div class="recommendation-icon">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h2 data-i18n="shopping-smart-title">${t('shopping-smart-title')}</h2>
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
                                <span class="unlock-count">${rec.isFallback ? t('shopping-used-in', [rec.count]) : t('shopping-unlocks', [rec.count])}</span>
                            </div>
                            <button class="add-recommendation-btn" onclick="addToShoppingList(event, '${rec.name}')">
                                <i class="fa-solid fa-cart-plus"></i> ${t('shopping-add-btn')}
                            </button>
                        </div>

                        <div class="unlocked-carousel-container">
                            <h4>${rec.isFallback ? t('shopping-popular-label') : t('shopping-unlocks-label')}</h4>
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

    // 3. Robust Restoration
    const newCarousel = document.getElementById('shopping-recommendations-carousel');
    if (newCarousel && savedScrollPos > 0) {
        // Temporarily disable things that might fight our manual scroll setting
        const originalBehavior = newCarousel.style.scrollBehavior;
        const originalSnap = newCarousel.style.scrollSnapType;
        
        newCarousel.style.scrollBehavior = 'auto';
        newCarousel.style.scrollSnapType = 'none';

        // Set immediately
        newCarousel.scrollLeft = savedScrollPos;

        // Use rAF to ensure it holds after layout/paint
        requestAnimationFrame(() => {
            newCarousel.scrollLeft = savedScrollPos;
            
            // Second frame for extra insurance on some mobile browsers
            requestAnimationFrame(() => {
                newCarousel.scrollLeft = savedScrollPos;
                // Restore original styles
                newCarousel.style.scrollBehavior = originalBehavior;
                newCarousel.style.scrollSnapType = originalSnap;
                
                // Update dots once we are sure about position
                if (window.updateCarouselDots) window.updateCarouselDots('shopping-recommendations-carousel');
            });
        });
    } else {
        // Fallback for first render or scrolled to start
        setTimeout(() => {
            if (window.updateCarouselDots) window.updateCarouselDots('shopping-recommendations-carousel');
        }, 50);
    }
}

function calculateSmartRecommendations() {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const allCocktails = [...classicCocktails, ...myRecipes];

    let missingMap = {};

    // First Pass: Find ingredients that directly unlock a cocktail
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
                    cocktails: [],
                    isFallback: false
                };
            }
            missingMap[ingKey].count++;
            missingMap[ingKey].cocktails.push({
                name: cocktail.name,
                image: cocktail.image
            });
        }
    });

    let recommendations = Object.values(missingMap).sort((a, b) => b.count - a.count);

    if (recommendations.length > 0) {
        return recommendations.slice(0, 5);
    }

    // Fallback: Recommend the most popular missing ingredients overall
    missingMap = {};

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

        missing.forEach(missingIng => {
            const ingName = (typeof missingIng === 'object' ? missingIng.name : missingIng).trim();
            const ingKey = ingName.toLowerCase();
            const ingCategory = (typeof missingIng === 'object' ? missingIng.fridgeCategory : 'fresh');

            if (!missingMap[ingKey]) {
                missingMap[ingKey] = {
                    name: ingName,
                    category: ingCategory,
                    count: 0,
                    cocktails: [],
                    isFallback: true
                };
            }
            missingMap[ingKey].count++;
            if (missingMap[ingKey].cocktails.length < 5) {
                missingMap[ingKey].cocktails.push({
                    name: cocktail.name,
                    image: cocktail.image
                });
            }
        });
    });

    recommendations = Object.values(missingMap).sort((a, b) => b.count - a.count);
    return recommendations.slice(0, 5);
}

export function toggleItemCheck(index) {
    shoppingList[index].checked = !shoppingList[index].checked;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    syncData('shoppingList', shoppingList);
    renderShoppingList();
}

export function removeFromShoppingList(index) {
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    syncData('shoppingList', shoppingList);
    renderShoppingList();
}

export function clearShoppingList() {
    if (shoppingList.length === 0) return;
    if (confirm("Wil je de hele lijst leegmaken?")) {
        shoppingList.length = 0;
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        syncData('shoppingList', shoppingList);
        renderShoppingList();
    }
}

export function addToShoppingList(e, ingredient) {
    if (e) e.stopPropagation();

    const exists = shoppingList.some(item => item.name === ingredient);

    if (!exists) {
        shoppingList.push({ name: ingredient, checked: false });
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        syncData('shoppingList', shoppingList);
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

    const date = new Date().toLocaleDateString('nl-NL', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const unchecked = shoppingList.filter(item => !item.checked);
    const checked = shoppingList.filter(item => item.checked);

    let text = `🍸 COCKTAIL MAESTRO 🍸\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Mijn Boodschappenlijst\n`;
    text += `${date}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (unchecked.length > 0) {
        text += `🛒 NOG TE KOPEN (${unchecked.length}):\n`;
        unchecked.forEach(item => {
            text += `  ☐ ${item.name}\n`;
        });
        text += `\n`;
    }

    if (checked.length > 0) {
        text += `✅ REEDS GEVONDEN:\n`;
        checked.forEach(item => {
            text += `  ☑ ${item.name}\n`;
        });
        text += `\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Cheers! 🥂 Generated by Cocktail Maestro`;

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
