// import * as mdb from 'mdb-ui-kit';
import createListItem from './listItem';
import displayStats from './stats';

// export default {
//   mdb,
// };
const displayForItems = document.querySelector('.app__display');
const submitButton = document.querySelector('.app__menu-button--add');
const clearButton = document.querySelector('.app__menu-button--clear');
const inputList = document.querySelectorAll('.app__inputs-input');
const categories = document.querySelector('.app__select');
const categoryList = Array.from(document.querySelectorAll('.app__select__option'));

displayStats();

function clearList() {
  localStorage.clear();
  displayForItems.innerHTML = '';
}

function setSesstionStorage(key, value) {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, value);
}

function sessionStorageValue(key) {
  return sessionStorage.getItem(key);
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(storage, key) {
  const storageData = storage.getItem(key);
  return JSON.parse(storageData);
}

function clearInputs() {
  const decription = document.querySelector('.app__inputs-input--text');
  const quantity = document.querySelector('.app__inputs-input--number');
  decription.value = '';
  quantity.value = '';
}

function handleInputChange({ target }) {
  if (target === '') throw new Error('please fill out fields');
  const appInputs = {
    decription: document.querySelector('.app__inputs-input--text'),
    quantity: document.querySelector('.app__inputs-input--number'),
    quantityType: document.querySelectorAll('[type="radio"]'),
  };
  if (target === appInputs.decription && target.value !== '') {
    setSesstionStorage('textInput', target.value);
  }
  if (target === appInputs.quantity) {
    if (target.value < 0) target.value = 0;
    setSesstionStorage('quantityInput', target.value);
  }
  appInputs.quantityType.forEach((option) => {
    if (target.id === option.id) {
      setSesstionStorage('unit', target.id);
      setSesstionStorage(target.id, target.id);
    }
  });
}

function getSelectedCategory(category) {
  const selectedCategory = categoryList.find((option) => {
    return option.innerText === category ? option : null;
  });
  return selectedCategory.innerText;
}

function handleSelectChange(e) {
  setSesstionStorage('category', getSelectedCategory(e.target.value));
}

function fromSessionToLocal() {
  const product = sessionStorageValue('textInput');
  const quantity = sessionStorageValue('quantityInput');
  const unit = sessionStorageValue('unit');
  const category = sessionStorageValue('category') || 'warzywa';
  return [product, quantity, unit, category];
}

function appendToList() {
  const key = new Date().getTime().toString().substr(-6);
  setLocalStorage(key, fromSessionToLocal());
  renderList();
  displayStats();
  clearInputs();
  sessionStorage.clear();
}

function renderList() {
  const keyRegex = /^\d{6}$/g;
  displayForItems.innerHTML = '';

  Array.from(Object.keys(localStorage))
    .sort((a, b) => {
      return a - b;
    })
    .forEach((key) => {
      if (key.match(keyRegex)) {
        const inputData = getFromStorage(localStorage, key);
        const newItem = createListItem(...inputData);
        newItem.dataset.id = key;
        displayForItems.appendChild(newItem);
      }
    });
}

submitButton.addEventListener('click', appendToList);
categories.addEventListener('change', handleSelectChange);
inputList.forEach((input) => input.addEventListener('change', handleInputChange));
clearButton.addEventListener('click', clearList);
renderList();
