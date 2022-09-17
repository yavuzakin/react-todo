import { useState } from "react";

import "./NewTodo.scss";

function NewTodo({ onAddTodo }) {
  const [enteredTodoContent, setEnteredTodoContent] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    if (errorMessage) {
      return;
    }

    const todoItem = {
      content: enteredTodoContent,
      isCompleted: false,
    };
    onAddTodo(todoItem);
    setEnteredTodoContent("");
  }

  function inputChangeHandler(e) {
    if (e.target.value.trim().length < 3) {
      setErrorMessage("Todo item should be at least 3 characters long.");
    } else {
      setErrorMessage("");
    }
    setEnteredTodoContent(e.target.value);
  }

  function inputFocusHandler() {
    setIsInputFocused((currState) => !currState);
  }

  return (
    <div className="new-todo">
      <form className="new-todo__form" onSubmit={submitHandler}>
        <input
          className={`new-todo__input new-todo__input--${
            errorMessage && "error"
          }`}
          placeholder="New todo"
          onChange={inputChangeHandler}
          value={enteredTodoContent}
          onFocus={inputFocusHandler}
          onBlur={inputFocusHandler}
        />
        <button className="new-todo__button">ADD</button>
      </form>
      {errorMessage && isInputFocused && (
        <p className="new-todo__error-message">{errorMessage}</p>
      )}
    </div>
  );
}

export default NewTodo;
