const budget = document.querySelector("#budget");
const expenses = document.querySelector("#expenses");
const balance = document.querySelector("#balance");
const expBox = document.querySelector(".expenses");
// Pehle error pelo,, 💃🏻💀
function showError(msg) {
  const error = document.querySelector(".error-sec");
  const closeError = document.querySelector("#closeError");
  const errorMsg = document.querySelector("#errorMsg");
  error.style.display = "flex";
  errorMsg.textContent = msg;
  closeError.addEventListener("click", function () {
    error.style.display = "none";
  });
}
// Budget ko add kar diya jaye,,,💃🏻
const addBtnB = document.querySelector("#addBud");
const budgetIn = document.querySelector("#budgetIn");
addBtnB.addEventListener("click", function () {
  if (Number(budgetIn.value) <= 0) {
    showError("Please enter amount greater than 0");
  } else if (Number(budgetIn.value) < Number(expenses.textContent)) {
    showError("Budget amount must be greater than " + expenses.textContent);
  } else {
    budget.textContent = Number(budgetIn.value);
    budgetIn.value = "";
    recheck();
  }
});
// cheking bhi to honi chahiye ki nahi
function recheck() {
  balance.textContent =
    Number(budget.textContent) - Number(expenses.textContent);
}
// expenses ko add shadd kar liya jaye!!
const addBtnE = document.querySelector("#addExp");
const titleIn = document.querySelector("#titleIn");
const costIn = document.querySelector("#costIn");
addBtnE.addEventListener("click", function () {
  if (titleIn.value.trim() == "") {
    showError("Title can't be empty");
  } else if (Number(costIn.value) <= 0) {
    showError("Your expense must be greater than 0");
  } else if (Number(costIn.value) > Number(balance.textContent)) {
    showError("Oops, you have no more budget to add this!😓");
  } else {
    expenses.textContent = Number(expenses.textContent) + Number(costIn.value);
    const format = `<span class="title">${titleIn.value}</span>
          <span class="price">${Number(costIn.value)}</span>
          <div class="icons flex" style="gap: 25px">
            <ion-icon name="create-outline" class="editBtn"></ion-icon>
            <ion-icon name="trash-outline" class="delBtn"></ion-icon>
          </div>`;
    let box = document.createElement("div");
    box.className = "data flex";
    box.innerHTML = format;
    expBox.append(box);
    titleIn.value = "";
    costIn.value = "";
    recheck();
  }
});
// ab delete aur error ko pelte hai...🥰
const editBox = document.querySelector(".edit-sec");
let element = null;
let oldTitle, newTitle, oldCost, newCost;
expBox.addEventListener("click", function (e) {
  if (e.target.matches(".delBtn")) {
    e.target.closest(".data").remove();
  } else if (e.target.matches(".editBtn")) {
    element = e.target.closest(".data");
    editBox.style.display = "flex";
    oldTitle = element.querySelector(".title");
    oldCost = element.querySelector(".price");
    newTitle = editBox.querySelector("input");
    newCost = editBox.querySelectorAll("input")[1];
    newTitle.value = oldTitle.textContent;
    newCost.value = oldCost.textContent;
    editBox.querySelector("#edit-err").style.display = "none";
  }
});
editBox.addEventListener("click", function (e) {
  if (e.target.matches("#close")) {
    editBox.style.display = "none";
  } else if (e.target.matches("#editBtn")) {
    let prev = Number(expenses.textContent) - Number(oldCost.textContent);
    if (newTitle.value.trim() == "") {
      editBox.querySelector("#edit-err").style.display = "block";
      editBox.querySelector("#edit-err").textContent = "Title can't be empty!";
    } else if (Number(newCost.value) <= 0) {
      editBox.querySelector("#edit-err").style.display = "block";
      editBox.querySelector("#edit-err").textContent =
        "Your expense must be greater than 0";
    } else if (Number(newCost.value) > Number(budget.textContent) - prev) {
      editBox.querySelector("#edit-err").style.display = "block";
      editBox.querySelector("#edit-err").textContent =
        "Oops, you have no more budget to add this!😓";
    } else {
      editBox.querySelector("#edit-err").style.display = "none";
      oldTitle.textContent = newTitle.value;
      oldCost.textContent = Number(newCost.value);
      editBox.style.display = "none";
      expenses.textContent = prev + Number(newCost.value);
      recheck();
    }
  }
});
