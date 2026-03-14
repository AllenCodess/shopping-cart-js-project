// selected content
const itemList = document.querySelector(".items");
const form = document.querySelector("#item-form");
const clearBtn = document.querySelector("#clear");
const filter = document.querySelector("#filter");
const formbtn = form.querySelector("button");
let isEditMode = false;

//event listeners
form.addEventListener("submit", onAddItemSubmit); //form submission event and function
document.addEventListener("DOMContentLoaded", displayItemsFromStorage); // event to display items when loaded
itemList.addEventListener("click", onClickItems); //removes items
clearBtn.addEventListener("click", clearItems); //clear items
filter.addEventListener("input", filterItems); //filter items

function onAddItemSubmit(e) {
  e.preventDefault();
  const inputValue = document.querySelector(".form-input").value;

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.remove();
    isEditMode = false;
  }

  createListItems(inputValue);
  addItemToLocalStorage(inputValue);
  checkUi();
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
}

function onClickItems(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItems(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  const listItems = itemList.querySelectorAll("li");
  listItems.forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formbtn.innerHTML = '<i class="fa-solid fa-pen"> </i>   Update Item';

  formbtn.style.backgroundColor = "#228B22";
  let inputValue = document.querySelector(".form-input");
  inputValue.value = item.textContent;
}

function removeItems(item) {
  //remove item from DOM
  item.remove();

  //function to remove item from Local Storage
  removeItemFromStorage(item.textContent);
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //re-set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  itemList.innerHTML = "";

  localStorage.removeItem("items");
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

  formbtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formbtn.style.backgroundColor = "#333";

  isEditMode = false;
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
