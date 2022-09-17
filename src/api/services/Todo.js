import instance from "../axios";

class TodoService {
  async getTodos() {
    const response = await instance("todos");
    return response.data;
  }

  async createTodo(todoItem) {
    const response = await instance.post("todos", todoItem);
    return response.data;
  }

  async updateTodo(id, todoItem) {
    const response = await instance.put(`todos/${id}`, todoItem);
    return response.data;
  }

  async deleteTodo(id) {
    const response = await instance.delete(`todos/${id}`);
    return response.data;
  }
}

export default new TodoService();
