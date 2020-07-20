const displayForItems = document.querySelector('.app__display');
const totalItems = document.querySelector('.js--items');
const totalPieces = document.querySelector('.js--pieces');
const totalWeight = document.querySelector('.js--grams');
const totalLiters = document.querySelector('.js--liters');
const submitButton = document.querySelector('.app__menu-button--add');

const storageData = [];
const parsedData = [];

function getStorageStats() {
  const keyRegex = /^\d{6}$/g;

  Array.from(Object.keys(localStorage)).forEach((key) => {
    if (key.match(keyRegex)) {
      storageData.push(localStorage.getItem(key));
    }
  });
  return storageData;
}

getStorageStats().forEach((el) => {
  parsedData.push(JSON.parse(el));
});

function filerTotalUnits(units) {
  return parsedData
    .filter((array) => {
      return array[2] === units;
    })
    .flat(Infinity)
    .filter((value) => {
      return parseInt(value);
    });
}

function filterCategories() {
  const arrayCombined = parsedData.flat(Infinity);
  const categories = {
    warzywa: 0,
    owoce: 0,
    nabial: 0,
    pieczywo: 0,
    chemia: 0,
    woda: 0,
    napoje: 0,
  };

  arrayCombined.forEach((entry) => {
    categories.hasOwnProperty(entry) ? (categories[entry] += 1) : null;
  });
  return categories;
}

function displayCategories() {
  const categoryDisplays = document.querySelectorAll('.stats__category');
  categoryDisplays.forEach((category) => {
    for (let [key, val] of Object.entries(filterCategories())) {
      if (key === category.id) {
        category.firstElementChild.innerHTML = val;
      }
    }
  });
}

function displayUnitsStats(unit, element) {
  if (filerTotalUnits(unit).length === 0) element.innerHTML = 0;
  if (filerTotalUnits(unit).length === 1) element.innerHTML = filerTotalUnits(unit)[0];
  if (filerTotalUnits(unit).length > 1) {
    element.innerHTML = `${filerTotalUnits(unit).reduce(
      (acc, currVal) => parseInt(acc) + parseInt(currVal)
    )} ${unit}`;
  }
}

function updateStats() {
  displayUnitsStats('pc', totalPieces);
  displayUnitsStats('g', totalWeight);
  displayUnitsStats('l', totalLiters);
  displayCategories();
  totalItems.innerHTML = parsedData.length;
}

function manageList(e) {
  if (e.target.classList.contains('app__item__icon--delete')) {
    const currentItem = e.target.parentElement.parentElement.parentElement;

    if (e.target.classList.contains('app__item__icon--delete')) {
      localStorage.removeItem(currentItem.dataset.id);
      currentItem.remove();
      getStorageStats();
      updateStats();
      setTimeout(() => window.location.reload(false), 100);
    }
  }
}

updateStats();
displayForItems.addEventListener('click', manageList);
submitButton.addEventListener('click', updateStats);
