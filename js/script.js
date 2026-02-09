/************************************************************
 * 1. COCKTAIL DATABASE (Classic Recipes)
 ************************************************************/
const classicCocktails = [
    {
        id: 'c1',
        name: "Old Fashioned",
        category: ["Strong", "Classic"],
        description: "De ultieme klassieker met bourbon, suiker en bitters.",
        ingredients: ["60ml Bourbon", "1 suikerklontje", "2 scheutjes Angostura bitters", "Sinaasappelschil"],
        method: "Stirred",
        methodDesc: "Los suiker op in bitters en water. Voeg bourbon en ijs toe, roer 30 seconden.",
        image: "./assets/oldfashion.png"
    },
    {
        id: 'c2',
        name: "Margarita",
        category: ["Sour", "Tequila"],
        description: "Fris en ziltig: de perfecte balans tussen limoen en tequila.",
        ingredients: ["50ml Tequila", "20ml Cointreau", "15ml Limoensap", "Zoutrandje"],
        method: "Shaken",
        methodDesc: "Shake alle ingrediënten met ijs en zeef in een glas met een zoutrandje.",
        image: "./assets/margerita.png"
    },
    {
        id: 'c3',
        name: "Mojito",
        category: ["Refreshing", "Rum"],
        description: "Munt, suiker en rum: een zomerse favoriet.",
        ingredients: ["50ml Witte Rum", "Verse munt", "2 tl suiker", "Bruiswater", "Limoen"],
        method: "Muddled",
        methodDesc: "Muddle munt en suiker. Voeg rum, limoen en ijs toe. Top af met bruiswater.",
        image: "./assets/mojito.png"
    },
    {
        id: 'c4',
        name: "Espresso Martini",
        category: ["Coffee", "Vodka"],
        description: "Koffie met een kick: perfect als after-dinner drink.",
        ingredients: ["40ml Vodka", "30ml Koffielikeur", "30ml Verse Espresso", "15ml Suikersiroop"],
        method: "Hard Shake",
        methodDesc: "Shake zeer krachtig met ijs voor een mooie schuimlaag. Zeef in een coupe.",
        image: "./assets/espressomartini.png"
    },
    {
        id: 'c5',
        name: "Negroni",
        category: ["Bitter", "Gin"],
        description: "De favoriet van de bartender: kruidig en complex.",
        ingredients: ["30ml Gin", "30ml Campari", "30ml Zoete Vermout"],
        method: "Stirred",
        methodDesc: "Roer alle ingrediënten met ijs en serveer in een glas met één groot ijsblok.",
        image: "./assets/negroni.png"
    },
    {
        id: 'c6',
        name: "Whiskey Sour",
        category: ["Sour", "Classic"],
        description: "Zijdezacht door het eiwit, krachtig door de bourbon.",
        ingredients: ["60ml Bourbon", "30ml Limoensap", "15ml Suikersiroop", "1 Eiwit"],
        method: "Dry & Wet Shake",
        methodDesc: "Shake eerst zonder ijs, daarna met ijs. Zeef in een glas met vers ijs.",
        image: "./assets/whiskeysour.png"
    },
    {
        id: 'c7',
        name: "Pina Colada",
        category: ["Tropical", "Sweet"],
        description: "Vakantie in een glas: kokos en ananas.",
        ingredients: ["50ml Witte Rum", "30ml Kokosroom", "50ml Ananassap"],
        method: "Blended",
        methodDesc: "Mix alle ingrediënten met ijs in een blender tot een gladde massa.",
        image: "./assets/pinacolada.png"
    },
    {
        id: 'c8',
        name: "Moscow Mule",
        category: ["Spicy", "Vodka"],
        description: "Fris met een pittige kick van gemberbier.",
        ingredients: ["50ml Vodka", "15ml Limoensap", "120ml Gemberbier"],
        method: "Built",
        methodDesc: "Bouw de cocktail direct in een koperen mok vol met ijs. Roer kort.",
        image: "./assets/moskoumule.png"
    },
    {
        id: 'c9',
        name: "Dark 'n Stormy",
        category: ["Spicy", "Rum"],
        description: "Donker en mysterieus: de smaak van de Bermuda's.",
        ingredients: ["60ml Dark Rum", "100ml Gemberbier", "15ml Limoensap"],
        method: "Layered",
        methodDesc: "Giet gemberbier in een glas met ijs. 'Float' de donkere rum voorzichtig bovenop.",
        image: "./assets/darkenstormy.png"
    },
    {
        id: 'c10',
        name: "Cosmopolitan",
        category: ["Fruit", "Vodka"],
        description: "Elegant, roze en tijdloos.",
        ingredients: ["40ml Vodka Citron", "15ml Cointreau", "30ml Cranberrysap", "15ml Limoen"],
        method: "Shaken",
        methodDesc: "Shake met ijs en zeef in een gekoeld martini-glas. Garneer met sinaasappel.",
        image: "./assets/cosmopolitan.png"
    },
    {
        id: 'c11',
        name: "Daiquiri",
        category: ["Sour", "Rum"],
        description: "De ultieme test voor een goede rum.",
        ingredients: ["60ml Witte Rum", "30ml Limoensap", "15ml Suikersiroop"],
        method: "Shaken",
        methodDesc: "Shake met veel ijs en zeef in een coupe-glas. Geen ijs in het glas!",
        image: "./assets/daiquri.png"
    },
    {
        id: 'c12',
        name: "Aperol Spritz",
        category: ["Light", "Sparkling"],
        description: "Hét terrasdrankje van de zomer.",
        ingredients: ["90ml Prosecco", "60ml Aperol", "30ml Bruiswater"],
        method: "Built",
        methodDesc: "Vul een wijnglas met ijs. Voeg Prosecco, Aperol en bruiswater toe. Roer kort.",
        image: "./assets/aperolspritz.png"
    },
    {
        id: 'c13',
        name: "Manhattan",
        category: ["Strong", "Spirit-Forward"],
        description: "Rijk en vol van smaak: de koning van de whiskey-cocktails.",
        ingredients: ["50ml Rye Whiskey", "20ml Zoete Vermout", "2 dashes Angostura"],
        method: "Stirred",
        methodDesc: "Roer in een mengglas met ijs. Zeef in een gekoelde coupe. Garneer met kers.",
        image: "./assets/manhattan.png"
    },
    {
        id: 'c14',
        name: "Gin Fizz",
        category: ["Sparkling", "Refreshing"],
        description: "Licht, bruisend en verfijnd.",
        ingredients: ["50ml Gin", "30ml Citroensap", "10ml Suikersiroop", "Bruiswater"],
        method: "Shaken & Built",
        methodDesc: "Shake gin, citroen en suiker. Giet in glas en top af met bruiswater.",
        image: "./assets/ginfizz.png"
    },
    {
        id: 'c15',
        name: "Paloma",
        category: ["Fresh", "Tequila"],
        description: "Mexico's favoriet met grapefruit en tequila.",
        ingredients: ["50ml Tequila", "10ml Limoensap", "Grapefruit Soda"],
        method: "Built",
        methodDesc: "Bouw in een glas met een zoutrandje. Top af met grapefruit soda.",
        image: "./assets/paloma.png"
    },
    {
        id: 'c16',
        name: "Dry Martini",
        category: ["Strong", "Gin"],
        description: "De definitie van elegantie.",
        ingredients: ["60ml Gin", "10ml Dry Vermout", "Olijf of Citroen"],
        method: "Stirred",
        methodDesc: "Roer zeer koud met ijs. Zeef in een martini-glas. Garneer met een olijf.",
        image: "./assets/drymartini.jpg"
    },
    {
        id: 'c17',
        name: "Bloody Mary",
        category: ["Savory", "Vodka"],
        description: "De hartige klassieker, perfect voor de brunch.",
        ingredients: ["50ml Vodka", "100ml Tomatensap", "Worcestersaus", "Tabasco"],
        method: "Rolled",
        methodDesc: "Giet heen en weer tussen twee glazen om te mixen zonder te veel te verwateren.",
        image: "./assets/bloodymary.png"
    },
    {
        id: 'c18',
        name: "French 75",
        category: ["Champagne", "Gin"],
        description: "Feestelijk en krachtig tegelijk.",
        ingredients: ["30ml Gin", "15ml Citroensap", "10ml Suikersiroop", "Champagne"],
        method: "Shaken & Layered",
        methodDesc: "Shake gin, citroen en suiker. Zeef in flûte en top af met champagne.",
        image: "./assets/french75.png"
    },
    {
        id: 'c19',
        name: "Amaretto Sour",
        category: ["Sweet & Sour", "Classic"],
        description: "Zacht, nootachtig en perfect gebalanceerd.",
        ingredients: ["50ml Amaretto", "25ml Citroensap", "15ml Eiwit", "Angostura"],
        method: "Shaken",
        methodDesc: "Dry shake zonder ijs, dan wet shake met ijs. Garneer met een kers.",
        image: "./assets/amarettosour.png"
    },
    {
        id: 'c20',
        name: "Mai Tai",
        category: ["Tiki", "Rum"],
        description: "De koning van de Tiki-cultuur.",
        ingredients: ["40ml Dark Rum", "20ml Witte Rum", "15ml Orgeat", "15ml Cointreau"],
        method: "Shaken",
        methodDesc: "Shake alle ingrediënten met crushed ijs. Garneer uitbundig met munt en limoen.",
        image: "./assets/maitai.png"
    },
    {
        id: 'c21',
        name: "Long Island Ice Tea",
        category: ["Strong", "Classic"],
        description: "Een krachtige mix van vijf verschillende spirits.",
        image: "./assets/longisland.png",
        ingredients: ["Rum blanco", "Gin", "Vodka", "Tequila", "Cointreau", "Citroensap", "Suikersiroop", "Cola"],
        method: "Build",
        methodDesc: "Vul een longdrinkglas met ijs. Voeg alle spirits en het citroensap toe. Top af met cola en roer voorzichtig."
    },
    {
        id: 'c22',
        name: "Clover Club",
        category: ["Sour", "Elegant"],
        description: "Een zijdezachte, roze klassieker met framboos.",
        image: "./assets/cloverclub.png",
        ingredients: ["Gin", "Citroensap", "Raspberry syrup", "Eiwit"],
        method: "Dry Shake & Shake",
        methodDesc: "Shake eerst alle ingrediënten zonder ijs (dry shake) om het eiwit te laten schuimen. Voeg ijs toe, shake opnieuw en strain in een gekoeld glas."
    },
    {
        id: 'c23',
        name: "Espresso Martini Bueno",
        category: ["Coffee", "Sweet"],
        description: "Een heerlijke variant met een hint van hazelnoot.",
        image: "./assets/bueno.png",
        ingredients: ["Vodka", "Frangelico", "Espresso", "Hazelnut syrup"],
        method: "Shake",
        methodDesc: "Shake alle ingrediënten krachtig met veel ijs en strain in een martini glas. Garneer met koffiebonen."
    },
    {
        id: 'c24',
        name: "Corpse Reviver #2",
        category: ["Classic", "Strong"],
        description: "Ontworpen om je weer tot leven te wekken na een zware nacht.",
        image: "./assets/corpsreviver2.png",
        ingredients: ["Gin", "Lillet Blanc", "Cointreau", "Citroensap", "Angostura bitters"],
        method: "Shake",
        methodDesc: "Shake met ijs en strain in een gekoeld glas. Traditioneel wordt het glas gespoeld met absint."
    },
    {
        id: 'c25',
        name: "Gincotec",
        category: ["Fresh", "Iced Tea"],
        description: "Een botanical mix met vlierbloesem en icetea.",
        image: "./assets/groenplatsoen.png",
        ingredients: ["Gin", "Vlierbloesem", "Limoensap", "Vlierbloesem siroop", "Komkommer", "Bruiswater"],
        method: "Build",
        methodDesc: "Bouw het drankje op in een groot glas met veel ijs. Garneer met een komkommerlint."
    },
    {
        id: 'c27',
        name: "Holy Peach",
        category: ["Sweet", "Fruity"],
        description: "Een zoete mix van perzik en Licor 43.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkjsaYKVohbwNDsfKAPkOdgizGaqQfDUFI5A&s",
        ingredients: ["Peachtree", "Licor 43", "Limoensap", "Sprite"],
        method: "Build",
        methodDesc: "Bouw in een longdrinkglas met ijs en top af met Sprite of groene ijsthee."
    },
    {
        id: 'c28',
        name: "Wandering Cosmo",
        category: ["Fruity", "Easy"],
        description: "Een moderne twist op de Cosmopolitan.",
        image: "https://punchdrink.com/wp-content/uploads/2020/03/Article-Ultimate-Cosmo-Cosmopolitan-Cocktail-Recipe.jpg?w=1024",
        ingredients: ["Passoa", "Cointreau", "Vodka", "Limoensap", "Bruiswater"],
        method: "Shake",
        methodDesc: "Shake de alcohol en het limoensap met ijs. Strain in een glas en top af met DubbelFrisss."
    },
    {
        id: 'c29',
        name: "Red Flamingo",
        category: ["Fruity", "Sparkling"],
        description: "Een felroze dorstlesser met bramen en framboos.",
        image: "https://www.recipesfromeurope.com/wp-content/uploads/2023/06/tinto-de-verano-recipe.jpg",
        ingredients: ["Bramble gin", "Cointreau", "Citroensap", "Raspberry syrup", "Bruiswater"],
        method: "Shake & Top",
        methodDesc: "Shake alle ingrediënten behalve de Spa Rood. Strain over ijs en vul aan met bruiswater."
    },
    {
        id: 'c30',
        name: "Blueberry Mule",
        category: ["Blue", "Ginger"],
        description: "Een blauwe variant op de Moscow Mule.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_UC3UqKfCWHpI41-RnGbac7VvytVgytVQWQ&s",
        ingredients: ["Blue Curacao", "Vodka", "Blueberry likeur", "Limoensap", "Gemberbier"],
        method: "Build",
        methodDesc: "Bouw direct in een koperen mok of glas. Roer voorzichtig om de lagen te mengen."
    },
    {
        id: 'c31',
        name: "Giant Sucker",
        category: ["Herbal", "Unique"],
        description: "Jägermeister ontmoet vlierbloesem.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTByFb9McDUMEXGfWAAMl-KZstTtlkaf0LO_Q&s",
        ingredients: ["Honing", "Jagermeister", "Verse munt", "Tonic"],
        method: "Stir",
        methodDesc: "Los de honing op in de Jägermeister. Voeg ijs en tonic toe. Garneer met rozemarijn."
    },
    {
        id: 'c32',
        name: "Lychacha",
        category: ["Exotic", "Floral"],
        description: "Een unieke mix van lychee en Aperol.",
        image: "https://drom.nl/img/8a16afda-9b60-4fb2-a3bd-f72117609880/thumbnail-img-6457.jpg?fm=jpg&q=80&fit=max&crop=602%2C264%2C0%2C191",
        ingredients: ["Vlierbloesem siroop", "Lychee likeur", "Campari", "Citroensap", "Eiwit"],
        method: "Shake",
        methodDesc: "Shake krachtig met eiwit voor een mooie schuimkraag."
    },
    {
        id: 'c33',
        name: "Mango Mustache",
        category: ["Fruity", "Sour"],
        description: "Een zijdezachte mango cocktail met een gin basis.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW8xPzs9ZajhISThklMn8I7cNckiGYXpP9xQ&s",
        ingredients: ["Suikersiroop", "Mango puree", "Citroensap", "Gin", "Eiwit"],
        method: "Shake",
        methodDesc: "Dry shake zonder ijs, dan met ijs. Strain in een coupe glas."
    },
    {
        id: 'c34',
        name: "Tropical Hurricane",
        category: ["Tiki", "Fruity"],
        description: "Vakantie in een glas.",
        image: "https://thesocialsipper.com/wp-content/uploads/2025/03/SS-Tropical-Aperol-Margarita-2.jpg",
        ingredients: ["Bacardi Rasp", "Peachtree", "Limoensap", "Sinaasappelsap"],
        method: "Shake",
        methodDesc: "Shake alle vloeistoffen en schenk over vers ijs. Top af met maracuja sap."
    },
    {
        id: 'c35',
        name: "Muddy Mudslide",
        category: ["Creamy", "Coffee"],
        description: "Een rijke koffie cocktail met Baileys en caramel.",
        image: "https://preppykitchen.com/wp-content/uploads/2022/01/Mudslide-Feature.jpg",
        ingredients: ["Baileys", "Caramel vodka", "Koffielikeur", "Espresso"],
        method: "Stir",
        methodDesc: "Stir alle ingrediënten 10 seconden in een tumbler met een groot blok ijs."
    },
    {
        id: 'c36',
        name: "New York Sour",
        category: ["Classic", "Wine twist"],
        description: "Een Whiskey Sour met een prachtige rode wijn float.",
        image: "https://www.kitchengeekery.com/_next/image?url=https%3A%2F%2Fsite.kitchengeekery.com%2Fwp-content%2Fuploads%2F2021%2F01%2Fnew-york-sour-cocktail.jpg&w=828&q=75",
        ingredients: ["Jameson", "Citroensap", "Suikersiroop", "Eiwit", "Rode wijn"],
        method: "Shake & Float",
        methodDesc: "Maak een normale whiskey sour. Giet voorzichtig de Malbec over de bolle kant van een barlepel voor de laag."
    },
    {
        id: 'c37',
        name: "Zombie",
        category: ["Strong", "Tiki"],
        description: "Beroemd en berucht. Maximaal 2 per persoon!",
        image: "./assets/zombie.png",
        ingredients: ["Rum blanco", "Dark rum", "Sinaasappelsap", "Grenadine", "Kaneelsiroop", "Angostura bitters"],
        method: "Shake & Fire",
        methodDesc: "Shake alles met ijs. Top af met overproof rum en steek deze voorzichtig aan. Strooi er kaneel over voor vonken."
    }
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
    const allCocktails = [...classicCocktails, ...myRecipes];

    vaultGrid.innerHTML = "";
    const searchTerm = filter.toLowerCase();

    const filtered = allCocktails.filter(c => {
        const nameMatch = c.name.toLowerCase().includes(searchTerm);
        const ingredientMatch = c.ingredients.some(i => i.toLowerCase().includes(searchTerm));
        const categoryMatch = Array.isArray(c.category) 
            ? c.category.some(cat => cat.toLowerCase().includes(searchTerm))
            : c.category.toLowerCase().includes(searchTerm);

        return nameMatch || ingredientMatch || categoryMatch;
    });

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

function searchCocktails() {
    const searchInput = document.getElementById('vaultSearch');
    if (searchInput) renderVault(searchInput.value);
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