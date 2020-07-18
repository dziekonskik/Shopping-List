import * as mdb from 'mdb-ui-kit';
import createListItem from './listItem';

export default {
  mdb,
};

const displayForItems = document.querySelector('.app__display');
const submitButton = document.querySelector('.app__add-button');
const inputList = document.querySelectorAll('.app__inputs-input');
const categories = document.querySelector('.app__select');
const categoryList = Array.from(document.querySelectorAll('.app__select__option'));

function setSesstionStorage(key, value) {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, value);
}

function sessionStorageValue(key) {
  return sessionStorage.getItem(key);
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(storage, key) {
  return storage.getItem(key);
}

function handleInputChange(e) {
  const itemInputs = {
    decription: document.querySelector('.app__inputs-input--text'),
    quantity: document.querySelector('.app__inputs-input--number'),
    quantityType: document.querySelectorAll('[type="radio"]'),
  };
  if (e.target === itemInputs.decription && e.target.value !== '') {
    setSesstionStorage('textInput', e.target.value);
  }
  if (e.target === itemInputs.quantity) {
    if (e.target.value < 0) e.target.value = 0;
    setSesstionStorage('quantityInput', e.target.value);
  }
  itemInputs.quantityType.forEach((option) => {
    if (e.target.id === option.id) {
      setSesstionStorage('unit', e.target.id);
      setSesstionStorage(e.target.id, e.target.id);
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

function appendToList() {
  const product = sessionStorageValue('textInput');
  const quantity = sessionStorageValue('quantityInput');
  const unit = sessionStorageValue('unit');
  const category = sessionStorageValue('category') || 'warzywa';
  const details = [product, quantity, unit, category];
  console.log(localStorage);

  setLocalStorage('s7', JSON.stringify(details));
  const a = getFromStorage(localStorage, 's7');
  console.log(JSON.parse(a));
  displayForItems.appendChild(createListItem(...JSON.parse(a)));
  sessionStorage.clear();
}

submitButton.addEventListener('click', appendToList);
categories.addEventListener('change', handleSelectChange);
inputList.forEach((input) => input.addEventListener('change', handleInputChange));

// TODO:
// - napisac funkcje która appenduje itemy z localstorage do widoku i
// chyba zmienić nazwe albo przenieść większą część logiki do jakiejś prepreData np
// - statystyki porobić sztuk oraz wagi i kategorii (liczniki )
// - przypisać kolory do selectow
// -
