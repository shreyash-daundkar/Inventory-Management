// Selecting Elements

const form = document.querySelector('#add-form');
const formName = document.querySelector('#form-name');
const formDes = document.querySelector('#form-des');
const formPrice = document.querySelector('#form-price');
const formQuant = document.querySelector('#form-quant');
const table = document.querySelector('#table');




// Url

const link = 'https://crudcrud.com/api/';
const id = '94432c400d054fc8abf26c17876fdfc6';
const route = '/Inventory';
const url = link + id + route;




// On refresh

window.addEventListener('DOMContentLoaded', onRefresh);
async function onRefresh(e) {
    try {
        const res = await axios.get(url);
        for(item of res.data) addItem(item);
    } catch (error) {
        console.log(error.message);
    }
}




// Add Items

form.addEventListener('submit', onSubmit);
async function onSubmit(e) {
    e.preventDefault();
    const itemObj = {
        name : formName.value,
        description : formDes.value,
        price : formPrice.value,
        quantity : formQuant.value,
    }
    const data = await storeOnServer(itemObj);
    if(id) addItem(data, itemObj)
}

async function storeOnServer(obj) {
    try {
        const res =  await axios.post(url, obj);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
}




// Update on Buy

table.addEventListener('click', updateQuant);
function updateQuant(e) {
    if(e.target.tagName !== 'BUTTON') return;
    const text = e.target.textContent
    const row = e.target.parentElement.parentElement;
    const amount = parseInt(text.charAt(text.length - 1));
    const id = row.getAttribute('data-id');
    const obj = JSON.parse(row.getAttribute('data-obj'));
    obj.quantity -= amount;
    row.setAttribute('data-obj', JSON.stringify(obj));
    updateOnServer(id, obj);
}

async function updateOnServer(id, obj) {
    try {
        await axios.put(url + "/" + id, obj);
    } catch (error) {
        console.log(error.message);
    }
}

// Utility functions

function addItem(data) {
    const row = addElement('tr', table);
    const name = addElement('th', row, data.name);
    const des = addElement('th', row, data.description);
    const price = addElement('th', row, data.price);
    const qunt = addElement('th', row, data.quantity);
    const buy = addElement('th', row);
    const buy1 = addElement('button', buy, 'Buy 1');
    const buy2 = addElement('button', buy, 'Buy 2');
    const buy3 = addElement('button', buy, 'Buy 3');
    row.setAttribute('data-id', data._id);
    delete data._id;
    row.setAttribute('data-obj', JSON.stringify(data));
    const obj = row.getAttribute('data-obj');
}

function addElement(type, parent, text, ...classes) {
    const element = document.createElement(type);
    classes.forEach(c => element.classList.add(c));
    if(text) element.textContent = text;
    parent.append(element);
    return element;
}