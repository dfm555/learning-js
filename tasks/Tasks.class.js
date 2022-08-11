class Tasks {
  taskList = [];

  getTasks() {
    return this.taskList;
  }

  getTask(id) {
    return this.taskList.find((task) => task.id === id);
  }

  addTask(task) {
    //Code here
    if (task) {
      this.taskList.push({
        id: this.taskList.length, // Tamaño del array
        activity: task,
        done: false,
      }); // agregar tarea a la colección de tareas
    }
  }

  editTask(id, value) {
    const index = this.taskList.findIndex((value) => {
      return value.id === id;
    });
    this.taskList[index].activity = value;
  }

  deleteTask(id) {
    this.taskList = this.taskList.filter((task) => task.id !== id);
  }
}

const tasks = new Tasks();
