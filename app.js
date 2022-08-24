// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, addItem, getItems, updateItem } from './fetch-utils.js';
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

// local state:
let list = [];

async function handleUpdate(item) {
    const update = {
        bought: true
    };
    const response = await updateItem(item.id, update);
    if (response.error) {
        console.log(response.error);
    } else {
        const bought = response.data;
        const index = list.indexOf(item);
        list[index] = bought;

        displayList();
    }
}
// display functions:
async function displayList() {
    const items = await getItems();
    
    listDiv.innerHTML = '';

    for (let item of items) {
        const renderedItems = renderShoppingList(item, handleUpdate);
        listDiv.append(renderedItems);
    }
}

async function loadData() {
    await displayList();
}

loadData();

// events: