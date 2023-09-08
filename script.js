// Selecting Elements

const form = document.querySelector('#add-form');
const formName = document.querySelector('#form-name');
const formDes = document.querySelector('#form-des');
const formPrice = document.querySelector('#form-price');
const formQuant = document.querySelector('#form-quant');
const table = document.querySelector('#table');




// Url

const link = 'https://crudcrud.com/api/';
const id = 'eafe78f255904fd4ad1483205f8e162d';
const route = '/Inventory';
const url = link + id + route;




// On refresh

window.addEventListener('DOMContentLoaded', onRefresh);
function onRefresh(e) {
    axios.get(url).then(res => {
        for(item of res.data) addItem(item);
    }).catch(e => console.log(e.message));
}




// Add Items

form.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    const obj = {
        name : formName.value,
        description : formDes.value,
        price : formPrice.value,
        quantity : formQuant.value,
    }
    axios.post(url, obj).then(res => addItem(res.data))
     .catch(e => console.log(e.message));
}




// Update on Buy

table.addEventListener('click', updateQuant);
function updateQuant(e) {
    if(e.target.tagName !== 'BUTTON') return;
    const text = e.target.textContent
    const amount = parseInt(text.charAt(text.length - 1));
    const row = e.target.parentElement.parentElement;
    const id = row.getAttribute('data-id');
    const obj = {
        name : row.children[0].textContent,
        description : row.children[1].textContent,
        price : row.children[2].textContent,
        quantity : row.children[3].textContent - amount,
    }
    axios.put(url + "/" + id, obj)
     .then(() => row.children[3].textContent = parseInt(row.children[3].textContent) - amount)
     .catch(error => console.log(error.message));
}




// Utility functions

function addItem(data) {
    const row = addElement('tr', table);
    addMultipleElement('th', row, data.name, data.description, data.price, data.quantity);
    const buy = addElement('th', row);
    addMultipleElement('button', buy, 'Buy 1', 'buy 2', 'buy 3');
    row.setAttribute('data-id', data._id);
}

function addElement(type, parent, text, ...classes) {
    const element = document.createElement(type);
    parent.append(element);
    classes.forEach(c => element.classList.add(c));
    if(text) element.textContent = text;
    return element;
}

function addMultipleElement(type, parent, ...texts) {
    texts.forEach(x => addElement(type, parent, x));
}