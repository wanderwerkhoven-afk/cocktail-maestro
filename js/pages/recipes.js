import { currentImageBase64, setCurrentImageBase64 } from '../core/state.js';
import { syncData } from '../core/auth.js';
import { t } from '../core/i18n.js';

export function openRecipeForm() {
    // 1. Reset de Save-knop naar de originele staat (Nieuw recept)
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> ${t('recipe-save')}`;
    saveBtn.onclick = saveNewRecipe;

    // 2. Maak alle tekstvelden leeg
    document.getElementById('recipe-name').value = "";
    document.getElementById('recipe-description').value = "";
    setRecipeMode('cocktail');
    if (document.getElementById('recipe-category')) document.getElementById('recipe-category').value = "";
    if (document.getElementById('recipe-glassware')) document.getElementById('recipe-glassware').value = "";
    if (document.getElementById('recipe-ice')) document.getElementById('recipe-ice').value = "";
    document.getElementById('recipe-method').value = "";

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

    // 5. Reset de instructies naar 1 lege rij
    const stepContainer = document.getElementById('instruction-steps-container');
    if (stepContainer) {
        stepContainer.innerHTML = "";
        addInstructionRow();
    }

    // 6. Update suggesties en toon overlay
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
    if (container.querySelectorAll('.ingredient-row').length > 1) {
        const row = btn.parentElement;
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        row.style.transition = 'all 0.3s ease';
        setTimeout(() => row.remove(), 300);
    } else {
        const row = btn.parentElement;
        row.querySelectorAll('input').forEach(input => input.value = "");
    }
}

export function addInstructionRow(content = '') {
    const container = document.getElementById('instruction-steps-container');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'instruction-row';
    
    row.innerHTML = `
        <div class="step-label">${t('card-step', [container.children.length + 1])}</div>
        <textarea placeholder="bijv. Shake alle ingrediënten..." oninput="window.checkStepTyping(this)">${content}</textarea>
        <button type="button" class="remove-step-btn" onclick="window.removeInstructionRow(this)">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;
    
    container.appendChild(row);
    updateInstructionNumbers();
}

export function removeInstructionRow(btn) {
    const container = document.getElementById('instruction-steps-container');
    if (container.querySelectorAll('.instruction-row').length > 1) {
        const row = btn.parentElement;
        row.remove();
        updateInstructionNumbers();
    } else {
        const row = btn.parentElement;
        row.querySelector('textarea').value = "";
    }
}

function updateInstructionNumbers() {
    const container = document.getElementById('instruction-steps-container');
    const rows = container.querySelectorAll('.instruction-row');
    rows.forEach((row, index) => {
        row.querySelector('.step-label').innerText = t('card-step', [index + 1]);
    });
}

export function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Optional: basic image type check (accept="image/*" already handles this mostly)
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Create a canvas for WebP conversion & resizing
            const canvas = document.createElement('canvas');
            
            // Set max dimensions to save localStorage space
            const MAX_SIZE = 800;
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
                if (width > MAX_SIZE) {
                    height = Math.round((height * MAX_SIZE) / width);
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width = Math.round((width * MAX_SIZE) / height);
                    height = MAX_SIZE;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // Export as WebP format with 85% quality
            const webpDataUrl = canvas.toDataURL('image/webp', 0.85);

            const display = document.getElementById('image-preview-display');
            const placeholder = document.getElementById('image-preview-placeholder');
            if (display && placeholder) {
                display.src = webpDataUrl; // Use webp for preview too
                display.style.display = 'block';
                placeholder.style.display = 'none';
            }
            // Save webp format to state
            setCurrentImageBase64(webpDataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

export function saveNewRecipe() {
    const name = document.getElementById('recipe-name').value.trim();
    const ingredients = getIngredientsFromForm();

    if (!name || ingredients.length === 0) {
        alert(t('recipe-alert-empty'));
        return;
    }

    const newRecipe = {
        id: 'user-' + Date.now(),
        name: name,
        type: document.getElementById('recipe-type')?.value || "cocktail",
        description: document.getElementById('recipe-description').value || "A custom masterpiece.",
        category: document.getElementById('recipe-category')?.value?.split(',').map(c => c.trim()).filter(c => c !== "") || ["Custom"],
        glassware: document.getElementById('recipe-glassware')?.value || "Standard Glass",
        ice: document.getElementById('recipe-ice')?.value || "None",
        ingredients: ingredients,
        method: document.getElementById('recipe-method').value || "Not specified",
        methodDesc: getInstructionsFromForm(),
        image: currentImageBase64 || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&h=400&auto=format&fit=crop"
    };

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    myRecipes.push(newRecipe);
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));

    // Sync to cloud if logged in
    syncData('recipes', myRecipes);

    finalizeSubmit(t('recipe-alert-added'));
}

