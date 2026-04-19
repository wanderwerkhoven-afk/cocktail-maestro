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
        hideIngredientIcons = false,
        showEditBtn = false,      // NEW: for Recipe Book
        showDeleteBtn = false,    // NEW: for Recipe Book
        onEdit = null,            // NEW: for Recipe Book
        onDelete = null           // NEW: for Recipe Book
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
        const kitchenLink = ing.kitchenId ? `
            <span class="kitchen-link-tag" onclick="window.goToKitchenItem(event, '${ing.kitchenId}')" title="View in Kitchen">
                <i class="fa-solid fa-fire-burner"></i>
            </span>` : '';

        return `
            <li class="${itemClass}">
                <div class="ing-row-content">
                    <span>
                        ${!hideIngredientIcons ? `<i class="fa-solid ${iconClass}"></i>` : ''}
                        ${amountPart(ing)} ${ingName}
                    </span>
                    ${kitchenLink}
                    ${isMissing ? `
                    <button class="add-to-cart-btn" onclick="window.addToShoppingList(event, '${ingName}')">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>` : ''}
                </div>
            </li>`;
    }).join('');

    // Internal helper for amount display
    function amountPart(ing) {
        if (typeof ing !== 'object') return '';

        const hasAmount = ing.amount && !isNaN(ing.amount);
        const hasUnit = ing.unit && ing.unit.trim() !== "";

        if (hasAmount && hasUnit) {
            return `<b class="amount">${ing.amount}</b> <b class="unit">${ing.unit}</b>`;
        } else if (hasAmount) {
            return `<b class="amount">${ing.amount}</b>`;
        } else if (hasUnit) {
            return `<b class="unit">${ing.unit}</b>`;
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
                ${!isPerfect ? `<span class="missing-tag missing-${missingCount}">Missing ${missingCount}</span>` : ''}
                <img src="${cocktail.image}" 
                     alt="${cocktail.name}" 
                     loading="lazy" 
                     onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded')">
                ${isCustom && !showEditBtn ? `<span class="custom-badge">MINE</span>` : ''}
                
                <div class="card-actions">
                    ${showEditBtn ? `
                    <button class="edit-recipe-btn" onclick="${onEdit || `window.editRecipe('${cocktail.id}')`}">
                        <i class="fa-solid fa-pen"></i>
                    </button>` : ''}
                    ${showDeleteBtn ? `
                    <button class="delete-recipe-btn" onclick="${onDelete || `window.deleteRecipe('${cocktail.id}')`}">
                        <i class="fa-solid fa-trash"></i>
                    </button>` : ''}
                    ${!showEditBtn && !forceOpen ? `
                    <button class="download-btn" onclick="window.downloadRecipe('${cocktail.id}')">
                        <i class="fa-solid fa-download"></i>
                    </button>` : ''}
                </div>
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
                        <div class="method-text">
                            ${Array.isArray(cocktail.methodDesc) 
                                ? cocktail.methodDesc.map((step, i) => `
                                    <div class="method-step">
                                        <span class="step-num">Step ${i+1}:</span> ${step}
                                    </div>`).join('')
                                : cocktail.methodDesc || "No description provided."
                            }
                        </div>
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


export function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'already-exists' : ''}`;
    
    const icon = type === 'error' ? 'fa-circle-info' : 'fa-circle-check';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Remove from DOM after animation completes
    setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) {
            container.remove();
        }
    }, 3200);
}

export function createPresentationHTML(cocktail) {
    const categoriesHTML = Array.isArray(cocktail.category)
        ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
        : `<span class="category-tag">${cocktail.category}</span>`;

    const ingredientsHTML = cocktail.ingredients.map(ing => {
        const name = typeof ing === 'object' ? ing.name : ing;
        return `<li><i class="fa-solid fa-circle-check"></i> ${name}</li>`;
    }).join('');

    return `
        <div class="cocktail-presentation">
            <div class="presentation-header">
                <img src="${cocktail.image}" alt="${cocktail.name}" class="presentation-img">
            </div>
            <div class="presentation-body">
                <h2 class="presentation-title">${cocktail.name}</h2>
                <div class="category-container">
                    ${categoriesHTML}
                </div>
                <p class="presentation-desc">${cocktail.description || "A masterwork of mixology."}</p>
                
                <div class="presentation-ingredients">
                    <h3>Ingredients</h3>
                    <ul class="presentation-list">
                        ${ingredientsHTML}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

/**
 * Updates the active dot for a specific carousel based on horizontal scroll.
 * Supports both generic 'cocktail-card' and 'kitchen-card' elements.
 */
export function updateCarouselDots(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const dotsContainer = document.getElementById(`dots-${carouselId}`);
    if (!dotsContainer) return;

    // Select all types of carousel cards
    const cards = carousel.querySelectorAll('.kitchen-card, .cocktail-card, .recommendation-card');
    const dots = dotsContainer.querySelectorAll('.dot');

    if (cards.length === 0 || dots.length === 0) return;

    // Calculate which card is currently taking up most of the view
    const scrollPos = carousel.scrollLeft;
    const centerPoint = scrollPos + (carousel.clientWidth / 2);

    let activeIndex = 0;

    // Find the card closest to the center point
    for (let i = 0; i < cards.length; i++) {
        const cardLeft = cards[i].offsetLeft - carousel.offsetLeft;
        const cardRight = cardLeft + cards[i].offsetWidth;

        if (centerPoint >= cardLeft && centerPoint <= cardRight) {
            activeIndex = i;
            break;
        }
    }

    // Update dots DOM
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
