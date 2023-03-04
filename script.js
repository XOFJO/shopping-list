const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const filterDiv = document.querySelector(".filter");
const filterInput = filterDiv.querySelector("input");

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

function addItem(e) {
  e.preventDefault();
  const li = document.createElement("li");
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Enter value");
    return;
  }
  li.appendChild(document.createTextNode(newItem));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
  checkUI();
}

function clearAll(e) {
  while (itemList.firstElementChild) {
    itemList.firstElementChild.remove();
  }
  checkUI();
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

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAll);
filterInput.addEventListener("input", filterFn);
checkUI();
