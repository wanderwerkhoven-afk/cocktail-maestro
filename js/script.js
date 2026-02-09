// 1. De Database met klassieke cocktails
const classicCocktails = [
    {
        id: 'c1',
        name: "Old Fashioned",
        category: ["Strong"],
        description: "De ultieme klassieker met bourbon, suiker en bitters.",
        ingredients: ["60ml Bourbon", "1 suikerklontje", "2 scheutjes Angostura bitters", "Sinaasappelschil"],
        method: "Stirred",
        methodDesc: "Plaats de suiker en bitters in een mengglas met een spatje water en roer tot de suiker is opgelost. Voeg de bourbon en ijs toe, en roer gedurende 30 seconden voor de juiste koeling en verwatering.",
        image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-10-old-fashioned%2Fold-fashioned-0898-vertical"
    },
    {
        id: 'c2',
        name: "Margarita",
        category: ["Sour"],
        description: "Een frisse Mexicaanse favoriet met tequila en limoen.",
        ingredients: ["50ml Tequila", "20ml Cointreau", "15ml Limoensap", "Zoutrandje"],
        method: "Shaken",
        methodDesc: "Wrijf een limoenpartje over de rand van het glas en dip deze in zout. Doe alle ingrediënten in een shaker met ijs en schud krachtig gedurende 15 seconden. Zeef in het voorbereide glas.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&h=400&auto=format&fit=crop"
    },
    {
        id: 'c3',
        name: "Mojito",
        category: ["Refreshing"],
        description: "De perfecte zomerse mix van munt, suiker en witte rum.",
        ingredients: ["50ml Witte Rum", "Verse munt", "2 tl suiker", "Bruiswater", "Limoen"],
        method: "Muddled & Built",
        methodDesc: "Muddle de munt en suiker voorzichtig in het glas om de oliën vrij te laten. Voeg limoensap en rum toe. Vul het glas met gemalen ijs, voeg bruiswater toe en roer kort ('build') om alles te mengen.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&h=400&auto=format&fit=crop"
    },
    {
        id: 'c4',
        name: "Espresso Martini",
        category: ["Energy", "Bitter"],
        description: "Een verfijnde cocktail voor de koffieliefhebbers.",
        ingredients: ["50ml Vodka", "30ml Verse Espresso", "15ml Kahlua", "Koffieboontjes"],
        method: "Hard Shake",
        methodDesc: "Het is cruciaal dat de espresso vers is voor een goede schuimlaag. Schud alle ingrediënten zeer krachtig met veel ijs ('hard shake') en zeef onmiddellijk in een gekoeld martini-glas.",
        image: "https://static-prod.remymartin.com/app/uploads/2025/02/remy-martin-cocktails-remy-espresso-1x1-250220-02.jpg"
    },
    {
        id: 'c5',
        name: "Negroni",
        category: ["Bitter", "Spirity"],
        description: "Een iconisch Italiaans aperitief: perfecte balans tussen zoet en bitter.",
        ingredients: ["30ml Gin", "30ml Campari", "30ml Zoete Vermout"],
        method: "Stirred",
        methodDesc: "Meng alle ingrediënten in een mengglas met veel ijs. Roer gedurende 20 seconden en zeef het in een rocks-glas over een groot ijsblok. Garneer met een sinaasappelschil.",
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&h=400&auto=format&fit=crop"
    },
    {
        id: 'c6',
        name: "Whiskey Sour",
        category: ["Sour", "Spirity"],
        description: "Rijk en zijdezacht door de combinatie van eiwit en bourbon.",
        ingredients: ["60ml Bourbon", "30ml Limoensap", "15ml Suikersiroop", "1 Eiwit"],
        method: "Dry Shake & Wet Shake",
        methodDesc: "Schud eerst alle ingrediënten zonder ijs (dry shake) om het eiwit te emulgeren. Voeg daarna ijs toe en schud opnieuw (wet shake) voor de koeling. Zeef in een glas met ijs.",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&h=400&auto=format&fit=crop"
    },
    {
        id: 'c7',
        name: "Pina Colada",
        category: ["Tropical", "Creamy"],
        description: "Vakantie in een glas met kokosnoot en ananas.",
        ingredients: ["50ml Witte Rum", "30ml Kokosroom", "50ml Ananassap", "Verse ananas"],
        method: "Blended or Shaken",
        methodDesc: "Mix alle ingrediënten met ijs in een blender voor een 'frozen' effect, of schud krachtig in een shaker voor een lichtere versie. Serveer in een groot glas met veel ijs.",
        image: "https://images.unsplash.com/photo-1545231027-63b62f669ad5?q=80&w=400&h=400&auto=format&fit=crop"
    },
    {
        id: 'c8',
        name: "Moscow Mule",
        category: ["Spicy", "Fresh"],
        description: "Verfrissend met een pittige kick van gemberbier.",
        ingredients: ["50ml Vodka", "15ml Limoensap", "120ml Gemberbier", "Munt"],
        method: "Built",
        methodDesc: "Vul een koperen mok of glas met ijs. Voeg de vodka en limoensap toe en top af met het gemberbier. Roer voorzichtig om de koolzuur te behouden.",
        image: "https://images.unsplash.com/photo-1513257185545-983b063066c6?q=80&w=400&h=400&auto=format&fit=crop"
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