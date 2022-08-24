export function renderShoppingList(item) {
    const ul = document.createElement('ul');

    const li = document.createElement('li');
    li.textContent = `${item.quantity} ${item.item}`;
    ul.append(li);

    return ul;
}
