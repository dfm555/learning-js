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

  // Agregar eventos a los iconos de las tareas
  function addEventsToIcons(id) {
    const finishTaskButton = document.getElementById("finishTask-" + id);
    const editTaskButton = document.getElementById("editTask-" + id);
    const deleteTaskButton = document.getElementById("deleteTask-" + id);

    finishTaskButton.addEventListener("click", function (event) {
      const status = event.target.getAttribute("data-status") === "true";
      const id = event.target.getAttribute("data-id");
      finishTask(status, Number(id));
    });

    editTaskButton.addEventListener("click", function (event) {
      const id = event.target.getAttribute("data-id");
      editTask(Number(id));
    });

    deleteTaskButton.addEventListener("click", function (event) {
      const id = event.target.getAttribute("data-id");
      deleteTask(Number(id));
    });
  }

  // Agregar una tarea
  function addTask() {
    const task = taskInput.value;
    if (task && taskExists(task)) {
      tasks.addTask(task);
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
    const taskList = tasks.getTasks();
    if (!status) {
      const index = taskList.findIndex((value) => {
        return value.id === id;
      });
      tasks.editTask(index, "done", true);
      showTasks();
    }
  }

  // Eliminar una tarea
  function deleteTask(id) {
    tasks.deleteTask(id);
    showTasks();
  }

  // Editar una tarea
  function editTask(id) {
    const taskList = tasks.getTasks();
    const index = taskList.findIndex((value) => {
      return value.id === id;
    });
    const activity = taskList[index].activity;
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

          tasks.editTask(id, "activity", value);
          showNotification("success", "Actividad editada");
          showTasks();
        },
        null
      )
      .set("labels", { ok: "Editar", cancel: "Cancelar" });
  }

  // Mostrar las tareas
  function showTasks() {
    const data = tasks.getTasks();
    tasksList.innerHTML = ""; // Limpiar el contenido de la lista de tareas
    tasksList.classList.remove("tasksList");
    tasksList.innerHTML = ""; // Limpiar el contenido del elemento

    if (data.length) {
      tasksList.setAttribute("class", "tasksList"); // Agregar clase al elemento
      data
        .sort((a, b) => a.done - b.done) // Ordenar las tareas por estado (hecha o no hecha)
        .forEach((value) => {
          // Recorrer el array de tareas
          const li = document.createElement("li");
          // string templates
          li.innerHTML = ` 
      <span class="tasksItem${value.done ? " tasksItem--done" : ""}">
        ${value.activity}
      </span>
      <span class="tasksItemAction">
        <i id="finishTask-${value.id}" 
        class="fa fa-check tasksItemAction-done ${value.done ? "hidden" : ""}"
        data-id="${value.id}" 
        data-status="${value.done}">
        </i>
        <i id="editTask-${value.id}" 
        class="fa fa-edit tasksItemAction-edit ${value.done ? "hidden" : ""}" 
        data-id="${value.id}">
        </i>
        <i id="deleteTask-${value.id}" 
        class="fa fa-trash-o tasksItemAction-delete"
        data-id='${value.id}'>
        </i>
      </span>
      `;
          tasksList.appendChild(li); // Agregar el elemento al DOM
          // Agregar eventos a los iconos de las tareas dinámicamente
          addEventsToIcons(value.id);
        });

      taskInput.focus();
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
