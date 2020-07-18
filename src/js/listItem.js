function createListItem(product, quantity, units, category) {
  const listItem = document.createElement('div');
  const quantityWrapper = document.createElement('div');
  const buttonWrapper = document.createElement('div');
  const spanText = document.createElement('span');
  const spanNumber = document.createElement('span');
  const spanUnit = document.createElement('span');
  const spanCategory = document.createElement('span');
  const buttonDelete = document.createElement('button');
  const buttonEdit = document.createElement('button');
  const iconDelele = document.createElement('img');
  const iconEdit = document.createElement('img');

  listItem.classList.add('app__item');
  quantityWrapper.classList.add('app__item__quantity-wrapper');
  buttonWrapper.classList.add('app__item__button-wrapper');
  spanText.classList.add('app__item__description');
  spanNumber.classList.add('app__item__count');
  spanUnit.classList.add('app__item__unit');
  spanCategory.classList.add('app__item__category');
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

  quantityWrapper.insertAdjacentElement('afterbegin', spanNumber);
  quantityWrapper.insertAdjacentElement('beforeend', spanUnit);

  buttonWrapper.insertAdjacentElement('afterbegin', buttonEdit);
  buttonWrapper.insertAdjacentElement('beforeend', buttonDelete);

  spanText.innerText = product;
  spanNumber.innerText = quantity;
  spanUnit.innerText = units;
  spanCategory.innerText = category;

  listItem.insertAdjacentElement('afterbegin', quantityWrapper);
  listItem.insertAdjacentElement('afterbegin', spanText);
  listItem.insertAdjacentElement('beforeend', spanCategory);
  listItem.insertAdjacentElement('beforeend', buttonWrapper);

  listItem.classList.add('fadeIn');

  return listItem;
}

export default createListItem;
