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
