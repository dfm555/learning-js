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
      id: tasksArray.length, // Tamaño del array
      activity: task,
      done: false,
    }); // agregar tarea a la colección de tareas
    taskInput.value = "";

    showTasks();
  }
}

// Editar una tarea
function editTask(status, id) {
  if (!status) {
    const index = tasksArray.findIndex((value) => {
      return value.id === id;
    });
    tasksArray[index].done = true;
    showTasks();
  }
}

// Mostrar las tareas
function showTasks() {
  tasksList.innerHTML = ""; // Limpiar el contenido del elemento

  if (tasksArray.length) {
    tasksList.setAttribute("class", "tasksList"); // Agregar clase al elemento
    tasksArray
      .sort((a, b) => a.done - b.done) // Ordenar las tareas por estado (hecha o no hecha)
      .forEach((value) => {
        // Recorrer el array de tareas
        const li = document.createElement("li");
        // string templates
        li.innerHTML = ` 
      <span class="${value.done ? "tasksItemDone" : ""}">${
          value.activity
        }</span>
      <span class="tasksItemAction">
        <i class="fa fa-check ${
          value.done ? "hidden" : "" // Si la tarea está hecha, no mostrar el icono
        }"  onclick='editTask(${value.done}, ${value.id})'></i>
        <i class="fa fa-trash-o"></i>
      </span>
      `;
        tasksList.appendChild(li); // Agregar el elemento al DOM
      });
  }
}
