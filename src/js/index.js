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

inputList.forEach((input) => input.addEventListener('change', handleInputChange));

categories.addEventListener('change', handleSelectChange);

function setSesstionStorage(key, value) {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, value);
}

function sessionStorageValue(key) {
  return sessionStorage.getItem(key);
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
  console.log(e.target.value);
  console.log(typeof e.target);
}

function getSelectedCategory(category) {
  const selectedCategory = categoryList.find((option) => {
    return option.innerText === category ? option : null;
  });
  console.log(selectedCategory.innerHTML);
  return selectedCategory.innerText;
}

function handleSelectChange(e) {
  getSelectedCategory(e.target.value);
}
// createListItem(product, quantity, units, category);
function appendToList() {
  const product = sessionStorageValue('textInput');
  const quantity = sessionStorageValue('quantityInput');
  const unit = sessionStorageValue('unit');

  displayForItems.appendChild(createListItem(product, quantity, unit, 'warzywa'));
}
submitButton.addEventListener('click', appendToList);
