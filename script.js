const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const filterDiv = document.querySelector(".filter");
const filterInput = filterDiv.querySelector("input");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function removeFromStorage(item) {
  let local = getItemFromStorage("item");
  local = local.filter((i) => {
    return i !== item;
  });
  console.log(local);
  localStorage.setItem("item", JSON.stringify(local));
}

function getItemFromStorage(item) {
  let local;
  if (localStorage.getItem(item) === null) {
    local = [];
  } else {
    local = JSON.parse(localStorage.getItem(item));
  }
  return local;
}

function loadItem() {
  const storedVal = JSON.parse(localStorage.getItem("item"));
  if (storedVal !== null) {
    storedVal.forEach((item) => {
      addItemToDom(item);
    });
  }
}

function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
}

function setItemEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll("li").forEach((item) => {
    item.classList.remove("editMode");
  });
  formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  item.classList.add("editMode");
  itemInput.value = item.textContent;
  formBtn.style.backgroundColor = "#228B22";
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function ifExist(item) {
  const itemsFromStorage = getItemFromStorage("item");
  return itemsFromStorage.includes(item);
}

function submitItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Enter value");
    return;
  }

  if (ifExist(newItem)) {
    alert("You have entered the same value!");
    return;
  }

  if (isEditMode) {
    const itemEditing = document.querySelector(".editMode");
    removeFromStorage(itemEditing.textContent);
    itemEditing.classList.remove("editMode");
    itemEditing.remove();
    isEditMode = false;
  }

  local = getItemFromStorage("item");
  local.push(newItem);
  localStorage.setItem("item", JSON.stringify(local));
  addItemToDom(newItem);

  formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
  formBtn.style.backgroundColor = "#333";
  itemInput.value = "";
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
    removeFromStorage(
      e.target.parentElement.parentElement.firstChild.textContent
    );
  } else {
    setItemEdit(e.target);
  }
  checkUI();
}

function clearAll(e) {
  while (itemList.firstElementChild) {
    itemList.firstElementChild.remove();
  }
  checkUI();
  localStorage.removeItem("item");
}

function filterFn(e) {
  const items = itemList.querySelectorAll("li");
  const inputVal = e.target.value.toLowerCase();
  items.forEach((item) => {
    if (
      item.firstChild.textContent.toLocaleLowerCase().indexOf(inputVal) === -1
    ) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
    }
  });
}

function checkUI() {
  const item = itemList.querySelectorAll("li");
  if (item.length == 0) {
    filterDiv.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterDiv.style.display = "block";
    clearBtn.style.display = "block";
  }
}
function init() {
  itemForm.addEventListener("submit", submitItem);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearAll);
  filterInput.addEventListener("input", filterFn);
  document.addEventListener("DOMContentLoaded", loadItem);
  checkUI();
}

init();
