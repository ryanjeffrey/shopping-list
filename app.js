// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, addItem, getItems } from './fetch-utils.js';
import { renderShoppingList } from './render-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const listDiv = document.getElementById('list-div');
const addItemForm = document.querySelector('.add-item-form');

// local state:

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addItemForm);
    const item = formData.get('item');
    const quantity = formData.get('quantity');

    const response = await addItem(item, quantity);

    addItemForm.reset();

    const error = response.error;

    if (error) {
        console.log(error.message);
    } else {
        displayList();
    }
});

// display functions:
async function displayList() {
    const items = await getItems();
    
    listDiv.innerHTML = '';

    for (let item of items) {
        const renderedItems = renderShoppingList(item);
        listDiv.append(renderedItems);
    }
}

async function loadData() {
    await displayList();
}

loadData();

// events: