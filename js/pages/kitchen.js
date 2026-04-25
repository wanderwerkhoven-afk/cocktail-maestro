// Data will be fetched from cloud and exposed on window
const kitchenItems = window.kitchenItems || [];

window.toggleKitchenCard = toggleKitchenCard;
window.openKitchenItem = openKitchenItem;
window.updateKitchenDropdown = updateKitchenDropdown;

/**
 * Initializes the carousel logic for the Kitchen page.
 * Attaches scroll listeners to update the indicator dots dynamically.
 */
export function initKitchenCarousels() {
    renderKitchen(); // Render cards first

    const carousels = document.querySelectorAll('#kitchen-page .carousel');

    carousels.forEach(carousel => {
        const id = carousel.id;
        if (!id) return;

        const dotsContainer = document.getElementById(`dots-${id}`);
        if (!dotsContainer) return;

        const cards = carousel.querySelectorAll('.kitchen-card');

        // Setup initial dots based on number of cards
        dotsContainer.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dotsContainer.appendChild(dot);
        });

        // For very first render, calculate active dot (usually just 0)
        updateCarouselDots(id);
    });
}

/**
 * Renders the kitchen cards dynamically from the database into the carousels.
 */
function renderKitchen() {
    const carousels = {
        'ingredients': document.getElementById('carousel-ingredients'),
        'techniques': document.getElementById('carousel-techniques'),
        'tricks': document.getElementById('carousel-tricks'),
        'bartools': document.getElementById('carousel-bartools'),
        'glassware': document.getElementById('carousel-glassware')
    };

    // Clear existing content (so we can re-render cleanly if needed)
    Object.values(carousels).forEach(c => {
        if (c) c.innerHTML = '';
    });

    const iconMap = {
        'hero-syrup': 'fa-droplet',
        'hero-syrup-rich': 'fa-cubes-stacked',
        'hero-strain': 'fa-filter',
        'hero-fatwash': 'fa-bacon',
        'hero-milk-clarification': 'fa-cow',
        'hero-smog': 'fa-smog',
        'hero-vial': 'fa-vial',
        'hero-bolt': 'fa-bolt',
        'hero-ellipsis': 'fa-ellipsis',
        'hero-palette': 'fa-palette',
        'hero-thermometer': 'fa-temperature-half',
        'hero-shaker': 'fa-bottle-water',
        'hero-jigger': 'fa-fill-drip',
        'hero-spoon': 'fa-utensils',
        'hero-coupe': 'fa-glass-martini-alt',
        'hero-rocks': 'fa-glass-whiskey',
        'hero-highball': 'fa-wine-glass-alt'
    };

    (window.kitchenItems || []).forEach(item => {
        const targetCarousel = carousels[item.category];
        if (!targetCarousel) return;

        const iconClass = iconMap[item.heroClass] || 'fa-star';
        const heroContent = item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded')">`
            : `<i class="fa-solid ${iconClass}"></i>`;

        let dropdownHTML = '';
        let activeIngredients = item.ingredients;
        let activeInstructions = item.instructions;

        if (item.dropdown) {
            // Setup default active items from the first option
            const firstOption = item.dropdown.options[0];
            activeIngredients = firstOption.ingredients;
            activeInstructions = firstOption.instructions;

            const optionsHTML = item.dropdown.options.map((opt, i) => `
                <option value="${i}">${opt.name}</option>
            `).join('');

            // A styled select matching the vault drink type style (but horizontal/standard dropdown)
            dropdownHTML = `
                <div class="kitchen-dropdown-wrapper" onclick="event.stopPropagation()">
                    <label>${item.dropdown.label}</label>
                    <div class="select-container">
                        <select class="kitchen-select" onchange="updateKitchenDropdown(this, '${item.id}')">
                            ${optionsHTML}
                        </select>
                        <i class="fa-solid fa-chevron-down select-chevron"></i>
                    </div>
                </div>
            `;
        }

        let ingredientsHTML = '';
        if (activeIngredients && activeIngredients.length > 0) {
            const listItems = activeIngredients.map(ing => `<li>${ing}</li>`).join('');
            ingredientsHTML = `
                <div class="kitchen-ingredients">
                    <h4><i class="fa-solid fa-basket-shopping"></i> Ingredients</h4>
                    <ul>${listItems}</ul>
                </div>
            `;
        }

        const instructionsTitle = item.instructionsTitle || "Instructions";
        let instructionsHTML = '';
        if (activeInstructions && activeInstructions.length > 0) {
            const steps = activeInstructions.map(step => `
                <li>
                    <div class="timeline-content">${step}</div>
                </li>
            `).join('');

            instructionsHTML = `
                <div class="kitchen-instructions">
                    <h4><i class="fa-solid fa-list-ol"></i> ${instructionsTitle}</h4>
                    <ol class="timeline-list">
                        ${steps}
                    </ol>
                </div>
            `;
        }
        // Support for multiple paragraphs in description
        const descriptionText = Array.isArray(item.description) ? item.description.join(' ') : item.description;
        const descriptionHTML = Array.isArray(item.description) 
            ? item.description.map(p => `<p class="kitchen-desc">${p}</p>`).join('')
            : `<p class="kitchen-desc">${item.description}</p>`;

        const cardHTML = `
            <div class="kitchen-card" id="kitchen-item-${item.id}" onclick="toggleKitchenCard(this)" data-title="${item.title.toLowerCase()}" data-desc="${descriptionText.toLowerCase()}">
                <div class="kitchen-card-hero ${item.heroClass}">
                    ${heroContent}
                </div>
                <div class="kitchen-card-header">
                    <h3>${item.title}</h3>
                    <span class="difficulty-badge ${item.difficulty}">${item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}</span>
                </div>
                ${descriptionHTML}
                <div class="kitchen-card-body">
                    ${dropdownHTML}
                    <div class="kitchen-dynamic-content">
                        ${ingredientsHTML}
                        ${instructionsHTML}
                    </div>
                </div>
            </div>
        `;

        targetCarousel.insertAdjacentHTML('beforeend', cardHTML);
    });
}

