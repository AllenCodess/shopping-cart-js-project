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

  const btn = document.createElement("button");
  btn.className = " remove-item btn-link text-red";
  li.appendChild(btn);

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";
  btn.appendChild(icon);
}

itemList.addEventListener("click", function (e) {
  if (e.target.closest(".remove-item")) {
    const li = e.target.closest("li");
    itemList.removeChild(li);
  }
});
