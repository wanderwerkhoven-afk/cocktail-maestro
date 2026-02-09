// 1. De Database met 20 klassieke cocktails
const classicCocktails = [
    {
        id: 'c1',
        name: "Old Fashioned",
        category: ["Strong", "Classic"],
        description: "De ultieme klassieker met bourbon, suiker en bitters.",
        ingredients: ["60ml Bourbon", "1 suikerklontje", "2 scheutjes Angostura bitters", "Sinaasappelschil"],
        method: "Stirred",
        methodDesc: "Los suiker op in bitters en water. Voeg bourbon en ijs toe, roer 30 seconden.",
        image: "https://www.allrecipes.com/thmb/dYoPJDtxDmLRSoAynSqLNJxnTio=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/281761-MakersMarkOldFashioned-gw-ddmfs-beauty-4x3-3338-a0aa968439b44df1b4b26bfdba03fc88.jpg"
    },
    {
        id: 'c2',
        name: "Margarita",
        category: ["Sour", "Tequila"],
        description: "Fris en ziltig: de perfecte balans tussen limoen en tequila.",
        ingredients: ["50ml Tequila", "20ml Cointreau", "15ml Limoensap", "Zoutrandje"],
        method: "Shaken",
        methodDesc: "Shake alle ingrediënten met ijs en zeef in een glas met een zoutrandje.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmrm7M8eJ7ISAO0R_Fc34BTHq3zV36dxwIA&s"
    },
    {
        id: 'c3',
        name: "Mojito",
        category: ["Refreshing", "Rum"],
        description: "Munt, suiker en rum: een zomerse favoriet.",
        ingredients: ["50ml Witte Rum", "Verse munt", "2 tl suiker", "Bruiswater", "Limoen"],
        method: "Muddled",
        methodDesc: "Muddle munt en suiker. Voeg rum, limoen en ijs toe. Top af met bruiswater.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx7rkUKDhsMqgdHwKDnfJjlwKoyWf84ZnrQg&s"
    },
    {
        id: 'c4',
        name: "Espresso Martini",
        category: ["Coffee", "Vodka"],
        description: "Koffie met een kick: perfect als after-dinner drink.",
        ingredients: ["50ml Vodka", "30ml Verse Espresso", "15ml Suikersiroop"],
        method: "Hard Shake",
        methodDesc: "Shake zeer krachtig met ijs voor een mooie schuimlaag. Zeef in een coupe.",
        image: "https://static-prod.remymartin.com/app/uploads/2025/02/remy-martin-cocktails-remy-espresso-1x1-250220-02.jpg"
    },
    {
        id: 'c5',
        name: "Negroni",
        category: ["Bitter", "Gin"],
        description: "De favoriet van de bartender: kruidig en complex.",
        ingredients: ["30ml Gin", "30ml Campari", "30ml Zoete Vermout"],
        method: "Stirred",
        methodDesc: "Roer alle ingrediënten met ijs en serveer in een glas met één groot ijsblok.",
        image: "https://blog-distiller.imgix.net/wp-content/uploads/2018/08/24143617/whiskeysourADOBE.jpg?"
    },
    {
        id: 'c6',
        name: "Whiskey Sour",
        category: ["Sour", "Classic"],
        description: "Zijdezacht door het eiwit, krachtig door de bourbon.",
        ingredients: ["60ml Bourbon", "30ml Limoensap", "15ml Suikersiroop", "1 Eiwit"],
        method: "Dry & Wet Shake",
        methodDesc: "Shake eerst zonder ijs, daarna met ijs. Zeef in een glas met vers ijs.",
        image: "https://blog-distiller.imgix.net/wp-content/uploads/2018/08/24143617/whiskeysourADOBE.jpg?"
    },
    {
        id: 'c7',
        name: "Pina Colada",
        category: ["Tropical", "Sweet"],
        description: "Vakantie in een glas: kokos en ananas.",
        ingredients: ["50ml Witte Rum", "30ml Kokosroom", "50ml Ananassap"],
        method: "Blended",
        methodDesc: "Mix alle ingrediënten met ijs in een blender tot een gladde massa.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBtrVo7ioLB4Psl5Qdz6RvitnFMacLqCuIA&s"
    },
    {
        id: 'c8',
        name: "Moscow Mule",
        category: ["Spicy", "Vodka"],
        description: "Fris met een pittige kick van gemberbier.",
        ingredients: ["50ml Vodka", "15ml Limoensap", "120ml Gemberbier"],
        method: "Built",
        methodDesc: "Bouw de cocktail direct in een koperen mok vol met ijs. Roer kort.",
        image: "https://www.foodandwine.com/thmb/DX85ldkm3kh_vUBnXH2mNR78gxA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/moscow-mule-FT-RECIPE0521-6bb69ade441546c1b1210b4e55dbcb23.jpg"
    },
    {
        id: 'c9',
        name: "Dark 'n Stormy",
        category: ["Spicy", "Rum"],
        description: "Donker en mysterieus: de smaak van de Bermuda's.",
        ingredients: ["60ml Dark Rum", "100ml Gemberbier", "15ml Limoensap"],
        method: "Layered",
        methodDesc: "Giet gemberbier in een glas met ijs. 'Float' de donkere rum voorzichtig bovenop.",
        image: "https://www.alcoholvrijshop.nl/media/catalog/product/cache/4a5cf70630b9c3080e492221e54d9a9f/d/a/dark-and-stormy-800x600.png"
    },
    {
        id: 'c10',
        name: "Cosmopolitan",
        category: ["Fruit", "Vodka"],
        description: "Elegant, roze en tijdloos.",
        ingredients: ["40ml Vodka Citron", "15ml Cointreau", "30ml Cranberrysap", "15ml Limoen"],
        method: "Shaken",
        methodDesc: "Shake met ijs en zeef in een gekoeld martini-glas. Garneer met sinaasappel.",
        image: "https://uglyfood.com.sg/wp-content/uploads/2025/05/cosmopolitan-recipe-1747719197.jpg"
    },
    {
        id: 'c11',
        name: "Daiquiri",
        category: ["Sour", "Rum"],
        description: "De ultieme test voor een goede rum.",
        ingredients: ["60ml Witte Rum", "30ml Limoensap", "15ml Suikersiroop"],
        method: "Shaken",
        methodDesc: "Shake met veel ijs en zeef in een coupe-glas. Geen ijs in het glas!",
        image: "https://www.liquor.com/thmb/T7XT7LGJjfm3iP5SYoHWeS-yCGk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/daiquiri-1200x628-email-ba2630027a70498b878ca8180183a779.jpg"
    },
    {
        id: 'c12',
        name: "Aperol Spritz",
        category: ["Light", "Sparkling"],
        description: "Hét terrasdrankje van de zomer.",
        ingredients: ["90ml Prosecco", "60ml Aperol", "30ml Bruiswater"],
        method: "Built",
        methodDesc: "Vul een wijnglas met ijs. Voeg Prosecco, Aperol en bruiswater toe. Roer kort.",
        image: "https://www.resplendentkitchen.com/wp-content/uploads/2024/08/Aperol-Spritz-06056-1.jpg"
    },
    {
        id: 'c13',
        name: "Manhattan",
        category: ["Strong", "Spirit-Forward"],
        description: "Rijk en vol van smaak: de koning van de whiskey-cocktails.",
        ingredients: ["50ml Rye Whiskey", "20ml Zoete Vermout", "2 dashes Angostura"],
        method: "Stirred",
        methodDesc: "Roer in een mengglas met ijs. Zeef in een gekoelde coupe. Garneer met kers.",
        image: "https://www.liquor.com/thmb/DR2UAsRlu-YCVn9r_iLJCmOvzlg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/manhattan-4000x4000-primary-ig-9c3d894510284e9d8fbd9c518d00790b.jpg"
    },
    {
        id: 'c14',
        name: "Gin Fizz",
        category: ["Sparkling", "Refreshing"],
        description: "Licht, bruisend en verfijnd.",
        ingredients: ["50ml Gin", "30ml Citroensap", "10ml Suikersiroop", "Bruiswater"],
        method: "Shaken & Built",
        methodDesc: "Shake gin, citroen en suiker. Giet in glas en top af met bruiswater.",
        image: "https://www.acouplecooks.com/wp-content/uploads/2019/06/Gin-Fizz-112s.jpg"
    },
    {
        id: 'c15',
        name: "Paloma",
        category: ["Fresh", "Tequila"],
        description: "Mexico's favoriet met grapefruit en tequila.",
        ingredients: ["50ml Tequila", "10ml Limoensap", "Grapefruit Soda"],
        method: "Built",
        methodDesc: "Bouw in een glas met een zoutrandje. Top af met grapefruit soda.",
        image: "https://cocktailexpert.nl/wp-content/uploads/2024/06/paloma-recept-cocktail.webp"
    },
    {
        id: 'c16',
        name: "Dry Martini",
        category: ["Strong", "Gin"],
        description: "De definitie van elegantie.",
        ingredients: ["60ml Gin", "10ml Dry Vermout", "Olijf of Citroen"],
        method: "Stirred",
        methodDesc: "Roer zeer koud met ijs. Zeef in een martini-glas. Garneer met een olijf.",
        image: "https://images.ctfassets.net/nhvvc9v3qesf/1xwdCt6vn5alt4LLq4WajV/0bb5b8b59e3ab5937d3912a8a045309c/Ketel_One_Dry___Classic_Martini_in_Nick_and_Nora_Glass_with_hand_adding_lemon_spritz.jpg"
    },
    {
        id: 'c17',
        name: "Bloody Mary",
        category: ["Savory", "Vodka"],
        description: "De hartige klassieker, perfect voor de brunch.",
        ingredients: ["50ml Vodka", "100ml Tomatensap", "Worcestersaus", "Tabasco"],
        method: "Rolled",
        methodDesc: "Giet heen en weer tussen twee glazen om te mixen zonder te veel te verwateren.",
        image: "https://www.liquor.com/thmb/kvzllkWRv-mOjXXMcF0Bcuc4sRQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Bloody-Mary-Classic_Tim_Nusog_4000x4000_primary-68db8a83de544d8ba566accfa13a55e4.jpg"
    },
    {
        id: 'c18',
        name: "French 75",
        category: ["Champagne", "Gin"],
        description: "Feestelijk en krachtig tegelijk.",
        ingredients: ["30ml Gin", "15ml Citroensap", "10ml Suikersiroop", "Champagne"],
        method: "Shaken & Layered",
        methodDesc: "Shake gin, citroen en suiker. Zeef in flûte en top af met champagne.",
        image: "https://images.ctfassets.net/hs93c4k6gio0/Qh3XDKsj9fkaFAPbIcLXR/43bcbac62e7807e55e7a5c91b822e79b/_images_us-cocktails_French75_0412_2.jpg.jpg"
    },
    {
        id: 'c19',
        name: "Amaretto Sour",
        category: ["Sweet & Sour", "Classic"],
        description: "Zacht, nootachtig en perfect gebalanceerd.",
        ingredients: ["50ml Amaretto", "25ml Citroensap", "15ml Eiwit", "Angostura"],
        method: "Shaken",
        methodDesc: "Dry shake zonder ijs, dan wet shake met ijs. Garneer met een kers.",
        image: "https://assets.epicurious.com/photos/643ffefcefb46b50556ffb73/1:1/w_2560%2Cc_limit/Amaretto%2520Sour-RECIPE.jpg"
    },
    {
        id: 'c20',
        name: "Mai Tai",
        category: ["Tiki", "Rum"],
        description: "De koning van de Tiki-cultuur.",
        ingredients: ["40ml Dark Rum", "20ml Witte Rum", "15ml Orgeat", "15ml Cointreau"],
        method: "Shaken",
        methodDesc: "Shake alle ingrediënten met crushed ijs. Garneer uitbundig met munt en limoen.",
        image: "https://candradrinks.com/wp-content/uploads/2024/06/500A8912-500x500.jpg"
    }
];

