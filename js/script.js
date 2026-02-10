/************************************************************
 * 1. COCKTAIL DATABASE (Classic Recipes)
 ************************************************************/
const classicCocktails = [
    { id: 'c1', name: "Amaretto Sour", category: ["Sweet", "Sour", "Classic", "Almond"], description: "Nutty, sweet, and perfectly balanced with a silky texture.", ingredients: ["Amaretto", "Lemon juice", "Egg white", "Angostura bitters"], method: "Shaken", methodDesc: "Dry shake, then wet shake with ice. Garnish with a cherry.", image: "./assets/amarettosour.png" },
    { id: 'c2', name: "Aperol Spritz", category: ["Light", "Sparkling", "Bitter"], description: "The golden hour in a glass. Light and bubbly.", ingredients: ["Prosecco", "Aperol", "Soda water"], method: "Built", methodDesc: "Fill a wine glass with ice. Add Prosecco, Aperol, and soda water.", image: "./assets/aperolspritz.png" },
    { id: 'c3', name: "Bee's Knees", category: ["Classic", "Honey", "Sweet", "Sour"], description: "A Prohibition-era classic that's the 'bee's knees'.", ingredients: ["Gin", "Lemon juice", "Honey", "Sugar syrup"], method: "Shaken", methodDesc: "Shake all ingredients with ice and strain into a chilled glass.", image: "./assets/beesknees.png" },
    { id: 'c4', name: "Bloody Mary", category: ["Savory", "Vodka"], description: "A savory classic, perfect for brunch or recovery.", ingredients: ["Vodka", "Tomato juice", "Worcestershire sauce", "Tabasco"], method: "Rolled", methodDesc: "Roll the ingredients between two shakers to mix.", image: "./assets/bloodymary.png" },
    { id: 'c5', name: "Blueberry Mule", category: ["Blue", "Ginger", "Spicy"], description: "A blue variation of the Moscow Mule.", ingredients: ["Blue Curacao", "Vodka", "Blueberry liqueur", "Lime juice", "Ginger beer"], method: "Built", methodDesc: "Build directly in a mug. Stir gently to mix colors.", image: "./assets/blueberrymule.png" },
    { id: 'c6', name: "Clover Club", category: ["Sour", "Elegant", "Raspberry", "Pink"], description: "A silky smooth, pink classic with raspberry notes.", ingredients: ["Gin", "Lemon juice", "Raspberry syrup", "Egg white"], method: "Dry Shake & Shake", methodDesc: "Dry shake first to foam. Add ice, shake again, and strain.", image: "./assets/cloverclub.png" },
    { id: 'c7', name: "Corpse Reviver #2", category: ["Classic", "Strong", "Orange", "Lemon"], description: "Designed to wake you up after a long night.", ingredients: ["Gin", "Lillet Blanc", "Cointreau", "Lemon juice", "Angostura bitters"], method: "Shaken", methodDesc: "Shake with ice and strain into an absinthe-rinsed glass.", image: "./assets/corpsreviver2.png" },
    { id: 'c8', name: "Cosmopolitan", category: ["Fruit", "Vodka", "Pink"], description: "Elegant, tart, and pink. A modern classic.", ingredients: ["Vodka Citron", "Cointreau", "Cranberry juice", "Lime juice"], method: "Shaken", methodDesc: "Shake with ice and strain into a chilled martini glass.", image: "./assets/cosmopolitan.png" },
    { id: 'c9', name: "Daiquiri", category: ["Sour", "Rum"], description: "The ultimate test of a good rum: simple, sharp, and clean.", ingredients: ["White Rum", "Lime juice", "Sugar syrup"], method: "Shaken", methodDesc: "Shake with ice and strain into a chilled coupe. No ice in the glass!", image: "./assets/daiquri.png" },
    { id: 'c10', name: "Dark 'n Stormy", category: ["Spicy", "Rum"], description: "A moody, delicious storm of dark rum and ginger.", ingredients: ["Dark Rum", "Ginger beer", "Lime juice"], method: "Layered", methodDesc: "Pour ginger beer over ice. Float dark rum on top.", image: "./assets/darkenstormy.png" },
    { id: 'c11', name: "Dry Martini", category: ["Strong", "Gin"], description: "The definition of elegance: cold and precise.", ingredients: ["Gin", "Dry Vermouth", "Olives"], method: "Stirred", methodDesc: "Stir with ice until ice cold. Strain into a martini glass.", image: "./assets/drymartini.jpg" },
    { id: 'c12', name: "Espresso Martini", category: ["Coffee", "Vodka"], description: "Wake up and smell the vodka: a perfect pick-me-up.", ingredients: ["Vodka", "Coffee liqueur", "Espresso", "Sugar syrup"], method: "Hard Shake", methodDesc: "Shake hard with ice to create a thick foam layer. Strain into a coupe.", image: "./assets/espressomartini.png" },
    { id: 'c13', name: "Espresso Martini Bueno", category: ["Energy", "Coffee", "Sweet", "Bitter"], description: "A delicious variation with a hint of hazelnut.", ingredients: ["Vodka", "Frangelico", "Espresso", "Hazelnut syrup"], method: "Shaken", methodDesc: "Shake vigorously with plenty of ice. Strain into a martini glass.", image: "./assets/bueno.png" },
    { id: 'c14', name: "French 75", category: ["Champagne", "Gin", "Lemon"], description: "Festive and powerful, like a French field gun.", ingredients: ["Gin", "Lemon juice", "Sugar syrup", "Champagne"], method: "Shaken & Layered", methodDesc: "Shake gin, lemon, and sugar. Top with champagne in a flute.", image: "./assets/french75.png" },
    { id: 'c15', name: "Garden Cocktail", category: ["Fresh", "Floral", "Cucumber"], description: "A refreshing floral mix with cucumber.", ingredients: ["Elderflower liqueur", "Gin", "Lime juice", "Cucumber", "Sprite"], method: "Muddled & Built", methodDesc: "Muddle cucumber. Add liquids and ice. Top with Sprite.", image: "./assets/garden.png" },
    { id: 'c16', name: "Giant Sucker", category: ["Herbal", "Unique", "Bubbly"], description: "Jägermeister meets elderflower in a surprising way.", ingredients: ["Honey", "Jagermeister", "Fresh mint", "Elderflower tonic"], method: "Stirred", methodDesc: "Dissolve honey in Jägermeister. Top with elderflower tonic.", image: "./assets/giantsucker.png" },
    { id: 'c17', name: "Gin Basil Smash", category: ["Modern", "Fresh", "Herbal"], description: "Bright green and herbal: a modern classic.", ingredients: ["Gin", "Lemon juice", "Sugar syrup", "Fresh basil"], method: "Muddled & Shaken", methodDesc: "Muddle basil with sugar. Add gin and lemon, shake hard with ice.", image: "./assets/ginbasil.png" },
    { id: 'c18', name: "Gin Fizz", category: ["Sparkling", "Refreshing"], description: "Light, fizzy, and sophisticated.", ingredients: ["Gin", "Lemon juice", "Sugar syrup", "Soda water"], method: "Shaken & Built", methodDesc: "Shake gin, lemon, and sugar. Top with soda water.", image: "./assets/ginfizz.png" },
    { id: 'c19', name: "Groen Plansoen", category: ["Fresh", "Floral", "Cucumber"], description: "A botanical mix with elderflower and green tea notes.", ingredients: ["Gin", "Elderflower liqueur", "Lime juice", "Elderflower syrup", "Cucumber", "Iced tea"], method: "Built", methodDesc: "Build in a highball glass. Garnish with a cucumber ribbon.", image: "./assets/groenplansoen.png" },
    { id: 'c20', name: "Holy Peach", category: ["Sweet", "Fruity", "Peach"], description: "A sweet mix of peach and vanilla notes.", ingredients: ["Peachtree", "Licor 43", "Lime juice", "Sprite"], method: "Built", methodDesc: "Build in a longdrink glass. Top with Sprite or green iced tea.", image: "./assets/holypeach.png" },
    { id: 'c21', name: "Long Island Ice Tea", category: ["Very-Strong", "Classic"], description: "A powerful blend of five different spirits.", ingredients: ["White Rum", "Gin", "Vodka", "Tequila", "Cointreau", "Lemon juice", "Sugar syrup", "Cola"], method: "Built", methodDesc: "Add all spirits and lemon juice. Top with cola and stir gently.", image: "./assets/longisland.png" },
    { id: 'c22', name: "Lychacha", category: ["Exotic", "Floral", "Lychee", "Sweet", "Sour"], description: "A unique mix of lychee and Aperol.", ingredients: ["Elderflower syrup", "Lychee liqueur", "Aperol", "Lemon juice", "Egg white"], method: "Shaken", methodDesc: "Shake vigorously with egg white for a thick foam.", image: "./assets/lychacha.png" },
    { id: 'c23', name: "Mango Mustache", category: ["Fruity", "Sour", "Sweet", "Mango"], description: "A silky smooth mango cocktail with a gin base.", ingredients: ["Sugar syrup", "Mango puree", "Lemon juice", "Gin", "Egg white"], method: "Shaken", methodDesc: "Dry shake, then wet shake. Strain into a coupe glass.", image: "./assets/mangomustach.png" },
    { id: 'c24', name: "Manhattan", category: ["Strong", "Spirit-Forward"], description: "Rich and moody: the king of whiskey cocktails.", ingredients: ["Rye Whiskey", "Sweet Vermouth", "Angostura bitters"], method: "Stirred", methodDesc: "Stir with ice. Strain into a chilled coupe. Garnish with a cherry.", image: "./assets/manhattan.png" },
    { id: 'c25', name: "Margarita", category: ["Sour", "Tequila"], description: "Fresh, sharp, and salty: the perfect harmony of lime and tequila.", ingredients: ["Tequila", "Cointreau", "Lime juice", "Salt"], method: "Shaken", methodDesc: "Shake all ingredients with ice and strain into a salt-rimmed glass.", image: "./assets/margerita.png" },
    { id: 'c26', name: "Mojito", category: ["Refreshing", "Rum"], description: "A Cuban favorite: minty, sweet, and incredibly refreshing.", ingredients: ["White Rum", "Fresh mint", "Sugar", "Soda water", "Lime juice"], method: "Muddled", methodDesc: "Muddle mint and sugar. Add rum, lime, and ice. Top with soda water.", image: "./assets/mojito.png" },
    { id: 'c27', name: "Moscow Mule", category: ["Spicy", "Vodka"], description: "Crisp and refreshing with a spicy ginger kick.", ingredients: ["Vodka", "Lime juice", "Ginger beer"], method: "Built", methodDesc: "Build directly in a copper mug filled with ice. Stir gently.", image: "./assets/moskoumule.png" },
    { id: 'c28', name: "Muddy Mudslide", category: ["Creamy", "Coffee", "Caramel"], description: "A rich coffee cocktail with Baileys and caramel.", ingredients: ["Baileys", "Caramel vodka", "Coffee liqueur", "Espresso"], method: "Stirred", methodDesc: "Stir with a large ice cube for 10 seconds.", image: "./assets/mudslide.jpg" },
    { id: 'c29', name: "Negroni", category: ["Bitter", "Gin"], description: "The bartender's favorite: complex, bitter, and ruby red.", ingredients: ["Gin", "Campari", "Sweet Vermouth"], method: "Stirred", methodDesc: "Stir ingredients with ice and strain into a rocks glass over a large ice cube.", image: "./assets/negroni.png" },
    { id: 'c30', name: "New York Sour", category: ["Classic", "Wine twist", "Sour"], description: "A Whiskey Sour topped with a beautiful red wine float.", ingredients: ["Jameson", "Lemon juice", "Sugar syrup", "Egg white", "Red wine"], method: "Shake & Float", methodDesc: "Make a sour. Gently float red wine on top using a spoon.", image: "./assets/newyorksour.png" },
    { id: 'c31', name: "Old Fashioned", category: ["Strong", "Classic", "Spirit-Forward"], description: "The ultimate whiskey classic: sophisticated, balanced, and timeless.", ingredients: ["Bourbon", "Sugar cube", "Angostura bitters", "Orange zest"], method: "Stirred", methodDesc: "Muddle sugar with bitters and water. Add bourbon and ice, stir for 30 seconds.", image: "./assets/oldfashion.png" },
    { id: 'c32', name: "Paloma", category: ["Fresh", "Tequila"], description: "Mexico's true favorite: grapefruit meets tequila.", ingredients: ["Tequila", "Lime juice", "Grapefruit soda"], method: "Built", methodDesc: "Build in a glass with a salt rim. Top with grapefruit soda.", image: "./assets/paloma.png" },
    { id: 'c33', name: "Pina Colada", category: ["Tropical", "Sweet"], description: "A vacation in a glass: creamy coconut and sweet pineapple.", ingredients: ["White Rum", "Coconut cream", "Pineapple juice"], method: "Blended", methodDesc: "Blend all ingredients with ice until smooth and creamy.", image: "./assets/pinacolada.png" },
    { id: 'c34', name: "Red Flamingo", category: ["Fruity", "Sparkling", "Fresh"], description: "A bright pink thirst-quencher with bramble and raspberry.", ingredients: ["Bramble gin", "Cointreau", "Lemon juice", "Raspberry syrup", "Soda water"], method: "Shake & Top", methodDesc: "Shake all except soda. Strain and top with sparkling water.", image: "./assets/redflamingo.png" },
    { id: 'c35', name: "Rosemary & Peach Sour", category: ["Vodka", "Herbal", "Velvet"], description: "A sophisticated peach sour with a hint of rosemary.", ingredients: ["Vodka", "Peachtree", "Lemon juice", "Sugar syrup", "Milk"], method: "Shaken", methodDesc: "Shake for 30 seconds with ice to create a smooth texture.", image: "./assets/rosemarypeach.png" },
    { id: 'c36', name: "Sidecar", category: ["Classic", "Sour", "Cognac", "1920's"], description: "A legendary cognac cocktail with a sugar rim.", ingredients: ["Cognac", "Cointreau", "Lemon juice", "Sugar syrup"], method: "Shaken", methodDesc: "Shake with ice and strain into a sugar-rimmed coupe.", image: "./assets/sidecar.png" },
    { id: 'c37', name: "South Side", category: ["Classic", "Refreshing", "Minty", "1920's"], description: "The gin-based version of a Mojito, elegant and minty.", ingredients: ["Gin", "Lemon juice", "Sugar syrup", "Fresh mint"], method: "Shaken", methodDesc: "Shake ingredients with mint and ice. Double strain into a coupe.", image: "./assets/southside.png" },
    { id: 'c38', name: "Tropical Hurricane", category: ["Tiki", "Fruity"], description: "A tropical storm in a glass.", ingredients: ["Bacardi Rasp", "Peachtree", "Lime juice", "Orange juice"], method: "Shaken", methodDesc: "Shake liquids. Top with passion fruit juice.", image: "./assets/tropicalhurricane.png" },
    { id: 'c39', name: "Wandering Cosmo", category: ["Fruity", "Riff", "Pasionfruit"], description: "A modern twist on the classic Cosmopolitan.", ingredients: ["Passoa", "Cointreau", "Vodka", "Lime juice", "Fruit soda"], method: "Shaken", methodDesc: "Shake alcohol and lime. Top with red fruit soda.", image: "./assets/wanderingcosmo.png" },
    { id: 'c40', name: "Whiskey Sour", category: ["Sour", "Classic"], description: "Silky smooth thanks to the egg white, with a bold bourbon kick.", ingredients: ["Bourbon", "Lemon juice", "Sugar syrup", "Egg white"], method: "Dry & Wet Shake", methodDesc: "Shake without ice first, then with ice. Strain into a glass with fresh ijs.", image: "./assets/whiskeysour.png" },
    { id: 'c41', name: "Zombie", category: ["Strong", "Tiki", "Unique"], description: "Famous, powerful, and mysterious. Limit: 2 per person!", ingredients: ["White Rum", "Dark Rum", "Orange juice", "Grenadine", "Cinnamon syrup", "Angostura bitters"], method: "Shake & Fire", methodDesc: "Shake with ice. Top with overproof rum and light it.", image: "./assets/zombie.png" }
];

