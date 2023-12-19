//with help of my dad
//asked chat gpt for help with a few issues
//some study guides: https://www.tutorialstonight.com/to-do-list-javascript, https://freshman.tech/todo-list/

let tasks = [];

//checks for an item tasks in the browser's local storage
//then analyzes its value as a json string

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

//new function called
//a task gets assigned to an input field and resets the value to an empty string
//task is added to tasks array
//the list gets updated and saved to local storage

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

//user marks a specific task as done
//an index parameter is taken from the tasks array
//the property done gets toggled
//list updates and saves to local storage

function taskDone(index) {
  let inputField = tasks[index];
  inputField.done = !inputField.done;
  updateList();
  saveTasksToLocalStorage();
}

//a function is called whenever the page refreshes or whenever the tasks change
//displays an html element, the task list
//loops and creates a new element whenever a task is added
//each element contains a delete button and a li element

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