// Variabele voor de geüploade afbeelding
let currentImageBase64 = "";

// 2. Navigatie functie
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const activePage = document.getElementById(pageId + '-page');
    if (activePage) activePage.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');

    // Bij elke navigatie naar vault, refresh de lijst
    if (pageId === 'vault') renderVault();
}

// 3. Functie om de Vault te vullen
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

// 4. Image Preview Functie
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

// 5. Recept Opslaan Functie (Gefixt met checks)
function saveNewRecipe() {
    // Helper functie om veilig waarden op te halen zonder crash
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

    alert("Recept opgeslagen in je Vault!");

    // Reset Formulier veilig
    const fieldsToReset = ['recipe-name', 'recipe-description', 'recipe-category', 'recipe-ingredients', 'recipe-method', 'recipe-desc'];
    fieldsToReset.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    
    const display = document.getElementById('image-preview-display');
    const placeholder = document.getElementById('image-preview-placeholder');
    if (display && placeholder) {
        display.style.display = 'none';
        display.src = "";
        placeholder.style.display = 'flex';
    }
    currentImageBase64 = ""; 

    navigateTo('vault');
}

// 6. Zoekfunctie & Initialisatie
function searchCocktails() {
    const searchInput = document.getElementById('vaultSearch');
    if (searchInput) renderVault(searchInput.value);
}

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});

