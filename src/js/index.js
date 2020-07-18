import * as mdb from 'mdb-ui-kit';
import createListItem from './listItem';

export default {
  mdb,
};

const displayForItems = document.querySelector('.app__display');
const submitButton = document.querySelector('.app__add-button');
const inputText = document.querySelector('.app__inputs-input--text');
const inputNumber = document.querySelector('.app__inputs-input--text');
const form = document.querySelector('.app__inputs');
const inputList = Array.from(document.querySelectorAll('.app__inputs-input'));

const listItem = `
<div class="app__item">
 <span type="text" class="app__item__description">${inputText.value}</span>
 <span type="number" class="app__item__count">${inputNumber.value}</span>
 <button class="app__item__button app__item__button--delete">
  <img class="app__item__icon" src="img/create-outline.svg" alt="" />
 </button>
 <button class="app__item__button app__item__button--edit">
  <img class="app__item__icon" src="img/trash-outline.svg" alt="" />
 </button>
</div>
`;

const fragment = document.createRange().createContextualFragment(listItem);
const stan = [];

const inputValues = inputList.map((input) => {
  function handleInputChange(e) {
    e.preventDefault();
    if (input.value) {
      stan.push(input.value);
      return input.value;
    }
  }

  return input.addEventListener('change', handleInputChange);
});

function appendToList() {
  displayForItems.appendChild(createListItem('a', 'b'));
}

submitButton.addEventListener('click', appendToList);