/**
 * Programmatically opens and scrolls to a kitchen item.
 * @param {string} itemId The unique ID of the kitchen item (without prefix).
 */
export function openKitchenItem(itemId) {
    // Check if there is a sub-id (e.g., brewed-teas:peach)
    let subId = null;
    if (itemId.includes(':')) {
        [itemId, subId] = itemId.split(':');
    }

    const card = document.getElementById(`kitchen-item-${itemId}`);
    if (!card) return;

    // Expand if not already open
    if (!card.classList.contains('open')) {
        toggleKitchenCard(card);
    } else {
        // Just scroll if already open
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    // If there is a sub-id, try to select it in the dropdown
    if (subId) {
        const select = card.querySelector('.kitchen-select');
        const dbItem = (window.kitchenItems || []).find(i => i.id === itemId);
        
        if (select && dbItem && dbItem.dropdown) {
            // Find the index of the option that matches our subId
            const optionIdx = dbItem.dropdown.options.findIndex(opt => opt.value === subId);
            
            if (optionIdx !== -1) {
                select.value = optionIdx;
                // Trigger the update logic
                updateKitchenDropdown(select, itemId);
            }
        }
    }
}

/**
 * Handles dropdown changes to dynamically update a kitchen card's ingredients and instructions
 */
export function updateKitchenDropdown(selectElement, itemId) {
    const card = selectElement.closest('.kitchen-card');
    if (!card) return;
    
    const dbItem = (window.kitchenItems || []).find(i => i.id === itemId);
    if (!dbItem || !dbItem.dropdown) return;

    const selectedIdx = selectElement.value;
    const option = dbItem.dropdown.options[selectedIdx];
    if (!option) return;

    const dynamicContent = card.querySelector('.kitchen-dynamic-content');
    if (!dynamicContent) return;

    let ingredientsHTML = '';
    if (option.ingredients && option.ingredients.length > 0) {
        const listItems = option.ingredients.map(ing => `<li>${ing}</li>`).join('');
        ingredientsHTML = `
            <div class="kitchen-ingredients">
                <h4><i class="fa-solid fa-basket-shopping"></i> Ingredients</h4>
                <ul>${listItems}</ul>
            </div>
        `;
    }

    const instructionsTitle = dbItem.instructionsTitle || "Instructions";
    let instructionsHTML = '';
    if (option.instructions && option.instructions.length > 0) {
        const steps = option.instructions.map(step => `
            <li>
                <div class="timeline-content">${step}</div>
            </li>
        `).join('');

        instructionsHTML = `
            <div class="kitchen-instructions">
                <h4><i class="fa-solid fa-list-ol"></i> ${instructionsTitle}</h4>
                <ol class="timeline-list">
                    ${steps}
                </ol>
            </div>
        `;
    }

    // Fade out out, update, fade in (simple animation effect)
    dynamicContent.style.opacity = '0';
    setTimeout(() => {
        dynamicContent.innerHTML = ingredientsHTML + instructionsHTML;
        dynamicContent.style.opacity = '1';
    }, 150);
}

/**
 * Filters the kitchen cards based on a search term.
 * Looks at the title and description of each recipe/trick.
 */
export function filterKitchen(searchTerm) {
    searchTerm = searchTerm.toLowerCase();

    const sections = document.querySelectorAll('#kitchen-page .vault-category-section');

    sections.forEach(section => {
        const carousel = section.querySelector('.carousel');
        const cards = carousel.querySelectorAll('.kitchen-card');
        let hasVisibleCards = false;

        cards.forEach(card => {
            const textContent = card.innerText.toLowerCase();

            if (textContent.includes(searchTerm)) {
                card.style.display = 'flex'; // Keep the flex layout for consistent sizing
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Hide the whole section if no cards match
        if (hasVisibleCards) {
            section.style.display = 'block';

            // Re-initialize the dots for this specific carousel since card count/visibility changed
            const carouselId = carousel.id;
            if (carouselId) {
                // Remove dots for hidden cards visually or just reinit completely
                const dotsContainer = document.getElementById(`dots-${carouselId}`);
                if (dotsContainer) {
                    const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
                    dotsContainer.innerHTML = '';
                    visibleCards.forEach((_, index) => {
                        const dot = document.createElement('div');
                        dot.className = index === 0 ? 'dot active' : 'dot';
                        dotsContainer.appendChild(dot);
                    });
                }
                updateCarouselDots(carouselId);
            }

        } else {
            section.style.display = 'none';
        }
    });
}

/**
 * Toggles the expanded (open) state of a kitchen card.
 * @param {HTMLElement} cardElement The card that was clicked.
 */
export function toggleKitchenCard(cardElement) {
    // Check if the card is already open
    const isOpen = cardElement.classList.contains('open');

    // For a cleaner experience, we could optionally close other open cards in the same carousel
    // const parentCarousel = cardElement.closest('.carousel');
    // if (parentCarousel) {
    //     parentCarousel.querySelectorAll('.kitchen-card.open').forEach(c => c.classList.remove('open'));
    // }

    // Toggle this card
    if (isOpen) {
        cardElement.classList.remove('open');
    } else {
        cardElement.classList.add('open');

        // Scroll the card into view a bit if it was cut off
        setTimeout(() => {
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }, 300);
    }
}
