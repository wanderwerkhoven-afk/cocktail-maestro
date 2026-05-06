import { db } from "../core/firebase.js";
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Import local databases for migration
import { classicCocktails } from "../modules/database.js";
import { mocktailRecipes } from "../modules/mocktails.js";
import { workshopCocktails } from "../modules/workshop-db.js";
import { kitchenItems } from "../modules/kitchen-db.js";
import { newsArticles } from "../modules/news-db.js";

let vaultData = [];
let kitchenData = [];
let workshopProducts = [];
let marginAnalysisChart = null;

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
    
    // For the workshop tool, we only use the curated workshop database
    window.workshopRecipes = workshopCocktails;
    window.mocktailRecipes = mocktailRecipes; // Keep for other uses
    window.classicCocktails = classicCocktails; // Keep for migration
    
    loadWorkshopList(); // Pre-load workshops
    loadProductList(); // Pre-load products for calculator
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
    if (tabId === 'dashboard') loadStats();
    if (tabId === 'database') switchDatabaseCategory('cocktail'); // Default to cocktails
    if (tabId === 'tools') switchToolsCategory('todo');
    if (tabId === 'news') loadNewsList();
};

window.switchToolsCategory = (category) => {
    document.querySelectorAll('.tool-content-section').forEach(sec => sec.style.display = 'none');
    document.querySelectorAll('#admin-tools .sub-nav-pill').forEach(pill => pill.classList.remove('active'));
    
    document.getElementById(`tool-${category}-content`).style.display = 'block';
    document.getElementById(`tool-pill-${category}`).classList.add('active');
    
    if (category === 'workshop') loadWorkshopList();
    if (category === 'products') loadProductList();
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
 * Tools Sub-Category Switching
 */
window.switchToolsCategory = (category) => {
    // Update pill UI
    document.querySelectorAll('#admin-tools .sub-nav-pill').forEach(pill => {
        pill.classList.toggle('active', pill.id === `tool-pill-${category}`);
    });

    // Update content sections
    document.querySelectorAll('.tool-content-section').forEach(section => {
        section.style.display = section.id === `tool-${category}-content` ? 'block' : 'none';
    });

    // Load data if needed
    if (category === 'todo') loadAdminTodos();
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
        // Try to get news articles
        const snap = await getDocs(collection(db, "news"));
        let news = snap.docs.map(d => ({ ...d.data(), firebaseId: d.id }));

        // If some items don't have an 'order' field, assign one and save back
        let needsOrderFix = false;
        news.forEach((item, idx) => {
            if (item.order === undefined) {
                item.order = idx;
                needsOrderFix = true;
            }
        });

        if (needsOrderFix) {
            console.log("Fixing missing order fields...");
            const { writeBatch } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
            const batch = writeBatch(db);
            news.forEach(item => {
                batch.update(doc(db, "news", item.firebaseId), { order: item.order });
            });
            await batch.commit();
        }

        // Now sort locally to ensure correct display
        news.sort((a, b) => a.order - b.order);
        currentDbData = news;

        if (news.length === 0) {
            list.innerHTML = '<p class="placeholder-text">Geen nieuwsberichten gevonden.</p>';
            return;
        }

        list.innerHTML = news.map((item, index) => `
            <div class="admin-list-item ${!item.active ? 'disabled' : ''}" 
                 draggable="true" 
                 data-index="${index}"
                 ondragstart="window.handleDragStart(event, ${index})"
                 ondragover="window.handleDragOver(event)"
                 ondrop="window.handleDrop(event, ${index})"
                 style="opacity: ${item.active ? 1 : 0.6}; cursor: grab;">
                
                <div class="drag-handle" 
                     ontouchstart="window.handleTouchStart(event, ${index})"
                     style="margin-right: 15px; color: var(--text-muted); cursor: grab; padding: 10px;">
                    <i class="fa-solid fa-grip-lines"></i>
                </div>

                <div class="item-info">
                    <strong>${item.title}</strong>
                    <span>${item.badge || 'PROMO'} • ${item.firebaseId}</span>
                </div>
                <div class="item-actions">
                    <button class="icon-btn preview" onclick="handleNewsPreview('${item.firebaseId}')" title="In preview tonen">
                        <i class="fa-solid fa-eye"></i>
                    </button>
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

// Drag & Drop Logic
let draggedIndex = null;

window.handleDragStart = (e, index) => {
    draggedIndex = index;
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.4';
};

window.handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
};

// Touch Drag Logic
let touchTargetIndex = null;

window.handleTouchStart = (e, index) => {
    draggedIndex = index;
    const item = e.target.closest('.admin-list-item');
    if (item) {
        item.classList.add('dragging-mobile');
    }
    // Add temporary event listeners for move and end
    window.addEventListener('touchmove', window.handleTouchMove, { passive: false });
    window.addEventListener('touchend', window.handleTouchEnd);
};

window.handleTouchMove = (e) => {
    // Prevent scrolling while dragging
    e.preventDefault();
    
    const touch = e.touches[0];
    const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
    const listItem = targetEl?.closest('.admin-list-item');
    
    // Clear previous highlights
    document.querySelectorAll('.admin-list-item').forEach(item => {
        item.classList.remove('drop-target-highlight');
    });
    
    if (listItem) {
        listItem.classList.add('drop-target-highlight');
        touchTargetIndex = parseInt(listItem.getAttribute('data-index'));
    } else {
        touchTargetIndex = null;
    }
};

window.handleTouchEnd = (e) => {
    // Remove temporary listeners
    window.removeEventListener('touchmove', window.handleTouchMove);
    window.removeEventListener('touchend', window.handleTouchEnd);
    
    document.querySelectorAll('.admin-list-item').forEach(item => {
        item.classList.remove('dragging-mobile', 'drop-target-highlight');
    });

    if (draggedIndex !== null && touchTargetIndex !== null && draggedIndex !== touchTargetIndex) {
        reorderNewsItems(draggedIndex, touchTargetIndex);
    }
    
    draggedIndex = null;
    touchTargetIndex = null;
};

window.handleNewsPreview = (id) => {
    const item = currentDbData.find(d => d.firebaseId === id);
    if (item && window.previewArticleInAdmin) {
        window.previewArticleInAdmin(item);
    }
};

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

window.handleDrop = async (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    reorderNewsItems(draggedIndex, targetIndex);
};

async function reorderNewsItems(fromIndex, toIndex) {
    const news = [...currentDbData];
    const draggedItem = news.splice(fromIndex, 1)[0];
    news.splice(toIndex, 0, draggedItem);

    // Save all to Firestore
    try {
        const { writeBatch } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
        const batch = writeBatch(db);
        
        news.forEach((item, idx) => {
            const docRef = doc(db, "news", item.firebaseId);
            batch.update(docRef, { order: idx });
        });

        await batch.commit();
        loadNewsList();
    } catch (err) {
        console.error("Error saving new order:", err);
    }
}

/**
 * Load All User Recipes
 */
async function loadUserRecipes(usersSnap = null) {
    const list = document.getElementById('admin-user-recipes-list');
    if (!list) return;
    list.innerHTML = '<p class="placeholder-text">Laden...</p>';

    try {
        const snap = usersSnap || await getDocs(collection(db, "users"));
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
    setTimeout(() => {
        modal.classList.add('show');
        upgradeSelects(fields);
    }, 10);
};

function upgradeSelects(container) {
    container.querySelectorAll('select').forEach(select => {
        upgradeToMaestroSelect(select);
    });
}

function upgradeToMaestroSelect(select) {
    if (select.closest('.maestro-select-container')) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'maestro-select-container';
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    
    select.style.display = 'none';
    
    const selectedText = select.options[select.selectedIndex]?.text || '-- Maak een keuze --';
    
    const trigger = document.createElement('div');
    trigger.className = 'maestro-select-trigger';
    trigger.innerHTML = `<span class="selected-value">${selectedText}</span><i class="fa-solid fa-chevron-down"></i>`;
    trigger.onclick = (e) => {
        e.stopPropagation();
        toggleMaestroDropdown(trigger);
    };
    
    const dropdown = document.createElement('div');
    dropdown.className = 'maestro-select-dropdown';
    
    const search = document.createElement('input');
    search.type = 'text';
    search.className = 'maestro-select-search';
    search.placeholder = 'Zoeken...';
    search.onkeyup = () => filterMaestroDropdown(search);
    if (select.options.length < 8) search.style.display = 'none';
    
    const optionsCont = document.createElement('div');
    optionsCont.className = 'maestro-select-options';
    
    Array.from(select.options).forEach(opt => {
        const mOpt = document.createElement('div');
        mOpt.className = 'maestro-option' + (opt.selected ? ' selected' : '');
        mOpt.innerHTML = `<span>${opt.text}</span>`;
        mOpt.setAttribute('data-name', opt.text.toLowerCase());
        
        // Carry over any category data if present (for workshop tool)
        if (opt.getAttribute('data-category')) {
            const cat = opt.getAttribute('data-category');
            mOpt.innerHTML += `<span class="option-category">${cat}</span>`;
        }
        
        mOpt.onclick = (e) => {
            e.stopPropagation();
            select.value = opt.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            trigger.querySelector('.selected-value').innerText = opt.text;
            wrapper.classList.remove('open');
            optionsCont.querySelectorAll('.maestro-option').forEach(o => o.classList.remove('selected'));
            mOpt.classList.add('selected');
        };
        optionsCont.appendChild(mOpt);
    });
    
    dropdown.appendChild(search);
    dropdown.appendChild(optionsCont);
    wrapper.appendChild(trigger);
    wrapper.appendChild(dropdown);
}

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
    upgradeSelects(div);
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
            <input type="text" name="buttonAction" value="${item?.buttonAction || ''}" placeholder="window.location.href='mini-game/game_index.html'">
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
        if (itemData.active !== undefined) {
            itemData.active = itemData.active === 'true' || itemData.active === true;
        }

        // For news, assign an order if it's a new item
        if (type === 'news' && itemData.order === undefined) {
            itemData.order = currentDbData.length;
        }
        
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
        loadUserRecipes(usersSnap);

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

/**
 * WORKSHOP MANAGEMENT
 */
let workshopData = [];

async function loadWorkshopList() {
    const list = document.getElementById('admin-workshop-list');
    if (!list) return;

    try {
        const { collection, getDocs, query, orderBy } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
        const q = query(collection(db, "workshops"), orderBy("date", "desc"));
        const snap = await getDocs(q);
        
        workshopData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderWorkshopList();
    } catch (e) {
        console.error("Error loading workshops:", e);
        list.innerHTML = `<p class="placeholder-text" style="color: #ff4757;">Fout bij laden: ${e.message}</p>`;
    }
}

function renderWorkshopList() {
    const list = document.getElementById('admin-workshop-list');
    if (workshopData.length === 0) {
        list.innerHTML = '<p class="placeholder-text">Geen workshops gevonden.</p>';
        return;
    }

    list.className = 'admin-workshop-grid';
    list.innerHTML = workshopData.map(ws => {
        const date = new Date(ws.date);
        const isPast = date < new Date().setHours(0,0,0,0);
        
        // Find names of recipes in rounds
        const allRecipes = [...window.workshopRecipes || []];
        const menuNames = (ws.rounds || []).map(r => {
            const recipe = allRecipes.find(rec => rec.id === r.recipeId);
            return recipe ? recipe.name : 'Onbekend';
        }).filter((v, i, a) => a.indexOf(v) === i); // Unique names

        return `
            <div class="workshop-card ${isPast ? 'past' : ''}" onclick="openWorkshopEditor('${ws.id}')">
                <div class="card-status-badge">${isPast ? 'Voltooid' : 'Aankomend'}</div>
                
                <div class="card-header">
                    <div class="card-date">
                        <span class="day">${date.getDate()}</span>
                        <span class="month">${date.toLocaleString('nl-NL', { month: 'short' })}</span>
                    </div>
                    <div class="card-title-group">
                        <h3 class="card-title">${ws.name}</h3>
                        <span class="card-client"><i class="fa-solid fa-user-tie"></i> ${ws.client || 'Particulier'}</span>
                    </div>
                </div>

                <div class="card-stats-row">
                    <div class="stat-pill">
                        <i class="fa-solid fa-users"></i>
                        <span>${ws.people} <small>pers.</small></span>
                    </div>
                    <div class="stat-pill">
                        <i class="fa-solid fa-droplet-slash"></i>
                        <span>${ws.people00 || 0} <small>0.0%</small></span>
                    </div>
                </div>

                ${ws.allergies ? `
                    <div class="card-allergies">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <span>${ws.allergies}</span>
                    </div>
                ` : ''}

                <div class="card-menu">
                    ${menuNames.map(name => `<span class="menu-tag">${name}</span>`).join('')}
                </div>

                <div class="card-footer">
                    <div class="footer-stat">
                        <label>Inkoop</label>
                        <span class="cost">€ ${(ws.totalCosts || 0).toFixed(2)}</span>
                    </div>
                    <div class="footer-stat">
                        <label>Factuur</label>
                        <span class="revenue">€ ${(ws.totalRevenue || 0).toFixed(2)}</span>
                    </div>
                    <div class="footer-stat profit">
                        <label>Marge</label>
                        <span>€ ${( (ws.totalRevenue || 0) - (ws.totalCosts || 0) ).toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="card-edit-hint">Klik om te bewerken <i class="fa-solid fa-arrow-right"></i></div>
            </div>
        `;
    }).join('');
}

function openWorkshopEditor(id = null) {
    console.log("Opening Workshop Editor...", id);
    const modal = document.getElementById('workshop-editor-modal');
    const form = document.getElementById('workshop-editor-form');
    const title = document.getElementById('workshop-editor-title');
    const deleteBtn = document.getElementById('ws-delete-btn');
    
    if (!modal || !form) {
        console.error("Workshop modal or form not found!");
        return;
    }
    
    form.reset();
    const editIdEl = document.getElementById('workshop-edit-id');
    if (editIdEl) editIdEl.value = id || '';
    
    const roundsContainer = document.getElementById('workshop-rounds-container');
    if (roundsContainer) roundsContainer.innerHTML = '';
    
    switchWorkshopFormTab('basic');

    if (id) {
        const ws = workshopData.find(w => w.id === id);
        title.innerText = 'Workshop Bewerken';
        if (deleteBtn) {
            deleteBtn.style.display = 'block';
            deleteBtn.onclick = () => deleteWorkshop(id);
        }

        document.getElementById('ws-name').value = ws.name;
        document.getElementById('ws-date').value = ws.date;
        document.getElementById('ws-people').value = ws.people;
        document.getElementById('ws-people-00').value = ws.people00 || 0;
        document.getElementById('ws-client').value = ws.client || '';
        document.getElementById('ws-location').value = ws.location || '';
        document.getElementById('ws-price-pp').value = ws.pricePp || 35;
        document.getElementById('ws-price-00-pp').value = ws.price00Pp || 25;
        document.getElementById('ws-allergies').value = ws.allergies || '';
        document.getElementById('ws-prep-notes').value = ws.prepNotes || '';

        if (ws.rounds && ws.rounds.length > 0) {
            ws.rounds.forEach(round => addWorkshopRound(round));
        }
    } else {
        title.innerText = 'Nieuwe Workshop';
        if (deleteBtn) deleteBtn.style.display = 'none';
        document.getElementById('ws-date').valueAsDate = new Date();
        addWorkshopRound(); // Start with one round
    }

    modal.classList.add('show');
    calculateWorkshopTotals();
}

function closeWorkshopEditor() {
    const modal = document.getElementById('workshop-editor-modal');
    if (modal) modal.classList.remove('show');
}

function switchWorkshopFormTab(tab) {
    document.querySelectorAll('.form-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.form-tab-btn').forEach(b => b.classList.remove('active'));
    
    const targetTab = document.getElementById(`workshop-tab-${tab}`);
    if (targetTab) targetTab.classList.add('active');
    
    const targetBtn = document.querySelector(`.form-tab-btn[onclick*="${tab}"]`);
    if (targetBtn) targetBtn.classList.add('active');
}

/**
 * Helpers
 */
function getAllWorkshopIngredients() {
    const ingredients = new Set();
    const allRecipes = [
        ...window.workshopRecipes || []
    ];
    
    allRecipes.forEach(recipe => {
        if (recipe.ingredients) {
            recipe.ingredients.forEach(ing => {
                const name = typeof ing === 'object' ? ing.name : ing;
                if (name) ingredients.add(name);
            });
        }
    });
    
    return Array.from(ingredients).sort();
}

window.updateProductUnitHint = (unit) => {
    const labels = document.querySelectorAll('.label-size-vol');
    labels.forEach(label => {
        if (unit === 'ml') label.innerText = 'Vol. (ml)';
        else if (unit === 'pcs') label.innerText = 'Aantal (stuks)';
        else if (unit === 'dash') label.innerText = 'Dashes';
        else if (unit === 'sprig') label.innerText = 'Takjes';
        else label.innerText = 'Inhoud';
    });
};

window.addProductSizeRow = (data = null) => {
    const container = document.getElementById('product-sizes-list');
    if (!container) return;
    
    const row = document.createElement('div');
    row.className = 'admin-form-row product-size-row';
    row.style.marginBottom = '10px';
    
    row.innerHTML = `
        <div class="admin-form-group" style="flex: 1;">
            <label class="label-size-vol">Vol. (ml)</label>
            <input type="number" class="size-volume" value="${data ? data.volume : 700}" min="1">
        </div>
        <div class="admin-form-group" style="flex: 1;">
            <label>Prijs (€)</label>
            <input type="number" class="size-price" value="${data ? data.price : 15.00}" step="0.01" min="0">
        </div>
        <button type="button" class="remove-size-btn" onclick="this.closest('.product-size-row').remove()" style="background: none; border: none; color: #ff4757; cursor: pointer; margin-top: 30px; font-size: 1.2rem;">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    `;
    container.appendChild(row);
    window.updateProductUnitHint(document.getElementById('prod-unit').value);
};

/**
 * PRODUCT MANAGEMENT
 */
async function loadProductList() {
    const list = document.getElementById('admin-product-list');
    if (!list) return;

    try {
        const q = query(collection(db, "workshop_products"), orderBy("name", "asc"));
        const snap = await getDocs(q);
        
        workshopProducts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderProductList();
    } catch (e) {
        console.error("Error loading products:", e);
        list.innerHTML = `<p class="placeholder-text" style="color: #ff4757;">Fout bij laden: ${e.message}</p>`;
    }
}

function renderProductList(data = null) {
    const list = document.getElementById('admin-product-list');
    const items = data || workshopProducts;

    if (items.length === 0) {
        list.innerHTML = '<p class="placeholder-text">Geen producten gevonden.</p>';
        return;
    }

    list.className = 'admin-workshop-grid';
    list.innerHTML = items.map(prod => {
        const unitLabel = prod.unit === 'ml' ? 'per fles' : 'per stuk';
        return `
            <div class="workshop-card" onclick="openProductEditor('${prod.id}')" style="gap: 10px; padding: 20px;">
                <div class="card-status-badge" style="background: rgba(255, 179, 71, 0.1); color: var(--accent-secondary);">${prod.category}</div>
                <h3 class="card-title" style="font-size: 1.1rem;">${prod.name}</h3>
                <div class="card-stats-row">
                    <div class="stat-pill">
                        <i class="fa-solid fa-box-open"></i>
                        <span>${prod.volume} <small>${prod.unit}</small></span>
                    </div>
                    <div class="stat-pill">
                        <i class="fa-solid fa-tag"></i>
                        <span>€ ${prod.price.toFixed(2)} <small>${unitLabel}</small></span>
                    </div>
                </div>
                <div class="card-edit-hint">Bewerken <i class="fa-solid fa-pen"></i></div>
            </div>
        `;
    }).join('');
}

window.openProductEditor = (id = null) => {
    const modal = document.getElementById('product-editor-modal');
    const form = document.getElementById('product-editor-form');
    const title = document.getElementById('product-editor-title');
    const deleteBtn = document.getElementById('product-delete-btn');
    const selectContainer = document.getElementById('product-name-select-container');
    
    form.reset();
    document.getElementById('product-edit-id').value = id || '';
    
    // Create searchable select for ingredients
    const ingredients = getAllWorkshopIngredients();
    const currentName = id ? workshopProducts.find(p => p.id === id)?.name : '';
    
    selectContainer.innerHTML = `
        <select id="prod-name-select" class="ws-round-recipe">
            <option value="">-- Typ handmatig of kies uit lijst --</option>
            ${ingredients.map(ing => `<option value="${ing}" ${ing === currentName ? 'selected' : ''}>${ing}</option>`).join('')}
        </select>
        <div class="manual-name-input" style="margin-top: 10px; ${id ? 'display: none;' : ''}">
            <input type="text" id="prod-name-manual" placeholder="Of typ hier een nieuwe naam..." value="${currentName}">
        </div>
    `;
    
    const select = document.getElementById('prod-name-select');
    select.onchange = () => {
        const manualInput = document.getElementById('prod-name-manual');
        if (select.value === "") {
            manualInput.parentElement.style.display = 'block';
        } else {
            manualInput.parentElement.style.display = 'none';
            manualInput.value = select.value;
        }
    };
    
    upgradeToMaestroSelect(select);

    if (id) {
        const prod = workshopProducts.find(p => p.id === id);
        title.innerText = 'Product Bewerken';
        deleteBtn.style.display = 'block';

        document.getElementById('prod-category').value = prod.category;
        document.getElementById('prod-unit').value = prod.unit;
        
        const sizeContainer = document.getElementById('product-sizes-list');
        sizeContainer.innerHTML = '';
        if (prod.sizes && prod.sizes.length > 0) {
            prod.sizes.forEach(size => addProductSizeRow(size));
        } else {
            // Backward compatibility for old single-size products
            addProductSizeRow({ volume: prod.volume, price: prod.price });
        }
    } else {
        title.innerText = 'Product Toevoegen';
        deleteBtn.style.display = 'none';
        const sizeContainer = document.getElementById('product-sizes-list');
        sizeContainer.innerHTML = '';
        addProductSizeRow();
    }

    modal.classList.add('show');
};

window.closeProductEditor = () => {
    document.getElementById('product-editor-modal').classList.remove('show');
};

window.saveProduct = async (e) => {
    e.preventDefault();
    const id = document.getElementById('product-edit-id').value;
    const btn = document.querySelector('#product-editor-form .save-btn-admin');
    
    const selectedName = document.getElementById('prod-name-select').value;
    const manualName = document.getElementById('prod-name-manual').value;
    const name = selectedName || manualName;

    if (!name) {
        alert("Voer a.u.b. een naam in.");
        return;
    }

    const sizeRows = document.querySelectorAll('.product-size-row');
    const sizes = Array.from(sizeRows).map(row => ({
        volume: parseFloat(row.querySelector('.size-volume').value),
        price: parseFloat(row.querySelector('.size-price').value)
    }));

    if (sizes.length === 0) {
        alert("Voeg minimaal één maat toe.");
        return;
    }

    const data = {
        name: name,
        category: document.getElementById('prod-category').value,
        unit: document.getElementById('prod-unit').value,
        sizes: sizes,
        // Legacy fields for UI compatibility if needed
        volume: sizes[0].volume,
        price: sizes[0].price,
        updatedAt: new Date().toISOString()
    };

    btn.disabled = true;
    try {
        if (id) {
            await setDoc(doc(db, "workshop_products", id), data, { merge: true });
        } else {
            const newId = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
            await setDoc(doc(db, "workshop_products", newId), data);
        }
        closeProductEditor();
        loadProductList();
    } catch (err) {
        console.error("Error saving product:", err);
        alert("Fout bij opslaan: " + err.message);
    } finally {
        btn.disabled = false;
    }
};

window.deleteProduct = async () => {
    const id = document.getElementById('product-edit-id').value;
    if (!id || !confirm("Weet je zeker dat je dit product wilt verwijderen?")) return;

    try {
        await deleteDoc(doc(db, "workshop_products", id));
        closeProductEditor();
        loadProductList();
    } catch (err) {
        alert("Fout bij verwijderen: " + err.message);
    }
};

window.filterProducts = (val) => {
    const term = val.toLowerCase();
    const filtered = workshopProducts.filter(p => p.name.toLowerCase().includes(term));
    renderProductList(filtered);
};

function addWorkshopRound(data = null) {
    const container = document.getElementById('workshop-rounds-container');
    if (!container) return;
    
    const roundCount = container.children.length + 1;
    const roundDiv = document.createElement('div');
    roundDiv.className = 'workshop-round-item';
    
    const allRecipes = [...window.workshopRecipes || []];
    
    // Custom sort order for workshop categories
    const categoryOrder = {
        "prohibition": 1,
        "new wave": 2,
        "tiki": 3,
        "shot": 4
    };

    allRecipes.sort((a, b) => {
        const catA = (a.category && a.category[0]) ? a.category[0].toLowerCase() : "zz";
        const catB = (b.category && b.category[0]) ? b.category[0].toLowerCase() : "zz";
        
        const orderA = categoryOrder[catA] || 99;
        const orderB = categoryOrder[catB] || 99;

        if (orderA !== orderB) {
            return orderA - orderB;
        }
        
        // Secondary sort: Alphabetical by name
        return a.name.localeCompare(b.name);
    });

    const selectedRecipe = data ? allRecipes.find(r => r.id == data.recipeId) : null;
    const initialLabel = selectedRecipe ? selectedRecipe.name : '-- Kies een recept --';

    const optionsHTML = allRecipes.map(r => `
        <option value="${r.id}" ${data && data.recipeId == r.id ? 'selected' : ''} data-category="${r.category ? r.category[0] : ''}">${r.name}</option>
    `).join('');

    const options00HTML = allRecipes.filter(r => r.category && r.category.includes('0.0%')).map(r => `
        <option value="${r.id}" ${data && data.recipe00Id == r.id ? 'selected' : ''}>${r.name}</option>
    `).join('');

    roundDiv.innerHTML = `
        <div class="round-header">
            <span>Ronde ${roundCount}</span>
            <button type="button" class="remove-round-btn" onclick="this.closest('.workshop-round-item').remove(); window.calculateWorkshopTotals();">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
        <div class="round-body">
            <div class="admin-form-group">
                <label>Type Ronde</label>
                <select class="ws-round-type" onchange="window.updateWorkshopRoundOptions(this); window.calculateWorkshopTotals();">
                    <option value="cocktail" ${data && data.type === 'cocktail' ? 'selected' : ''}>Cocktail</option>
                    <option value="shot" ${data && data.type === 'shot' ? 'selected' : ''}>Shotje</option>
                </select>
            </div>
            <div class="admin-form-group">
                <label>Drink (Normaal)</label>
                <select class="ws-round-recipe" onchange="window.calculateWorkshopTotals()">
                    <option value="">-- Kies een recept --</option>
                    ${optionsHTML}
                </select>
            </div>
            <div class="admin-form-group ws-00-variant-group">
                <label>0.0% Variant</label>
                <select class="ws-round-recipe-00" onchange="window.calculateWorkshopTotals()">
                    <option value="">-- Geen 0.0 variant --</option>
                    ${options00HTML}
                </select>
            </div>
        </div>
    `;
    container.appendChild(roundDiv);
    upgradeSelects(roundDiv);
    
    // Initial filter
    const typeSelect = roundDiv.querySelector('.ws-round-type');
    updateWorkshopRoundOptions(typeSelect);
    
    calculateWorkshopTotals();
}

function updateWorkshopRoundOptions(typeSelect) {
    const type = typeSelect.value;
    const container = typeSelect.closest('.workshop-round-item');
    const options = container.querySelectorAll('.maestro-option');
    const trigger = container.querySelector('.selected-value');
    const hiddenInput = container.querySelector('.ws-round-recipe');

    options.forEach(opt => {
        // Skip the "No selection" option
        if (opt.innerText.includes('-- Kies een recept --') || opt.innerText.includes('-- Geen selectie --')) return;

        const isShot = opt.querySelector('.option-category')?.innerText.toLowerCase().includes('shot');
        
        if ((type === 'shot' && isShot) || (type === 'cocktail' && !isShot)) {
            opt.classList.remove('hidden-by-type');
            opt.style.display = 'flex';
        } else {
            opt.classList.add('hidden-by-type');
            opt.style.display = 'none';
        }
    });

    // If current selection is now hidden, reset it
    const selectedOpt = container.querySelector('.maestro-option.selected');
    if (selectedOpt && selectedOpt.classList.contains('hidden-by-type')) {
        trigger.innerText = '-- Kies een recept --';
        hiddenInput.value = '';
        selectedOpt.classList.remove('selected');
    }
}

function calculateWorkshopTotals() {
    const peopleInput = document.getElementById('ws-people');
    const pricePpInput = document.getElementById('ws-price-pp');
    if (!peopleInput || !pricePpInput) return;

    const people = parseInt(peopleInput.value) || 0;
    const people00 = parseInt(document.getElementById('ws-people-00')?.value) || 0;
    const pricePp = parseFloat(pricePpInput.value) || 0;
    const price00Pp = parseFloat(document.getElementById('ws-price-00-pp')?.value) || 0;
    const rounds = document.querySelectorAll('.workshop-round-item');
    
    const revenue = (people * pricePp) + (people00 * price00Pp);
    const revEl = document.getElementById('ws-total-revenue');
    if (revEl) revEl.innerText = `€ ${revenue.toFixed(2)}`;

    const ingredientsMap = {};
    const allRecipes = [...window.workshopRecipes || []];

    rounds.forEach(round => {
        const type = round.querySelector('.ws-round-type').value;
        const recipeId = round.querySelector('.ws-round-recipe').value;
        const recipe00Id = round.querySelector('.ws-round-recipe-00').value;
        
        const recipe = allRecipes.find(r => r.id == recipeId);
        const recipe00 = allRecipes.find(r => r.id == recipe00Id);

        const processRecipe = (r, count, is00) => {
            if (!r || !r.ingredients) return;
            r.ingredients.forEach(ing => {
                const rawName = typeof ing === 'object' ? ing.name : ing;
                const name = rawName.trim();
                const key = name.toLowerCase();
                
                const amount = (typeof ing === 'object' && ing.amount) ? parseFloat(ing.amount) : 0;
                const unit = (typeof ing === 'object' && ing.unit) ? ing.unit.toLowerCase() : 'stuk';

                if (!ingredientsMap[key]) {
                    ingredientsMap[key] = { 
                        name: name,
                        amount: 0, 
                        unit: unit,
                        category: (typeof ing === 'object' && ing.fridgeCategory) ? ing.fridgeCategory : 'other',
                        amtPerPerson: 0,
                        usedByStd: false,
                        usedBy00: false,
                        numDrinkers: 0
                    };
                }
                
                if (is00) ingredientsMap[key].usedBy00 = true;
                else ingredientsMap[key].usedByStd = true;

                ingredientsMap[key].amount += (amount * count);
                ingredientsMap[key].amtPerPerson += amount;
                
                let drinkers = 0;
                if (ingredientsMap[key].usedByStd) drinkers += people;
                if (ingredientsMap[key].usedBy00) drinkers += people00;
                ingredientsMap[key].numDrinkers = drinkers;
            });
        };

        processRecipe(recipe, people, false);
        processRecipe(recipe00, people00, true);
    });

    const ingList = document.getElementById('ws-ingredients-list');
    if (!ingList) return;

    if (Object.keys(ingredientsMap).length === 0) {
        ingList.innerHTML = '<p class="placeholder-text">Voeg eerst cocktails toe aan het menu...</p>';
        const costsEl = document.getElementById('ws-total-costs');
        if (costsEl) costsEl.innerText = '€ 0.00';
        const profitEl = document.getElementById('ws-total-profit');
        if (profitEl) profitEl.innerText = `€ ${revenue.toFixed(2)}`;
        return;
    }

    let estimatedCosts = 0;
    ingList.innerHTML = Object.keys(ingredientsMap).map(key => {
        const ing = ingredientsMap[key];
        const name = ing.name;
        
        // FIND ALL MATCHING PRODUCTS
        const matchingProducts = workshopProducts.filter(p => p.name.toLowerCase() === key || p.name.toLowerCase() === name.toLowerCase());
        
        // 1. Calculate how much we need to buy (ML/Units)
        let totalUnitsToBuy = ing.amount; // Default
        
        const inkoopExclusions = ['bitters', 'angostura', 'stroh 80'];
        const isExcluded = inkoopExclusions.some(ex => key.includes(ex));

        if (!isExcluded) {
            if (ing.category === 'juice') {
                totalUnitsToBuy = ing.numDrinkers * 100;
            } else if (['spirit', 'liqueur', 'syrup'].includes(ing.category)) {
                const mlPerPerson = ing.amtPerPerson;
                let pPerBottle = 3;
                if (mlPerPerson * 3 > 160) pPerBottle = 2;
                if (mlPerPerson * 2 > 160) pPerBottle = 1;
                const finalBottleCount = Math.ceil(ing.numDrinkers / pPerBottle);
                totalUnitsToBuy = finalBottleCount * 160;
            }
        }

        // Unit conversion for recipe-based buying
        if (totalUnitsToBuy === ing.amount) {
            if (ing.unit === 'cl') totalUnitsToBuy = ing.amount * 10;
            if (ing.unit === 'l') totalUnitsToBuy = ing.amount * 1000;
        }

        // 1. Get all available options for this ingredient
        const allOptions = [];
        matchingProducts.forEach(prod => {
            if (prod.sizes && prod.sizes.length > 0) {
                prod.sizes.forEach(s => {
                    allOptions.push({ 
                        id: prod.id, 
                        volume: s.volume, 
                        price: s.price, 
                        unit: prod.unit 
                    });
                });
            } else if (prod.volume) {
                allOptions.push({ 
                    id: prod.id, 
                    volume: prod.volume, 
                    price: prod.price, 
                    unit: prod.unit 
                });
            }
        });

        let bestCombination = [];
        let totalCost = 0;
        let isEstimated = allOptions.length === 0;

        if (!isEstimated) {
            // SMART SHOPPING LOGIC
            const sortedOptions = [...allOptions].sort((a, b) => (a.price / a.volume) - (b.price / b.volume));
            
            // Strategy A: Best Single Type (buying only one size of bottle)
            const bestSingleType = sortedOptions.reduce((best, opt) => {
                const count = Math.ceil(totalUnitsToBuy / opt.volume);
                const cost = count * opt.price;
                if (!best || cost < best.cost) return { combo: [{ opt, count }], cost };
                return best;
            }, null);

            // Strategy B: Greedy Downward (Cheapest unit price first, then remainder)
            let greedyRemaining = totalUnitsToBuy;
            let greedyCombo = [];
            let greedyCost = 0;
            
            sortedOptions.forEach(opt => {
                if (greedyRemaining >= opt.volume) {
                    const count = Math.floor(greedyRemaining / opt.volume);
                    greedyCombo.push({ opt, count });
                    greedyRemaining -= (count * opt.volume);
                    greedyCost += (count * opt.price);
                }
            });
            if (greedyRemaining > 0) {
                const coverOpt = sortedOptions.reduce((best, curr) => {
                    if (curr.volume >= greedyRemaining) {
                        if (!best || curr.price < best.price) return curr;
                    }
                    return best;
                }, null) || sortedOptions[0];

                const existing = greedyCombo.find(c => c.opt.volume === coverOpt.volume && c.opt.id === coverOpt.id);
                if (existing) existing.count++;
                else greedyCombo.push({ opt: coverOpt, count: 1 });
                greedyCost += coverOpt.price;
            }

            // Pick the cheapest strategy
            if (bestSingleType && bestSingleType.cost < greedyCost) {
                bestCombination = bestSingleType.combo;
                totalCost = bestSingleType.cost;
            } else {
                bestCombination = greedyCombo;
                totalCost = greedyCost;
            }
        } else {
            // FALLBACK
            const fallbackVol = (['ml', 'cl', 'l', 'juice', 'spirit', 'liqueur', 'syrup'].includes(ing.category || ing.unit)) ? 700 : 1;
            const fallbackPrice = (fallbackVol === 700) ? 15 : 0.5;
            const numFallback = Math.ceil(totalUnitsToBuy / fallbackVol);
            bestCombination = [{ opt: { volume: fallbackVol, price: fallbackPrice, unit: ing.unit || 'ml' }, count: numFallback }];
            totalCost = numFallback * fallbackPrice;
        }

        const comboText = bestCombination.map(c => `${c.count}x ${c.opt.volume}${c.opt.unit}`).join(', ');
        let display = `${Math.ceil(ing.amount)} ${ing.unit} (Recept)`;
        if (['ml', 'cl', 'l'].includes(ing.unit)) {
            display = `${(ing.amount / (ing.unit === 'cl' ? 100 : (ing.unit === 'l' ? 1 : 1000))).toFixed(2)} L (Recept)`;
        }
        const bottleCountHTML = `<span class="bottle-count ${isEstimated ? 'estimated' : ''}">${comboText}</span>`;
        
        estimatedCosts += totalCost;

        return `
            <div class="ws-ing-row ${isEstimated ? 'unknown-product' : ''}">
                <div class="ws-ing-info">
                    <span class="ing-name">${name} ${isEstimated ? '<i class="fa-solid fa-circle-question" title="Product niet in database"></i>' : ''}</span>
                    <span class="ing-price-unit">€ ${totalCost.toFixed(2)} (Inkoop)</span>
                </div>
                <div class="ws-ing-math">
                    <span class="ing-amt">${display}</span>
                    ${bottleCountHTML}
                    <span class="ing-total-price">€ ${totalCost.toFixed(2)}</span>
                </div>
            </div>
        `;
    }).join('');

    const costsEl = document.getElementById('ws-total-costs');
    if (costsEl) costsEl.innerText = `€ ${estimatedCosts.toFixed(2)}`;
    const profitEl = document.getElementById('ws-total-profit');
    if (profitEl) profitEl.innerText = `€ ${(revenue - estimatedCosts).toFixed(2)}`;

    // NEW: Render Prep List
    renderWorkshopPrepList(ingredientsMap);
}

function renderWorkshopPrepList(ingredientsMap) {
    const prepList = document.getElementById('ws-prep-bottles-list');
    if (!prepList) return;

    const prepExclusions = ['bitters', 'angostura', 'stroh 80'];

    const items = Object.keys(ingredientsMap).map(key => {
        const ing = ingredientsMap[key];
        const name = ing.name;
        const currentPeople = ing.numDrinkers;

        if (currentPeople === 0) return null;

        // Skip exclusions for prep bottles
        if (prepExclusions.some(ex => key.includes(ex))) return null;
        let bottleInfo = null;

        if (ing.category === 'juice') {
            // 1 bottle per person, 100ml
            const numBottles = currentPeople;
            const mlPerBottle = ing.amtPerPerson;
            const isOverflow = mlPerBottle > 100;
            
            bottleInfo = {
                count: numBottles,
                size: '100ml',
                type: 'Individueel',
                fill: mlPerBottle,
                warning: isOverflow ? 'Te veel voor 100ml!' : null
            };
        } else if (['spirit', 'liqueur', 'syrup'].includes(ing.category)) {
            // 1 bottle per 2-3 persons, 160ml
            const mlPerPerson = ing.amtPerPerson;
            let pPerBottle = 3;
            let typeLabel = 'Gedeeld (per 3)';

            if (mlPerPerson * 3 > 160) {
                pPerBottle = 2;
                typeLabel = 'Gedeeld (per 2)';
            }
            if (mlPerPerson * 2 > 160) {
                pPerBottle = 1;
                typeLabel = 'Individueel';
            }

            const numBottles = Math.ceil(currentPeople / pPerBottle);
            // Avg people per bottle for fill calculation
            const avgPeoplePerBottle = currentPeople / numBottles;
            const mlPerBottle = mlPerPerson * avgPeoplePerBottle;
            const isOverflow = mlPerBottle > 160;

            bottleInfo = {
                count: numBottles,
                size: '160ml',
                type: typeLabel,
                fill: mlPerBottle,
                warning: isOverflow ? 'Te veel voor 160ml!' : null
            };
        }

        if (!bottleInfo) return null;

        return `
            <div class="prep-row ${bottleInfo.warning ? 'prep-warning' : ''}">
                <div class="prep-main">
                    <span class="prep-name">${name}</span>
                    <span class="prep-count">${bottleInfo.count}x <small>${bottleInfo.size}</small></span>
                </div>
                <div class="prep-details">
                    <span class="prep-type">${bottleInfo.type}</span>
                    <span class="prep-fill">~${Math.round(bottleInfo.fill)}ml / flesje</span>
                </div>
                ${bottleInfo.warning ? `<div class="prep-alert"><i class="fa-solid fa-triangle-exclamation"></i> ${bottleInfo.warning}</div>` : ''}
            </div>
        `;
    }).filter(x => x !== null).join('');

    prepList.innerHTML = items || '<p class="placeholder-text">Geen vloeibare ingrediënten nodig.</p>';
}

async function saveWorkshop(e) {
    if (e) e.preventDefault();
    const id = document.getElementById('workshop-edit-id').value;
    const btn = document.querySelector('#workshop-editor-form .save-btn-admin');
    if (!btn) return;
    
    const originalHTML = btn.innerHTML;
    const rounds = [];
    document.querySelectorAll('.workshop-round-item').forEach(item => {
        rounds.push({
            type: item.querySelector('.ws-round-type').value,
            recipeId: item.querySelector('.ws-round-recipe').value,
            recipe00Id: item.querySelector('.ws-round-recipe-00').value
        });
    });

    const totalRevenue = parseFloat(document.getElementById('ws-total-revenue').innerText.replace('€ ', '')) || 0;
    const totalCosts = parseFloat(document.getElementById('ws-total-costs').innerText.replace('€ ', '')) || 0;

    const data = {
        name: document.getElementById('ws-name').value,
        date: document.getElementById('ws-date').value,
        people: parseInt(document.getElementById('ws-people').value),
        people00: parseInt(document.getElementById('ws-people-00').value) || 0,
        client: document.getElementById('ws-client').value,
        location: document.getElementById('ws-location').value,
        pricePp: parseFloat(document.getElementById('ws-price-pp').value),
        price00Pp: parseFloat(document.getElementById('ws-price-00-pp').value) || 25,
        allergies: document.getElementById('ws-allergies').value,
        prepNotes: document.getElementById('ws-prep-notes').value,
        rounds: rounds,
        totalRevenue: totalRevenue,
        totalCosts: totalCosts,
        updatedAt: new Date().toISOString()
    };

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Bezig...';

    try {
        const { setDoc, doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
        if (id) {
            await updateDoc(doc(db, "workshops", id), data);
        } else {
            data.createdAt = new Date().toISOString();
            // Create a clean ID from the workshop name
            const workshopId = data.name.toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            
            await setDoc(doc(db, "workshops", workshopId), data);
        }
        
        closeWorkshopEditor();
        loadWorkshopList();
        const { showToast } = await import("../core/ui-utils.js");
        showToast("Workshop succesvol opgeslagen!");
    } catch (err) {
        console.error("Error saving workshop:", err);
        alert("Fout bij opslaan: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
    }
}

async function deleteWorkshop(id) {
    if (!confirm("Weet je zeker dat je deze workshop wilt verwijderen?")) return;
    try {
        const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js");
        await deleteDoc(doc(db, "workshops", id));
        closeWorkshopEditor();
        loadWorkshopList();
    } catch (e) {
        alert("Fout bij verwijderen: " + e.message);
    }
}

// Custom Dropdown Logic
function toggleMaestroDropdown(trigger) {
    const container = trigger.closest('.maestro-select-container');
    const wasOpen = container.classList.contains('open');
    
    // Close all other dropdowns
    document.querySelectorAll('.maestro-select-container').forEach(c => c.classList.remove('open'));
    
    if (!wasOpen) {
        container.classList.add('open');
        const searchInput = container.querySelector('.maestro-select-search');
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
            filterMaestroDropdown(searchInput);
        }
    }
}

function filterMaestroDropdown(input) {
    const term = input.value.toLowerCase();
    const options = input.closest('.maestro-select-dropdown').querySelectorAll('.maestro-option');
    
    options.forEach(opt => {
        const name = opt.getAttribute('data-name') || '';
        const isHiddenByType = opt.classList.contains('hidden-by-type');
        
        if (!isHiddenByType && (name.includes(term) || term === '')) {
            opt.style.display = 'flex';
        } else {
            opt.style.display = 'none';
        }
    });
}

function selectMaestroOption(option, id, name) {
    const container = option.closest('.maestro-select-container');
    const trigger = container.querySelector('.maestro-select-trigger .selected-value');
    const hiddenInput = container.querySelector('select');
    
    if (!hiddenInput) return;

    // Update visual state
    container.querySelectorAll('.maestro-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    
    // Update values
    trigger.innerText = name;
    hiddenInput.value = id;
    
    // Trigger change event for logic that depends on it
    hiddenInput.dispatchEvent(new Event('change'));
    
    // Close
    container.classList.remove('open');
    
    // Recalculate workshop if that's what we're doing
    if (hiddenInput.classList.contains('ws-round-recipe')) {
        calculateWorkshopTotals();
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.maestro-select-container')) {
        document.querySelectorAll('.maestro-select-container').forEach(c => c.classList.remove('open'));
    }
});

// Consolidate Global Window assignments
window.loadWorkshopList = loadWorkshopList;
window.openWorkshopEditor = openWorkshopEditor;
window.closeWorkshopEditor = closeWorkshopEditor;
window.switchWorkshopFormTab = switchWorkshopFormTab;
window.addWorkshopRound = addWorkshopRound;
window.calculateWorkshopTotals = calculateWorkshopTotals;
window.saveWorkshop = saveWorkshop;
window.deleteWorkshop = deleteWorkshop;
window.toggleMaestroDropdown = toggleMaestroDropdown;
window.filterMaestroDropdown = filterMaestroDropdown;
window.selectMaestroOption = selectMaestroOption;
window.updateWorkshopRoundOptions = updateWorkshopRoundOptions;
window.toggleMarginAnalysis = toggleMarginAnalysis;

function toggleMarginAnalysis() {
    const container = document.getElementById('margin-analysis-container');
    if (!container) return;
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        renderMarginAnalysisChart();
    } else {
        container.style.display = 'none';
    }
}

function getWorkshopProfitForGuests(p, p00) {
    const pricePp = parseFloat(document.getElementById('ws-price-pp')?.value) || 0;
    const price00Pp = parseFloat(document.getElementById('ws-price-00-pp')?.value) || 0;
    const rounds = document.querySelectorAll('.workshop-round-item');
    const allRecipes = [...window.workshopRecipes || []];
    
    const revenue = (p * pricePp) + (p00 * price00Pp);
    const ingredientsMap = {};

    rounds.forEach(round => {
        const recipeId = round.querySelector('.ws-round-recipe').value;
        const recipe00Id = round.querySelector('.ws-round-recipe-00').value;
        const recipe = allRecipes.find(r => r.id == recipeId);
        const recipe00 = allRecipes.find(r => r.id == recipe00Id);

        const processRecipe = (r, count, is00) => {
            if (!r || !r.ingredients) return;
            r.ingredients.forEach(ing => {
                const name = (typeof ing === 'object' ? ing.name : ing).trim();
                const key = name.toLowerCase();
                const amount = (typeof ing === 'object' && ing.amount) ? parseFloat(ing.amount) : 0;
                const unit = (typeof ing === 'object' && ing.unit) ? ing.unit.toLowerCase() : 'stuk';

                if (!ingredientsMap[key]) {
                    ingredientsMap[key] = { 
                        name: name, amount: 0, unit: unit,
                        category: (typeof ing === 'object' && ing.fridgeCategory) ? ing.fridgeCategory : 'other',
                        amtPerPerson: 0, numDrinkers: 0, usedByStd: false, usedBy00: false
                    };
                }
                if (is00) ingredientsMap[key].usedBy00 = true;
                else ingredientsMap[key].usedByStd = true;
                
                ingredientsMap[key].amount += (amount * count);
                ingredientsMap[key].amtPerPerson += amount;
                
                let drinkers = 0;
                if (ingredientsMap[key].usedByStd) drinkers += p;
                if (ingredientsMap[key].usedBy00) drinkers += p00;
                ingredientsMap[key].numDrinkers = drinkers;
            });
        };
        processRecipe(recipe, p, false);
        processRecipe(recipe00, p00, true);
    });

    let estimatedCosts = 0;
    Object.keys(ingredientsMap).forEach(key => {
        const ing = ingredientsMap[key];
        const matchingProducts = workshopProducts.filter(prod => prod.name.toLowerCase() === key);
        
        let totalUnitsToBuy = ing.amount;
        const inkoopExclusions = ['bitters', 'angostura', 'stroh 80'];
        if (!inkoopExclusions.some(ex => key.includes(ex))) {
            if (ing.category === 'juice') {
                totalUnitsToBuy = ing.numDrinkers * 100;
            } else if (['spirit', 'liqueur', 'syrup'].includes(ing.category)) {
                const mlPerPerson = ing.amtPerPerson;
                let pPerBottle = 3;
                if (mlPerPerson * 3 > 160) pPerBottle = 2;
                if (mlPerPerson * 2 > 160) pPerBottle = 1;
                totalUnitsToBuy = Math.ceil(ing.numDrinkers / pPerBottle) * 160;
            }
        }

        if (totalUnitsToBuy === ing.amount) {
            if (ing.unit === 'cl') totalUnitsToBuy *= 10;
            if (ing.unit === 'l') totalUnitsToBuy *= 1000;
        }

        const allOptions = [];
        matchingProducts.forEach(prod => {
            if (prod.sizes && prod.sizes.length > 0) {
                prod.sizes.forEach(s => allOptions.push({ volume: s.volume, price: s.price }));
            } else if (prod.volume) {
                allOptions.push({ volume: prod.volume, price: prod.price });
            }
        });

        if (allOptions.length > 0) {
            const sorted = allOptions.sort((a, b) => (a.price / a.volume) - (b.price / b.volume));
            const bestSingle = sorted.reduce((best, opt) => {
                const cost = Math.ceil(totalUnitsToBuy / opt.volume) * opt.price;
                return (!best || cost < best.cost) ? { cost } : best;
            }, null);
            estimatedCosts += bestSingle.cost;
        } else {
            const fallbackVol = (['ml', 'cl', 'l', 'juice', 'spirit', 'liqueur', 'syrup'].includes(ing.category || ing.unit)) ? 700 : 1;
            const fallbackPrice = (fallbackVol === 700) ? 15 : 0.5;
            estimatedCosts += Math.ceil(totalUnitsToBuy / fallbackVol) * fallbackPrice;
        }
    });

    return { revenue, costs: estimatedCosts, profit: revenue - estimatedCosts };
}

function renderMarginAnalysisChart() {
    const ctx = document.getElementById('margin-analysis-chart');
    if (!ctx) return;

    if (marginAnalysisChart) {
        marginAnalysisChart.destroy();
    }

    const currentPeople = parseInt(document.getElementById('ws-people')?.value) || 0;
    const currentPeople00 = parseInt(document.getElementById('ws-people-00')?.value) || 0;
    const ratio00 = currentPeople > 0 ? currentPeople00 / currentPeople : 0;

    const labels = [];
    const profitData = [];
    const revenueData = [];
    const costsData = [];

    // Calculate for step of 2 guests
    for (let p = 2; p <= 40; p += 2) {
        const p00 = Math.round(p * ratio00);
        const stats = getWorkshopProfitForGuests(p, p00);
        labels.push(`${p} p.`);
        profitData.push(stats.profit.toFixed(2));
        revenueData.push(stats.revenue.toFixed(2));
        costsData.push(stats.costs.toFixed(2));
    }

    marginAnalysisChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Marge (€)',
                    data: profitData,
                    borderColor: '#fc9505',
                    backgroundColor: 'rgba(252, 149, 5, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Omzet',
                    data: revenueData,
                    borderColor: '#2ecc71',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Inkoop',
                    data: costsData,
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: { color: '#888', font: { size: 10 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#bbb',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#888', font: { size: 10 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#888', font: { size: 10 } }
                }
            }
        }
    });
}
