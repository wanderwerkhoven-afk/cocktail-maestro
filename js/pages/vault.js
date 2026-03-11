import { classicCocktails } from '../modules/database.js';
import { mocktailRecipes } from '../modules/mocktails.js';
import { myFavorites } from '../core/state.js';
import { createCocktailCardHTML } from '../core/ui-utils.js';
import { drinkMode } from '../modules/drink-mode.js';

export function renderVault(filter = "") {
    const vaultGrid = document.getElementById('vault-grid');
    if (!vaultGrid) return;

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];

    // Split user recipes by type
    const myCocktails = myRecipes.filter(r => r.type !== 'mocktail');
    const myCustomMocktails = myRecipes.filter(r => r.type === 'mocktail');

    // Pick source array based on drink mode
    const sourceList = drinkMode === 'mocktail'
        ? [...mocktailRecipes, ...myCustomMocktails]
        : [...classicCocktails, ...myCocktails];

    // Categorization logic
    let categories = [];
    if (drinkMode === 'mocktail') {
        categories = [
            { id: 'favorites', name: 'Favorites', searchTerms: [] },
            { id: 'zero-riffs', name: '0.0 Riffs', searchTerms: ['virgin', 'arnold palmer', 'shirley temple'] },
            { id: 'fruity', name: 'Fruity & Tropical', searchTerms: ['tropical', 'fruity', 'sweet', 'mango', 'pineapple', 'watermelon'] },
            { id: 'fresh', name: 'Fresh & Light', searchTerms: ['fresh', 'light', 'citrus', 'refreshing', 'mint', 'cucumber'] },
            { id: 'others', name: 'Other Mocktails', searchTerms: [] },
            { id: 'my-recipes', name: 'My Masterpieces', searchTerms: [] }
        ];
    } else {
        categories = [
            { id: 'favorites', name: 'Favorites', searchTerms: [] },
            { id: 'gin', name: 'Gin', searchTerms: ['gin'] },
            { id: 'vodka', name: 'Vodka', searchTerms: ['vodka'] },
            { id: 'rum', name: 'Rum', searchTerms: ['rum', 'bacardi', 'becardi'] },
            { id: 'tequila', name: 'Tequila & Mezcal', searchTerms: ['tequila', 'mezcal'] },
            { id: 'whiskey', name: 'Whiskey & Cask', searchTerms: ['whiskey', 'bourbon', 'rye', 'scotch', 'cognac', 'pisco', 'brandy', 'jameson', 'vermouth', 'blended scotch', 'single malt'] },
            { id: 'aperitif', name: 'Aperitifs & Spritz', searchTerms: ['aperitif', 'spritz', 'bitter', 'vermouth', 'bubbles', 'sparkling'] },
            { id: 'others', name: 'Variety & Classics', searchTerms: [] },
            { id: 'my-recipes', name: 'My Masterpieces', searchTerms: [] }
        ];
    }

    vaultGrid.innerHTML = "";
    const searchTerm = filter.toLowerCase();

    // 1. First, group ALL cocktails that match the search term
    const allMatching = sourceList.filter(c => {
        if (!searchTerm) return true;
        const nameMatch = c.name.toLowerCase().includes(searchTerm);
        const ingredientMatch = c.ingredients.some(i => {
            const ingName = typeof i === 'object' ? i.name : i;
            return ingName.toLowerCase().includes(searchTerm);
        });
        const categoryMatch = Array.isArray(c.category)
            ? c.category.some(cat => cat.toLowerCase().includes(searchTerm))
            : c.category.toLowerCase().includes(searchTerm);

        return nameMatch || ingredientMatch || categoryMatch;
    });

    // 2. Distribute into category buckets
    const grouped = {};
    categories.forEach(cat => grouped[cat.id] = []);

    allMatching.forEach(cocktail => {
        // Special case: Favorites (can be in multiple categories)
        if (myFavorites.includes(cocktail.id)) {
            grouped['favorites'].push(cocktail);
        }

        // Special case: My Recipes
        const isMyRecipe = myRecipes.some(r => r.id === cocktail.id);
        if (isMyRecipe) {
            grouped['my-recipes'].push(cocktail);
            return;
        }

        // Check other categories based on searchTerms in ingredients or category tags
        let placed = false;
        for (const cat of categories) {
            if (cat.id === 'my-recipes') continue;

            const matchesCategory = cat.searchTerms.some(term => {
                const regex = new RegExp(`\\b${term}\\b`, 'i');
                const inIngredients = cocktail.ingredients.some(ing => {
                    const name = (typeof ing === 'object' ? ing.name : ing).toLowerCase();
                    return regex.test(name);
                });
                const inTags = Array.isArray(cocktail.category)
                    ? cocktail.category.some(t => regex.test(t.toLowerCase()))
                    : regex.test(cocktail.category.toLowerCase());

                return inIngredients || inTags;
            });

            if (matchesCategory) {
                grouped[cat.id].push(cocktail);
                placed = true;
                break; // Put in first matching category for now
            }
        }

        if (!placed) {
            grouped['others'].push(cocktail);
        }
    });

    // 3. Render each non-empty category as a carousel section
    categories.forEach(cat => {
        const cocktails = grouped[cat.id];
        if (cocktails.length === 0) return;

        // Sort cocktails in category: favorites first, then alpha
        cocktails.sort((a, b) => {
            const aFav = myFavorites.includes(a.id);
            const bFav = myFavorites.includes(b.id);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return a.name.localeCompare(b.name);
        });

        const section = document.createElement('div');
        section.className = 'vault-category-section';

        const title = document.createElement('h3');
        title.className = 'category-heading';
        title.innerText = cat.name;
        section.appendChild(title);

        const carouselId = `vault-carousel-${cat.id}`;
        const carousel = document.createElement('div');
        carousel.className = 'carousel';
        carousel.id = carouselId;

        // Add scroll listener for dots
        carousel.addEventListener('scroll', () => {
            window.updateCarouselDots(carouselId);
            
            // Close any open cards when scrolling through the carousel
            const openCards = carousel.querySelectorAll('.cocktail-card.open');
            openCards.forEach(card => card.classList.remove('open'));
        }, { passive: true });

        cocktails.forEach(cocktail => {
            const cardWrapper = document.createElement('div');
            cardWrapper.innerHTML = createCocktailCardHTML(cocktail, {
                isNeutral: true,
                hideIngredientIcons: true
            });
            const card = cardWrapper.firstElementChild;
            carousel.appendChild(card);
        });

        section.appendChild(carousel);

        // Add dots container right below the carousel
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-indicators';
        dotsContainer.id = `dots-${carouselId}`;
        
        // Populate initial dots
        cocktails.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dotsContainer.appendChild(dot);
        });

        section.appendChild(dotsContainer);
        vaultGrid.appendChild(section);

    });

}

