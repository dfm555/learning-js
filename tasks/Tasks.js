const tasksArray = []; // Colección de tareas
// Seleccionar el elemento del DOM
const taskInput = document.getElementById("task");
const tasksList = document.getElementById("tasksList");

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Agregar una tarea
function addTask() {
  const task = taskInput.value;

  if (task) {
    tasksArray.push({
      id: tasksArray.length,
      activity: task,
      done: false,
    }); // agregar tarea a la colección de tareas
    taskInput.value = "";

    showTasks();
  }
}

// Mostrar las tareas
function showTasks() {
  tasksList.innerHTML = "";

  if (tasksArray.length) {
    tasksArray.forEach((value) => {
      const text = document.createTextNode(value.activity);
      const li = document.createElement("li");
      li.appendChild(text);
      li.setAttribute("id", value.id); // Agregar un atributo id a cada tarea
      tasksList.appendChild(li);
    });
  }
}

//# sourceMappingURL=Tasks.js.map
