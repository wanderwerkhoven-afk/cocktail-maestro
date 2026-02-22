import { shoppingList } from '../core/state.js';

export function renderShoppingList() {
    const listContainer = document.getElementById('shopping-list-items');
    const emptyState = document.getElementById('shopping-list-empty');
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
                <div class="shopping-item-info" onclick="window.toggleItemCheck(${index})">
                    <i class="${item.checked ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
                    <span class="shopping-item-name">${item.name}</span>
                </div>
                <button class="remove-item-btn" onclick="window.removeFromShoppingList(${index})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;
            listContainer.appendChild(li);
        });
    }
}

export function toggleItemCheck(index) {
    shoppingList[index].checked = !shoppingList[index].checked;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    renderShoppingList();
}

export function removeFromShoppingList(index) {
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    renderShoppingList();
}

export function clearShoppingList() {
    if (shoppingList.length === 0) return;
    if (confirm("Wil je de hele lijst leegmaken?")) {
        shoppingList.length = 0;
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        renderShoppingList();
    }
}

export function addToShoppingList(e, ingredient) {
    if (e) e.stopPropagation();

    const exists = shoppingList.some(item => item.name === ingredient);

    if (!exists) {
        shoppingList.push({ name: ingredient, checked: false });
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        alert(`${ingredient} added!`);
    } else {
        alert(`${ingredient} is already on the list.`);
    }
}
