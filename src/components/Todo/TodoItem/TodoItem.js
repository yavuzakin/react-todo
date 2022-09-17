import { useState } from "react";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmIcon from "@mui/icons-material/CheckOutlined";

import "./TodoItem.scss";

function TodoItem({ todoItem, onUpdateTodo, onDeleteTodo }) {
  const [editMode, setEditMode] = useState(false);
  const [todoContent, setTodoContent] = useState(todoItem.content);
  const [isHovered, setIsHovered] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  function editModeHandler() {
    setEditMode((currentState) => !currentState);
    setTodoContent(todoItem.content);
  }

  function todoContentEditHandler(e) {
    if (e.target.value.trim().length < 3) {
      setErrorMessage("Todo item should be at least 3 characters long.");
    } else {
      setErrorMessage("");
    }
    setTodoContent(e.target.value);
  }

  function updateContentHandler() {
    if (errorMessage) {
      return;
    }
    onUpdateTodo(todoItem.id, {
      content: todoContent,
      isCompleted: todoItem.isCompleted,
    });
    setEditMode(false);
  }

  function updateIsCompletedHandler() {
    onUpdateTodo(todoItem.id, {
      content: todoItem.content,
      isCompleted: !todoItem.isCompleted,
    });
  }

  function deleteTodoHandler() {
    onDeleteTodo(todoItem.id);
  }

  function mouseEnterHandler() {
    setIsHovered(true);
  }

  function mouseLeaveHandler() {
    setIsHovered(false);
  }

  let todoContentEl = (
    <p
      className={`todo__content todo__content--text todo__content--text--${
        todoItem.isCompleted && "completed"
      }`}
      onClick={updateIsCompletedHandler}
    >
      {todoContent}
    </p>
  );

  if (editMode) {
    todoContentEl = (
      <input
        className="todo__content todo__content--input"
        value={todoContent}
        onChange={todoContentEditHandler}
      />
    );
  }

  return (
    <>
      <div
        className="todo"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {todoContentEl}
        {isHovered && (
          <div
            className="todo__icon todo__icon--edit"
            onClick={editModeHandler}
          >
            <EditIcon />
          </div>
        )}
        {isHovered && todoContent === todoItem.content && (
          <div
            className="todo__icon todo__icon--delete"
            onClick={deleteTodoHandler}
          >
            <DeleteIcon />
          </div>
        )}
        {todoContent !== todoItem.content && (
          <div
            className="todo__icon todo__icon--confirm"
            onClick={updateContentHandler}
          >
            <ConfirmIcon />
          </div>
        )}
      </div>
      {errorMessage && todoContent !== todoItem.content && (
        <p className="todo__error-message">{errorMessage}</p>
      )}
    </>
  );
}

export default TodoItem;
