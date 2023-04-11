let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

function createToDo() {
  let input = document.getElementById("inputField");
  let inputField = input.value;
  input.value = "";

  tasks.push({
    text: inputField,
    done: false,
  });

  updateList();
  saveTasksToLocalStorage();
}
function taskDone(index) {
  let inputField = tasks[index];
  inputField.done = !inputField.done;
  updateList();
  saveTasksToLocalStorage();
}

function updateList() {
  let listForTasks = document.getElementById("listForTasks");
  listForTasks.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");
    let text = document.createElement("span");
    text.innerText = task.text;
    if (task.done) {
      text.style.textDecoration = "line-through";
    }
    text.onclick = function () {
      task.done = !task.done;
      updateList();
      saveTasksToLocalStorage();
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "➖";
    deleteButton.style.color = "black";
    deleteButton.onclick = function () {
      tasks.splice(i, 1);
      updateList();
      saveTasksToLocalStorage();
    };

    li.appendChild(text);
    li.appendChild(deleteButton);
    listForTasks.appendChild(li);
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("load", function () {
  updateList();
});
