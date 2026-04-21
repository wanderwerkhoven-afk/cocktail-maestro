import { myFavorites } from './state.js';
import { t } from './i18n.js';

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
                ${!isPerfect ? `<span class="missing-tag missing-${missingCount}">${t('card-missing', [missingCount])}</span>` : ''}
                <img src="${cocktail.image}" 
                     alt="${cocktail.name}" 
                     loading="lazy" 
                     onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded')">
                ${isCustom && !showEditBtn ? `<span class="custom-badge">${t('card-mine')}</span>` : ''}
                
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
                    <button class="enlarge-btn" onclick="window.enlargeRecipe(event, '${cocktail.id}')">
                        <i class="fa-solid fa-expand"></i>
                    </button>
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
                <p class="description">${cocktail.description || t('card-premium-work')}</p>
                
                <div class="collapsible-content">
                    <div class="servings-control">
                        <span>${t('card-servings')}</span>
                        <div class="counter-box">
                            <button class="counter-btn" onclick="window.updateServings(event, '${cocktail.id}', -1)">-</button>
                            <span id="servings-${cocktail.id}">1</span>
                            <button class="counter-btn" onclick="window.updateServings(event, '${cocktail.id}', 1)">+</button>
                        </div>
                    </div>

                    <div class="ingredients-section">
                        <strong>${t('card-ingredients')}</strong> 
                        <ul class="ingredients-list" id="ingredients-${cocktail.id}">
                            ${ingredientsHTML}
                        </ul>
                    </div>

                    <div class="hardware-section">
                        <div class="hardware-column">
                            <strong>${t('card-glassware')}</strong>
                            <p class="hardware-text">${cocktail.glassware || t('card-standard')}</p>
                        </div>
                        <div class="hardware-column">
                            <strong>${t('card-ice')}</strong>
                            <p class="hardware-text">${cocktail.ice || t('card-none')}</p>
                        </div>
                    </div>

                    <div class="method-section">
                        <strong>${t('card-method', [cocktail.method])}</strong>
                        <div class="method-text">
                            ${Array.isArray(cocktail.methodDesc) 
                                ? cocktail.methodDesc.map((step, i) => `
                                    <div class="method-step">
                                        <span class="step-num">${t('card-step', [i + 1])}</span> ${step}
                                    </div>`).join('')
                                : cocktail.methodDesc || t('card-no-desc')
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="immersive-footer">
                <i class="fa-solid fa-martini-glass-citrus"></i>
                <span>This recipe is powered by Cocktail Maestro</span>
            </div>
        </div>
    `;
}

export function handleCardClick(e, cocktailId) {
    if (!e.target.closest('.download-btn') &&
        !e.target.closest('.fav-btn') &&
        !e.target.closest('.counter-btn') &&
        !e.target.closest('.add-to-cart-btn') &&
        !e.target.closest('.enlarge-btn') &&
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
                <p class="presentation-desc">${cocktail.description || t('card-premium-work')}</p>
                
                <div class="presentation-ingredients">
                    <h3>${t('card-ingredients')}</h3>
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
/**
 * Immersive Recipe View Logic
 */
export function enlargeRecipe(e, id) {
    if (e) e.stopPropagation();

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    // We need access to the databases here, but to avoid circular imports or complex lookups,
    // we'll try to find it in the global/imported databases if we can, 
    // or just pass the object from the card if we refactor.
    // For now, we'll use a search approach.
    
    // We'll import these at the top of the file in the next step or assume they are available.
    // Actually, it's better to find the cocktail from the DOM or state.
    
    // For simplicity, let's assume we can find it in classicCocktails, mocktailRecipes or myRecipes.
    // I will add the imports at the top of the file.
    
    const cocktail = [...window.classicCocktails || [], ...window.mocktailRecipes || [], ...myRecipes].find(c => c.id == id);
    if (!cocktail) return;

    const modal = document.getElementById('recipe-immersive-view');
    const content = document.getElementById('immersive-recipe-content');
    if (!modal || !content) return;

    const categoriesHTML = Array.isArray(cocktail.category)
        ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
        : `<span class="category-tag">${cocktail.category}</span>`;

    const ingredientsHTML = cocktail.ingredients.map(ing => {
        const name = typeof ing === 'object' ? ing.name : ing;
        let amountHTML = "";
        if (typeof ing === 'object' && ing.amount) {
            amountHTML = `${ing.amount} <span class="unit">${ing.unit || ''}</span>`;
        }
        return `<li><span class="ing-amt">${amountHTML}</span> <span class="ing-name">${name}</span></li>`;
    }).join('');

    let stepsArray = [];
    if (Array.isArray(cocktail.methodDesc)) {
        stepsArray = cocktail.methodDesc;
    } else if (typeof cocktail.methodDesc === 'string') {
        // Split by double newlines or single newlines and filter empty
        stepsArray = cocktail.methodDesc
            .split(/\n+/)
            .map(s => s.trim())
            .filter(s => s.length > 0)
            // Remove "Step X:" if it's already there to avoid duplicates
            .map(s => s.replace(/^Step \d+:?\s*/i, '').replace(/^Stap \d+:?\s*/i, ''));
    }

    const stepsHTML = stepsArray.length > 0
        ? stepsArray.map((step, i) => `
            <div class="immersive-step">
                <span class="step-label">${t('card-step', [i + 1])}</span>
                <p>${step}</p>
            </div>`).join('')
        : `<p>${t('card-no-desc')}</p>`;

    content.innerHTML = `
        <!-- HERO SECTION (Row 1) -->
            <div class="immersive-hero-grid">
                <!-- Col 1: Info Card -->
                <div class="info-card">
                    <h1 class="immersive-title">${cocktail.name}</h1>
                    <div class="immersive-tags">${categoriesHTML}</div>
                    <p class="immersive-description">${cocktail.description || ''}</p>
                    
                    <div class="immersive-servings-box">
                        <span class="servings-label">${t('card-servings')}</span>
                        <div class="immersive-counter">
                            <button class="imm-counter-btn" onclick="window.updateImmersiveServings(event, '${cocktail.id}', -1)">-</button>
                            <span id="imm-servings-count">1</span>
                            <button class="imm-counter-btn" onclick="window.updateImmersiveServings(event, '${cocktail.id}', 1)">+</button>
                        </div>
                    </div>
                </div>

                <!-- Col 2: Image -->
                <div class="image-area">
                    <img src="${cocktail.image}" alt="${cocktail.name}" class="immersive-img">
                </div>
            </div>

            <!-- DETAILS SECTION (Row 2) -->
            <div class="immersive-details-container">
                <div class="details-split-grid">
                    <!-- Col 1: Ingredients -->
                    <div class="bottom-col ingredients-col">
                        <div class="immersive-section">
                            <h3 class="imm-section-title">INGREDIENTS:</h3>
                            <div class="imm-ingredients-dark-box">
                                <ul class="immersive-ing-list">${ingredientsHTML}</ul>
                            </div>
                        </div>
                        
                        <div class="imm-hardware-box">
                            <div class="hw-item">
                                <h3 class="imm-section-title">GLASSWARE:</h3>
                                <p class="hw-value">${cocktail.glassware || t('card-standard')}</p>
                            </div>
                            <div class="hw-item">
                                <h3 class="imm-section-title">ICE:</h3>
                                <p class="hw-value">${cocktail.ice || t('card-none')}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Col 2: Method -->
                    <div class="bottom-col method-col">
                        <div class="immersive-section">
                            <h3 class="imm-section-title">METHOD: ${cocktail.method ? cocktail.method.toUpperCase() : 'STANDARD'}</h3>
                            <div class="immersive-steps-container">${stepsHTML}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="immersive-footer">
                <img src="assets/logo/logo_CocktailMaestro.svg" alt="Cocktail Maestro Logo" class="footer-logo">
                <span>This recipe is powered by Cocktail Maestro</span>
            </div>
        </div>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    // Device-specific UI adjustments
    const printBtn = document.getElementById('immersive-print-btn');
    const shareBtn = document.getElementById('immersive-share-btn');
    
    if (window.isIOS && window.isIOS()) {
        if (printBtn) printBtn.style.display = 'none';
        if (shareBtn) shareBtn.style.display = 'flex';
    } else {
        if (printBtn) printBtn.style.display = 'flex';
        if (shareBtn) shareBtn.style.display = 'none';
    }
}