// --- FRIDGE LOGICA ---

let myIngredients = JSON.parse(localStorage.getItem('myIngredients')) || [];

function renderIngredients() {
    const container = document.getElementById('fridge-tags');
    if (!container) return;
    
    container.innerHTML = "";
    myIngredients.forEach((ing, index) => {
        const tag = document.createElement('div');
        tag.className = 'ingredient-tag';
        tag.innerHTML = `
            ${ing} 
            <i class="fa-solid fa-xmark" onclick="removeIngredient(${index})"></i>
        `;
        container.appendChild(tag);
    });
    localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
}

function addIngredient() {
    const input = document.getElementById('ingredient-input');
    const value = input.value.trim().toLowerCase();
    
    if (value && !myIngredients.includes(value)) {
        myIngredients.push(value);
        input.value = "";
        renderIngredients();
    }
}

function removeIngredient(index) {
    myIngredients.splice(index, 1);
    renderIngredients();
}

function checkMatches() {
    const resultsGrid = document.getElementById('matching-results');
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const allCocktails = [...classicCocktails, ...myRecipes];
    
    resultsGrid.innerHTML = "";

    const matches = allCocktails.filter(cocktail => {
        // We checken of de koelkast-items voorkomen in de ingrediëntenlijst van de cocktail
        // Dit is een simpele match op tekstbasis
        return cocktail.ingredients.some(ing => {
            return myIngredients.some(mine => ing.toLowerCase().includes(mine));
        });
    });

    if (matches.length === 0) {
        resultsGrid.innerHTML = "<p class='placeholder-text'>Geen directe matches gevonden. Voeg meer basisingrediënten toe zoals 'Vodka' of 'Limoen'.</p>";
        return;
    }

    // Gebruik de bestaande render-logica (kaarten aanmaken)
    matches.forEach(cocktail => {
        // (Zelfde kaart-template als in renderVault)
        const card = document.createElement('div');
        card.className = 'cocktail-card';
        card.onclick = function() { this.classList.toggle('open'); };
        card.innerHTML = `
            <div class="card-thumb-large"><img src="${cocktail.image}"></div>
            <div class="card-content">
                <h4>${cocktail.name}</h4>
                <p class="description">${cocktail.description}</p>
                <div class="collapsible-content">
                   <small>Je hebt ingrediënten hiervoor!</small>
                </div>
            </div>
        `;
        resultsGrid.appendChild(card);
    });
}

// Zorg dat de ingrediënten laden bij opstarten
document.addEventListener('DOMContentLoaded', () => {
    renderIngredients();
});