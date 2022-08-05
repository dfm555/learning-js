let tasksArray = []; // Colección de tareas
// Seleccionar el elemento del DOM
const taskInput = document.getElementById("task");
const tasksList = document.getElementById("tasksList");

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Mostrar notificaciones
function showNotification(type, message) {
  alertify.set("notifier", "position", "top-right");
  alertify.notify(message, type);
}

// Verificar si la tarea ya existe
function taskExists(activity) {
  const result = tasksArray.filter((task) => task.activity === activity);
  if (result.length) {
    showNotification("error", "La tarea ya existe");
    return false;
  }
  return true;
}

// Agregar una tarea
function addTask() {
  const task = taskInput.value;

  if (task && taskExists(task)) {
    tasksArray.push({
      id: tasksArray.length, // Tamaño del array
      activity: task,
      done: false,
    }); // agregar tarea a la colección de tareas
    taskInput.value = ""; // Limpiar el input
    taskInput.placeholder = "¿Qué quieres hacer?"; // Cambiar el placeholder a la versión original
    taskInput.classList.remove("inputText--error"); // Eliminar la clase de error
    showTasks();
  } else {
    taskInput.focus(); // Focus en el input
    taskInput.classList.add("inputText--error"); // Agregar clase de error
    taskInput.placeholder = "¡Agrega una tarea!"; // Cambiar el placeholder a la versión de error
  }
}

// Marcar una tarea como hecha
function finishTask(status, id) {
  if (!status) {
    const index = tasksArray.findIndex((value) => {
      return value.id === id;
    });
    tasksArray[index].done = true;
    showTasks();
  }
}

// Eliminar una tarea
function deleteTask(id) {
  /*const index = tasksArray.findIndex((value) => {
    return value.id === id;
  });
  tasksArray.splice(index, 1);
  showTasks();*/
  tasksArray = tasksArray.filter((task) => task.id !== id);
  showTasks();
}

// Editar una tarea
function editTask(id) {
  const index = tasksArray.findIndex((value) => {
    return value.id === id;
  });
  const activity = tasksArray[index].activity;
  alertify
    .prompt(
      "Editar tarea",
      "¿Qué quieres hacer?",
      activity,
      function (evt, value) {
        if ((value && value === activity) || !value) {
          showNotification("error", "No se ha editado la tarea");
          return false;
        }

        if (!taskExists(value)) {
          return false;
        }

        tasksArray[index].activity = value;
        showNotification("success", "Actividad editada");
        showTasks();
      },
      null
    )
    .set("labels", { ok: "Editar", cancel: "Cancelar" });
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
        }"  onclick='finishTask(${value.done}, ${value.id})'></i>
        <i class="fa fa-edit tasksItemAction-edit  ${
          value.done ? "hidden" : ""
        }" onclick='editTask(${value.id})'></i>
        <i class="fa fa-trash-o tasksItemAction-delete" onclick='deleteTask(${
          value.id
        })'></i>
      </span>
      `;
        tasksList.appendChild(li); // Agregar el elemento al DOM
      });

    taskInput.focus();
  }
}