export function closeImmersiveRecipe() {
    const modal = document.getElementById('recipe-immersive-view');
    if (modal) {
        modal.classList.remove('show');
    }
    document.body.style.overflow = '';
}

export function updateImmersiveServings(e, id, change) {
    if (e) e.stopPropagation();
    const countEl = document.getElementById('imm-servings-count');
    if (!countEl) return;

    let current = parseInt(countEl.innerText) || 1;
    let next = current + change;
    if (next < 1) next = 1;
    if (next > 20) next = 20;

    countEl.innerText = next;

    // Also update the ingredients list in the immersive view
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const cocktail = [...window.classicCocktails || [], ...window.mocktailRecipes || [], ...myRecipes].find(c => c.id == id);
    if (!cocktail) return;

    const ingList = document.querySelector('.immersive-ing-list');
    if (!ingList) return;

    ingList.innerHTML = cocktail.ingredients.map(ing => {
        const name = typeof ing === 'object' ? ing.name : ing;
        let amountHTML = "";
        if (typeof ing === 'object' && ing.amount) {
            const baseAmount = parseFloat(ing.amount);
            const scaled = (baseAmount * next).toFixed(1).replace(/\.0$/, '');
            amountHTML = `${scaled} <span class="unit">${ing.unit || ''}</span>`;
        }
        return `<li><span class="ing-amt">${amountHTML}</span> <span class="ing-name">${name}</span></li>`;
    }).join('');
}

export function updateSearchClearButton(input) {
    const wrapper = input.closest('.universal-search-wrapper, .category-search-wrapper, .search-bar');
    if (!wrapper) return;
    
    const clearBtn = wrapper.querySelector('.clear-search-btn');
    
    if (input.value.trim() !== '') {
        if (clearBtn) clearBtn.style.display = 'block';
    } else {
        if (clearBtn) clearBtn.style.display = 'none';
    }
}

export function clearSearch(btn) {
    const wrapper = btn.closest('.universal-search-wrapper, .category-search-wrapper, .search-bar');
    if (!wrapper) return;
    
    const input = wrapper.querySelector('input');
    if (!input) return;
    
    input.value = '';
    
    // Trigger the filtering logic based on the input id or class
    if (input.id === 'vaultSearch') {
        window.renderVault('');
    } else if (input.id === 'universal-fridge-search') {
        window.filterAllIngredients('');
    } else if (input.classList.contains('category-search-input')) {
        window.filterCategoryList(input);
    } else if (input.id === 'kitchenSearch') {
        window.filterKitchen('');
    }
    
    updateSearchClearButton(input);
    input.focus();
}
