// selected content
const addItemBtn = document.querySelector(".btn");
const itemList = document.querySelector(".items");

addItemBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = document.querySelector(".form-input").value;
  createListItems(inputValue);
});

function createListItems(inputValue) {
  const li = document.createElement("li");
  li.textContent = inputValue;
  itemList.appendChild(li);
}