/************************************************************
 * 2. APP STATE & INITIALIZATION
 ************************************************************/
let currentImageBase64 = "";
let myIngredients = JSON.parse(localStorage.getItem('myIngredients')) || [];

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});

/************************************************************
 * 3. NAVIGATION LOGIC
 ************************************************************/
function navigateTo(pageId) {
    // Schakel pagina's
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const activePage = document.getElementById(pageId + '-page');
    if (activePage) activePage.classList.add('active');

    // Update nav icons
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');

    // Pagina specifieke acties
    if (pageId === 'vault') renderVault();
    if (pageId === 'fridge') syncCheckboxes();
}

/************************************************************
 * 4. VAULT & SEARCH LOGIC
 ************************************************************/
function renderVault(filter = "") {
    const vaultGrid = document.getElementById('vault-grid');
    if (!vaultGrid) return;

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    
    // 1. Combine lists AND Sort them alphabetically by name
    const allCocktails = [...classicCocktails, ...myRecipes].sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    vaultGrid.innerHTML = "";
    const searchTerm = filter.toLowerCase();

    // 2. Filter the already sorted list
    const filtered = allCocktails.filter(c => {
        const nameMatch = c.name.toLowerCase().includes(searchTerm);
        const ingredientMatch = c.ingredients.some(i => i.toLowerCase().includes(searchTerm));
        const categoryMatch = Array.isArray(c.category) 
            ? c.category.some(cat => cat.toLowerCase().includes(searchTerm))
            : c.category.toLowerCase().includes(searchTerm);

        return nameMatch || ingredientMatch || categoryMatch;
    });

    // 3. Render the cards
    filtered.forEach(cocktail => {
        const card = document.createElement('div');
        card.className = 'cocktail-card';
        card.onclick = function() { this.classList.toggle('open'); };

        card.innerHTML = `
            <div class="card-thumb-large">
                <img src="${cocktail.image}" alt="${cocktail.name}">
            </div>
            <div class="card-content">
                <h4>${cocktail.name}</h4>
                <div class="category-container">
                    ${Array.isArray(cocktail.category) 
                        ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                        : `<span class="category-tag">${cocktail.category}</span>`
                    }
                </div>
                <p class="description">${cocktail.description || "A custom masterpiece."}</p>
                <div class="collapsible-content">
                    <div class="ingredients-section">
                        <strong>Ingredients:</strong> 
                        <ul class="ingredients-list">
                            ${cocktail.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="method-section">
                        <strong>Method: ${cocktail.method}</strong>
                        <p class="method-text">${cocktail.methodDesc}</p>
                    </div>
                </div>
            </div>
        `;
        vaultGrid.appendChild(card);
    });
}

