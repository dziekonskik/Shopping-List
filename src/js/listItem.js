function createListItem(product, quantity) {
  const listItem = document.createElement('div');
  const spanText = document.createElement('span');
  const spanNumber = document.createElement('span');
  const buttonDelete = document.createElement('button');
  const buttonEdit = document.createElement('button');
  const iconDelele = document.createElement('img');
  const iconEdit = document.createElement('img');

  listItem.classList.add('app__item');
  spanText.classList.add('app__item__description');
  spanNumber.classList.add('app__item__count');
  buttonDelete.className = 'app__item__button app__item__button--delete';
  buttonEdit.className = 'app__item__button app__item__button--edit';
  iconDelele.classList.add('app__item__icon');
  iconEdit.classList.add('app__item__icon');

  iconDelele.setAttribute('src', 'img/trash-outline.svg');
  iconDelele.setAttribute('alt', 'trash icon');
  iconEdit.setAttribute('src', 'img/create-outline.svg');
  iconEdit.setAttribute('alt', 'pencil icon');

  buttonDelete.appendChild(iconDelele);
  buttonEdit.appendChild(iconEdit);

  spanText.innerText = product;
  spanNumber.innerText = quantity;

  listItem.insertAdjacentElement('afterbegin', spanNumber);
  listItem.insertAdjacentElement('afterbegin', spanText);
  listItem.insertAdjacentElement('beforeend', buttonDelete);
  listItem.insertAdjacentElement('beforeend', buttonEdit);

  listItem.classList.add('fadeIn');

  return listItem;
}

export default createListItem;
