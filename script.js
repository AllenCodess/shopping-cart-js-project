// selected content
const itemList = document.querySelector(".items");
const form = document.querySelector("#item-form");
const clearBtn = document.querySelector("#clear");
const filter = document.querySelector("#filter");

//event listeners
form.addEventListener("submit", onAddItemSubmit); //form submission event and function
document.addEventListener("DOMContentLoaded", displayItemsFromStorage); // event to display items when loaded
itemList.addEventListener("click", removeItems); //removes items
clearBtn.addEventListener("click", clearItems); //clear items
filter.addEventListener("input", filterItems); //filter items

function onAddItemSubmit(e) {
  e.preventDefault();
  const inputValue = document.querySelector(".form-input").value;
  createListItems(inputValue);
  addItemToLocalStorage(inputValue);
}

// creates elements, adds classes, appends to DOM
function createListItems(inputValue) {
  const li = document.createElement("li");
  li.textContent = inputValue;
  itemList.appendChild(li);

  const btn = document.createElement("button");
  btn.className = " remove-item btn-link text-red";
  li.appendChild(btn);

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";
  btn.appendChild(icon);

  document.querySelector(".form-input").value = " ";
  checkUi();
}

function removeItems(e) {
  if (e.target.closest(".remove-item")) {
    const li = e.target.closest("li");
    itemList.removeChild(li);
    checkUi();
  }
}
// removes elements when clicked

function clearItems() {
  itemList.innerHTML = "";
  checkUi();
}

function filterItems(e) {
  let text = e.target.value.toLowerCase();
  let items = itemList.querySelectorAll("li");

  items.forEach(function (item) {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//clear UI
function checkUi() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }
}

//LOCAL STORAGE

//add item to localstorage
function addItemToLocalStorage(inputValue) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(inputValue);

  //Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function displayItemsFromStorage() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => createListItems(item));
  checkUi();
}
