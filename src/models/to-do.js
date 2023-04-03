const { generateId } = require('../utils');

class ToDo {
  static #all = [];

  constructor(title) {
    this.id = generateId();
    this.title = title;
    this.isDone = false;

    ToDo.#all.push(this);
  }

  static list() {
    return ToDo.#all;
  }

  static updateCompletion(taskId, isDone) {
    const task = ToDo.#all.find(({ id }) => id === taskId);
    if (!task) return null;

    task.isDone = isDone;
    return task;
  }

  static delete(taskId) {
    const taskIdx = ToDo.#all.findIndex(({ id }) => id === taskId);
    if (taskIdx < 0) return null;

    ToDo.#all.splice(taskIdx, 1);
    return ToDo.#all;
  }

  static deleteAll() {
    if (!ToDo.#all.length) return null;

    ToDo.#all.length = 0;
    return ToDo.#all;
  }
}

module.exports = ToDo;
