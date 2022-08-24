export function renderShoppingList(item, handleUpdate) {
    const ul = document.createElement('ul');

    const li = document.createElement('li');
    li.textContent = `${item.quantity} ${item.item}`;

    if (item.bought) {
        li.classList.add('bought');
    } else {
        li.style.cursor = 'pointer';
        li.addEventListener('click', async () => {
            await handleUpdate(item);
        });
    }

    ul.append(li);

    return ul;
}
