import { db } from "../core/firebase.js";
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Import local databases for migration
import { classicCocktails } from "../modules/database.js";
import { mocktailRecipes } from "../modules/mocktails.js";
import { kitchenItems } from "../modules/kitchen-db.js";
import { newsArticles } from "../modules/news-db.js";

let vaultData = [];
let kitchenData = [];

/**
 * Initialize Admin Page
 */
export async function initAdmin() {
    console.log("Initializing Admin Dashboard...");
    
    // Security check: Verify admin status again via server
    const { checkAdminStatus, auth } = await import("../core/auth.js");
    const isAdmin = await checkAdminStatus(auth.currentUser?.uid);
    
    if (!isAdmin) {
        console.error("Unauthorized access attempt to Admin Dashboard.");
        const { navigateTo } = await import("../core/navigation.js");
        navigateTo('home');
        return;
    }

    loadStats();
    switchAdminTab('dashboard');
}

/**
 * Switch between admin tabs
 */
window.switchAdminTab = (tabId) => {
    // Update bottom nav active state
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.classList.toggle('active', item.id === `admin-nav-${tabId}`);
    });

    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.toggle('active', section.id === `admin-${tabId}`);
    });

    // Load data based on tab
    if (tabId === 'database') switchDatabaseCategory('cocktail'); // Default to cocktails
    if (tabId === 'user-recipes') loadUserRecipes();
    if (tabId === 'todos') loadAdminTodos();
    if (tabId === 'news') loadNewsList();
};

/**
 * Database Sub-Category Switching
 */
let currentDbCategory = 'cocktail';
window.switchDatabaseCategory = (category) => {
    currentDbCategory = category;
    
    // Update pill UI
    document.querySelectorAll('.sub-nav-pill').forEach(pill => {
        pill.classList.toggle('active', pill.getAttribute('onclick').includes(`'${category}'`));
    });

    // Update the "Add New" button to match the category
    const addBtn = document.getElementById('admin-db-add-btn');
    addBtn.onclick = () => openAdminEditor(category);

    // Load appropriate data
    if (category === 'cocktail') loadDatabaseList('Cocktail-db', 'cocktail');
    else if (category === 'mocktail') loadDatabaseList('Mocktail-db', 'mocktail');
    else if (category === 'kitchen') loadDatabaseList('Kitchen-db', 'kitchen');
};

/**
 * Unified Database List Loader
 */
let currentDbData = [];
async function loadDatabaseList(collectionName, type) {
    const list = document.getElementById('admin-db-list');
    list.innerHTML = '<p class="placeholder-text">Laden uit cloud...</p>';

    try {
        const snap = await getDocs(collection(db, collectionName));
        currentDbData = snap.docs.map(d => ({ 
            ...d.data(), 
            firebaseId: d.id, 
            dbType: type 
        }));

        renderUnifiedDatabaseList(currentDbData);
    } catch (e) {
        list.innerHTML = `<p class="placeholder-text" style="color: #ff4757;">Fout bij laden: ${e.message}</p>`;
    }
}

function renderUnifiedDatabaseList(data) {
    const list = document.getElementById('admin-db-list');
    if (data.length === 0) {
        list.innerHTML = '<p class="placeholder-text">Geen items gevonden.</p>';
        return;
    }

    list.innerHTML = data.map(item => `
        <div class="admin-list-item">
            <div class="item-info">
                <strong>${item.name || item.title}</strong>
                <span>${item.dbType} • ${item.id}</span>
            </div>
            <div class="item-actions">
                <button class="icon-btn edit" onclick="openAdminEditor('${item.dbType}', '${item.firebaseId}')">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
        </div>
    `).join('');
}

window.filterAdminDatabase = (query) => {
    const q = query.toLowerCase();
    const filtered = currentDbData.filter(d => 
        (d.name || d.title || "").toLowerCase().includes(q) || 
        d.id.toLowerCase().includes(q)
    );
    renderUnifiedDatabaseList(filtered);
};

/**
 * Load Admin Todo List
 */
