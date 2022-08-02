let tasksArray = []; // Colección de tareas
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
    taskInput.value = ""; // Limpiar el input
    taskInput.placeholder = '¿Qué quieres hacer?' // Cambiar el placeholder a la versión original
    taskInput.classList.remove('inputText--error') // Eliminar la clase de error
    showTasks();
  } else {
    taskInput.focus() // Focus en el input
    taskInput.classList.add('inputText--error') // Agregar clase de error
    taskInput.placeholder = '¡Agrega una tarea!' // Cambiar el placeholder a la versión de error
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

// Editar una tarea
function deleteTask(id) {
  /*const index = tasksArray.findIndex((value) => {
    return value.id === id;
  });
  tasksArray.splice(index, 1);
  showTasks();*/
  tasksArray = tasksArray.filter((task) => task.id !== id);
  showTasks();
}

function editActivity(status, id) {
  /*
   * Crear los métodos necesarios
   * para editar el texto de la actividad
   * si esta no está completada
   */
}

// Mostrar las tareas
function showTasks() {
  tasksList.classList.remove("tasksList");
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
      <span class="tasksItem${value.done ? " tasksItem--done" : ""}">${
          value.activity
        }</span>
      <span class="tasksItemAction">
        <i class="fa fa-check tasksItemAction-done ${
          value.done ? "hidden" : "" // Si la tarea está hecha, no mostrar el icono
        }"  onclick='editTask(${value.done}, ${value.id})'></i>
        <i class="fa fa-trash-o tasksItemAction-delete" onclick='deleteTask(${value.id})'></i>
      </span>
      `;
        tasksList.appendChild(li); // Agregar el elemento al DOM
      });

    taskInput.focus()
  }
}