export function updateRecipe(id) {
    let myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const index = myRecipes.findIndex(r => r.id === id);
    if (index === -1) return;

    const name = document.getElementById('recipe-name').value.trim();
    const ingredients = getIngredientsFromForm();

    if (!name || ingredients.length === 0) {
        alert(t('recipe-alert-req'));
        return;
    }

    myRecipes[index] = {
        id: id,
        name: name,
        type: document.getElementById('recipe-type')?.value || "cocktail",
        description: document.getElementById('recipe-description').value,
        category: document.getElementById('recipe-category')?.value?.split(',').map(c => c.trim()) || ["Custom"],
        glassware: document.getElementById('recipe-glassware')?.value || "Standard",
        ice: document.getElementById('recipe-ice')?.value || "None",
        ingredients: ingredients,
        method: document.getElementById('recipe-method').value,
        methodDesc: getInstructionsFromForm(),
        image: currentImageBase64
    };

    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));

    // Sync to cloud if logged in
    syncData('recipes', myRecipes);
    finalizeSubmit(t('recipe-alert-updated'));
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

function getInstructionsFromForm() {
    const container = document.getElementById('instruction-steps-container');
    const steps = [];
    container.querySelectorAll('textarea').forEach(tx => {
        if (tx.value.trim() !== "") {
            steps.push(tx.value.trim());
        }
    });
    return steps;
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
                <p>${t('recipe-empty-state')}</p>
            </div>`;
        return;
    }

    myRecipes.forEach(cocktail => {
        const cardHTML = window.createCocktailCardHTML(cocktail, {
            showEditBtn: true,
            showDeleteBtn: true,
            hideFavorite: true, // Favorites are for the Vault
            isNeutral: true     // No red/green status colors in Recipe Book
        });
        
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = cardHTML.trim();
        const cardElement = tempContainer.firstChild;
        
        grid.appendChild(cardElement);
    });
}

export function editRecipe(id) {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const cocktail = myRecipes.find(r => r.id === id);
    if (!cocktail) return;

    document.getElementById('recipe-name').value = cocktail.name;
    setRecipeMode(cocktail.type || "cocktail");
    document.getElementById('recipe-description').value = cocktail.description;
    if (document.getElementById('recipe-category')) document.getElementById('recipe-category').value = cocktail.category.join(', ');
    if (document.getElementById('recipe-glassware')) document.getElementById('recipe-glassware').value = cocktail.glassware || "";
    if (document.getElementById('recipe-ice')) document.getElementById('recipe-ice').value = cocktail.ice || "";
    document.getElementById('recipe-method').value = cocktail.method;
    
    // Populate instructions
    const stepContainer = document.getElementById('instruction-steps-container');
    stepContainer.innerHTML = '';
    if (Array.isArray(cocktail.methodDesc)) {
        cocktail.methodDesc.forEach(step => addInstructionRow(step));
    } else {
        // Fallback for legacy string format
        addInstructionRow(cocktail.methodDesc || "");
    }

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
    saveBtn.innerHTML = `<i class="fa-solid fa-check"></i> ${t('recipe-update')}`;
    saveBtn.onclick = () => updateRecipe(id);

    document.getElementById('recipe-form-overlay').style.display = 'flex';
}

export function deleteRecipe(id) {
    if (confirm(t('recipe-delete-confirm'))) {
        let myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        myRecipes = myRecipes.filter(r => r.id !== id);
        localStorage.setItem('myRecipes', JSON.stringify(myRecipes));

        // Sync to cloud if logged in
        syncData('recipes', myRecipes);
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

export function checkStepTyping(textarea) {
    const container = document.getElementById('instruction-steps-container');
    const rows = container.querySelectorAll('.instruction-row');
    const row = textarea.closest('.instruction-row');
    
    if (textarea.value.trim().length > 0) {
        if (row === rows[rows.length - 1]) {
            addInstructionRow();
        }
    }
}

export function setRecipeMode(mode) {
    const input = document.getElementById('recipe-type');
    if (input) input.value = mode;

    const cocktailPill = document.getElementById('recipe-pill-cocktail');
    const mocktailPill = document.getElementById('recipe-pill-mocktail');
    
    if (cocktailPill && mocktailPill) {
        cocktailPill.classList.toggle('active', mode === 'cocktail');
        mocktailPill.classList.toggle('active', mode === 'mocktail');
    }
}
