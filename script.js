// selected content
const addItemBtn = document.querySelector(".btn");

const itemList = document.querySelector(".items");

addItemBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = document.querySelector(".form-input").value;
  console.log(inputValue);
});
