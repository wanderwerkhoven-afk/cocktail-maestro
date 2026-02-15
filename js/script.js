/* ============================================================
 * TABLE OF CONTENTS
 * ============================================================
 *  1.  COCKTAIL DATABASE (Classic Recipes)
 *
 *  2.  APP STATE & INITIALIZATION
 *      2.1  State Variables
 *      2.2  DOMContentLoaded Init
 *
 *  3.  NAVIGATION
 *      3.1  navigateTo()          – Switch pages & update nav bar
 *
 *  4.  SHOPPING LIST
 *      4.1  renderShoppingList()  – Render list items to DOM
 *      4.2  toggleItemCheck()     – Check / uncheck a list item
 *      4.3  removeFromShoppingList() – Remove a single item
 *      4.4  clearShoppingList()   – Clear entire list (with confirm)
 *      4.5  addToShoppingList()   – Add missing ingredient to list
 *
 *  5.  FAVORITES
 *      5.1  toggleFavorite()      – Add / remove from favorites
 *
 *  6.  VAULT & SEARCH
 *      6.1  renderVault()         – Render all cocktail cards + search filter
 *      6.2  downloadRecipe()      – Screenshot card and share / download
 *      6.3  updateServings()      – Scale ingredient amounts per servings
 *
 *  7.  RECIPE CREATION
 *      7.1  previewImage()        – Preview uploaded image before saving
 *      7.2  saveNewRecipe()       – Save a user-created recipe to localStorage
 *
 *  8.  FRIDGE & INGREDIENT MATCHING
 *      8.1  toggleCategory()      – Open / close ingredient category accordion
 *      8.2  updateFridge()        – Add / remove ingredient on checkbox change
 *      8.3  syncCheckboxes()      – Restore checkbox state from localStorage
 *      8.4  checkMatches()        – Find cocktails based on available ingredients
 * ============================================================ */




/* ============================================================
 * 2. APP STATE & INITIALIZATION
 * ============================================================ */

/* ---------- 2.1  State Variables ---------- */
let currentImageBase64 = "";
let myIngredients = JSON.parse(localStorage.getItem('myIngredients')) || [];
let myFavorites   = JSON.parse(localStorage.getItem('myFavorites'))   || [];
let shoppingList  = JSON.parse(localStorage.getItem('shoppingList'))  || [];

/* ---------- 2.2  DOMContentLoaded Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});


/* ============================================================
 * 3. NAVIGATION
 * ============================================================ */

/* ---------- 3.1  navigateTo() ---------- */
function navigateTo(pageId) {
    // Switch active page
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const activePage = document.getElementById(pageId + '-page');
    if (activePage) activePage.classList.add('active');

    // Update bottom nav icons
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');

    // Page-specific actions on load
    if (pageId === 'vault')    renderVault();
    if (pageId === 'fridge')   syncCheckboxes();
    if (pageId === 'shopping') renderShoppingList();
    if (pageId === 'recipes')  renderMyRecipes();
}



/* ============================================================
 * 4. SHOPPING LIST
 * ============================================================ */

