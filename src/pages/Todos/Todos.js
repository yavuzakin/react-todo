import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NewTodo from "../../components/Todo/NewTodo/NewTodo";
import TodoList from "../../components/Todo/TodoList/TodoList";
import Overlay from "../../components/UI/Overlay";
import TodoApi from "../../api/services/Todo";

import "./Todos.scss";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  async function onAddTodo(todoItem) {
    setLoadingMessage("Adding new item...");
    try {
      const createdTodo = await TodoApi.createTodo(todoItem);
      setTodos((currentTodos) => [...currentTodos, createdTodo]);
    } catch (err) {
      console.log(err);
    }
    setLoadingMessage("");
  }

  async function onUpdateTodo(id, todoContent) {
    setLoadingMessage("Updating todo item...");
    try {
      const updatedTodo = await TodoApi.updateTodo(id, todoContent);
      setTodos((currentTodos) =>
        currentTodos.map((todo) => {
          if (todo.id === id) {
            return updatedTodo;
          }
          return todo;
        })
      );
    } catch (err) {
      console.log(err);
    }
    setLoadingMessage("");
  }

  async function onDeleteTodo(id) {
    setLoadingMessage("Deleting todo item...");
    try {
      await TodoApi.deleteTodo(id);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
    setLoadingMessage("");
  }

  useEffect(() => {
    async function fetchTodos() {
      setLoadingMessage("Fetching todo list...");
      try {
        const response = await TodoApi.getTodos();
        setTodos(response);
      } catch (err) {
        console.log(err);
      }
      setLoadingMessage("");
    }
    fetchTodos();
  }, []);

  useEffect(() => {
    const usernameFromLocalStorage = localStorage.getItem("username");
    if (!usernameFromLocalStorage) {
      navigate("/");
      return;
    }
    setUsername(usernameFromLocalStorage);
  }, [navigate]);

  return loadingMessage ? (
    <Overlay message={loadingMessage} />
  ) : (
    <div className="todos-container">
      <NewTodo onAddTodo={onAddTodo} />
      <TodoList
        username={username}
        todoList={todos}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </div>
  );
}
export default Todos;
