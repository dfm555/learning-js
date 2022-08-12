// Importamos la clase Tasks de tasks/Tasks.class.js:
import Tasks from "./Tasks.class.js";

//Creamos una función auto executable para inicializar la clase Tasks
(function (Tasks) {
  // Creamos una instancia de la clase Tasks
  const tasks = new Tasks();

  const taskInput = document.getElementById("task");
  const tasksList = document.getElementById("tasksList");
  const addTaskButton = document.getElementById("addTask");

  // Agregar un evento al input de tareas
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Agregar un evento al botón de agregar tarea
  addTaskButton.addEventListener("click", addTask);

  function addTask() {
    const task = taskInput.value;
    if (task && taskExists(task)) {
      tasks.addTask(task);
      taskInput.value = ""; // Limpiar el input
      taskInput.placeholder = "¿Qué quieres hacer?"; // Cambiar el placeholder a la versión original
      taskInput.classList.remove("inputText--error"); // Eliminar la clase de error
    } else {
      taskInput.focus(); // Focus en el input
      taskInput.classList.add("inputText--error"); // Agregar clase de error
      taskInput.placeholder = "¡Agrega una tarea!"; // Cambiar el placeholder a la versión de error
    }
  }

  // Verificar si la tarea ya existe
  function taskExists(activity) {
    const taskList = tasks.getTasks();
    const result = taskList.filter((task) => task.activity === activity);
    if (result.length) {
      showNotification("error", "La tarea ya existe");
      return false;
    }
    return true;
  }

  // Mostrar notificaciones
  function showNotification(type, message) {
    alertify.set("notifier", "position", "top-right");
    alertify.notify(message, type);
  }
})(Tasks);