/* ---------- 4.1  renderShoppingList() ---------- */
function renderShoppingList() {
    const listContainer = document.getElementById('shopping-list-items');
    const emptyState    = document.getElementById('shopping-list-empty');
    if (!listContainer) return;

    listContainer.innerHTML = "";

    if (shoppingList.length === 0) {
        if (emptyState) emptyState.style.display = "block";
    } else {
        if (emptyState) emptyState.style.display = "none";
        
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = `shopping-item ${item.checked ? 'checked' : ''}`;
            
            li.innerHTML = `
                <div class="shopping-item-info" onclick="toggleItemCheck(${index})">
                    <i class="${item.checked ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
                    <span class="shopping-item-name">${item.name}</span>
                </div>
                <button class="remove-item-btn" onclick="removeFromShoppingList(${index})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;
            listContainer.appendChild(li);
        });
    }
}

/* ---------- 4.2  toggleItemCheck() ---------- */
function toggleItemCheck(index) {
    shoppingList[index].checked = !shoppingList[index].checked;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    renderShoppingList();
}

/* ---------- 4.3  removeFromShoppingList() ---------- */
function removeFromShoppingList(index) {
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    renderShoppingList();
}

/* ---------- 4.4  clearShoppingList() ---------- */
function clearShoppingList() {
    if (shoppingList.length === 0) return;
    if (confirm("Wil je de hele lijst leegmaken?")) {
        shoppingList = [];
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        renderShoppingList();
    }
}

/* ---------- 4.5  addToShoppingList() ---------- */
function addToShoppingList(e, ingredient) {
    e.stopPropagation();
    
    const exists = shoppingList.some(item => item.name === ingredient);
    
    if (!exists) {
        shoppingList.push({ name: ingredient, checked: false });
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        alert(`${ingredient} added!`);
    } else {
        alert(`${ingredient} is already on the list.`);
    }
}


/* ============================================================
 * 5. FAVORITES
 * ============================================================ */

/* ---------- 5.1  toggleFavorite() ---------- */
function toggleFavorite(e, cocktailId) {
    e.stopPropagation();
    
    const index = myFavorites.indexOf(cocktailId);
    if (index > -1) {
        myFavorites.splice(index, 1);
    } else {
        myFavorites.push(cocktailId);
    }
    
    localStorage.setItem('myFavorites', JSON.stringify(myFavorites));
    
    // Re-render the active page to reflect the change
    if (document.getElementById('vault-page').classList.contains('active')) {
        renderVault(document.getElementById('vault-search')?.value || "");
    } else if (document.getElementById('fridge-page').classList.contains('active')) {
        checkMatches();
    }
}


/* ============================================================
 * 6. VAULT & SEARCH
 * ============================================================ */

/* ---------- 6.1  renderVault() ---------- */
function renderVault(filter = "") {
    const vaultGrid = document.getElementById('vault-grid');
    if (!vaultGrid) return;

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    
    // Combine lists and sort: favorites first, then alphabetically
    const allCocktails = [...classicCocktails, ...myRecipes].sort((a, b) => {
        const aFav = myFavorites.includes(a.id);
        const bFav = myFavorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return a.name.localeCompare(b.name);
    });

    vaultGrid.innerHTML = "";
    const searchTerm = filter.toLowerCase();

    // Filter the list by name, ingredient, or category
    const filtered = allCocktails.filter(c => {
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

    // Render cocktail cards
    filtered.forEach(cocktail => {
        const isFav = myFavorites.includes(cocktail.id);
        const card  = document.createElement('div');
        card.className = `cocktail-card ${isFav ? 'is-favorite' : ''}`;
        
        card.onclick = function(e) { 
            if (!e.target.closest('.download-btn') && 
                !e.target.closest('.fav-btn') && 
                !e.target.closest('.counter-btn')) {
                this.classList.toggle('open'); 
            }
        };

        card.innerHTML = `
            <div class="card-thumb-large">
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${cocktail.id}')">
                    <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                </button>
                <img src="${cocktail.image}" alt="${cocktail.name}">
                <button class="download-btn" onclick="downloadRecipe('${cocktail.id}')">
                    <i class="fa-solid fa-download"></i>
                </button>
            </div>
            <div class="card-content">
                <h4>${cocktail.name} ${isFav ? '⭐' : ''}</h4>
                <div class="category-container">
                    ${Array.isArray(cocktail.category) 
                        ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                        : `<span class="category-tag">${cocktail.category}</span>`
                    }
                </div>
                <p class="description">${cocktail.description || "A custom masterpiece."}</p>
                
                <div class="collapsible-content">
                    <div class="servings-control">
                        <span>Servings:</span>
                        <div class="counter-box">
                            <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', -1)">-</button>
                            <span id="servings-${cocktail.id}">1</span>
                            <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', 1)">+</button>
                        </div>
                    </div>

                    <div class="ingredients-section">
                        <strong>Ingredients:</strong> 
                        <ul class="ingredients-list" id="ingredients-${cocktail.id}">
                            ${cocktail.ingredients.map(ing => {
                                if (typeof ing === 'object' && ing.amount) {
                                    return `<li><span><b class="amount">${ing.amount}</b> <b class="unit">${ing.unit}</b> ${ing.name}</span></li>`;
                                }
                                return `<li><span>${ing}</span></li>`;
                            }).join('')}
                        </ul>
                    </div>

                    <div class="hardware-section">
                        <div class="hardware-column">
                            <strong>Glassware:</strong>
                            <p class="hardware-text">${cocktail.glassware}</p>
                        </div>
                        <div class="hardware-column">
                            <strong>Ice:</strong>
                            <p class="hardware-text">${cocktail.ice}</p>
                        </div>
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

/* ---------- 6.2  downloadRecipe() ---------- */
async function downloadRecipe(cocktailId) {
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
            const res  = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([blob], `Cocktail_${cocktailId}.png`, { type: "image/png" });
            
            await navigator.share({
                files: [file],
                title: "Mijn Cocktail Recept",
                text: "Kijk wat ik heb gemaakt!"
            });
        } else {
            const link  = document.createElement('a');
            link.href   = dataUrl;
            link.download = `Cocktail_${cocktailId}.png`;
            link.click();
        }
    } catch (err) {
        console.error("Fout:", err);
        alert("Failed to generate image.");
    }
}

