import { currentImageBase64, setCurrentImageBase64 } from '../core/state.js';

export function openRecipeForm() {
    // 1. Reset de Save-knop naar de originele staat (Nieuw recept)
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Recipe';
    saveBtn.onclick = saveNewRecipe;

    // 2. Maak alle tekstvelden leeg
    document.getElementById('recipe-name').value = "";
    document.getElementById('recipe-description').value = "";
    if (document.getElementById('recipe-category')) document.getElementById('recipe-category').value = "";
    if (document.getElementById('recipe-glassware')) document.getElementById('recipe-glassware').value = "";
    if (document.getElementById('recipe-ice')) document.getElementById('recipe-ice').value = "";
    document.getElementById('recipe-method').value = "";
    document.getElementById('recipe-desc').value = "";

    // 3. Reset de afbeelding preview
    const display = document.getElementById('image-preview-display');
    const placeholder = document.getElementById('image-preview-placeholder');
    display.src = "";
    display.style.display = 'none';
    placeholder.style.display = 'flex';
    setCurrentImageBase64("");

    // 4. Reset de ingrediënten naar 1 lege rij
    const container = document.getElementById('ingredient-inputs-container');
    container.innerHTML = "";
    addIngredientRow();

    // 5. Update suggesties en toon overlay
    window.updateIngredientSuggestions();
    document.getElementById('recipe-form-overlay').style.display = 'flex';
}

export function closeRecipeForm() {
    document.getElementById('recipe-form-overlay').style.display = 'none';
}

export function addIngredientRow(amount = '', unit = '', name = '') {
    const container = document.getElementById('ingredient-inputs-container');
    const row = document.createElement('div');
    row.className = 'ingredient-row';

    row.innerHTML = `
        <input type="number" class="ing-amount" value="${amount}" placeholder="50" oninput="window.checkRowTyping(this)">
        <input type="text" class="ing-unit" value="${unit}" placeholder="ml" oninput="window.checkRowTyping(this)">
        <input type="text" class="ing-name" value="${name}" placeholder="Vodka" list="ingredients-suggestions" oninput="window.checkRowTyping(this)">
        <button type="button" class="remove-ingredient-btn" onclick="window.removeIngredientRow(this)">
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

export function removeIngredientRow(btn) {
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

export function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        const display = document.getElementById('image-preview-display');
        const placeholder = document.getElementById('image-preview-placeholder');
        if (display && placeholder) {
            display.src = reader.result;
            display.style.display = 'block';
            placeholder.style.display = 'none';
        }
        setCurrentImageBase64(reader.result);
    }
    reader.readAsDataURL(file);
}

export function saveNewRecipe() {
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

export function updateRecipe(id) {
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

export function renderMyRecipes() {
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

        card.onclick = function (e) {
            if (!e.target.closest('.counter-btn') && !e.target.closest('.card-actions')) {
                this.classList.toggle('open');
            }
        };

        card.innerHTML = `
            <div class="card-thumb-large">
                <img src="${cocktail.image}" alt="${cocktail.name}">
                <div class="card-actions" style="position: absolute; top: 12px; right: 12px; display: flex; gap: 8px; z-index: 10;">
                    <button class="edit-recipe-btn" onclick="window.editRecipe('${cocktail.id}')" style="background: rgba(255, 179, 71, 0.9); border: none; color: #000; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="delete-recipe-btn" onclick="window.deleteRecipe('${cocktail.id}')" style="background: rgba(255, 71, 87, 0.9); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">
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
                                <button class="counter-btn" onclick="window.updateServings(event, '${cocktail.id}', -1)">-</button>
                                <span id="servings-${cocktail.id}">1</span>
                                <button class="counter-btn" onclick="window.updateServings(event, '${cocktail.id}', 1)">+</button>
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

export function editRecipe(id) {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const cocktail = myRecipes.find(r => r.id === id);
    if (!cocktail) return;

    document.getElementById('recipe-name').value = cocktail.name;
    document.getElementById('recipe-description').value = cocktail.description;
    if (document.getElementById('recipe-category')) document.getElementById('recipe-category').value = cocktail.category.join(', ');
    if (document.getElementById('recipe-glassware')) document.getElementById('recipe-glassware').value = cocktail.glassware || "";
    if (document.getElementById('recipe-ice')) document.getElementById('recipe-ice').value = cocktail.ice || "";
    document.getElementById('recipe-method').value = cocktail.method;
    document.getElementById('recipe-desc').value = cocktail.methodDesc;

    const display = document.getElementById('image-preview-display');
    const placeholder = document.getElementById('image-preview-placeholder');
    display.src = cocktail.image;
    display.style.display = 'block';
    placeholder.style.display = 'none';
    setCurrentImageBase64(cocktail.image);

    const container = document.getElementById('ingredient-inputs-container');
    container.innerHTML = '';
    cocktail.ingredients.forEach(ing => addIngredientRow(ing.amount, ing.unit, ing.name));

    const saveBtn = document.querySelector('.save-btn');
    saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Recipe';
    saveBtn.onclick = () => updateRecipe(id);

    document.getElementById('recipe-form-overlay').style.display = 'flex';
}

export function deleteRecipe(id) {
    if (confirm("Delete this recipe?")) {
        let myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        myRecipes = myRecipes.filter(r => r.id !== id);
        localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
        renderMyRecipes();
    }
}

export function checkRowTyping(inputElement) {
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