/************************************************************
 * 5. RECIPE CREATION & IMAGE HANDLING
 ************************************************************/
function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
        const display = document.getElementById('image-preview-display');
        const placeholder = document.getElementById('image-preview-placeholder');
        
        if (display && placeholder) {
            display.src = reader.result;
            display.style.display = 'block';
            placeholder.style.display = 'none';
        }
        currentImageBase64 = reader.result;
    }
    reader.readAsDataURL(file);
}

function saveNewRecipe() {
    const getValue = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : "";
    };

    const name = getValue('recipe-name');
    const description = getValue('recipe-description');
    const categoryInput = getValue('recipe-category');
    const ingredientsInput = getValue('recipe-ingredients');
    const method = getValue('recipe-method');
    const methodDesc = getValue('recipe-desc');

    if (!name || !ingredientsInput) {
        alert("Vul tenminste een naam en ingrediënten in!");
        return;
    }

    const newRecipe = {
        id: 'user-' + Date.now(),
        name: name,
        description: description || "A custom masterpiece.",
        category: categoryInput.split(',').map(c => c.trim()).filter(c => c !== ""),
        ingredients: ingredientsInput.split('\n').filter(i => i.trim() !== ""),
        method: method || "Not specified",
        methodDesc: methodDesc || "No description provided.",
        image: currentImageBase64 || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&h=400&auto=format&fit=crop"
    };

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    myRecipes.push(newRecipe);
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));

    alert("Recept opgeslagen!");
    navigateTo('vault');
}