/* ---------- 6.3  updateServings() ---------- */
function updateServings(e, cocktailId, delta) {
    if (e) e.stopPropagation();
    
    // 1. Zoek de labels op de kaart waar geklikt is
    // We zoeken binnen de dichtstbijzijnde cocktail-card om de juiste te pakken
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


/* ============================================================
 * 7. RECIPE CREATION & MY RECIPES
 * ============================================================ */

/* ---------- 7.1 Formulier Beheer (Overlay) ---------- */

// Deze functie wordt aangeroepen door de grote (+) knop
function openRecipeForm() {
    // 1. Reset de Save-knop naar de originele staat (Nieuw recept)
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Recipe';
    saveBtn.onclick = saveNewRecipe;

    // 2. Maak alle tekstvelden leeg
    document.getElementById('recipe-name').value = "";
    document.getElementById('recipe-description').value = "";
    if(document.getElementById('recipe-category')) document.getElementById('recipe-category').value = "";
    if(document.getElementById('recipe-glassware')) document.getElementById('recipe-glassware').value = "";
    if(document.getElementById('recipe-ice')) document.getElementById('recipe-ice').value = "";
    document.getElementById('recipe-method').value = "";
    document.getElementById('recipe-desc').value = "";

    // 3. Reset de afbeelding preview
    const display = document.getElementById('image-preview-display');
    const placeholder = document.getElementById('image-preview-placeholder');
    display.src = "";
    display.style.display = 'none';
    placeholder.style.display = 'flex';
    currentImageBase64 = ""; 

    // 4. Reset de ingrediënten naar 1 lege rij
    const container = document.getElementById('ingredient-inputs-container');
    container.innerHTML = ""; 
    addIngredientRow(); 

    // 5. Update suggesties en toon overlay
    updateIngredientSuggestions();
    document.getElementById('recipe-form-overlay').style.display = 'flex';
}

function closeRecipeForm() {
    document.getElementById('recipe-form-overlay').style.display = 'none';
}

function addIngredientRow(amount = '', unit = '', name = '') {
    const container = document.getElementById('ingredient-inputs-container');
    const row = document.createElement('div');
    row.className = 'ingredient-row';
    
    row.innerHTML = `
        <input type="number" class="ing-amount" value="${amount}" placeholder="50" oninput="checkRowTyping(this)">
        <input type="text" class="ing-unit" value="${unit}" placeholder="ml" oninput="checkRowTyping(this)">
        <input type="text" class="ing-name" value="${name}" placeholder="Vodka" list="ingredients-suggestions" oninput="checkRowTyping(this)">
        <button type="button" class="remove-ingredient-btn" onclick="removeIngredientRow(this)">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;
    
    row.style.opacity = '0';
    container.appendChild(row);
    
    setTimeout(() => {
        row.style.opacity = '1';
        row.style.transition = 'opacity 0.3s ease';
    }, 10);
}

function removeIngredientRow(btn) {
    const container = document.getElementById('ingredient-inputs-container');
    // Voorkom dat de allerlaatste rij verwijderd wordt als er maar één is
    if (container.querySelectorAll('.ingredient-row').length > 1) {
        const row = btn.parentElement;
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        row.style.transition = 'all 0.3s ease';
        setTimeout(() => row.remove(), 300);
    } else {
        // Als het de laatste rij is, maak hem alleen leeg
        const row = btn.parentElement;
        row.querySelectorAll('input').forEach(input => input.value = "");
    }
}

function updateIngredientSuggestions() {
    const datalist = document.getElementById('ingredients-suggestions');
    if (!datalist) return;
    const checkboxes = document.querySelectorAll('.category-content input[type="checkbox"]');
    let ingredients = Array.from(checkboxes).map(cb => cb.value);
    ingredients = [...new Set(ingredients)].sort();
    datalist.innerHTML = ingredients.map(ing => `<option value="${ing}">`).join('');
}

/* ---------- 7.2 Foto Preview ---------- */
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

/* ---------- 7.3 Opslaan & Updaten ---------- */
function saveNewRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = getIngredientsFromForm();

    if (!name || ingredients.length === 0) {
        alert("Please enter a name and at least one ingredient!");
        return;
    }

    const newRecipe = {
        id: 'user-' + Date.now(),
        name: name,
        description: document.getElementById('recipe-description').value || "A custom masterpiece.",
        category: document.getElementById('recipe-category')?.value.split(',').map(c => c.trim()).filter(c => c !== "") || ["Custom"],
        glassware: document.getElementById('recipe-glassware')?.value || "Standard Glass",
        ice: document.getElementById('recipe-ice')?.value || "None",
        ingredients: ingredients,
        method: document.getElementById('recipe-method').value || "Not specified",
        methodDesc: document.getElementById('recipe-desc').value || "No description provided.",
        image: currentImageBase64 || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&h=400&auto=format&fit=crop"
    };

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    myRecipes.push(newRecipe);
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));

    finalizeSubmit("Recipe added!");
}

function updateRecipe(id) {
    let myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const index = myRecipes.findIndex(r => r.id === id);
    if (index === -1) return;

    const name = document.getElementById('recipe-name').value;
    const ingredients = getIngredientsFromForm();

    if (!name || ingredients.length === 0) {
        alert("Name and ingredients are required!");
        return;
    }

    myRecipes[index] = {
        id: id,
        name: name,
        description: document.getElementById('recipe-description').value,
        category: document.getElementById('recipe-category')?.value.split(',').map(c => c.trim()) || ["Custom"],
        glassware: document.getElementById('recipe-glassware')?.value || "Standard",
        ice: document.getElementById('recipe-ice')?.value || "None",
        ingredients: ingredients,
        method: document.getElementById('recipe-method').value,
        methodDesc: document.getElementById('recipe-desc').value,
        image: currentImageBase64
    };

    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
    finalizeSubmit("Recipe updated!");
}

// Hulpfunctie om herhaling te voorkomen
function getIngredientsFromForm() {
    const rows = document.querySelectorAll('.ingredient-row');
    const ingredients = [];
    rows.forEach(row => {
        const amount = row.querySelector('.ing-amount').value;
        const unit = row.querySelector('.ing-unit').value;
        const ingName = row.querySelector('.ing-name').value;
        if (ingName.trim() !== "") {
            ingredients.push({
                amount: parseFloat(amount) || 0,
                unit: unit || "",
                name: ingName
            });
        }
    });
    return ingredients;
}

function finalizeSubmit(message) {
    alert(message);
    closeRecipeForm();
    renderMyRecipes();
}

/* ---------- 7.4 Tekenen & Bewerken ---------- */
function renderMyRecipes() {
    const grid = document.getElementById('my-recipes-grid');
    if (!grid) return;

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    grid.innerHTML = "";

    if (myRecipes.length === 0) {
        grid.innerHTML = `
            <div class="placeholder-text" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-top: 50px; text-align: center; color: #666;">
                <i class="fa-solid fa-book-open" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>Your recipe book is empty.<br>Start adding your first creation!</p>
            </div>`;
        return;
    }

    myRecipes.forEach(cocktail => {
        const card = document.createElement('div');
        card.className = 'cocktail-card';
        
        // Klik-logica voor uitklappen (behalve op knoppen)
        card.onclick = function(e) {
            if (!e.target.closest('.counter-btn') && !e.target.closest('.card-actions')) {
                this.classList.toggle('open');
            }
        };

        card.innerHTML = `
            <div class="card-thumb-large">
                <img src="${cocktail.image}" alt="${cocktail.name}">
                <div class="card-actions" style="position: absolute; top: 12px; right: 12px; display: flex; gap: 8px; z-index: 10;">
                    <button class="edit-recipe-btn" onclick="editRecipe('${cocktail.id}')" style="background: rgba(255, 179, 71, 0.9); border: none; color: #000; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="delete-recipe-btn" onclick="deleteRecipe('${cocktail.id}')" style="background: rgba(255, 71, 87, 0.9); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="card-content">
                <h4>${cocktail.name}</h4>
                
                <div class="category-container">
                    ${(Array.isArray(cocktail.category) ? cocktail.category : [cocktail.category])
                        .map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                </div>
                
                <p class="description">${cocktail.description || "A custom masterpiece."}</p>
                
                <div class="collapsible-content">
                    <div class="ingredients-section">
                        <div class="servings-control">
                            <span>Servings:</span>
                            <div class="counter-box">
                                <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', -1)">-</button>
                                <span id="servings-${cocktail.id}">1</span>
                                <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', 1)">+</button>
                            </div>
                        </div>
                        
                        <strong>Ingredients:</strong>
                        <ul class="ingredients-list" id="ingredients-${cocktail.id}">
                            ${cocktail.ingredients.map(ing => `
                                <li>
                                    <span>
                                        <b class="amount" data-base="${ing.amount}">${ing.amount}</b> 
                                        <b class="unit">${ing.unit}</b> ${ing.name}
                                    </span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="hardware-section">
                        <div class="hardware-column">
                            <strong>Glassware:</strong>
                            <p class="hardware-text">${cocktail.glassware || 'Standard Glass'}</p>
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
        `;
        grid.appendChild(card);
    });
}

function editRecipe(id) {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const cocktail = myRecipes.find(r => r.id === id);
    if (!cocktail) return;

    // Vul velden
    document.getElementById('recipe-name').value = cocktail.name;
    document.getElementById('recipe-description').value = cocktail.description;
    if(document.getElementById('recipe-category')) document.getElementById('recipe-category').value = cocktail.category.join(', ');
    if(document.getElementById('recipe-glassware')) document.getElementById('recipe-glassware').value = cocktail.glassware || "";
    if(document.getElementById('recipe-ice')) document.getElementById('recipe-ice').value = cocktail.ice || "";
    document.getElementById('recipe-method').value = cocktail.method;
    document.getElementById('recipe-desc').value = cocktail.methodDesc;
    
    // Foto
    const display = document.getElementById('image-preview-display');
    const placeholder = document.getElementById('image-preview-placeholder');
    display.src = cocktail.image;
    display.style.display = 'block';
    placeholder.style.display = 'none';
    currentImageBase64 = cocktail.image;

    // Ingrediënten
    const container = document.getElementById('ingredient-inputs-container');
    container.innerHTML = ''; 
    cocktail.ingredients.forEach(ing => addIngredientRow(ing.amount, ing.unit, ing.name));

    // Knop omzetten naar Update
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Recipe';
    saveBtn.onclick = () => updateRecipe(id);

    // Open direct (zonder openRecipeForm reset te triggeren)
    document.getElementById('recipe-form-overlay').style.display = 'flex';
}

function deleteRecipe(id) {
    if (confirm("Delete this recipe?")) {
        let myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        myRecipes = myRecipes.filter(r => r.id !== id);
        localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
        renderMyRecipes(); 
    }
}

function checkRowTyping(inputElement) {
    const row = inputElement.closest('.ingredient-row');
    const container = document.getElementById('ingredient-inputs-container');
    const isAnyFilled = Array.from(row.querySelectorAll('input')).some(i => i.value.trim().length > 0);
    
    if (isAnyFilled) {
        row.classList.add('is-typing');
        if (row === container.lastElementChild) addIngredientRow();
    } else {
        row.classList.remove('is-typing');
    }
}

/* ============================================================
 * 8. FRIDGE & INGREDIENT MATCHING
 * ============================================================ */

/* ---------- 8.1 toggleCategory() ---------- */
function toggleCategory(id) {
    const content = document.getElementById(id);
    if (!content) return;

    content.classList.toggle('active');
    
    const button = content.previousElementSibling;
    const icon   = button ? button.querySelector('i') : null;
    
    if (icon) {
        if (content.classList.contains('active')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    }
}

/* ---------- 8.2 Live Search binnen Categorieën ---------- */
function filterCategoryList(input) {
    const filter = input.value.toLowerCase().trim();
    const container = input.closest('.category-content');
    const items = container.querySelectorAll('.fridge-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "flex" : "none";
    });
}

/* ---------- 8.3 updateFridge() ---------- */
function updateFridge(checkbox) {
    const value = checkbox.value.toLowerCase().trim();
    
    if (checkbox.checked) {
        if (!myIngredients.includes(value)) {
            myIngredients.push(value);
        }
    } else {
        myIngredients = myIngredients.filter(ing => ing !== value);
    }
    
    localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
    
    if (typeof updateIngredientSuggestions === 'function') {
        updateIngredientSuggestions();
    }
}

/* ---------- 8.4 syncCheckboxes() ---------- */
function syncCheckboxes() {
    const checkboxes = document.querySelectorAll('.category-content input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = myIngredients.includes(cb.value.toLowerCase().trim());
    });
}

/* ---------- 8.5 checkMatches() ---------- */
function checkMatches() {
    const btn               = document.querySelector('.match-btn-large');
    const resultsContainer = document.getElementById('matching-results');
    if (!resultsContainer || !btn) return;

    // UI Feedback
    btn.innerHTML           = `<i class="fa-solid fa-spinner fa-spin"></i> Searching...`;
    btn.style.pointerEvents = "none";

    setTimeout(() => {
        const myRecipes    = JSON.parse(localStorage.getItem('myRecipes')) || [];
        const allCocktails = [...classicCocktails, ...myRecipes];

        const matches = allCocktails.map(cocktail => {
            const missing = cocktail.ingredients.filter(ing => {
                const nameToSearch = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
                
                const isFound = myIngredients.some(mine => {
                    const cleanMine = mine.toLowerCase().trim();
                    return nameToSearch.includes(cleanMine) || cleanMine.includes(nameToSearch);
                });
                
                return !isFound;
            });
            return { ...cocktail, missingCount: missing.length, missingItems: missing };
        })
        .filter(c => c.missingCount <= 1) 
        .sort((a, b) => {
            if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount;
            const aFav = myFavorites.includes(a.id);
            const bFav = myFavorites.includes(b.id);
            return bFav - aFav;
        });

        resultsContainer.innerHTML = "";

        if (matches.length === 0) {
            resultsContainer.innerHTML = `
                <div class="placeholder-text" style="text-align:center; padding: 40px 20px;">
                    <i class="fa-solid fa-ice-cream" style="font-size: 3rem; opacity: 0.2; margin-bottom: 10px;"></i>
                    <p>No close matches found.<br><small>Try selecting more spirits!</small></p>
                </div>`;
        } else {
            matches.forEach(cocktail => {
                const isPerfect = cocktail.missingCount === 0;
                const isFav     = myFavorites.includes(cocktail.id);
                const isCustom  = cocktail.id.toString().startsWith('user-');
                
                const card      = document.createElement('div');
                card.className  = `cocktail-card ${isPerfect ? '' : 'near-match'} ${isFav ? 'is-favorite' : ''}`;
                
                card.onclick = function(e) { 
                    if (!e.target.closest('button')) {
                        this.classList.toggle('open'); 
                    }
                };

                card.innerHTML = `
                    <div class="card-thumb-large">
                        <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${cocktail.id}')">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                        </button>
                        ${!isPerfect ? `<span class="missing-tag">Missing ${cocktail.missingCount}</span>` : ''}
                        <img src="${cocktail.image}" alt="${cocktail.name}">
                        ${isCustom ? `<span class="custom-badge">MINE</span>` : ''}
                    </div>
                    <div class="card-content">
                        <h4>${cocktail.name} ${isPerfect ? '✨' : ''}</h4>
                        <div class="category-container">
                            ${Array.isArray(cocktail.category) 
                                ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                                : `<span class="category-tag">${cocktail.category}</span>`
                            }
                        </div>
                        
                        <p class="description">${cocktail.description || ''}</p>

                        <div class="collapsible-content">
                            <div class="servings-control">
                                <span>Servings:</span>
                                <div class="counter-box">
                                    <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', -1)">-</button>
                                    <span id="servings-${cocktail.id}">1</span>
                                    <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', 1)">+</button>
                                </div>
                            </div>
                            <div class="ingredients-section">
                                <strong>Ingredients:</strong> 
                                <ul class="ingredients-list" id="ingredients-${cocktail.id}">
                                    ${cocktail.ingredients.map(ing => {
                                        const ingName = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
                                        const isMissing = cocktail.missingItems.some(m => 
                                            (typeof m === 'object' ? m.name : m).toLowerCase().trim() === ingName
                                        );
                                        
                                        const amountPart = typeof ing === 'object' ? `<b class="amount">${ing.amount}</b> <b class="unit">${ing.unit}</b>` : '';
                                        const namePart = typeof ing === 'object' ? ing.name : ing;

                                        return `
                                            <li class="${isMissing ? 'missing-ing' : 'available-ing'}">
                                                <span>
                                                    <i class="fa-solid ${isMissing ? 'fa-circle-xmark' : 'fa-circle-check'}"></i> 
                                                    ${amountPart} ${namePart}
                                                </span>
                                                ${isMissing ? `
                                                <button class="add-to-cart-btn" onclick="addToShoppingList(event, '${ingName}')">
                                                    <i class="fa-solid fa-cart-plus"></i>
                                                </button>` : ''}
                                            </li>`;
                                    }).join('')}
                                </ul>
                            </div>
                            <div class="method-section">
                                <strong>Method: ${cocktail.method}</strong>
                                <p class="method-text">${cocktail.methodDesc}</p>
                            </div>
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
        }

        btn.innerHTML           = `<i class="fa-solid fa-glass-citrus"></i> Find Cocktails`;
        btn.style.pointerEvents = "auto";
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
}

/* ============================================================
 * 9. Shake it up!
 * ============================================================ */

function shakeForCocktail() {
    const shakerCard = document.getElementById('main-shaker-card');
    const modal = document.getElementById('shake-modal');
    const resultContainer = document.getElementById('shake-result-card');

    if (!shakerCard || !modal || !resultContainer) return;

    // Start animatie
    if (shakerCard.classList.contains('shaking')) return;
    shakerCard.classList.add('shaking');

    setTimeout(() => {
        shakerCard.classList.remove('shaking');

        // Check of de lijst bestaat onder de juiste naam: classicCocktails
        if (typeof classicCocktails !== 'undefined' && classicCocktails.length > 0) {
            
            // Kies een random cocktail uit de classicCocktails lijst
            const randomCocktail = classicCocktails[Math.floor(Math.random() * classicCocktails.length)];

            // Vul de popup
            resultContainer.innerHTML = `
                <img src="${randomCocktail.image}" alt="${randomCocktail.name}">
                <h2>${randomCocktail.name}</h2>
                <p style="color: #888; margin-bottom: 15px; font-size: 0.95rem;">${randomCocktail.description}</p>
                
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 20px; text-align: left; margin-bottom: 15px;">
                    <h4 style="color: #ffb347; margin-bottom: 8px; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Ingredients</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; color: #ccc; font-size: 0.9rem; line-height: 1.5;">
                        ${randomCocktail.ingredients.map(i => `<li>• ${i.amount}${i.unit} ${i.name}</li>`).join('')}
                    </ul>
                </div>

                <div style="background: rgba(255,179,71,0.05); padding: 15px; border-radius: 20px; text-align: left; border: 1px solid rgba(255,179,71,0.1);">
                    <h4 style="color: #ffb347; margin-bottom: 5px; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Method: ${randomCocktail.method}</h4>
                    <p style="color: #bbb; margin: 0; font-size: 0.85rem; line-height: 1.4; font-style: italic;">
                        ${randomCocktail.methodDesc}
                    </p>
                </div>
            `;

            // Toon de popup
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 50);
        } else {
            alert("Database 'classicCocktails' niet gevonden!");
        }
    }, 1200);
}
function closeShakeModal() {
    const modal = document.getElementById('shake-modal');
    
    // 1. Haal de 'show' class weg (start de CSS fade-out)
    modal.classList.remove('show');
    
    // 2. Wacht tot de animatie klaar is (400ms) en zet dan display op none
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}