export async function downloadRecipe(cocktailId) {
    const cardElement = document.querySelector('.cocktail-card.open');
    if (!cardElement) return;

    try {
        const btn = cardElement.querySelector('.download-btn');

        // Temporarily hide button so it doesn't appear in the screenshot
        if (btn) btn.style.opacity = '0';

        const canvas = await html2canvas(cardElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#1E1E1E",
            scale: 2,
            logging: false
        });

        // Restore button visibility by removing the inline style
        if (btn) btn.style.removeProperty('opacity');

        const dataUrl = canvas.toDataURL("image/png");

        if (navigator.canShare && navigator.share) {
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([blob], `Cocktail_${cocktailId}.png`, { type: "image/png" });

            await navigator.share({
                files: [file],
                title: "Mijn Cocktail Recept",
                text: "Kijk wat ik heb gemaakt!"
            });
        } else {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `Cocktail_${cocktailId}.png`;
            link.click();
        }
    } catch (err) {
        console.error("Fout:", err);
        alert("Failed to generate image.");
    }
}

export function updateServings(e, cocktailId, delta) {
    if (e) e.stopPropagation();

    // 1. Zoek de labels op de kaart waar geklikt is
    const card = e.target.closest('.cocktail-card');
    const servingsLabel = card.querySelector(`[id="servings-${cocktailId}"]`);
    const listContainer = card.querySelector(`[id="ingredients-${cocktailId}"]`);

    if (!servingsLabel || !listContainer) {
        console.error("Servings elementen niet gevonden voor ID:", cocktailId);
        return;
    }

    // 2. Bereken nieuwe servings
    let currentServings = parseInt(servingsLabel.innerText);
    let newServings = currentServings + delta;
    if (newServings < 1) return;

    servingsLabel.innerText = newServings;

    // 3. Haal het originele recept op voor de basis-aantallen
    const allCocktails = [...classicCocktails, ...(JSON.parse(localStorage.getItem('myRecipes')) || [])];
    const cocktail = allCocktails.find(c => c.id.toString() === cocktailId.toString());

    if (cocktail) {
        const listItems = listContainer.querySelectorAll('li');

        cocktail.ingredients.forEach((ing, index) => {
            // Alleen updaten als het een object is met een amount
            if (typeof ing === 'object' && ing.amount !== undefined) {
                const li = listItems[index];
                if (!li) return;

                // Bereken nieuw aantal op basis van basis (amount / 1) * nieuwe servings
                const newAmount = (ing.amount * newServings).toFixed(ing.amount % 1 === 0 ? 0 : 1);

                // Zoek de span waar de tekst in staat
                const textSpan = li.querySelector('span');
                if (textSpan) {
                    // Behoud het icoontje (voor de Fridge)
                    const icon = textSpan.querySelector('i');
                    const iconHTML = icon ? icon.outerHTML + " " : "";

                    // Update de inhoud van de span
                    textSpan.innerHTML = `${iconHTML}<b class="amount">${newAmount}</b> <b class="unit">${ing.unit}</b> ${ing.name}`;
                }
            }
        });
    }
}