async function loadAdminTodos() {
    const list = document.getElementById('admin-todo-list');
    list.innerHTML = '<p class="placeholder-text">Laden...</p>';

    try {
        const q = query(collection(db, "admin-todos"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const todos = snap.docs.map(d => ({ ...d.data(), firebaseId: d.id }));

        if (todos.length === 0) {
            list.innerHTML = '<p class="placeholder-text">Geen taken meer! Lekker bezig. 🎉</p>';
            return;
        }

        list.innerHTML = todos.map(todo => `
            <div class="admin-list-item ${todo.completed ? 'completed' : ''}" style="opacity: ${todo.completed ? 0.5 : 1};">
                <div class="item-info" onclick="toggleTodoStatus('${todo.firebaseId}', ${todo.completed})" style="cursor: pointer; flex: 1;">
                    <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}; font-size: 1.1rem;">
                        ${todo.text}
                    </span>
                    <small style="color: var(--text-muted); font-size: 0.7rem;">${new Date(todo.createdAt?.seconds * 1000).toLocaleDateString()}</small>
                </div>
                <div class="item-actions">
                    <button class="icon-btn delete" onclick="deleteAdminTodo('${todo.firebaseId}')" style="color: #ff4757;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    } catch (e) {
        list.innerHTML = `<p class="placeholder-text" style="color: #ff4757;">Fout bij laden: ${e.message}</p>`;
    }
}

window.addAdminTodo = async () => {
    const input = document.getElementById('new-todo-input');
    const text = input.value.trim();
    if (!text) return;

    try {
        const { addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
        await addDoc(collection(db, "admin-todos"), {
            text,
            completed: false,
            createdAt: serverTimestamp()
        });
        input.value = '';
        loadAdminTodos();
    } catch (e) {
        alert("Fout bij toevoegen: " + e.message);
    }
};

window.toggleTodoStatus = async (id, currentStatus) => {
    try {
        const { updateDoc } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
        await updateDoc(doc(db, "admin-todos", id), {
            completed: !currentStatus
        });
        loadAdminTodos();
    } catch (e) {
        console.error("Error toggling todo:", e);
    }
};

window.deleteAdminTodo = async (id) => {
    if (!confirm("Weet je zeker dat je deze taak wilt verwijderen?")) return;
    try {
        await deleteDoc(doc(db, "admin-todos", id));
        loadAdminTodos();
    } catch (e) {
        console.error("Error deleting todo:", e);
    }
};

/**
 * Load Global Vault List
 */
async function loadVaultList() {
    const list = document.getElementById('admin-vault-list');
    list.innerHTML = '<p class="placeholder-text">Laden uit cloud...</p>';

    try {
        const cocktailsSnap = await getDocs(collection(db, "Cocktail-db"));
        const mocktailsSnap = await getDocs(collection(db, "Mocktail-db"));
        
        vaultData = [
            ...cocktailsSnap.docs.map(d => ({ ...d.data(), firebaseId: d.id, dbType: 'cocktail' })),
            ...mocktailsSnap.docs.map(d => ({ ...d.data(), firebaseId: d.id, dbType: 'mocktail' }))
        ];

        renderAdminVaultList(vaultData);
    } catch (e) {
        list.innerHTML = `<p class="placeholder-text" style="color: #ff4757;">Fout bij laden: ${e.message}</p>`;
    }
}

function renderAdminVaultList(data) {
    const list = document.getElementById('admin-vault-list');
    if (data.length === 0) {
        list.innerHTML = '<p class="placeholder-text">Geen items gevonden in de cloud.</p>';
        return;
    }

    list.innerHTML = data.map(item => `
        <div class="admin-list-item">
            <div class="item-info">
                <strong>${item.name}</strong>
                <span>${item.dbType} • ${item.id}</span>
            </div>
            <div class="item-actions">
                <button class="icon-btn edit" onclick="openAdminEditor('${item.dbType}', '${item.firebaseId}')">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Load Kitchen List
 */
async function loadKitchenList() {
    const list = document.getElementById('admin-kitchen-list');
    list.innerHTML = '<p class="placeholder-text">Laden uit cloud...</p>';

    try {
        const snap = await getDocs(collection(db, "Kitchen-db"));
        kitchenData = snap.docs.map(d => ({ ...d.data(), firebaseId: d.id }));

        if (kitchenData.length === 0) {
            list.innerHTML = '<p class="placeholder-text">Geen kitchen cards gevonden.</p>';
            return;
        }

        list.innerHTML = kitchenData.map(item => `
            <div class="admin-list-item">
                <div class="item-info">
                    <strong>${item.title}</strong>
                    <span>${item.category} • ${item.id}</span>
                </div>
                <div class="item-actions">
                    <button class="icon-btn edit" onclick="openAdminEditor('kitchen', '${item.firebaseId}')">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            </div>
        `).join('');
    } catch (e) {
        list.innerHTML = `<p class="placeholder-text" style="color: #ff4757;">Fout bij laden: ${e.message}</p>`;
    }
}

/**
 * Load News Articles List
 */
async function loadNewsList() {
    const list = document.getElementById('admin-news-list');
    if (!list) return;
    list.innerHTML = '<p class="placeholder-text">Laden uit cloud...</p>';

    try {
        const snap = await getDocs(collection(db, "news"));
        const news = snap.docs.map(d => ({ ...d.data(), firebaseId: d.id }));
        currentDbData = news; // Reuse for search/edit

        if (news.length === 0) {
            list.innerHTML = '<p class="placeholder-text">Geen nieuwsberichten gevonden.</p>';
            return;
        }

        list.innerHTML = news.map(item => `
            <div class="admin-list-item ${!item.active ? 'disabled' : ''}" style="opacity: ${item.active ? 1 : 0.6};">
                <div class="item-info">
                    <strong>${item.title}</strong>
                    <span>${item.badge || 'PROMO'} • ${item.firebaseId}</span>
                </div>
                <div class="item-actions">
                    <button class="icon-btn ${item.active ? 'toggle-on' : 'toggle-off'}" onclick="toggleNewsActive('${item.firebaseId}', ${item.active})" title="${item.active ? 'Deactiveren' : 'Activeren'}">
                        <i class="fa-solid ${item.active ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                    </button>
                    <button class="icon-btn edit" onclick="openAdminEditor('news', '${item.firebaseId}')">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            </div>
        `).join('');
    } catch (e) {
        list.innerHTML = `<p class="placeholder-text" style="color: #ff4757;">Fout bij laden: ${e.message}</p>`;
    }
}

window.toggleNewsActive = async (id, currentStatus) => {
    try {
        const { updateDoc } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
        await updateDoc(doc(db, "news", id), {
            active: !currentStatus
        });
        loadNewsList();
        
        // Refresh global news cache if needed
        const { fetchGlobalNews } = await import("../modules/news.js");
        if (fetchGlobalNews) fetchGlobalNews();
    } catch (e) {
        console.error("Error toggling news status:", e);
    }
};

/**
 * Load All User Recipes
 */
async function loadUserRecipes() {
    const list = document.getElementById('admin-user-recipes-list');
    list.innerHTML = '<p class="placeholder-text">Laden...</p>';

    try {
        const snap = await getDocs(collection(db, "users"));
        let allRecipes = [];
        snap.forEach(userDoc => {
            const data = userDoc.data();
            if (data.recipes && Array.isArray(data.recipes)) {
                data.recipes.forEach(r => {
                    allRecipes.push({
                        ...r,
                        author: data.displayName || data.email || "Onbekend",
                        authorUid: userDoc.id
                    });
                });
            }
        });

        if (allRecipes.length === 0) {
            list.innerHTML = '<p class="placeholder-text">Geen gebruikersrecepten gevonden.</p>';
            return;
        }

        list.innerHTML = allRecipes.map(r => `
            <div class="admin-list-item">
                <div class="item-info">
                    <strong>${r.name}</strong>
                    <span>Door: ${r.author}</span>
                </div>
                <div class="item-actions">
                    <button class="icon-btn" onclick="viewUserRecipe('${r.id}', '${r.authorUid}')">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
            </div>
        `).join('');
    } catch (e) {
        list.innerHTML = `<p class="placeholder-text" style="color: #ff4757;">Fout: ${e.message}</p>`;
    }
}

window.viewUserRecipe = async (recipeId, authorUid) => {
    try {
        const { db } = await import("../core/firebase.js");
        const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
        const userDoc = await getDoc(doc(db, "users", authorUid));
        
        if (userDoc.exists()) {
            const data = userDoc.data();
            const recipe = data.recipes.find(r => r.id === recipeId);
            if (recipe) {
                const { enlargeRecipe } = await import("../core/ui-utils.js");
                enlargeRecipe(null, recipe.id, recipe);
            }
        }
    } catch (err) {
        console.error("Error viewing user recipe:", err);
    }
};

/**
 * Admin Editor Logic
 */
window.openAdminEditor = (type, id = null) => {
    // Refresh ingredient suggestions
    if (window.updateIngredientSuggestions) {
        window.updateIngredientSuggestions();
    }

    const modal = document.getElementById('admin-editor-modal');
    const title = document.getElementById('admin-editor-title');
    const fields = document.getElementById('admin-editor-fields');
    const deleteBtn = document.getElementById('admin-delete-btn');
    
    document.getElementById('admin-edit-id').value = id || '';
    document.getElementById('admin-edit-type').value = type;
    
    title.innerText = id ? `Bewerk ${type}` : `Nieuwe ${type}`;
    deleteBtn.style.display = id ? 'block' : 'none';
    deleteBtn.onclick = () => deleteAdminItem(id, type);

    let item = null;
    if (id) {
        // Fix: Use currentDbData instead of vaultData/kitchenData
        item = currentDbData.find(d => d.firebaseId === id);
    }

    if (type === 'cocktail' || type === 'mocktail') {
        renderCocktailFields(fields, item);
    } else if (type === 'kitchen') {
        renderKitchenFields(fields, item);
    } else if (type === 'news') {
        renderNewsFields(fields, item);
    }

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
};

window.closeAdminEditor = () => {
    const modal = document.getElementById('admin-editor-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 400);
};

function renderCocktailFields(container, item) {
    const categories = ['spirit', 'liqueur', 'bitters', 'syrup', 'juice', 'fresh', 'tea'];
    
    container.innerHTML = `
        <div class="input-group">
            <label>Naam</label>
            <input type="text" name="name" value="${item?.name || ''}" placeholder="bijv. Espresso Martini" required>
        </div>

        <div class="input-group">
            <label>ID (Uniek, bijv. amaretto-sour)</label>
            <input type="text" name="id" value="${item?.id || ''}" placeholder="amaretto-sour" required>
        </div>

        <div class="input-group">
            <label>Beschrijving (Intro tekst)</label>
            <textarea name="description" placeholder="A perfectly balanced classic..." style="height: 80px;">${item?.description || ''}</textarea>
        </div>
        
        <div class="input-row-flex" style="display: flex; gap: 10px;">
            <div class="input-group" style="flex: 1;">
                <label>Categorieën (komma gescheiden)</label>
                <input type="text" name="category" value="${item?.category ? (Array.isArray(item.category) ? item.category.join(', ') : item.category) : ''}" placeholder="Sweet, Sour, Classic">
            </div>
            <div class="input-group" style="flex: 1;">
                <label>Methode</label>
                <input type="text" name="method" value="${item?.method || ''}" placeholder="Shaken">
            </div>
        </div>

        <div class="input-row-flex" style="display: flex; gap: 10px;">
            <div class="input-group" style="flex: 1;">
                <label>Glas</label>
                <input type="text" name="glassware" value="${item?.glassware || ''}" placeholder="Rocks glass">
            </div>
            <div class="input-group" style="flex: 1;">
                <label>IJs</label>
                <input type="text" name="ice" value="${item?.ice || ''}" placeholder="Large ice cube">
            </div>
        </div>

        <div class="input-group">
            <label>Afbeelding Pad</label>
            <input type="text" name="image" value="${item?.image || ''}" placeholder="./assets/Cocktails/amarettosour.webp">
        </div>

        <div class="input-group">
            <label>Ingrediënten</label>
            <div id="admin-ing-list" class="dynamic-rows-container">
                ${(item?.ingredients || []).map((ing, idx) => `
                    <div class="admin-ing-row dynamic-row complex">
                        <input type="number" step="any" class="ing-amount" placeholder="60" value="${ing.amount || ''}" style="width: 60px;">
                        <input type="text" class="ing-unit" placeholder="ml" value="${ing.unit || ''}" style="width: 50px;">
                        <select class="ing-category" style="width: 90px;">
                            ${categories.map(cat => `<option value="${cat}" ${ing.fridgeCategory === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                        </select>
                        <input type="text" class="ing-name" placeholder="Amaretto" value="${ing.name || ''}" list="ingredients-suggestions" style="flex: 1;">
                        <button type="button" class="row-remove-btn" onclick="this.parentElement.remove()"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `).join('')}
            </div>
            <button type="button" class="add-line-btn" onclick="addAdminIngRow()">
                <i class="fa-solid fa-plus"></i> Voeg Ingrediënt Toe
            </button>
        </div>

        <div class="input-group">
            <label>Bereiding (Stappen)</label>
            <div id="admin-step-list" class="dynamic-rows-container">
                ${(() => {
                    // Normalize steps from various possible formats
                    let steps = item?.steps || item?.instructions || [];
                    
                    // If it's a single string (legacy), try to split it into an array
                    if (typeof steps === 'string' && steps.trim() !== '') {
                        // Split by "Step X:" or "Stap X:" (case insensitive)
                        const parts = steps.split(/(?:Step|Stap)\s+\d+[:.]/i);
                        // Filter out empty parts and trim
                        steps = parts.map(p => p.trim()).filter(p => p.length > 0);
                        
                        // If splitting didn't work (no "Step X:" found), just wrap the whole thing
                        if (steps.length === 0) steps = [item.methodDesc || steps];
                    } else if (item?.methodDesc && (!steps || steps.length === 0)) {
                        // Check if methodDesc has Step markers
                        const parts = item.methodDesc.split(/(?:Step|Stap)\s+\d+[:.]/i);
                        steps = parts.map(p => p.trim()).filter(p => p.length > 0);
                        if (steps.length === 0) steps = [item.methodDesc];
                    }
                    
                    if (!Array.isArray(steps)) steps = [];

                    return steps.map((step, idx) => `
                        <div class="admin-step-row dynamic-row">
                            <span class="row-number">${idx + 1}.</span>
                            <textarea class="step-text" placeholder="Stap omschrijving...">${step}</textarea>
                            <button type="button" class="row-remove-btn" onclick="this.parentElement.remove()"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    `).join('');
                })()}
            </div>
            <button type="button" class="add-line-btn" onclick="addAdminStepRow()">
                <i class="fa-solid fa-plus"></i> Voeg Stap Toe
            </button>
        </div>
    `;
}

window.addAdminIngRow = () => {
    const list = document.getElementById('admin-ing-list');
    const categories = ['spirit', 'liqueur', 'bitters', 'syrup', 'juice', 'fresh', 'tea'];
    const div = document.createElement('div');
    div.className = 'admin-ing-row dynamic-row complex';
    div.innerHTML = `
        <input type="number" step="any" class="ing-amount" placeholder="60" style="width: 60px;">
        <input type="text" class="ing-unit" placeholder="ml" style="width: 50px;">
        <select class="ing-category" style="width: 90px;">
            ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
        </select>
        <input type="text" class="ing-name" placeholder="Amaretto" list="ingredients-suggestions" style="flex: 1;">
        <button type="button" class="row-remove-btn" onclick="this.parentElement.remove()"><i class="fa-solid fa-trash"></i></button>
    `;
    list.appendChild(div);
};

window.addAdminStepRow = () => {
    const list = document.getElementById('admin-step-list');
    const count = list.children.length + 1;
    const div = document.createElement('div');
    div.className = 'admin-step-row dynamic-row';
    div.innerHTML = `
        <span class="row-number">${count}.</span>
        <textarea class="step-text" placeholder="Giet in een shaker..."></textarea>
        <button type="button" class="row-remove-btn" onclick="this.parentElement.remove()"><i class="fa-solid fa-trash"></i></button>
    `;
    list.appendChild(div);
};

function renderKitchenFields(container, item) {
    container.innerHTML = `
        <div class="input-group">
            <label>Titel</label>
            <input type="text" name="title" value="${item?.title || ''}" placeholder="bijv. Shaking Technique" required>
        </div>
        <div class="input-row-flex" style="display: flex; gap: 10px;">
            <div class="input-group" style="flex: 1;">
                <label>ID</label>
                <input type="text" name="id" value="${item?.id || ''}" placeholder="shaking" required>
            </div>
            <div class="input-group" style="flex: 1;">
                <label>Categorie</label>
                <select name="category" style="width: 100%;">
                    <option value="Technieken" ${item?.category === 'Technieken' ? 'selected' : ''}>Technieken</option>
                    <option value="Producten" ${item?.category === 'Producten' ? 'selected' : ''}>Producten</option>
                    <option value="Gereedschap" ${item?.category === 'Gereedschap' ? 'selected' : ''}>Gereedschap</option>
                </select>
            </div>
        </div>
        <div class="input-group">
            <label>Omschrijving</label>
            <textarea name="description" rows="5" placeholder="Typ hier de uitleg...">${item?.description ? (Array.isArray(item.description) ? item.description.join('\n') : item.description) : ''}</textarea>
            <small style="color: #888;">Nieuwe regel = nieuwe alinea op de kaart.</small>
        </div>
        <div class="input-group">
            <label>Afbeelding Pad</label>
            <input type="text" name="image" value="${item?.image || ''}" placeholder="./assets/Kitchen/xxx.webp">
        </div>
    `;
}

function renderNewsFields(container, item) {
    container.innerHTML = `
        <div class="input-group">
            <label>Titel</label>
            <input type="text" name="title" value="${item?.title || ''}" placeholder="bijv. Koningsdag 2026" required>
        </div>
        <div class="input-group">
            <label>Tagline (Home subtitle)</label>
            <input type="text" name="tagline" value="${item?.tagline || ''}" placeholder="De koninklijke gids voor cocktails.">
        </div>
        <div class="input-row-flex" style="display: flex; gap: 10px;">
            <div class="input-group" style="flex: 1;">
                <label>Badge</label>
                <input type="text" name="badge" value="${item?.badge || 'PROMO'}" placeholder="PROMO">
            </div>
            <div class="input-group" style="flex: 1;">
                <label>Status</label>
                <select name="active">
                    <option value="true" ${item?.active !== false ? 'selected' : ''}>Actief</option>
                    <option value="false" ${item?.active === false ? 'selected' : ''}>Gedeactiveerd</option>
                </select>
            </div>
        </div>
        <div class="input-group">
            <label>Afbeelding Pad</label>
            <input type="text" name="image" value="${item?.image || ''}" placeholder="assets/promos/xxx.webp">
        </div>
        <div class="input-group">
            <label>Artikel Inhoud (HTML toegestaan)</label>
            <textarea name="content" rows="10" placeholder="Typ hier de volledige tekst van het artikel...">${item?.content || ''}</textarea>
        </div>
        <div class="input-group">
            <label>Button Actie (Optioneel)</label>
            <input type="text" name="buttonAction" value="${item?.buttonAction || ''}" placeholder="window.location.href='Mini game/index.html'">
            <small style="color: #888;">Laat leeg for standaard "Lees Artikel" gedrag.</small>
        </div>
    `;
}

window.saveAdminItem = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const id = document.getElementById('admin-edit-id').value;
    const type = document.getElementById('admin-edit-type').value;
    
    const itemData = {};
    formData.forEach((value, key) => {
        if (key === 'category' && (type === 'cocktail' || type === 'mocktail')) {
            itemData[key] = value.split(',').map(s => s.trim());
        } else {
            itemData[key] = value;
        }
    });

    // Special handling for dynamic rows (Ingredients & Steps)
    if (type === 'cocktail' || type === 'mocktail') {
        const ingRows = document.querySelectorAll('.admin-ing-row');
        itemData.ingredients = Array.from(ingRows).map(row => {
            const amountInput = row.querySelector('.ing-amount');
            const unitInput = row.querySelector('.ing-unit');
            const catSelect = row.querySelector('.ing-category');
            const nameInput = row.querySelector('.ing-name');
            const nameVal = nameInput.value.trim();
            
            const ingObj = {
                amount: amountInput.value ? parseFloat(amountInput.value) : null,
                unit: unitInput.value.trim(),
                fridgeCategory: catSelect.value,
                name: nameVal
            };

            // Auto-link kitchen ID if it matches a known kitchen item
            if (window.kitchenItems && Array.isArray(window.kitchenItems)) {
                const match = window.kitchenItems.find(k => 
                    (k.title && k.title.toLowerCase() === nameVal.toLowerCase()) || 
                    (k.id && k.id.toLowerCase() === nameVal.toLowerCase())
                );
                if (match && match.id) {
                    ingObj.kitchenId = match.id;
                }
            }
            
            return ingObj;
        }).filter(ing => ing.name !== '');

        const stepRows = document.querySelectorAll('.admin-step-row');
        const steps = Array.from(stepRows).map(row => row.querySelector('.step-text').value.trim()).filter(s => s !== '');
        
        itemData.steps = steps;
        itemData.methodDesc = steps; // Maintain for legacy compatibility in Vault
    }

    if (type === 'mocktail') itemData.isMocktail = true;

    try {
        const collectionName = type === 'cocktail' ? 'Cocktail-db' : (type === 'mocktail' ? 'Mocktail-db' : (type === 'news' ? 'news' : 'Kitchen-db'));
        const docId = id || itemData.name || itemData.title || itemData.id;
        
        // Convert active string to boolean
        if (itemData.active) itemData.active = itemData.active === 'true';
        
        await setDoc(doc(db, collectionName, docId), itemData);
        
        // Refresh the global cloud cache so the rest of the app sees the changes
        const { fetchGlobalDatabases } = await import("../core/auth.js");
        await fetchGlobalDatabases();

        const { showToast } = await import("../core/ui-utils.js");
        showToast("Opgeslagen naar cloud!", "success");
        closeAdminEditor();
        
        // Refresh appropriate list
        if (type === 'kitchen') loadKitchenList();
        else if (type === 'news') loadNewsList();
        else loadVaultList();
        
        loadStats();
    } catch (err) {
        alert("Fout bij opslaan: " + err.message);
    }
};

async function deleteAdminItem(id, type) {
    if (!confirm(`Weet je zeker dat je dit item wilt verwijderen uit de cloud?`)) return;

    try {
        const collectionName = type === 'cocktail' ? 'Cocktail-db' : (type === 'mocktail' ? 'Mocktail-db' : 'Kitchen-db');
        await deleteDoc(doc(db, collectionName, id));
        
        // Refresh the global cloud cache
        const { fetchGlobalDatabases } = await import("../core/auth.js");
        await fetchGlobalDatabases();

        const { showToast } = await import("../core/ui-utils.js");
        showToast("Item verwijderd!", "success");
        closeAdminEditor();
        
        if (type === 'kitchen') loadKitchenList();
        else if (type === 'news') loadNewsList();
        else loadVaultList();
        
        loadStats();
    } catch (err) {
        alert("Fout bij verwijderen: " + err.message);
    }
}

window.filterAdminList = (type, query) => {
    const q = query.toLowerCase();
    if (type === 'recipes') {
        const filtered = vaultData.filter(d => 
            d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)
        );
        renderAdminVaultList(filtered);
    }
};

/**
 * Migration Logic
 */
window.startMigration = async (type) => {
    const log = document.getElementById('migration-log');
    log.style.display = 'block';
    log.innerHTML = `<div style="color: #ffb347;">> Starting migration for ${type}...</div>`;

    let data = [];
    let collectionName = "";
    
    if (type === 'cocktails') {
        data = classicCocktails;
        collectionName = "Cocktail-db";
    } else if (type === 'mocktails') {
        data = mocktailRecipes;
        collectionName = "Mocktail-db";
    } else if (type === 'kitchen') {
        data = kitchenItems;
        collectionName = "Kitchen-db";
    } else if (type === 'news') {
        data = newsArticles;
        collectionName = "news";
    }

    let count = 0;
    for (const item of data) {
        try {
            // Use name (or title) as document ID as requested
            const docId = item.name || item.title || item.id;
            await setDoc(doc(db, collectionName, docId), item);
            
            const p = document.createElement('div');
            p.style.color = '#2ed573';
            p.innerText = `> Migrated: ${docId}`;
            log.appendChild(p);
            log.scrollTop = log.scrollHeight;
            count++;
        } catch (e) {
            const p = document.createElement('div');
            p.style.color = '#ff4757';
            p.innerText = `> Error migrating ${item.name || item.id}: ${e.message}`;
            log.appendChild(p);
        }
    }

    const final = document.createElement('div');
    final.style.color = '#ffb347';
    final.style.marginTop = '10px';
    final.innerText = `> FINISHED. Migrated ${count} items to ${collectionName}.`;
    log.appendChild(final);
    
    loadStats(); // Refresh stats
};

let favChartInstance = null;
let usageChartInstance = null;

async function loadStats() {
    try {
        const usersSnap = await getDocs(collection(db, "users"));
        document.getElementById('stat-users').innerText = usersSnap.size;

        // Count items in cloud collections
        const cocktailSnap = await getDocs(collection(db, "Cocktail-db"));
        const mocktailSnap = await getDocs(collection(db, "Mocktail-db"));
        document.getElementById('stat-vault').innerText = cocktailSnap.size + mocktailSnap.size;
        
        let totalUserRecipes = 0;
        let favoriteCounts = {};
        let activeDates = {};

        usersSnap.forEach(doc => {
            const data = doc.data();
            if (data.recipes) totalUserRecipes += data.recipes.length;

            if (data.favorites) {
                data.favorites.forEach(favId => {
                    favoriteCounts[favId] = (favoriteCounts[favId] || 0) + 1;
                });
            }

            if (data.updatedAt) {
                const date = data.updatedAt.split('T')[0];
                activeDates[date] = (activeDates[date] || 0) + 1;
            }
        });
        document.getElementById('stat-user-recipes').innerText = totalUserRecipes;

        // Collect names for favorites
        let idToNameMap = {};
        cocktailSnap.docs.forEach(d => idToNameMap[d.id] = d.data().name);
        mocktailSnap.docs.forEach(d => idToNameMap[d.id] = d.data().name);

        const sortedFavs = Object.entries(favoriteCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        
        const favLabels = sortedFavs.map(f => idToNameMap[f[0]] || f[0]);
        const favData = sortedFavs.map(f => f[1]);

        renderFavoritesChart(favLabels, favData);
        renderUsageChart(activeDates);

    } catch (e) {
        console.error("Error loading admin stats:", e);
    }
}

function renderFavoritesChart(labels, data) {
    if (typeof Chart === 'undefined') {
        setTimeout(() => renderFavoritesChart(labels, data), 500); // Wait for Chart.js to load
        return;
    }
    const canvas = document.getElementById('favorites-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (favChartInstance) favChartInstance.destroy();
    
    favChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Aantal Favorieten',
                data: data,
                backgroundColor: 'rgba(255, 179, 71, 0.6)',
                borderColor: 'rgba(255, 179, 71, 1)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#aaa' }, grid: { display: false } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw + ' gebruikers';
                        }
                    }
                }
            }
        }
    });
}

function renderUsageChart(dateCounts) {
    if (typeof Chart === 'undefined') {
        setTimeout(() => renderUsageChart(dateCounts), 500); // Wait for Chart.js to load
        return;
    }
    const canvas = document.getElementById('usage-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const labels = [];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        labels.push(d.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric' }));
        data.push(dateCounts[dateStr] || 0);
    }

    if (usageChartInstance) usageChartInstance.destroy();
    
    usageChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Actieve Gebruikers',
                data: data,
                backgroundColor: 'rgba(46, 213, 115, 0.2)',
                borderColor: '#2ed573',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#2ed573'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#aaa' }, grid: { display: false } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}
