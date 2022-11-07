let tokenLogin = window.localStorage.getItem("tokenLogin");
let tokenRegister = window.localStorage.getItem("token");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoTemplate = document.querySelector(".todo-template").content;

if (!tokenLogin) {
  window.location.reload();
  window.location.pathname = "login.html";
}

if (!tokenRegister) {
  window.location.reload();
  window.location.pathname = "register.html";
}

function postToDo() {
  try {
    fetch("http://192.168.0.105:5000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenLogin,
      },
      body: JSON.stringify({
        text: todoInput.value.trim(),
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

async function getToDo() {
  try {
    const response = await fetch("http://192.168.0.105:5000/todo", {
      headers: {
        Authorization: tokenLogin,
      },
    });
    const data = await response.json();

    let todoItemFragment = new DocumentFragment();
    todoList.innerHTML = "";
    if (data.length > 0) {
      todoList.classList.add("d-block");
      data.forEach((item) => {
        let cloneTodoTemplate = todoTemplate.cloneNode(true);
        cloneTodoTemplate.querySelector(".todo-item-text").textContent =
          item.todo_value;
        cloneTodoTemplate.querySelector(".todo-item-edit-btn").dataset.id =
          item.id;
        cloneTodoTemplate.querySelector(".todo-item-delete-btn").dataset.id =
          item.id;
        cloneTodoTemplate.querySelector(".todo-edit-input").value =
          item.todo_value;
        todoItemFragment.appendChild(cloneTodoTemplate);
      });
      todoList.appendChild(todoItemFragment);
    }
  } catch (err) {
    console.log(err);
  }
}

todoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  postToDo();
  getToDo();
  todoInput.value = "";
});
getToDo();

function deleteToDo(id) {
  fetch("http://192.168.0.105:5000/todo/" + id, {
    method: "DELETE",
    headers: {
      Authorization: tokenLogin,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

function editTodo(id) {
  const newTodoEditeed = prompt("Edit your plan");
  fetch("http://192.168.0.105:5000/todo/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenLogin,
    },
    body: JSON.stringify({
      text: newTodoEditeed,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

todoList.addEventListener("click", (evt) => {
  if (evt.target.matches(".todo-item-delete-btn")) {
    const deleteBtnId = evt.target.dataset.id;
    deleteToDo(deleteBtnId);
    // getToDo();
  }

  todoList.addEventListener("click", (evt) => {
    if (evt.target.matches(".todo-item-edit-btn")) {
      const editBtnId = evt.target.dataset.id;
      editTodo(editBtnId);
      // getToDo();
    }
  });
});
