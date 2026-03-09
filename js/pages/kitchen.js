import { kitchenItems } from '../modules/kitchen-db.js';

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

    kitchenItems.forEach(item => {
        const targetCarousel = carousels[item.category];
        if (!targetCarousel) return;

        const iconClass = iconMap[item.heroClass] || 'fa-star';
        const heroContent = item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded')">`
            : `<i class="fa-solid ${iconClass}"></i>`;

        let ingredientsHTML = '';
        if (item.ingredients && item.ingredients.length > 0) {
            const listItems = item.ingredients.map(ing => `<li>${ing}</li>`).join('');
            ingredientsHTML = `
                <div class="kitchen-ingredients">
                    <h4><i class="fa-solid fa-basket-shopping"></i> Ingredients</h4>
                    <ul>${listItems}</ul>
                </div>
            `;
        }

        const instructionsTitle = item.instructionsTitle || "Instructions";
        let instructionsHTML = '';
        if (item.instructions && item.instructions.length > 0) {
            const steps = item.instructions.map(step => `
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

        const cardHTML = `
            <div class="kitchen-card" id="kitchen-item-${item.id}" onclick="toggleKitchenCard(this)" data-title="${item.title.toLowerCase()}" data-desc="${item.description.toLowerCase()}">
                <div class="kitchen-card-hero ${item.heroClass}">
                    ${heroContent}
                </div>
                <div class="kitchen-card-header">
                    <h3>${item.title}</h3>
                    <span class="difficulty-badge ${item.difficulty}">${item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}</span>
                </div>
                <div class="kitchen-card-body">
                    <p class="kitchen-desc">${item.description}</p>
                    ${ingredientsHTML}
                    ${instructionsHTML}
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
    const card = document.getElementById(`kitchen-item-${itemId}`);
    if (!card) return;

    // Expand if not already open
    if (!card.classList.contains('open')) {
        toggleKitchenCard(card);
    } else {
        // Just scroll if already open
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
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