/************************************************************
 * 6. FRIDGE & INGREDIENT MATCHING LOGIC
 ************************************************************/

/**
 * Opent en sluit de categorieën met de nieuwe smooth CSS transitie
 */
function toggleCategory(id) {
    const content = document.getElementById(id);
    if (!content) return;

    // Toggle de 'active' class voor de CSS animatie
    content.classList.toggle('active');
    
    // Icoontje omdraaien
    const button = content.previousElementSibling;
    const icon = button ? button.querySelector('i') : null;
    
    if (icon) {
        if (content.classList.contains('active')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    }
}

/**
 * Update de voorraadlijst bij elke checkbox klik
 */
function updateFridge(checkbox) {
    const value = checkbox.value.toLowerCase();
    
    if (checkbox.checked) {
        if (!myIngredients.includes(value)) {
            myIngredients.push(value);
        }
    } else {
        myIngredients = myIngredients.filter(ing => ing !== value);
    }
    
    localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
}

/**
 * Synchroniseert de checkboxes bij het laden van de pagina
 */
function syncCheckboxes() {
    const checkboxes = document.querySelectorAll('.category-content input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = myIngredients.includes(cb.value.toLowerCase());
    });
}

/**
 * Zoekt cocktails op basis van voorraad en toont ze in de Vault-stijl
 */
