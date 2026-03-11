// selected content
const itemList = document.querySelector(".items");
const form = document.querySelector("#item-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = document.querySelector(".form-input").value;
  createListItems(inputValue);
});

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

// removes elements when clicked
itemList.addEventListener("click", function (e) {
  if (e.target.closest(".remove-item")) {
    const li = e.target.closest("li");
    itemList.removeChild(li);
  }
});
