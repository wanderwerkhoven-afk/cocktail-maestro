import { myFavorites } from './state.js';

export function createCocktailCardHTML(cocktail, options = {}) {
    const isFav = myFavorites.includes(cocktail.id);
    const isCustom = cocktail.id.toString().startsWith('user-');
    const {
        isPerfect = true,
        missingCount = 0,
        missingItems = [],
        forceOpen = false,
        hideFavorite = false,
        isNeutral = false,
        hideIngredientIcons = false
    } = options;

    const isOpen = forceOpen ? 'open' : '';
    const nearMatchClass = isPerfect ? '' : 'near-match';
    const favClass = isFav ? 'is-favorite' : '';

    const categoriesHTML = Array.isArray(cocktail.category)
        ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
        : `<span class="category-tag">${cocktail.category}</span>`;

    const ingredientsHTML = cocktail.ingredients.map(ing => {
        const isObj = typeof ing === 'object' && ing.name;
        const ingName = isObj ? ing.name : ing;
        const lowName = ingName.toLowerCase().trim();

        // Check if missing (if data provided)
        const isMissing = !isNeutral && missingItems.length > 0 && missingItems.some(m => {
            const mName = (typeof m === 'object' ? m.name : m).toLowerCase().trim();
            return mName === lowName;
        });

        const iconClass = isMissing ? 'fa-circle-xmark' : 'fa-circle-check';
        const itemClass = isNeutral ? 'neutral-ing' : (isMissing ? 'missing-ing' : 'available-ing');

        return `
            <li class="${itemClass}">
                <span>
                    ${!hideIngredientIcons ? `<i class="fa-solid ${iconClass}"></i>` : ''}
                    ${amountPart(ing)} ${ingName}
                </span>
                ${isMissing ? `
                <button class="add-to-cart-btn" onclick="window.addToShoppingList(event, '${ingName}')">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>` : ''}
            </li>`;
    }).join('');

    // Internal helper for amount display
    function amountPart(ing) {
        if (typeof ing === 'object' && ing.amount !== undefined) {
            return `<b class="amount">${ing.amount}</b> <b class="unit">${ing.unit}</b>`;
        }
        return '';
    }

    return `
        <div class="cocktail-card ${favClass} ${nearMatchClass} ${isOpen}" 
             ${!forceOpen ? `onclick="window.handleCardClick(event, '${cocktail.id}')"` : ''}>
            <div class="card-thumb-large">
                ${!hideFavorite ? `
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="window.toggleFavorite(event, '${cocktail.id}')">
                    <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                </button>` : ''}
                ${!isPerfect ? `<span class="missing-tag">Missing ${missingCount}</span>` : ''}
                <img src="${cocktail.image}" alt="${cocktail.name}">
                ${isCustom ? `<span class="custom-badge">MINE</span>` : ''}
                ${!forceOpen ? `
                <button class="download-btn" onclick="window.downloadRecipe('${cocktail.id}')">
                    <i class="fa-solid fa-download"></i>
                </button>` : ''}
            </div>
            <div class="card-content">
                <h4>${cocktail.name} ${isFav && !hideFavorite ? '⭐' : ''}</h4>
                <div class="category-container">
                    ${categoriesHTML}
                </div>
                <p class="description">${cocktail.description || "A premium masterwork."}</p>
                
                <div class="collapsible-content">
                    <div class="servings-control">
                        <span>Servings:</span>
                        <div class="counter-box">
                            <button class="counter-btn" onclick="window.updateServings(event, '${cocktail.id}', -1)">-</button>
                            <span id="servings-${cocktail.id}">1</span>
                            <button class="counter-btn" onclick="window.updateServings(event, '${cocktail.id}', 1)">+</button>
                        </div>
                    </div>

                    <div class="ingredients-section">
                        <strong>Ingredients:</strong> 
                        <ul class="ingredients-list" id="ingredients-${cocktail.id}">
                            ${ingredientsHTML}
                        </ul>
                    </div>

                    <div class="hardware-section">
                        <div class="hardware-column">
                            <strong>Glassware:</strong>
                            <p class="hardware-text">${cocktail.glassware || 'Standard'}</p>
                        </div>
                        <div class="hardware-column">
                            <strong>Ice:</strong>
                            <p class="hardware-text">${cocktail.ice || 'None'}</p>
                        </div>
                    </div>

                    <div class="method-section">
                        <strong>Method: ${cocktail.method}</strong>
                        <p class="method-text">${cocktail.methodDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function handleCardClick(e, cocktailId) {
    if (!e.target.closest('.download-btn') &&
        !e.target.closest('.fav-btn') &&
        !e.target.closest('.counter-btn') &&
        !e.target.closest('.add-to-cart-btn') &&
        !e.target.closest('.edit-recipe-btn') &&
        !e.target.closest('.delete-recipe-btn')) {
        const card = e.currentTarget;
        card.classList.toggle('open');
    }
}
