const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");
let deleteBtn;
let editBtn;
let saveBtn;
function startConf() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    todos.forEach((td) => {
      addHtml(td);
    });
  }
  editBtn = document.querySelectorAll(".edit");
  deleteBtn = document.querySelectorAll(".delete");
  saveBtn = document.querySelectorAll(".save");
}
startConf();

function addHtml(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("task");

  const todoContent = document.createElement("div");
  todoContent.classList.add("content");

  const todoInput = document.createElement("input");
  todoInput.type = "text";
  todoInput.classList.add("text");
  todoInput.value = todo.text;
  todoInput.readOnly = "readonly";

  todoContent.appendChild(todoInput);

  const todoActions = document.createElement("div");
  todoActions.classList.add("actions");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.classList.add("save");
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.textContent = "Delete";

  todoActions.appendChild(editBtn);
  todoActions.appendChild(deleteBtn);

  todoDiv.appendChild(todoContent);
  todoDiv.appendChild(todoActions);

  list_el.appendChild(todoDiv);
}

function addTodo(e) {
  e.preventDefault();
  const inputValue = input.value.trim();
  const todo = {
    text: inputValue,
  };

  // add html
  if (inputValue === null || inputValue == "") {
    alert("Please write something!");
  } else {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    addHtml(todo);
  }

  form.reset();
}

function deleteTodo(e) {
  const todo = e.target.parentElement.parentElement;
  const todoText = todo.firstChild.firstChild.value;

  let todos = JSON.parse(localStorage.getItem("todos"));

  todos = todos.filter((td) => td.text != todoText);
  localStorage.setItem("todos", JSON.stringify(todos));

  todo.remove();
}

function editTodo(e) {
  const todoElement = e.target.parentElement.parentElement;
  const todoText = todoElement.firstChild.firstChild;
  const editButton = todoElement.children[1].firstChild;

  let todoValue = todoElement.firstChild.firstChild.value;
  let todos = JSON.parse(localStorage.getItem("todos"));

  if (editButton.textContent.toLowerCase() == "edit") {
    // localden kaldır
    todos = todos.filter((td) => td.text != todoValue);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoText.removeAttribute("readonly");
    editButton.textContent = "Save";
    todoText.focus();
  } else {
    todoText.setAttribute("readonly", "readonly");
    editButton.textContent = "Edit";
    // Yeni değeri todo ya atma
    const todo = {
      text: todoValue,
    };
    todos.push(todo);
    // Eski değeri silme
    todoElement.remove();
    // localstroge da güncelleme
    localStorage.setItem("todos", JSON.stringify(todos));
    addHtml(todo);
  }
}

form.addEventListener("submit", addTodo);
deleteBtn.forEach((btn) => btn.addEventListener("click", deleteTodo));
editBtn.forEach((btn) => btn.addEventListener("click", editTodo));