function checkMatches() {
    const btn = document.querySelector('.match-btn-large');
    const resultsContainer = document.getElementById('matching-results');
    if (!resultsContainer || !btn) return;

    // Visuele feedback op de knop
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Searching...`;
    btn.style.pointerEvents = "none";

    // Korte vertraging voor het "zoek" effect
    setTimeout(() => {
        const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        const allCocktails = [...classicCocktails, ...myRecipes];

        // Filter: Alle ingrediënten van de cocktail moeten in 'myIngredients' zitten
        const matches = allCocktails.filter(cocktail => {
            return cocktail.ingredients.every(ing => {
                const ingredientName = ing.toLowerCase();
                return myIngredients.some(mine => ingredientName.includes(mine));
            });
        });

        resultsContainer.innerHTML = ""; 

        if (matches.length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align:center; padding: 40px 20px; color: #888; grid-column: 1/-1;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>No full matches found. Try adding basics like sugar, lime juice, or bitters!</p>
                </div>`;
        } else {
            matches.forEach(cocktail => {
                const card = document.createElement('div');
                card.className = 'cocktail-card';
                card.onclick = function() { this.classList.toggle('open'); };

                card.innerHTML = `
                    <div class="card-thumb-large">
                        <img src="${cocktail.image}" alt="${cocktail.name}">
                    </div>
                    <div class="card-content">
                        <h4>${cocktail.name}</h4>
                        <div class="category-container">
                            ${Array.isArray(cocktail.category) 
                                ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                                : `<span class="category-tag">${cocktail.category}</span>`
                            }
                        </div>
                        <p class="description">${cocktail.description || "A custom masterpiece."}</p>
                        <div class="collapsible-content">
                            <div class="ingredients-section">
                                <strong>Ingredients:</strong> 
                                <ul class="ingredients-list">
                                    ${cocktail.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="method-section" style="margin-top: 10px; border-top: 1px solid #333; padding-top: 10px;">
                                <strong>Method: ${cocktail.method}</strong>
                                <p class="method-text" style="font-size: 0.85rem; color: #bbb; margin-top: 5px;">${cocktail.methodDesc || ""}</p>
                            </div>
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
        }

        // Zet knop terug en scroll naar resultaten
        btn.innerHTML = originalContent;
        btn.style.pointerEvents = "auto";
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 600);
}